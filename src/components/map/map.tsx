'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AnimatePresence } from 'framer-motion';
import { RentalPopup } from './RentalPopup';
import { RentalResponse } from '@/api/generated';
import { apiClient } from '@/api/apiClient';

// Replace this with your Mapbox access token
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibmpjaW5uYW1vbmQiLCJhIjoiY204cDk5NWtsMDh2cTJscHpzcGVxZHVnNiJ9.q71yKOo7G87RMu1g3VUIhA';

interface MapProps {
  width?: string;
  height?: string;
  rentals: RentalResponse[];
  onNeedMore?: () => void;
}

const Map: React.FC<MapProps> = ({
  rentals = [],
  onNeedMore
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [currentRentalIndex, setCurrentRentalIndex] = useState<number>(0);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-73.935242, 40.730610], // NYC default center
      zoom: 12
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      markers.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, []);

  // Update markers when rentals change
  useEffect(() => {
    if (!map.current || !rentals.length) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    rentals.forEach((rental, index) => {
      if (rental.longitude && rental.latitude) {
        const marker = new mapboxgl.Marker({
          color: index === currentRentalIndex ? '#44dd44' : '#1a73e8'
        })
          .setLngLat([rental.longitude, rental.latitude])
          .addTo(map.current!);
        
        marker.getElement().addEventListener('click', () => {
          setCurrentRentalIndex(index);
        });
        
        markers.current.push(marker);
      }
    });
  }, [rentals, currentRentalIndex]);

  // Handle zooming to current rental - remove marker creation from here
  useEffect(() => {
    if (!map.current || !rentals.length) return;

    const currentRental = rentals[currentRentalIndex];
    if (currentRental?.longitude && currentRental?.latitude) {
      map.current.flyTo({
        center: [currentRental.longitude, currentRental.latitude],
        zoom: 15,
        duration: 1000
      });
    }
  }, [currentRentalIndex, rentals]);

  const handleSwipe = async (direction: 'left' | 'right') => {
    try {
      // Record the swipe
      const currentRental = rentals[currentRentalIndex];
      await apiClient.swipeRental(currentRental.listing_id, direction);

      // Move to next rental
      const nextIndex = currentRentalIndex + 1;
      if (nextIndex < rentals.length) {
        setCurrentRentalIndex(nextIndex);
      } else {
        // If we're running out of rentals, request more
        if (onNeedMore) {
          onNeedMore();
          // Set to the first new rental that will be loaded
          setCurrentRentalIndex(rentals.length);
        }
      }
    } catch (error) {
      console.error('Error recording swipe:', error);
    }
  };

  return (
    <div 
      ref={mapContainer} 
      style={{ 
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: '0',  // Remove border radius since it's full screen
        overflow: 'hidden'
      }} 
    >
      <AnimatePresence>
        {currentRentalIndex >= 0 && currentRentalIndex < rentals.length && (
          <RentalPopup
            rental={rentals[currentRentalIndex]}
            onSwipe={handleSwipe}
            onClose={() => setCurrentRentalIndex(-1)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Map;
