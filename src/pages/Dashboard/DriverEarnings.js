import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './AdminApp.css'; // Import custom styles for the component
import AdminApp from './AdminApp'; // Import the AdminApp component for layout

const DriverEarnings = () => {
    const { id } = useParams(); // Get driver ID from URL parameters
    const [rides, setRides] = useState([]); // State to hold the list of rides
    const [selectedDriver, setSelectedDriver] = useState(''); // State to hold the selected driver's name
    const [error, setError] = useState(null); // State to hold any error messages

    useEffect(() => {
        // Fetch rides data from the backend API using the driver ID from URL parameters
        axios.get(`http://localhost:8085/driverEarnings/${id}`)
            .then(response => {
                // On successful response, update the state with rides data and selected driver name
                setRides(response.data);
                if (response.data.length > 0) {
                    setSelectedDriver(response.data[0].driverName);
                }
                setError(null); // Reset error state on successful fetch
            })
            .catch(error => {
                // Handle errors and set error state
                console.error('Error fetching rides:', error);
                setError('Failed to fetch rides');
            });
    }, [id]); // Dependency array includes `id`, so this effect runs when `id` changes

    const filteredRides = rides; // No filtering applied, all rides are used

    // Calculate total amount and total rides
    const totalAmount = filteredRides.reduce((sum, ride) => sum + ride.totalAmount, 0);
    const totalRides = filteredRides.length;

    return (
        <AdminApp> {/* Wrap component in AdminApp for consistent layout */}
            <div className="container py-5 mb-5 mt-4"> {/* Container for spacing and layout */}
                <h2 className="mb-4 text-dark">Rides for {selectedDriver}</h2> {/* Display the title with selected driver */}
                <div className="d-flex justify-content-between mb-3"> {/* Flex container for alignment */}
                    <div> 
                        <Link to="/earnings" className="btn btn-outline-primary">Back</Link> {/* Back button to navigate to earnings page */}
                    </div>
                </div>

                {error && <p className="text-danger">{error}</p>} {/* Display error messages if any */}

                <div className="table-responsive"> {/* Responsive table container */}
                    <table className="table table-striped"> {/* Table for displaying ride data */}
                        <thead>
                            <tr>
                                {/* Table headers */}
                                <th>Driver Name</th>
                                <th>Customer Name</th>
                                <th>Vehicle Type</th>
                                <th>Trip Date</th>
                                <th>Total Trip (Minutes)</th>
                                <th>Payment Method</th>
                                <th>Amount (R)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map through rides and create table rows */}
                            {filteredRides.map(ride => (
                                <tr key={ride.rideId}>
                                    {/* Table data for each ride */}
                                    <td>{ride.driverName}</td>
                                    <td>{ride.riderName}</td>
                                    <td>{ride.rideType}</td>
                                    <td>{ride.rideDate}</td>
                                    <td>{ride.totalRide}</td>
                                    <td>{ride.paymentType}</td>
                                    <td>{ride.totalAmount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-3"> {/* Container for summary */}
                    <h4>Total Rides: {totalRides}</h4> {/* Display total number of rides */}
                    <h4>Total Amount: R{totalAmount.toFixed(2)}</h4> {/* Display total amount with fixed decimal places */}
                </div>
            </div>
        </AdminApp>
    );
};

export default DriverEarnings;
