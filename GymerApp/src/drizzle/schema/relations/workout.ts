import { ExercisesTable } from "../tables/exercise";
import { WorkoutsTable } from "../tables/workout";
import { relations } from "drizzle-orm";


export const workoutRelations = relations(WorkoutsTable, ({ many }) => ({
  exercises: many(ExercisesTable),
}));
