import { PrismaClient } from '@prisma/client';  
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import cookie from 'cookie'; 

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password } = await req.json();
  console.log('Received email and password:', email, password);  // Log received credentials

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log('User not found');  // Debug if the user doesn't exist
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.log('Invalid password');  // Debug invalid password scenario
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.AUTH_SECRET, {
    expiresIn: '1h',
  });

  console.log('Generated Token:', token);  // Debug generated token

  const response = NextResponse.json({
    message: 'Login successful',
    user: {
      email: user.email,
      id: user.id,
      name: user.name,
    },
  });

  response.headers.set('Set-Cookie', cookie.serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  }));

  return response;
}
