import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordForm1 = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1); // State to manage steps (1: email, 2: OTP, 3: new password)

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8085/forgot-password', { email });
      setMessage(response.data.message);
      if (response.status === 200) {
        setStep(2); // Move to OTP step after email is sent successfully
      }
    } catch (error) {
      console.error('Error sending reset email:', error);
      setMessage('Failed to send reset email. Please try again later.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8085/verify-otp', { email, otp });
      if (response.status === 200 && response.data.message === 'OTP verified successfully') {
        setMessage('OTP verified successfully.');
        setStep(3); // Move to new password step after OTP is verified successfully
      } else {
        setMessage('Failed to verify OTP. Please enter the correct OTP.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('Failed to verify OTP. Please try again.');
    }
  };

  const handleSetNewPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match. Please re-enter.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8085/reset-password', {
        email,
        newPassword,
      });
      setMessage(response.data.message);
      if (response.status === 200) {
        console.log('Password reset successful.');
        // Optionally, redirect to login page or display success message
      }
    } catch (error) {
      console.error('Error setting new password:', error);
      setMessage('Failed to set new password. Please try again.');
    }
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="border border-gray-300 form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {message && <p className="text-sm text-gray-700">{message}</p>}
            <button
              type="submit"
              onClick={handleReset}
              className="btn btn-primary btn-lg btn-block rounded-pill"
            >
              Reset Password
            </button>
          </>
        );
      case 2:
        return (
          <>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-gray-700 text-sm font-semibold mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter OTP"
                className="border border-gray-300 form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            {message && <p className="text-sm text-gray-700">{message}</p>}
            <button
              type="submit"
              onClick={handleVerifyOtp}
              className="btn btn-primary btn-lg btn-block rounded-pill"
            >
              Verify OTP
            </button>
          </>
        );
      case 3:
        return (
          <>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700 text-sm font-semibold mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter new password"
                className="border border-gray-300 form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm new password"
                className="border border-gray-300 form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {message && <p className="text-sm text-gray-700">{message}</p>}
            <button
              type="submit"
              onClick={handleSetNewPassword}
              className="btn btn-primary btn-lg btn-block rounded-pill"
            >
              Set New Password
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container py-5 mt-5 mb-5">
      <div className="py-5 px-4 rounded-lg shadow-lg bg-white">
        <form className="py-5 px-4 mt-0 rounded-lg shadow-lg bg-white">{renderForm()}</form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm1;
