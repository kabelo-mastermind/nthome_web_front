import React, { useState, useEffect, useContext } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import './CustomerDetails.css';
import { FaStar, FaStarHalfAlt, FaRegStar, FaPhoneAlt, FaMapMarkerAlt, FaRoute, FaUser, FaClock } from 'react-icons/fa';
import { SourceContext } from '../../Context/SourceContext';
import { DestinationContext } from '../../Context/DestinationContext';
import UpdatePayment from '../Modal/UpdatePayment';
import CancellationReasonModal from '../../components/Modal/CancellationReasonModal';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

const socket = io.connect('http://localhost:8085');

const CustomerDetails = ({ driverId, driverName }) => {
  const [customersData, setCustomersData] = useState([]);
  const [expandedTripId, setExpandedTripId] = useState(null);
  const [driverPosition, setDriverPosition] = useState(null);
  const [acceptedTrips, setAcceptedTrips] = useState([]);
  const { setSource } = useContext(SourceContext);
  const { setDestination } = useContext(DestinationContext);
  const [showUpdatePaymentModal, setShowUpdatePaymentModal] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [declinedTrips, setDeclinedTrips] = useState({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [reason, setReason] = useState('');



  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setDriverPosition({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        console.error('Error getting driver position:', error);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/user-trip-details-pending?driverId=${driverId}`);

        const sortedTrips = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const latestTrips = sortedTrips.slice(0, 5);

        setCustomersData(latestTrips);

        const ongoingTrips = latestTrips.filter((trip) => trip.statuses === 'on-going');
        setAcceptedTrips(ongoingTrips.map((trip) => trip.trip_id));

        if (latestTrips.length > 0) {
          setExpandedTripId(latestTrips[0].trip_id); // Automatically expand the latest trip
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [driverId]);

  const toggleDetails = (tripId) => {
    if (expandedTripId === tripId) {
      setExpandedTripId(null);
    } else {
      setExpandedTripId(tripId);
    }
  };

  const haversineDistance = (coords1, coords2) => {
    const toRad = (x) => x * Math.PI / 180;

    const lat1 = coords1.lat;
    const lon1 = coords1.lon;

    const lat2 = coords2.lat;
    const lon2 = coords2.lon;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  const calculateDistanceToPickUp = (pickUpCoordinates) => {
    if (driverPosition && pickUpCoordinates) {
      return haversineDistance(driverPosition, pickUpCoordinates).toFixed(2);
    }
    return 'N/A';
  };

  const calculateArrivalTime = (distance) => {
    if (distance !== 'N/A') {
      const speed = 120; // Average speed in km/h
      const timeInHours = distance / speed;
      const timeInMinutes = timeInHours * 60;

      if (timeInMinutes < 60) {
        return `${timeInMinutes.toFixed(0)} min`;
      } else {
        const hours = Math.floor(timeInMinutes / 60);
        const minutes = Math.round(timeInMinutes % 60);
        return `${hours} hr ${minutes} min`;
      }
    }
    return 'N/A';
  };

  const renderStars = (rating) => {
    const starColor = '#FFD700'; // Yellow color

    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {[...Array(fullStars)].map((_, index) => <FaStar key={`full-${index}`} style={{ color: starColor }} />)}
        {halfStar === 1 && <FaStarHalfAlt style={{ color: starColor }} />}
        {[...Array(emptyStars)].map((_, index) => <FaRegStar key={`empty-${index}`} style={{ color: starColor }} />)}
      </>
    );
  };

  useEffect(() => {
    if (expandedTripId !== null && customersData.length > 0) {
      const trip = customersData.find(trip => trip.trip_id === expandedTripId);
      if (trip) {
        const { pickUpCoordinates, dropOffCoordinates } = trip;
        
        setSource(pickUpCoordinates);
        setDestination(dropOffCoordinates);
      }
    }
  }, [expandedTripId, customersData, setSource, setDestination]);

  const handleAccept = async (driverId, tripId) => {
    try {
      const response = await axios.post('http://localhost:8085/api/update-trip-status', { driverId, tripId });
      console.log(response.data.message);
      setAcceptedTrips([...acceptedTrips, tripId]);
      socket.emit('acceptTrip', tripId);
    } catch (error) {
      console.error('Error updating trip status:', error);
    }
  };

  const handleDeclineClick = (trip) => {
    setCurrentTrip(trip);
    setShowCancelModal(true);
  };

  const handleCancel = async (tripId, reason) => {
    if (!currentTrip) return;
  
    const { driverId, distance_traveled } = currentTrip;
    const currentDate = new Date().toISOString();
    const distance = distance_traveled;
  
    const cancelData = {
      driverId: driverId,
      currentDate,
      statuses: 'cancelled',
      cancellation_reason: reason,
      cancel_by: driverName,
      distance_travelled: distance
    };
  
    try {
      const response = await axios.patch(`http://localhost:8085/api/tripsDriver/${tripId}`, cancelData);
      console.log('Trip cancellation sent:', response.data);
  
      setDeclinedTrips(prevState => ({
        ...prevState,
        [tripId]: true
      }));
      setShowCancelModal(false);
      setReason('');
      socket.emit('tripCancelled', { tripId, driverId });
      window.location.reload();
    } catch (error) {
      console.error('Error cancelling trip:', error);
    }
  };

  const handlePaymentClick = (trip) => {
    setCurrentTrip(trip);
    setShowUpdatePaymentModal(true);
  };

  const updatePaymentStatus = async (tripId, status) => {
    try {
      const response = await axios.post('http://localhost:8085/api/update-payment-status', { tripId, payment_status: status ? 'Yes' : 'No' });
      console.log(response.data.message);
      const updatedData = customersData.map(trip =>
        trip.id === tripId ? { ...trip, payment_status: status ? 'Yes' : 'No' } : trip
      );
      setCustomersData(updatedData);
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  return (
    <div className="customer-details-container">
      <h1 className="text-center text-dark mb-3">Trip Requests</h1>
      {customersData.length === 0 ? (
        <div className="text-center mt-5">
          <p className="lead">No trip requests available.</p>
        </div>
      ) : (
        customersData.map((customer) => (
          <div key={customer.trip_id} className="card mb-4 shadow-sm">
            <div
              className={`card-header d-flex justify-content-between align-items-center ${expandedTripId === customer.trip_id ? 'bg-dark text-white' : 'bg-light'}`}
              onClick={() => toggleDetails(customer.trip_id)}
              style={{ cursor: 'pointer' }}
            >
              <h5 className="mb-0"><FaUser className="me-2" />{customer.customer_name} {customer.customer_lastName}</h5>
              <span>{expandedTripId === customer.trip_id ? '-' : '+'}</span>
            </div>
            {expandedTripId === customer.trip_id && (
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
                    <h3 className="text-center mb-3">Customer Details</h3>
                    <div className="mb-3 d-flex justify-content-center align-items-center">
                      <img
                        src={`http://localhost:8085/profile_pictures/${customer?.profile_picture}`}
                        alt="profile-picture"
                        className="img-fluid rounded-circle border border-dark"
                        style={{ width: '145px', height: '140px' }}
                      />
                    </div>
                    <div className="rating mb-2 d-flex align-items-center">
                      {renderStars(customer.driver_ratings)}
                    </div>
                    <div className="mb-2 d-flex align-items-center">
                      <FaPhoneAlt className="me-2 text-primary" /><span>{customer.customer_phoneNumber}</span>
                    </div>
                    <div className="customer-details-price rounded-lg p-2 mb-4 text-center bg-light shadow-sm">
                      <p className="mb-0 mt-2" style={{ fontSize: '1.8rem' }}>  R: {customer.amount ? customer.amount.toFixed(2) : 'N/A'}</p>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
                    <h3 className="mb-3">Trip Details</h3>

                    <div className="customer-info mb-4">
                      <h6 className="mb-2 d-flex align-items-center">To Pick Up</h6>
                      <div className="d-flex gap-2 justify-content-between align-items-center mb-2">
                        <p className="mb-0"><FaMapMarkerAlt className="me-2 text-info" />{calculateDistanceToPickUp(customer.pickUpLocation)} km</p>
                        <p className="rating mb-0"><FaClock className="me-2 text-warning" />{calculateArrivalTime(calculateDistanceToPickUp(customer.pickUpLocation))} away</p>
                      </div>
                      <h6 className="mb-2 d-flex align-items-center"><FaMapMarkerAlt className="me-2 text-success" />From</h6>
                      <p className="customer-location mb-2">{customer.pickUpLocation}</p>
                      <h6 className="mb-2 d-flex align-items-center"><FaMapMarkerAlt className="me-2 text-danger" />To</h6>
                      <p className="customer-location mb-3">{customer.dropOffLocation}</p>

                      <h6 className="mb-2 d-flex align-items-center"><FaRoute className="me-2 text-info" />Trip distance</h6>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <p className="mb-0">{customer.distance_traveled} km</p>
                        <p className="rating mb-0">ETA: {calculateArrivalTime(customer.distance_traveled)}</p>
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <div className="d-flex mb-2">
                        {acceptedTrips.includes(customer.trip_id) ? (
                          <button
                            className="btn btn-primary rounded-pill px-3 me-2"
                            disabled
                          >
                            <span className="small">On-Going</span>
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary rounded-pill px-3 me-2"
                            onClick={() => handleAccept(driverId, customer.trip_id)}
                          >
                            <span className="small">{customer.statuses === 'On-Going' ? 'On-Going' : 'Accept'}</span>
                          </button>
                        )}
                        <button
                          className={`btn ${declinedTrips[customer.trip_id] ? 'btn-secondary' : 'btn-decline'} rounded-pill px-3 me-2`}
                          onClick={() => handleDeclineClick(customer)}
                          disabled={declinedTrips[customer.trip_id]}
                        >
                          <span className="small">{declinedTrips[customer.trip_id] ? 'Declined' : 'Decline'}</span>
                        </button>


                      </div>
                      {acceptedTrips.includes(customer.trip_id) ? (
                        <button
                          className="btn btn-secondary rounded-pill px-3"
                          style={{ marginTop: '10px' }} // Adjust the margin as needed
                          onClick={() => handlePaymentClick(customer)}
                        >
                          <span className="small">Got paid?</span>
                        </button>
                      ) : (    
                        <></>
                      )}
                    </div>
                    {showUpdatePaymentModal && (
                      <UpdatePayment
                        isOpen={showUpdatePaymentModal}
                        onClose={() => setShowUpdatePaymentModal(false)}
                        onConfirm={updatePaymentStatus}
                        trip={currentTrip}
                      />
                    )}

                    {showCancelModal && (
                      <CancellationReasonModal
                        isOpen={showCancelModal}
                        onClose={() => setShowCancelModal(false)}
                        onCancel={(reason) => {
                          if (currentTrip) {
                            handleCancel(currentTrip.trip_id, reason);
                          }
                        }}
                      />
                    )}

                  </div>

                </div>
              </div>
            )}

          </div>
        ))
      )}
    </div>
  );
};

export default CustomerDetails;
