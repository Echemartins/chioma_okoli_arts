"use client";
import {adminFetch} from "@/lib/admin-fetch";

import {useEffect,useState} from "react";
import {useRouter} from "next/navigation";
import ArtworkEditor from "@/components/artwork-editor";
export default function Upload(){const router=useRouter();const[works,setWorks]=useState([]);useEffect(()=>{adminFetch("/api/admin/artworks?limit=200",{}).then(r=>r.ok?r.json():null).then(d=>{if(d)setWorks(d.artworks)}).catch(()=>{})},[]);return <main id="main-content" className="wrap section"><ArtworkEditor allWorks={works} onCancel={()=>router.push("/admin/manageartworks")} onSaved={()=>router.push("/admin/manageartworks")}/></main>}


