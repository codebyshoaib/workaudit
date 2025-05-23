// lib/prisma.ts

import { PrismaClient } from "@prisma/client";

declare global {
  // Allow global prisma instance in development to prevent re-instantiation
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
