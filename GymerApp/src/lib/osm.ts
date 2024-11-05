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
  id: number; // Unique identifier for the facility
  type: 'node' | 'way' | 'relation'; // OSM element type
  lat?: number; // Latitude (for nodes)
  lon?: number; // Longitude (for nodes)
  center?: {
    // Center coordinates (for ways and relations)
    lat: number;
    lon: number;
  };
  tags?: OSMTags; // Metadata tags for the element
}

// Interface for processed facility data
// This is our cleaned and formatted version of the OSM data
interface ProcessedFacility {
  id: number; // Original OSM ID
  type: 'node' | 'way' | 'relation'; // OSM element type
  name: string; // Facility name (with fallback to 'Unnamed Facility')
  leisure: string; // Primary facility type
  location: {
    // Normalized location data
    lat: number | undefined; // Latitude
    lon: number | undefined; // Longitude
  };
  address: {
    // Structured address information
    street?: string;
    housenumber?: string;
    city?: string;
    postcode?: string;
  };
  distanceMeters: number; // Distance from search point
  tags: OSMTags; // All original OSM tags
  accessibility: string; // Access level information
  openingHours?: string; // Operating hours if available
  website?: string; // Website URL
  phone?: string; // Contact phone number
}

// Main function to find sports facilities within a given radius
// Takes latitude, longitude, and radius in meters as parameters
// Returns a promise that resolves to an array of processed facilities
async function findSportsFacilities(
  lat: number,
  lon: number,
  radiusMeters: number = 2000,
): Promise<ProcessedFacility[]> {
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
    return (
      data.elements
        .map((facility: OSMElement): ProcessedFacility => {
          // Calculate distance from search point to facility
          const distance = calculateDistance(
            lat,
            lon,
            facility.lat || facility.center?.lat,
            facility.lon || facility.center?.lon,
          );

          // Transform OSM data into our ProcessedFacility format
          return {
            id: facility.id,
            type: facility.type,
            name: facility.tags?.name || 'Unnamed Facility',
            leisure:
              facility.tags?.sport || facility.tags?.leisure || 'Unknown',
            location: {
              lat: facility.lat || facility.center?.lat,
              lon: facility.lon || facility.center?.lon,
            },
            address: {
              street: facility.tags?.['addr:street'],
              housenumber: facility.tags?.['addr:housenumber'],
              city: facility.tags?.['addr:city'],
              postcode: facility.tags?.['addr:postcode'],
            },
            distanceMeters: Number(distance.toFixed(2)),
            tags: facility.tags || {},
            accessibility: facility.tags?.access || 'unknown',
            openingHours: facility.tags?.opening_hours,
            website:
              facility.tags?.website || facility.tags?.['contact:website'],
            phone: facility.tags?.phone || facility.tags?.['contact:phone'],
          };
        })
        // Sort facilities by distance from search point
        .sort(
          (a: ProcessedFacility, b: ProcessedFacility) =>
            a.distanceMeters - b.distanceMeters,
        )
    );
  } catch (error) {
    console.error('Error fetching facilities:', error);
    throw error;
  }
}

// Helper function to calculate great-circle distance between two points using Haversine formula
// Takes coordinates of two points and returns distance in meters
// Handles cases where destination coordinates might be undefined
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number | undefined,
  lon2: number | undefined,
): number {
  if (lat2 === undefined || lon2 === undefined) {
    return Infinity; // Return Infinity for undefined coordinates
  }

  const R = 6371000; // Earth's radius in meters
  const dLat = toRad(lat2 - lat1); // Delta latitude in radians
  const dLon = toRad(lon2 - lon1); // Delta longitude in radians

  // Haversine formula components
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Final distance in meters
}

// Helper function to convert degrees to radians
function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Export types and main function
export type {OSMTags, OSMElement, ProcessedFacility};
export default findSportsFacilities;
