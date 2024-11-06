import {index, pgTable, text, uuid, integer} from 'drizzle-orm/pg-core';
import {ExercisesTable} from './exercise';

export const SetsTable = pgTable(
  'sets',
  {
    id: uuid('set_id').notNull().primaryKey().defaultRandom(),
    exercise_id: uuid('exercise_id')
      .notNull()
      .references(() => ExercisesTable.exercise_id, {onDelete: 'cascade'}),
    reps: integer('reps'),
    weight: integer('weight'),
    order: integer('order').notNull(),
    notes: text('notes'),
  },
  table => ({
    exercise_index: index('exercise_index').on(table.exercise_id),
  }),
);
