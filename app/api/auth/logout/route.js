import {NextResponse} from "next/server";
import {SESSION_COOKIE} from "@/lib/admin-session";
export async function POST(req){
 const origin=req.headers.get("origin");
 if(origin&&origin!==new URL(req.url).origin)return NextResponse.json({error:"Invalid origin"},{status:403});
 const response=NextResponse.json({success:true},{headers:{"Cache-Control":"no-store"}});
 response.cookies.set(SESSION_COOKIE,"",{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:0});
 return response;
}
