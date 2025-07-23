import React, { useState } from 'react';
import './DisabilityDetailsModal.css'; // Import CSS for styling the modal

const DisabilityDetailsModal = ({ isOpen, onClose, onSubmit }) => {
  // State to track if the user has a disability (null means no selection)
  const [hasDisability, setHasDisability] = useState(null);
  // State to store the type of disability (used only if hasDisability is true)
  const [disabilityType, setDisabilityType] = useState('');
  // State to store additional details about the disability
  const [disabilityDetails, setDisabilityDetails] = useState('');

  // Return null if the modal is not open to prevent rendering
  if (!isOpen) return null;

  // Function to handle form submission
  const handleSubmit = () => {
    // Call the onSubmit callback with the collected data
    onSubmit({ hasDisability, disabilityType, disabilityDetails });
    // Reset state after submission
    setHasDisability(null);
    setDisabilityType('');
    setDisabilityDetails('');
    // Close the modal
    onClose();
  };

  return (
    <div className={`disability-modal-overlay ${isOpen ? 'show' : ''}`}>
      {/* Modal content container */}
      <div className="disability-modal-content">
        {/* Close button to close the modal */}
        <button className="disability-close-button" onClick={onClose}>
          &times; {/* Close icon */}
        </button>
        <h2 className="disability-modal-title text-2xl font-bold mb-4">
          More Information?
        </h2>

        {/* Radio buttons for indicating if the user has a disability */}
        <div className="disability-modal-radio-container text-dark mb-4">
          <label className="disability-modal-radio-label text-dark me-4">
            <input
              type="radio"
              name="disability"
              value="yes"
              checked={hasDisability === true}
              onChange={() => setHasDisability(true)}
              className="disability-modal-radio"
            />
            {' '}Yes
          </label>
          <label className="disability-modal-radio-label text-dark">
            <input
              type="radio"
              name="disability"
              value="no"
              checked={hasDisability === false}
              onChange={() => setHasDisability(false)}
              className="disability-modal-radio"
            />
            {' '}No
          </label>
        </div>

        {/* Conditional rendering for disability details if 'Yes' is selected */}
        {hasDisability && (
          <>
            {/* Commented out code for selecting disability type, you can uncomment if needed */}
            {/* <div className="disability-modal-select-container mb-4">
              <label className="disability-modal-select-label">
                Type of Disability
                <select
                  value={disabilityType}
                  onChange={(e) => setDisabilityType(e.target.value)}
                  className="disability-modal-select"
                >
                  <option value="">Select Disability Type</option>
                  <option value="visual">Visual Impairment</option>
                  <option value="hearing">Hearing Impairment</option>
                  <option value="mobility">Mobility Impairment</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div> */}
            {/* Text area for additional details about the disability */}
            <div className="disability-modal-textarea-container mb-4">
              <label className="disability-modal-textarea-label">
                Additional Details
                <textarea
                  value={disabilityDetails}
                  onChange={(e) => setDisabilityDetails(e.target.value)}
                  className="disability-modal-textarea"
                  placeholder="Provide more details here..."
                />
              </label>
            </div>
          </>
        )}

        {/* Buttons for submitting or canceling the modal */}
        <div className="disability-modal-buttons">
          <button
            className="disability-modal-submit-button"
            onClick={handleSubmit} // Handle form submission
          >
            Submit
          </button>
          <button
            className="disability-modal-cancel-button"
            onClick={onClose} // Close the modal without submitting
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisabilityDetailsModal;
