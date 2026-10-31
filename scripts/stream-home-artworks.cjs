const fs=require("node:fs");
const file="app/page.js";
let source=fs.readFileSync(file,"utf8");
source='import {Suspense} from "react";\n'+source;
const selection='async function FeaturedSelection(){const {artworks,unavailable}=await readArtworks();return unavailable?<p className="note">Artworks are temporarily unavailable. Please return shortly.</p>:<WorkGrid items={artworks.filter(w=>w.isFeatured).slice(0,8)}/>;}\n';
source=source.replace('export default async function Home(){const {artworks:works,unavailable}=await readArtworks();const featured=works.filter(w=>w.isFeatured).slice(0,8);return',selection+'export default function Home(){return');
source=source.replace('{unavailable?<p className="note">Artworks are temporarily unavailable. Please return shortly.</p>:<WorkGrid items={featured}/>}','<Suspense fallback={<p className="note">Loading selected works…</p>}><FeaturedSelection/></Suspense>');
fs.writeFileSync(file,source,"utf8");
