'use server';

import {db} from '@/drizzle/db';
import {FacilitiesTable} from '@/drizzle/schema/tables/facilities';
import {mockFacilities} from '@/app/facilities/_components/facilityListings';
import {revalidatePath} from 'next/cache';
import {auth} from '@clerk/nextjs/server';
import {desc, eq, ilike, sql, and, between} from 'drizzle-orm';

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
export async function getFacilities(
  query: string | undefined,
): Promise<Facility[]> {
  const {userId, redirectToSignIn} = auth();
  let facilities: Facility[] = [];

  if (userId === null) {
    redirectToSignIn();
    return facilities;
  }

  // const position = await new Promise<GeolocationPosition>(
  //   (resolve, reject) => {
  //     navigator.geolocation.getCurrentPosition(resolve,reject);
  //   }
  // )
  // const {latitude: userLat, longitude: userLon} = position.coords;
  // const pSqlDistance = sql`point(lat, lon) <-> (${userLat}, ${userLon})`;

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
      lat,
      lon,
      address,
      accessibility,
      // Convert null to undefined for optional fields
      opening_hours: opening_hours ?? undefined,
      website: website ?? undefined,
      phone: phone ?? undefined,
    }),
  );

  return facilities;
}
