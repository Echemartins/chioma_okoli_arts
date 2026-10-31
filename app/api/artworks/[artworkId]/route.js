import {NextResponse} from "next/server";
import {readArtworks,publicArtwork} from "@/lib/artworks";
import {saveArtwork} from "@/lib/artwork-save";
export async function GET(req,{params}){
 const{artworkId}=await params;const{artworks,unavailable}=await readArtworks();
 if(unavailable)return NextResponse.json({error:"Portfolio temporarily unavailable"},{status:503});
 const work=artworks.find(w=>w._id===artworkId||w.slug===artworkId);
 return work?NextResponse.json(publicArtwork(work)):NextResponse.json({error:"Artwork not found"},{status:404});
}
export async function PUT(req,{params}){const{artworkId}=await params;return saveArtwork(req,artworkId)}
export async function DELETE(){return NextResponse.json({error:"Use Archive in the artwork editor."},{status:405})}

