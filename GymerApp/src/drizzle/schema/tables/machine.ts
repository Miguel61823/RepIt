import {pgTable, uuid, text, index} from 'drizzle-orm/pg-core';
import {FacilitiesTable} from './facilities';
// import { MUSCLE_LIST } from "@/data/constants";

// export const targetMuscleEnum = pgEnum('muscle_enum', MUSCLE_LIST);

// TODO: ADD/REMOVE FIELDS FROM CHAT
// INSTEAD OF JSONB, USE JUNCTION TABLE FOR GYMS <--> EQUIPMENT RELATIONSHIP
export const MachinesTable = pgTable(
  'machine',
  {
    machine_id: uuid('machine_id').notNull().primaryKey().defaultRandom(),
    facility_id: uuid('facility_id')
      .notNull()
      .references(() => FacilitiesTable.facility_id, {onDelete: 'cascade'}),
    name: text('name').notNull(),
    identifer: text('identifier').notNull(),
    // target_muscle: targetMuscleEnum("target_muscle").default("none")
  },
  table => ({
    facility_index: index('facility_index').on(table.facility_id),
  }),
);
