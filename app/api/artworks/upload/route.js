import dbConnect from "@/lib/mongodb";
import Artwork from "@/models/Artwork";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function POST(req) {
  await dbConnect();

  try {
    // Get and verify JWT token from Authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    // Get artwork data from request body
    const body = await req.json();
    const { title, description, category, price, imageUrl, isStoreItem, isFeatured } = body;

    // Create and save the artwork
    const newArtwork = new Artwork({
      title,
      description,
      category,
      price,
      imageUrl,
      isStoreItem,
      isFeatured,
    //   userId: user.id
    });

    await newArtwork.save();

    return NextResponse.json({ message: "Artwork uploaded successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error uploading artwork:", error);
    return NextResponse.json({ error: "Failed to upload artwork" }, { status: 500 });
  }
}
    
