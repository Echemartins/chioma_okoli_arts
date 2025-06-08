export const runtime = "nodejs";

import dbConnect from "@/lib/mongodb";
import Artwork from "@/models/Artwork";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  await dbConnect();

  try {
    // 1. Check Authorization header (lowercase on Node.js)
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    // 2. Parse JSON body
    const body = await req.json();

    // Destructure fields from body
    const { title, description, category, price, isStoreItem, isFeatured, imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json({ message: "Image data is required" }, { status: 400 });
    }

    // 3. Upload base64 image to Cloudinary
    // imageUrl is a data URL: "data:image/png;base64,....."
    const cloudinaryResult = await cloudinary.uploader.upload(imageUrl, {
      folder: "artworks",
      resource_type: "image",
    });

    const uploadedImageUrl = cloudinaryResult.secure_url;

    // 4. Create and save artwork document
    const newArtwork = new Artwork({
      title,
      description,
      category,
      price,
      imageUrl: uploadedImageUrl,
      isStoreItem,
      isFeatured,
      // userId: user.id, // uncomment if needed
    });

    await newArtwork.save();

    return NextResponse.json({ message: "Artwork uploaded successfully" }, { status: 201 });

  } catch (error) {
    console.error("❌ Upload error:", error);
    return NextResponse.json({ error: "Failed to upload artwork" }, { status: 500 });
  }
}
