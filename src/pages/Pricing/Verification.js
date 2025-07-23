import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Verification = ({ userId }) => {
  // State to hold the response data from the verification API
  const [posts, setPosts] = useState('');

  // Hook to access query parameters from the URL
  const [searchParams] = useSearchParams();
  
  // Hook for navigation to other routes
  const navigate = useNavigate();
  
  // Base URL for the verification API endpoint
  const url = 'http://localhost:8085/api/verify'; // Ensure this matches your server URL

  useEffect(() => {
    // Check if 'reference' parameter exists in the query string
    if (searchParams.has('reference')) {
      // Extract the 'reference' parameter from the query string
      const reference = searchParams.get('reference');

      // Function to verify payment using the reference
      const VerifyPayment = async (reference) => {
        try {
          // Make a GET request to the verification API with the reference and userId
          const response = await axios.get(`${url}/${reference}`, {
            params: { userId }, // Include userId as a query parameter
            headers: {
              'X-Requested-With': 'XMLHttpRequest' // Set header to indicate AJAX request
            }
          });

          // Update state with the response data
          setPosts(response.data);
          console.log('Verification data:', response.data); // Log the response data for debugging

          // Check if the verification was successful and redirect if so
          if (response.data.status === true && response.data.message === 'Verification successful') {
            navigate('/paymentSuccess'); // Redirect to the success page
          }
        } catch (error) {
          // Log any errors that occur during the API request
          console.error('Verification error:', error);
        }
      };

      // Call the VerifyPayment function with the extracted reference
      VerifyPayment(reference);
    }
  }, [searchParams, userId, navigate]); // Dependencies for the useEffect hook

  return (
    <div className='py-5 mt-5'>
      <h1>Verification in progress...</h1>
      {/* Display the posts data in a formatted JSON string */}
      <div>{JSON.stringify(posts, null, 2)}</div>
    </div>
  );
};

export default Verification;
