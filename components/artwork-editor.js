"use client";
import {ArrowUpRight,ArrowUp,ArrowDown} from "lucide-react";

import {adminFetch} from "@/lib/admin-fetch";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { categories, artworkThemes, videoEmbed } from "@/lib/artwork-validation";

export const blankArtwork = {
  title: "", year: "", medium: "", dimensions: "", category: "Painting", theme: "", series: "",
  description: "", imageUrl: "", alt: "", exhibitionHistory: "", processNotes: "", researchNotes: "",
  media: [], videoUrls: [], relatedWorks: [], sortOrder: 0, price: "", published: false,
  isSelected: false, isFeatured: false, isEva: false, acquisitionAvailable: false, archived: false,
};

function headers() { return {}; }

function ImageField({ label, value, onChange, onBusy, disabled }) {
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);
  async function upload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setStatus("Choose a JPEG, PNG, or WebP image under 5 MB."); e.target.value = ""; return;
    }
    setUploading(true); onBusy(1); setStatus("Uploading…");
    try {
      const data = new FormData(); data.append("image", file);
      const response = await adminFetch("/api/admin/artwork-media", { method: "POST", headers: headers(), body: data });
      const result = await response.json();
      if (!response.ok) throw Error(result.error || "Upload failed");
      onChange(result.url); setStatus("Image uploaded. Save the artwork to keep this change.");
    } catch (error) { setStatus(error.message || "Upload failed. Please retry."); }
    finally { setUploading(false); onBusy(-1); e.target.value = ""; }
  }
  return <div className="editor-image-field"><label>{label}<input value={value || ""} disabled={disabled || uploading} onChange={e => onChange(e.target.value)} placeholder="Upload below, or enter a Cloudinary URL / local image path" /></label><label className="upload-label">Upload image<input type="file" accept="image/jpeg,image/png,image/webp" disabled={disabled || uploading} onChange={upload} /></label><p className="note" role="status">{status}</p></div>;
}

