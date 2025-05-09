import dbConnect from '@/lib/mongodb';
import Request from '@/models/Request';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();

  try {
    console.log('fetching requests....')
    const requests = await Request.find().sort({ createdAt: -1 }).limit(5);
    console.log('requests fetched....')

    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching requests' }, { status: 500 });
  }
}
