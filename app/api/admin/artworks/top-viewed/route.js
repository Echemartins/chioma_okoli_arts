import dbConnect from '@/lib/mongodb';
import Artwork from '@/models/Artwork';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();

  try {
    const topViewed = await Artwork.find().sort({ views: -1 }).limit(8);
    return NextResponse.json(topViewed);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching top viewed artworks' }, { status: 500 });
  }
}
