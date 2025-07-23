import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminApp from './AdminApp';

const Trip = () => {
  axios.defaults.withCredentials = true;

  const [trips, setTrips] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch all trips from the backend API
    axios.get('http://localhost:8085/trips')
      .then(response => {
        setTrips(response.data);
        setError(null); // Reset error state
      })
      .catch(error => {
        console.error('Error fetching trips:', error);
        setError('Failed to fetch trips');
      });
  }, []);

  // Filter trips into categories
  const ongoingTrips = trips.filter(trip => trip.statuses === 'ongoing');
  const tripHistory = trips.filter(trip => trip.statuses !== 'ongoing');

  // Compute trip analytics
  const tripAnalytics = {
    volume: trips.length,
    avgDuration: trips.reduce((acc, trip) => acc + trip.duration_minutes, 0) / trips.length,
    peakHours: '10:00 AM - 12:00 PM' // Assuming you calculate this from the data
  };

  const handleDetailsClick = (id) => {
    setShowDetails((prev) => (prev === id ? null : id));
  };

  // Function to format date in a user-friendly format
  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateTimeString).toLocaleString('en-US', options);
  };

  // Compute peak hours
  const computePeakHours = () => {
    // Count occurrences of each hour in pickup or drop-off times
    const hourCounts = {};
    trips.forEach(trip => {
      const pickupHour = new Date(trip.pickupTime).getHours();
      const dropOffHour = new Date(trip.dropOffTime).getHours();

      hourCounts[pickupHour] = (hourCounts[pickupHour] || 0) + 1;
      hourCounts[dropOffHour] = (hourCounts[dropOffHour] || 0) + 1;
    });

    // Find the hour(s) with the maximum count
    const maxCount = Math.max(...Object.values(hourCounts));
    const peakHours = Object.keys(hourCounts).filter(hour => hourCounts[hour] === maxCount);

    return peakHours.join(' - ');
  };

  // Function to format the trip duration
  const formatDuration = (durationMinutes) => {
    if (durationMinutes <= 0) return "0 minutes";
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <AdminApp>
      <div className="container py- mb-5 mt-">
        <div className="d-flex justify-content-between mb-3">
          <div><Link to="/adminapp" className="btn btn-outline-primary float-left py- mb-">Back</Link></div>
          <div className="input-group" style={{ maxWidth: '250px' }}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-primary" type="button">Search</button>
          </div>
        </div>
        <div className="container py-5">
          {error && <p className="text-danger">{error}</p>}
          <div className="container">
            <div className="row justify-content-center mb-5">
              <div className="col-md-10">
                <div className="bg-white shadow rounded p-4">
                  <h2 className="text-center mb-4 text-dark">Real-time View of Ongoing Trips</h2>
                  {/* Display ongoing trips */}
                  {ongoingTrips.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead className="bg-dark text-white">
                          <tr>
                            <th className="text-white">Driver</th>
                            <th className="text-white">Customer</th>
                            <th className="text-white">Pickup Location</th>
                            <th className="text-white">Drop-off Location</th>
                            <th className="text-white">Status</th>
                            <th className="text-white">Vehicle Type</th>
                            <th className="text-white">Distance</th>
                            <th className="text-white">Duration</th>
                            <th className="text-white">Payment Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ongoingTrips.map(trip => (
                            <tr key={trip.id}>
                              <td>{trip.driverName}</td>
                              <td>{trip.customerName}</td>
                              <td>{trip.pickUpLocation}</td>
                              <td>{trip.dropOffLocation}</td>
                              <td>{trip.statuses}</td>
                              <td>{trip.vehicle_type}</td>
                              <td>{trip.distance_traveled}</td>
                              <td>{formatDuration(trip.duration_minutes)}</td>
                              <td>{trip.payment_status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-center">No ongoing trips at the moment.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="row justify-content-center mb-5">
              <div className="col-md-10">
                <div className="bg-white shadow rounded p-4">
                  <h2 className="text-center mb-4 text-dark">All Trip History</h2>
                  {/* Display trip history */}
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="bg-dark text-white">
                        <tr>
                          <th className="text-white">Driver</th>
                          <th className="text-white">Customer</th>
                          <th className="text-white">Pickup Location</th>
                          <th className="text-white">Drop-off Location</th>
                          <th className="text-white">Status</th>
                          <th className="text-white">Vehicle Type</th>
                          <th className="text-white">Distance</th>
                          <th className="text-white">Duration</th>
                          <th className="text-white">Payment Status</th>
                          <th className="text-white">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tripHistory.map(trip => (
                          <React.Fragment key={trip.id}>
                            <tr>
                              <td>{trip.driverName}</td>
                              <td>{trip.customerName}</td>
                              <td>{trip.pickUpLocation}</td>
                              <td>{trip.dropOffLocation}</td>
                              <td>{trip.statuses}</td>
                              <td>{trip.vehicle_type}</td>
                              <td>{trip.distance_traveled}</td>
                              <td>{formatDuration(trip.duration_minutes)}</td>
                              <td>{trip.payment_status}</td>
                              <td>
                                <button className="btn btn-dark" onClick={() => handleDetailsClick(trip.id)}>
                                  {showDetails === trip.id ? 'Hide Details' : 'Show Details'}
                                </button>
                              </td>
                            </tr>
                            {showDetails === trip.id && (
                              <tr>
                                <td colSpan="10">
                                  <div className="bg-light p-3 border rounded">
                                    <h4>Trip Details</h4>
                                    <p><strong>Driver:</strong> {trip.driverName}</p>
                                    <p><strong>Customer:</strong> {trip.customerName}</p>
                                    <p><strong>Pickup Location:</strong> {trip.pickUpLocation}</p>
                                    <p><strong>Drop-off Location:</strong> {trip.dropOffLocation}</p>
                                    <p><strong>Status:</strong> {trip.statuses}</p>
                                    <p><strong>Pickup Time:</strong> {trip.pickupTime}</p>
                                    <p><strong>Drop-off Time:</strong> {trip.dropOffTime}</p>
                                    <p><strong>Date:</strong> {formatDateTime(trip.requestDate)}</p>
                                    <p><strong>Rating:</strong> {trip.rating}</p>
                                    <p><strong>Feedback:</strong> {trip.feedback}</p>
                                    <p><strong>Cancellation Reason:</strong> {trip.cancellation_reason}</p>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="bg-white shadow rounded p-4">
                  <h2 className="text-center mb-4 text-dark">Trip Analytics</h2>
                  {/* Display trip analytics */}
                  <p><strong>Trip volume:</strong> {tripAnalytics.volume}</p>
                  <p><strong>Average trip duration:</strong> {tripAnalytics.avgDuration} minutes</p>
                  <p><strong>Peak hours:</strong> {tripAnalytics.peakHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminApp>
  );
};

export default Trip;
