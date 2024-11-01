import React, { Suspense, useState } from 'react';
// import { Search, MapPin, Star, Phone, Check } from 'lucide-react';
// import { Card, CardHeader, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Topbar from '../_components/TopBar';
import Footer from '../_components/Footer';
import { GymSearchBar } from './_components/gymSearchBar';
import GymListings from './_components/gymListings';
// import { getGyms } from '@/server/api/gyms';


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

  return (
    <div className="flex flex-col dark:bg-gray-900  bg-white min-h-screen  dark:text-white text-black">
      <Topbar />

      <div className="container flex-grow max-w-4xl mx-auto mt-8 px-4 mb-8">
        {/* <ToastContainer /> Add ToastContainer here */}
        <Suspense fallback={<div>Loading...</div>}>
          <GymSearchBar search={searchTerm} searchType={"Nearby"} />

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
        
          <GymListings search={searchTerm} searchType={"Nearby"} />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
