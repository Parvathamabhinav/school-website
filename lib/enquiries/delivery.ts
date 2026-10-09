import "server-only";
import type { EnquiryKind, EnquiryValues } from "./validation";

export type DeliveryResult = "sent" | "unavailable" | "failed";

/**
 * Sends an enquiry from any of the site's forms to the configured provider:
 * a webhook that accepts JSON (an automation service, CRM or form backend).
 * Configure on the server:
 *
 * - ENQUIRY_WEBHOOK_URL     required; without it nothing is sent
 * - ENQUIRY_WEBHOOK_SECRET  optional; sent as "Authorization: Bearer …"
 *
 * The payload's `type` ("admissions-enquiry" or "contact-enquiry") tells
 * the provider which form it came from, so it can route each kind.
 *
 * Returns "sent" only when the provider answers with a 2xx status, so the
 * form never claims success it cannot confirm. Logs carry no personal data.
 */
export async function deliverEnquiry(kind: EnquiryKind, enquiry: EnquiryValues, school: string): Promise<DeliveryResult> {
  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) return "unavailable";

  const secret = process.env.ENQUIRY_WEBHOOK_SECRET;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(secret && { authorization: `Bearer ${secret}` }),
      },
      body: JSON.stringify({
        type: `${kind}-enquiry`,
        school,
        submittedAt: new Date().toISOString(),
        ...enquiry,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (response.ok) return "sent";
    console.error(`Enquiry delivery failed: provider responded ${response.status}`);
  } catch (error) {
    console.error(`Enquiry delivery failed: ${error instanceof Error ? error.name : "unknown error"}`);
  }
  return "failed";
}
