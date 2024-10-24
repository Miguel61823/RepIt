import { index, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { SessionsTable } from "./session";
import { nodeType } from "../types";

export const NodesTable = pgTable('nodes', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id').notNull().references(() => SessionsTable.id),
  name: text('name').notNull(),
  type: nodeType('type').notNull(),
  path: text('path').array().notNull(),
  // parent/child nodes create type errors bc of self referencing

  // parentId: uuid('parent_id').references(() => NodesTable.id, {
  //   onDelete: 'cascade'
  // }),
}, (table) => ({
  path_index: index('path_index').on(table.path),
  session_index: index('session_index').on(table.sessionId),
}));

// node cannot be parent of node
