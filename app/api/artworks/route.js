import Artwork from "../../../models/Artwork";
import dbConnect from "../../../lib/mongodb";

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");

  let filter = {};
  if (category && category !== "all") filter.category = category;

  let sortOption = { createdAt: -1 }; // default: newest
  if (sort === "oldest") sortOption = { createdAt: 1 };
  if (sort === "lowPrice") sortOption = { price: 1 };
  if (sort === "highPrice") sortOption = { price: -1 };

  const artworks = await Artwork.find(filter).sort(sortOption);

  return new Response(JSON.stringify(artworks), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
