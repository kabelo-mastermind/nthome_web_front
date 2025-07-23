import React, { useState } from 'react';
import GoogleMapSection from "../../components/map/GoogleMapSection";
import SearchSection from "../../components/map/SearchSection";
import { SourceContext } from '../../Context/SourceContext';
import { DestinationContext } from '../../Context/DestinationContext';
import CustomerDetails from '../../components/Drivermap/CustomerDetails';
import '../../index.css';

const Rides = () => {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <div className='container-fluid mt-5 p-5'>
          <div className='row row-map' >
            <div className='col-md-4 full-width-on-tablet'>
              <div className='py-4 shadow-lg rounded bg-light'>
                <CustomerDetails />
              </div>
            </div>
            <div className="col-md-8 ">
              <GoogleMapSection />
            </div>
          </div> 
        </div>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}

export default Rides;
