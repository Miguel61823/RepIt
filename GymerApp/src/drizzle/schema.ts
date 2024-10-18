import { index, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const UserTable = pgTable("user", {
  email: text("email").notNull(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull()
})

export const WorkoutTable = pgTable("workout", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  date_completed: timestamp("date_completed"),
  exercises: jsonb().notNull(),
  clerk_user_id: text("clerk_user_id").notNull()
}, table => ({
  clerk_user_id_index: index("clerk_user_id_index").on(table.clerk_user_id)
}))
