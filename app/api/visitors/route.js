import Visitor from "@/models/Visitor";
import Artwork from "@/models/Artwork";
import connectDB from "@/lib/mongodb";

export async function POST(req) {
  await connectDB();
  try {
    const { artworkId, ip, userAgent, location, userId } = await req.json();

    const visitor = await Visitor.create({
      artworkId,
      ip,
      userAgent,
      location,
      userId: userId || null,
    });

    return Response.json(visitor, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const artworkId = searchParams.get("artworkId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    let filter = {};
    if (artworkId) filter.artworkId = artworkId;
    if (startDate && endDate) {
      filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const visitors = await Visitor.find(filter)
      .populate("artworkId", "title")
      .sort({ createdAt: -1 });

    return Response.json(visitors);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}   