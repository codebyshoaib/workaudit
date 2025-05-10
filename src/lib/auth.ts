import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client"; 
import { NextResponse } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { type NextAuthOptions } from "next-auth";
import { signInUser } from "@/services/authService";
const prisma = new PrismaClient();

import { getServerSession } from "next-auth";

//seperation of concerns for crud logic
//jwt cookies 
//middleware for request proceed as global ...server side..check everything here
//Zod 
//clerk
//layered architecture 
//client side UI and populate data on server side
//security attacks as discussed in docx...
//auth z auth n





export async function auth() {
  return await getServerSession(authOptions); // ✅ no headers/cookies
}
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
  
    providers: [
      GoogleProvider({
        clientId: process.env.AUTH_GOOGLE_ID!,
        clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      }),
      GitHubProvider({
        clientId: process.env.AUTH_GITHUB_ID!,
        clientSecret: process.env.AUTH_GITHUB_SECRET!,
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const user = await signInUser(credentials?.email, credentials.password);
          if (user) {
            return user; // Return user object to store in session
          } else {
            throw new Error("Invalid credentials");
          }
        },
        
        
        
      }),
    ],
  
    session: {
      strategy: "jwt", 
    },
  
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.name = user.name;
          token.email = user.email;
        }
        return token;
      },
      async session({ session, token }) {
        // Attach user info to the session
        if (token) {
          session.user.id = token.id;
          session.user.email = token.email;
          session.user.name = token.name;
        }
        return session;
      },
      
    },
  
    pages: {
      signIn: "/signin",
    },
  
    secret: process.env.AUTH_SECRET,
  };
  
