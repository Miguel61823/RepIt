import React, { Suspense, useState } from 'react';
import { Search, MapPin, Star, Phone, Check } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from '../_components/TopBar';
import Footer from '../_components/Footer';
import { GymSearchBar } from './_components/gymsearchbar';
import GymListings from './_components/gymlistings';
import { getGyms } from '@/server/api/gyms';
import { ConsoleLogWriter } from 'drizzle-orm';



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

export default async function ListingsPage({
  searchParams
}:{
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  // const [searchTerm, setSearchTerm] = useState('');
  // const [filteredGyms, setFilteredGyms] = useState(mockGyms);
  // const [myGym, setMyGym] = useState(null);

  // console.log(searchParams.search === "string")
  const searchTerm = typeof searchParams.search === "string"
    ? searchParams.search
    : undefined;
  // console.log(`search term: ${searchTerm}`);

  // const handleSetMyGym = (gym) => {
  //   setMyGym(gym);
  //   toast.success(`${gym.name} has been set as your primary gym!`, {
  //     position: "top-right",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };
 
  const gyms = await getGyms(searchTerm);

  return (
    <div className="flex flex-col dark:bg-black  bg-white min-h-screen  dark:text-white text-black">
      <Topbar />

      <div className="container flex-grow max-w-4xl mx-auto mt-8 px-4 mb-8">
        <ToastContainer /> {/* Add ToastContainer here */}
        <GymSearchBar search={searchTerm} />

        {/* {myGym && (
          <Card className="mb-6 bg-green-50 dark:bg-green-950">
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
        )} */}
        
        <Suspense fallback={<div>Loading...</div>}>
          <GymListings gyms={gyms} />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
