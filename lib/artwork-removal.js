import {NextResponse} from "next/server";
import {isContentEditor} from "@/lib/content-editor";
import dbConnect from "@/lib/mongodb";
import Artwork from "@/models/Artwork";
import {works} from "@/lib/portfolio";

export async function changeArtworkRemoval(req,id,restore=false){
  if(!isContentEditor(req))return NextResponse.json({error:"Editor access required"},{status:403});
  const seed=id?.startsWith("seed-")?works.find(w=>w.slug===id.slice(5)):null;
  if(!seed&&!/^[a-f0-9]{24}$/i.test(id||""))return NextResponse.json({error:"Invalid artwork ID"},{status:400});
  try{
    await dbConnect();
    let record;
    if(seed){record=await Artwork.findOne({sourceKey:seed.slug})||await Artwork.findOne({title:seed.title,sourceKey:{$exists:false}});if(!record)record=new Artwork({sourceKey:seed.slug,title:seed.title,imageUrl:seed.image,description:seed.description||"",isEva:!!seed.isEva});record.sourceKey=seed.slug;}
    else record=await Artwork.findById(id);
    if(!record)return NextResponse.json({error:"Artwork not found"},{status:404});
    if(!record.sourceKey){const original=works.find(w=>w.title.toLowerCase()===record.title?.trim().toLowerCase());if(original)record.sourceKey=original.slug;}
    record.deleted=!restore;record.published=false;
    if(restore)record.archived=false;
    await record.save();
    return NextResponse.json({success:true,message:restore?"Artwork restored as a draft.":"Artwork moved to Deleted."});
  }catch{return NextResponse.json({error:restore?"Could not restore artwork.":"Could not delete artwork. Please retry."},{status:503})}
}
