"use client";
import Image from "next/image";
import {useBranding} from "@/components/branding-provider";
import {logoOptions} from "@/lib/brand-options";
export default function SiteLogo({className="",priority=false}) {
  const {theme}=useBranding();
  return <Image className={`site-logo ${className}`} src={logoOptions[theme].src} alt="Chioma Okoli — Limitless Creativity" width={376} height={220} priority={priority} sizes="(max-width:600px) 92px, 150px"/>;
}
