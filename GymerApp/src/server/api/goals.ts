'use server';

import {z} from 'zod';
import {db} from '@/drizzle/db';
import {auth} from '@clerk/nextjs/server';
import {v4 as uuidv4} from 'uuid';
import {eq} from 'drizzle-orm';
import {revalidatePath} from 'next/cache';
import {goalFormSchema} from '@/schema/goal';
import {GoalsTable} from '@/drizzle/schema/index';

export interface Goal {
  goal_id: string;
  title: string;
  description: string | undefined;
  dueDate: Date;
  completed: boolean;
}

export async function getGoalHistory(): Promise<Goal[]> {
  const {userId, redirectToSignIn} = auth();
  let goals: Goal[] = [];

  if (userId === null) {
    redirectToSignIn();
    return goals;
  }
  goals = await db.query.GoalsTable.findMany({
    where: ({user_id}, {eq}) => eq(user_id, userId),
    orderBy: ({dueDate}, {asc}) => asc(dueDate),
    columns: {
      user_id: false, // Exclude user_id from results
    },
  }).then(goals =>
    goals.map(goal => ({
      ...goal,
      description: goal.description ?? undefined, // Convert null to undefined
    })),
  );

  return goals;
}

export async function createGoal(
  dirty: z.infer<typeof goalFormSchema>,
): Promise<undefined | {error: boolean}> {
  const {userId} = auth();
  const {success, data} = goalFormSchema.safeParse(dirty);

  if (!success || userId === null) {
    return {error: true};
  }

  const goalId = uuidv4();
  const {title, description, dueDate, completed} = data;

  await db
    .insert(GoalsTable)
    .values({
      goal_id: goalId,
      user_id: userId,
      title,
      description,
      dueDate,
      completed,
    })
    .returning();

  revalidatePath('/goals');
  return undefined;
}

export async function deleteGoal(
  deletedGoalId: string,
): Promise<undefined | {error: boolean}> {
  try {
    await db.delete(GoalsTable).where(eq(GoalsTable.goal_id, deletedGoalId));

    revalidatePath('/goals');
    return undefined;
  } catch (error) {
    console.error('Error deleting goal:', error);
    return {error: true};
  }
}

export async function updateGoal(
  goalId: string,
  dirty: z.infer<typeof goalFormSchema>,
): Promise<undefined | {error: boolean}> {
  const {userId, redirectToSignIn} = auth();

  if (userId === null) {
    redirectToSignIn();
    return {error: true};
  }

  const {success, data} = goalFormSchema.safeParse(dirty);

  if (!success) {
    return {error: true};
  }

  try {
    await db
      .update(GoalsTable)
      .set({
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        completed: data.completed,
      })
      .where(eq(GoalsTable.goal_id, goalId));

    revalidatePath('/goals');
    return undefined;
  } catch (error) {
    console.error('Error updating goal:', error);
    return {error: true};
  }
}

export async function toggleGoalCompletion(
  goalId: string,
): Promise<undefined | {error: boolean}> {
  const {userId, redirectToSignIn} = auth();

  if (userId === null) {
    redirectToSignIn();
    return {error: true};
  }

  try {
    const [goal] = await db
      .select()
      .from(GoalsTable)
      .where(eq(GoalsTable.goal_id, goalId))
      .limit(1);

    if (!goal) {
      return {error: true};
    }

    await db
      .update(GoalsTable)
      .set({
        completed: !goal.completed,
      })
      .where(eq(GoalsTable.goal_id, goalId));

    revalidatePath('/goals');
    return undefined;
  } catch (error) {
    console.error('Error toggling goal completion:', error);
    return {error: true};
  }
}
