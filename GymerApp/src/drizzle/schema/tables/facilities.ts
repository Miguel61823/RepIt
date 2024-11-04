import { pgTable, uuid, text, integer, jsonb, decimal, index, doublePrecision } from "drizzle-orm/pg-core";

// TODO: ADD FIELDS LISTED IN CHAT
export const FacilitiesTable = pgTable("facility", {
  facility_id: uuid("facility_id").notNull().primaryKey().defaultRandom(),
  osm_id: text("osm_id").notNull(),
  name: text("name").notNull(),
  leisure: text("leisure").notNull(),
  lat: doublePrecision("lat").notNull(),
  lon: doublePrecision("lon").notNull(),
  address: text("address").notNull(),
  accessibility: text("accessibility").notNull(),
  opening_hours: text("opening_hours"),
  website: text("website"),
  phone: text("phone"),
}, (table) => ({
  location_index: index("location_index").on(table.lat, table.lon),
  osm_index: index("osm_index").on(table.osm_id)
}));
