import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verification = () => {
  const [verificationData, setVerificationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const reference = searchParams.get('reference');
    const tripId = searchParams.get('tripId');
    

    if (reference && tripId) {
        const verifyPayment = async () => {
            try {
              const response = await axios.post('http://localhost:8085/api/verify/trip', {
                reference,
                tripId
              });
              
              if (response.data.success) {
                setVerificationData(response.data.data);
                navigate('/search');
              } else {
                setError('Verification failed.');
              }
            } catch (error) {
              console.error('Verification error:', error);
              setError('Verification failed. Please try again.');
            } finally {
              setLoading(false);
            }
          };
          
      verifyPayment();
    } else {
      setError('Reference and Trip ID are required.');
      setLoading(false);
    }
  }, [searchParams, navigate]);

  if (loading) return <div className='py-5 mt-5'><h1>Verification in progress...</h1></div>;
  if (error) return <div className='py-5 mt-5'><h1>Error: {error}</h1></div>;

  return (
    <div className='py-5 mt-5'>
      <h1>Verification Result</h1>
      <pre>{JSON.stringify(verificationData, null, 2)}</pre>
    </div>
  );
};

export default Verification;
