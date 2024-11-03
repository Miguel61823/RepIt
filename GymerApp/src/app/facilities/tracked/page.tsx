import React, { Suspense } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { FacilitySearchBar } from '../_components/facilitySearchBar';
import FacilityListings from '../_components/facilityListings';


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
    <div className="container flex-grow max-w-4xl mx-auto mt-8 px-4 mb-8">
      <Suspense fallback={<div>Loading...</div>}>
        <FacilitySearchBar search={searchTerm} searchType={"Tracked"} />
      
        <FacilityListings search={searchTerm} searchType={"Tracked"} />
      </Suspense>
    </div>
  );
}
