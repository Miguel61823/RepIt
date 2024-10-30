"use client";

import React, { useState } from 'react';
import { Search, MapPin, Star, Phone, Check } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const GymCard = ({ gym }) => {

  return (
    <div>
    <Card key={gym.id} className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <img
              src={gym.imageUrl}
              alt={gym.name}
              className="h-48 md:w-64 object-cover"
            />
            <div className="p-4 flex-1">
              <CardHeader className="p-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{gym.name}</h2>
                    <div className="flex items-center text-yellow-500 mt-1">
                      <Star className="fill-current" size={16} />
                      <span className="ml-1">{gym.rating}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{gym.distance} miles away</span>
                </div>
              </CardHeader>
              <CardContent className="p-0 mt-4">
                <div className="flex items-start space-x-2 text-gray-600 mb-2">
                  <MapPin size={16} className="mt-1 flex-shrink-0" />
                  <span>{gym.address}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 mb-3">
                  <Phone size={16} className="flex-shrink-0" />
                  <span>{gym.phone}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {gym.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                {/* <SetGymButton gym={gym}/> */}
              </CardContent>
            </div>  
          </div>
        </Card>
    </div>
  )
}

export default GymCard;
