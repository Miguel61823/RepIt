import { pgTable, uuid, text, integer, jsonb } from "drizzle-orm/pg-core";

// TODO: ADD FIELDS LISTED IN CHAT
export const FacilitiesTable = pgTable("facility", {
  facility_id: uuid("facility_id").notNull().primaryKey().defaultRandom(),
  osm_id: text("osm_id").notNull(),
  name: text("name").notNull(),
  leisure: text("leisure").notNull(),
  lat: integer("lat").notNull(),
  lon: integer("lon").notNull(),
  address: text("address").notNull(),
  accessibility: text("accessibility").notNull(),
  opening_hours: text("opening_hours"),
  website: text("website"),
  phone: text("phone"),
});
