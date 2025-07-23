import React, { useState, useEffect } from 'react';
import { BsFillBellFill, BsPersonCircle, BsJustify } from 'react-icons/bs';
import './AdminApp.css';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for HTTP requests

function AdminHeader({ toggleSidebar }) {
    const [notifications, setNotifications] = useState([]); // State for notifications/messages
    const [showNotifications, setShowNotifications] = useState(false);

    // Function to fetch messages from API
    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8085/messages'); // Replace with your API endpoint
            setNotifications(response.data.messages); // Assuming your API returns messages in an array under 'messages' key
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // Fetch messages on component mount
    useEffect(() => {
        fetchMessages();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Toggle notifications visibility
    const toggleNotifications = () => setShowNotifications(!showNotifications);

    return (
        <header className='header py-5 mt-5'>
            <div className='menu-icon'>
                <BsJustify className='icon' onClick={toggleSidebar} />
            </div>
            <div className='header-left'>
                {/* <BsSearch className='icon' /> */}
            </div>
            <div className='header-right'>
                <div className='dropdown'>
                    <div className='icon-container' onClick={toggleNotifications}>
                        <BsFillBellFill className='icon' />
                        {notifications.length > 0 && <span className='badge'>{notifications.length}</span>}
                    </div>
                    {showNotifications && (
                        <div className='dropdown-content'>
                            {notifications.length > 0 ? (
                                notifications.map((notification, index) => (
                                    <Link to={`/notifications/${notification.id}`} key={index} className='dropdown-item'>
                                        {notification.message}
                                    </Link>
                                ))
                            ) : (
                                <Link to={`/notifications`} className='dropdown-item'>No notifications</Link>
                            )}
                        </div>
                    )}
                </div>
                {/* <BsPersonCircle className='icon' /> */}
            </div>
        </header>
    );
}

export default AdminHeader;
