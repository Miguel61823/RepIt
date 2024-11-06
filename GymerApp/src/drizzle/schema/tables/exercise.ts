import {index, pgTable, text, uuid, integer} from 'drizzle-orm/pg-core';
import {WorkoutsTable} from './workout';

export const ExercisesTable = pgTable(
  'exercise',
  {
    exercise_id: uuid('exercise_id').notNull().primaryKey().defaultRandom(),
    name: text('name').notNull(),
    workout_id: uuid('workout_id')
      .notNull()
      .references(() => WorkoutsTable.workout_id, {onDelete: 'cascade'}),
    user_id: text('user_id').notNull(),
    // .references(() => MemberTable.clerk_id, { onDelete: "cascade"}),
    order: integer('order').notNull(),
  },
  table => ({
    workout_index: index('workout_index').on(table.workout_id),
  }),
);
