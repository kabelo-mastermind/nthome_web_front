import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StatePage.css'; // Import the CSS file for styling
import axios from 'axios';

const DriverState = ({ userId }) => {
    axios.defaults.withCredentials = true; // Ensure credentials are included in axios requests
    const [isOnline, setIsOnline] = useState(false); // State to track if the driver is online
    const [timeOnline, setTimeOnline] = useState({ hours: 0, minutes: 0, seconds: 0 }); // State to track time spent online
    const [timeRemaining, setTimeRemaining] = useState({ hours: 12, minutes: 0, seconds: 0 }); // State to track remaining time until offline
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State to control button disable state
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    // Function to fetch online time and update state
    const fetchOnlineData = async () => {
        try {
            const response = await axios.get(`http://localhost:8085/api/get-online-time/${userId}`);
            const { online_time, last_online_timestamp, state } = response.data;
            const [hours, minutes, seconds] = online_time.split(':').map(Number);
            setTimeOnline({ hours, minutes, seconds });

            const now = new Date();
            if (last_online_timestamp) {
                const lastOnlineDate = new Date(last_online_timestamp);
                const elapsedTimeInSeconds = Math.floor((now - lastOnlineDate) / 1000);
                const totalOnlineSeconds = (hours * 3600) + (minutes * 60) + seconds + elapsedTimeInSeconds;
                const totalSecondsIn12Hours = 12 * 3600;
                const remainingSeconds = Math.max(0, totalSecondsIn12Hours - totalOnlineSeconds);

                const remainingHours = Math.floor(remainingSeconds / 3600);
                const remainingMinutes = Math.floor((remainingSeconds % 3600) / 60);
                const remainingSecondsFinal = remainingSeconds % 60;

                setTimeRemaining({
                    hours: remainingHours,
                    minutes: remainingMinutes,
                    seconds: remainingSecondsFinal
                });

                setIsButtonDisabled(totalOnlineSeconds >= totalSecondsIn12Hours); // Disable button if online time exceeds 12 hours
            }

            setIsOnline(state === 'online'); // Update online state
        } catch (error) {
            console.error('Error fetching online time:', error); // Log error if fetching fails
        }
    };

    // Effect to fetch online data and set up polling
    useEffect(() => {
        fetchOnlineData(); // Fetch data on component mount
        const interval = setInterval(fetchOnlineData, 10000); // Poll every 10 seconds
        return () => clearInterval(interval); // Clean up polling on component unmount
    }, [userId]);

    // Effect to handle countdown when online
    useEffect(() => {
        let countdownInterval;

        if (isOnline) {
            countdownInterval = setInterval(() => {
                setTimeRemaining(prevRemaining => {
                    let { hours, minutes, seconds } = prevRemaining;

                    // Stop countdown when time reaches 0
                    if (hours === 0 && minutes === 0 && seconds === 0) {
                        clearInterval(countdownInterval);
                        setIsButtonDisabled(true); // Disable button when time is up
                        return prevRemaining; // Return unchanged state
                    }

                    // Decrement the time
                    if (seconds > 0) {
                        seconds -= 1;
                    } else if (minutes > 0) {
                        minutes -= 1;
                        seconds = 59;
                    } else if (hours > 0) {
                        hours -= 1;
                        minutes = 59;
                        seconds = 59;
                    }

                    return { hours, minutes, seconds };
                });
            }, 1000); // Update every second
        }

        return () => {
            clearInterval(countdownInterval); // Clean up interval on component unmount or isOnline change
        };
    }, [isOnline]);

    // Function to toggle driver state between online and offline
    const toggleState = async () => {
        const newState = !isOnline;
        try {
            const response = await axios.post('http://localhost:8085/api/update-state', {
                userId: userId,
                state: newState ? 'online' : 'offline'
            });
            if (response.data.success) {
                setIsOnline(newState);
                if (newState) {
                    // Reset time online and remaining time when going online
                    setTimeOnline({ hours: 0, minutes: 0, seconds: 0 });
                    setTimeRemaining({ hours: 12, minutes: 0, seconds: 0 });
                    setIsButtonDisabled(false);
                    navigate('/search'); // Redirect to /search when going online
                } else {
                    // Clear time calculations and refresh page when going offline
                    setTimeOnline(prev => ({ ...prev })); // Maintain current online time when going offline
                    window.location.reload(); // Refresh the page
                }
                fetchOnlineData(); // Fetch data again to ensure correct state
            }
        } catch (error) {
            console.error('Error updating state:', error); // Log error if updating state fails
        }
    };

    return (
        <div className="driver-state-container mb-5">
            <h1 className='text-dark'>Driver State</h1>
            <button
                className={`state-toggle ${isOnline ? 'online' : 'offline'}`} // Toggle button class based on state
                onClick={toggleState}
                disabled={isButtonDisabled} // Disable button if necessary
            >
                {isOnline ? 'Go Offline' : 'Go Online'}
            </button>
            <p className="status-info">Current Status: {isOnline ? 'Online' : 'Offline'}</p>
            <div>
                <p className="time-info">
                    Time Spent Online: {String(timeOnline.hours).padStart(2, '0')}h {String(timeOnline.minutes).padStart(2, '0')}m {String(timeOnline.seconds).padStart(2, '0')}s
                </p>
                <p className="time-remaining">
                    Time Remaining: {String(timeRemaining.hours).padStart(2, '0')}h {String(timeRemaining.minutes).padStart(2, '0')}m {String(timeRemaining.seconds).padStart(2, '0')}s
                </p>
            </div>
            <div className="driver-instructions">
                <h2>Driver Instructions</h2>
                <ul>
                    <li>You must be online for 12 hours a day.</li>
                    <li>After 12 hours of being online, your status will automatically change to offline.</li>
                    <li>Ensure that your vehicle is in good condition before starting a shift.</li>
                    <li>Always adhere to traffic rules and drive safely.</li>
                </ul>
            </div>

            <div className="driver-tips">
                <h2>Driver Tips</h2>
                <ul>
                    <li>Plan your breaks to maintain focus and avoid fatigue.</li>
                    <li>Keep your vehicle clean and presentable for a better passenger experience.</li>
                    <li>Be polite and courteous to passengers.</li>
                    <li>Stay updated with traffic and weather conditions to avoid delays.</li>
                </ul>
            </div>
        </div>
    );
};

export default DriverState;
