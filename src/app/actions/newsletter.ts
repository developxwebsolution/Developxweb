"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { rateLimit } from "@/lib/rate-limit";
import { after } from "next/server";
import { sendNewsletterSubscriptionEmail } from "@/lib/email";
const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(320),
  // Honeypot — same pattern as the lead form.
  company: z.string().max(0, "").optional(),
});

export type NewsletterFormState = { ok: boolean; error?: string };

export async function subscribeToNewsletter(_prev: NewsletterFormState, formData: FormData): Promise<NewsletterFormState> {
  const parsed = schema.safeParse({
    email: formData.get("email"),
    company: formData.get("company") || undefined,
  });
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Enter a valid email." };

  if (parsed.data.company) return { ok: true }; // honeypot tripped — silently succeed

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? headerList.get("x-real-ip") ?? "unknown";
  const { allowed } = await rateLimit(`newsletter:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!allowed) return { ok: false, error: "Too many attempts from this connection. Please try again in a few minutes." };

  const existing = await db
    .select()
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.email, parsed.data.email))
    .limit(1);

  if (existing.length > 0) {
    if (existing[0].unsubscribedAt) {
      // Re-subscribing after a previous unsubscribe.
      await db
        .update(newsletterSubscribers)
        .set({ unsubscribedAt: null, subscribedAt: new Date() })
        .where(eq(newsletterSubscribers.id, existing[0].id));
    }
    // Already subscribed — treat as success either way rather than
    // revealing whether an email is already on the list.
    return { ok: true };
  }

  await db.insert(newsletterSubscribers).values({ email: parsed.data.email });
   // Fire-and-forget, same as leads — response returns instantly, email
  // sends in the background so a slow/unreachable Gmail never delays the
  // visitor's confirmation.
  after(() => sendNewsletterSubscriptionEmail({ email: parsed.data.email }));
  return { ok: true };
}
