import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaCamera } from 'react-icons/fa';
import profilePlaceholder from '../../assets/profile2.jpg'; 

const Profile_customer = ({ userId }) => {
  // State to hold customer information, error messages, new profile picture, and preview image
  const [customerInfo, setCustomerInfo] = useState(null);
  const [error, setError] = useState(null);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  // useEffect to fetch customer information when the component mounts or userId changes
  useEffect(() => {
    if (!userId) {
      setError('User ID is missing');
      return;
    }

    axios.get(`http://localhost:8085/userInfo/${userId}`)
      .then(response => {
        if (response.data && response.data.length > 0) {
          setCustomerInfo(response.data[0]);
          setError(null);
        } else {
          setError('No user information found');
          toast.error('No user information found');
        }
      })
      .catch(error => {
        setError('Failed to fetch user information');
        toast.error('Failed to fetch user information');
      });
  }, [userId]);

  // Handles file input changes for updating profile picture
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setNewProfilePicture(file);

    if (file) {
      // Create a FileReader to preview the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Automatically submit the form data after file selection
      const formData = new FormData();
      formData.append('profilePicture', file);

      try {
        // Send PUT request to update the profile picture
        const response = await axios.put(`http://localhost:8085/update-profile-picture/${userId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.status === 200) {
          toast.success('Profile picture updated successfully');
          // Refresh user info after updating
          const userResponse = await axios.get(`http://localhost:8085/userInfo/${userId}`);
          const updatedProfilePicture = `${userResponse.data[0].profile_picture}?t=${new Date().getTime()}`;
          setCustomerInfo({
            ...userResponse.data[0],
            profile_picture: updatedProfilePicture,
          });
        } else {
          toast.error('Failed to update profile picture');
        }
      } catch (error) {
        toast.error('Error updating profile picture');
      }
    }
  };

  return (
    <div className='container py-5 mb-5'>
      <div className="container d-flex justify-content-center align-items-center customReg-margin-top">
        <form className="p-4 shadow-lg rounded bg-light">
          <div className="text-center mb-2">
            <div className="position-relative">
              {/* Display profile picture with preview functionality */}
              <img
                src={previewImage || `http://localhost:8085/profile_pictures/${customerInfo?.profile_picture}` || profilePlaceholder}
                alt={customerInfo?.name || 'Default Profile Picture'}
                className="rounded-circle w-50"
                style={{ objectFit: 'cover', width: '150px', height: '150px' }}
              />

              {/* Hidden file input for selecting a new profile picture */}
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', opacity: 0 }}
              />
              {/* Camera icon to indicate that the profile picture can be changed */}
              <label htmlFor="profilePicture" className="position-absolute" style={{ bottom: '10px', cursor: 'pointer' }}>
                <FaCamera size={24} color="gray" />
              </label>
            </div>
          </div>
          <h1 className="text-center mb-3">Profile</h1>
          {/* Display error messages */}
          {error && <p className="text-danger">{error}</p>}
          {/* Display customer information if available */}
          {customerInfo && (
            <div className="row mb-2">
              <div className="col-md-6">
                <div className="form-group">
                  <label><b className='text-black'>First Name:</b></label>
                  <p className="form-control-static">{customerInfo.name}</p>
                </div>
                <div className="form-group">
                  <label><b className='text-black'>Last Name:</b></label>
                  <p className="form-control-static">{customerInfo.lastName}</p>
                </div>
                <div className="form-group">
                  <label><b className='text-black'>Email Address:</b></label>
                  <p className="form-control-static">{customerInfo.email}</p>
                </div>
                <div className="form-group">
                  <label><b className='text-black'>Phone Number:</b></label>
                  <p className="form-control-static">{customerInfo.phoneNumber}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label><b className='text-black'>Physical Address:</b></label>
                  <p className="form-control-static">{customerInfo.address}</p>
                </div>
              </div>
            </div>
          )}
          <div className="text-center mt-4">
            {/* Link to navigate to the profile update page */}
            <Link to={`/profileUpdate-customer/${userId}`}>
              <button type="button" className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0">Edit</button>
            </Link>
          </div>
          {/* Toaster for showing notifications */}
          <Toaster />
        </form>
      </div>
    </div>
  );
};

export default Profile_customer;
