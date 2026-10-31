import {NextResponse} from "next/server";
import {readArtworks,publicArtwork} from "@/lib/artworks";
export const dynamic="force-dynamic";
export async function GET(req){
 const {artworks,unavailable}=await readArtworks();
 if(unavailable)return NextResponse.json({error:"Portfolio temporarily unavailable"},{status:503});
 const q=new URL(req.url).searchParams,category=q.get("category");
 const rows=artworks.filter(w=>(!category||category==="all"||w.category===category)&&(!q.has("eva")||w.isEva)&&(!q.has("featured")||w.isFeatured)&&(!q.has("selected")||w.isSelected));
 const page=Math.max(1,parseInt(q.get("page"))||1),limit=Math.min(200,Math.max(1,parseInt(q.get("limit"))||12));
 return NextResponse.json({artworks:rows.slice((page-1)*limit,page*limit).map(publicArtwork),total:rows.length,page,pages:Math.max(1,Math.ceil(rows.length/limit))},{headers:{"Cache-Control":"no-store"}});
}
