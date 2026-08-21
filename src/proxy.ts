import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// This is a fast, DB-free check (just verifies the signed session cookie is
// present and well-formed) so it can run on every request without adding
// latency. Full session + role validation happens again in
// `src/app/admin/layout.tsx` via `auth.api.getSession`, which is the actual
// security boundary — this middleware only exists to bounce obviously
// logged-out visitors before they see any admin HTML/JS.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
