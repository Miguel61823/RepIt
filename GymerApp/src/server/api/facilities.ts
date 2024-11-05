'use server';

import {db} from '@/drizzle/db';
import {FacilitiesTable} from '@/drizzle/schema/tables/facilities';
import {mockFacilities} from '@/app/facilities/_components/facilityListings';
import {revalidatePath} from 'next/cache';

export interface Facility {
  facility_id: string; // one id??
  osm_id: string;
  name: string; // given
  leisure: string; // delete?
  lat: number; // given
  lon: number; // given
  address: string; // reverse geocode
  accessibility: string; // delete?
  phone?: string;
  website?: string;
  opening_hours?: string;
  // features?: string[]; // REMOVE? idk maybe
}

// TODO: FETCH FROM DB INSTEAD OF MOCK DATA
export async function getFacilities(query: string | undefined) {
  if (!query) {
    return mockFacilities;
  }
  const facilities = mockFacilities.filter(
    facility =>
      facility.name.toLowerCase().includes(query) ||
      facility.leisure.toLowerCase().includes(query),
  );
  // facilities.forEach(facility=>{console.log(facility.name)});
  return facilities;
}

export async function checkFacilityInDB(
  checked_osm_id: string,
): Promise<boolean> {
  const facility = await db.query.FacilitiesTable.findFirst({
    where: ({osm_id}, {eq}) => eq(osm_id, checked_osm_id),
  });
  // console.log(facility);
  if (!facility || !Object.keys(facility).length) {
    // console.log(false);
    return false;
  } else {
    // console.log(true);
    return true;
  }
}

export async function addFacility(
  facility: Facility,
): Promise<undefined | {error: boolean}> {
  // console.log(facility);
  const {
    osm_id,
    name,
    leisure,
    lat,
    lon,
    address,
    accessibility,
    opening_hours,
    phone,
    website,
  } = facility;
  await db.insert(FacilitiesTable).values({
    osm_id: osm_id,
    name: name,
    leisure: leisure,
    lat: lat,
    lon: lon,
    address: address,
    accessibility: accessibility,
    opening_hours: opening_hours,
    phone: phone,
    website: website,
  });

  await revalidatePath('/facilities');
  return;
}
