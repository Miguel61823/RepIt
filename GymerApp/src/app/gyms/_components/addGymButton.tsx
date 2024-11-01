"use client";

import React, { useState } from 'react';
import { Search, MapPin, Star, Phone, Check } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addGym, Gym } from '@/server/api/gyms';


export const AddGymButton = ({ gym }: { gym: Gym }) => {
  return (
    <div>
      <Button
        type="button"
        className="font-medium text-lg bg-violet-600 dark:text-white w-full"
        onClick={async () => addGym(gym)}
      >
        Add Gym
      </Button>
    </div>
  );
};
