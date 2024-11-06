import {relations} from 'drizzle-orm';
import {FacilitiesTable} from '../tables/facilities';
import {MachinesTable} from '../tables/machine';

export const facilityRelations = relations(FacilitiesTable, ({many}) => ({
  machines: many(MachinesTable),
}));
