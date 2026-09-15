import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifySessionValue } from "@/lib/admin/auth";

// Gates every /admin page and every /api/admin route behind a signed
// session cookie, except the login page/endpoint themselves. This is the
// single enforcement point for admin auth — route handlers under
// /api/admin don't re-check, they trust that middleware already ran.
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

const PUBLIC_PATHS = new Set(["/admin/login", "/api/admin/auth/login"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const session = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const valid = await verifySessionValue(session);

  if (valid) {
    return NextResponse.next();
  }

  // API routes get a JSON 401 instead of an HTML redirect.
  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}
