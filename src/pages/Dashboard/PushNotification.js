import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminApp from './AdminApp';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast for notifications

const PushNotifications = () => {
    // State to store the list of notifications and input values
    const [notifications, setNotifications] = useState([]);
    const [message, setMessage] = useState('');
    const [recipient, setRecipient] = useState('driver');

    // Function to fetch notifications from the backend API
    const fetchNotifications = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/notifications');
            if (response.data.success) {
                setNotifications(response.data.notifications); // Update state with fetched notifications
            } else {
                console.error('Failed to fetch notifications:', response.data.message);
                toast.error('Failed to fetch notifications'); // Display error toast
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
            toast.error('Error fetching notifications'); // Display error toast
        }
    };

    // Fetch notifications when the component mounts
    useEffect(() => {
        fetchNotifications();
    }, []);

    // Function to handle sending a notification
    const handleSend = async () => {
        try {
            const response = await axios.post('http://localhost:8085/api/send-email', {
                role: recipient,
                message: message
            });
            if (response.data.success) {
                // Update notifications state with the newly sent notification
                setNotifications([
                    ...notifications,
                    {
                        No: notifications.length + 1,
                        MessageTo: recipient,
                        Message: message,
                        DateSent: new Date().toISOString().slice(0, 19).replace('T', ' ')
                    }
                ]);
                setMessage(''); // Clear the message input field
                toast.success('Notification sent successfully!'); // Display success toast
            } else {
                toast.error('Failed to send notification. Please check the console for more details.'); // Display error toast
            }
        } catch (error) {
            console.error('Error sending notification:', error);
            toast.error('Failed to send notification. Please check the console for more details.'); // Display error toast
        }
    };

    return (
        <AdminApp>
            <div className="container py-4 mb-5 mt-4">
                <Toaster /> {/* Ensure Toaster is included to display toast notifications */}
                <div className="d-flex justify-content-between mb-3">
                    <div>
                        <Link to="/adminapp" className="btn btn-outline-primary float-left py- mb-">Back</Link> {/* Back button */}
                    </div>
                </div>
                <div className="mb-4">
                    {/* Dropdown to select the recipient of the notification */}
                    <div className="form-group">
                        <h2 className="mb-4 text-dark">Send To*</h2>
                        <select
                            id="recipient"
                            className="form-control"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                        >
                            <option value="driver">Driver</option>
                            <option value="customer">Customer</option>
                        </select>
                    </div>
                    {/* Textarea for entering the notification message */}
                    <h2 className="mb-4 py-3 text-dark">Push Message*</h2>
                    <div className="form-group">
                        <textarea
                            id="message"
                            className="form-control"
                            rows="3"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>
                    {/* Button to send the notification */}
                    <button className="btn btn-primary mt-3" onClick={handleSend}>
                        Send Notification
                    </button>
                </div>

                {/* Table to display sent notifications */}
                <h2 className="mb-4 text-dark">Sent Notifications</h2>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Message To</th>
                                <th>Message</th>
                                <th>Date Sent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notifications.map((notification) => (
                                <tr key={notification.No}>
                                    <td>{notification.No}</td>
                                    <td>{notification.MessageTo}</td>
                                    <td>{notification.Message}</td>
                                    <td>{notification.DateSent}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminApp>
    );
};

export default PushNotifications;
