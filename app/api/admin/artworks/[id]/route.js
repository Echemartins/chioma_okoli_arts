import {saveArtwork} from "@/lib/artwork-save";
import {NextResponse} from "next/server";
import {changeArtworkRemoval} from "@/lib/artwork-removal";
export async function PUT(req,{params}){const{id}=await params;return saveArtwork(req,id)}
export async function DELETE(req,{params}){const{id}=await params;return changeArtworkRemoval(req,id)}
export async function PATCH(req,{params}){let body;try{body=await req.json()}catch{return NextResponse.json({error:"Invalid request"},{status:400})}if(body.action!=="restore")return NextResponse.json({error:"Unsupported action"},{status:400});const{id}=await params;return changeArtworkRemoval(req,id,true)}

