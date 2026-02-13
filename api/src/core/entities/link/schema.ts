import { bigint, text, pgTable } from 'drizzle-orm/pg-core';

export const links = pgTable('link', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  url: text('url').notNull().unique(),
  hashValue: text('hash_value').notNull().unique(),
});
