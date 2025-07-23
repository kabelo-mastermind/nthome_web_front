import React from 'react';
import { X } from 'lucide-react'; // Importing X icon from Lucide Icons for the close button
import './Modal.css'; // Import the CSS file for styling the modal

const Modal = ({ isOpen, onClose, data }) => {
  // Check if the modal should be displayed based on isOpen prop
  if (!isOpen) return null;

  // Extracting data with fallback values if data is not provided
  const driverPhoto = data?.driverPhoto || 'default-photo-url'; // URL for driver's photo
  const driverName = data?.driverName || 'Unknown Driver'; // Driver's name
  const carImage = data?.carImage || 'default-car-image-url'; // URL for car image
  const carMake = data?.carMake || 'Unknown Make'; // Car's make
  const carModel = data?.carModel || 'Unknown Model'; // Car's model
  const carYear = data?.carYear || 'Unknown Year'; // Car's year
  const licensePlate = data?.licensePlate || 'Unknown License Plate'; // Car's license plate
  const driverGender = data?.driverGender || 'Unknown'; // Driver's gender

  // Determine if the driver is female to conditionally style the modal
  const isFemale = driverGender.toLowerCase() === 'female';

  return (
    <div className="custom-modal-overlay">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className={`modal-content ${isFemale ? 'female-bg' : ''}`}>
          <div className={`modal-header ${isFemale ? 'female-header' : 'bg-dark'} text-light`}>
            <h5 className="modal-title">Driver Details</h5>
            {/* Button to close the modal */}
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className={`modal-body ${isFemale ? 'female-body' : 'bg-light'}`}>
            <div className="row">
              {/* Section for driver's profile picture */}
              <div className="col-md-6 text-center">
                <div className={`profile-pic-wrapper ${isFemale ? 'female-border' : ''}`}>
                  <img
                    src={`http://localhost:8085/documents/${driverPhoto}`} // Dynamically set driver photo URL
                    alt={driverName} // Alt text for accessibility
                    className="profile-pic mb-3 shadow-sm" // Apply CSS classes for styling
                  />
                </div>
              </div>
              {/* Section for car image */}
              <div className="col-md-6 text-center">
                <img
                  src={`http://localhost:8085/documents/${carImage}`} // Dynamically set car image URL
                  alt={`${carMake} ${carModel}`} // Alt text describing the car
                  className="img-fluid profile-car rounded-lg mb-3 shadow-sm" // Apply CSS classes for styling
                />
              </div>
            </div>
            <div className="row mt-3">
              {/* Driver Information Section */}
              <div className="col-md-6">
                <h3 className="h5 font-weight-bold">Driver Information</h3>
                <p className="mb-1"><strong>Name:</strong> {driverName}</p>
                <p className="mb-1"><strong>Phone Number:</strong> {data?.driverPhoneNumber || 'Unknown'}</p>
                <p className="mb-1"><strong>Gender:</strong> {driverGender}</p>
              </div>
              {/* Car Details Section */}
              <div className="col-md-6">
                <h3 className="h5 font-weight-bold">Car Details</h3>
                <p className="mb-1"><strong>Make:</strong> {carMake}</p>
                <p className="mb-1"><strong>Model:</strong> {carModel}</p>
                <p className="mb-1"><strong>Year:</strong> {carYear}</p>
                <p className="mb-1"><strong>License Plate:</strong> {licensePlate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
