import type { Config } from "drizzle-kit";

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
