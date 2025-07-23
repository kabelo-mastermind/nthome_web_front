import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccessful = () => {
    const [searchParams] = useSearchParams();
    const reference = searchParams.get('reference');
    const tripId = sessionStorage.getItem('tripId');
    const navigate = useNavigate();

    const handleUpdateAndRedirect = async () => {
        if (tripId && reference) {
            try {
                const response = await axios.post('http://localhost:8085/api/payment-success', {
                    tripId,
                    reference
                });
                console.log("Update response:", response.data);
                // Navigate to /search after updating
                navigate('/search');
            } catch (error) {
                console.error("Error updating payment status:", error);
            }
        }
    };

    return (
        <div className="container py-5">
            <div className="text-center">
                <h2 className="mb-4">Thank You!</h2>
                <p>Thank you for getting in touch with us! <br/>Your message has been received, and our support team will be in contact with you soon.</p>
                <button onClick={handleUpdateAndRedirect} className="btn btn-primary mt-3">
                    Back to Nthome
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccessful;
