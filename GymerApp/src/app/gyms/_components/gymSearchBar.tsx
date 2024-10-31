"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDebounce } from "use-debounce";

export const GymSearchBar = ({ search }: { search?: string }) => {
  const router = useRouter();
  const initRender = useRef(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [query] = useDebounce(searchTerm, 500);
  // const [filteredGyms, setFilteredGyms] = useState(mockGyms);

  useEffect(() => {
    if (initRender.current) {
      initRender.current = false;
      return;
    }
    
    if (!query) {
      router.push(`/gyms`)
    } else {
      router.push(`/gyms?search=${query}`)
    }
  }, [query]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Nearby Gyms</h1>
        <Search className="relative left-2 top-9 text-gray-400" size={20} />
        <div className="w-full flex items-center">
          <input
            type="text"
            placeholder="Search gyms by name or features..."
            className="w-full p-3 pl-10 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      </div>
    </div>
  )
};
