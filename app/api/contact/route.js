import ContactMessage from "@/models/ContactMessage";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  try {
    const message = await ContactMessage.create(body);
    return NextResponse.json({ success: true, message });
  } catch (err) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
