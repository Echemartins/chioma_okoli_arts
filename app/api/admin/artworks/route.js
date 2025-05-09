import dbConnect from "@/lib/mongodb";
import Artwork from "@/models/Artwork";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const title = searchParams.get("title");
  const category = searchParams.get("category");
  const query = {};
  if (title) query.title = { $regex: title, $options: "i" };
  if (category) query.category = category;

  const total = await Artwork.countDocuments(query);
  const artworks = await Artwork.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  return NextResponse.json({ artworks, total });
}
