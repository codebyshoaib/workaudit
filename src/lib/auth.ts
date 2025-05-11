import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextResponse } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { type NextAuthOptions } from "next-auth";
import { signInUser } from "@/services/authService";
import { prisma } from "@/lib/prismaClient";


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
          console.log(credentials?.email, credentials?.password, "in authorize function");
  
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required.");
          }
  
          // Authenticate using the custom signInUser function
          const user = await signInUser({
            email: credentials.email,
            password: credentials.password,
          });
  
          if (!user) {
            console.log("Invalid credentials.");
            throw new Error("Invalid credentials");
          }
  
          console.log("User returned from signInUser:", user);
          return user;  // Return the user object, which will be stored in the session
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
  
