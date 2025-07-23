// ForgotPasswordForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8085/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error sending reset email:', error);
      setMessage('Failed to send reset email. Please try again later.');
    }
  };

  return (
    <div className="container py-5 mt-5 mb-5">
      <div className="py-5 px-4 rounded-lg shadow-lg bg-white">
        <form onSubmit={handleReset} className="py-5 px-4 mt-0 rounded-lg shadow-lg bg-white">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">OTP</label>
            <input
              type="text"
              id="OTP"
              name="OTP"
              placeholder="Enter your OTP"
              className="border border-gray-300 form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {message && <p className="text-sm text-gray-700">{message}</p>}
          <button type="submit" className="btn btn-primary btn-lg btn-block rounded-pill">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;