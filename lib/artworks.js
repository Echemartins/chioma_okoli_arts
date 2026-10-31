import dbConnect from "@/lib/mongodb";
import Artwork from "@/models/Artwork";
import { mergeArtworks, visibleArtworks } from "@/lib/artwork-records";
export { publicArtwork } from "@/lib/artwork-records";
import { cache } from "react";

const readDocuments = cache(async () => {
  await dbConnect();
  return Artwork.find({}).lean();
});
export async function readArtworks({ admin = false } = {}) {
  try {
    const rows = mergeArtworks(await readDocuments());
    return {artworks: admin ? rows : visibleArtworks(rows), unavailable:false};
  } catch (error) {
    if (admin) throw error;
    return {artworks:[], unavailable:true};
  }
}

