import {index, pgTable, text, timestamp, uuid} from 'drizzle-orm/pg-core';

export const WorkoutsTable = pgTable(
  'workout',
  {
    workout_id: uuid('workout_id').primaryKey().defaultRandom(),
    user_id: text('user_id').notNull(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    date_completed: timestamp('date_completed').notNull(),
  },
  table => ({
    user_index: index('user_index').on(table.user_id),
  }),
);
