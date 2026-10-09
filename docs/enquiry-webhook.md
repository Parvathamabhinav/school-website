# Enquiry webhook contract (n8n)

The Admissions form (`/admissions#enquire`) and the Contact form (`/contact`) deliver enquiries to one webhook. The intended receiver is an n8n workflow that emails the school and appends a row to a Google Sheet.

**Status:** this workflow has not been built yet. Real email and Sheets delivery is not active until the workflow is configured and tested, and the environment variables below are set. Until then the forms tell visitors plainly that nothing was sent.

Source of truth: `lib/enquiries/delivery.ts`, `lib/enquiries/actions.ts`, `lib/enquiries/validation.ts`.

## Environment variables

Server only; never prefix them with `NEXT_PUBLIC_`.

| Variable | Required | Notes |
| --- | --- | --- |
| `ENQUIRY_WEBHOOK_URL` | Yes | The n8n production webhook URL. Must be `https://` in production |
| `ENQUIRY_WEBHOOK_SECRET` | Yes in production | Long random string, e.g. `openssl rand -hex 32`. Sent as `Authorization: Bearer <secret>` |

In production, if the URL is not `https://` or the secret is missing, the site doesn't send anything. It logs a configuration error and the forms show the "not connected" message.

## Request (website → n8n)

`POST <ENQUIRY_WEBHOOK_URL>`, server to server. The site sends these headers:

```
Content-Type: application/json
Authorization: Bearer <ENQUIRY_WEBHOOK_SECRET>
```

The body has these fields:

```json
{
  "submissionId": "3f1c2b7e-8d4a-4c1e-9b2f-6a5d4e3c2b1a",
  "type": "admissions-enquiry",
  "school": "Example Academy",
  "submittedAt": "2026-10-09T10:15:00.000Z",
  "name": "…",
  "email": "…",
  "phone": "",
  "grade": "",
  "subject": "",
  "message": "",
  "consent": true
}
```

| Field | Type | Notes |
| --- | --- | --- |
| `submissionId` | string, UUID v4 | Unique per enquiry, and the **same on a retry** of that enquiry. Use it to drop duplicates |
| `type` | `"admissions-enquiry"` or `"contact-enquiry"` | Set by the server action for each form; a visitor can't change it |
| `school` | string | The school's name from `data/school.ts` |
| `submittedAt` | string, ISO 8601 UTC | When the server sent this attempt. A retry sends a new time |
| `name` | string | Always present: 1–100 characters |
| `email` | string | Always present: up to 254 characters, basic `a@b.c` shape |
| `phone` | string | `""` when not given; otherwise up to 30 characters of digits, spaces and `+ ( ) - .` |
| `grade` | string | `""` or one of the form's configured year-group options (Admissions) |
| `subject` | string | `""` or one of the configured subjects. Required on the Contact form |
| `message` | string | Up to 2,000 characters. Required on the Contact form, optional on Admissions |
| `consent` | boolean | `true` whenever the form shows a consent box, because it's required there |

The server trims every value and validates it against the same rules as the browser before sending. Honeypot and too-fast submissions are never sent. The fields that apply to each form come from its content in `data/school.ts`, so check that file for the current options.

## Response (n8n → website)

The website counts the enquiry as delivered only when **both** of these hold:

1. The status is `2xx`.
2. The body is JSON containing `"received": true` and the **same** `submissionId`:

```json
{ "received": true, "submissionId": "3f1c2b7e-8d4a-4c1e-9b2f-6a5d4e3c2b1a" }
```

Send this only after the email and the Sheets row have both succeeded. Anything else means "not confirmed", and the visitor sees "we could not confirm that your enquiry was sent", with the school's email and phone. That covers:
- any non-2xx status;
- a 2xx with any other body;
- a redirect, which is never followed;
- a network error;
- no response within **10 seconds**.

Use these responses for rejections. The website treats every one of them as not delivered:

