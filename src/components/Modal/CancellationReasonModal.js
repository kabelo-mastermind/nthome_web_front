import React, { useState } from 'react';
import './CancellationReasonModal.css'; // Import CSS for modal styling

const CancellationReasonModal = ({ isOpen, onClose, onCancel }) => {
  // State to track the reason for cancellation
  const [reason, setReason] = useState('');

  // If the modal is not open, return null to prevent rendering
  if (!isOpen) return null;

  // Function to handle the cancellation
  const handleCancel = () => {
    // Call the onCancel callback with the reason
    onCancel(reason);
    // Reset the reason state after cancellation
    setReason('');
    // Close the modal
    onClose();
  };

  return (
    <div className={`cancel-modal-overlay ${isOpen ? 'show' : ''}`}>
      {/* Modal content container */}
      <div className="canceling-modal-content">
        {/* Close button to exit the modal */}
        <button className="cancel-close-button" onClick={onClose}>
          &times; {/* Close icon */}
        </button>
        {/* Modal title */}
        <h2 className="text-2xl font-bold mb-4">
          Cancellation Reason
        </h2>
        {/* Textarea for entering the cancellation reason */}
        <textarea
          placeholder="Enter cancellation reason" // Placeholder text for the textarea
          value={reason} // Current value of the textarea
          onChange={(e) => setReason(e.target.value)} // Update state on change
          className="border rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" // TailwindCSS and custom styles
          style={{ width: '100%' }} // Ensure textarea takes full width
        />
        {/* Button to confirm cancellation */}
        <button
          className="bg-danger hover:bg-danger text-white font-bold py-2 px-4 rounded-lg"
          style={{ width: '100%' }} // Ensure button takes full width
          onClick={handleCancel} // Handle click to confirm cancellation
        >
          Confirm Cancellation
        </button>
      </div>
    </div>
  );
};

export default CancellationReasonModal;
