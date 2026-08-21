import "server-only";
import nodemailer from "nodemailer";
import { site } from "@/data/site";

const gmailUser = process.env.GMAIL_USER;
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

export const emailConfigured = Boolean(gmailUser && gmailAppPassword);

// A single reused transporter (Nodemailer recommends this over creating a
// new one per email — it pools connections instead of reconnecting to
// Gmail's SMTP server on every send).
let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (!emailConfigured) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailAppPassword },
      // Bounded timeouts so a slow or unreachable SMTP connection fails
      // fast instead of hanging the visitor's form submission for minutes
      // (the default Node socket timeout is effectively unbounded). Lead
      // data is already safely in Postgres by the time this runs, so a
      // failed/slow email is never worth blocking the response for.
      connectionTimeout: 8_000,
      greetingTimeout: 8_000,
      socketTimeout: 8_000,
    });
  }
  return transporter;
}

type LeadEmailInput = {
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  source: string | null;
};

/**
 * Sends a new-lead notification to the business inbox. Never throws — a
 * failed email should never fail the lead submission itself, since the
 * lead is already safely stored in Postgres by the time this runs. Errors
 * are logged server-side so they're visible in your hosting provider's
 * function logs, not surfaced to the visitor.
 */
export async function sendLeadNotificationEmail(lead: LeadEmailInput): Promise<{ sent: boolean; reason?: string }> {
  const t = getTransporter();
  if (!t) return { sent: false, reason: "not_configured" };

  try {
    await t.sendMail({
      from: `"${site.name} Website" <${gmailUser}>`,
      to: site.email,
      replyTo: lead.email,
      subject: `New enquiry: ${lead.service ?? "General"} — ${lead.name}`,
      text: [
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Phone: ${lead.phone ?? "—"}`,
        `Service: ${lead.service ?? "—"}`,
        `Source: ${lead.source ?? "—"}`,
        "",
        "Message:",
        lead.message,
        "",
        "— This lead is also saved in /admin/leads.",
      ].join("\n"),
      html: `
        <div style="font-family: sans-serif; max-width: 480px;">
          <h2 style="margin-bottom: 4px;">New enquiry</h2>
          <p style="color:#666; margin-top: 0;">${lead.service ?? "General enquiry"} · ${lead.source ?? "Website"}</p>
          <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding:4px 0; color:#666;">Name</td><td style="padding:4px 0;"><b>${escapeHtml(lead.name)}</b></td></tr>
            <tr><td style="padding:4px 0; color:#666;">Email</td><td style="padding:4px 0;">${escapeHtml(lead.email)}</td></tr>
            <tr><td style="padding:4px 0; color:#666;">Phone</td><td style="padding:4px 0;">${escapeHtml(lead.phone ?? "—")}</td></tr>
          </table>
          <p style="white-space: pre-wrap; background:#f5f5f7; padding:12px; border-radius:8px;">${escapeHtml(lead.message)}</p>
          <p style="color:#999; font-size:12px;">This lead is also saved in your admin panel under Leads.</p>
        </div>
      `,
    });
    return { sent: true };
  } catch (err) {
    console.error("Failed to send lead notification email:", err);
    return { sent: false, reason: "send_failed" };
  }
}

// new

type NewsletterEmailInput = {
  email: string;
};

/**
 * Sends a notification when someone subscribes to the newsletter. Same
 * fire-and-forget pattern as sendLeadNotificationEmail — never throws, and
 * the subscription itself is already saved in Postgres before this runs.
 */
export async function sendNewsletterSubscriptionEmail(sub: NewsletterEmailInput): Promise<{ sent: boolean; reason?: string }> {
  const t = getTransporter();
  if (!t) return { sent: false, reason: "not_configured" };

  try {
    await t.sendMail({
      from: `"${site.name} Website" <${gmailUser}>`,
      to: process.env.LEAD_NOTIFICATION_EMAIL || site.email,
      subject: `New newsletter subscriber: ${sub.email}`,
      text: `${sub.email} just subscribed to the newsletter.\n\nSee the full list in /admin/newsletter.`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px;">
          <h2 style="margin-bottom: 4px;">New newsletter subscriber</h2>
          <p style="font-size: 16px;"><b>${escapeHtml(sub.email)}</b></p>
          <p style="color:#999; font-size:12px;">See the full list in your admin panel under Newsletter.</p>
        </div>
      `,
    });
    return { sent: true };
  } catch (err) {
    console.error("Failed to send newsletter subscription email:", err);
    return { sent: false, reason: "send_failed" };
  }
}
function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
