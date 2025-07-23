import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminApp from './AdminApp';

const ViewDriver = () => {
  axios.defaults.withCredentials = true;

  const [rides, setRides] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // Fetch ride history from the backend API
    axios.get(`http://localhost:8085/driverHistory/${id}`)
      .then(response => {
        setRides(response.data);
        setError(null); // Reset error state
      })
      .catch(error => {
        console.error('Error fetching driver data:', error);
        setError('Failed to fetch driver data');
      });
  }, [id]); // Dependency array with id to fetch data when the component mounts

  const handleDetailsClick = (rideId) => {
    setShowDetails((prev) => (prev === rideId ? null : rideId));
  };

  // Function to format date in a user-friendly format
  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateTimeString).toLocaleString('en-US', options);
  };

  // Compute ride analytics
  const rideAnalytics = {
    volume: rides.length,
    avgDuration: rides.reduce((acc, ride) => acc + ride.duration_minutes, 0) / rides.length,
    peakHours: '10:00 AM - 12:00 PM' // Assuming you calculate this from the data
  };

  return (
    <AdminApp>
    <div className='container py- mt-5 mb-'>

      <div className="d-flex justify-content-between mb-3">
        <div><Link to="/driver" className="btn btn-outline-primary">Back</Link></div>
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
                <h2 className="text-center mb-4 text-dark">Trip History</h2>
                {/* Display trip history */}
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="bg-dark text-white">
                      <tr>
                        <th className="text-white">Driver</th>
                        {/* <th className="text-white">Customer</th> */}
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
                      {rides.map(ride => (
                        <React.Fragment key={ride.id}>
                          <tr>
                            <td>{ride.driverName}</td>
                            {/* <td>{ride.customerId}</td> */}
                            <td>{ride.pickUpLocation}</td>
                            <td>{ride.dropOffLocation}</td>
                            <td>{ride.statuses}</td>
                            <td>{ride.vehicle_type}</td>
                            <td>{ride.distance_traveled}</td>
                            <td>{ride.duration_minutes} minutes</td>
                            <td>{ride.payment_status}</td>
                            <td>
                              <button className="btn btn-dark" onClick={() => handleDetailsClick(ride.id)}>
                                {showDetails === ride.id ? 'Hide Details' : 'Show Details'}
                              </button>
                            </td>
                          </tr>
                          {showDetails === ride.id && (
                            <tr>
                              <td colSpan="10">
                                <div className="bg-light p-3 border rounded">
                                  <h4>Trip Details</h4>
                                  <p><strong>Driver:</strong> {ride.driverName}</p>
                                  <p><strong>Customer:</strong> {ride.customerName}</p>
                                  <p><strong>Pickup Location:</strong> {ride.pickUpLocation}</p>
                                  <p><strong>Drop-off Location:</strong> {ride.dropOffLocation}</p>
                                  <p><strong>Status:</strong> {ride.statuses}</p>
                                  <p><strong>Pickup Time:</strong> {ride.pickupTime}</p>
                                  <p><strong>Drop-off Time:</strong> {ride.dropOffTime}</p>
                                  <p><strong>Date:</strong> {formatDateTime(ride.requestDate)}</p>
                                  <p><strong>Rating:</strong> {ride.rating}</p>
                                  <p><strong>Feedback:</strong> {ride.feedback}</p>
                                  <p><strong>Cancellation Reason:</strong> {ride.cancellation_reason}</p>
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
          {/* <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="bg-white shadow rounded p-4">
                <h2 className="text-center mb-4 text-dark">Trip Analytics</h2>
                
                <p><strong>Trip volume:</strong> {rideAnalytics.volume}</p>
                <p><strong>Average trip duration:</strong> {rideAnalytics.avgDuration} minutes</p>
                <p><strong>Peak hours:</strong> {rideAnalytics.peakHours}</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
    </AdminApp>
  );
};

export default ViewDriver;
