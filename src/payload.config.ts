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
    pool: { connectionString: process.env.DATABASE_URL },
    // Local dev and production share one database, so schema changes ship as migrations
    // (`npx payload migrate:create`) rather than being pushed straight from `next dev`.
    push: false,
  }),
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
