import React, { useContext, useEffect, useState } from 'react';
import InputItem from './InputItem';
import { DestinationContext } from '../../Context/DestinationContext';
import { SourceContext } from '../../Context/SourceContext';
import CarListOptions from './CarListOptions';
import PaymentModal from '../Modal/PaymentModal';
import axios from 'axios';

const SearchSection = ({ userId, customerName, emails }) => {
  // Context for source and destination coordinates
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  // State to hold distance, modal visibility, and payment URL
  const [distance, setDistance] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');

  // Compute distance between two geographical points using Haversine formula
  const computeDistanceBetween = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  // Convert degrees to radians
  const deg2rad = (deg) => deg * (Math.PI / 180);

  // Validate if a value is a valid number
  const isValidNumber = (value) => typeof value === 'number' && !isNaN(value);

  // Calculate distance if source and destination coordinates are valid
  const calculateDistance = () => {
    if (
      isValidNumber(source.lat) &&
      isValidNumber(source.lon) &&
      isValidNumber(destination.lat) &&
      isValidNumber(destination.lon)
    ) {
      const dist = computeDistanceBetween(
        source.lat,
        source.lon,
        destination.lat,
        destination.lon
      );
      setDistance(dist);
    } else {
      console.error('Invalid latitude or longitude values');
    }
  };

  // Check trip status and update payment modal visibility
  useEffect(() => {
    const checkTripStatus = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8085/api/trips/latest/${userId}`);
          const trip = response.data;

          if (trip) {
            sessionStorage.setItem('tripId', trip.id);

            if (trip.payment_status === 'No') {
              setShowPaymentModal(true);

              const driverResponse = await axios.get(`http://localhost:8085/api/drivers/${trip.driverId}/payment-url`);
              const driverData = driverResponse.data;

              setPaymentUrl(driverData.URL_payment || '');
            } else if (trip.payment_status === 'Yes') {
              setShowPaymentModal(false);
            }
          }
        } catch (error) {
          console.error('Error fetching trip status:', error);
        }
      }
    };

    checkTripStatus();
    const intervalId = setInterval(checkTripStatus, 10000); // Check every 10 seconds
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [userId]);

  return (
    <div className='container mt-5'>
      <h1 className='text-lg md:text-2xl text-dark font-bold'>Get a ride</h1>
      <div className='p-3 md:p-5 border border-1 rounded-xl'>
        {/* Input fields for source and destination */}
        <InputItem type='source' setCoordinate={setSource} />
        <InputItem type='destination' setCoordinate={setDestination} />
        <button
          className='btn btn-primary search btn-lg w-full md:w-auto mt-4 md:mt-5'
          onClick={calculateDistance}
        >
          Search
        </button>
      </div>
      {/* Conditionally render CarListOptions component if distance is calculated */}
      {distance !== null && (
        <CarListOptions
          distance={distance}
          pickup={source}
          dropOff={destination}
          customerId={userId}
          customerName={customerName}
          emails={emails}
          setShowPaymentModal={setShowPaymentModal}
        />
      )}
      {/* Conditionally render PaymentModal component if payment modal should be shown */}
      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          paymentUrl={paymentUrl}
        />
      )}
    </div>
  );
};

export default SearchSection;
