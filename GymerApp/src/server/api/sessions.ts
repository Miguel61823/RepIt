"use server";

import { z } from "zod";
import { db } from "@/drizzle/db";
import { auth } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { sessionFormSchema } from "@/FormSchema/session";
import { NodesTable, SessionsTable } from "@/drizzle/schema/index";

export interface Session {
  session_id: string;
  name: string;
  type: string;
  date: Date;
  nodes: Node[];
}

type NodeType = 'Group' | 'Metric';

export interface Node {
  id: string;
  name: string;
  type: NodeType;
  value?: number;
  unit?: string;
  path: string[];
}

export async function getAllUserSessions(): Promise<Session[]> {
  const { userId, redirectToSignIn } = auth();
  let sessions: Session[] = [];

  if (userId == null) {
    redirectToSignIn();
    return sessions;
  }
  const sessionsData = await db.query.SessionsTable.findMany({
    where: ({ user_id }, { eq }) => eq(user_id, userId),
    orderBy: ({ date }, { desc }) => desc(date),
    columns: {
      user_id: false, //Exclude user_id from results
    },
    with: {
      nodes: {
        orderBy: ({ path }, { asc }) => asc(path)
      }
    }
  })

  // Map the data to our interface structure
  sessions = sessionsData.map(({
    session_id, name, type, date, nodes
  }) => (<Session>{
    session_id,
    name,
    type,
    date,
    nodes: nodes.map(({
      id, name, type, path
    }) => (<Node>{
      id,
      name,
      type,
      path,
    }))
  }));

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
  const {type, name, date, nodes} = data;

  await db.insert(SessionsTable).values({
    session_id: sessionId,
    user_id: userId,
    type: type,
    name: name,
    date: date
  })

  if (nodes.length > 0 ) {
    await db.insert(NodesTable)
    .values(
      nodes.map(node => ({
        id: uuidv4(),
        sessionId: sessionId,
        ...node
      }))
    )
  }
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

