'use server';

import {db} from '@/drizzle/db';
import {FacilitiesTable} from '@/drizzle/schema/tables/facilities';
import {revalidatePath} from 'next/cache';
import {auth} from '@clerk/nextjs/server';
import {ilike, and, between} from 'drizzle-orm';

export interface Facility {
  osm_id: string;
  name: string; // given
  leisure: string; // delete?
  lat: number | undefined; // given
  lon: number | undefined; // given
  address: string; // reverse geocode
  accessibility: string; // delete?
  phone?: string;
  website?: string;
  opening_hours?: string;
}

// TODO: FETCH FROM DB INSTEAD OF MOCK DATA
export async function getFacilities(
  query: string | undefined,
): Promise<Facility[]> {
  const {userId, redirectToSignIn} = auth();
  let facilities: Facility[] = [];

  if (userId === null) {
    redirectToSignIn();
    return facilities;
  }

  const facilitiesData = await db
    .select()
    .from(FacilitiesTable)
    .where(query ? ilike(FacilitiesTable.name, `%${query}%`) : undefined);
  // .orderBy(pSqlDistance);

  facilities = facilitiesData.map(
    ({
      // ONLY GET WHAT WE WILL DISPLAY (I THINK)
      facility_id, // MAYBE FOR KEY
      osm_id, // MAYBE FOR KEY (one of these)
      name, // FOR SURE
      leisure,
      lat,
      lon,
      address, // MAYBE NOT - USE LAT/LON TO GET ADDR
      accessibility, // MAYBE NOT
      opening_hours, // OPTIONAL
      website, // OPTIONAL
      phone, // OPTIONAL
    }) =>
      <Facility>{
        facility_id: facility_id,
        osm_id: osm_id,
        name: name,
        leisure: leisure,
        lat: lat,
        lon: lon,
        address: address,
        accessibility: accessibility,
        opening_hours: opening_hours,
        website: website,
        phone: phone,
      },
  );

  return facilities;
}

export async function addFacility(
  facility: Facility,
): Promise<undefined | {error: boolean}> {
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

// Approximate conversion factors:
// 1 degree of latitude = 111 km
// 1 degree of longitude = 111 km * cos(latitude)
function getCoordinateRanges(lat: number, lon: number, rangeKm: number) {
  // Convert range to approximate degree offset
  const latOffset = rangeKm / 111;
  // Adjust longitude offset based on latitude (compensate for earth's curvature)
  const lonOffset = rangeKm / (111 * Math.cos((lat * Math.PI) / 180));

  return {
    minLat: lat - latOffset,
    maxLat: lat + latOffset,
    minLon: lon - lonOffset,
    maxLon: lon + lonOffset,
  };
}

export async function getNearbyFacilities(
  lat: number,
  lon: number,
  rangeKm: number,
  query?: string,
): Promise<Facility[]> {
  const {userId, redirectToSignIn} = auth();
  let facilities: Facility[] = [];

  if (userId === null) {
    redirectToSignIn();
    return facilities;
  }

  const {minLat, maxLat, minLon, maxLon} = getCoordinateRanges(
    lat,
    lon,
    rangeKm,
  );

  const facilitiesData = await db
    .select()
    .from(FacilitiesTable)
    .where(
      and(
        between(FacilitiesTable.lat, minLat, maxLat),
        between(FacilitiesTable.lon, minLon, maxLon),
        query ? ilike(FacilitiesTable.name, `%${query}%`) : undefined,
      ),
    );

  facilities = facilitiesData.map(
    ({
      facility_id,
      osm_id,
      name,
      leisure,
      lat,
      lon,
      address,
      accessibility,
      opening_hours,
      website,
      phone,
    }) => ({
      facility_id,
      osm_id,
      name,
      leisure,

      address,
      accessibility,
      // Convert null to undefined for optional fields
      opening_hours: opening_hours ?? undefined,
      website: website ?? undefined,
      phone: phone ?? undefined,
      lat: lat ?? undefined,
      lon: lon ?? undefined,
    }),
  );

  return facilities;
}

export async function insertFacilities(
  facilities: Facility[],
): Promise<undefined | {error: boolean}> {
  // Insert all facilities at once, database will handle duplicate osm_ids

  console.log(facilities);
  console.log('hiiiiii');
  await db
    .insert(FacilitiesTable)
    .values(
      facilities.map(facility => ({
        osm_id: facility.osm_id,
        name: facility.name,
        leisure: facility.leisure,
        lat: facility.lat,
        lon: facility.lon,
        address: facility.address,
        accessibility: facility.accessibility,
        opening_hours: facility.opening_hours,
        phone: facility.phone,
        website: facility.website || null,
      })),
    )
    .onConflictDoNothing({target: FacilitiesTable.osm_id});
  // Revalidate relevant paths
  await revalidatePath('/facilities');
  await revalidatePath('/osm');

  return;
}
