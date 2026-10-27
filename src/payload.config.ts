import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { HomePage } from "./globals/HomePage";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: { user: "users" },
  collections: [
    // Logins for the people who edit the site.
    { slug: "users", auth: true, admin: { useAsTitle: "email" }, fields: [] },
  ],
  globals: [HomePage],
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: {
      // The Neon integration manages DATABASE_URL on Vercel and sets sslmode=require, which the next
      // major version of pg will stop treating as a certificate check. verify-full keeps that check.
      connectionString: process.env.DATABASE_URL?.replace("sslmode=require", "sslmode=verify-full"),
    },
    // Local dev and production share one database, so schema changes ship as migrations
    // (`npx payload migrate:create`) rather than being pushed straight from `next dev`.
    push: false,
  }),
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
