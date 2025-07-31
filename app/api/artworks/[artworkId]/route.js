import dbConnect from "@/lib/mongodb";
import Artwork from "@/models/Artwork";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  await dbConnect();

  try {
    const { artworkId } = await context.params;

    const artwork = await Artwork.findById(artworkId);

    if (!artwork) {
      return NextResponse.json({ message: "Artwork not found" }, { status: 404 });
    }

    return NextResponse.json(artwork);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching artwork" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  const { artworkId } = params;
  const data = await req.json();

  try {
    const updatedArtwork = await Artwork.findByIdAndUpdate(artworkId, data, {
      new: true,
    });

    if (!updatedArtwork) {
      return NextResponse.json({ message: "Artwork not found" }, { status: 404 });
    }

    return NextResponse.json(updatedArtwork);
  } catch (error) {
    return NextResponse.json({ error: "Error updating artwork" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const { artworkId } = params;

  try {
    await Artwork.findByIdAndDelete(artworkId);
    return NextResponse.json({ message: "Artwork deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting artwork" }, { status: 500 });
  }
}
