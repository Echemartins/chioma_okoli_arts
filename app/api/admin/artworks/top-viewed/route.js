import { isContentEditor } from "@/lib/content-editor";
import dbConnect from '@/lib/mongodb';
import Artwork from '@/models/Artwork';
import { NextResponse } from 'next/server';

export async function GET(req) {
  if (!isContentEditor(req)) return NextResponse.json({error:"Editor access required"},{status:403});
  await dbConnect();

  try {
    const topViewed = await Artwork.find({deleted:{$ne:true}}).sort({ views: -1 }).limit(8);
    return NextResponse.json(topViewed);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching top viewed artworks' }, { status: 500 });
  }
}

