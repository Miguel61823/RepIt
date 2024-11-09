'use server';

import {z} from 'zod';
import {db} from '@/drizzle/db';
import {auth} from '@clerk/nextjs/server';
import {v4 as uuidv4} from 'uuid';
import {eq} from 'drizzle-orm';
import {revalidatePath} from 'next/cache';
import {sessionFormSchema} from '@/schema/session';
import {SessionsTable} from '@/drizzle/schema/index';
import Anthropic from '@anthropic-ai/sdk';

export interface Session {
  session_id: string;
  name: string;
  type: string;
  date: Date;
  session_data: string;
}

export interface AISession {
  name: string;
  type: string;
  date: Date;
  parsed_data: unknown;
}

// Anthropic client setup

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function getSessionHistory(): Promise<Session[]> {
  const {userId, redirectToSignIn} = auth();
  let sessions: Session[] = [];

  if (userId === null) {
    redirectToSignIn();
    return sessions;
  }
  sessions = await db.query.SessionsTable.findMany({
    where: ({user_id}, {eq}) => eq(user_id, userId),
    orderBy: ({date}, {desc}) => desc(date),
    columns: {
      user_id: false, //Exclude user_id from results
    },
  });

  return sessions;
}

export async function createSession(
  dirty: z.infer<typeof sessionFormSchema>,
): Promise<undefined | {error: boolean}> {
  const {userId} = auth();
  const {success, data} = sessionFormSchema.safeParse(dirty);

  if (!success || userId === null) {
    return {error: true};
  }

  const sessionId = uuidv4();
  const {type, name, date, session_data} = data;

  // Parse session_data using Claude Haiku
  const message = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Parse this data string into valid JSON, such that you can then efficiently extract key data from it. Only respond with the JSON, no other text: ${data.session_data}`,
      },
    ],
  });

  // Extract JSON from Haiku's response
  // The content will be in the first content block's value
  const parsed_data =
    message.content[0].type === 'text' ? message.content[0].text : '';

  await db
    .insert(SessionsTable)
    .values({
      session_id: sessionId,
      user_id: userId,
      type: type,
      name: name,
      date: date,
      session_data,
      parsed_data,
    })
    .returning();

  revalidatePath('/sessions');
  return undefined;
}

export async function deleteSession(
  deletedSessionId: string,
): Promise<undefined | {error: boolean}> {
  try {
    await db
      .delete(SessionsTable)
      .where(eq(SessionsTable.session_id, deletedSessionId));

    revalidatePath('/sessions');
    return undefined;
  } catch (error) {
    console.error('Error deleting session:', error);
    return {error: true};
  }
}

export async function updateSession(
  sessionId: string,
  dirty: z.infer<typeof sessionFormSchema>,
): Promise<undefined | {error: boolean}> {
  const {userId, redirectToSignIn} = auth();

  if (userId === null) {
    redirectToSignIn();
    return {error: true};
  }

  const {success, data} = sessionFormSchema.safeParse(dirty);

  if (!success) {
    return {error: true};
  }

  // Parse session_data using Claude Haiku
  const message = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Parse this data string into valid JSON, such that you can then efficiently extract key data from it. Only respond with the JSON, no other text: ${data.session_data}`,
      },
    ],
  });

  // Extract JSON from Haiku's response
  // The content will be in the first content block's value
  const parsed_data =
    message.content[0].type === 'text' ? message.content[0].text : '';

  try {
    await db
      .update(SessionsTable)
      .set({
        name: data.name,
        type: data.type,
        date: data.date,
        session_data: data.session_data,
        parsed_data: parsed_data,
      })
      .where(eq(SessionsTable.session_id, sessionId));

    revalidatePath('/sessions');
    return undefined;
  } catch (error) {
    console.error('Error updating session:', error);
    return {error: true};
  }
}

export async function getAISessionsByDate(date_range: {
  startDate: string;
  endDate: string;
}): Promise<AISession[]> {
  const {userId, redirectToSignIn} = auth();
  let sessions: AISession[] = [];

  if (userId === null) {
    redirectToSignIn();
    return sessions;
  }
  sessions = await db.query.SessionsTable.findMany({
    where: ({date, user_id}, {and, gte, lte, eq}) =>
      and(
        eq(user_id, userId),
        gte(date, new Date(date_range.startDate)),
        lte(date, new Date(date_range.endDate)),
      ),
    orderBy: ({date}, {desc}) => desc(date),
    columns: {
      user_id: false, //Exclude user_id from results
      session_id: false,
      session_data: false,
    },
  });

  return sessions;
}

export async function answerQuestion(query: string): Promise<string> {
  // get time range using Claude Haiku
  const response = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Analyze the following question and return a date range that 
                  defines the scope of the question. Express the answer as 
                  postgres date objects in the form '{ startDate: string, endDate: string }'. Return only this range and nothing else: ${query}`,
      },
    ],
  });

  const dateRange =
    response.content[0].type === 'text' ? response.content[0].text : '';

  const {userId, redirectToSignIn} = auth();
  let sessions: AISession[] = [];

  if (userId === null) {
    redirectToSignIn();
    return 'redirected to Sign In';
  }

  // not completely parsed
  sessions = await getAISessionsByDate(JSON.parse(dateRange));

  //analyze data and answer question
  // get time range using Claude Haiku
  const answer = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1024,
    system: `You are an expert in this data ${sessions}. 
             You must answer questions to the best of your 
             abilities using only this data. If the question 
             may be answered using visuals, explain which 
             visuals would best do the job and provide 
             the structured data necessary to create such visuals.`,
    messages: [
      {
        role: 'user',
        content: `${query}`,
      },
    ],
  });

  return answer.content[0].type === 'text'
    ? answer.content[0].text
    : 'An answer could not be given';
}
