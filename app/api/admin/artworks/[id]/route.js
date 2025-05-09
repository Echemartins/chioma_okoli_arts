import connectDB from "@/lib/mongodb";
import Artwork from "@/models/Artwork";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await connectDB();
  await Artwork.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" });
}

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const updated = await Artwork.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}
