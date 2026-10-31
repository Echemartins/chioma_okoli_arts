import {NextResponse} from "next/server";
import {isContentEditor} from "@/lib/content-editor";
import {artworkInput} from "@/lib/artwork-validation";
import dbConnect from "@/lib/mongodb";
import Artwork from "@/models/Artwork";
import {works} from "@/lib/portfolio";
export async function saveArtwork(req,id) {
  if(!isContentEditor(req)) return NextResponse.json({error:"Authorised editor access required. Configure CONTENT_EDITOR_EMAILS."},{status:403});
  let body;
  try {body=await req.json()} catch{return NextResponse.json({error:"Invalid artwork data"},{status:400})}
  const parsed=artworkInput.safeParse(body);
  if(!parsed.success) return NextResponse.json({error:parsed.error.issues.map(i=>i.path.join(".")+": "+i.message).join("; ")},{status:400});
  const data=parsed.data;
  const slug=id?.startsWith("seed-")?id.slice(5):null;
  if(id&&!slug&&!/^[a-f0-9]{24}$/i.test(id)) return NextResponse.json({error:"Invalid artwork ID"},{status:400});
  const seed=slug?works.find(w=>w.slug===slug):null;
  if(slug&&!seed) return NextResponse.json({error:"Artwork not found"},{status:404});
  try {
    await dbConnect();
    let record;
    if(seed) {
      record=await Artwork.findOne({sourceKey:slug}) || await Artwork.findOne({title:seed.title,sourceKey:{$exists:false}});
      if(!record)record=new Artwork({sourceKey:slug});
      record.sourceKey=slug;
    }else if(id){record=await Artwork.findById(id);if(!record)return NextResponse.json({error:"Artwork not found"},{status:404})}
    else record=new Artwork();
    if(id && !record.sourceKey) {
      const original = works.find(w => w.title.toLowerCase() === record.title?.trim().toLowerCase());
      if(original) record.sourceKey = original.slug;
    }
    if(record.deleted)return NextResponse.json({error:"Restore this artwork from Deleted before editing it."},{status:409});
    record.set(data);
    // Clearing an optional price must remove the previous stored value.
    if(data.price===undefined)record.price=undefined;
    await record.save();
    return NextResponse.json({artwork:record.toObject(),message:"Artwork saved"},{status:id?200:201});
  }catch{return NextResponse.json({error:"Could not save artwork. Your changes have not been confirmed; please retry."},{status:503})}
}
