import { relations } from "drizzle-orm";
import { NodesTable } from "../tables/session_node";
import { SessionsTable } from "../tables/session";


export const nodesRelations = relations(NodesTable, ({ one }) => ({
  session: one(SessionsTable, {
    fields: [NodesTable.sessionId],
    references: [SessionsTable.id],
  })
}));