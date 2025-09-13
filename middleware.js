import { NextResponse } from "next/server";

export function middleware(req) {
  const res = NextResponse.next();

  // simple session id for grouping pageviews
  const hasSid = req.cookies.get("sid")?.value;
  if (!hasSid) {
    const sid = crypto.randomUUID();
    res.cookies.set({
      name: "sid",
      value: sid,
      httpOnly: false,         // readable by client if you want
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 180, // 180 days
    });
  }

  return res;
}

// exclude Next assets from middleware
export const config = {
  matcher: [
    "/((?!_next|favicon.ico|.*\\.(?:js|css|png|jpg|jpeg|svg|gif|ico|webp)).*)",
  ],
};
