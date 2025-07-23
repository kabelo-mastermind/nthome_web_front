import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import profilePlaceholder from '../../assets/profile2.jpg'; // Placeholder image for profile pictures
import axios from 'axios'; // HTTP client for making API requests
import toast, { Toaster } from 'react-hot-toast'; // Toast notifications for success and error messages
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCar, FaIdBadge, FaFileAlt, FaEdit, FaCamera } from 'react-icons/fa'; // Icons from 'react-icons'
import './profile_driver.css'; // CSS styles specific to this component

// Main component for displaying driver's profile information
const Profile_driver = ({ userId }) => {
  axios.defaults.withCredentials = true; // Ensures that cookies are sent with every request for authentication

  // State variables to manage driver information, car listings, additional driver details, errors, profile picture update, and image preview
  const [driverInfo, setDriverInfo] = useState(null); // Driver's basic information
  const [carListings, setCarListings] = useState([]); // List of cars associated with the driver
  const [driverMoreInfo, setDriverMoreInfo] = useState([]); // Additional details about the driver
  const [error, setError] = useState(null); // Error state for handling errors in fetching data
  const [newProfilePicture, setNewProfilePicture] = useState(null); // New profile picture file selected for upload
  const [previewImage, setPreviewImage] = useState(''); // Preview of the new profile picture before upload

  // useEffect hook to fetch driver information, car listings, and additional driver details when the component mounts or when userId changes
  useEffect(() => {
    // Function to fetch driver's basic information
    const fetchDriverInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/userInfo/${userId}`); // API call to fetch user information
        if (response.data && response.data.length > 0) {
          setDriverInfo(response.data[0]); // Update state with fetched driver information
          setError(null); // Reset error state if successful
          // toast.success('Driver information fetched successfully'); // Show success toast notification
        } else {
          setError('No driver information found'); // Set error state if no data is found
        }
      } catch (error) {
        setError('Failed to fetch driver information'); // Set error state if API call fails
      }
    };

    // Function to fetch car listings associated with the driver
    const fetchCarListings = async () => {
      try {
        if (!userId) throw new Error('User ID is required'); // Check if userId is provided
        const response = await axios.get('http://localhost:8085/car_listing/user', { params: { userId } }); // API call to fetch car listings
        if (response.data && response.data.carListings) {
          setCarListings(response.data.carListings); // Update state with fetched car listings
          setError(null); // Reset error state if successful
          // toast.success('Car listings fetched successfully'); // Show success toast notification
        } else {
          setError('No car listings found'); // Set error state if no car listings are found
          // toast.error('No car listings found'); // Show error toast notification
        }
      } catch (error) {
        setError('Failed to fetch car listings'); // Set error state if API call fails
      }
    };

    // Function to fetch additional details about the driver
    const fetchDriverMoreInfo = async () => {
      try {
        if (!userId) throw new Error('User ID is required'); // Check if userId is provided
        const response = await axios.get('http://localhost:8085/more_details/user', { params: { userId } }); // API call to fetch additional driver details
        if (response.data && response.data.driver) {
          setDriverMoreInfo(response.data.driver); // Update state with fetched additional details
          setError(null); // Reset error state if successful
          // toast.success('Additional driver details fetched successfully'); // Show success toast notification
        } else {
          setError('No extra driver details found'); // Set error state if no additional details are found
        }
      } catch (error) {
        setError('Failed to fetch more driver details'); // Set error state if API call fails
      }
    };

    // Immediately invoked function expression (IIFE) to fetch all data concurrently
    (async () => {
      await fetchDriverInfo();
      await fetchCarListings();
      await fetchDriverMoreInfo();
    })();
  }, [userId]);

  // Function to handle the file input change event for profile picture update
  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Get the selected file from the input
    setNewProfilePicture(file); // Update state with the new profile picture file

    if (file) {
      // Create a file reader to preview the new profile picture
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Set the preview image once reading is complete
      };
      reader.readAsDataURL(file); // Read the file as a data URL for preview

      // Prepare form data for profile picture upload
      const formData = new FormData();
      formData.append('profilePicture', file);

      try {
        // API call to update the profile picture on the server
        const response = await axios.put(`http://localhost:8085/update-profile-picture/${userId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.status === 200) {
          toast.success('Profile picture updated successfully'); // Show success toast notification
          
          // Fetch updated user information to reflect the new profile picture
          const userResponse = await axios.get(`http://localhost:8085/userInfo/${userId}`);
          const updatedProfilePicture = `${userResponse.data[0].profile_picture}?t=${new Date().getTime()}`; // Force image refresh by adding timestamp
          setDriverInfo({
            ...userResponse.data[0],
            profile_picture: updatedProfilePicture, // Update state with new profile picture URL
          });
        } else {
          toast.error('Failed to update profile picture'); // Show error toast notification if update fails
        }
      } catch (error) {
        toast.error('Error updating profile picture'); // Show error toast notification if API call fails
      }
    }
  };

  return (
    <div className='container py-5 mb-5'>
      <Toaster /> {/* Component to display toast notifications */}
      <div className="container d-flex justify-content-center align-items-center customReg-margin-top">
        <form className="p-4 shadow-lg rounded bg-light">
          <h1 className="text-center text-dark mb-3 ">Profile</h1>
          <div className="text-center mb-2">
            <div className="position-relative">
              {/* Display the profile picture or a placeholder if not available */}
              <img
                src={previewImage || `http://localhost:8085/profile_pictures/${driverInfo?.profile_picture}` || profilePlaceholder}
                alt={driverInfo?.name || 'Default Profile Picture'}
                className="rounded-circle "
                style={{ objectFit: 'cover', width: '150px', height: '150px' }}
              />
              {/* Hidden file input for selecting new profile picture */}
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange} // Trigger profile picture change on file selection
                style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', opacity: 0 }}
              />
              {/* Icon for uploading a new profile picture */}
              <label htmlFor="profilePicture" className="position-absolute" style={{ bottom: '10px', cursor: 'pointer' }}>
                <FaCamera size={24} color="gray" />
              </label>
            </div>
          </div>

          {/* Display error message if there is any */}
          {error && <p className="text-danger">{error}</p>}
          
          {/* Conditionally render driver details if fetched successfully */}
          {driverInfo && (
            <div className="row mb-2">
              <div className="col-md-6">
                <h2>Driver 
                  {/* Link to update driver profile information */}
                  <Link to={`/profileUpdate-driver/${userId}`}>
                    <FaEdit style={{ fontSize: '16px', color: 'gray', marginLeft: '10px', cursor: 'pointer' }} className='edit-icon' />
                  </Link>
                </h2>
                <div className="form-group">
                  <label><FaUser className="mr-2 text-black" /> <b className='text-black'>First Name:</b></label>
                  <p className="form-control-static">{driverInfo.name}</p> {/* Display driver's first name */}
                </div>
                <div className="form-group">
                  <label><FaUser className="mr-2 text-black" /> <b className='text-black'>Last Name:</b></label>
                  <p className="form-control-static">{driverInfo.lastName}</p> {/* Display driver's last name */}
                </div>
                <div className="form-group">
                  <label><FaEnvelope className="mr-2 text-black" /><b className='text-black'> Email:</b></label>
                  <p className="form-control-static">{driverInfo.email}</p> {/* Display driver's email */}
                </div>
                {/* <div className="form-group">
                  <label><FaPhone className="mr-2 text-black" /><b className='text-black'>Phone Number:</b></label>
                  <p className="form-control-static">{driverInfo.phoneNumber}</p> 
                </div> */}
                {/* <div className="form-group">
                  <label><FaMapMarkerAlt className="mr-2 text-black" /><b className='text-black'>Current Address:</b></label>
                  <p className="form-control-static">{driverInfo.address}</p>
                </div> */}
              </div>

              {/* Conditionally render additional driver details if fetched successfully */}
              {driverMoreInfo && driverMoreInfo.length > 0 && (
                <div className="col-md-8">
                  <h2> More info
                    {/* Link to update additional driver information */}
                    {/* <Link to={`/profileUpdate-driver/${userId}`}>
                      <FaEdit style={{ fontSize: '16px', color: 'gray', marginLeft: '10px', cursor: 'pointer' }} className='edit-icon' />
                    </Link> */}
                  </h2>
                  {/* <div className="form-group">
                    <label><FaIdBadge className="mr-2 text-black" /><b className='text-black'> Nationality:</b></label>
                    <p className="form-control-static">{driverMoreInfo.nationality}</p>
                  </div>
                  <div className="form-group">
                    <label><FaIdBadge className="mr-2 text-black" /><b className='text-black'> Date of Birth:</b></label>
                    <p className="form-control-static">{driverMoreInfo.date_of_birth}</p> 
                  </div> */}
                  <div className="form-group">
                    <label><FaFileAlt className="mr-2 text-black" /><b className='text-black'> Current Address:</b></label>
                    <p className="form-control-static">{driverInfo.address}</p> {/* Display driver's license number */}
                  </div>
                  {/* <div className="form-group">
                    <label><FaCar className="mr-2 text-black" /><b className='text-black'> Vehicle Type:</b></label>
                    <p className="form-control-static">{driverMoreInfo.class}</p> 
                  </div> */}
                      <div className="form-group">
                  <label><FaPhone className="mr-2 me-1 text-black" /><b className='text-black'>Phone Number:</b></label>
                  <p className="form-control-static">{driverInfo.phoneNumber}</p> {/* Display driver's phone number */}
                </div>
                </div>
              )}
            </div>
          )}

          {/* Conditionally render car listings if fetched successfully */}
          {carListings && carListings.length > 0 && (
            <div>
              <h2>Car info
                {/* Link to add new car */}
                <Link to="/add-car">
                  <FaEdit style={{ fontSize: '16px', color: 'gray', marginLeft: '10px', cursor: 'pointer' }} className='edit-icon' />
                </Link>
              </h2>
              {carListings.map((car) => (
                <div key={car.id} className="car-listing p-3 mb-2">
                  <p><b>Make:</b> {car.car_make}</p>
                  <p><b>Model:</b> {car.car_model}</p>
                  <p><b>Year:</b> {car.car_year}</p>
                  <p><b>Color:</b> {car.car_colour}</p>
                  <p><b>Number of Seats:</b> {car.number_of_seats}</p>
                  <p><b>License Plate:</b> {car.license_plate}</p>
                  {/* Display car image if available */}
                  {car.car_image && (
                    <img src={`http://localhost:8085/documents/${car.car_image}`} alt={car.car_model} style={{ width: '100px', height: 'auto' }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile_driver;
