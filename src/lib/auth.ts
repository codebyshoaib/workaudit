import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";  // ✅ Correct

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { type NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

import { getServerSession } from "next-auth";
import { PrismaClient } from "@/generated/prisma";

// ✅ Zod schema import
import { z } from "zod";

// ✅ Zod validation schema for credentials
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

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
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // ✅ Zod validation applied here
        const parsed = LoginSchema.safeParse(credentials);
        if (!parsed.success) {
          console.error("Zod validation failed:", parsed.error.flatten());
          throw new Error("Invalid email or password format");
        }

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user.id,
          name: user.name ?? `${user.fname ?? ""} ${user.lname ?? ""}`.trim(),
          email: user.email,
        };
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

  secret: process.env.AUTH_SECRET,
};
