import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

// Vite's dev server (remix vite:dev) restarts modules on every edit, which would
// otherwise open a fresh pool of Postgres connections each time. Caching the
// client on `global` keeps a single instance alive across those reloads.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set. Configure it in .env (see .env.example).');
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

// Remix's server build imports every route module eagerly (loaders/actions for
// the whole app live in one Node process), so this client must only connect
// lazily on first actual use — otherwise a missing DATABASE_URL would crash
// every page, not just the one route that needs the database.
export function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}
