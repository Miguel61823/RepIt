import { pgTable, uuid, text, integer, pgEnum, index } from "drizzle-orm/pg-core";
import { GymsTable } from "./gym";
import { MUSCLE_LIST } from "@/data/constants";

export const targetMuscleEnum = pgEnum('muscle_enum', MUSCLE_LIST);


// TODO: ADD/REMOVE FIELDS FROM CHAT
// INSTEAD OF JSONB, USE JUNCTION TABLE FOR GYMS <--> EQUIPMENT RELATIONSHIP
export const MachinesTable = pgTable("machine", {
  machine_id: uuid("machine_id").notNull().primaryKey().defaultRandom(),
  gym_id: uuid("gym_id")
    .notNull()
    .references(() => GymsTable.gym_id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  identifer: text("identifier").notNull(),
  target_muscle: targetMuscleEnum("target_muscle").default("none")
}, (table) => ({
  gym_index: index("gym_index").on(table.gym_id)
}));
