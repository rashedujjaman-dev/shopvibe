import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "সকল তথ্য প্রদান করুন" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // ইউজারের অস্তিত্ব পরীক্ষা
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "এই ইমেইল দিয়ে অলরেডি একাউন্ট রয়েছে" },
        { status: 400 }
      );
    }

    // পাসওয়ার্ড হ্যাশিং
    const hashedPassword = await bcrypt.hash(password, 10);

    // ইউজার তৈরি
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "Account created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}