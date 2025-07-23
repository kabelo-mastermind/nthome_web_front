import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminApp.css';

const PendingRides = () => {
    const [rides, setRides] = useState([
        {
            rideId: 1,
            rideType: 'Standard',
            riderName: 'John Doe',
            driverName: 'Jane Smith',
            pickDateTime: '2024-06-01 08:00 AM',
            tripEndTime: '2024-06-01 08:30 AM',
            address: '123 Main St, Cityville - 123 Main St, Cityville',
            vehicleType: 'Sedan',
            status: 'Pending'
        },
        {
            rideId: 2,
            rideType: 'Standard',
            riderName: 'John Doe',
            driverName: 'Jane Smith',
            pickDateTime: '2024-06-01 08:00 AM',
            tripEndTime: '2024-06-01 08:30 AM',
            address: '123 Main St, Cityville - Pretoria',
            vehicleType: 'Sedan',
            status: 'Pending'
        },
        {
            rideId: 3,
            rideType: 'Standard',
            riderName: 'John Doe',
            driverName: 'Jane Smith',
            pickDateTime: '2024-06-01 08:00 AM',
            tripEndTime: '2024-06-01 08:30 AM',
            address: '123 Main St, Cityville - Block H Soshanguve',
            vehicleType: 'Sedan',
            status: 'Pending'
        },
        {
            rideId: 4,
            rideType: 'Standard',
            riderName: 'John Doe',
            driverName: 'Jane Smith',
            pickDateTime: '2024-06-01 08:00 AM',
            tripEndTime: '2024-06-01 08:30 AM',
            address: '123 Main St, Cityville - 123 Main St, New York',
            vehicleType: 'Sedan',
            status: 'Pending'
        },
        // Add more ride objects as needed
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredRides = rides.filter(ride =>
        ride.rideType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.riderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container py-5 mb-5 mt-5">
            <h2 className="mb-4 text-dark">Pending Rides</h2>
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
                    <thead>
                        <tr>
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
                        {filteredRides.map(ride => (
                            <tr key={ride.rideId}>
                                <td>{ride.rideId}</td>
                                <td>{ride.rideType}</td>
                                <td>{ride.riderName}</td>
                                <td>{ride.driverName}</td>
                                <td>{ride.pickDateTime}</td>
                                <td>{ride.tripEndTime}</td>
                                <td>{ride.address}</td>
                                <td>{ride.vehicleType}</td>
                                <td>
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
    );
};

export default PendingRides;
