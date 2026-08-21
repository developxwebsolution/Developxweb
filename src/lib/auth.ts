import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    // Admin accounts are created by an existing admin (see /admin/users),
    // not via public self-signup, so we don't need email verification
    // gating sign-in for this internal tool.
    requireEmailVerification: false,
    minPasswordLength: 10,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh the session once per day of activity
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minute cookie cache to cut down on DB session lookups
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "viewer",
        input: false, // never settable by the client — only via server-side admin actions
      },
    },
  },
  advanced: {
    // Better Auth's own CSRF protection (origin/referer checks) stays on by
    // default; this just ensures cookies are locked down in production.
    useSecureCookies: process.env.NODE_ENV === "production",
  },
  rateLimit: {
    enabled: true,
    window: 60, // seconds
    max: 10, // 10 auth requests per IP per window — blocks brute-force login attempts
  },
});

export type Session = typeof auth.$Infer.Session;
