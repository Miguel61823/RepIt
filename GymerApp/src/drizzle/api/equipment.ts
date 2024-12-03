import {db} from '@/drizzle/db';
import {MachinesTable} from '@/drizzle/schema/tables/machine';
import {eq} from 'drizzle-orm';
import {FacilitiesTable} from '@/drizzle/schema/tables/facilities';

export type EquipmentData = {
  osm_id: string;
  user_id: string;
  name: string;
  identifier: string;
  type?: string;
  condition?: string;
  description?: string;
  maintenance_date?: string;
  quantity?: number;
};

export async function addEquipment(data: EquipmentData) {
  try {
    const facility = await db
      .select()
      .from(FacilitiesTable)
      .where(eq(FacilitiesTable.osm_id, data.osm_id));

    if (!facility.length) {
      throw new Error('Invalid osm_id, no matching facility found');
    }

    const formattedData = {
      osm_id: data.osm_id,
      user_id: data.user_id,
      name: data.name,
      identifier: data.identifier,
      type: data.type || null,
      condition: data.condition || null,
      description: data.description || null,
      maintenance_date: data.maintenance_date
        ? new Date(data.maintenance_date)
        : null,
      quantity: data.quantity ? Number(data.quantity) : 1,
    };

    const result = await db.insert(MachinesTable).values(formattedData);

    return {success: true, data: result};
  } catch (error) {
    console.error('Error adding equipment:', error);
    throw new Error('Failed to add equipment');
  }
}

export async function getEquipmentByFacility(osmId: string) {
  try {
    const equipment = await db
      .select()
      .from(MachinesTable)
      .where(eq(MachinesTable.osm_id, osmId));

    return equipment;
  } catch (error) {
    console.error('Error fetching equipment:', error);
    throw new Error('Failed to fetch equipment');
  }
}

export async function deleteEquipment(identifier: string) {
  try {
    const equipment = await db
      .select()
      .from(MachinesTable)
      .where(eq(MachinesTable.identifier, identifier));

    if (!equipment.length) {
      throw new Error('No matching equipment found with the given identifier');
    }

    const result = await db
      .delete(MachinesTable)
      .where(eq(MachinesTable.identifier, identifier));

    return {success: true, data: result};
  } catch (error) {
    console.error('Error deleting equipment:', error);
    throw new Error('Failed to delete equipment');
  }
}
