
import bcrypt from "bcryptjs";
import User from "../../../../models/User";
import dbConnect from "../../../../lib/mongodb";
import { signToken } from "../../../../lib/auth";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, SESSION_SECONDS, allowedEditor } from "@/lib/admin-session";

export async function POST(req) {
  const origin=req.headers.get("origin");
  if(origin&&origin!==new URL(req.url).origin)return NextResponse.json({message:"Invalid request origin"},{status:403});
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = body.password;
    if (!email || typeof password !== "string") return Response.json({message:"Enter your email and password"},{status:400});

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if(!allowedEditor(user.email,process.env.CONTENT_EDITOR_EMAILS))return NextResponse.json({message:"This account does not have admin access."},{status:403});
    const token = signToken(user);

    const response=NextResponse.json({success:true},{headers:{"Cache-Control":"no-store"}});
    response.cookies.set(SESSION_COOKIE,token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:SESSION_SECONDS});
    return response;

  } catch (error) {
    console.error("Login Error:", error);
    return new Response(JSON.stringify({ message: "Error logging in" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

