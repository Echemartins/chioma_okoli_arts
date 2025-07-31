

import { NextResponse } from "next/server";
import Artwork from "../../../models/Artwork";
import dbConnect from "../../../lib/mongodb";

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const sort = searchParams.get("sort") || "newest";
  const page = Number.parseInt(searchParams.get("page") || "1", 10);
  const limit = Number.parseInt(searchParams.get("limit") || "12", 10);

  const filter = {};
  if (category && category !== "all") {
    filter.category = category;
  }

  let sortOption = { createdAt: -1 };
  if (sort === "oldest") sortOption = { createdAt: 1 };
  else if (sort === "lowPrice") sortOption = { price: 1 };
  else if (sort === "highPrice") sortOption = { price: -1 };

  try {
    const total = await Artwork.countDocuments(filter);

    const artworks = await Artwork.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      artworks,
      total,
      pages: Math.ceil(total / limit),
      page,
    });
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return NextResponse.json(
      { message: "Error fetching artworks" },
      { status: 500 }
    );
  }
}





