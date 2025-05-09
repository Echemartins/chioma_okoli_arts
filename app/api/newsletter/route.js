import Subscriber from "@/models/Subscriber";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { sendConfirmationEmail } from "@/lib/email";

export async function POST(req) {
  await dbConnect();
  const { email } = await req.json();

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) return NextResponse.json({ message: "Already subscribed" });

    const subscriber = await Subscriber.create({ email });
    await sendConfirmationEmail(email);

    return NextResponse.json({ success: true, subscriber });
  } catch (err) {
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}
