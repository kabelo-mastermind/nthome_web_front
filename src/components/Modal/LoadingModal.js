// LoadingModal.js
import React from 'react';
import './LoadingModal.css'; // Import the CSS file for styling

const LoadingModal = ({ isOpen }) => {
  if (!isOpen) return null; // Don't render anything if the modal is not open

  return (
    <div className="loading-modal-overlay">
      <div className="loading-modal-content">
        <div className="loader"></div>
        <p>Waiting for driver to accept your ride...</p>
      </div>
    </div>
  );
};

export default LoadingModal;