export default function ArtworkEditor({ artwork, allWorks = [], onSaved, onCancel }) {
  const [form, setForm] = useState({ ...blankArtwork, ...artwork, price: artwork?.price ?? "" });
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploads, setUploads] = useState(0);
  const [dirty, setDirty] = useState(false);
  const change = (key, value) => { setForm(previous => ({ ...previous, [key]: value })); setDirty(true); };
  const busyChange = amount => setUploads(n => n + amount);
  const updateMedia = (index, key, value) => { setForm(previous => ({...previous, media:previous.media.map((m,i) => i === index ? {...m,[key]:value} : m)})); setDirty(true); };
  function cancel() {
    if (uploads || saving) return;
    if (dirty && !window.confirm("Leave without saving your artwork changes?")) return;
    onCancel?.();
  }
  async function save(e) {
    e.preventDefault(); setSaving(true); setStatus("");
    try {
      const response = await adminFetch(artwork?._id ? `/api/admin/artworks/${artwork._id}` : "/api/admin/artworks", {
        method: artwork?._id ? "PUT" : "POST", headers: { ...headers(), "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sortOrder: Number(form.sortOrder), price: form.price === "" ? undefined : Number(form.price) }),
      });
      const result = await response.json();
      if (!response.ok) throw Error(result.error || "Could not save artwork");
      setDirty(false); setStatus("Artwork saved successfully."); onSaved?.(result.artwork);
    } catch (error) { setStatus(error.message || "Unable to save. Your changes remain in the form."); }
    finally { setSaving(false); }
  }
  const input = (label, key, options = {}) => <label key={key}>{label}<input value={form[key] ?? ""} onChange={e => change(key, e.target.value)} {...options} /></label>;
  const area = (label, key, max = 15000) => <label>{label}<textarea value={form[key] || ""} maxLength={max} onChange={e => change(key, e.target.value)} /></label>;
  const check = (label, key) => <label className="editor-check"><input type="checkbox" checked={!!form[key]} onChange={e => change(key, e.target.checked)} />{label}</label>;
  return <form className="contact-form artwork-editor" onSubmit={save}>
    <div className="editor-heading"><h2>{artwork?._id ? "Edit artwork" : "Add artwork"}</h2>{onCancel && <button type="button" className="secondary-button" onClick={cancel} disabled={saving || uploads > 0}>Close editor</button>}</div>
    <fieldset disabled={saving}><legend>Artwork information</legend><div className="editor-grid">
      {input("Title", "title", { required:true, minLength:2, maxLength:200 })}
      {input("Year / date", "year", { maxLength:50 })}
      {input("Medium & materials", "medium", { maxLength:500 })}
      {input("Dimensions (include units)", "dimensions", { maxLength:200 })}
      {input("Series", "series", { maxLength:200 })}
      <label>Category<select value={form.category} onChange={e => change("category",e.target.value)}>{categories.map(c => <option key={c}>{c}</option>)}</select></label>
      <label>Theme<select value={form.theme || ""} onChange={e => change("theme",e.target.value)}><option value="">Choose a theme</option>{artworkThemes.map(t => <option key={t}>{t}</option>)}</select></label>
      {input("Display order (lower numbers first)", "sortOrder", { type:"number", min:0, max:99999, required:true })}
    </div>{area("Conceptual description — meaning, ideas, and context", "description")}
    <p className="note">A description is required to publish. Leave unconfirmed dates, dimensions, and exhibition claims blank.</p></fieldset>

    <fieldset disabled={saving}><legend>Main artwork image</legend>
      <ImageField label="Full artwork image" value={form.imageUrl} onChange={v => change("imageUrl",v)} onBusy={busyChange} disabled={uploads > 0} />
      {input("Image alt text — describe what is visible", "alt", {maxLength:500})}
      {form.imageUrl && /^(\/[^/]|https:\/\/res\.cloudinary\.com\/)/.test(form.imageUrl) && <Image className="editor-preview" src={form.imageUrl} alt={form.alt || form.title || "Artwork preview"} width={500} height={400} />}
    </fieldset>

    <fieldset disabled={saving}><legend>Details, process & installation images</legend><p className="note">Add up to 24 images. Use the arrows to change their public display order. Removing an image here does not delete its original Cloudinary file.</p>
      {form.media.map((m,index) => <div className="media-editor" key={index}>
        <h3>Image {index + 1}</h3><ImageField label="Image" value={m.url} onChange={v => updateMedia(index,"url",v)} onBusy={busyChange} disabled={uploads > 0}/>
        <div className="editor-grid"><label>Image type<select value={m.kind} onChange={e => updateMedia(index,"kind",e.target.value)}>{["Detail","Process","Light study","Installation","Full work"].map(k => <option key={k}>{k}</option>)}</select></label><label>Alt text<input value={m.alt} maxLength={500} onChange={e => updateMedia(index,"alt",e.target.value)}/></label></div>
        <label>Caption<input value={m.caption} maxLength={1000} onChange={e => updateMedia(index,"caption",e.target.value)}/></label>
        <div className="editor-actions">{[-1,1].map(direction => <button key={direction} className="secondary-button" type="button" aria-label={direction===-1?"Move image up":"Move image down"} disabled={uploads>0 || index+direction<0 || index+direction>=form.media.length} onClick={()=>{const media=[...form.media];[media[index],media[index+direction]]=[media[index+direction],media[index]];change("media",media)}}>{direction===-1?<><ArrowUp size={15} aria-hidden="true"/> Up</>:<><ArrowDown size={15} aria-hidden="true"/> Down</>}</button>)}<button type="button" className="secondary-button" disabled={uploads>0} onClick={()=>change("media",form.media.filter((_,i)=>i!==index))}>Remove image</button></div>
      </div>)}<button className="secondary-button" type="button" disabled={form.media.length>=24 || uploads>0} onClick={()=>change("media",[...form.media,{url:"",alt:"",caption:"",kind:"Detail"}])}>+ Add image</button>
    </fieldset>

    <fieldset disabled={saving}><legend>Process videos</legend><p className="note">Paste YouTube or Vimeo links. Upload video files to your video platform first.</p>
      {form.videoUrls.map((url,i)=><div className="video-editor" key={i}><label>Video {i+1}<input type="url" required value={url} onChange={e=>change("videoUrls",form.videoUrls.map((v,n)=>n===i?e.target.value:v))}/></label>{url&&!videoEmbed(url)&&<p className="note">Use a valid YouTube watch/share or Vimeo video link.</p>}<button type="button" className="secondary-button" onClick={()=>change("videoUrls",form.videoUrls.filter((_,n)=>n!==i))}>Remove video</button></div>)}
      <button type="button" className="secondary-button" disabled={form.videoUrls.length>=8} onClick={()=>change("videoUrls",[...form.videoUrls,""])}>+ Add video</button>
    </fieldset>

    <fieldset disabled={saving}><legend>Context & research</legend>
      {area("Exhibition history — dates, titles, venues; one entry per line", "exhibitionHistory",10000)}
      {area("Creative process notes", "processNotes")}{area("EVA research observations — light, fading, support, durability, environment", "researchNotes")}
      <label>Related works (select multiple using Ctrl / Command)<select multiple size={Math.min(8,Math.max(3,allWorks.length))} value={form.relatedWorks} onChange={e=>change("relatedWorks",Array.from(e.target.selectedOptions,o=>o.value))}>{allWorks.filter(w=>!w.deleted&&w._id!==artwork?._id).map(w=><option key={w._id} value={w.slug}>{w.title}</option>)}</select></label>
    </fieldset>

    <fieldset disabled={saving}><legend>Visibility & acquisition</legend>
      {check("Published — visible to visitors", "published")}{check("Selected portfolio", "isSelected")}{check("Feature on homepage (first 12 in display order)", "isFeatured")}{check("Show on EVA Foam Research page", "isEva")}{check("Accept acquisition enquiries for this work", "acquisitionAvailable")}{check("Archived — hidden from all public pages", "archived")}
      {input("Private reference price in USD (optional, never displayed publicly)","price",{type:"number",min:0,step:"0.01"})}
      <p className="note">Unpublish to keep a draft. Archive to hide a work while preserving its details. Publishing affects the portfolio, homepage and EVA page according to the options above.</p>
    </fieldset>
    <div className="editor-save"><button type="submit" disabled={saving || uploads>0}>{saving?"Saving…":uploads>0?"Wait for image upload…":"Save artwork"}</button>{artwork?.slug&&form.published&&!form.archived&&<Link href={`/selected-works/${artwork.slug}`} target="_blank" rel="noopener noreferrer" className="text-link">View saved public page <ArrowUpRight size={16} aria-hidden="true"/></Link>}<p role="status" aria-live="polite">{status}</p></div>
  </form>;
}

