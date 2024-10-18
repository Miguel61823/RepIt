import { index, jsonb, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const MemberTable = pgTable("member", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull()
})

export const WorkoutsTable = pgTable("workouts", {
  id: serial("id").primaryKey(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => MemberTable.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  date_completed: timestamp("date_completed"),
  exercises: jsonb().notNull()
}, table => ({
  user_id_index: index("user_id_index").on(table.user_id)
}))
