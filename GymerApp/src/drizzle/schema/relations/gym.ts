import { relations } from "drizzle-orm";
import { GymsTable } from "../tables/gym";
import { MachinesTable } from "../tables/machine";


export const gymRelations = relations(GymsTable, ({ many }) => ({
  machines: many(MachinesTable)
}))
