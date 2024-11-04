import {relations} from 'drizzle-orm';
import {MachinesTable} from '../tables/machine';
import {FacilitiesTable} from '../tables/facilities';

export const machineRelation = relations(MachinesTable, ({one}) => ({
  gym: one(FacilitiesTable, {
    fields: [MachinesTable.facility_id],
    references: [FacilitiesTable.facility_id],
  }),
}));
