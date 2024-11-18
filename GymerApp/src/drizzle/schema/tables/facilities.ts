import { pgTable, uuid, text, timestamp, integer, index,  doublePrecision} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Keep existing Facilities table
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

// Create new Equipment table
export const EquipmentTable = pgTable('equipment', {
  equipment_id: uuid('equipment_id').notNull().primaryKey().defaultRandom(),
  facility_id: uuid('facility_id').notNull().references(() => FacilitiesTable.facility_id),
  user_id: text('user_id').notNull(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  condition: text('condition').notNull(),
  description: text('description'),
  maintenance_date: timestamp('maintenance_date'),
  quantity: integer('quantity').notNull().default(1),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
});

// Define the relationship between Facilities and Equipment
export const facilitiesRelations = relations(FacilitiesTable, ({ many }) => ({
  equipment: many(EquipmentTable),
}));

export const equipmentRelations = relations(EquipmentTable, ({ one }) => ({
  facility: one(FacilitiesTable, {
    fields: [EquipmentTable.facility_id],
    references: [FacilitiesTable.facility_id],
  }),
}));