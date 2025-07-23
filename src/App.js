import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppRoutes from "./pages/Routers/AppRoutes";
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
// import { DriverProvider } from './contexts/DriverContext';
import { DriverProvider } from '../src/Context/DriverContext' // Import DriverProvider
import { TripProvider } from "./Context/TripContext";

function App() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8085/user')
      .then(res => {
        const { valid, username, role, userId, email } = res.data;
        if (valid) {
          setUserData({ username, role, userId, email });
        } else {
          navigate('/');
        }
      })
      .catch(err => console.error("Error fetching user data:", err));
  }, []);

  // Logging userData inside useEffect to ensure it's up-to-date
  useEffect(() => {
    if (userData) {
      console.log("Username:", userData.username);
      console.log("Role:", userData.role);
      console.log("User ID:", userData.userId);
      console.log("User email:", userData.email);
    }
  }, [userData]);

  return (
    <TripProvider>
    <DriverProvider>  {/* Wrap the entire app with DriverProvider */}
      <div className="mx-w-4 mx-auto">
        <Navbar userName={userData ? userData.username : ''} roles={userData ? userData.role : ''} userId={userData ? userData.userId : ''} />
        <div className="max-w-7xl mx-auto mt-6">
          {userData && userData.role === 'admin' ? (
            <AppRoutes isAdmin={true} userId={userData.userId} AdminRole={userData.role} emails={userData ? userData.email : ''} />
          ) : (
            <AppRoutes isAdmin={false} userId={userData ? userData.userId : ''} roles={userData ? userData.role : ''} userName={userData ? userData.username : ''} emails={userData ? userData.email : ''} />
          )}
        </div>
        <Footer /> 
      </div>
    </DriverProvider> 
    </TripProvider>
  );
}

export default App;
