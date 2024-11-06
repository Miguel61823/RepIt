import {Facility} from '@/server/api/facilities';

// Interface defining the structure of OpenStreetMap tags
// These are key-value pairs that contain metadata about facilities
// The index signature [key: string] allows for additional unknown tags
interface OSMTags {
  name?: string; // Facility name
  sport?: string; // Type of sport (e.g., tennis, basketball)
  leisure?: string; // Leisure category (e.g., fitness_centre)
  'addr:street'?: string; // Street address
  'addr:housenumber'?: string; // Building number
  'addr:city'?: string; // City name
  'addr:postcode'?: string; // Postal code
  access?: string; // Access restrictions (public, private, etc.)
  opening_hours?: string; // Operating hours
  website?: string; // Main website
  'contact:website'?: string; // Alternative contact website
  phone?: string; // Main phone number
  'contact:phone'?: string; // Alternative contact phone
  [key: string]: string | undefined; // Allow any other string keys with string or undefined values
}

// Interface for raw OpenStreetMap element data
// This represents the direct response from the Overpass API
interface OSMElement {
  id: string; // Unique identifier for the facility
  // type: 'node' | 'way' | 'relation'; // OSM element type
  lat?: number; // Latitude (for nodes)
  lon?: number; // Longitude (for nodes)
  center?: {
    // Center coordinates (for ways and relations)
    lat: number;
    lon: number;
  };
  tags?: OSMTags; // Metadata tags for the element
}

// // Interface for processed facility data
// // This is our cleaned and formatted version of the OSM data
// interface ResultFacility {
//   osm_id: string; // Original OSM ID
//   name: string; // Facility name (with fallback to 'Unnamed Facility')
//   leisure: string; // Primary facility type
//   lat: number | undefined; // Latitude
//   lon: number | undefined; // Longitude
//   address: string;
//   accessibility: string; // Access level information
//   openingHours?: string; // Operating hours if available
//   website?: string; // Website URL
//   phone?: string; // Contact phone number
// }

// Main function to find sports facilities within a given radius
// Takes latitude, longitude, and radius in meters as parameters
// Returns a promise that resolves to an array of processed facilities
async function findSportsFacilities(
  lat: number,
  lon: number,
  radiusMeters: number = 2000,
): Promise<Facility[]> {
  // Overpass QL query to find various types of sports facilities
  // Uses 'around' operator for precise radius-based search
  // Searches for different facility types: fitness centers, sports centers, pools, etc.
  const query = `
  [out:json][timeout:90];
  (
    /* FITNESS CENTERS */
    node["leisure"="fitness_centre"]["name"](around:${radiusMeters},${lat},${lon});
    way["leisure"="fitness_centre"]["name"](around:${radiusMeters},${lat},${lon});
    
    /* SPORTS CENTERS */
    node["leisure"="sports_centre"]["name"](around:${radiusMeters},${lat},${lon});
    way["leisure"="sports_centre"]["name"](around:${radiusMeters},${lat},${lon});
    
  );
  out body center qt;
`;

  try {
    // Send POST request to Overpass API
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
    });
    console.log('done');

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse JSON response and type it as containing OSMElement array
    const data: {elements: OSMElement[]} = await response.json();

    // Process each facility and convert to our standardized format
    return data.elements.map((facility: OSMElement): Facility => {
      // Format address as string
      const addressParts = [
        [facility.tags?.['addr:housenumber'], facility.tags?.['addr:street']]
          .filter(Boolean)
          .join(' '),
        facility.tags?.['addr:city'],
        facility.tags?.['addr:postcode'],
      ].filter(Boolean);

      const formattedAddress = addressParts.join(', ');
      // Transform OSM data into our ResultFacility format
      return {
        osm_id: facility.id,
        name: facility.tags?.name || 'Unnamed Facility',
        leisure: facility.tags?.sport || facility.tags?.leisure || 'Unknown',
        lat: facility.lat || facility.center?.lat,
        lon: facility.lon || facility.center?.lon,
        address: formattedAddress,
        accessibility: facility.tags?.access || 'unknown',
        opening_hours: facility.tags?.opening_hours,
        website: facility.tags?.website || facility.tags?.['contact:website'],
        phone: facility.tags?.phone || facility.tags?.['contact:phone'],
      };
    });
  } catch (error) {
    console.error('Error fetching facilities:', error);
    throw error;
  }
}

// Export types and main function
export type {OSMTags, OSMElement};
export default findSportsFacilities;
