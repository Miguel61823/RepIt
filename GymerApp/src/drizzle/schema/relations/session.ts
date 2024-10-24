import { relations } from "drizzle-orm";
import { NodesTable } from "../tables/session_node";
import { SessionsTable } from "../tables/session";

export const sessionsRelations = relations(SessionsTable, ({ many }) => ({
  nodes: many(NodesTable),
}));