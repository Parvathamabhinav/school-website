import type { EnquiryFormContent } from "@/types/school";

/**
 * Enquiry fields and validation, shared by the forms (instant feedback) and
 * the server actions (the real check: never trust the browser). Used by
 * every form on the site; each form's rules come from its school data.
 */

/** Which form an enquiry came from. Fixed by the server action, never the browser. */
export type EnquiryKind = "admissions" | "contact";

export const enquiryLimits = {
  name: 100,
  email: 254,
  phone: 30,
  message: 2000,
} as const;

export type EnquiryField = "name" | "email" | "phone" | "grade" | "subject" | "message" | "consent";

export interface EnquiryValues {
  name: string;
  email: string;
  phone: string;
  grade: string;
  subject: string;
  message: string;
  consent: boolean;
}

export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export interface EnquiryRules {
  /** Allowed year-group values; empty means the field is not shown. */
  gradeOptions: string[];
  /** Allowed subjects; when present, choosing one is required. */
  subjectOptions: string[];
  requireConsent: boolean;
  requireMessage: boolean;
}

/** A form's rules, derived from its content the same way in the browser and on the server. */
export function enquiryRules(form: EnquiryFormContent): EnquiryRules {
  return {
    gradeOptions: form.labels.grade ? (form.gradeOptions ?? []) : [],
    subjectOptions: form.labels.subject ? (form.subjectOptions ?? []) : [],
    requireConsent: Boolean(form.labels.consent),
    requireMessage: Boolean(form.requireMessage),
  };
}

const text = (formData: FormData, name: string) => {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
};

export function readEnquiry(formData: FormData): EnquiryValues {
  return {
    name: text(formData, "name"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    grade: text(formData, "grade"),
    subject: text(formData, "subject"),
    message: text(formData, "message"),
    consent: formData.get("consent") === "on",
  };
}

// Deliberately simple: one @, no spaces, a dot in the domain. Delivery
// confirms the rest.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\-.\s\d]{6,}$/;

export function validateEnquiryField(field: EnquiryField, values: EnquiryValues, rules: EnquiryRules): string | undefined {
  switch (field) {
    case "name":
      if (!values.name) return "Please enter your name.";
      if (values.name.length > enquiryLimits.name) return `Please keep your name under ${enquiryLimits.name} characters.`;
      return;
    case "email":
      if (!values.email) return "Please enter your email address.";
      if (values.email.length > enquiryLimits.email || !emailPattern.test(values.email))
        return "Please enter a valid email address, like name@example.com.";
      return;
    case "phone":
      if (!values.phone) return;
      if (values.phone.length > enquiryLimits.phone || !phonePattern.test(values.phone))
        return "Please enter a valid phone number, using digits, spaces and + only.";
      return;
    case "grade":
      if (values.grade && !rules.gradeOptions.includes(values.grade)) return "Please choose an option from the list.";
      return;
    case "subject":
      if (rules.subjectOptions.length === 0) return values.subject ? "Please choose an option from the list." : undefined;
      if (!values.subject) return "Please choose what your message is about.";
      if (!rules.subjectOptions.includes(values.subject)) return "Please choose an option from the list.";
      return;
    case "message":
      if (rules.requireMessage && !values.message) return "Please enter your message.";
      if (values.message.length > enquiryLimits.message)
        return `Please keep your message under ${enquiryLimits.message} characters.`;
      return;
    case "consent":
      if (rules.requireConsent && !values.consent) return "Please confirm that the school may contact you.";
      return;
  }
}

export const enquiryFields: EnquiryField[] = ["name", "email", "phone", "grade", "subject", "message", "consent"];

export function validateEnquiry(values: EnquiryValues, rules: EnquiryRules): EnquiryErrors {
  const errors: EnquiryErrors = {};
  for (const field of enquiryFields) {
    const error = validateEnquiryField(field, values, rules);
    if (error) errors[field] = error;
  }
  return errors;
}
