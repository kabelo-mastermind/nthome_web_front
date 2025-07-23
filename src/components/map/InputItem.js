import React, { useContext, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import locationData from '../../utils/locationsData/southafrica_data.json';
import { DestinationContext } from '../../Context/DestinationContext';
import { SourceContext } from '../../Context/SourceContext';
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster

const InputItem = ({ type, setCoordinate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSuggestionsVisible(value.length >= 3);
    setSearchResults(
      value.length >= 3
        ? locationData.filter((location) => location.name.toLowerCase().startsWith(value.toLowerCase()))
        : []
    );
  };

  const handleSelect = (location) => {
    setSearchTerm(location.name);
    setSuggestionsVisible(false);
    getLatAndLng(location, type);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSuggestionsVisible(false);
  };

  const getLatAndLng = (place, type) => {
    const { coord } = place;
    const { lat, lon } = coord;

    if (type === 'source') {
      if (destination) {
        const distance = calculateDistance(lat, lon, destination.lat, destination.lon);
        if (distance > 200) {
          toast.error('The distance between your source and destination is over 200 kilometers. Please adjust your destination.');
          return; // Exit function to prevent setting the source
        }
      }
      setCoordinate({
        lat: lat,
        lon: lon,
        label: place.name
      });
      setSource({ lat, lon, label: place.name });
    } else {
      if (source) {
        const distance = calculateDistance(source.lat, source.lon, lat, lon);
        if (distance > 200) {
          toast.error('The distance between your source and destination is over 200 kilometers. Please adjust your destination.');
          return; // Exit function to prevent setting the destination
        }
      }
      setCoordinate({
        lat: lat,
        lon: lon,
        label: place.name
      });
      setDestination({ lat, lon, label: place.name });
    }
  };

  return (
    <div className='position-relative'>
      <Toaster /> {/* Ensure Toaster is included in your component tree */}
      <div className='d-flex align-items-center'>
        <input
          type='text'
          placeholder={type === 'source' ? 'Pickup Location' : 'DropOff Location'}
          className='form-control rounded-lg shadow-sm border border-gray-300 placeholder-gray-400 focus-outline-none focus-border-blue-400'
          value={searchTerm}
          onChange={handleChange}
        />
        {searchTerm && (
          <button className="btn contacts btn-sm shadow-sm" onClick={handleClear}>
            <RiCloseFill className="text-danger" />
          </button>
        )}
      </div>

      {suggestionsVisible && (
        <div className='position-sticky top-full bg-white border border-gray-300 mt-1 max-h-40 overflow-y-auto shadow-lg rounded z-1'>
          {searchResults.map((location) => (
            <div
              key={location.id}
              className='p-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200'
              onClick={() => handleSelect(location)}
            >
              {location.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputItem;
