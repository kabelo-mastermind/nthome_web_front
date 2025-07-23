// TripContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import toast from 'react-hot-toast';
import dummyWeatherData from '../../src/utils/dummyWeatherData'; // Import the dummy data

// Initialize the socket
const socket = io('http://localhost:8085');

// Create TripContext
const TripContext = createContext();

// Custom hook to use TripContext
export const useTrip = () => {
  return useContext(TripContext);
};

// TripProvider component to wrap around components needing trip state
export const TripProvider = ({ children }) => {
  const [tripData, setTripData] = useState(null);
  const [tripRequested, setTripRequested] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [isBadWeather, setIsBadWeather] = useState(false);

  // Listen to socket events for trip updates
  useEffect(() => {
    socket.on('tripAccepted', () => {
      toast.success('Your ride is being accepted!');
    });

    socket.on('tripCancelled', (data) => {
      toast.error(data.message);
      setTripRequested(false); // Reset trip request status if canceled
    });

    return () => {
      socket.off('tripAccepted');
      socket.off('tripCancelled');
    };
  }, []);

  // Fetch time and weather data from server
  useEffect(() => {
    const fetchTimeAndWeather = async () => {
      try {
        const { currentHour, weatherCondition } = dummyWeatherData; // Replace this with real-time API if available

        setIsNight(currentHour >= 22 || currentHour < 6);
        setIsBadWeather(weatherCondition === 'storm' || weatherCondition === 'rain');
      } catch (error) {
        console.error('Error fetching weather or time:', error);
      }
    };

    fetchTimeAndWeather();
  }, []);

  const initiateTrip = (tripInfo) => {
    setTripData(tripInfo);
    setTripRequested(true);
    socket.emit('tripRequested', tripInfo); // Emit event for real-time communication
  };

  return (
    <TripContext.Provider value={{ tripData, tripRequested, initiateTrip, isNight, isBadWeather }}>
      {children}
    </TripContext.Provider>
  );
};
