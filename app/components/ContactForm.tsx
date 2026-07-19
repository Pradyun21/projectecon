"use client";

import { useState } from "react";
import { EmojiGlyph } from "./EmojiGlyph";

type FormStatus = "idle" | "submitting" | "success" | "error";
type FieldErrors = Record<string, string>;

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus("submitting");
    setFieldErrors({});

    try {
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as {
        ok?: boolean;
        errors?: FieldErrors;
      };

      if (!response.ok || !result.ok) {
        setFieldErrors(result.errors ?? {});
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return <form className="contact-form" onSubmit={submit} noValidate={false}>
    <div className="form-heading"><h2>Start the conversation.</h2><p>Share the basics. We can learn about the organization and available data in a follow-up conversation.</p></div>
    <div className="field-grid">
      <label>Contact name<input name="name" required maxLength={100} autoComplete="name" placeholder="Your name" aria-invalid={Boolean(fieldErrors.name)}/>{fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}</label>
      <label>Business or organization name<input name="organization" required maxLength={160} autoComplete="organization" placeholder="Organization name" aria-invalid={Boolean(fieldErrors.organization)}/>{fieldErrors.organization && <span className="field-error">{fieldErrors.organization}</span>}</label>
      <label>Email<input name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@example.com" aria-invalid={Boolean(fieldErrors.email)}/>{fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}</label>
      <label>Website URL <span>Optional</span><input name="website" type="url" maxLength={500} autoComplete="url" placeholder="https://" aria-invalid={Boolean(fieldErrors.website)}/>{fieldErrors.website && <span className="field-error">{fieldErrors.website}</span>}</label>
    </div>
    <div className="contact-honeypot" aria-hidden="true">
      <label>Leave this field empty<input name="companyWebsite" tabIndex={-1} autoComplete="off"/></label>
    </div>
    <button className="button" type="submit" disabled={status === "submitting"} aria-disabled={status === "submitting"}>
      {status === "submitting" ? "Sending…" : <>Start the conversation <EmojiGlyph emoji="➡️"/></>}
    </button>
    <div className="form-status" aria-live="polite" aria-atomic="true">
      {status === "success" && <p className="form-success" role="status">Your message has been sent. We will respond within a few hours with a follow-up!</p>}
      {status === "error" && <p className="form-error" role="alert">Your message could not be sent. Please try again.</p>}
    </div>
  </form>;
}
