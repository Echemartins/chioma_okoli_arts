"use client";
import Image from "next/image";
import {useBranding} from "@/components/branding-provider";
import {DEFAULT_HOMEPAGE_IMAGE,homepageImages} from "@/lib/homepage-images";
export default function HomepageImage(){
  const {homepageImage}=useBranding();
  const image=homepageImages[homepageImage]||homepageImages[DEFAULT_HOMEPAGE_IMAGE];
  return <div className="hero-art homepage-portrait homepage-photo"><Image src={image.src} alt={image.alt} width={810} height={1080} priority sizes="(max-width:800px) 90vw, 46vw"/></div>;
}
