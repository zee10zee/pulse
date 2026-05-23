import { integer, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { usersTable } from './users';


export const postsTable = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  ownerId: text('ownerId')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow()
});


export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;
