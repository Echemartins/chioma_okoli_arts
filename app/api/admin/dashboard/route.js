import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Artwork from "@/models/Artwork";
import Subscriber from "@/models/Subscriber";
import ContactMessage from "@/models/ContactMessage";

export async function GET() {
  try {
    await dbConnect();

    const [artworksCount, subscribersCount, messagesCount] = await Promise.all([
      Artwork.countDocuments(),
      Subscriber.countDocuments(),
      ContactMessage.countDocuments(),
    ]);

    return NextResponse.json({
      artworksCount,
      subscribersCount,
      messagesCount,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
  }
}
