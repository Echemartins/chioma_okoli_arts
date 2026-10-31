import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { recoveryEmail, REQUEST_MESSAGE } from "@/lib/password-recovery";
import { requestReset } from "@/lib/recovery-service";

export const runtime="nodejs";
export async function POST(req) {
  const origin=req.headers.get("origin");
  if(origin && origin!==new URL(req.url).origin)return NextResponse.json({message:"Invalid request"},{status:403});
  try {
    if(Number(req.headers.get("content-length")||0)>2000)return NextResponse.json({message:"Request too large"},{status:413});
    const body=await req.json();
    const parsed=recoveryEmail.safeParse(body.email);
    if(!parsed.success)return NextResponse.json({message:"Enter a valid email address"},{status:400});
    if(!process.env.EMAIL_USER||!process.env.EMAIL_PASS)return NextResponse.json({message:"Password recovery is temporarily unavailable. Please contact the site administrator."},{status:503});
    await dbConnect();
    const ip=req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    await requestReset(parsed.data,ip);
    return NextResponse.json({message:REQUEST_MESSAGE},{headers:{"Cache-Control":"no-store"}});
  }catch{return NextResponse.json({message:"Password recovery is temporarily unavailable. Please try again later."},{status:503})}
}
