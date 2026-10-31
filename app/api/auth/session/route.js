import {NextResponse} from "next/server";
import {isContentEditor} from "@/lib/content-editor";
export async function GET(req){return isContentEditor(req)?NextResponse.json({authenticated:true},{headers:{"Cache-Control":"no-store"}}):NextResponse.json({error:"Please sign in"},{status:401,headers:{"Cache-Control":"no-store"}})}
