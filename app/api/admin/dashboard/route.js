import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Artwork from "@/models/Artwork";
import Subscriber from "@/models/Subscriber";
import ContactMessage from "@/models/ContactMessage";
import {readArtworks} from "@/lib/artworks";

export async function GET() {
  try {
    await dbConnect();

    const [portfolio, subscribersCount, messagesCount] = await Promise.all([
      readArtworks({admin:true}),
      Subscriber.countDocuments(),
      ContactMessage.countDocuments(),
    ]);

    return NextResponse.json({
      artworksCount:portfolio.artworks.filter(w=>!w.deleted).length,
      publishedCount:portfolio.artworks.filter(w=>w.published&&!w.archived&&!w.deleted).length,
      subscribersCount,
      messagesCount,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
  }
}
