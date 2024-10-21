"use server";

// import "use-server";
import { z } from "zod";
import { db } from "@/drizzle/db";
import { WorkoutsTable, ExercisesTable, SetsTable } from "@/drizzle/schema";
import { workoutFormSchema } from "@/schema/workout";
import { auth } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";
// import { and, desc, eq } from "drizzle-orm";
// import { boolean } from "drizzle-orm/mysql-core";

export async function createWorkout(
  dirty: z.infer<typeof workoutFormSchema>
):Promise<undefined | {error: boolean}> {
  const { userId } = auth();
  const { success, data } = workoutFormSchema.safeParse(dirty);
  // console.log("bro plz run");
  if (!success || userId == null) {
    // console.log("WELP YOU F'D UP");
    return { error: true };
  }
  // console.log("WELP GOOD FOR YOU");

  const workoutId = uuidv4();
  const {title, description, dateCompleted, exercises} = data;

  // double check db type for date_completed
  await db.insert(WorkoutsTable).values({
      workout_id: workoutId,
      user_id: userId,
      title: title,
      description: description,
      date_completed: dateCompleted
     });

  // Nested to be able to insert exercise sets into table easily
  // TODO: add safeParse for exercises and sets
  exercises.forEach(async (exercise, e_index) => {
    const exerciseId = uuidv4();
    await db.insert(ExercisesTable).values({
        exercise_id: exerciseId,
        name: exercise.name,
        workout_id: workoutId,
        user_id: userId,
        order: e_index
      });
    exercise.sets.forEach(async (set, set_index) => {
      const setId = uuidv4();
      await db.insert(SetsTable).values({
        id: setId,
        exercise_id: exerciseId,
        reps: set.reps,
        weight: set.weight,
        order: set_index,
        notes: set.notes
      });
    });
  });

  redirect('/dashboard');

}

export async function updateWorkout() {
  
}

export async function deleteWorkout() {

}
