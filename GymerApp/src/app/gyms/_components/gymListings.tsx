import React, { useState } from 'react';
import { Search, MapPin, Star, Phone, Check } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GymCard from './gymCard';

// Mock data - replace with API call
export const mockGyms = [
  {
    id: 1,
    name: "PowerFit Gym",
    rating: 4.5,
    address: "123 Main St, City",
    distance: 0.8,
    phone: "+1 234-567-8900",
    features: ["24/7 Access", "Personal Training", "Group Classes"],
    image_url: "/api/placeholder/400/200",
    google_url: "https://www.google.com/search?q=Fitness+First"
  },
  {
    id: 2,
    name: "CrossFit Zone",
    rating: 4.8,
    address: "456 Oak Ave, City",
    distance: 1.2,
    phone: "+1 234-567-8901",
    features: ["CrossFit Classes", "Open Gym", "Showers"],
    image_url: "/api/placeholder/400/200",
    google_url: "https://www.google.com/search?q=Fitness+First"
  },
  {
    id: 3,
    name: "Fitness First",
    rating: 4.2,
    address: "789 Pine Rd, City",
    distance: 1.5,
    phone: "+1 234-567-8902",
    features: ["Pool", "Sauna", "Cardio Equipment"],
    image_url: "/api/placeholder/400/200",
    google_url: "https://www.google.com/search?q=Fitness+First"
  }
];

const GymListings = async ({ gyms }: { gyms: typeof mockGyms }) => {
  // DB data
  // const filteredGyms = getGyms(search);
  
  // MOCK data
  const filteredGyms = gyms;

  return (
    <div>
      <div className="space-y-4">
        {filteredGyms.map(gym => (
          <GymCard gym={gym} />
        ))}
      </div>
    </div>
  );
};

export default GymListings;
