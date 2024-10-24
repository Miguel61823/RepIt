import { index, pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { number } from "zod";

// Drizzle schema for 'workout' db table
export const WorkoutsTable = pgTable("workout", {
  workout_id: uuid("workout_id").primaryKey().defaultRandom(),
  user_id: text("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date_completed: timestamp("date_completed").notNull(),
}, table => ({
  user_index: index("user_index").on(table.user_id)
}));

// Drizzle schema for 'workout' relations ('exercise')
export const workoutRelations = relations(WorkoutsTable, ({ many }) => ({
  exercises: many(ExercisesTable),
}));

// Drizzle schema for 'exercise' db table
export const ExercisesTable = pgTable("exercise", {
  exercise_id: uuid("exercise_id").notNull().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  workout_id: uuid("workout_id")
    .notNull()
    .references(() => WorkoutsTable.workout_id, { onDelete: "cascade"}),
  user_id: text("user_id").notNull(),
  order: integer("order").notNull(),
  }, 
  table => ({
    workout_index: index("workout_index").on(table.workout_id),
  })
);

// Drizzle schema for 'exercise' relations ('workout', 'sets')
export const exerciseRelations = relations(ExercisesTable, ({ one, many }) => ({
  workout: one(WorkoutsTable, {
    fields: [ExercisesTable.workout_id],
    references: [WorkoutsTable.workout_id],
  }),
  sets: many(SetsTable)
}));

// Drizzle schema for 'sets' db table
export const SetsTable = pgTable("sets", {
  id: uuid("set_id").notNull().primaryKey().defaultRandom(),
  exercise_id: uuid("exercise_id")
    .notNull()
    .references(() => ExercisesTable.exercise_id, { onDelete: "cascade" }),
  reps: integer("reps"),
  weight: integer("weight"),
  order: integer("order").notNull(),
  notes: text("notes")
  }, 
  table => ({
    exercise_index: index("exercise_index").on(table.exercise_id),
  })
);

// Drizzle schema for 'sets' relations ('exercise')
export const setRelations = relations(SetsTable, ({ one }) => ({
  exerise: one(ExercisesTable, {
    fields: [SetsTable.exercise_id],
    references: [ExercisesTable.exercise_id],
  })
}));

// Drizzle schema for 'gym' db table
export const GymsTable = pgTable("gym", {
  gym_id: uuid("gym_id").notNull().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  open_time: integer("open_time").notNull(),
  close_time: integer("close_time").notNull(),
});

// Drizzle schema for 'gym' relations ('machine') /////////// UNCOMMENT LATER
// export const gymsRelation = relations(GymsTable, ({ many }) => ({
//   machines: many(MachinesTable),
// }))
