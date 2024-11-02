import { overpass } from 'overpass-ts';

const Overpass = new overpass();

export async function fetchGymFacilities(bounds: {
  south: number;
  west: number;
  north: number;
  east: number;
}) {
  const query = `
    [out:json][timeout:25];
    (
      node["leisure"="fitness_centre"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
      way["leisure"="fitness_centre"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
      relation["leisure"="fitness_centre"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
      
      node["leisure"="sports_centre"]["sport"="fitness"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
      way["leisure"="sports_centre"]["sport"="fitness"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
      relation["leisure"="sports_centre"]["sport"="fitness"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
    );
    out body;
    >;
    out skel qt;
  `;

  const response = await overpass.query(query);
  return parseOSMResponse(response);
}

function parseOSMResponse(response: any): GymFacility[] {
  return response.elements.map((element: any) => ({
    id: `osm_${element.type}_${element.id}`,
    name: element.tags.name || 'Unnamed Facility',
    latitude: element.lat,
    longitude: element.lon,
    address: formatAddress(element.tags),
    amenities: parseAmenities(element.tags),
    website: element.tags.website,
    openingHours: element.tags.opening_hours,
  }));
}

function formatAddress(tags: any): string {
  const parts = [
    tags['addr:housenumber'],
    tags['addr:street'],
    tags['addr:city'],
    tags['addr:postcode']
  ].filter(Boolean);
  
  return parts.join(', ');
}

function parseAmenities(tags): string[] {
  const amenities = [];
  if (tags.shower === 'yes') amenities.push('showers');
  if (tags.lockers === 'yes') amenities.push('lockers');
  if (tags['changing_room'] === 'yes') amenities.push('changing_rooms');
  if (tags.sauna === 'yes') amenities.push('sauna');
  return amenities;
}