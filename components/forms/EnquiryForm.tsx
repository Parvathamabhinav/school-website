"use client";

import { ChevronDown } from "lucide-react";
import { useActionState, useEffect, useId, useRef, useState, type FocusEvent, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { submitAdmissionsEnquiry, submitContactEnquiry, type EnquiryState } from "@/lib/enquiries/actions";
import {
  enquiryFields,
  enquiryLimits,
  enquiryRules,
  readEnquiry,
  validateEnquiry,
  validateEnquiryField,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryKind,
} from "@/lib/enquiries/validation";
import { cn } from "@/lib/utils/cn";
import type { EnquiryFormContent } from "@/types/school";
import { telHref } from "@/lib/utils/tel";

const initialState: EnquiryState = { status: "idle" };

/** Each form posts to its own server action, which fixes the enquiry kind. */
const actions = { admissions: submitAdmissionsEnquiry, contact: submitContactEnquiry };

const wording: Record<EnquiryKind, { item: string; items: string; who: string }> = {
  admissions: { item: "enquiry", items: "enquiries", who: "the admissions team" },
  contact: { item: "message", items: "messages", who: "the school" },
};

const control =
  "type-body w-full rounded-xs border border-border-strong bg-background px-md text-text motion-colors hover:border-text aria-invalid:border-error";

interface EnquiryFormProps {
  /** Which form this is: decides the server action and the wording of notices. */
  kind: EnquiryKind;
  content: EnquiryFormContent;
  /** The school's direct contact details, offered whenever sending fails. */
  contact: { email?: string; phone?: string };
}

/**
 * Enquiry form for the Admissions and Contact pages; the fields shown come
 * from its content (year group and subject selects are optional). Validates in the browser for quick feedback
 * (on leaving a field, and on submit), but the server action is the real
 * check. Success is shown only when the server confirms the provider
 * received the enquiry; otherwise the visitor is told plainly that nothing
 * was sent and given the school's direct contact details.
 *
 * Works without JavaScript too: the form posts to the server action.
 */
export function EnquiryForm({ kind, content, contact }: EnquiryFormProps) {
  const { labels, successTitle = "Thank you", successMessage, privacyNote } = content;
  const rules = enquiryRules(content);
  const { item, items, who } = wording[kind];
  const [state, formAction, pending] = useActionState(actions[kind], initialState);
  const [clientErrors, setClientErrors] = useState<EnquiryErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const baseId = useId();
  const fieldId = (field: string) => `${baseId}-${field}`;

  const values = "values" in state ? state.values : undefined;
  const serverErrors = state.status === "invalid" ? state.errors : {};
  const errors = Object.keys(clientErrors).length > 0 ? clientErrors : serverErrors;

  // When the form loaded (for the server's too-fast-to-be-human check).
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, [state]);

  // After each server response, move focus to what needs attention.
  useEffect(() => {
    if (state.status === "idle") return;
    if (state.status === "invalid") {
      focusFirstInvalid(formRef.current, state.errors);
      return;
    }
    statusRef.current?.focus();
  }, [state]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const found = validateEnquiry(readEnquiry(new FormData(event.currentTarget)), rules);
    setClientErrors(found);
    if (Object.keys(found).length > 0) {
      event.preventDefault();
      focusFirstInvalid(formRef.current, found);
    }
  };

  // Re-check a field when leaving it, once it has content or an error.
  const onBlur = (event: FocusEvent<HTMLFormElement>) => {
    const field = event.target.getAttribute("name") as EnquiryField | null;
    if (!field || !enquiryFields.includes(field) || !formRef.current) return;
    const current = readEnquiry(new FormData(formRef.current));
    const hasContent = field === "consent" ? current.consent : Boolean(current[field]);
    if (!hasContent && !errors[field]) return;
    setClientErrors((previous) => {
      const next = { ...previous, [field]: validateEnquiryField(field, current, rules) };
      if (!next[field]) delete next[field];
      return next;
    });
  };

  if (state.status === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border-t-2 border-accent bg-background p-card">
        <p className="type-h3">{successTitle}</p>
        <p className="type-body-lg mt-sm max-w-narrow text-text-muted">{successMessage}</p>
      </div>
    );
  }

  const describedBy = (field: EnquiryField, extra?: string) =>
    [errors[field] && `${fieldId(field)}-error`, extra].filter(Boolean).join(" ") || undefined;
  const errorText = (field: EnquiryField) =>
    errors[field] && (
      <p id={`${fieldId(field)}-error`} className="type-body-sm mt-xs text-error">
        {errors[field]}
      </p>
    );

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      onBlur={onBlur}
      noValidate
      className="relative flex flex-col gap-lg bg-background p-card"
    >
      <p className="type-body-sm text-text-muted">All fields are required unless marked optional.</p>

      <Field id={fieldId("name")} label={labels.name}>
        <input
          id={fieldId("name")}
          name="name"
          type="text"
          autoComplete="name"
          maxLength={enquiryLimits.name}
          defaultValue={values?.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy("name")}
          className={cn(control, "min-h-12")}
        />
        {errorText("name")}
      </Field>

      <div className="grid gap-lg md:grid-cols-2">
        <Field id={fieldId("email")} label={labels.email}>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            maxLength={enquiryLimits.email}
            defaultValue={values?.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={cn(control, "min-h-12")}
          />
          {errorText("email")}
        </Field>

        <Field id={fieldId("phone")} label={labels.phone} optional>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={enquiryLimits.phone}
            defaultValue={values?.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            className={cn(control, "min-h-12")}
          />
          {errorText("phone")}
        </Field>
      </div>

      {labels.grade && rules.gradeOptions.length > 0 && (
        <Field id={fieldId("grade")} label={labels.grade} optional>
          <div className="relative">
            <select
              id={fieldId("grade")}
              name="grade"
              defaultValue={values?.grade ?? ""}
              aria-invalid={Boolean(errors.grade)}
              aria-describedby={describedBy("grade")}
              className={cn(control, "min-h-12 appearance-none pr-2xl")}
            >
              <option value="">Select an option</option>
              {rules.gradeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <SelectIcon />
          </div>
          {errorText("grade")}
        </Field>
      )}

      {labels.subject && rules.subjectOptions.length > 0 && (
        <Field id={fieldId("subject")} label={labels.subject}>
          <div className="relative">
            <select
              id={fieldId("subject")}
              name="subject"
              defaultValue={values?.subject ?? ""}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={describedBy("subject")}
              className={cn(control, "min-h-12 appearance-none pr-2xl")}
            >
              <option value="">Select an option</option>
              {rules.subjectOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <SelectIcon />
          </div>
          {errorText("subject")}
        </Field>
      )}

      <Field id={fieldId("message")} label={labels.message} optional={!rules.requireMessage}>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={5}
          maxLength={enquiryLimits.message}
          defaultValue={values?.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          className={cn(control, "resize-y py-sm")}
        />
        {errorText("message")}
      </Field>

      {labels.consent && (
        <div>
          <div className="flex items-start gap-sm">
            <input
              id={fieldId("consent")}
              name="consent"
              type="checkbox"
              defaultChecked={values?.consent}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={describedBy("consent", privacyNote && fieldId("privacy"))}
              className="mt-2xs size-5 shrink-0 accent-primary"
            />
            <label htmlFor={fieldId("consent")} className="type-body-sm">
              {labels.consent}
            </label>
          </div>
          {errorText("consent")}
        </div>
      )}

      {privacyNote && (
        <p id={fieldId("privacy")} className="type-body-sm text-text-muted">
          {privacyNote}
        </p>
      )}

      {/* Honeypot: hidden from people and assistive technology; bots fill it in. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor={fieldId("website")}>Leave this field empty</label>
        <input id={fieldId("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="" />

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="empty:hidden">
        {state.status === "unavailable" && (
          <Notice contact={contact}>
            Online {items} are not connected yet, so your {item} has not been sent. Please contact {who} directly:
            {process.env.NODE_ENV !== "production" && (
              <span className="mt-xs block text-text-muted">
                Development: set ENQUIRY_WEBHOOK_URL on the server to deliver enquiries (see lib/enquiries/delivery.ts).
              </span>
            )}
          </Notice>
        )}
        {state.status === "failed" && (
          <Notice contact={contact}>
            Sorry, your {item} could not be sent just now. Please try again in a moment, or contact {who} directly:
          </Notice>
        )}
      </div>

      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Sending…" : labels.submit}
        </Button>
      </div>
    </form>
  );
}

/** Moves focus to the first field with an error, in reading order. */
function focusFirstInvalid(form: HTMLFormElement | null, found: EnquiryErrors) {
  const first = enquiryFields.find((field) => found[field]);
  if (first) form?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
}

function SelectIcon() {
  return (
    <ChevronDown
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 right-md size-4 -translate-y-1/2 text-text-muted"
    />
  );
}

interface FieldProps {
  id: string;
  label: string;
  optional?: boolean;
  children: ReactNode;
}

function Field({ id, label, optional, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-xs">
      <label htmlFor={id} className="type-body-sm font-medium">
        {label}
        {optional && <span className="font-normal text-text-muted"> (optional)</span>}
      </label>
      {children}
    </div>
  );
}

function Notice({ children, contact }: { children: ReactNode; contact: EnquiryFormProps["contact"] }) {
  return (
    <div className="type-body-sm border-l-2 border-error bg-surface-muted p-md">
      <p>{children}</p>
      <p className="mt-xs flex flex-wrap gap-x-lg gap-y-2xs">
        {contact.email && (
          <TextLink href={`mailto:${contact.email}`} variant="underline">
            {contact.email}
          </TextLink>
        )}
        {contact.phone && (
          <TextLink href={telHref(contact.phone)} variant="underline">
            {contact.phone}
          </TextLink>
        )}
      </p>
    </div>
  );
}
