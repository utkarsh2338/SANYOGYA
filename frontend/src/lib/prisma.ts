import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Enable WebSocket support for Neon in Node.js / serverless environments
neonConfig.webSocketConstructor = ws;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function makePrismaClient() {
  const connectionString = process.env.DATABASE_URL!;
  // PrismaNeon adapter accepts a connection string directly in Prisma v7
  const adapter = new PrismaNeon({ connectionString });

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? makePrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
