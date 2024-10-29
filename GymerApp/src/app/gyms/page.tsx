"use client";
import React, { useState } from 'react';
import { Search, MapPin, Star, Phone, Check } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from '../_components/TopBar';
import Footer from '../_components/Footer';

// Mock data - replace with API call
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

export default function ListingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGyms, setFilteredGyms] = useState(mockGyms);
  const [myGym, setMyGym] = useState(null);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredGyms(
      mockGyms.filter(gym => 
        gym.name.toLowerCase().includes(term) ||
        gym.features.some(feature => feature.toLowerCase().includes(term))
      )
    );
  };

  const handleSetMyGym = (gym) => {
    setMyGym(gym);
    toast.success(`${gym.name} has been set as your primary gym!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="flex flex-col dark:bg-black  bg-white min-h-screen  dark:text-white text-black">
      <Topbar />
      <div className="container flex-grow max-w-4xl mx-auto mt-8 px-4 mb-8">
        <ToastContainer /> {/* Add ToastContainer here */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Nearby Gyms</h1>
          <Search className="relative left-2 top-9 text-gray-400" size={20} />
          <div className="w-full flex items-center">
            <input
              type="text"
              placeholder="Search gyms by name or features..."
              className="w-full p-3 pl-10 border rounded-lg"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {myGym && (
          <Card className="mb-6 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Check className="text-green-500 mr-2" size={20} />
                  <span className="font-medium">Your Current Gym: {myGym.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setMyGym(null)}
                >
                  Change Gym
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {filteredGyms.map(gym => (
            <Card key={gym.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <img
                  src={gym.imageUrl}
                  alt={gym.name}
                  className="h-48 md:w-64 object-cover"
                />
                <div className="p-4 flex-1">
                  <CardHeader className="p-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold">{gym.name}</h2>
                        <div className="flex items-center text-yellow-500 mt-1">
                          <Star className="fill-current" size={16} />
                          <span className="ml-1">{gym.rating}</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{gym.distance} miles away</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 mt-4">
                    <div className="flex items-start space-x-2 text-gray-600 mb-2">
                      <MapPin size={16} className="mt-1 flex-shrink-0" />
                      <span>{gym.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 mb-3">
                      <Phone size={16} className="flex-shrink-0" />
                      <span>{gym.phone}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {gym.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <Button 
                      className="w-full mt-4"
                      variant={myGym?.id === gym.id ? "secondary" : "default"}
                      onClick={() => handleSetMyGym(gym)}
                      disabled={myGym?.id === gym.id}
                    >
                      {myGym?.id === gym.id ? "Current Gym" : "Set as My Gym"}
                    </Button>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
