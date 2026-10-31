"use client";
import Image from "next/image";
import {useBranding} from "@/components/branding-provider";
import {DEFAULT_HOMEPAGE_IMAGE,homepageImages} from "@/lib/homepage-images";
export default function HomepageImage(){
  const {homepageImage}=useBranding();
  const image=homepageImages[homepageImage]||homepageImages[DEFAULT_HOMEPAGE_IMAGE];
  return <div className={"hero-art homepage-portrait homepage-photo"+(image.wide?" is-wide":"")}><Image src={image.src} alt={image.alt} width={image.width} height={image.height} priority sizes="(max-width:800px) 90vw, 46vw"/></div>;
}
