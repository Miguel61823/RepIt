import React, { useState } from 'react';
import { Search, MapPin, Star, Phone, Check } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GymCard from './gymCard';
import { getGyms, Gym } from '@/server/api/gyms';

// Mock data - replace with API call
export const mockGyms = [
  {
    gym_id: "e6dbfb05-fdf8-416b-9fff-53bba9b50ac7",
    map_id: "fij8923",
    name: "PowerFit Gym",
    rating: 4.5,
    address: "123 Main St, City",
    distance: 0.8,
    phone: "+1 234-567-8900",
    features: ["24/7 Access", "Personal Training", "Group Classes"],
    image_url: "/api/placeholder/400/200",
    website: "https://www.google.com/search?q=PowerFit+Gym"
  },
  {
    gym_id: "9941aa0e-5e54-43dc-a196-2980132350c5",
    map_id: "234j89v",
    name: "CrossFit Zone",
    rating: 4.8,
    address: "456 Oak Ave, City",
    distance: 1.2,
    phone: "+1 234-567-8901",
    features: ["CrossFit Classes", "Open Gym", "Showers"],
    image_url: "/api/placeholder/400/200",
    website: "https://www.google.com/search?q=CrossFit+Zone"
  },
  {
    gym_id: "25549787-33e1-4691-8084-82954dba01d1",
    map_id: "qwner0cv",
    name: "Fitness First",
    rating: 4.2,
    address: "789 Pine Rd, City",
    distance: 1.5,
    phone: "+1 234-567-8902",
    features: ["Pool", "Sauna", "Cardio Equipment"],
    image_url: "/api/placeholder/400/200",
    website: "https://www.google.com/search?q=Fitness+First"
  }
];

const GymListings = async ({ search }: { search: string | undefined }) => {
  // Current 'gyms': MOCK data; LATER: DB data
  const gyms = await getGyms(search);

  return (
    <div>
      <div className="space-y-4">
        {gyms.map(gym => (
          <GymCard key={gym.gym_id} gym={gym} />
        ))}
      </div>
    </div>
  );
};

export default GymListings;
