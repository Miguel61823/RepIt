import {pgTable, uuid, text, index, doublePrecision} from 'drizzle-orm/pg-core';

// TODO: ADD FIELDS LISTED IN CHAT
export const FacilitiesTable = pgTable(
  'facility',
  {
    facility_id: uuid('facility_id').notNull().primaryKey().defaultRandom(),
    osm_id: text('osm_id').unique().notNull(),
    name: text('name').notNull(),
    leisure: text('leisure').notNull(),
    lat: doublePrecision('lat'),
    lon: doublePrecision('lon'),
    address: text('address').notNull(),
    accessibility: text('accessibility').notNull(),
    opening_hours: text('opening_hours'),
    website: text('website'),
    phone: text('phone'),
  },
  table => ({
    location_index: index('location_index').on(table.lat, table.lon),
    osm_index: index('osm_index').on(table.osm_id),
  }),
);
