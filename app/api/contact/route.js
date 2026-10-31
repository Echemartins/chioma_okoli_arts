import ContactMessage from "@/models/ContactMessage";
import dbConnect from "@/lib/mongodb";
import {NextResponse} from "next/server";
export async function POST(req){
  const origin=req.headers.get("origin");
  if(origin&&origin!==new URL(req.url).origin)return NextResponse.json({error:"Invalid origin"},{status:403});
  try{
    if(Number(req.headers.get("content-length")||0)>20000)return NextResponse.json({error:"Message too large"},{status:413});
    const body=await req.json();
    if(body.website)return NextResponse.json({success:true});
    const{name,email,message}=body;
    if(typeof name!=="string"||name.trim().length<2||name.length>120||typeof email!=="string"||email.length>254||!/^\S+@\S+\.\S+$/.test(email)||typeof message!=="string"||message.trim().length<10||message.length>6500)return NextResponse.json({error:"Check your name, email, and message."},{status:400});
    await dbConnect();
    await ContactMessage.create({name:name.trim(),email:email.trim(),message:message.trim()});
    return NextResponse.json({success:true});
  }catch{return NextResponse.json({error:"Unable to receive your enquiry. Please try again."},{status:503})}
}
