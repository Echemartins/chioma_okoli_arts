"use client";
import {createContext,useContext,useEffect,useState} from "react";
import {usePathname} from "next/navigation";
import {DEFAULT_LOGO_THEME,logoOptions} from "@/lib/brand-options";
const Context=createContext({theme:DEFAULT_LOGO_THEME,setTheme:()=>{}});
export const useBranding=()=>useContext(Context);
export default function BrandingProvider({children}){
  const[theme,setTheme]=useState(DEFAULT_LOGO_THEME);
  const path=usePathname();
  useEffect(()=>{const c=new AbortController();fetch("/api/branding",{cache:"no-store",signal:c.signal}).then(r=>r.ok?r.json():null).then(d=>{if(d&&logoOptions[d.logoTheme])setTheme(d.logoTheme)}).catch(()=>{});return()=>c.abort()},[]);
  useEffect(()=>{for(const link of document.querySelectorAll('link[rel="icon"],link[rel="shortcut icon"],link[rel="apple-touch-icon"]')){link.href=logoOptions[theme].src;link.type="image/png"}},[theme,path]);
  return <Context.Provider value={{theme,setTheme}}>{children}</Context.Provider>;
}
