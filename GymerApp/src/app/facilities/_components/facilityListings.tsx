import React, { useState } from 'react';
import { Search, MapPin, Star, Phone, Check } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FacilityCard from './facilityCard';
import { getFacilities, Facility } from '@/server/api/facilities';

// Mock data - replace with API call
export const mockFacilities = [
  {
    facility_id: "e6dbfb05-fdf8-416b-9fff-53bba9b50ac7",
    osm_id: "fij8923",
    name: "PowerFit Gym",
    address: "123 Main St, City",
    leisure: "fitness_centre",
    accessibility: "door",
    lat: -23.34,
    lon: 32.12,
    distance: 0.8,
    phone: "+1 234-567-8900",
    website: "https://www.google.com/search?q=PowerFit+Gym"
  },
  {
    facility_id: "9941aa0e-5e54-43dc-a196-2980132350c5",
    osm_id: "234j89v",
    name: "CrossFit Zone",
    address: "456 Oak Ave, City",
    leisure: "fitness_centre",
    accessibility: "door",
    lat: -37.4,
    lon: 4.32,
    distance: 1.2,
    phone: "+1 234-567-8901",
    website: "https://www.google.com/search?q=CrossFit+Zone"
  },
  {
    facility_id: "25549787-33e1-4691-8084-82954dba01d1",
    osm_id: "qwner0cv",
    name: "Fitness First",
    address: "789 Pine Rd, City",
    leisure: "fitness_centre",
    accessibility: "wheelchair",
    lat: -56.3,
    lon: 5,
    distance: 1.5,
    phone: "+1 234-567-8902",
    website: "https://www.google.com/search?q=Fitness+First"
  }
];

const FacilityListings = async (
  { search, searchType }: { search: string | undefined, searchType: string }
) => {
  // Current 'facilities': MOCK data; LATER: DB data
  const facilities = await getFacilities(search);

  return (
    <div>
      <div className="space-y-4">
        {facilities.map(facility => (
          <FacilityCard key={facility.facility_id} facility={facility} />
        ))}
      </div>
    </div>
  );
};

export default FacilityListings;
