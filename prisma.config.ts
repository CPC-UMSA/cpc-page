import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// Prisma Migrate needs a *direct* (non-pooled) connection to run DDL and take
// advisory locks. Neon's pooled connection string works fine for the app at
// runtime (see app/helpers/db.server.ts) but should not be used for migrations.
// If you only have one Neon connection string, it's fine to reuse it for both.
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL,
  },
});
