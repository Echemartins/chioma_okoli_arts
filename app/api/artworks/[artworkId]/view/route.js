// app/api/artworks/[artworkId]/view/route.js
import dbConnect from "@/lib/mongodb";
import Artwork from "@/models/Artwork";

export async function POST(req, context) {
  try {
    await dbConnect();

    // context.params is a Promise, so await it
    const { artworkId } = await context.params;

    console.log("Incrementing views for artwork ID:", artworkId);

    const artwork = await Artwork.findByIdAndUpdate(
      artworkId,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!artwork) {
      return new Response(
        JSON.stringify({ message: "Artwork not found" }),
        { status: 404 }
      );
    }

    console.log("Artwork views updated:", artwork.views);

    return new Response(JSON.stringify(artwork), { status: 200 });
  } catch (error) {
    console.error("Error updating views:", error);
    return new Response(
      JSON.stringify({ message: error.message }),
      { status: 500 }
    );
  }
}
