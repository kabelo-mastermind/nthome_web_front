import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
    return (
        <div className="container py-5">
            <div className="text-center">
                <h2 className="mb-4">Thank You!</h2>
                <p>Thank you for getting in touch with us! <br/>Your message has been received, and our support team will be in contact with you soon. </p>
                <Link to="/contact" className="btn btn-primary mt-3">Back to Nthome</Link>
            </div>
        </div>
    );
};

export default ThankYouPage;
