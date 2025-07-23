import React, { useEffect, useState } from 'react';
import { HiUser, HiOutlineClock } from 'react-icons/hi'; // Import icons for user interface
import '../../index.css'; // Import CSS styles

// Component to display car details in a list item format
const CarListItem = ({ car, distance, pickup, onClick, amount }) => {
  // State to store driver's current position
  const [driverPosition, setDriverPosition] = useState(null);

  // Effect to get driver's real-time position
  useEffect(() => {
    // Watch for changes in the driver's position
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        // Update driver's position state with latitude and longitude
        setDriverPosition({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting driver position:', error); // Log any errors
      }
    );

    // Clear watch position on component unmount to prevent memory leaks
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // Function to calculate the estimated arrival time of the driver
  const calculateArrivalTime = () => {
    const urbanAverageSpeed = 30; // Average speed in urban areas (km/h)
    const highwayAverageSpeed = 80; // Average speed on highways (km/h)

    // Determine average speed based on distance (for simplicity)
    const averageSpeed = distance < 5 ? urbanAverageSpeed : highwayAverageSpeed; 

    const estimatedTimeInHours = distance / averageSpeed; // Use provided distance prop for Time = Distance / Speed
    const currentTime = new Date(); // Get the current time
    const estimatedArrivalTime = new Date(currentTime.getTime() + estimatedTimeInHours * 60 * 60 * 1000); // Calculate estimated arrival time

    // Calculate the difference between the estimated arrival time and current time in minutes
    const timeDifferenceInMinutes = Math.floor((estimatedArrivalTime - currentTime) / (1000 * 60));

    const hours = Math.floor(timeDifferenceInMinutes / 60); // Calculate hours from minutes
    const minutes = timeDifferenceInMinutes % 60; // Calculate remaining minutes

    // Return time in appropriate format (hours and minutes or just minutes)
    if (timeDifferenceInMinutes < 0) {
      return "Arrived"; // If the time difference is negative, the driver has arrived.
    }

    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    } else {
      return `${minutes} min`;
    }
  };

  const estimatedTimeDifference = calculateArrivalTime(); // Calculate estimated time difference

  // Return null if the car is not active
  if (car.status !== 'Active') {
    return null;
  }

  // Check if the driver is female
  const isFemale = car.driverGender && car.driverGender.toLowerCase() === 'female';

  return (
    <div className="car-info-container" onClick={() => onClick(car)}>
      <div className="car-details gap-4">
        {/* Display car image */}
        <img src={`http://localhost:8085/documents/${car.image}`} alt={car.name} className="car-image" style={{ width: '50px', height: 'auto' }} />
        <div className="car-description">
          <div className="car-name-seat">
            {/* Display car name and number of seats */}
            <h5 className="car-name">{car.name}</h5>
            <span className="car-seat">{car.numberOfSeats}</span>
            <span><HiUser className='seat-icon' /></span> {/* User icon for seat number */}
          </div>
          {/* Display car description with a special style if the driver is female */}
          <div className={`car-desc ${isFemale ? 'female-car-desc' : ''} text-white`}>
            <p className="text-gray-600">{car.description}</p>
          </div>
        </div>
      </div>
      {/* Display car price and estimated arrival time */}
      <div className="car-price p-2">
        <h6 className="font-semibold">R{(amount).toFixed(2)}</h6>
        <h6 className="font-semibold"><HiOutlineClock className='car-clock' />{estimatedTimeDifference}</h6> {/* Clock icon and estimated time */}
      </div>
    </div>
  );
};

export default CarListItem; // Export the CarListItem component for use in other parts of the application