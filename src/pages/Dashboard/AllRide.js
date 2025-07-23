import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminApp.css';
import AdminApp from './AdminApp';

const RideTable = () => {
    // Enable sending cookies with requests to the backend
    axios.defaults.withCredentials = true;

    // State hooks for managing ride data, search term, and error messages
    const [rides, setRides] = useState([]); // State for storing rides data
    const [searchTerm, setSearchTerm] = useState(''); // State for storing the search term
    const [error, setError] = useState(null); // State for storing error messages
  
    useEffect(() => {
        // Fetch ride data from the backend API when the component mounts
        axios.get('http://localhost:8085/rides')
            .then(response => {
                setRides(response.data); // Update state with fetched rides data
                setError(null); // Reset error state
            })
            .catch(error => {
                console.error('Error fetching rides:', error); // Log any errors
                setError('Failed to fetch rides'); // Set error message
            });
    }, []); // Empty dependency array means this effect runs once on mount

    // Filter rides based on the search term
    const filteredRides = rides.filter(ride =>
        ride.rideType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.riderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminApp>
            <div className="container py-5 mb-5 mt-">
                <h2 className="mb-4 text-dark">All Rides</h2>
                <div className="d-flex justify-content-between mb-3">
                    {/* Link to navigate back to the previous page */}
                    <div>
                        <Link to="/adminapp" className="btn btn-outline-primary">Back</Link>
                    </div>
                    
                    {/* Search input for filtering rides */}
                    <div className="input-group" style={{ maxWidth: '250px' }}>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
                        />
                        <button className="btn btn-outline-primary" type="button">Search</button>
                    </div>
                </div>

                {/* Table to display filtered rides */}
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                {/* Table headers */}
                                <th>#</th>
                                <th>Ride Type</th>
                                <th>Rider Name</th>
                                <th>Driver Name</th>
                                <th>Pick Date Time</th>
                                <th>Trip End Time</th>
                                <th>Pick / Drop Address</th>
                                <th>Vehicle Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map over filtered rides to create table rows */}
                            {filteredRides.map(ride => (
                                <tr key={ride.rideId}>
                                    {/* Table cells */}
                                    <td>{ride.rideId}</td>
                                    <td>{ride.rideType}</td>
                                    <td>{ride.riderName}</td>
                                    <td>{ride.driverName}</td>
                                    <td>{ride.pickDateTime}</td>
                                    <td>{ride.tripEndTime}</td>
                                    <td>{ride.address}</td>
                                    <td>{ride.vehicleType}</td>
                                    <td>
                                        {/* Status badge with conditional styling */}
                                        <p className={`btn btn-${ride.status === 'Completed' ? 'success' : ride.status === 'Cancelled' ? 'danger' : 'primary'}`}>
                                            {ride.status}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminApp>
    );
};

export default RideTable;
