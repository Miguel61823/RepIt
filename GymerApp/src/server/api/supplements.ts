// src/server/api/supplements.ts
'use server';

import { z } from 'zod';
import { db } from '@/drizzle/db';
import { auth } from '@clerk/nextjs/server';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { supplementFormSchema } from '@/schema/supplement';
import { SupplementsTable } from '@/drizzle/schema/index';

export interface Supplement {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  instructions: string | null;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
}

export async function getSupplements(): Promise<Supplement[]> {
  const { userId, redirectToSignIn } = auth();
  let supplements: Supplement[] = [];

  if (userId === null) {
    redirectToSignIn();
    return supplements;
  }
  supplements = await db.query.SupplementsTable.findMany({
    where: ({ user_id }, { eq }) => eq(user_id, userId),
    orderBy: ({ startDate }, { desc }) => desc(startDate),
    columns: {
      user_id: false, // Exclude user_id from results
    },
  });

  return supplements;
}

export async function createSupplement(
  dirty: z.infer<typeof supplementFormSchema>
): Promise<undefined | { error: boolean }> {
  const { userId } = auth();
  const { success, data } = supplementFormSchema.safeParse(dirty);

  if (!success || userId === null) {
    return { error: true };
  }

  const supplementId = uuidv4();
  const { name, dosage, frequency, instructions, startDate, endDate, isActive } = data;

  await db
    .insert(SupplementsTable)
    .values({
      id: supplementId,
      user_id: userId,
      name,
      dosage,
      frequency,
      instructions,
      startDate,
      endDate,
      isActive,
    })
    .returning();

  revalidatePath('/supplements');
  return undefined;
}

export async function updateSupplement(
  supplementId: string,
  dirty: z.infer<typeof supplementFormSchema>
): Promise<undefined | { error: boolean }> {
  const { userId, redirectToSignIn } = auth();

  if (userId === null) {
    redirectToSignIn();
    return { error: true };
  }

  const { success, data } = supplementFormSchema.safeParse(dirty);

  if (!success) {
    return { error: true };
  }

  try {
    await db
      .update(SupplementsTable)
      .set({
        name: data.name,
        dosage: data.dosage,
        frequency: data.frequency,
        instructions: data.instructions,
        startDate: data.startDate,
        endDate: data.endDate,
        isActive: data.isActive,
      })
      .where(eq(SupplementsTable.id, supplementId));

    revalidatePath('/supplements');
    return undefined;
  } catch (error) {
    console.error('Error updating supplement:', error);
    return { error: true };
  }
}

export async function deleteSupplement(
  supplementId: string
): Promise<undefined | { error: boolean }> {
  try {
    await db
      .delete(SupplementsTable)
      .where(eq(SupplementsTable.id, supplementId));

    revalidatePath('/supplements');
    return undefined;
  } catch (error) {
    console.error('Error deleting supplement:', error);
    return { error: true };
  }
}
