import { pgTable, uuid, text, integer } from "drizzle-orm/pg-core";

export const GymsTable = pgTable("gym", {
  gym_id: uuid("gym_id").notNull().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  open_time: integer("open_time").notNull(),
  close_time: integer("close_time").notNull(),
});
