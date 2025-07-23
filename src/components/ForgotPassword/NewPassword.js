import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newOtp, setNewOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [step, setStep] = useState(1); // State to manage steps (1: email, 2: OTP, 3: new OTP, 4: new password)

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8085/forgot-password', { email });
      setMessage(response.data.message);

      if (response.data.success) {
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
      setMessage(response.data.message);

      if (response.data.success) {
        setStep(3); // Move to new OTP step after OTP is verified successfully
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('Failed to verify OTP. Please try again.');
    }
  };

  const handleSetNewOtpAndPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8085/set-new-otp-and-password', {
        email,
        newOtp,
        newPassword,
        confirmPassword,
      });
      setMessage(response.data.message);

      if (response.data.success) {
        // Redirect or handle successful setting of new OTP and password
        console.log('New OTP and Password set successfully.');
      }
    } catch (error) {
      console.error('Error setting new OTP and password:', error);
      setMessage('Failed to set new OTP and password. Please try again.');
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
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
            <button type="submit" onClick={handleReset} className="btn btn-primary btn-lg btn-block rounded-pill">Reset Password</button>
          </>
        );

      case 2:
        return (
          <>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-gray-700 text-sm font-semibold mb-2">Enter OTP</label>
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
            <button type="submit" onClick={handleVerifyOtp} className="btn btn-primary btn-lg btn-block rounded-pill">Verify OTP</button>
          </>
        );

      case 3:
        return (
          <>
            <div className="mb-4">
              <label htmlFor="newOtp" className="block text-gray-700 text-sm font-semibold mb-2">Enter New OTP</label>
              <input
                type="text"
                id="newOtp"
                name="newOtp"
                placeholder="Enter New OTP"
                className="border border-gray-300 form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500"
                value={newOtp}
                onChange={(e) => setNewOtp(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700 text-sm font-semibold mb-2">New Password</label>
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
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password</label>
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
            <button type="submit" onClick={handleSetNewOtpAndPassword} className="btn btn-primary btn-lg btn-block rounded-pill">Set New OTP and Password</button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container py-5 mt-5 mb-5">
      <div className="py-5 px-4 rounded-lg shadow-lg bg-white">
        <form className="py-5 px-4 mt-0 rounded-lg shadow-lg bg-white">
          {renderStepContent()}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
