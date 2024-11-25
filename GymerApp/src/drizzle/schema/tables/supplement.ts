import {
  index,
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
} from 'drizzle-orm/pg-core';

export const SupplementsTable = pgTable(
  'supplements',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    user_id: text('user_id').notNull(),
    name: text('name').notNull(),
    dosage: text('dosage').notNull(),
    frequency: text('frequency').notNull(),
    instructions: text('instructions'),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date'),
    isActive: boolean('is_active').notNull().default(true),
  },
  table => ({
    user_supplement_index: index('user_supplement_index').on(table.user_id),
  }),
);
