"use server";

import { z } from "zod";
import { db } from "@/drizzle/db";
import { workoutFormSchema } from "@/FormSchema/workout";
import { auth } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";
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

  const workoutId = uuidv4();
  const {title, description, dateCompleted, exercises} = data;

  await db.insert(WorkoutsTable).values({
      workout_id: workoutId,
      user_id: userId,
      title: title,
      description: description,
      date_completed: dateCompleted
     });

  // Nested to be able to insert exercise sets into table easily
  // TODO: add safeParse for exercises and sets
  let e_index = 1;
  exercises.forEach(async (exercise) => {
    const exerciseId = uuidv4();
    await db.insert(ExercisesTable).values({
      exercise_id: exerciseId,
      name: exercise.name,
      workout_id: workoutId,
      user_id: userId,
      order: e_index++
    });
    let set_index = 1;
    exercise.sets.forEach(async (set) => {
      const setId = uuidv4();
      await db.insert(SetsTable).values({
        id: setId,
        exercise_id: exerciseId,
        reps: set.reps,
        weight: set.weight,
        order: set_index++,
        notes: set.notes
      });
    });
  });

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
