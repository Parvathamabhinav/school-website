"use server";

import { school } from "@/data/school";
import { deliverEnquiry } from "./delivery";
import {
  enquiryRules,
  readEnquiry,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryKind,
  type EnquiryValues,
} from "./validation";

export type EnquiryState =
  | { status: "idle" }
  | { status: "invalid"; errors: EnquiryErrors; values: EnquiryValues }
  /** The provider confirmed receipt. The only state that may claim success. */
  | { status: "sent" }
  /** No provider is configured: nothing was sent. */
  | { status: "unavailable"; values: EnquiryValues }
  | { status: "failed"; values: EnquiryValues };

/** Submissions faster than this are almost certainly automated. */
const MIN_FILL_MS = 3000;

/** Admissions page form (/admissions#enquire). */
export async function submitAdmissionsEnquiry(_previous: EnquiryState, formData: FormData): Promise<EnquiryState> {
  return handleEnquiry("admissions", formData);
}

/** General contact form (/contact). */
export async function submitContactEnquiry(_previous: EnquiryState, formData: FormData): Promise<EnquiryState> {
  return handleEnquiry("contact", formData);
}

const formFor = (kind: EnquiryKind) =>
  kind === "admissions" ? school.admissions?.enquiry.form : school.contactPage?.enquiry.form;

/**
 * Shared submission handling. Like every Server Action, each entry point
 * above is a public POST endpoint (Next.js rejects cross-origin requests),
 * so this validates everything itself against the rules for that form,
 * and screens out simple bots:
 * - a honeypot field people never see or fill
 * - a minimum time between the form loading and being sent
 * The enquiry kind is fixed by the entry point, never read from the
 * request. Rate limiting belongs at the provider or hosting layer.
 */
async function handleEnquiry(kind: EnquiryKind, formData: FormData): Promise<EnquiryState> {
  const values = readEnquiry(formData);
  const form = formFor(kind);
  if (!form) return { status: "failed", values };

  const startedAt = Number(formData.get("startedAt"));
  const tooFast = Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS;
  if (formData.get("website") || tooFast) return { status: "failed", values };

  const errors = validateEnquiry(values, enquiryRules(form));
  if (Object.keys(errors).length > 0) return { status: "invalid", errors, values };

  const result = await deliverEnquiry(kind, values, school.name);
  return result === "sent" ? { status: "sent" } : { status: result, values };
}
