import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";


import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fname, lname, email, password, acceptedTerms } = body;

    if (!fname || !lname || !email || !password || acceptedTerms !== true) {
      return NextResponse.json(
        { error: "All fields are required and terms must be accepted." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        fname,
        lname,
        email,
        password: hashedPassword,
        acceptedTerms,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error", detail: error.message },
      { status: 500 }
    );
  }
}
