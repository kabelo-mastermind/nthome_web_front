import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import AdminApp from './AdminApp';

const VehicleType = () => {
    axios.defaults.withCredentials = true;

    const [vehicles, setVehicles] = useState([]);
    const [editVehicleId, setEditVehicleId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        costPerKm: '',
        status: '',
        image: ''
    });

    useEffect(() => {
        axios.get('http://localhost:8085/vehicles')
            .then(response => {
                setVehicles(response.data);
                // toast.success('Vehicles fetched successfully!');
            })
            .catch(error => {
                console.error('Error fetching vehicles:', error);
                toast.error('Error fetching vehicles');
            });
    }, []);

    const handleEditClick = (vehicle) => {
        setEditVehicleId(vehicle.id);
        setFormData({
            name: vehicle.name,
            costPerKm: vehicle.costPerKm,
            status: vehicle.status,
            image: vehicle.image
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('FormData:', formData); // Log formData before sending
        axios.put(`http://localhost:8085/edit_vehicle/${editVehicleId}`, formData)
            .then(response => {
                setVehicles(vehicles.map(vehicle =>
                    vehicle.id === editVehicleId ? { ...vehicle, ...formData } : vehicle
                ));
                setEditVehicleId(null);
                toast.success('Vehicle updated successfully!');
            })
            .catch(error => {
                console.error('Error updating vehicle:', error);
                toast.error('Error updating vehicle');
            });
    };

    const handleCancelEdit = () => {
        setEditVehicleId(null);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8085/delete_vehicle/${id}`)
            .then(response => {
                setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
                toast.success('Vehicle deleted successfully!');
            })
            .catch(error => {
                console.error('Error deleting vehicle:', error);
                toast.error('Error deleting vehicle');
            });
    };

    return (
        <AdminApp>
            <div className="container py-4 mb-5 mt-4">
                <Toaster /> {/* Ensure Toaster is included */}
                <div className="row">
                    <div className="col-12 mb-4">
                        <h2 className="text-dark">Vehicle Types</h2>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-6 mb-2 mb-md-0">
                        <Link to="/adminapp" className="btn btn-outline-primary float-left py-2">Back</Link>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="input-group" style={{ maxWidth: '250px', float: 'right' }}>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Search..."
                            />
                            <button className="btn btn-outline-primary" type="button">Search</button>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12">
                        <Link to="/addVehicle">
                            <button className="btn btn-success mb-3">Add Vehicle Type</button>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead className='bg-dark'>
                                    <tr>
                                        <th className='text-white'>ID</th>
                                        <th className='text-white'>Vehicle Image</th>
                                        <th className='text-white'>Vehicle Type</th>
                                        <th className='text-white'>Cost per km</th>
                                        <th className='text-white'>Status</th>
                                        <th className='text-white'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicles.map(vehicle => (
                                        <tr key={vehicle.id}>
                                            <td>{vehicle.id}</td>
                                            <td>
                                                <img src={`http://localhost:8085/documents/${vehicle.image}`} alt={vehicle.image} className="img-fluid" />
                                            </td>
                                            <td>
                                                {editVehicleId === vehicle.id ? (
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                    />
                                                ) : (
                                                    vehicle.name
                                                )}
                                            </td>
                                            <td>
                                                {editVehicleId === vehicle.id ? (
                                                    <input
                                                        type="number"
                                                        name="costPerKm"
                                                        value={formData.costPerKm}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                    />
                                                ) : (
                                                    vehicle.costPerKm
                                                )}
                                            </td>
                                            <td>
                                                {editVehicleId === vehicle.id ? (
                                                    <select
                                                        name="status"
                                                        value={formData.status}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                    >
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                    </select>
                                                ) : (
                                                    vehicle.status
                                                )}
                                            </td>
                                            <td>
                                                {editVehicleId === vehicle.id ? (
                                                    <>
                                                        <button className="btn btn-success me-2" onClick={handleFormSubmit}>Save</button>
                                                        <button className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button className="btn btn-info me-2" onClick={() => handleEditClick(vehicle)}>Edit</button>
                                                        <button className="btn btn-danger" onClick={() => handleDelete(vehicle.id)}>Delete</button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminApp>
    );
};

export default VehicleType;
