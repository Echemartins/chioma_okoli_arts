import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import BuyRequest from "@/models/BuyRequest";
import { sendEmail } from "@/lib/email";

export async function POST(req) {
  await dbConnect();
  const data = await req.json();

  try {
    const newRequest = await BuyRequest.create(data);

    // ✅ Send confirmation email to user
    const { email, phone, message, artworkId } = data;

    // Optional: You can include artwork title if populated
    const artworkTitle = newRequest?.artworkId?.title || "the artwork";

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; font-size: 16px;">
        <p>Hello,</p>
        <p>Thank you for your interest in purchasing <strong>${artworkTitle}</strong>.</p>
        <p>We have received your request and will get back to you shortly.</p>
        <hr/>
        <p><strong>Details you submitted:</strong></p>
        <ul>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          ${message ? `<li><strong>Message:</strong> ${message}</li>` : ""}
        </ul>
        <br/>
        <p>Best regards,<br/>Chioma-okoli-Arts Team</p>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: "Purchase Request Received - Chiomzy Arts",
      html: emailHtml,
    });

    return NextResponse.json(newRequest, { status: 201 });
  } catch (err) {
    console.error("Purchase request error:", err);
    return NextResponse.json({ error: "Failed to create request" }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();
  try {
    const requests = await BuyRequest.find().populate("artworkId");
    return NextResponse.json(requests);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 });
  }
}
