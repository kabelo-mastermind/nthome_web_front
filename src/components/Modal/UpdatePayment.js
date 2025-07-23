import React from 'react';
import './UpdatePayment.css'; // Import the CSS file for styling the modal

const UpdatePayment = ({ isOpen, onClose, onConfirm, trip }) => {
  // Render nothing if the modal is not open
  if (!isOpen) return null;

  // Handle confirmation of the payment status
  const handleConfirm = (status) => {
    // Call the onConfirm function passed as a prop with the trip ID and payment status
    onConfirm(trip.trip_id, status);
    // Close the modal
    onClose();
  };

  return (
    <div className="update-payment-modal-overlay">
      <div className="update-payment-modal-content">
        {/* Modal header */}
        <h2>Did the driver get paid?</h2>
        {/* Button group for confirming payment status */}
        <div className="update-payment-modal-buttons">
          {/* Button to confirm payment */}
          <button
            className="update-payment-btn update-payment-btn-confirm"
            onClick={() => handleConfirm(true)}
          >
            Yes
          </button>
          {/* Button to cancel payment */}
          <button
            className="update-payment-btn update-payment-btn-cancel"
            onClick={() => handleConfirm(false)}
          >
            No
          </button>
        </div>
        {/* Close button for the modal */}
        <button className="update-payment-btn btn-close" onClick={onClose}></button>
      </div>
    </div>
  );
};

export default UpdatePayment;
