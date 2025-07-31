
import bcrypt from "bcryptjs";
import User from "../../../../models/User";
import dbConnect from "../../../../lib/mongodb";
import { signToken } from "../../../../lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = signToken(user);

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Login Error:", error);
    return new Response(JSON.stringify({ message: "Error logging in" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

