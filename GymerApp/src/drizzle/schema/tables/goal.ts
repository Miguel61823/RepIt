import {
    index,
    pgTable,
    text,
    timestamp,
    uuid,
    boolean,
  } from 'drizzle-orm/pg-core';
  
  export const GoalsTable = pgTable(
    'goal',
    {
      goal_id: uuid('id').primaryKey().defaultRandom(),
      user_id: text('user_id').notNull(),
      title: text('title').notNull(),
      description: text('description'),
      dueDate: timestamp('due_date').notNull(),
      completed: boolean('completed').notNull().default(false),
      createdAt: timestamp('created_at').notNull().defaultNow(),
    },
    table => ({
      user_goal_index: index('user_goal_index').on(table.user_id),
      due_date_index: index('due_date_index').on(table.dueDate),
    }),
  );
  