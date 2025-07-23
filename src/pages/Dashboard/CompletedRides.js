import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminApp.css';
import AdminApp from './AdminApp';

const CompletedRides = () => {
    const [rides, setRides] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch completed rides data from the backend
        axios.get('http://localhost:8085/trips')
            .then(response => {
                setRides(response.data);
            })
            .catch(error => {
                console.error('Error fetching completed rides:', error);
            });
    }, []);

    const filteredRides = rides.filter(ride =>
        (ride.rideType && ride.rideType.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ride.customerName && ride.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ride.driverName && ride.driverName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ride.pickUpLocation && ride.pickUpLocation.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ride.dropOffLocation && ride.dropOffLocation.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ride.vehicle_type && ride.vehicle_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ride.statuses && ride.statuses.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const completedRides = filteredRides.filter(ride => ride.statuses === 'completed');

    return (
        <AdminApp>
        <div className="container py-4 mb-5 mt-4">
            <h2 className="mb-4 text-dark">Completed Rides</h2>
            <div className="d-flex justify-content-between mb-3">
                <div><Link to="/adminapp" className="btn btn-outline-primary">Back</Link></div>
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

            <div className="table-responsive">
                <table className="table table-striped">
                <thead className="bg-dark ">
                        <tr>
                            <th className='text-white'>#</th>
                            <th className='text-white'>Ride Type</th>
                            <th className='text-white'>Rider Name</th>
                            <th className='text-white'>Driver Name</th>
                            <th className='text-white'>Pick Date Time</th>
                            <th className='text-white'>Trip End Time</th>
                            <th className='text-white'>Pick / Drop Address</th>
                            <th className='text-white'>Vehicle Type</th>
                            <th className='text-white'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completedRides.map(ride => (
                            <tr key={ride.id}>
                                <td>{ride.id}</td>
                                <td>{ride.rideType}</td>
                                <td>{ride.customerName}</td>
                                <td>{ride.driverName}</td>
                                <td>{ride.requestDate}</td>
                                <td>{ride.dropOffTime}</td>
                                <td>{`${ride.pickUpLocation} - ${ride.dropOffLocation}`}</td>
                                <td>{ride.vehicle_type}</td>
                                <td>
                                    <p className={`btn btn-${ride.statuses === 'Completed' ? 'success' : ride.statuses === 'Cancelled' ? 'danger' : 'primary'}`}>
                                        {ride.statuses}
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

export default CompletedRides;
