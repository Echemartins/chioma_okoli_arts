import {NextResponse} from "next/server";
import dbConnect from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import {DEFAULT_LOGO_THEME} from "@/lib/brand-options";
export const dynamic="force-dynamic";
export async function GET(){try{await dbConnect();const settings=await SiteSettings.findById("appearance").lean();return NextResponse.json({logoTheme:settings?.logoTheme||DEFAULT_LOGO_THEME},{headers:{"Cache-Control":"no-store"}})}catch{return NextResponse.json({error:"Appearance settings unavailable"},{status:503})}}
