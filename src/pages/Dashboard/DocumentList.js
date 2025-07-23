import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const DriverDocumentsPage = () => {
    axios.defaults.withCredentials = true;

    const [documents, setDocuments] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        console.log("Driver ID:", id); // Log id to check its value
        if (!id) return;
        
        axios.get(`http://localhost:8085/driver_documents/${id}`)
            .then(response => {
                console.log("Documents:", response.data); // Log documents fetched from API
                if (response.data && response.data.length > 0) {
                    setDocuments(response.data);
                } else {
                    console.log('No documents found');
                }
            })
            .catch(error => {
                console.error('Error fetching documents:', error);
            });
        
        
        
        
    }, [id]);

    return (
        <div className="container py-5 mb-5">
            <h2 className="mb-4">Driver Documents</h2>
            <div className="d-flex justify-content-between mb-3">
                <Link to="/driver" className="btn btn-outline-primary float-left mb-">Back</Link>
            </div>
            <div className="row">
                {documents.map((document, index) => (
                    <React.Fragment key={index}>
                        <div className="col-sm-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Photo</h5>
                                    {document.photo && document.photo.endsWith('.pdf') ? (
                                        <a href={`http://localhost:8085/documents/${document.photo}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary mb-3">View PDF</a>
                                    ) : (
                                        <img src={`http://localhost:8085/documents/${document.photo}`} alt={document.photo} className="img-fluid mb-3" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">ID Copy</h5>
                                    {document.id_copy && document.id_copy.endsWith('.pdf') ? (
                                        <a href={`http://localhost:8085/documents/${document.id_copy}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary mb-3">View PDF</a>
                                    ) : (
                                        <img src={`http://localhost:8085/documents/${document.id_copy}`} alt="ID Copy" className="img-fluid mb-3" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Police Clearance</h5>
                                    {document.police_clearance && document.police_clearance.endsWith('.pdf') ? (
                                        <a href={`http://localhost:8085/documents/${document.police_clearance}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary mb-3">View PDF</a>
                                    ) : (
                                        <img src={`http://localhost:8085/documents/${document.police_clearance}`} alt="Police Clearance" className="img-fluid mb-3" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">PDP</h5>
                                    {document.pdp && document.pdp.endsWith('.pdf') ? (
                                        <a href={`http://localhost:8085/documents/${document.pdp}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary mb-3">View PDF</a>
                                    ) : (
                                        <img src={`http://localhost:8085/documents/${document.pdp}`} alt="PDP" className="img-fluid mb-3" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default DriverDocumentsPage;
