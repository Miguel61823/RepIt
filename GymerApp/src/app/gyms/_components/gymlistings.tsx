import React, { useState } from 'react';
import { Search, MapPin, Star, Phone, Check } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GymCard from './gymcard';

const mockGyms = [
  {
    id: 1,
    name: "PowerFit Gym",
    rating: 4.5,
    address: "123 Main St, City",
    distance: 0.8,
    phone: "+1 234-567-8900",
    features: ["24/7 Access", "Personal Training", "Group Classes"],
    imageUrl: "/api/placeholder/400/200"
  },
  {
    id: 2,
    name: "CrossFit Zone",
    rating: 4.8,
    address: "456 Oak Ave, City",
    distance: 1.2,
    phone: "+1 234-567-8901",
    features: ["CrossFit Classes", "Open Gym", "Showers"],
    imageUrl: "/api/placeholder/400/200"
  },
  {
    id: 3,
    name: "Fitness First",
    rating: 4.2,
    address: "789 Pine Rd, City",
    distance: 1.5,
    phone: "+1 234-567-8902",
    features: ["Pool", "Sauna", "Cardio Equipment"],
    imageUrl: "/api/placeholder/400/200"
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
