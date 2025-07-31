export const runtime = "nodejs";

import dbConnect from "@/lib/mongodb";
import Artwork from "@/models/Artwork";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  await dbConnect();

  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    const body = await req.json();

    const { title, description, category, price, isStoreItem, isFeatured, imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json({ message: "Image data is required" }, { status: 400 });
    }

    const cloudinaryResult = await cloudinary.uploader.upload(imageUrl, {
      folder: "artworks",
      resource_type: "image",
    });

    const uploadedImageUrl = cloudinaryResult.secure_url;

    const newArtwork = new Artwork({
      title,
      description,
      category,
      price,
      imageUrl: uploadedImageUrl,
      isStoreItem,
      isFeatured,
    });

    await newArtwork.save();

    return NextResponse.json({ message: "Artwork uploaded successfully" }, { status: 201 });

  } catch (error) {
    console.error("❌ Upload error:", error);
    return NextResponse.json({ error: "Failed to upload artwork" }, { status: 500 });
  }
}
