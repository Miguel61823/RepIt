import React, { Suspense } from 'react';
// import { Search, MapPin, Star, Phone, Check } from 'lucide-react';
// import { Card, CardHeader, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Topbar from '../_components/TopBar';
import Footer from '../_components/Footer';
import { FacilitySearchBar } from './_components/facilitySearchBar';
import FacilityListings from './_components/facilityListings';
// import { getGyms } from '@/server/api/gyms';


export default async function ListingsPage({
  searchParams
}:{
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
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
    <div className="container flex-grow max-w-4xl mx-auto mt-8 px-4 mb-8">
      {/* <ToastContainer /> Add ToastContainer here */}
      <Suspense fallback={<div>Loading...</div>}>
        <FacilitySearchBar search={searchTerm} searchType={"Nearby"} />
        <FacilityListings search={searchTerm} searchType={"Nearby"} />
      </Suspense>
    </div>
  );
}
