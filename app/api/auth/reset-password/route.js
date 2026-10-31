import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { resetInput } from "@/lib/password-recovery";
import { completeReset } from "@/lib/recovery-service";

export const runtime="nodejs";
export async function POST(req) {
  const origin=req.headers.get("origin");
  if(origin && origin!==new URL(req.url).origin)return NextResponse.json({message:"Invalid request"},{status:403});
  try {
    if(Number(req.headers.get("content-length")||0)>2000)return NextResponse.json({message:"Request too large"},{status:413});
    const parsed=resetInput.safeParse(await req.json());
    if(!parsed.success)return NextResponse.json({message:parsed.error.issues[0].message},{status:400});
    await dbConnect();
    const {email,token,password}=parsed.data;
    const reset=await completeReset(email,token,password);
    if(!reset)return NextResponse.json({message:"Your reset session has expired. Request and verify a new code."},{status:400});
    return NextResponse.json({message:"Password updated. Sign in with your new password."},{headers:{"Cache-Control":"no-store"}});
  }catch{return NextResponse.json({message:"Unable to reset your password. Please try again or request a new code."},{status:503})}
}
