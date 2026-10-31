import { NextResponse } from "next/server";
import { isContentEditor } from "@/lib/content-editor";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";
export async function POST(req) {
  if (!isContentEditor(req)) return NextResponse.json({error:"Authorised editor access required"},{status:403});
  try {
    if (Number(req.headers.get("content-length") || 0) > 6 * 1024 * 1024) return NextResponse.json({error:"Images must be under 5 MB"},{status:413});
    const data = await req.formData();
    const file = data.get("image");
    if (!(file instanceof File) || file.size > 5 * 1024 * 1024 || !file.size) return NextResponse.json({error:"Choose an image under 5 MB"},{status:400});
    const bytes = Buffer.from(await file.arrayBuffer());
    const png = bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
    const jpeg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
    const webp = bytes.toString("ascii",0,4) === "RIFF" && bytes.toString("ascii",8,12) === "WEBP";
    if (!png && !jpeg && !webp) return NextResponse.json({error:"Use a JPEG, PNG, or WebP image. Convert HEIC photos first."},{status:400});
    const mime = png ? "image/png" : jpeg ? "image/jpeg" : "image/webp";
    const result = await cloudinary.uploader.upload(`data:${mime};base64,${bytes.toString("base64")}`, {folder:"artworks",resource_type:"image"});
    return NextResponse.json({url:result.secure_url});
  } catch { return NextResponse.json({error:"Image upload failed. Check Cloudinary configuration and retry."},{status:503}); }
}
