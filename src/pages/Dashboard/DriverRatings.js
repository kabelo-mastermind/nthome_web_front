import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import AdminApp from './AdminApp';

const RidesRatings = () => {
    const [ratings, setRatings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8085/user-trip-ratings-driver')
            .then(response => {
                const data = response.data.map((trip, index) => ({
                    no: index + 1,
                    rideId: trip.trip_id || '',
                    driverName: trip.driver_name ? `${trip.driver_name} ${trip.driver_lastName || ''}` : 'Unknown Driver',
                    riderName: trip.customer_name ? `${trip.customer_name} ${trip.customer_lastName || ''}` : 'Unknown Rider',
                    ratingDateTime: trip.currentDate ? new Date(trip.currentDate).toLocaleString() : '',
                    comments: trip.driver_feedback || '',
                    rating: trip.driver_ratings ?? 0,
                }));
                setRatings(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleDelete = (no) => {
        setRatings(ratings.filter(rating => rating.no !== no));
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {[...Array(fullStars)].map((_, index) => <BsStarFill key={`full-${index}`} className="text-warning" />)}
                {halfStar && <BsStarHalf className="text-warning" />}
                {[...Array(emptyStars)].map((_, index) => <BsStar key={`empty-${index}`} className="text-warning" />)}
            </>
        );
    };

    const filteredRatings = ratings.filter(rating => 
        rating.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rating.riderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rating.comments.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminApp>
        <div className="container py-5 mb-5 mt-5">
            <h2 className="mb-4 text-dark">Driver Ratings</h2>
            <div className="d-flex justify-content-between mb-3">
                <div><Link to="/adminapp" className="btn btn-outline-primary float-left">Back</Link></div>
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
            <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Ride ID</th>
                        <th>Driver Name (From)</th>
                        <th>Rider Name (To)</th>
                        <th>Rating</th>
                        <th>Rating Date & Time</th>
                        <th>Comments</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRatings.map(rating => (
                        <tr key={rating.no}>
                            <td>{rating.no}</td>
                            <td>{rating.rideId}</td>
                            <td>{rating.driverName}</td>
                            <td>{rating.riderName}</td>
                            <td>
                                {renderStars(rating.rating)} ({rating.rating}/5)
                            </td>
                            <td>{rating.ratingDateTime}</td>
                            <td>{rating.comments}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(rating.no)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </AdminApp>
    );
};

export default RidesRatings;
