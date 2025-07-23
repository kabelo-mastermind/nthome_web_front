import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import profilePlaceholder from '../../assets/profile2.jpg';

const ProfileUpdate = () => {
  axios.defaults.withCredentials = true;
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8085/userInfo/${id}`)
      .then(res => {
        const { name, lastName, email, phoneNumber, address } = res.data[0];
        setFormData({ name, lastName, email, phoneNumber, address });
      })
      .catch(error => {
        console.error('Error fetching customer information:', error);
      });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8085/edit_customer/${id}`, formData);
      window.location.href = '/profile-customer';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container py-5 mb-5'>
      <div className="container d-flex justify-content-center align-items-center customReg-margin-top">
        <form onSubmit={handleSubmit} className="p-5 shadow-lg rounded bg-light">
          {/* <div className="text-center mb-4">
            <img src={profilePlaceholder} alt="Customer Profile" className="rounded-circle w-50"
                style={{ objectFit: 'cover', width: '150px', height: '150px' }}
                />
          </div> */}
           <div className="d-flex justify-content-between mb-3">
                    <div>
                        <Link to="/profile-customer" className="btn btn-outline-primary float-left py- mb-">Back</Link>
                    </div>
                </div>
          <h1 className="text-center text-dark mb-4">Profile Update</h1>
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="form-group">
                <label><b className='text-black'>First Name:</b></label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label><b className='text-black'>Last Name:</b></label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label><b className='text-black'>Email Address:</b></label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label><b className='text-black'>Phone Number:</b></label>
                <input
                  type="tel"
                  className="form-control"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label><b className='text-black'>Physical Address:</b></label>
                <textarea
                  className="form-control"
                  name="address"
                  rows="3"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary rounded-pill px-5">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
