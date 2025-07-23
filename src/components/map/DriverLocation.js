import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to import axios
import CarListOptions from './CarListOptions';
import { useDriver } from '../../Context/DriverContext'
// import CustomerDetails from '../Drivermap/CustomerDetails';

const DriverLocation = ({ driverId }) => { // Pass driverId as a prop
  // State to hold the current position of the driver
  const { driverPosition, setDriverPosition } = useDriver();
  

  useEffect(() => {
    // Watch the driver's position using the Geolocation API
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        // Update the driver position state with current latitude and longitude
        const newPosition = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        };
        setDriverPosition(newPosition);
        
        // Store the current position in the database
        updateDriverLocation(driverId, newPosition.lat, newPosition.lon);
      },
      (error) => {
        // Log any errors that occur while getting the position
        console.error('Error getting driver position:', error);
      }
    );

    // Cleanup function to clear the watch when the component unmounts
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [driverId]); // Include driverId in dependency array

  const updateDriverLocation = async (driverId, current_lat, current_lng) => {
    try {
      await axios.put(`http://localhost:8085/driver/update-location/${driverId}`, {
        current_lat,
        current_lng
      });
      console.log('Driver location updated in the database');
    } catch (error) {
      console.error('Error updating driver location in the database:', error);
    }
  };

  useEffect(() => {
    // Log the driver's position when it changes
    if (driverPosition) {
      console.log('Driver Position:', driverPosition.lat, driverPosition.lon);
    }
  }, [driverPosition]);

  return (
    <div>
      <h1>Driver Location Watcher</h1>
      {/* Pass driver position to CarListOptions component */}
      <CarListOptions driverPositions={driverPosition} />
      {/* <CustomerDetails driverPositions={driverPosition}/> */}
    </div>
  );
};

export default DriverLocation;
