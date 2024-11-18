import {relations} from 'drizzle-orm';
import {MachinesTable} from '../tables/machine';
import {FacilitiesTable} from '../tables/facilities';

export const machineRelation = relations(MachinesTable, ({one}) => ({
  facility: one(FacilitiesTable, {
    fields: [MachinesTable.osm_id], // osm_id in MachinesTable points to facility_id in FacilitiesTable
    references: [FacilitiesTable.facility_id], // References the facility_id in FacilitiesTable
  }),
}));
