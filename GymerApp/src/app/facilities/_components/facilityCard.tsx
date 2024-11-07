import React from 'react';
import {MapPin, Phone} from 'lucide-react';
import {Card, CardHeader, CardContent} from '@/components/ui/card';
// import {Button} from '@/components/ui/button';
// import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Facility} from '@/server/api/facilities';
import {AddEquipmentButton} from './addEquipmentButton';
import {ViewEquipmentsButton} from './viewEquipmentsButton';

const FacilityCard = ({facility}: {facility: Facility}) => {
  const capitalizeAndReplaceUnderscores = (str: string) => {
    return str
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div>
      <Card className="dark:bg-gray-800 bg-neutral-200 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="p-4 flex-1">
            <CardHeader className="p-0">
              <div className="flex justify-between items-start">
                <div>
                  {/* NAME */}
                  <span className="text-xl font-semibold">{facility.name}</span>
                  {facility.website ? (
                    <a
                      className="ml-1 italic dark:text-gray-400 text-gray-600"
                      target="_blank"
                      rel="noopener noferrer"
                      href={`//${facility.website}`}
                    >
                      - link
                    </a>
                  ) : (
                    <a
                      className="ml-1 italic dark:text-gray-400 text-gray-600"
                      target="_blank"
                      rel="noopener noferrer"
                      href={`https://www.google.com/search?q=${facility.name}`}
                    >
                      - check the web
                    </a>
                  )}
                </div>
                {/* DISTANCE AWAY */}
                {/* <span className="text-sm text-gray-500">{facility.distance} miles away</span> */}
              </div>
            </CardHeader>
            <CardContent className="p-0 mt-4">
              {/* ADDRESS --- LATER MAYBE USE REVERSE GEOCODING TO GET ACCURATE */}
              {facility.address ? (
                <div className="flex items-start space-x-2 text-gray-600 dark:text-gray-400 mb-2">
                  <MapPin size={16} className="mt-1 flex-shrink-0" />
                  <span>{facility.address}</span>
                </div>
              ) : (
                ''
              )}
              {/* PHONE */}
              {facility.phone ? (
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-3">
                  <Phone size={16} className="flex-shrink-0" />
                  <span>{facility.phone ? facility.phone : ''}</span>
                </div>
              ) : (
                ''
              )}
              {/* LEISURE */}
              {facility.leisure.endsWith('centre')}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {facility.leisure.endsWith('centre')
                    ? capitalizeAndReplaceUnderscores(
                        facility.leisure.split('_')[0],
                      ) + ' Center'
                    : capitalizeAndReplaceUnderscores(facility.leisure)}
                </span>
              </div>
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-2">
                  <AddEquipmentButton />
                  <ViewEquipmentsButton />
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FacilityCard;
