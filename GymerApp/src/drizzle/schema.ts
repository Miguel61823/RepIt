import { index, pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
// export const MemberTable = pgTable("member", {
//   clerk_id: varchar("clerk_id", { length: 255 }).primaryKey().notNull(),
//   email: text("email").notNull(),
//   first_name: text("first_name").notNull(),
//   last_name: text("last_name").notNull()
// });

//!! clerk user id isn't uuid, so user_id must be text

export const WorkoutsTable = pgTable("workout", {
  workout_id: uuid("workout_id").primaryKey().defaultRandom(),
  user_id: text("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date_completed: timestamp("date_completed").notNull(),
}, table => ({
  user_index: index("user_index").on(table.user_id)
}));

export const workoutRelations = relations(WorkoutsTable, ({ many }) => ({
  exercises: many(ExercisesTable),
}));

export const ExercisesTable = pgTable("exercise", {
  exercise_id: uuid("exercise_id").notNull().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  workout_id: uuid("workout_id")
    .notNull()
    .references(() => WorkoutsTable.workout_id, { onDelete: "cascade"}),
  user_id: text("user_id").notNull(),
    // .references(() => MemberTable.clerk_id, { onDelete: "cascade"}),
  order: integer("order").notNull(),
  }, 
  table => ({
    workout_index: index("workout_index").on(table.workout_id),
  })
);

export const exerciseRelations = relations(ExercisesTable, ({ one, many }) => ({
  workout: one(WorkoutsTable, {
    fields: [ExercisesTable.workout_id],
    references: [WorkoutsTable.workout_id],
  }),
  sets: many(SetsTable)
}));

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

export const setRelations = relations(SetsTable, ({ one }) => ({
  exerise: one(ExercisesTable, {
    fields: [SetsTable.exercise_id],
    references: [ExercisesTable.exercise_id],
  })
}));
