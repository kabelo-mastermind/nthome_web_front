import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = ({ email }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handlePasswordReset = (e) => {
    e.preventDefault();
    const errors = {};

    if (!newPassword.trim()) {
      errors.newPassword = "Password is required";
    } else if (newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters";
    } else if (!/[a-z]/.test(newPassword) || !/[A-Z]/.test(newPassword) || !/\d/.test(newPassword) || !/[!@#$%^&*]/.test(newPassword)) {
      errors.newPassword = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      axios.post("http://localhost:8085/reset-password", {
        email: email,
        newPassword: newPassword,
      }).then(response => {
        console.log("Password reset successfully!");
        setShowSuccessAlert(true);
        setNewPassword("");
        setConfirmPassword("");
      }).catch(error => {
        console.error('Error:', error);
        setShowErrorAlert(true);
      });
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handlePasswordReset}>
        <input 
          type="password" 
          placeholder="New Password" 
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required 
        />
        <span className="error">{formErrors.newPassword}</span>
        <input 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required 
        />
        <span className="error">{formErrors.confirmPassword}</span>
        <button type="submit">Reset Password</button>
      </form>
      {showSuccessAlert && (
        <div className="alert alert-success" role="alert">
          Password reset successfully!
        </div>
      )}
      {showErrorAlert && (
        <div className="alert alert-danger" role="alert">
          An error occurred. Please try again.
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
