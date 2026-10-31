"use client";
import Link from "next/link";
import SiteLogo from "@/components/site-logo";
import {usePathname} from "next/navigation";
import {useEffect,useRef,useState} from "react";
import {LayoutDashboard,Images,ImagePlus,NotebookPen,Mail,Users,MessageSquare,Eye,ChartNoAxesCombined,ArrowUpRight,LogOut,Menu,X,Palette,Layers3} from "lucide-react";
import {adminFetch} from "@/lib/admin-fetch";

const groups=[
  {label:"STUDIO",links:[["Overview","/admin",LayoutDashboard],["Artworks","/admin/manageartworks",Images],["EVA media","/admin/eva",Layers3],["Add artwork","/admin/upload",ImagePlus],["Studio notes","/admin/journal",NotebookPen]]},
  {label:"CONVERSATIONS",links:[["Contact messages","/admin/contacts",Mail],["Acquisition enquiries","/admin/requests",MessageSquare],["Subscribers","/admin/subscribers",Users]]},
  {label:"INSIGHTS",links:[["Artwork visitors","/admin/visitors",Eye],["Website analytics","/admin/analytics",ChartNoAxesCombined]]},
  {label:"SETTINGS",links:[["Appearance","/admin/appearance",Palette]]},
];
export default function AdminShell({email,children}){
  const path=usePathname(),[open,setOpen]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState("");
  const menuButton=useRef(null);
  const title=groups.flatMap(g=>g.links).find(([,href])=>href===path)?.[0]||"Studio administration";
  useEffect(()=>{
    localStorage.removeItem("token");
    function check(){adminFetch("/api/auth/session").catch(()=>{})}
    const timer=setInterval(check,60000);window.addEventListener("focus",check);
    return()=>{clearInterval(timer);window.removeEventListener("focus",check)};
  },[]);
  useEffect(()=>{if(!open)return;function escape(e){if(e.key==="Escape"){setOpen(false);menuButton.current?.focus()}}document.addEventListener("keydown",escape);return()=>document.removeEventListener("keydown",escape)},[open]);
  async function logout(){setBusy(true);setError("");try{const r=await fetch("/api/auth/logout",{method:"POST"});if(!r.ok)throw Error();localStorage.removeItem("token");window.location.replace("/login")}catch{setError("Could not sign out. Please try again.");setBusy(false)}}
  return <div className="admin-shell"><div className="admin-mobile-bar"><Link href="/admin" className="admin-mobile-brand"><SiteLogo/> <span>THE ARTIST’S STUDIO</span></Link><button ref={menuButton} aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} aria-controls="admin-sidebar" onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}</button></div>
    <aside id="admin-sidebar" className={`admin-sidebar ${open?"is-open":""}`}><Link href="/admin" className="admin-brand" onClick={()=>setOpen(false)}><SiteLogo className="admin-brand-logo"/><strong>Chioma Favour Okoli</strong><span>THE ARTIST’S STUDIO</span></Link>
      <nav aria-label="Administration">{groups.map(g=><div className="admin-nav-group" key={g.label}><p>{g.label}</p>{g.links.map(([label,href,Icon])=><Link key={href} href={href} aria-current={path===href?"page":undefined} onClick={()=>setOpen(false)}><Icon size={17} strokeWidth={1.5}/><span>{label}</span></Link>)}</div>)}</nav>
      <div className="admin-sidebar-bottom"><Link href="/" target="_blank" rel="noopener noreferrer" className="admin-site-link">View portfolio <ArrowUpRight size={16}/></Link><div className="admin-account"><span className="admin-avatar">{email[0].toUpperCase()}</span><div><strong>Studio editor</strong><span>{email}</span></div></div><button onClick={logout} disabled={busy} className="admin-logout"><LogOut size={16}/>{busy?"Signing out…":"Sign out"}</button>{error&&<p role="alert" className="note">{error}</p>}</div>
    </aside>
    <div className="admin-workspace"><header className="admin-topbar"><div><span>Workspace</span><span>/</span><strong>{title}</strong></div><span className="admin-session-label"><i/> EDITOR SESSION</span></header><div className="admin-page" key={path}>{children}</div><footer className="admin-bottom-bar"><span>Chioma Favour Okoli · Studio administration</span><span>Make room for the work.</span></footer></div>
  </div>;
}

