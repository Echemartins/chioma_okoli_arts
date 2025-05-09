import Subscriber from "@/models/Subscriber";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  console.log('fetching subscribers....')
  const subs = await Subscriber.find({}).sort({ subscribedAt: -1 });
  console.log('fetched subscribers....')
  return NextResponse.json(subs);
}
