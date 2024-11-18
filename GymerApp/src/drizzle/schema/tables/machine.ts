import { pgTable, uuid, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { FacilitiesTable } from './facilities';  // Import FacilitiesTable for reference

export const MachinesTable = pgTable('machines', {
  id: uuid('id').defaultRandom().primaryKey(),
  osm_id: uuid('osm_id').notNull().references(() => FacilitiesTable.facility_id), // osm_id now references facility_id in FacilitiesTable
  user_id: text('user_id').notNull(),
  name: text('name').notNull(),
  identifier: text('identifier').notNull(),
  type: text('type'),
  condition: text('condition'),
  description: text('description'),
  maintenance_date: timestamp('maintenance_date'),
  quantity: integer('quantity').notNull().default(1),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
});