"use client";

import { useState } from "react";
import { EmojiGlyph } from "./EmojiGlyph";

export function ContactForm() {
  const [notice, setNotice] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setNotice(true);
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="form-heading"><p className="eyebrow">Under one minute</p><h2>Start the conversation.</h2><p>Share the basics. We can learn about the organization and available data in a follow-up conversation.</p></div>
    <div className="field-grid">
      <label>Contact name<input name="name" required autoComplete="name" placeholder="Your name"/></label>
      <label>Business or organization name<input name="organization" required autoComplete="organization" placeholder="Organization name"/></label>
      <label>Email<input name="email" type="email" required autoComplete="email" placeholder="you@example.com"/></label>
      <label>Website URL <span>Optional</span><input name="website" type="url" autoComplete="url" placeholder="https://"/></label>
    </div>
    <button className="button" type="submit">Start the conversation <EmojiGlyph emoji="➡️"/></button>
    <p className="form-support-note">This preview form is not connected yet. No information is sent.</p>
    {notice && <div className="demo-notice" role="status"><strong>Everything looks ready.</strong><p>Your information has not been sent. Connect a form service before accepting submissions.</p></div>}
  </form>;
}
