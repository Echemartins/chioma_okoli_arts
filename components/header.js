"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect,useRef,useState} from "react";
import {Menu,X} from "lucide-react";
import SiteLogo from "@/components/site-logo";
const links=[["Home","/"],["Practice","/practice"],["Selected Works","/selected-works"],["EVA Foam Research","/research"],["Studio Notes","/studio-notes"],["About","/about"],["CV & Exhibitions","/cv"],["Contact","/contact"]];
export default function Header(){
 const path=usePathname(),[open,setOpen]=useState(false),toggle=useRef(null);
 useEffect(()=>{if(!open)return;const close=e=>{if(e.key==="Escape"){setOpen(false);toggle.current?.focus()}};document.addEventListener("keydown",close);return()=>document.removeEventListener("keydown",close)},[open]);
 return <header className="site-header"><Link className="header-brand" href="/" aria-label="Chioma Favour Okoli — Home" onClick={()=>setOpen(false)}><SiteLogo priority/><span className="wordmark">CHIOMA FAVOUR OKOLI<span>CONTEMPORARY ARTIST & CURATOR</span></span></Link><button ref={toggle} className="menu-toggle" type="button" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} aria-controls="main-nav" onClick={()=>setOpen(!open)}>{open?<X size={25} aria-hidden="true"/>:<Menu size={25} aria-hidden="true"/>}</button><nav id="main-nav" aria-label="Main navigation" className={open?"main-nav is-open":"main-nav"}>{links.map(([label,href])=><Link key={href} href={href} aria-current={path===href?"page":undefined} onClick={()=>setOpen(false)}>{label}</Link>)}</nav></header>;
}
