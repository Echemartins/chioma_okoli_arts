"use client";
import {useEffect,useState} from "react";
import Image from "next/image";
import {adminFetch} from "@/lib/admin-fetch";
import {useBranding} from "@/components/branding-provider";
import {logoOptions} from "@/lib/brand-options";
export default function Appearance(){
  const{theme,setTheme}=useBranding(),[selected,setSelected]=useState(theme),[loaded,setLoaded]=useState(false),[busy,setBusy]=useState(false),[status,setStatus]=useState("");
  useEffect(()=>{adminFetch("/api/admin/appearance").then(async r=>{const d=await r.json();if(!r.ok)throw Error(d.error);setSelected(d.logoTheme);setLoaded(true)}).catch(e=>setStatus(e.message||"Could not load settings. Refresh to retry."))},[]);
  async function save(e){e.preventDefault();setBusy(true);setStatus("");try{const r=await adminFetch("/api/admin/appearance",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({logoTheme:selected})});const d=await r.json();if(!r.ok)throw Error(d.error);setTheme(d.logoTheme);setStatus("Logo theme saved. The website and browser icon now use your selection.")}catch(e){setStatus(e.message||"Could not save your selection.")}finally{setBusy(false)}}
  return <main id="main-content"><p className="eyebrow">STUDIO SETTINGS</p><h1>Appearance.</h1><p className="body-copy">Choose the logo colours used across your website and browser icon. The original logo is preserved, so you can switch back at any time.</p><form onSubmit={save}><fieldset className="logo-theme-options" disabled={!loaded||busy}><legend>Website logo</legend>{Object.entries(logoOptions).map(([key,option])=><label className="logo-theme-option" key={key}><input type="radio" name="logoTheme" value={key} checked={selected===key} onChange={()=>setSelected(key)}/><span><strong>{option.label}</strong><span className="logo-theme-preview"><Image src={option.src} alt={option.label+" logo preview"} width={376} height={220}/></span><span className="note">{option.description}</span></span></label>)}</fieldset><button className="primary-button" disabled={!loaded||busy}>{busy?"Saving…":"Save logo theme"}</button><p className="note" role="status">{status||(!loaded?"Loading saved preference…":"")}</p></form></main>;
}
