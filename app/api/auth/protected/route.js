// app/api/auth/protected/route.js

import { verifyToken } from "../../../../lib/auth";

export async function GET(req) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    return new Response(JSON.stringify({ userId: decoded.userId }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Invalid or expired token", { status: 401 });
  }
}
