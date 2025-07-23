import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { IoIosArrowBack } from 'react-icons/io';
import axios from 'axios';

const Car_details = ({ userId }) => {
    // Configure axios to include credentials in requests
    axios.defaults.withCredentials = true;

    // State to hold form data
    const [formData, setFormData] = useState({
        carMake: '',
        carModel: '',
        carYear: '',
        carSeats: '',
        carColor: '',
        licensePlate: '',
        carImage: null,
        userId: userId // Initialize with user ID
    });

    // State to hold form validation errors
    const [errors, setErrors] = useState({});

    // State to handle user role (default is 'driver')
    const [role, setRole] = useState('driver');

    // Handle input changes for text fields
    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle file input changes
    const handleFileInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation checks
        let newErrors = {};
        let formIsValid = true;
    
        // Check if car make is provided
        if (!formData.carMake.trim()) {
            newErrors.carMake = 'Please enter car make';
            formIsValid = false;
        }
    
        // Check if car model is provided
        if (!formData.carModel.trim()) {
            newErrors.carModel = 'Please enter car model';
            formIsValid = false;
        }
    
        // Check if car year is provided and is a valid 4-digit year
        if (!formData.carYear.trim()) {
            newErrors.carYear = 'Please enter car year';
            formIsValid = false;
        } else if (!/^\d{4}$/.test(formData.carYear.trim())) {
            newErrors.carYear = 'Please enter a valid 4-digit year';
            formIsValid = false;
        }
    
        // Check if number of seats is provided
        if (!formData.carSeats.trim()) {
            newErrors.carSeats = 'Please enter number of seats';
            formIsValid = false;
        }
    
        // Check if car color is provided
        if (!formData.carColor.trim()) {
            newErrors.carColor = 'Please enter car color';
            formIsValid = false;
        }
    
        // Check if license plate is provided
        if (!formData.licensePlate.trim()) {
            newErrors.licensePlate = 'Please enter license plate';
            formIsValid = false;
        }
    
        // Check if car image is uploaded
        if (!formData.carImage) {
            newErrors.carImage = 'Please upload car image';
            formIsValid = false;
        }
    
        // Set validation errors in state
        setErrors(newErrors);

        // Configure headers for multipart/form-data
        const config = { 
            headers: { 'Content-Type': 'multipart/form-data' } 
        }
    
        if (formIsValid) {
            try {
                // Create FormData object to send form data including files
                const formDataToSend = new FormData();
                formDataToSend.append('carMake', formData.carMake);
                formDataToSend.append('carModel', formData.carModel);
                formDataToSend.append('carYear', formData.carYear);
                formDataToSend.append('carSeats', formData.carSeats);
                formDataToSend.append('carColor', formData.carColor);
                formDataToSend.append('licensePlate', formData.licensePlate);
                formDataToSend.append('carImage', formData.carImage);
                formDataToSend.append('userId', userId);
                
                // Make POST request to server to upload car details
                const response = await axios.post('http://localhost:8085/car_listing', formDataToSend, config);
                console.log('Server response:', response.data);
                
                // Redirect user after successful submission
                window.location.href = '/profile-driver';
                
            } catch (error) {
                console.error('Error uploading car details:', error);
                // Handle error, show error message, or retry
            }

            // Update the user role to 'driver'
            try {
                // No need to call setRole() here as it is not setting the role
                const response = await axios.put(`http://localhost:8085/edit_user/${userId}`, { role: 'driver' });
                console.log('Role updated:', response.data);
            } catch (error) {
                console.log('Error updating role:', error);
                // Handle error, show error message, or retry
            }
        }
    };
    
    return (
        <div className="container py-5 mb-5">
            <div className="container-fluid d-flex flex-column justify-content-between align-items-center customReg-margin-top">
                <form onSubmit={handleSubmit} className="p-5 shadow-lg rounded bg-light" encType={'multipart/form-data'}>
                    <Link to="/profile-driver">
                        <button type="button" className="btn btn-outline-primary btn-lg px-3 mb-3 ml-3">
                            <IoIosArrowBack className="mr-2" />
                        </button>
                    </Link>
                    <div className="text-center mb-4">
                        <img src={assets.profile2} alt="Driver update Profile" className="rounded-circle w-50" />
                    </div>
                    <h1 className="text-center text-dark mb-4">Car Details</h1>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            {/* Input fields for car details */}
                            <div className="form-group">
                                <label><b className="text-black">Car Make:</b></label>
                                <input type="text" className="form-control" name="carMake" placeholder="Toyota" onChange={handleInput} />
                                {errors.carMake && <span className="text-danger">{errors.carMake}</span>}
                            </div>
                            <div className="form-group">
                                <label><b className="text-black">Car Model:</b></label>
                                <input type="text" className="form-control" name="carModel" placeholder="Corolla" onChange={handleInput} />
                                {errors.carModel && <span className="text-danger">{errors.carModel}</span>}
                            </div>
                            <div className="form-group">
                                <label><b className="text-black">Car Year:</b></label>
                                <input type="text" className="form-control" name="carYear" placeholder="2020" onChange={handleInput} />
                                {errors.carYear && <span className="text-danger">{errors.carYear}</span>}
                            </div>
                            <div className="form-group">
                                <label><b className="text-black">Number of seats:</b></label>
                                <input type="number" className="form-control" name="carSeats" placeholder="4" onChange={handleInput} />
                                {errors.carSeats && <span className="text-danger">{errors.carSeats}</span>}
                            </div>
                            <div className="form-group">
                                <label><b className="text-black">Car Color:</b></label>
                                <input type="text" className="form-control" name="carColor" placeholder="blue" onChange={handleInput} />
                                {errors.carColor && <span className="text-danger">{errors.carColor}</span>}
                            </div>
                            <div className="form-group">
                                <label><b className="text-black">License Plate:</b></label>
                                <input type="text" className="form-control" name="licensePlate" placeholder="ABC123" onChange={handleInput} />
                                {errors.licensePlate && <span className="text-danger">{errors.licensePlate}</span>}
                            </div>
                        </div>
                        <div className="form-group d-flex justify-content-center">
                            <label><b className="text-black">Car Image:</b></label>
                            <input type="file" className="form-control-file custom-file-input" name="carImage" accept="image/*" onChange={handleFileInput} />
                            {errors.carImage && <span className="text-danger">{errors.carImage}</span>}
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-lg px-5">Done</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Car_details;
