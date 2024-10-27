import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/drizzle/migrations',
  schema: ['./src/drizzle/schema/tables/*', './src/drizzle/schema/relations/*', './src/drizzle/schema/types.ts'],
  dialect: 'postgresql',
  strict: true,
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
