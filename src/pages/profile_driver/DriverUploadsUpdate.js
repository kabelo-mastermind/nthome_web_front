import React, { useState, useEffect } from 'react'; // Importing React library and useState, useEffect hooks for managing component state and side effects.
import { Link, useNavigate } from 'react-router-dom'; // Importing Link for navigation and useNavigate for programmatic navigation.
import { assets } from '../../assets/assets'; // Importing assets, likely for image or other static file references.
import axios from 'axios'; // Importing axios for making HTTP requests.
import toast, { Toaster } from 'react-hot-toast'; // Importing toast for notifications and Toaster for displaying toast messages.
import { IoIosArrowBack } from 'react-icons/io'; // Importing a back arrow icon from react-icons library.

const ProfileUpdate_driver = ({ userId }) => { // Defining a functional component named ProfileUpdate_driver that accepts a userId prop.
  axios.defaults.withCredentials = true; // Configuring axios to include credentials (cookies) with requests by default.
  const navigate = useNavigate(); // Using useNavigate hook to enable navigation to different routes programmatically.

  // Initializing formData state to store files for upload.
  const [formData, setFormData] = useState({
    photo: null,
    id_copy: null,
    police_clearance: null,
    pdp: null
  });

  useEffect(() => {
    // useEffect hook for running side effects. Here, it could be used to fetch existing documents for the user if needed.
    // Currently, it's empty but set up to react to changes in userId.
  }, [userId]);

  const handleFileChange = (e) => {
    // handleFileChange updates formData state with the selected file when the user chooses a file.
    setFormData({
      ...formData, // Spread operator to copy existing formData state.
      [e.target.name]: e.target.files[0] // Update the state for the specific file input that changed.
    });
  };

  const handleSubmit = async (event) => {
    // handleSubmit function to handle form submission and upload files to the server.
    event.preventDefault(); // Prevent default form submission behavior.
    const data = new FormData(); // Creating a new FormData object to handle file uploads.
    data.append('photo', formData.photo); // Appending photo file to FormData.
    data.append('id_copy', formData.id_copy); // Appending ID copy file to FormData.
    data.append('police_clearance', formData.police_clearance); // Appending police clearance file to FormData.
    data.append('pdp', formData.pdp); // Appending PDP file to FormData.

    try {
      // Making a PUT request to the server to update driver documents using axios.
      const response = await axios.put(`http://localhost:8085/driver_documents/${userId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Setting header to inform the server of the multipart form data.
        },
      });
      toast.success('Driver documents updated successfully!'); // Display success message upon successful upload.
      setTimeout(() => {
        navigate('/profile-driver'); // Navigate to profile page after a delay of 2 seconds.
      }, 2000);
    } catch (error) {
      console.log("Error:", error); // Log any errors to the console.
      toast.error('Failed to update documents. Please try again.'); // Display error message if the request fails.
    }
  };

  return (
    <div className='container py-5 mb-5'> {/* Container for page content, adding padding and margin. */}
      <Toaster /> {/* Component for displaying toast notifications. */}
      <div className="container-fluid d-flex flex-column justify-content-between align-items-center customReg-margin-top">
        <form className="p-5 shadow-lg rounded bg-light" onSubmit={handleSubmit}> {/* Form element styled with padding, shadow, and background color. */}
          <Link to="/profile-driver"> {/* Link to navigate back to the driver profile page. */}
            <button type="button" className="btn btn-outline-primary btn-lg px-3 mb-3 ml-3"> {/* Back button styled as an outlined primary button. */}
              <IoIosArrowBack className="mr-2" /> {/* Back arrow icon next to the button text. */}
            </button>
          </Link>
          <div className="text-center mb-4"> {/* Centered container for profile image. */}
            <img src={assets.profile2} alt="Driver update Profile" className=" rounded-circle w-50" /> {/* Display a placeholder profile image. */}
          </div>
          <h1 className="text-center mb-4">Update Documents</h1> {/* Page title for the document update form. */}
          <div className="row mb-3"> {/* Row container for form fields. */}
            <div className="col-md-6"> {/* Column for the first half of the form fields. */}
              <div className="form-group"> {/* Grouping input field for styling and layout. */}
                <label><b className='text-black'>Photo:</b></label> {/* Label for the photo input field. */}
                <input
                  type="file" // Input type file for uploading images.
                  className="form-control-file" // Bootstrap class for styling file input.
                  name="photo" // Name attribute used for identifying the input and handling file changes.
                  accept="image/*" // Restrict file input to image files only.
                  onChange={handleFileChange} // onChange event handler to update state when a file is selected.
                  style={{ // Inline styles for additional custom styling of the file input.
                    width: '100%',
                    padding: '5px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #ced4da',
                    borderRadius: '0.25rem',
                    cursor: 'pointer'
                  }}
                />
              </div>
              <div className="form-group"> {/* Another form group for ID copy input field. */}
                <label><b className='text-black'>ID Copy:</b></label> {/* Label for ID copy input field. */}
                <input
                  type="file" // File input for ID copy.
                  className="form-control-file"
                  name="id_copy"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{
                    width: '100%',
                    padding: '5px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #ced4da',
                    borderRadius: '0.25rem',
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>
            <div className="col-md-6"> {/* Column for the second half of the form fields. */}
              <div className="form-group"> {/* Form group for police clearance input field. */}
                <label><b className='text-black'>Police Clearance:</b></label> {/* Label for police clearance input field. */}
                <input
                  type="file" // File input for police clearance.
                  className="form-control-file"
                  name="police_clearance"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{
                    width: '100%',
                    padding: '5px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #ced4da',
                    borderRadius: '0.25rem',
                    cursor: 'pointer'
                  }}
                />
              </div>
              <div className="form-group"> {/* Form group for PDP input field. */}
                <label><b className='text-black'>PDP:</b></label> {/* Label for PDP input field. */}
                <input
                  type="file" // File input for PDP.
                  className="form-control-file"
                  name="pdp"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{
                    width: '100%',
                    padding: '5px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #ced4da',
                    borderRadius: '0.25rem',
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>
          </div>
          <div className="text-center"> {/* Centered container for the submit button. */}
            <button type="submit" className="btn btn-primary btn-lg px-5">Update Documents</button> {/* Submit button for the form. */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate_driver; // Exporting the ProfileUpdate_driver component for use in other parts of the application.
