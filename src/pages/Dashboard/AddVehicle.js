import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import AdminApp from './AdminApp';

const AddVehicle = () => {
    const [vehicle, setVehicle] = useState({
        name: '',
        costPerKm: '',
        status: 'Active',
        image: null
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicle({ ...vehicle, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVehicle({ ...vehicle, image: file });
        }
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('name', vehicle.name);
        formData.append('costPerKm', vehicle.costPerKm);
        formData.append('status', vehicle.status);
        formData.append('image', vehicle.image);

        try {
            const response = await axios.post('http://localhost:8085/addVehicles', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Vehicle added successfully!');
            console.log('Vehicle data saved:', response.data);
            setTimeout(() => navigate('/vehicle'), 2000); // Wait before navigating
        } catch (error) {
            toast.error('Error saving vehicle data');
            console.error('Error saving vehicle data:', error);
        }
    };

    const handleReset = () => {
        setVehicle({
            name: '',
            costPerKm: '',
            status: 'Active',
            image: null
        });
    };

    return (
        <AdminApp>
            <div className="container py-5 mb-5">
                <Toaster /> {/* Ensure Toaster is included */}
                <h2 className="mb-4 text-dark">Add Vehicle Type</h2>
                <Link to="/vehicle" className="btn btn-outline-primary float-left mb-3">Back</Link>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Vehicle Type Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={vehicle.name}
                            onChange={handleChange}
                            placeholder="Enter vehicle type name"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="costPerKm" className="form-label">Cost per km</label>
                        <input
                            type="number"
                            className="form-control"
                            id="costPerKm"
                            name="costPerKm"
                            value={vehicle.costPerKm}
                            onChange={handleChange}
                            placeholder="Enter cost per km"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select
                            className="form-select"
                            id="status"
                            name="status"
                            value={vehicle.status}
                            onChange={handleChange}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Vehicle Image</label>
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            onChange={handleImageUpload}
                        />
                        {vehicle.image && (
                            <img src={URL.createObjectURL(vehicle.image)} alt="Vehicle" style={{ width: '100px', height: '100px', marginTop: '10px' }} />
                        )}
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
                        <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
                    </div>
                </form>
            </div>
        </AdminApp>
    );
};

export default AddVehicle;
