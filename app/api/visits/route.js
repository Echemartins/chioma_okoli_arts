import { NextResponse } from "next/server";
// import { dbConnect } from "@/lib/mongodb";
import dbConnect from "@/lib/mongodb";
import Visit from "@/models/Visits";

// Use Node runtime for Mongoose
export const runtime = "nodejs";

export async function POST(req) {
  try {
    await dbConnect();

    const { path, event = "pageview", userAgent } = await req.json().catch(() => ({}));

    // basic metadata
    const referrer = req.headers.get("referer") || null;
    const sid = req.cookies.get("sid")?.value || null;

    // IP (behind proxies/CDNs)
    const fwdFor = req.headers.get("x-forwarded-for") || "";
    let ip = fwdFor.split(",")[0]?.trim() || req.headers.get("x-real-ip") || null;

    // Prefer Vercel edge geo headers if available to avoid external lookup
    let country = req.headers.get("x-vercel-ip-country") || null;
    let city = req.headers.get("x-vercel-ip-city") || null;

    // Fallback to ipapi if geo headers not present
    if (!country || !city) {
      try {
        const geoRes = await fetch(`https://ipapi.co/${ip || ""}/json/`, { cache: "no-store" });
        if (geoRes.ok) {
          const geo = await geoRes.json();
          ip = geo?.ip || ip;
          country = country || geo?.country_name || null;
          city = city || geo?.city || null;
        }
      } catch {
        // ignore geo failures; still record visit
      }
    }

    await Visit.create({
      event,
      path,
      referrer,
      sid,
      ip,
      country,
      city,
      userAgent: userAgent || null,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Visitor POST error:", e);
    return NextResponse.json({ error: "Failed to record visit" }, { status: 500 });
  }
}
