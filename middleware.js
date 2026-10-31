import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession, allowedEditor, requestToken, protectedAdminApi } from "./lib/admin-session";
export async function middleware(req) {
  const path=req.nextUrl.pathname;
  const page=path==="/admin"||path.startsWith("/admin/");
  const api=protectedAdminApi(path,req.method,req.nextUrl.searchParams);
  if(page||api){
    const token=page?req.cookies.get(SESSION_COOKIE)?.value:requestToken(req);
    const claims=await verifySession(token,process.env.JWT_SECRET);
    if(!claims||!allowedEditor(claims.email,process.env.CONTENT_EDITOR_EMAILS)){
      if(api)return NextResponse.json({error:claims?"This account does not have admin access.":"Please sign in."},{status:claims?403:401,headers:{"Cache-Control":"no-store"}});
      const url=new URL("/login",req.url);url.searchParams.set("next",path+req.nextUrl.search);
      if(claims)url.searchParams.set("reason","access");
      const response=NextResponse.redirect(url);response.headers.set("Cache-Control","no-store");
      response.cookies.set(SESSION_COOKIE,"",{path:"/",maxAge:0,httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production"});
      return response;
    }
    if(api&&!["GET","HEAD","OPTIONS"].includes(req.method)){
      const origin=req.headers.get("origin");
      if(origin&&origin!==req.nextUrl.origin)return NextResponse.json({error:"Invalid request origin"},{status:403});
    }
  }
  const response=NextResponse.next();
  if(page||api)response.headers.set("Cache-Control","private, no-store");
  if(!req.cookies.get("sid")?.value)response.cookies.set({name:"sid",value:crypto.randomUUID(),httpOnly:false,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:60*60*24*180});
  return response;
}
export const config={matcher:["/admin/:path*","/api/:path*","/((?!_next|favicon.ico|.*\\.(?:js|css|png|jpg|jpeg|svg|gif|ico|webp)).*)"]};

