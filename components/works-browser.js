"use client";
import {useEffect,useState} from "react";
import {WorkGrid} from "@/components/portfolio";
import {artworkThemes} from "@/lib/artwork-validation";
export default function WorksBrowser({mode="portfolio"}){
 const[filter,setFilter]=useState("All works"),[works,setWorks]=useState([]),[status,setStatus]=useState("Loading artworks…");
 useEffect(()=>{const c=new AbortController();fetch("/api/artworks?limit=200"+(mode==="eva"?"&eva=1":mode==="featured"?"&featured=1":""),{signal:c.signal,cache:"no-store"}).then(r=>{if(!r.ok)throw Error();return r.json()}).then(d=>{setWorks(d.artworks);setStatus(d.artworks.length?"":"New work will appear here as it is published.")}).catch(e=>{if(e.name!=="AbortError")setStatus("Artworks are temporarily unavailable. Please try again shortly.")});return()=>c.abort()},[mode]);
 if(mode!=="portfolio")return <>{status&&<p className="note" role="status">{status}</p>}<WorkGrid items={mode==="featured"?works.slice(0,8):works}/></>;
 const filtered=works.filter(w=>filter==="All works"||w.theme===filter),selected=filtered.filter(w=>w.isSelected),archive=filtered.filter(w=>!w.isSelected);
 return <>{status&&<p className="note" role="status">{status}</p>}<div className="filter-bar" aria-label="Filter artworks">{["All works",...artworkThemes].map(f=><button key={f} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}</button>)}</div><WorkGrid items={selected}/>{archive.length>0&&<section className="section"><h2>From the archive</h2><WorkGrid items={archive}/></section>}{!status&&!filtered.length&&<p className="note">No published works in this theme yet.</p>}</>
}
