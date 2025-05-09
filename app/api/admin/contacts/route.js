import ContactMessage from "@/models/ContactMessage";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
  return NextResponse.json(messages);
}
