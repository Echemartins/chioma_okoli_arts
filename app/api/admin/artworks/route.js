import {NextResponse} from "next/server";
import {isContentEditor} from "@/lib/content-editor";
import {readArtworks} from "@/lib/artworks";
import {saveArtwork} from "@/lib/artwork-save";
export async function GET(req) {
  if (!isContentEditor(req)) return NextResponse.json({error:"Authorised editor access required. Configure CONTENT_EDITOR_EMAILS."},{status:403});
  try {
    const {artworks}=await readArtworks({admin:true});
    const q=new URL(req.url).searchParams;
    const title=(q.get("title")||"").toLowerCase();
    const category=q.get("category");
    const rows=artworks.filter(w=>(q.get("includeDeleted")==="1"||!w.deleted)&&w.title.toLowerCase().includes(title)&&(!category||w.category===category));
    const page=Math.max(1,parseInt(q.get("page"))||1),limit=Math.min(200,Math.max(1,parseInt(q.get("limit"))||100));
    return NextResponse.json({artworks:rows.slice((page-1)*limit,page*limit),total:rows.length},{headers:{"Cache-Control":"no-store"}});
  }catch{return NextResponse.json({error:"Artwork database unavailable. Please retry."},{status:503})}
}
export async function POST(req){return saveArtwork(req);}

