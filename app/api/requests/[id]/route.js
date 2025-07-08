import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import BuyRequest from "@/models/BuyRequest";

export async function PATCH(req, { params }) {
  await dbConnect();
  const { id } = params;
  const data = await req.json();

  try {
    const updated = await BuyRequest.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update request" }, { status: 500 });
  }
}
