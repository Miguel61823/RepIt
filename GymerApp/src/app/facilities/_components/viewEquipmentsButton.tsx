// GymerApp/src/app/facilities/_components/viewEquipmentsButton.tsx
'use client';

import React, {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {EquipmentData} from '@/drizzle/api/equipment'; // Import the correct EquipmentData type

interface ViewEquipmentsButtonProps {
  osmId: string;
  equipment: EquipmentData[];
  setEquipment: React.Dispatch<React.SetStateAction<EquipmentData[]>>;
}

export const ViewEquipmentsButton: React.FC<ViewEquipmentsButtonProps> = ({
  osmId,
  equipment,
  setEquipment,
}: ViewEquipmentsButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchEquipment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/equipment?osm_id=${osmId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch equipment');
      }

      const data = await response.json(); // Ensure data matches EquipmentData type
      setEquipment(prevEqupment => {
        return data.data;
      });
      setIsOpen(true); // Open the equipment list when data is fetched
    } catch (err) {
      console.error('Error fetching equipment:', err);
      setError('Error loading equipment data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        type="button"
        className="font-medium text-lg w-full bg-purple-600 hover:bg-purple-700 text-white"
        onClick={fetchEquipment}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'View Equipment'}
      </Button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {isOpen && (
        <div className="bg-slate-800 mt-4 p-4 rounded max-h-[300px] overflow-y-auto">
          {equipment.length > 0 ? (
            equipment.map((item, index) => (
              <div key={`${index}`} className="border-b border-slate-700 py-2">
                <p className="text-white">Name: {item.name}</p>
                <p className="text-slate-300">Type: {item.type || 'N/A'}</p>
                <p className="text-slate-300">
                  Condition: {item.condition || 'N/A'}
                </p>
                <p className="text-slate-300">
                  Quantity: {item.quantity || 'N/A'}
                </p>
                <p className="text-slate-300">
                  Maintenance Date: {item.maintenance_date || 'N/A'}
                </p>
                <p className="text-slate-300">
                  Description: {item.description || 'No description'}
                </p>
              </div>
            ))
          ) : (
            <p className="text-slate-400">
              No equipment found for this facility.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
