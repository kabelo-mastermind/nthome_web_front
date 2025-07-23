import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { IoIosArrowBack } from 'react-icons/io';
import { assets } from '../../assets/assets';

const CarDetailsUpdate = () => {
    // Extract car ID from URL parameters
    const { id } = useParams();
    
    // State to store form data and validation errors
    const [formData, setFormData] = useState({
        carMake: '',
        carModel: '',
        carYear: '',
        carSeats: '',
        carColor: '',
        licensePlate: '',
        carImage: null // For file uploads
    });
    const [errors, setErrors] = useState({});

    // Fetch car details on component mount or when ID changes
    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                // Fetch car details from the API based on user ID
                const response = await axios.get('http://localhost:8085/car_listing/user', { params: { userId: id } });
                console.log('Response data:', response.data); // Check API response in console
                
                // Check if car details are available in response
                if (response.data && response.data.carListings && response.data.carListings.length > 0) {
                    const car = response.data.carListings[0];
                    console.log('Fetched car data:', car); // Log fetched car details
                    
                    // Update form data with fetched car details
                    setFormData({
                        carMake: car.car_make || '',
                        carModel: car.car_model || '',
                        carYear: car.car_year || '',
                        carSeats: car.number_of_seats || '',
                        carColor: car.car_colour || '',
                        licensePlate: car.license_plate || '',
                        carImage: car.car_image || null
                    });
                } else {
                    console.error('No car listings found for this user');
                }
            } catch (error) {
                console.error('Error fetching car details:', error); // Handle any errors that occur during fetch
            }
        };
        
        fetchCarDetails(); // Call fetch function
    }, [id]);

    // Handle input changes for text fields
    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };
    
    // Handle file input changes
    const handleFileInput = (e) => {
        setFormData(prevState => ({ ...prevState, carImage: e.target.files[0] }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        let newErrors = {};
        let formIsValid = true;
    
        // Validation logic for each field
        if (!formData.carMake.trim()) {
            newErrors.carMake = 'Please enter car make';
            formIsValid = false;
        }
        if (!formData.carModel.trim()) {
            newErrors.carModel = 'Please enter car model';
            formIsValid = false;
        }
        if (!formData.carYear.trim()) {
            newErrors.carYear = 'Please enter car year';
            formIsValid = false;
        } else if (!/^\d{4}$/.test(formData.carYear.trim())) {
            newErrors.carYear = 'Please enter a valid 4-digit year';
            formIsValid = false;
        }
        if (!formData.carSeats.trim()) {
            newErrors.carSeats = 'Please enter number of seats';
            formIsValid = false;
        }
        if (!formData.carColor.trim()) {
            newErrors.carColor = 'Please enter car color';
            formIsValid = false;
        }
        if (!formData.licensePlate.trim()) {
            newErrors.licensePlate = 'Please enter license plate';
            formIsValid = false;
        }
        if (formData.carImage && !formData.carImage.name) {
            newErrors.carImage = 'Please upload car image';
            formIsValid = false;
        }
    
        setErrors(newErrors); // Update error state
    
        if (formIsValid) {
            try {
                // Create FormData object to include file and other data
                const formDataToSend = new FormData();
                formDataToSend.append('carMake', formData.carMake);
                formDataToSend.append('carModel', formData.carModel);
                formDataToSend.append('carYear', formData.carYear);
                formDataToSend.append('carSeats', formData.carSeats);
                formDataToSend.append('carColor', formData.carColor);
                formDataToSend.append('licensePlate', formData.licensePlate);
                formDataToSend.append('carImage', formData.carImage); // Append image file
    
                // Configuring headers for multipart form data
                const config = { 
                    headers: { 'Content-Type': 'multipart/form-data' } 
                };
    
                // Make PUT request to update car details
                await axios.put(`http://localhost:8085/car_listing/${id}`, formDataToSend, config);
    
                window.location.href = '/profile-driver'; // Redirect after successful update
            } catch (error) {
                console.error('Error updating car details:', error); // Handle errors during update
            }
        }
    };
    
    return (
        <div className="container py-5 mb-5">
            <div className="container-fluid d-flex flex-column justify-content-between align-items-center customReg-margin-top">
                <form onSubmit={handleSubmit} className="p-5 shadow-lg rounded bg-light" encType="multipart/form-data">
                    <Link to="/profile-driver">
                        <button type="button" className="btn btn-outline-primary btn-lg px-3 mb-3 ml-3">
                            <IoIosArrowBack className="mr-2" />
                        </button>
                    </Link>
                    <div className="text-center mb-4">
                        <img src={assets.profile2} alt="Driver update Profile" className="rounded-circle w-50" />
                    </div>
                    <h1 className="text-center mb-4">Car Details</h1>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label><b className="text-black">Car Make:</b></label>
                                <input type="text" className="form-control" name="carMake" placeholder="Toyota" value={formData.carMake || ''} onChange={handleInput} />
                                {errors.carMake && <span className="text-danger">{errors.carMake}</span>}
                            </div>
                            <div className="form-group">
                                <label><b className="text-black">Car Model:</b></label>
                                <input type="text" className="form-control" name="carModel" placeholder="Corolla" value={formData.carModel || ''} onChange={handleInput} />
                                {errors.carModel && <span className="text-danger">{errors.carModel}</span>}
                            </div>
                            <div className="form-group">
                                <label><b className="text-black">Car Year:</b></label>
                                <input type="text" className="form-control" name="carYear" placeholder="2020" value={formData.carYear || ''} onChange={handleInput} />
                                {errors.carYear && <span className="text-danger">{errors.carYear}</span>}
                            </div>
                            <div className="form-group">
                                <label><b className="text-black">Number of Seats:</b></label>
                                <input type="number" className="form-control" name="carSeats" placeholder="4" value={formData.carSeats || ''} onChange={handleInput} />
                                {errors.carSeats && <span className="text-danger">{errors.carSeats}</span>}
                            </div>
                            <div className="form-group">
                                <label><b className="text-black">Car Color:</b></label>
                                <input type="text" className="form-control" name="carColor" placeholder="Blue" value={formData.carColor || ''} onChange={handleInput} />
                                {errors.carColor && <span className="text-danger">{errors.carColor}</span>}
                            </div>
                            <div className="form-group">
                                <label><b className="text-black">License Plate:</b></label>
                                <input type="text" className="form-control" name="licensePlate" placeholder="ABC123" value={formData.licensePlate || ''} onChange={handleInput} />
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

export default CarDetailsUpdate;
