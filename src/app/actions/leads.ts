"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { after } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { rateLimit } from "@/lib/rate-limit";
import { sendLeadNotificationEmail } from "@/lib/email";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Enter a valid email").max(320),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  service: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1, "Please add a few details").max(5000),
  source: z.string().trim().max(200).optional(),
  // Honeypot field — real visitors never fill this in; bots that fill every
  // field will trip it.
  website: z.string().max(0, "").optional(),
});

export type LeadFormState = { ok: boolean; error?: string };

export async function submitLead(_prevState: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const parsed = leadSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    service: formData.get("service") || undefined,
    message: formData.get("message"),
    source: formData.get("source") || undefined,
    website: formData.get("website") || undefined,
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }

  // Honeypot tripped — pretend success so the bot doesn't learn anything,
  // but don't actually write a row.
  if (parsed.data.website) {
    return { ok: true };
  }

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? headerList.get("x-real-ip") ?? "unknown";

  const { allowed } = await rateLimit(`lead:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!allowed) {
    return { ok: false, error: "Too many submissions from this connection. Please try again in a few minutes." };
  }

  await db.insert(leads).values({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    service: parsed.data.service || null,
    message: parsed.data.message,
    source: parsed.data.source || null,
    ipAddress: ip,
  });

  // The lead is already safely stored above — email is a notification on
  // top of that, not the source of truth. Sent via after() so a slow or
  // unreachable SMTP connection never delays the visitor's confirmation:
  // the response below returns immediately, and the email (with its own
  // bounded timeouts, see src/lib/email.ts) sends in the background.
  after(() =>
    sendLeadNotificationEmail({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      service: parsed.data.service || null,
      message: parsed.data.message,
      source: parsed.data.source || null,
    })
  );

  return { ok: true };
}
