import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const ProfileUpdate_driver = () => {
  axios.defaults.withCredentials = true;
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    // Add other fields as required
  });

  useEffect(() => {
    // Fetch customer information from the backend API
    axios.get(`http://localhost:8085/userInfo/${id}`)
      .then(res => {
        console.log(res);
        const { name, lastName, email, phoneNumber, address } = res.data[0];
        setFormData({ name, lastName, email, phoneNumber, address });
      })
      .catch(error => {
        console.error('Error fetching customer information:', error);
      });
  }, [id]); // Include id in the dependency array

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Data to be sent:", formData); // Log the data to be sent
      const response = await axios.put(`http://localhost:8085/edit_customer/${id}`, formData);
      // Show success toast notification
      toast.success('Profile updated successfully!');
      // Redirect to the profile page after a short delay
      setTimeout(() => {
        window.location.href = '/profile-driver';
      }, 2000);
    } catch (error) {
      console.log(error);
      // Show error toast notification
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className='container py-5 mb-5'>
      <Toaster /> {/* Include the Toaster component for displaying toast notifications */}
      <div className="container-fluid d-flex flex-column justify-content-between align-items-center customReg-margin-top">
        <form className="p-5 shadow-lg rounded bg-light" onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            <img src={assets.profile2} alt="Driver update Profile" className=" rounded-circle w-50" />
          </div>
          <h1 className="text-center mb-4">Profile</h1>
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="form-group">
                <label><b className='text-black'>First Name:</b></label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label><b className='text-black'>Last Name:</b></label>
                <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label><b className='text-black'>Email Address:</b></label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label><b className='text-black'>Phone Number:</b></label>
                <input type="tel" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label><b className='text-black'>Physical Address:</b></label>
                <textarea className="form-control" name="address" rows="3" value={formData.address} onChange={handleChange}></textarea>
              </div>
              {/* Add other form fields as required */}
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-lg px-5">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate_driver;
