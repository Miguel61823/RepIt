"use server";

import { z } from "zod";
import { db } from "@/drizzle/db";
import { workoutFormSchema } from "@/schema/workout";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { WorkoutsTable } from "@/drizzle/schema/tables/workout";
import { ExercisesTable } from "@/drizzle/schema/tables/exercise";
import { SetsTable } from "@/drizzle/schema/tables/set";

export interface Workout {
  id: string;
  title: string;
  description: string;
  date_completed: Date;
  // start_time: string;
  // end_time: string;
  exercises: Exercise[];
}

export interface Exercise {
  e_id: string;
  name: string;
  order: number;
  sets: Set[];
}

export interface Set {
  set_id: string;
  reps: number;
  weight: number;
  order: number;
  notes: string;
}

export async function getWorkoutHistory(): Promise<Workout[]> {
  const { userId, redirectToSignIn } = auth();
  let workouts: Workout[] = [];

  if (userId == null) {
    redirectToSignIn();
    return workouts;
  }
  const workoutsData = await db.query.WorkoutsTable.findMany({
    where: ({ user_id }, { eq }) => eq(user_id, userId),
    orderBy: ({ date_completed }, { desc }) => desc(date_completed),
    columns: {
      user_id: false,
    },
    with: {
      exercises: {
        columns: {
          workout_id: false,
          user_id: false,
        },
        with: {
          sets: {
            columns: {
              exercise_id: false,
            },
          },
        },
      },
    },
  });
  
  workouts = workoutsData.map(({
    workout_id, title, description, date_completed, exercises
  }) => (<Workout>{
    id: workout_id,
    title: title,
    description: description,
    date_completed: date_completed,
    exercises: exercises.map(({
      exercise_id, name, order, sets
    }) => (<Exercise>{
      e_id: exercise_id,
      name: name,
      order: order,
      sets: sets.map(({
        id, reps, weight, order, notes
      }) => <Set>{
        set_id: id,
        reps: reps,
        weight: weight,
        order: order,
        notes: notes,
      })
    })),
  }));
  
  return workouts;
};


export async function createWorkout(
  dirty: z.infer<typeof workoutFormSchema>
):Promise<undefined | {error: boolean}> {
  const { userId } = auth();
  const { success, data } = workoutFormSchema.safeParse(dirty);

  if (!success || userId == null) {
    return { error: true };
  }

  const {title, description, dateCompleted, exercises} = data;

  const workoutResult = await db.insert(WorkoutsTable).values({
      user_id: userId,
      title: title,
      description: description,
      date_completed: dateCompleted
     })
     .returning();

  const workoutId = workoutResult[0].workout_id;

  const exerciseResults = await db.insert(ExercisesTable).values(
    exercises.map((exercise, index) => ({
        name: exercise.name,
        workout_id: workoutId,
        user_id: userId,
        order: index + 1
    }))
)
.returning();

for (let i = 0; i < exerciseResults.length; i++) {
    const exerciseId = exerciseResults[i].exercise_id;
    
    await db.insert(SetsTable).values(
        exercises[i].sets.map((set, setIndex) => ({
            exercise_id: exerciseId,
            reps: set.reps,
            weight: set.weight,
            order: setIndex + 1,
            notes: set.notes
        }))
    );
}

  revalidatePath('/dashboard');
  return undefined;
}

export async function updateWorkout() {
  
}

export async function deleteWorkout(deletedWorkoutId: string): Promise<undefined | { error: boolean }> {
  try {
    await db.delete(WorkoutsTable).where(eq(WorkoutsTable.workout_id, deletedWorkoutId));
    revalidatePath('/dashboard');
    return undefined;

  } catch (error) {
    console.error("Error deleting workout:", error);
    return { error: true };
  }
}
