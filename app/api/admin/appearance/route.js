import {NextResponse} from "next/server";
import dbConnect from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import {isContentEditor} from "@/lib/content-editor";
import {DEFAULT_LOGO_THEME,logoOptions} from "@/lib/brand-options";
export async function GET(req){if(!isContentEditor(req))return NextResponse.json({error:"Please sign in"},{status:401});try{await dbConnect();const record=await SiteSettings.findById("appearance").lean();return NextResponse.json({logoTheme:record?.logoTheme||DEFAULT_LOGO_THEME},{headers:{"Cache-Control":"no-store"}})}catch{return NextResponse.json({error:"Could not load appearance settings"},{status:503})}}
export async function PUT(req){if(!isContentEditor(req))return NextResponse.json({error:"Please sign in"},{status:401});try{const body=await req.json();if(!Object.hasOwn(logoOptions,body.logoTheme))return NextResponse.json({error:"Choose an available logo theme"},{status:400});await dbConnect();await SiteSettings.findByIdAndUpdate("appearance",{$set:{logoTheme:body.logoTheme}},{upsert:true,runValidators:true});return NextResponse.json({success:true,logoTheme:body.logoTheme})}catch{return NextResponse.json({error:"Could not save the logo theme. Please retry."},{status:503})}}
