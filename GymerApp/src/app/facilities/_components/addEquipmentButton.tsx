'use client';

import React from 'react';
// import {Search, MapPin, Star, Phone, Check} from 'lucide-react';
// import {Card, CardHeader, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
// import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddEquipmentButton = () => {
  return (
    <div>
      <Button
        type="button"
        className="font-medium text-lg w-full"
        // onClick={async () => addGym(gym)}
      >
        Add Equipment
      </Button>
    </div>
  );
};
