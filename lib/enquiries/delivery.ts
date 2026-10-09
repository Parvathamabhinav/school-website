import "server-only";
import type { EnquiryKind, EnquiryValues } from "./validation";

export type DeliveryResult = "sent" | "unavailable" | "failed";

/** How long to wait for the provider before telling the visitor delivery is unconfirmed. */
const TIMEOUT_MS = 10_000;

/**
 * Sends an enquiry from any of the site's forms to the configured provider:
 * a webhook that accepts JSON (e.g. an n8n workflow). Configure on the
 * server (see .env.example and docs/enquiry-webhook.md):
 *
 * - ENQUIRY_WEBHOOK_URL     required; without it nothing is sent
 * - ENQUIRY_WEBHOOK_SECRET  sent as "Authorization: Bearer …"; required in
 *                           production, where the URL must also be https
 *
 * Request: POST, JSON body `{ submissionId, type, school, submittedAt,
 * name, email, phone, grade, subject, message, consent }`. `type` is
 * "admissions-enquiry" or "contact-enquiry"; `submissionId` stays the same
 * when a visitor retries the same enquiry, so the provider can ignore
 * duplicates.
 *
 * Returns "sent" only when the provider answers 2xx with the JSON body
 * `{ "received": true, "submissionId": "<the same id>" }`, sent after it
 * has finished its work. Any other answer, a redirect, a network error or a
 * timeout is "failed": delivery could not be confirmed. Logs carry no
 * personal data.
 */
export async function deliverEnquiry(
  kind: EnquiryKind,
  enquiry: EnquiryValues,
  meta: { school: string; submissionId: string },
): Promise<DeliveryResult> {
  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) return "unavailable";

  const secret = process.env.ENQUIRY_WEBHOOK_SECRET;
  if (process.env.NODE_ENV === "production" && (!secret || !url.startsWith("https://"))) {
    console.error("Enquiry delivery disabled: in production ENQUIRY_WEBHOOK_URL must use https and ENQUIRY_WEBHOOK_SECRET must be set.");
    return "unavailable";
  }

  const { submissionId } = meta;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(secret && { authorization: `Bearer ${secret}` }),
      },
      body: JSON.stringify({
        submissionId,
        type: `${kind}-enquiry`,
        school: meta.school,
        submittedAt: new Date().toISOString(),
        ...enquiry,
      }),
      // A redirect means a misconfigured URL: never follow it with the
      // enquiry and secret, and never count the page it leads to as success.
      redirect: "error",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) {
      console.error(`Enquiry ${submissionId} not delivered: provider responded ${response.status}`);
      return "failed";
    }
    const body: unknown = await response.json().catch(() => null);
    if (isAcknowledgement(body, submissionId)) return "sent";
    console.error(`Enquiry ${submissionId} unconfirmed: provider responded ${response.status} without the expected acknowledgement`);
  } catch (error) {
    const reason = error instanceof Error ? error.name : "unknown error";
    console.error(`Enquiry ${submissionId} unconfirmed: ${reason === "TimeoutError" ? `no response within ${TIMEOUT_MS / 1000}s` : reason}`);
  }
  return "failed";
}

function isAcknowledgement(body: unknown, submissionId: string): boolean {
  return (
    typeof body === "object" &&
    body !== null &&
    (body as Record<string, unknown>).received === true &&
    (body as Record<string, unknown>).submissionId === submissionId
  );
}
