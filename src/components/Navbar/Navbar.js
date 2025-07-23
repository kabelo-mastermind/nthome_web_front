import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets'; // Assuming you have an assets module
import axios from 'axios';
import './Navbar.css'; // Import your updated CSS file
import { FaRoute } from 'react-icons/fa';

const Navbar = ({ userName, roles, userId }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
  const [isSiteDropdownOpen, setSiteDropdownOpen] = useState(false); // State for site dropdown

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8085/api/get-profile-picture/${userId}`)
        .then(response => {
          setProfilePicture(response.data.profile_picture);
        })
        .catch(error => {
          console.error('Error fetching profile picture:', error);
          setProfilePicture('defaultProfilePictureUrl'); // Set a default profile picture if fetching fails
        });
    }
  }, [userId]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleSiteDropdown = () => {
    setSiteDropdownOpen(!isSiteDropdownOpen);
  };

  const handleLogout = () => {
    axios.get('http://localhost:8085/logout')
      .then(res => {
        window.location.href = '/login'; // Redirect to the login page
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  const handleRideWithUs = () => {
    if (!userName || !roles || !userId) {
      window.location.href = '/login'; // Redirect to login if user information is missing
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm" id="mainNav">
      <div className="container px-5 gap-4">
        <a className="navbar-brand fw-bold" href="/">
          <img src={assets.logoNthome} alt="Logo" className="img-fluid w-5 me-2" />
          NthomeRidez
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
            <li className="nav-item"><Link to="/" className="nav-link me-lg-3">Home</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link me-lg-3">About</Link></li>
            <li className="nav-item"><Link to="/contact" className="nav-link me-lg-3">Contact</Link></li>
            <li className="nav-item"><Link to="/drivers" className="nav-link me-lg-3">Driving</Link></li>
            <li className="nav-item dropdown">
              <button className="btn btn-gray dropdown-toggle" onClick={toggleSiteDropdown}>
                Services
              </button>
              {isSiteDropdownOpen && (
                <div className="dropdown-wrapper">
                  <div className="custom-dropdown-menu">
                    <Link to="/nthomeair" className="custom-dropdown-item">NthomeAir</Link>
                    <Link to="/food" className="custom-dropdown-item">NthomeFood</Link>
                  </div>
                </div>
              )}
            </li>
            <li className="nav-item"><Link to="/customers" className="nav-link me-lg-3">Requesting</Link></li>
            {roles === "admin" && (
              <li className="nav-item"><Link to="/adminapp" className="nav-link me-lg-3">Dashboard</Link></li>
            )}
            <li className="nav-item">
              {roles === "admin" || roles === "driver" || roles === "customer" ? (
                <Link to="/logout" onClick={handleLogout} className="nav-link me-lg-3">Logout</Link>
              ) : (
                <Link to="/login" className="nav-link me-lg-3">Login</Link>
              )}
            </li>
          </ul>
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between">
            {roles === "driver" && (
              <Link to="/search">
                <button onClick={handleRideWithUs} className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0">
                  <span className="small">Drive with us</span>
                </button>
              </Link>
            )}
            {roles === "customer" && (
              <>
                <Link to="/search">
                  <button onClick={handleRideWithUs} className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0">
                    <span className="small">Ride with us</span>
                  </button>
                </Link>
                {/* <Link to="/cards">
                  <button className="btn btn-secondary rounded-pill px-3 mb-2 mb-lg-0">
                    <span className="small">Payment</span>
                  </button>
                </Link> */}
              </>
            )}
            {(roles === "customer" || roles === "driver") && userName && (
              <div className="profile-container mt-2 mt-lg-0 d-flex align-items-center">
                <button className="btn btn-light d-flex align-items-center justify-content-center me-2 profile-btn" onClick={toggleDropdown}>
                  <img src={`http://localhost:8085/profile_pictures/${profilePicture}` || 'defaultProfilePictureUrl'} alt="Profile" className="rounded-circle profile-img" />
                </button>
                {isDropdownOpen && (
                  <div className="nav-dropdown-menu">
                    <Link to={roles === "driver" ? "/profile-driver" : "/profile-customer"} className="dropdown-item">
                      Profile {userName && `(${userName})`} {/* Display name in brackets */}
                    </Link>
                    {roles === "driver" && (
                      <>
                        <Link to="/state" className="dropdown-item">State</Link>
                        <Link to="/wallet" className="dropdown-item">My Wallet</Link> {/* Added button for drivers */}
                      </>
                    )}
                    <Link to="/CustomerTripHistory" className="dropdown-item">My Trips <FaRoute className="me-1" /></Link>
                    {/* {roles === "customer" && (
                      <Link to="/cards" className="dropdown-item">Payment</Link>
                    )} */}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
