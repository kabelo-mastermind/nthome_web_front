import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './AdminApp.css'; // Import custom styles for the component
import AdminApp from './AdminApp'; // Import the AdminApp component for layout
import ConfirmDeleteModal from '../../components/Modal/ConfirmDelete';

const DriversTable = () => {
    // Set up default settings for axios requests
    axios.defaults.withCredentials = true;

    // State to store drivers data, car listings, and the ID of the driver being edited
    const [drivers, setDrivers] = useState([]);
    const [carListings, setCarListings] = useState([]);
    const [editDriverId, setEditDriverId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Add state to manage modal visibility
    const [driverToDelete, setDriverToDelete] = useState(null); // Track which driver to delete

    // State to handle form data for editing driver details
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        state: '',
        status: '',
        role: '',
        class: '' // Initialize class field
    });

    // Fetch drivers and car listings data when the component mounts
    useEffect(() => {
        fetchDrivers();
        fetchCarListings();
    }, []);

    // Function to fetch drivers data from the backend API
    const fetchDrivers = () => {
        axios.get('http://localhost:8085/viewDrivers')
            .then(response => {
                setDrivers(response.data); // Update state with fetched data
            })
            .catch(error => {
                console.error('Error fetching drivers data:', error); // Log errors to console
            });
    };

    // Function to fetch car listings data from the backend API
    const fetchCarListings = () => {
        axios.get('http://localhost:8085/carListings')
            .then(response => {
                setCarListings(response.data); // Update state with fetched car listings data
            })
            .catch(error => {
                console.error('Error fetching car listings data:', error); // Log errors to console
            });
    };

    // Function to handle click event for editing a driver
    const handleEditClick = (driver) => {
        setEditDriverId(driver.id); // Set the ID of the driver being edited
        // Find the car listing for the driver and set the form data with the relevant details
        const driverClass = carListings.find(car => car.userId === driver.id)?.class || '1'; // Default to '1' if not found
        setFormData({
            name: driver.name || '',
            lastName: driver.lastName || '',
            email: driver.email || '',
            phoneNumber: driver.phoneNumber || '',
            address: driver.address || '',
            state: driver.state || '',
            role: driver.role || '',
            status: driver.status || '',
            class: driverClass // Set class from carListings
        });
    };

    // Function to handle changes in input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    // Function to handle form submission for updating driver details
    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        axios.put(`http://localhost:8085/edit_driver/${editDriverId}`, formData)
            .then(response => {
                console.log("approval sernt==========================================");
                
                toast.success("Driver details updated successfully!"); // Show success message
                fetchDrivers(); // Refresh drivers list
                fetchCarListings(); // Refresh car listings
                setEditDriverId(null); // Reset edit driver ID
            })
            .catch(error => {
                toast.error("Error updating driver details"); // Show error message
                console.error('Error updating driver:', error); // Log errors to console
            });
    };
    

    // Function to handle cancellation of edit mode
    const handleCancelEdit = () => {
        setEditDriverId(null); // Reset edit driver ID
    };

    // // Function to handle deletion of a driver
    // const handleDelete = (id) => {
    //     axios.delete(`http://localhost:8085/delete_driver/${id}`)
    //         .then(response => {
    //             toast.success("Driver and related records deleted successfully!"); // Show success message
    //             fetchDrivers(); // Refresh drivers list
    //         })
    //         .catch(error => {
    //             toast.error("Error deleting driver"); // Show error message
    //             console.error('Error deleting driver:', error); // Log errors to console
    //         });
    // };

    const handleDelete = (id) => {
        setIsDeleteModalOpen(true); // Open the modal
        setDriverToDelete(id); // Set the driver to delete
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:8085/delete_driver/${driverToDelete}`)
            .then(response => {
                toast.success("Driver and related records deleted successfully!");
                fetchDrivers();
                setIsDeleteModalOpen(false); // Close the modal after deletion
            })
            .catch(error => {
                toast.error("Error deleting driver");
                console.error('Error deleting driver:', error);
            });
    };
    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false); // Close the modal without deleting
    };

    return (
        <AdminApp> {/* Wrap component in AdminApp for consistent layout */}
            <Toaster /> {/* Toast container for displaying notifications */}
            <div className="container py-4 mb-5 mt-4">
                <h2 className="mb-4 text-dark">All Drivers</h2>
                <div className="d-flex justify-content-between mb-3">
                    <div>
                        <Link to="/adminapp" className="btn btn-outline-primary float-left py- mb-">Back</Link> {/* Navigation button */}
                    </div>
                    <div className="input-group" style={{ maxWidth: '250px' }}>
                        <input type="text" className="form-control form-control-sm" placeholder="Search..." /> {/* Search input */}
                        <button className="btn btn-outline-primary" type="button">Search</button> {/* Search button */}
                    </div>
                </div>
                <div className="table-responsive"> {/* Responsive table container */}
                    <table className="table">
                        <thead className='bg-dark'>
                            <tr>
                                <th className='text-white'>#</th>
                                <th className='text-white'>Name</th>
                                <th className='text-white'>Last Name</th>
                                <th className='text-white'>Gender</th>
                                <th className='text-white'>Email</th>
                                <th className='text-white'>Contact</th>
                                <th className='text-white'>Address</th>
                                <th className='text-white'>Role</th>
                                <th className='text-white'>State</th>
                                <th className='text-white'>Status</th>
                                <th className='text-white'>Class</th> {/* Add new column for class */}
                                <th className='text-white'>More details</th>
                                <th className='text-white'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map through drivers and create table rows */}
                            {drivers.map(driver => (
                                <tr key={driver.id}>
                                    <td>{driver.id}</td>
                                    <td>
                                        {editDriverId === driver.id ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            driver.name
                                        )}
                                    </td>
                                    <td>
                                        {editDriverId === driver.id ? (
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            driver.lastName
                                        )}
                                    </td>
                                    <td>
                                        {editDriverId === driver.id ? (
                                            driver.gender
                                        ) : (
                                            driver.gender
                                        )}
                                    </td>
                                    <td>
                                        {editDriverId === driver.id ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            driver.email
                                        )}
                                    </td>
                                    <td>
                                        {editDriverId === driver.id ? (
                                            <input
                                                type="text"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            driver.phoneNumber
                                        )}
                                    </td>
                                    <td>
                                        {editDriverId === driver.id ? (
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            driver.address
                                        )}
                                    </td>
                                    <td>
                                        {editDriverId === driver.id ? (
                                            <select
                                                name="role"
                                                value={formData.role}
                                                onChange={handleInputChange}
                                                className="form-control"
                                            >
                                                <option value="customer">Customer</option>
                                                <option value="driver">Driver</option>
                                            </select>
                                        ) : (
                                            driver.role
                                        )}
                                    </td>
                                    <td>
                                        {editDriverId === driver.id ? (
                                            <select
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className="form-control"
                                            >
                                                <option value="Online">Online</option>
                                                <option value="Offline">Offline</option>
                                            </select>
                                        ) : (
                                            driver.state
                                        )}
                                    </td>
                                    <td>
                                        {editDriverId === driver.id ? (
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                                className="form-control"
                                            >
                                                <option value="approved">Approved</option>
                                                <option value="declined">Declined</option>
                                                <option value="pending">Pending</option>
                                            </select>
                                        ) : (
                                            driver.status
                                        )}
                                    </td>
                                    <td>
                                        {editDriverId === driver.id ? (
                                            <select
                                                name="class"
                                                value={formData.class}
                                                onChange={handleInputChange}
                                                className="form-control"
                                            >
                                                <option value="1">nthome_black</option>
                                                <option value="2">nthome_x</option>
                                                {/* Add more options if needed */}
                                            </select>
                                        ) : (
                                            // Convert the database value to the corresponding display name
                                            {
                                                '1': 'nthome_black',
                                                '2': 'nthome_x'
                                            }[carListings.find(car => car.userId === driver.id)?.class] || 'N/A'
                                        )}
                                    </td>
                                    <td>
                                        <Link to={`/viewDriver/${driver.id}`} className="btn btn-info me-2">Ride History</Link>
                                        <Link to={`/driverDocuments/${driver.id}`} className="btn btn-info me-2">Documents</Link>
                                    </td>
                                    <td>
                                        {editDriverId === driver.id ? (
                                            <>
                                                <button className="btn btn-success me-2" onClick={handleFormSubmit}>Save</button>
                                                <button className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="btn btn-info me-2" onClick={() => handleEditClick(driver)}>Edit</button>
                                                <button className="btn btn-danger" onClick={() => handleDelete(driver.id)}>Delete</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
                {/* Confirm Delete Modal */}
                <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={handleCancelDelete}
                onDelete={confirmDelete}
            />
        </AdminApp>
    );
}

export default DriversTable;
