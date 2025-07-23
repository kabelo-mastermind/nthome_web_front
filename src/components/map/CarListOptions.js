import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Modal from '../../components/Modal/Modal';
import CarListItem from './CarListItem';
import CancellationReasonModal from '../../components/Modal/CancellationReasonModal';
import DisabilityDetailsModal from '../../components/Modal/DisabilityDetailsModal';
import { io } from 'socket.io-client';
import { useDriver } from '../../Context/DriverContext'; // Import the custom hook for context
import { useTrip } from '../../Context/TripContext';
import { SourceContext } from '../../Context/SourceContext';
import { DestinationContext } from '../../Context/DestinationContext';
import LoadingModal from '../../components/Modal/LoadingModal'; // Import the LoadingModal component

// Initialize the socket connection to the server
const socket = io('http://localhost:8085');

// Component to display car list options and handle ride requests
const CarListOptions = ({ distance, pickup, dropOff, customerId, customerName, emails }) => {
  // State variables to manage component state
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [carListData, setCarListData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDisabilityModal, setShowDisabilityModal] = useState(false);
  const [disabilityDetailsSubmitted, setDisabilityDetailsSubmitted] = useState(false);
  const [initiatePayment, setInitiatePayment] = useState(false);
  const { tripRequested, initiateTrip, isNight, isBadWeather } = useTrip(); // Get trip data from context
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [isRideAccepted, setIsRideAccepted] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading modal
  // Access the driver position from context
  const { driverPosition } = useDriver();

  useEffect(() => {
    // Ensure that socket listeners are only set once
    socket.on('tripAccepted', () => {
      if (!isRideAccepted) { // Check to avoid duplicated toasts
        toast.success( 'Your ride is being accepted!'); 
        setIsRideAccepted(true); // Update state to reflect acceptance
        setLoading(false);
      }
    });
  
    socket.on('tripCancelled', () => {
      toast.success('Your ride was cancelled!'); // Updated message for cancellation
      setIsRideAccepted(false); // Reset acceptance state if canceled
    });
  
    // Clean up listeners when component unmounts
    return () => {
      socket.off('tripAccepted');
      socket.off('tripCancelled');
    };
  }, [isRideAccepted]); // Dependency array ensures that event listeners are set once and state changes are taken into account
  

  useEffect(() => {
    const fetchCarListData = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/car-listings');
        setCarListData(response.data);
      } catch (error) {
        console.error('Error fetching car list data:', error);
      }
    };

    fetchCarListData();
  }, []);

  // Handle car selection and open the modal
  const handleCarClick = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 5000); // Show loading modal for 3 seconds
  // }, []);
  
  // Handle disability details submission
  const handleDisabilitySubmit = async (disabilityData) => {
    // Show loading modal immediately when the submit button is clicked
    setLoading(true);
    console.log("Loading state set to true");  // Check if this is logged
  
    try {
      // API request to submit the disability details
      await axios.post('http://localhost:8085/api/disability', {
        customerId,
        have_disability: disabilityData.hasDisability,
        disability_type: disabilityData.disabilityType,
        additional_details: disabilityData.disabilityDetails
      });
  
      setDisabilityDetailsSubmitted(true);
      toast.success('Submitted successfully!');
  
      // Start the trip after disability details submission
      initiateTrip({
        customerId,
        selectedCar,
        distance,
        pickup,
        dropOff,
        customerName,
        amount: calculateAmount(selectedCar),
      });
  
      // Delay closing the disability modal for 2 seconds and set payment initiation flag
      setTimeout(() => {
        setShowDisabilityModal(false);
        setInitiatePayment(true);
      }, 2000);
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Failed to save information.');
    } 
    //finally {
  //     // Ensure loading state is turned off once the operation completes (either success or error)
  //     setLoading(false);
  //   }
   };
  

  // Function to calculate the amount based on the selected car and conditions
  const calculateAmount = (car) => {
    if (!car) return 0;

    let amount = car.costPerKm * distance;

    // Adjust amount based on conditions
    if (isNight) {
      amount *= 1.3; // Increase by 30% for nighttime rides
    }
    if (isBadWeather) {
      amount *= 1.5; // Increase by 50% for bad weather conditions
    }

    return amount;
  };
  // Function to make a payment request and create a trip
  const makePaymentRequest = async () => {
    if (!selectedCar || !pickup || !dropOff || !customerId || !customerName || !distance) {
      console.error('Missing required data for trip request');
      return;
    }
    if (!isRideAccepted) {
      toast.error('The driver has not accepted the ride yet.');
      return;
    }
    const currentDate = new Date().toISOString();
    const amount = selectedCar.costPerKm * distance;
    const email = emails; // Ensure `emails` is a valid email string
    console.log('carrr2222----------amount', amount);

    const requestData = {
      customerId,
      driverId: selectedCar.driverId,
      requestDate: currentDate,
      currentDate,
      pickUpLocation: pickup.label,
      dropOffLocation: dropOff.label,
      statuses: 'pending',
      rating: null,
      feedback: null,
      duration_minutes: null,
      vehicle_type: selectedCar.type || selectedCar.name,
      distance_traveled: distance,
      payment_status: 'pending',
      cancellation_reason: null,
      cancel_by: null,
      pickupTime: null,
      dropOffTime: null,
      // Add the coordinates (lat, lng) for both pickup and dropoff locations
      pickUpCoordinates: { lat: pickup.lat, lng: pickup.lng },  // Pickup coordinates
      dropOffCoordinates: { lat: dropOff.lat, lng: dropOff.lng }  // Dropoff coordinates
    };

    console.log('Trip Request Data:', requestData);

    try {
      setShowDisabilityModal(true);

      const tripResponse = await axios.post('http://localhost:8085/api/trips', requestData);
      const tripId = tripResponse.data.tripId;
      if (!tripId) {
        console.error('Trip ID not returned from the server');
        return;
      }

      setSelectedCar(prevCar => ({ ...prevCar, tripId }));

      // Log the data being sent for payment initialization
      const paymentData = {
        amount,
        email,
        tripId
      };
      console.log('Payment Request Data:', paymentData);

      const paymentResponse = await axios.post('http://localhost:8085/api/paystack/initialize', paymentData);

      if (paymentResponse.data.status) {
        window.location.href = paymentResponse.data.data.authorization_url;
      } else {
        console.error('Payment initialization failed:', paymentResponse.data.message);
        toast.error('Payment initialization failed.');
      }
    } catch (error) {
      console.error('Payment request failed:', error);
      toast.error('Payment request failed.');
    }
  };



  // Use effect to handle payment initiation
  useEffect(() => {
    if (initiatePayment) {
      makePaymentRequest();
      setInitiatePayment(false); // Reset the flag after initiating payment
    }
  }, [initiatePayment]);

  // Fetch the latest trip ID for the customer
  const fetchLatestTripId = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/api/trips/latest/${customerId}`);
      if (response.data && response.data.id) {
        return response.data.id;
      } else {
        console.error('No trip ID found in response:', response.data);
        return null;
      }
    } catch (error) {
      console.error('Error fetching latest trip ID:', error);
      return null;
    }
  };

  // Cancel the trip request
  const cancelTripRequest = async (reason) => {
    if (!customerId || !reason) {
      console.error('Missing required data for trip cancellation');
      return;
    }

    const id = await fetchLatestTripId();
    if (!id) {
      console.error('No latest trip ID found for cancellation');
      return;
    }

    const currentDate = new Date().toISOString();
    const cancelData = {
      customerId,
      currentDate,
      statuses: 'cancelled',
      cancellation_reason: reason,
      cancel_by: customerName,
      distance_travelled: distance
    };

    try {
      const response = await axios.patch(`http://localhost:8085/api/trips/${id}`, cancelData);
      if (response.data.status === 'cancelled') {
        toast.success('Trip cancelled successfully.');
        setShowCancelModal(false);
        setSelectedCar(null);
      }

    } catch (error) {
      console.error('Error cancelling trip:', error);
      toast.error('Failed to cancel the trip.');
    }
  };

  // Render the component
  return (
    <div className='mt-5 overflow-auto h-250'>
      <Toaster />
      <h2 className='text-lg md:text-xl font-bold mb-3'>Options</h2>
      {carListData.map((car, index) => {
        const amount = car.costPerKm * distance;// Calculate amount here

        return (
          <div
            key={index}
            className={`cursor-pointer p-2 px-4 rounded-md border ${activeIndex === index ? 'border-4' : ''}`}
            onClick={() => {
              setActiveIndex(index);
              handleCarClick(car);
            }}
          >
            <CarListItem car={car} amount={amount} distance={distance} driverPosition={driverPosition} pickup={pickup} onClick={handleCarClick} />
          </div>
        );
      })}
      {selectedCar && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          data={selectedCar}
        />
      )}
      {selectedCar?.name && (
        <div className="fixed bottom-5 left-0 right-0 bg-white p-3 shadow-xl rounded-lg border border-gray-300 items-center flex flex-col md:flex-row justify-center">
          <h2 className="text-sm md:text-base mb-2 md:mb-0 md:mr-3">Make Payment For {selectedCar.name}</h2>
          <div className="flex space-x-3">
            <button
              className="btn btn-primary rounded-lg text-white text-center px-4 md:px-5 mt-2 md:mt-0"
              onClick={() => {
                setShowDisabilityModal(true);
              }}
              disabled={tripRequested}
            >
              {tripRequested ? 'Requested' : `Request ${selectedCar.name}`}
            </button>
            {tripRequested && (
              <button className="btn btn-danger rounded-lg text-white text-center px-4 md:px-5 mt-2 md:mt-0" style={{ width: '120px' }} onClick={() => setShowCancelModal(true)}>
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
      {showDisabilityModal && (
        <DisabilityDetailsModal
          isOpen={showDisabilityModal}
          onClose={() => setShowDisabilityModal(false)}
          onSubmit={handleDisabilitySubmit}
        />

      )}
      <LoadingModal isOpen={loading} /> {/* Show loading modal when loading state is true */}

      {showCancelModal && (
        <CancellationReasonModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          onCancel={cancelTripRequest}
        />
      )}
    </div>
  );
};

export default CarListOptions;
