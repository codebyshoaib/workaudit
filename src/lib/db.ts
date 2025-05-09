import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn"], // ✅ This is fine
    // ❌ DO NOT manually set datasources unless you know what you're doing
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
