import { uuid, text, pgTable } from 'drizzle-orm/pg-core';

export const links = pgTable('link', {
  id: uuid('id').primaryKey(),
  url: text('url').notNull().unique(),
  hashValue: text('hash_value').notNull().unique(),
});
