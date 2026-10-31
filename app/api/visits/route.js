import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Visits from "@/models/Visits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function regionNameFromCode(code) {
  if (!code) return null;
  try {
    const dn = new Intl.DisplayNames(["en"], { type: "region" });
    return dn.of(code.toUpperCase()) || null; // "NG" -> "Nigeria"
  } catch {
    return code.toUpperCase();
  }
}

async function lookupGeo(ip) {
  // Short timeout (2s) to avoid route hangs
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 2000);
  try {
    const res = await fetch(`https://ipapi.co/${ip || ""}/json/`, {
      cache: "no-store",
      signal: controller.signal,
    });
    if (res.ok) return await res.json();
  } catch {
    // ignore; we’ll still record the visit without geo
  } finally {
    clearTimeout(t);
  }
  return null;
}

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json().catch(() => ({}));
    const { path = null, event = "pageview", userAgent = null } = body;

    // Basic metadata
    const referrer = req.headers.get("referer") || null;
    const sid = req.cookies.get("sid")?.value || null;

    // IP behind proxies/CDNs
    const fwdFor = req.headers.get("x-forwarded-for") || "";
    let ip =
      fwdFor.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("fastly-client-ip") ||
      null;

    // Prefer platform headers (fast, no egress)
    let countryCode =
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      null;
    let city =
      req.headers.get("x-vercel-ip-city") ||
      req.headers.get("cf-ipcity") ||
      null;

    let country = regionNameFromCode(countryCode);

    // Fallback: external geo lookup if anything missing
    if (!country || !city) {
      const g = await lookupGeo(ip);
      if (g) {
        ip = g.ip || ip;
        country = country || g.country_name || null;
        countryCode = countryCode || g.country || null; // e.g., "NG"
        city = city || g.city || null;
      }
    }

    await Visits.create({
      event,
      path,
      referrer,
      sid,
      ip: ip || null,
      country: country || null,
      countryCode: (countryCode || "")?.toUpperCase() || null,
      city: city || null,
      userAgent,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Visitor POST error:", e);
    return NextResponse.json({ error: "Failed to record visit" }, { status: 500 });
  }
}
