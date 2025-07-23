import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    return (
        <div className="container py-5">
            <div className="text-center">
                <h2 className="mb-4">Thank You!</h2>
                <p>Thank you for subscribing to Nthome Ridez e-Hailing services!. </p>
                <Link to="/search" className="btn btn-primary mt-3">Click here to start driving</Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
