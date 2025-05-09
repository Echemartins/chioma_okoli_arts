import dbConnect from '@/lib/mongodb';
import Artwork from '@/models/Artwork';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();

  try {
    const latest = await Artwork.find().sort({ createdAt: -1 }).limit(8);
    return NextResponse.json(latest);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching latest artworks' }, { status: 500 });
  }
}
