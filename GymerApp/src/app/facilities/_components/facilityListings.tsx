'use client';

import React, {Suspense, useState} from 'react';
// import {Search, MapPin, Star, Phone, Check} from 'lucide-react';
// import {Card, CardHeader, CardContent} from '@/components/ui/card';
// import {Button} from '@/components/ui/button';
// import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FacilityCard from './facilityCard';
import {
  Facility,
  getNearbyFacilities,
  insertFacilities,
} from '@/server/api/facilities';
import {Button} from '@/components/ui/button';
import {Slider} from '@/components/ui/slider';
import findSportsFacilities from '@/lib/osm';

// // Mock data - replace with API call
// export const mockFacilities = [
//   {
//     facility_id: 'e6dbfb05-fdf8-416b-9fff-53bba9b50ac7',
//     osm_id: 'fij8923',
//     name: 'PowerFit Gym',
//     address: '123 Main St, City',
//     leisure: 'fitness_centre',
//     accessibility: 'door',
//     lat: -23.34,
//     lon: 32.12,
//     distance: 0.8,
//     phone: '+1 234-567-8900',
//     website: 'https://www.google.com/search?q=PowerFit+Gym',
//   },
//   {
//     facility_id: '9941aa0e-5e54-43dc-a196-2980132350c5',
//     osm_id: '234j89v',
//     name: 'CrossFit Zone',
//     address: '456 Oak Ave, City',
//     leisure: 'fitness_centre',
//     accessibility: 'door',
//     lat: -37.4,
//     lon: 4.32,
//     distance: 1.2,
//     phone: '+1 234-567-8901',
//     website: 'https://www.google.com/search?q=CrossFit+Zone',
//   },
//   {
//     facility_id: '25549787-33e1-4691-8084-82954dba01d1',
//     osm_id: 'qwner0cv',
//     name: 'Fitness First',
//     address: '789 Pine Rd, City',
//     leisure: 'fitness_centre',
//     accessibility: 'wheelchair',
//     lat: -56.3,
//     lon: 5,
//     distance: 1.5,
//     phone: '+1 234-567-8902',
//     website: 'https://www.google.com/search?q=Fitness+First',
//   },
// ];

const FacilityListings = ({
  search,
  // searchType,
}: {
  search: string | undefined;
  // searchType: string;
}) => {
  const [searchTerm, setSearchTerm] = useState(search);
  const [range, setRange] = useState(2);
  // const [location, setLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [results, setResults] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOSMSearch = async () => {
    try {
      // Get user's location
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        },
      );

      const {latitude, longitude} = position.coords;
      console.log(latitude, longitude);

      search = '';
      setSearchTerm('');

      // Convert range from kilometers to meters
      const radiusMeters = range * 1000;

      setIsLoading(true);
      // Call the findSportsFacilities function
      const response: Facility[] = await findSportsFacilities(
        latitude,
        longitude,
        radiusMeters,
      );

      setResults(response);
      console.log('after response is set to result');
      console.log(response);
      console.log(results);
      // insert the result facilities into the db
      await insertFacilities(response);

      // after inserting facilities, reload/re-search the facilities
      await handleDBSearch();

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDBSearch = async () => {
    try {
      // console.log("IS IT WORKING?");
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        },
      );
      const {latitude, longitude} = position.coords;
      // setLocation({
      //   latitude: position.coords.latitude,
      //   longitude: position.coords.longitude
      // });

      setIsLoading(true);
      // console.log(`got the position: ${location}`);
      //   console.log("now getting nearby facilities...");
      const results = await getNearbyFacilities(
        latitude,
        longitude,
        range,
        search,
      );
      // console.log("got nearby facilities");
      // console.log("setting nearby facilities...");
      // console.log(results);
      setFacilities(results);
      // } else {
      //   console.error("TF; LOCATION");
      // }
      // console.log('IT SHOULD BE WORKING>>>>>');

      setIsLoading(false);
    } catch {
      // console.error('you done fd up');
      setError('Please enable location services.');
    }
  };

  if (error) {
    return <div className="text-red-50">{error}</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-between mb-2">
        <div className="">
          <Slider
            defaultValue={[range]}
            max={10}
            step={0.5}
            onValueChange={val => setRange(val[0])}
            className="min-w-48 sm:min-w-96 w-full"
          />
          <div className="font-medium mt-4">Radius: {range}km</div>
        </div>
        {!isLoading ? (
          <div className="mt-2">
            <Button onClick={handleDBSearch} className="max-w-24 left-0">
              Search
            </Button>
            {facilities.length ? (
              <Button onClick={handleOSMSearch} className="ml-2">
                I don&apost see my facility
              </Button>
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="space-y-4">
        <Suspense fallback={<div>Loading...</div>}>
          {isLoading ? (
            <div>Getting nearby facilities...</div>
          ) : (
            facilities.map(facility => (
              <FacilityCard key={facility.osm_id} facility={facility} />
            ))
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default FacilityListings;
