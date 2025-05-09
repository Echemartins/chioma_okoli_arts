// app/api/auth/register/route.js
import User from "../../../../models/User";
import dbConnect from "../../../../lib/mongodb";
import { signToken } from "../../../../lib/auth";

import bcrypt from "bcryptjs"; // bcryptjs is often safer with Next.js
// import dbConnect from "@/lib/db"; // Assumes you have a db.js file for mongoose connection
// import { signToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    await dbConnect(); // Mongoose DB connection

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = signToken(newUser);

    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "Error registering user" },
      { status: 500 }
    );
  }
}
