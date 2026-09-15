import { NextResponse } from "next/server";
import { ADMIN_COOKIE_MAX_AGE_SECONDS, ADMIN_COOKIE_NAME, checkPassword, createSessionValue } from "@/lib/admin/auth";

export async function POST(request: Request) {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.password || !checkPassword(body.password)) {
    // Small fixed delay to blunt trivial brute-force/timing probing.
    await new Promise((resolve) => setTimeout(resolve, 400));
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const session = await createSessionValue();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE_SECONDS,
  });
  return response;
}
