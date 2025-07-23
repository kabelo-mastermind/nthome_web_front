import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminApp from './AdminApp';

const Subscribers = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch subscriptions data from your API
        axios.get('http://localhost:8085/api/subscriptions')
            .then(response => {
                setSubscriptions(response.data); // Set state with fetched data
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching subscriptions');
                setLoading(false);
            });
    }, []);

    // Inline styles for table headings
    const headerStyle = {
        color: 'white'
    };

    return (
        <AdminApp>
            <div className="container py-4 mb-5 mt-4">
                <h1 className='text-dark'>Subscriptions</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : (
                    <table className="table mt-4">
                        <thead className='bg-dark'>
                            <tr>
                                <th style={headerStyle}>#</th>
                                <th style={headerStyle}>Status</th>
                                <th style={headerStyle}>Plan Name</th>
                                <th style={headerStyle}>Amount (ZAR)</th>
                                <th style={headerStyle}>Created Date</th>
                                <th style={headerStyle}>User Email</th>
                                <th style={headerStyle}>Subscription ID</th>
                                <th style={headerStyle}>Verification ID</th>
                                <th style={headerStyle}>Customer Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptions.length > 0 ? (
                                subscriptions.map((subscription, index) => (
                                    <tr key={subscription.id}>
                                        <td>{index + 1}</td>
                                        <td>{subscription.statuses === 1 ? 'Paid' : 'Not Paid'}</td>
                                        <td>{subscription.plan_name}</td>
                                        <td>{subscription.amount}</td>
                                        <td>{new Date(subscription.created_at).toLocaleDateString()}</td>
                                        <td>{subscription.user_email}</td>
                                        <td>{subscription.paystack_subscription_id}</td>
                                        <td>{subscription.verification_id}</td>
                                        <td>{subscription.customer_code}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">No subscriptions found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </AdminApp>
    );
};

export default Subscribers;
