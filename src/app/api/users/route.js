import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  console.log("POST request received");
  const { name, email } = await request.json();
  await connectMongoDB();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "User already Exist!!" },
      { status: 400 }
    );
  }
  await User.create({ name, email });
  return NextResponse.json({ message: "User Stored !!" }, { status: 201 });
}

export async function GET(request) {
  try {
    await connectMongoDB();
    console.log("Connected to MongoDB for Get users");
    const data = await User.find();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({message: "something error whhile fetching Users Data"});
  }
}
