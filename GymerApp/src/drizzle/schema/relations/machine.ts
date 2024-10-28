import { relations } from "drizzle-orm";
import { MachinesTable } from "../tables/machine";
import { GymsTable } from "../tables/gym";


export const machineRelation = relations(MachinesTable, ({ one }) => ({
  gym: one(GymsTable, {
    fields: [MachinesTable.gym_id],
    references: [GymsTable.gym_id],
  })
}))
