import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import AdminApp from './AdminApp';
import { Link } from 'react-router-dom';

const AddAdminPage = () => {
    const [newAdminData, setNewAdminData] = useState({
        name: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        role: '',
        current_address: '',
        gender: '',
        profile_picture: null,
        password: '' // Add password field
    });

    const handleNewAdminInputChange = (e) => {
        const { name, value } = e.target;
        setNewAdminData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setNewAdminData(prevData => ({
            ...prevData,
            profile_picture: e.target.files[0] // Handle file input
        }));
    };

    const handleAddAdminSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(newAdminData).forEach(key => {
            formData.append(key, newAdminData[key]);
        });

        axios.post('http://localhost:8085/api/add-admin', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            toast.success("New admin added successfully and email sent!");
            setNewAdminData({
                name: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                address: '',
                role: '',
                current_address: '',
                gender: '',
                profile_picture: null,
                password: '' // Reset password
            });
        })
        .catch(error => {
            console.error('Error adding new admin:', error);
            toast.error("Error adding new admin");
        });
    };

    return (
        <AdminApp>
            <div className="container py-4">
                <div className="row mb-3">
                    <div className="col-12 col-md-6 mb-2 mb-md-0">
                        <Link to="/adminList" className="btn btn-outline-primary float-left py-2">Back</Link>
                    </div>
                </div>
                <form onSubmit={handleAddAdminSubmit} className="mb-4">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" name="name" value={newAdminData.name} onChange={handleNewAdminInputChange} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" name="lastName" value={newAdminData.lastName} onChange={handleNewAdminInputChange} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" value={newAdminData.email} onChange={handleNewAdminInputChange} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input type="text" name="phoneNumber" value={newAdminData.phoneNumber} onChange={handleNewAdminInputChange} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input type="text" name="address" value={newAdminData.address} onChange={handleNewAdminInputChange} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <input type="text" name="role" value={newAdminData.role} onChange={handleNewAdminInputChange} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Current Address</label>
                        <input type="text" name="current_address" value={newAdminData.current_address} onChange={handleNewAdminInputChange} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <input type="text" name="gender" value={newAdminData.gender} onChange={handleNewAdminInputChange} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Profile Picture</label>
                        <input type="file" name="profile_picture" onChange={handleFileChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" value={newAdminData.password} onChange={handleNewAdminInputChange} className="form-control" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Admin</button>
                </form>
                <Toaster />
            </div>
        </AdminApp>
    );
};

export default AddAdminPage;
