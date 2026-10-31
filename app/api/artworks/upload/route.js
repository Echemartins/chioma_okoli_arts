import {saveArtwork} from "@/lib/artwork-save";
export const runtime="nodejs";
export async function POST(req){return saveArtwork(req)}

