import { pgTable, uuid, text, integer, jsonb } from "drizzle-orm/pg-core";

export const GymsTable = pgTable("gym", {
  gym_id: uuid("gym_id").notNull().primaryKey().defaultRandom(),
  map_id: text("map_id").notNull(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  phone: text("phone"),
  website: text("website").default(`google.com`),
  image: text("image"),
  features: jsonb("features").$type<string[]>()
});