| Case | Status | Body (suggested) |
| --- | --- | --- |
| Missing or wrong `Authorization` | 401 or 403 | — (n8n's header auth answers itself) |
| Malformed payload | 400 | `{ "received": false, "error": "invalid-payload" }` |
| Email or Sheets step failed | 500 | `{ "received": false, "error": "delivery-failed" }` |

A rejection is distinguishable from a timeout only in the server log, which records the status or the timeout with the `submissionId` and no personal data. The visitor sees the same honest message either way. After a timeout, n8n may already have processed the enquiry, which is why retries reuse the `submissionId`.

## n8n workflow to build

1. **Webhook node:** method `POST`, path of your choice.
   - **Authentication:** Header Auth, using a credential with name `Authorization` and value `Bearer <ENQUIRY_WEBHOOK_SECRET>`.
   - **Respond:** set to *Using 'Respond to Webhook' node*. Do **not** leave it on *Immediately*: that answers before the email and Sheets steps run, and the site would then reject the answer as unconfirmed.
   - Copy the **production** URL (not the test URL) into `ENQUIRY_WEBHOOK_URL`, and activate the workflow.
2. **Validate (IF or Code node):** reject with a Respond to Webhook node returning `400` unless:
   - `body.type` is one of the two values;
   - `body.submissionId` is a UUID;
   - `body.name` and `body.email` are non-empty strings within the limits above;
   - every field is the expected type.
3. **Google Sheets, *Append or Update Row*:** match on a `submissionId` column. A retried enquiry then updates its existing row instead of adding a duplicate. Suggested columns, in order: `submissionId`, `submittedAt`, `type`, `name`, `email`, `phone`, `grade`, `subject`, `message`, `consent`, `school`. Use a sheet only school staff can access; it holds personal data.
4. **Email (Gmail or SMTP node):** send to the school's admissions or office inbox, routing by `type` if you want, with the visitor's address as *Reply-To*. Put the `submissionId` in the subject or body so staff can spot repeats.
5. **Respond to Webhook:** `200` with the JSON body `{ "received": true, "submissionId": "{{ $('Webhook').item.json.body.submissionId }}" }`.
6. **Errors:**
   - Set the Sheets and email nodes to *On Error → Continue (using error output)*, and connect their error outputs to a Respond to Webhook node returning `500` with `{ "received": false, "error": "delivery-failed" }`.
   - Add an n8n **error workflow** that alerts staff whenever an execution fails.

Keep the workflow well inside 10 seconds. Sheets then email normally takes a few seconds.

## Partial failures and duplicates

- **Order:** write the Sheets row first, then send the email. A failed email then still leaves a record, and the visitor is told to retry or contact the school.
- **Sheets fails:** respond `500` and don't send the email. Nothing is recorded, the visitor is told it wasn't confirmed, and a retry starts clean.
- **Sheets succeeds, email fails:** respond `500`. The row exists without a notification. A retry updates the same row and tries the email again. The error workflow alerts staff in case the visitor doesn't retry.
- **Both succeed but the response is lost (timeout):** the visitor sees "not confirmed" and may retry. The retry updates the existing row, so there's no duplicate row, but a **second email** is sent. That's acceptable at enquiry volume, and the shared `submissionId` makes it obvious.
- **The website never retries on its own.** Only the visitor can resend, and their retry reuses the same `submissionId`, both with and without JavaScript.
- **Not covered:** two separate enquiries from the same person get different ids by design.

## Before public launch

- Configure **rate limiting**. The site has none of its own.
  - **At the host:** a rule on POST requests to `/admissions` and `/contact`, e.g. Vercel Firewall or Cloudflare.
  - **In n8n:** cap executions per minute.
- Send test enquiries from both forms, checking every one of these outcomes:
  - **Success:** the row is added and the email arrives.
  - **Wrong secret:** the site shows "not confirmed" and nothing is recorded.
  - **Failing email step:** a 500, with the row present.
  - **Retry with the same `submissionId`:** the row is updated, with no duplicate.
  - **A response slower than 10 seconds:** the site shows "not confirmed".
- Check each form's privacy note in `data/school.ts` against the school's actual policy, and decide how long rows are kept in the sheet.
