import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { IoIosArrowBack } from 'react-icons/io';

const DriverDocumentsUpdate = () => {
  axios.defaults.withCredentials = true;
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    photo: null,
    id_copy: null,
    police_clearance: null,
    pdp: null,
    payment_url: '',
  });

  useEffect(() => {
    // Fetch driver's existing documents from the backend API
    axios.get(`http://localhost:8085/driver_documents/${id}`)
      .then(res => {
        const { photo, id_copy, police_clearance, pdp, payment_url } = res.data;
        setFormData({ photo, id_copy, police_clearance, pdp, payment_url });
      })
      .catch(error => {
        console.error('Error fetching driver documents:', error);
      });
  }, [id]);

  const handleInput = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileInput = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('photo', formData.photo);
      formDataToSend.append('id_copy', formData.id_copy);
      formDataToSend.append('police_clearance', formData.police_clearance);
      formDataToSend.append('pdp', formData.pdp);
      formDataToSend.append('payment_url', formData.payment_url);

      const response = await axios.put(`http://localhost:8085/driver_details/${id}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Documents updated successfully!');
      setTimeout(() => {
        navigate('/driver-dashboard');
      }, 2000);
    } catch (error) {
      console.log("Error:", error);
      toast.error('Failed to update documents. Please try again.');
    }
  };

  return (
    <div className='container  mb-5'>
      <Toaster /> {/* Ensure Toaster is included */}
      <div className="container-fluid d-flex flex-column justify-content-between align-items-center customReg-margin-top">
        <form className="p-5 shadow-lg rounded bg-light" onSubmit={handleSubmit} encType="multipart/form-data">
        <Link to="/drivers">
                        <button type="button" className="btn btn-outline-primary btn-lg px-3 mb-3 ml-3">
                            <IoIosArrowBack className="mr-2" />
                        </button>
                    </Link>
          <div className="text-center mb-4">
            <h1 className="text-center mb-4">Update Documents</h1>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="form-group">
                <label><b className='text-black'>Photo:</b></label>
                <input
                  type="file"
                  className="form-control"
                  name="photo"
                  onChange={handleFileInput}
                />
              </div>
              <div className="form-group">
                <label><b className='text-black'>ID Copy:</b></label>
                <input
                  type="file"
                  className="form-control"
                  name="id_copy"
                  onChange={handleFileInput}
                />
              </div>
              <div className="form-group">
                <label><b className='text-black'>Police Clearance:</b></label>
                <input
                  type="file"
                  className="form-control"
                  name="police_clearance"
                  onChange={handleFileInput}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label><b className='text-black'>PDP:</b></label>
                <input
                  type="file"
                  className="form-control"
                  name="pdp"
                  onChange={handleFileInput}
                />
              </div>
              <div className="form-group">
                <label><b className='text-black'>Payment URL:</b></label>
                <input
                  type="text"
                  className="form-control"
                  name="payment_url"
                  value={formData.payment_url}
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-lg px-5">Update Documents</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverDocumentsUpdate;
