import {relations} from 'drizzle-orm';
import {ExercisesTable} from '../tables/exercise';
import {WorkoutsTable} from '../tables/workout';
import {SetsTable} from '../tables/set';

export const exerciseRelations = relations(ExercisesTable, ({one, many}) => ({
  workout: one(WorkoutsTable, {
    fields: [ExercisesTable.workout_id],
    references: [WorkoutsTable.workout_id],
  }),
  sets: many(SetsTable),
}));
