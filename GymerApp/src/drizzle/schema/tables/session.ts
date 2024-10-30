import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";


export const SessionsTable = pgTable('session', {
  session_id: uuid('id').primaryKey().defaultRandom(),
  user_id: text("user_id").notNull(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  date: timestamp('date').notNull().defaultNow(),
  session_data: text('data').notNull()
}, (table) => ({
  user_session_index: index('user_session_index').on(table.user_id),
}));
