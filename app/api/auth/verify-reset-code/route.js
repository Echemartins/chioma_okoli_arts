import {NextResponse} from "next/server";
import dbConnect from "@/lib/mongodb";
import {verifyCodeInput} from "@/lib/password-recovery";
import {verifyRecoveryCode} from "@/lib/recovery-service";
export const runtime="nodejs";
export async function POST(req){
  const origin=req.headers.get("origin");
  if(origin&&origin!==new URL(req.url).origin)return NextResponse.json({message:"Invalid request"},{status:403});
  try{
    if(Number(req.headers.get("content-length")||0)>2000)return NextResponse.json({message:"Request too large"},{status:413});
    const parsed=verifyCodeInput.safeParse(await req.json());
    if(!parsed.success)return NextResponse.json({message:"Enter your email and six-digit code"},{status:400});
    await dbConnect();
    const token=await verifyRecoveryCode(parsed.data.email,parsed.data.code);
    if(!token)return NextResponse.json({message:"Invalid or expired code. Request a new code if needed."},{status:400});
    return NextResponse.json({token,message:"Email code verified. Choose your new password."},{headers:{"Cache-Control":"no-store"}});
  }catch{return NextResponse.json({message:"Unable to verify your code. Please try again."},{status:503})}
}
