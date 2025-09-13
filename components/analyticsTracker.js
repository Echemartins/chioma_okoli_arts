"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const prevUrlRef = useRef("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Build the full path using window for the query string.
    const url = pathname + window.location.search;

    // Avoid duplicate fires on same URL
    if (prevUrlRef.current === url) return;
    prevUrlRef.current = url;

    fetch("/api/visitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "pageview",
        path: url,
        userAgent: navigator.userAgent,
      }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
