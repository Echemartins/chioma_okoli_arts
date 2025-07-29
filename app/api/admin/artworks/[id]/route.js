

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Artwork from "@/models/Artwork";
import path from "path";
import fs from "fs/promises";

export async function DELETE(req, { params }) {
  await connectDB();
  await Artwork.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" });
}

export async function PUT(req, { params }) {
  await connectDB();

  // ✅ Use Next.js native FormData API
  const form = await req.formData();

  const updateData = {
    title: form.get("title"),
    description: form.get("description"),
    category: form.get("category"),
    price: form.get("price"),
  };

  // ✅ Handle file upload
  const file = form.get("image");
  if (file && file.name) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, buffer);
    updateData.imageUrl = `/uploads/${fileName}`;
  }

  const updated = await Artwork.findByIdAndUpdate(params.id, updateData, { new: true });
  return NextResponse.json(updated);
}
