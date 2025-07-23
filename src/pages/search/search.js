import React, { useState, useEffect } from 'react';
import GoogleMapSection from "../../components/map/GoogleMapSection";
import SearchSection from "../../components/map/SearchSection";
import CustomerDetails from "../../components/Drivermap/CustomerDetails"; // Import the CustomerDetails component
import { SourceContext } from '../../Context/SourceContext';
import { DestinationContext } from '../../Context/DestinationContext';
import '../../index.css';
import SearchSection1 from '../../components/map/SearchSection1';
import GoogleMapSection1 from '../../components/map/GoogleMapSection1';
import { LoadScript } from '@react-google-maps/api';

const Search = ({ roles, userId, userName, emails}) => {
  // State to hold source and destination values
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  // Effect to log roles when the roles prop changes
  useEffect(() => {
    console.log('Roles:', roles); // Log the roles prop to the console for testing
  }, [roles]);

  // // Log source and destination values for debugging
  // console.log('start_location:', source);
  // console.log('end_location:', destination);

  // Determine if the user has the 'driver' role
  const isDriver = roles && roles.includes('driver');

  return (
    // Provide context values for source and destination
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <LoadScript 
        libraries={['places']}
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
        <div className='container-fluid mt-5 p-5'>
          <div className='row row-map'>
            {/* Conditional rendering based on user role */}
            <div className='col-md-4 full-width-on-tablet'>
              <div className='py-4 mt-5 shadow-lg rounded bg-light'>
                {/* Render CustomerDetails if user is a driver, otherwise render SearchSection */}
                {isDriver 
                  ? <CustomerDetails driverId={userId} driverName={userName}  /> 
                  : <SearchSection1 userId={userId} customerName={userName} emails={emails} />}
              </div>
            </div>
            {/* Render GoogleMapSection to show the map */}
            <div className="col-md-8 mt-4 p-4">
              <GoogleMapSection1 />
            </div>
          </div>
        </div>
        </LoadScript>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}

export default Search;
