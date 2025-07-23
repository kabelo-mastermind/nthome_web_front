import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const DriverDetailsUpdate_driver = () => {
  // Enable cookies for cross-origin requests
  axios.defaults.withCredentials = true;
  
  // Extract driver ID from URL parameters
  const { id } = useParams();

  // State to store form data with initial empty values
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: ''
  });

  // Fetch driver details when component mounts or ID changes
  useEffect(() => {
    // Asynchronous function to fetch driver information from the API
    axios.get(`http://localhost:8085/userInfo/${id}`)
      .then(res => {
        // Destructure the driver data from the response
        const { name, lastName, email, phoneNumber, address } = res.data[0];
        
        // Update the form data state with fetched information
        setFormData({ 
          name: name || '', 
          lastName: lastName || '', 
          email: email || '', 
          phoneNumber: phoneNumber || '', 
          address: address || '' 
        });
      })
      .catch(error => {
        // Handle errors during data fetching
        console.error('Error fetching driver information:', error);
        toast.error('Failed to fetch driver information'); // Show error message
      });
  }, [id]); // Dependency array includes ID to refetch data when ID changes

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      // Send PUT request to update driver profile
      const response = await axios.put(`http://localhost:8085/edit_customer/${id}`, formData);
      
      // Show success message
      toast.success('Profile updated successfully!');
      
      // Redirect to profile page after 2 seconds
      setTimeout(() => {
        window.location.href = '/profile-driver';
      }, 2000);
    } catch (error) {
      // Handle errors during profile update
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.'); // Show error message
    }
  };

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update form data state with changed input values
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className='container py-5 mb-5'>
      <Toaster /> {/* Toaster component for displaying notifications */}
      <div className="container-fluid d-flex flex-column justify-content-between align-items-center customReg-margin-top">
        <form className="p-5 shadow-lg rounded bg-light" onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            <img src={assets.profile2} alt="Driver update Profile" className="rounded-circle w-50" />
          </div>
          <h1 className="text-center mb-4">Profile</h1>
          <div className="row mb-3">
            <div className="col-md-6">
              {/* Form group for First Name */}
              <div className="form-group">
                <label><b className='text-black'>First Name:</b></label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
              </div>
              {/* Form group for Last Name */}
              <div className="form-group">
                <label><b className='text-black'>Last Name:</b></label>
                <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} />
              </div>
              {/* Form group for Email Address */}
              <div className="form-group">
                <label><b className='text-black'>Email Address:</b></label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
              </div>
              {/* Form group for Phone Number */}
              <div className="form-group">
                <label><b className='text-black'>Phone Number:</b></label>
                <input type="tel" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
              </div>
            </div>
            <div className="col-md-6">
              {/* Form group for Physical Address */}
              <div className="form-group">
                <label><b className='text-black'>Physical Address:</b></label>
                <textarea className="form-control" name="address" rows="3" value={formData.address} onChange={handleChange}></textarea>
              </div>
            </div>
          </div>
          <div className="text-center">
            {/* Submit button for form */}
            <button type="submit" className="btn btn-primary btn-lg px-5">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverDetailsUpdate_driver;
