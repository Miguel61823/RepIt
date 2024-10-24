import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
// import { relations } from "drizzle-orm";


export const SessionsTable = pgTable('session', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: text("user_id").notNull(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  date: timestamp('date').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  user_index: index('user_index').on(table.user_id),
}));
