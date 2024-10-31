import React, { Suspense, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from '@/app/_components/TopBar';
import Footer from '@/app/_components/Footer';
import { GymSearchBar } from '../_components/gymSearchBar';
import GymListings from '../_components/gymListings';


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

  return (
    <div className="flex flex-col dark:bg-black  bg-white min-h-screen  dark:text-white text-black">
      <Topbar />

      <div className="container flex-grow max-w-4xl mx-auto mt-8 px-4 mb-8">
        <Suspense fallback={<div>Loading...</div>}>
          <GymSearchBar search={searchTerm} searchType={"Tracked"} />
        
          <GymListings search={searchTerm} searchType={"Tracked"} />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}
