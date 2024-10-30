"use server";

import { z } from "zod";
import { db } from "@/drizzle/db";
import { auth } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { sessionFormSchema } from "@/FormSchema/session";
import { SessionsTable } from "@/drizzle/schema/index";

export interface Session {
  session_id: string;
  name: string;
  type: string;
  date: Date;
  session_data: string;
}

export async function getSessionHistory(): Promise<Session[]> {
  const { userId, redirectToSignIn } = auth();
  let sessions: Session[] = [];

  if (userId == null) {
    redirectToSignIn();
    return sessions;
  }
  sessions = await db.query.SessionsTable.findMany({
    where: ({ user_id }, { eq }) => eq(user_id, userId),
    orderBy: ({ date }, { desc }) => desc(date),
    columns: {
      user_id: false, //Exclude user_id from results
    }
  })
  console.log(sessions)

  return sessions;
}

export async function createSession(
  dirty: z.infer<typeof sessionFormSchema>
):Promise<undefined | {error: boolean}> {
  const { userId } = auth();
  const { success, data } = sessionFormSchema.safeParse(dirty);

  if (!success || userId == null) {
    return { error: true };
  }

  const sessionId = uuidv4();
  const {type, name, date, session_data} = data;

  const insert = await db.insert(SessionsTable).values({
    session_id: sessionId,
    user_id: userId,
    type: type,
    name: name,
    date: date,
    session_data
  })
  .returning()

  console.log(insert)

  revalidatePath('/sessions');
  return undefined
}

export async function deleteSession(deletedSessionId: string): Promise<undefined | { error: boolean }> {
  try {
    await db.delete(SessionsTable)
      .where(eq(SessionsTable.session_id, deletedSessionId));
      
    revalidatePath('/sessions');
    return undefined;
    
  } catch (error) {
    console.error("Error deleting session:", error);
    return { error: true };
  }
}

export async function updateSession(
  sessionId: string,
  dirty: z.infer<typeof sessionFormSchema>
): Promise<undefined | { error: boolean }>{
  const { userId, redirectToSignIn } = auth();

  if (userId == null) {
    redirectToSignIn();
    return { error: true };
  }

  const { success, data } = sessionFormSchema.safeParse(dirty);

  if (!success) {
    return { error: true };
  }

  try {
    await db.update(SessionsTable)
      .set({
        name: data.name,
        type: data.type,
        date: data.date,
        session_data: data.session_data
      })
      .where(eq(SessionsTable.session_id, sessionId));

    revalidatePath('/sessions');
    return undefined;
  } catch (error) {
    console.error("Error updating session:", error);
    return { error: true };
  }
}

