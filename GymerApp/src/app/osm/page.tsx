"use client"
import { Slider } from "@/components/ui/slider";
import Topbar from "../_components/TopBar";
import { useState } from "react";
import findSportsFacilities, { ProcessedFacility } from "@/lib/osm";
import { Button } from "@/components/ui/button";

export default function OSMData() {
  const [range, setRange] = useState(2);
  const [facilities, setFacilities] = useState<ProcessedFacility[]>([]);


  const handleSearch = async () => {

    try {
      // Get user's location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);
      
      // Convert range from kilometers to meters
      const radiusMeters = range * 1000;

      // Call the findSportsFacilities function
      const results = await findSportsFacilities(
        latitude,
        longitude,
        radiusMeters
      );

      setFacilities(results);
    } catch (error) {
      console.log(error)
    }
  };
  return ( 
    <div>
      <div className="py-4 max-w-96 justify-center">
        <Slider 
          defaultValue={[range]}
          max={10}
          step={.5}
          onValueChange={(val) => setRange(val[0])}
          className="mb-2"/>
          <div className="text-center font-medium">
            Current Range: {range}
          </div>
      </div>
      <div>
        <Button
          onClick={handleSearch}>
          Search
        </Button>
        {facilities.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Found Facilities:</h2>
            <ul className="space-y-2">
              {facilities.map((facility, index) => (
                <li key={index}>
                  {/* Display facility information based on your ProcessedFacility type */}
                  {JSON.stringify(facility)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
   );
}
