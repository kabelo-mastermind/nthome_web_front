import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaClock, FaRoad, FaCalendarAlt, FaHourglassHalf, FaCheckCircle } from 'react-icons/fa'; // Importing relevant icons
import './CustomerTripHistory.css'; // Import your CSS file for custom styles
import { assets } from '../../assets/assets';

const CustomerTripHistory = ({ userId }) => {
    axios.defaults.withCredentials = true;

    const [allTrips, setAllTrips] = useState([]);
    const [onGoingTrips, setOnGoingTrips] = useState([]);
    const [completedTrips, setCompletedTrips] = useState([]);
    const [error, setError] = useState(null);
    const [expandedTripIndex, setExpandedTripIndex] = useState(null); // Track the expanded trip

    useEffect(() => {
        axios.get(`http://localhost:8085/customerTripHistory/${userId}`)
          .then(response => {
            if (response.data) {
              setAllTrips(response.data);
              setError(null);

              // Filter trips based on their status
              const ongoing = response.data.filter(trip => trip.statuses === 'on-going');
              const completed = response.data.filter(trip => trip.statuses === 'completed');

              setOnGoingTrips(ongoing);
              setCompletedTrips(completed);
            } else {
              setError('No trips found');
            }
          })
          .catch(error => {
            console.error('Error fetching trips:', error);
            setError('Failed to fetch trips');
          });
      }, [userId]);

    const handleExpandClick = (index) => {
        setExpandedTripIndex(expandedTripIndex === index ? null : index); // Toggle expansion
    };

    return (
        <div className='customer-trip-container py-5 mt-5'>
            <div className="p-4 rounded bg-white">
                <h1 className="customer-trip-heading-large text-dark mb-4">Trip History</h1>

                {/* On-Going Trips Section */}
                {onGoingTrips.length > 0 && (
                    <div>
                        <img src={assets.trips} alt="On-Going Trips" className="customer-trip-section-image" /> {/* Add your image path here */}
                        <h3 className="text-start mb-4">Present</h3>
                        {onGoingTrips.map((trip, index) => (
                            <div
                                key={index}
                                className="customer-trip-card mb-4 p-3 shadow-sm rounded d-flex align-items-center"
                            >
                                <div className="customer-trip-summary mb-3 flex-grow-1">
                                    <div className="d-flex align-items-center mb-2">
                                        <FaHourglassHalf
                                            style={{ color: '#ffc107', marginRight: '8px' }} // Apply color and spacing inline
                                        />
                                        <b className='text-dark'>Status:</b> On-Going
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <FaCalendarAlt
                                            style={{ color: '#007bff', marginRight: '8px' }} // Apply color and spacing inline
                                        />
                                        <b className='text-dark'>Request Date:</b> {new Date(trip.requestDate).toLocaleDateString()}
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <FaMapMarkerAlt
                                            style={{ color: '#28a745', marginRight: '8px' }} // Apply color and spacing inline
                                        />
                                        <b className='text-dark'>Drop-Off Location:</b> {trip.dropOffLocation}
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <FaRoad
                                            style={{ color: '#dc3545', marginRight: '8px' }} // Apply color and spacing inline
                                        />
                                        <b className='text-dark'>Distance Traveled:</b> {trip.distance_traveled} km
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <b className='text-dark'>Amount:</b> {trip.amount} ZAR
                                    </div>
                                </div>
                                <img src={assets.tripmap1} alt="Trip" className="customer-trip-image" /> {/* Add your image path here */}
                            </div>
                        ))}
                    </div>
                )}

                {/* Completed Trips Section */}
                {completedTrips.length > 0 ? (
                    <div>
                        <h3 className="text-start mb-4">Past</h3>
                        {completedTrips.map((trip, index) => (
                            <div
                                key={index}
                                className="customer-trip-card mb-4 p-3 shadow-sm rounded d-flex align-items-center"
                                onClick={() => handleExpandClick(index)}
                            >
                                <div className="customer-trip-summary mb-3 flex-grow-1">
                                    <div className="d-flex align-items-center mb-2">
                                        <FaCheckCircle
                                            style={{ color: '#28a745', marginRight: '8px' }} // Apply color and spacing inline
                                        />
                                        <b className='text-dark'>Status:</b> Completed
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <FaCalendarAlt
                                            style={{ color: '#007bff', marginRight: '8px' }} // Apply color and spacing inline
                                        />
                                        <b className='text-dark'>Request Date:</b> {new Date(trip.requestDate).toLocaleDateString()}
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <FaMapMarkerAlt
                                            style={{ color: '#28a745', marginRight: '8px' }} // Apply color and spacing inline
                                        />
                                        <b className='text-dark'>Drop-Off Location:</b> {trip.dropOffLocation}
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <FaRoad
                                            style={{ color: '#dc3545', marginRight: '8px' }} // Apply color and spacing inline
                                        />
                                        <b className='text-dark'>Distance Traveled:</b> {trip.distance_traveled} km
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <b className='text-dark'>Amount:</b> {trip.amount} ZAR
                                    </div>
                                </div>
                                <img src={assets.tripmap2} alt="Trip" className="customer-trip-image" /> {/* Add your image path here */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No completed trips found.</p>
                )}
            </div>
        </div>
    );
};

export default CustomerTripHistory;
