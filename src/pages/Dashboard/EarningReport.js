import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminApp.css';
import AdminApp from './AdminApp';

const Earning = () => {
    const [rides, setRides] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch rides data from the backend API
        axios.get('http://localhost:8085/earnings') // Replace with your API endpoint
            .then(response => {
                setRides(response.data);
                setError(null); // Reset error state
            })
            .catch(error => {
                console.error('Error fetching rides:', error);
                setError('Failed to fetch rides');
            });
    }, []);

    const filteredRides = rides.filter(ride =>
        ride.rideType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.riderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.rideDate.includes(searchTerm) ||
        ride.paymentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(ride.totalAmount).includes(searchTerm)
    );

    const totalRides = filteredRides.length;
    const totalEarnings = filteredRides.reduce((sum, ride) => sum + ride.totalAmount, 0);

    return (
        <AdminApp>
        <div className="container py-4 mb-5 mt-4">
            <h2 className="mb-4 text-dark">Earnings</h2>
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

            {error && <p className="text-danger">{error}</p>}

            <div className="table-responsive">
                <table className="table table-striped">
                    <thead className='bg-dark'>
                        <tr>
                            <th className='text-white'>Ride Id</th>
                            <th className='text-white'>Driver Name</th>
                            <th className='text-white'>Rider Name</th>
                            <th className='text-white'>Ride Type</th>
                            <th className='text-white'>Ride Date</th>
                            <th className='text-white'>Total Ride (Minutes)</th>
                            <th className='text-white'>Payment Method</th>
                            <th className='text-white'>Total Amount (R)</th>
                            <th className='text-white'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRides.map(ride => (
                            <tr key={ride.rideId}>
                                <td>{ride.rideId}</td>
                                <td>{ride.driverName}</td>
                                <td>{ride.riderName}</td>
                                <td>{ride.rideType}</td>
                                <td>{ride.rideDate}</td>
                                <td>{ride.totalRide}</td>
                                <td>{ride.paymentType}</td>
                                <td>{ride.totalAmount.toFixed(2)}</td>
                                <td>
                                    <Link to={`/driverEarnings/${ride.driver_id}`} className="btn btn-primary">
                                        {/* <button className="btn btn-primary">View</button> */}
                                        View
                                    </Link>
                                    {/* <Link to={`/rideHistory/${customer.id}`} className="btn btn-info me-2">Ride History</Link> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredRides.length === 0 && <p className="text-center mt-3">No rides found</p>}
            </div>

            <div className="mt-3">
                <h4>Total Rides: {totalRides}</h4>
                <h4>Total Earnings: R{totalEarnings.toFixed(2)}</h4>
            </div>
        </div>
        </AdminApp>
    );
};

export default Earning;
