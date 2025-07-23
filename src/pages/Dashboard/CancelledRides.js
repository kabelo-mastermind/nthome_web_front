import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminApp.css';
import AdminApp from './AdminApp';

const CancelledRides = () => {
    // State to store the list of rides and the search term for filtering
    const [rides, setRides] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch cancelled rides data from the API when the component mounts
    useEffect(() => {
        axios.get('http://localhost:8085/trips')
            .then(response => {
                setRides(response.data); // Update state with the fetched rides
            })
            .catch(error => {
                console.error('Error fetching cancelled rides:', error); // Log any errors that occur
            });
    }, []);

    // Filter rides based on the search term
    const filteredRides = rides.filter(ride =>
        (ride.rideType && ride.rideType.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ride.customerName && ride.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ride.driverName && ride.driverName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ride.pickUpLocation && ride.pickUpLocation.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ride.dropOffLocation && ride.dropOffLocation.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ride.vehicle_type && ride.vehicle_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ride.statuses && ride.statuses.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Further filter to only include cancelled rides
    const CancelledRides = filteredRides.filter(ride => ride.statuses === 'cancelled');

    return (
        <AdminApp>
            <div className="container py-4 mb-5 mt-4">
                <h2 className="mb-4 text-dark">Cancelled Rides</h2>
                <div className="d-flex justify-content-between mb-3">
                    {/* Link to navigate back to the admin app */}
                    <div><Link to="/adminapp" className="btn btn-outline-primary">Back</Link></div>
                    {/* Search input for filtering the cancelled rides */}
                    <div className="input-group" style={{ maxWidth: '250px' }}>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state on input change
                        />
                        <button className="btn btn-outline-primary" type="button">Search</button>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead className="bg-dark">
                            <tr>
                                <th className='text-white'>#</th>
                                {/* <th className='text-white'>Ride Type</th> */}
                                <th className='text-white'>Rider Name</th>
                                <th className='text-white'>Driver Name</th>
                                <th className='text-white'>Pick Date Time</th>
                                <th className='text-white'>Trip End Time</th>
                                <th className='text-white'>Pick Address</th>
                                <th className='text-white'>Drop Address</th>
                                <th className='text-white'>Vehicle Type</th>
                                <th className='text-white'>Reason</th>
                                <th className='text-white'>Cancel By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Render the list of cancelled rides */}
                            {CancelledRides.map(ride => (
                                <tr key={ride.id}>
                                    <td>{ride.id}</td>
                                    {/* <td>{ride.rideType}</td> */}
                                    <td>{ride.customerName}</td>
                                    <td>{ride.driverName}</td>
                                    <td>{ride.requestDate}</td>
                                    <td>{ride.dropOffTime}</td>
                                    <td>{ride.pickUpLocation}</td>
                                    <td>{ride.dropOffLocation}</td>
                                    <td>{ride.vehicle_type}</td>
                                    <td>{ride.cancellation_reason}</td>
                                    <td>{ride.cancel_by}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminApp>
    );
};

export default CancelledRides;
