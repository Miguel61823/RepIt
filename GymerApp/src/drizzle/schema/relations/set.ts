import {relations} from 'drizzle-orm';
import {ExercisesTable} from '../tables/exercise';
import {SetsTable} from '../tables/set';

export const setRelations = relations(SetsTable, ({one}) => ({
  exercise: one(ExercisesTable, {
    fields: [SetsTable.exercise_id],
    references: [ExercisesTable.exercise_id],
  }),
}));
