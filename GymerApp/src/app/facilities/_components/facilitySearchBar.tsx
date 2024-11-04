'use client';

import React, {useEffect, useRef, useState} from 'react';
import {Search} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useDebounce} from 'use-debounce';

export const FacilitySearchBar = ({
  search,
  searchType,
}: {
  search?: string;
  searchType: string;
}) => {
  const router = useRouter();
  const initRender = useRef(true);
  const [searchTerm, setSearchTerm] = useState(search);
  const [query] = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (initRender.current) {
      initRender.current = false;
      return;
    }

    if (searchType === 'Nearby') {
      if (!query) {
        router.push('/facilities');
      } else {
        router.push(`/facilities?search=${query}`);
      }
    } else if (searchType === 'Tracked') {
      if (!query) {
        router.push('/facilities');
      } else {
        router.push(`/facilities?search=${query}`);
      }
    }
  }, [query, router, searchType]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{searchType} Facilities</h1>
        <Search className="relative left-2 top-9 text-gray-400" size={20} />
        <div className="w-full flex items-center">
          <input
            type="text"
            placeholder="Search facilities"
            className="w-full p-3 pl-10 border rounded-lg"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      </div>
    </div>
  );
};
