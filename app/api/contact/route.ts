import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const attempts = new Map<string, number[]>();

type ContactPayload = {
  name: string;
  organization: string;
  email: string;
  website: string;
  message: string;
  companyWebsite: string;
};

type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validate(body: unknown): { data?: ContactPayload; errors?: FieldErrors } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { errors: { name: "Invalid form submission." } };
  }

  const input = body as Record<string, unknown>;
  const data: ContactPayload = {
    name: stringValue(input.name),
    organization: stringValue(input.organization),
    email: stringValue(input.email).toLowerCase(),
    website: stringValue(input.website),
    message: stringValue(input.message),
    companyWebsite: stringValue(input.companyWebsite),
  };
  const errors: FieldErrors = {};

  if (!data.name) errors.name = "Please enter your name.";
  else if (data.name.length > 100) errors.name = "Name must be 100 characters or fewer.";

  if (!data.organization) errors.organization = "Please enter your organization name.";
  else if (data.organization.length > 160) errors.organization = "Organization name must be 160 characters or fewer.";

  if (!data.email) errors.email = "Please enter your email address.";
  else if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid email address.";

  if (data.website) {
    if (data.website.length > 500) errors.website = "Website URL must be 500 characters or fewer.";
    else {
      try {
        const url = new URL(data.website);
        if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error("Invalid protocol");
      } catch {
        errors.website = "Please enter a valid website URL beginning with http:// or https://.";
      }
    }
  }

  if (data.message.length > 5000) errors.message = "Message must be 5,000 characters or fewer.";
  if (data.companyWebsite) errors.companyWebsite = "Invalid form submission.";

  return Object.keys(errors).length ? { errors } : { data };
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

function clientKey(request: NextRequest): string {
  return request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    attempts.set(key, recent);
    return true;
  }
  recent.push(now);
  attempts.set(key, recent);
  return false;
}

export async function POST(request: NextRequest) {
  if (isRateLimited(clientKey(request))) {
    return NextResponse.json({ ok: false, message: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const result = validate(body);
  if (!result.data) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) {
    console.error("Contact form email environment variables are not fully configured.");
    return NextResponse.json({ ok: false, message: "Email delivery is unavailable." }, { status: 503 });
  }

  const { name, organization, email, website, message } = result.data;
  const safeSubjectName = name.replace(/[\r\n]+/g, " ");
  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "America/New_York",
  });
  const fields = [
    ["Name", name],
    ["Email", email],
    ["Business or organization", organization],
    ["Website", website || "Not provided"],
    ["Message", message || "Not provided"],
    ["Submission date and time", `${submittedAt} (America/New_York)`],
  ];
  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#0b1f35;line-height:1.5"><h1 style="font-size:22px">New Project Econ inquiry</h1><table style="border-collapse:collapse;width:100%;max-width:680px">${fields.map(([label, value]) => `<tr><th style="padding:10px;border-bottom:1px solid #d8ecff;text-align:left;vertical-align:top;width:190px">${escapeHtml(label)}</th><td style="padding:10px;border-bottom:1px solid #d8ecff;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join("")}</table></body></html>`;
  const text = fields.map(([label, value]) => `${label}: ${value}`).join("\n\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `New Project Econ inquiry from ${safeSubjectName}`,
      html,
      text,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form email delivery failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ ok: false, message: "Email delivery failed." }, { status: 502 });
  }
}
