"use client";
import {createContext,useContext,useEffect,useState} from "react";
import {usePathname} from "next/navigation";
import {DEFAULT_LOGO_THEME,logoOptions} from "@/lib/brand-options";
import {DEFAULT_HOMEPAGE_IMAGE,homepageImages} from "@/lib/homepage-images";
const Context=createContext({theme:DEFAULT_LOGO_THEME,setTheme:()=>{},homepageImage:DEFAULT_HOMEPAGE_IMAGE,setHomepageImage:()=>{}});
export const useBranding=()=>useContext(Context);
export default function BrandingProvider({children}){
  const[theme,setTheme]=useState(DEFAULT_LOGO_THEME);
  const[homepageImage,setHomepageImage]=useState(DEFAULT_HOMEPAGE_IMAGE);
  const path=usePathname();
  useEffect(()=>{const c=new AbortController();fetch("/api/branding",{cache:"no-store",signal:c.signal}).then(r=>r.ok?r.json():null).then(d=>{if(d&&logoOptions[d.logoTheme])setTheme(d.logoTheme);if(d&&homepageImages[d.homepageImage])setHomepageImage(d.homepageImage)}).catch(()=>{});return()=>c.abort()},[]);
  useEffect(()=>{for(const link of document.querySelectorAll('link[rel="icon"],link[rel="shortcut icon"],link[rel="apple-touch-icon"]')){link.href=logoOptions[theme].src;link.type="image/png"}},[theme,path]);
  return <Context.Provider value={{theme,setTheme,homepageImage,setHomepageImage}}>{children}</Context.Provider>;
}
