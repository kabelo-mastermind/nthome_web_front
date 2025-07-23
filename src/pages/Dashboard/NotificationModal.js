import React from 'react';
import './AdminApp.css';

const NotificationModal = () => {
      // Sample message data
      const message = {
        subject: 'Meeting Reminder',
        sender: 'John Doe',
        receiver: 'Jane Smith',
        date: '2024-06-07',
        content: 'Just a reminder about our meeting tomorrow at 10:00 AM. See you there!'
    };

    return (
        <div className="container py-5 mt-5">
        <div className="card">
            <div className="card-header bg-primary text-white">
                <h5 className="card-title">{message.subject}</h5>
            </div>
            <div className="card-body">
                <p><strong>From:</strong> {message.sender}</p>
                <p><strong>To:</strong> {message.receiver}</p>
                <p><strong>Date:</strong> {message.date}</p>
                <hr />
                <p className="card-text">{message.content}</p>
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-secondary" onClick={() => window.location.href = '/notifications'}>Close</button>
                {/* <button type="button" className="btn btn-primary" onClick={() => window.location.href = '/notifications'}>
                    Go to Page
                </button> */}
            </div>
        </div>
    </div>
    );
};

export default NotificationModal;
