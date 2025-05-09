// app/api/artworks/featured/route.js

import dbConnect from "@/lib/mongodb";
import Artwork from "@/models/Artwork";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const artworks = await Artwork.find({ isFeatured: true }).sort({ createdAt: -1 }).limit(10);
    return NextResponse.json({ artworks });
  } catch (error) {
    console.error("Error fetching featured artworks:", error);
    return NextResponse.json({ error: "Failed to fetch featured artworks" }, { status: 500 });
  }
}
