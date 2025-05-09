import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@/generated/prisma"; 
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { type NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

import { getServerSession } from "next-auth";

export async function auth() {
  return await getServerSession(authOptions);
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
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
          });
  
          if (!user || !user.password) throw new Error("No user found");
  
          const isValid = await bcrypt.compare(
            credentials.password!,
            user.password
          );
          if (!isValid) throw new Error("Invalid credentials");
  
          return {
            id: user.id,
            name: user.name ?? `${user.fname ?? ""} ${user.lname ?? ""}`.trim(),
            email: user.email,
          };
        },
      }),
    ],
  
    session: {
      strategy: "jwt", // Required when using CredentialsProvider
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
        if (token) {
          session.user.id = token.id as string;
          session.user.name = token.name as string;
          session.user.email = token.email as string;
        }
        return session;
      },
    },
  
    pages: {
      signIn: "/signin",
    },
  
    secret: process.env.NEXTAUTH_SECRET,
  };
  
