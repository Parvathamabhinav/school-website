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

/**
 * `submissionId` comes back with every unsent state so the form re-renders
 * with it: a retry of the same enquiry (with or without JavaScript) carries
 * the same id, and the provider can ignore the duplicate.
 */
export type EnquiryState =
  | { status: "idle" }
  | { status: "invalid"; errors: EnquiryErrors; values: EnquiryValues; submissionId: string }
  /** The provider confirmed receipt. The only state that may claim success. */
  | { status: "sent" }
  /** No provider is configured: nothing was sent. */
  | { status: "unavailable"; values: EnquiryValues; submissionId: string }
  /** Rejected, or not confirmed (e.g. a timeout): it may or may not have arrived. */
  | { status: "failed"; values: EnquiryValues; submissionId: string };

/** Submissions faster than this are almost certainly automated. */
const MIN_FILL_MS = 3000;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * The enquiry's id: the one the form sent if it is a well-formed random
 * UUID (so retries match), otherwise a new one. It only labels the
 * enquiry for the provider; it grants nothing and skips no checks.
 */
function submissionIdFrom(formData: FormData): string {
  const sent = formData.get("submissionId");
  return typeof sent === "string" && UUID.test(sent) ? sent.toLowerCase() : crypto.randomUUID();
}

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
  const submissionId = submissionIdFrom(formData);
  const form = formFor(kind);
  if (!form) return { status: "failed", values, submissionId };

  const startedAt = Number(formData.get("startedAt"));
  const tooFast = Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS;
  if (formData.get("website") || tooFast) return { status: "failed", values, submissionId };

  const errors = validateEnquiry(values, enquiryRules(form));
  if (Object.keys(errors).length > 0) return { status: "invalid", errors, values, submissionId };

  const result = await deliverEnquiry(kind, values, { school: school.name, submissionId });
  return result === "sent" ? { status: "sent" } : { status: result, values, submissionId };
}
