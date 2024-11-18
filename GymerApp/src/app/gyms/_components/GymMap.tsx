import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const GymMap = ({ gyms, center = { lat: 40.7128, lng: -74.0060 } }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedGym, setSelectedGym] = useState(null);

  useEffect(() => {
    // Load the Google Maps script
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      const mapInstance = new window.google.maps.Map(
        document.getElementById('gym-map'),
        {
          center,
          zoom: 12,
          styles: [
            {
              featureType: 'poi.business',
              stylers: [{ visibility: 'on' }]
            },
            {
              featureType: 'transit',
              elementType: 'labels.icon',
              stylers: [{ visibility: 'on' }]
            }
          ]
        }
      );

      setMap(mapInstance);

      // Create markers for each gym
      const newMarkers = gyms.map(gym => {
        const marker = new window.google.maps.Marker({
          position: {
            lat: gym.latitude || center.lat,
            lng: gym.longitude || center.lng
          },
          map: mapInstance,
          title: gym.name,
          animation: window.google.maps.Animation.DROP
        });

        // Create info window for each marker
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-semibold">${gym.name}</h3>
              <p>${gym.address}</p>
              <p>${gym.distance} miles away</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          if (selectedGym) {
            selectedGym.close();
          }
          infoWindow.open(mapInstance, marker);
          setSelectedGym(infoWindow);
        });

        return marker;
      });

      setMarkers(newMarkers);
    };

    loadGoogleMapsScript();

    return () => {
      // Cleanup markers when component unmounts
      markers.forEach(marker => marker.setMap(null));
    };
  }, [gyms]);

  return (
    <Card className="w-full h-96 mb-6">
      <div id="gym-map" className="w-full h-full rounded-lg" />
    </Card>
  );
};

export default GymMap;