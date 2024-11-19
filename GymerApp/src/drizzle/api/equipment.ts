import {db} from '@/drizzle/db';
import {MachinesTable} from '@/drizzle/schema/tables/machine';
import {eq} from 'drizzle-orm';
import {FacilitiesTable} from '@/drizzle/schema/tables/facilities'; // Import facility table

export type EquipmentData = {
  osm_id: string; // osm_id corresponds to a facility_id in the facility table
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
    // Check if osm_id maps to a valid facility_id in the FacilitiesTable
    const facility = await db
      .select()
      .from(FacilitiesTable)
      .where(eq(FacilitiesTable.osm_id, data.osm_id)); // osm_id references a facility_id

    if (!facility.length) {
      throw new Error('Invalid osm_id, no matching facility found');
    }

    // Use the first matching facility to get facility_id
    // const facility_id = facility[0].facility_id;

    // Prepare the formatted data for the insert operation
    const formattedData = {
      osm_id: data.osm_id, // Use osm_id here, referring to the facility
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

    // Insert the machine data into the MachinesTable
    const result = await db.insert(MachinesTable).values(formattedData);

    return {success: true, data: result};
  } catch (error) {
    console.error('Error adding equipment:', error);
    throw new Error('Failed to add equipment');
  }
}

export async function getEquipmentByFacility(osmId: string) {
  try {
    // Fetch all machines linked to the given osm_id (which corresponds to facility_id in MachinesTable)
    const equipment = await db
      .select()
      .from(MachinesTable)
      .where(eq(MachinesTable.osm_id, osmId)); // Ensure osm_id exists in MachinesTable

    return equipment;
  } catch (error) {
    console.error('Error fetching equipment:', error);
    throw new Error('Failed to fetch equipment');
  }
}
