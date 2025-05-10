import { PrismaClient } from '@prisma/client';  
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';

import cookie from 'cookie';

export async function POST(req) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.AUTH_SECRET, {
    expiresIn: '1h',
  });
console.log(token)
;  // Set JWT token as HttpOnly cookie
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
    secure: process.env.NODE_ENV === 'production', // Ensure the cookie is secure in production
    maxAge: 60 * 60, // 1 hour expiration
    path: '/',
  }));

  return response;
}
