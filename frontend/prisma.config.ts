import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { defineConfig, env } from "prisma/config";

/**
 * Prisma v7 configuration file.
 * This is required for Prisma CLI commands (migrate, db pull, etc.)
 *
 * HOW TO SET UP:
 *   1. Create .env.local with DATABASE_URL and DIRECT_URL from Neon.
 *   2. Run: npx prisma migrate dev --name init
 *
 * Note: The `dotenv/config` import at the top loads .env.local automatically.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
