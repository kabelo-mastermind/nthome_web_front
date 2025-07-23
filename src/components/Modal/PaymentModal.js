import React from 'react';
import './PaymentModal.css'; // Import the CSS file for styling the modal

const PaymentModal = ({ isOpen, onClose, paymentUrl }) => {
  // Render nothing if the modal is not open
  if (!isOpen) {
    return null;
  }

  // Handler function to redirect to the payment URL
  const handlePaymentClick = () => {
    // Redirect to the payment page
    window.location.href = paymentUrl;
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <div className="custom-modal-header">
          <h2>Payment Required</h2>
          {/* Close button for the modal */}
          <button className="custom-close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="custom-modal-body">
          {/* Instructional message to the user */}
          <p>To complete your ride request, please proceed to the payment page.</p>
        </div>
        <div className="custom-modal-footer">
          {/* Button to navigate to the payment page */}
          <button className="custom-btn custom-btn-primary" onClick={handlePaymentClick}>
            Go to Payment Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
