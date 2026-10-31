import {NextResponse} from "next/server";
import {readArtworks,publicArtwork} from "@/lib/artworks";
export const dynamic="force-dynamic";
export async function GET(){
 const{artworks,unavailable}=await readArtworks();
 if(unavailable)return NextResponse.json({error:"Portfolio temporarily unavailable"},{status:503});
 return NextResponse.json({artworks:artworks.filter(w=>w.isFeatured).slice(0,8).map(publicArtwork)},{headers:{"Cache-Control":"no-store"}});
}
