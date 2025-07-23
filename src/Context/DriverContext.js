// src/Context/DriverContext.js

import React, { createContext, useContext, useState } from 'react';

// Create context to share driver position
const DriverContext = createContext();

// Create a custom hook to access the driver position
export const useDriver = () => {
  return useContext(DriverContext);
};

// Create a provider component
export const DriverProvider = ({ children }) => {
  const [driverPosition, setDriverPosition] = useState(null);

  return (
    <DriverContext.Provider value={{ driverPosition, setDriverPosition }}>
      {children}
    </DriverContext.Provider>
  );
};
