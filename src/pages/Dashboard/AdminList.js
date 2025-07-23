import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminApp.css';
import toast, { Toaster } from 'react-hot-toast';
import AdminApp from './AdminApp';
import ConfirmDeleteModal from '../../components/Modal/ConfirmDelete';

const AdminList = () => {
  axios.defaults.withCredentials = true;

  const [admins, setAdmins] = useState([]);
  const [editAdminId, setEditAdminId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    role: '',
    current_address: '',
    gender: '',
    profile_picture: ''
  });
  const [showAddForm, setShowAddForm] = useState(false); // State to control visibility of add form
  const [newAdminData, setNewAdminData] = useState({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    role: '',
    current_address: '',
    gender: '',
    profile_picture: ''
  });
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // Track modal visibility
  const [selectedAdminId, setSelectedAdminId] = useState(null); // Track selected admin ID for deletion

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = () => {
    axios.get('http://localhost:8085/admins')
      .then(response => {
        setAdmins(response.data);
      })
      .catch(error => {
        console.error('Error fetching admins:', error);
      });
  };

  const handleEditClick = (admin) => {
    setEditAdminId(admin.id);
    setFormData({
      name: admin.name || '',
      lastName: admin.lastName || '',
      email: admin.email || '',
      phoneNumber: admin.phoneNumber || '',
      address: admin.address || '',
      role: admin.role || '',
      current_address: admin.current_address || '',
      gender: admin.gender || '',
      profile_picture: admin.profile_picture || ''
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
    axios.put(`http://localhost:8085/edit_admin/${editAdminId}`, formData)
      .then(response => {
        fetchAdmins();
        setEditAdminId(null);
        toast.success("Admin details updated successfully!");
      })
      .catch(error => {
        console.error('Error updating admin:', error);
        toast.error("Error updating admin details");
      });
  };

  const handleCancelEdit = () => {
    setEditAdminId(null);
  };

  const handleDeleteClick = (id) => {
    setSelectedAdminId(id);  // Set the admin ID to be deleted
    setShowConfirmDelete(true);  // Show the confirmation modal
  };

  const handleConfirmDelete = () => {
    axios.delete(`http://localhost:8085/delete_admin/${selectedAdminId}`)
      .then(response => {
        toast.success("Admin deleted successfully!");
        fetchAdmins();  // Refetch admins after deletion
      })
      .catch(error => {
        toast.error("Error deleting admin");
        console.error('Error deleting admin:', error);
      })
      .finally(() => {
        setShowConfirmDelete(false);  // Hide the modal
        setSelectedAdminId(null);  // Reset admin selection
      });
  };

  const handleAddClick = () => {
    setShowAddForm(prevState => !prevState);
  };

  const handleNewAdminInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdminData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAddAdminSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8085/add_admin', newAdminData)
      .then(response => {
        fetchAdmins();
        setShowAddForm(false);
        toast.success("New admin added successfully!");
      })
      .catch(error => {
        console.error('Error adding new admin:', error);
        toast.error("Error adding new admin");
      });
  };

  return (
    <AdminApp>
      <div className="container py-4 mb-5 mt-4">
        <h2 className="mb-4 text-dark">All Admins</h2>
     

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
                        <Link to="/addAdmin">
                            <button className="btn btn-success mb-3">Add New Member</button>
                        </Link>
                    </div>
                </div>

        <div className="table-responsive">
          <table className="table">
            <thead className='bg-dark'>
              <tr>
                <th className='text-white'>#</th>
                <th className='text-white'>Name</th>
                <th className='text-white'>Last Name</th>
                <th className='text-white'>Email</th>
                <th className='text-white'>Contact</th>
                <th className='text-white'>Address</th>
                <th className='text-white'>Gender</th>
                <th className='text-white'>Profile</th>
                <th className='text-white'>More details</th>
                <th className='text-white'>Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map(admin => (
                <tr key={admin.id}>
                  <td>{admin.id}</td>
                  <td>
                    {editAdminId === admin.id ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      admin.name
                    )}
                  </td>
                  <td>
                    {editAdminId === admin.id ? (
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      admin.lastName
                    )}
                  </td>
                  <td>
                    {editAdminId === admin.id ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      admin.email
                    )}
                  </td>
                  <td>
                    {editAdminId === admin.id ? (
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      admin.phoneNumber
                    )}
                  </td>
                  <td>
                    {editAdminId === admin.id ? (
                      <input
                        type="text"
                        name="current_address"
                        value={formData.current_address}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      admin.current_address
                    )}
                  </td>
                  <td>
                    {editAdminId === admin.id ? (
                      <input
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      admin.gender
                    )}
                  </td>
                  <td>
                    {editAdminId === admin.id ? (
                      <input
                        type="text"
                        name="profile_picture"
                        value={formData.profile_picture}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      <img src={`http://localhost:8085/profile_pictures/${admin.profile_picture}`} alt="Profile" style={{ width: '50px', height: '50px' }} />
                    )}
                  </td>
                  <td>
                    <Link to={`/viewAdmin/${admin.id}`} className="btn btn-info me-2">Details</Link>
                  </td>
                  <td>
                    {editAdminId === admin.id ? (
                      <>
                        <button className="btn btn-success me-2" onClick={handleFormSubmit}>Save</button>
                        <button className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="btn btn-info me-2" onClick={() => handleEditClick(admin)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => handleDeleteClick(admin.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
                {/* Render ConfirmDeleteModal */}
                <ConfirmDeleteModal
          isOpen={showConfirmDelete}
          onClose={() => setShowConfirmDelete(false)}
          onDelete={handleConfirmDelete}
        />
      </div>
      <Toaster />
    </AdminApp>
  );
};

export default AdminList;
