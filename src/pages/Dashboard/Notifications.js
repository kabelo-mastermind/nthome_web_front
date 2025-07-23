import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillBellFill, BsTrash } from 'react-icons/bs';
import './AdminApp.css';
import { Link } from 'react-router-dom';
import AdminApp from './AdminApp';

function MessagePage() {
    const [messages, setMessages] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) {
            return '';
        }
        const options = {
            timeZone: 'Africa/Johannesburg',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        return new Intl.DateTimeFormat('en-ZA', options).format(date);
    };

    useEffect(() => {
        fetchMessages();
        fetchSubscriptions();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8085/messages/all');
            setMessages(response.data.messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const fetchSubscriptions = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/fetchsubscriptions');
            const formattedSubscriptions = response.data.subscriptions.map((subscription) => ({
                id: subscription.id,
                email: 'Subscription',
                subject: `New Driver: ${subscription.driverName} (${subscription.driverEmail})`,
                message: 'A new driver has joined the platform.',
                created_at: subscription.created_at,
                status: 'read',
            }));
            setSubscriptions(formattedSubscriptions);
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
        }
    };

    const filterMessages = (messages) => {
        if (!searchQuery) return messages;
        return messages.filter((message) =>
            message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            message.message.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const combinedNotifications = [...messages, ...subscriptions];
    const filteredNotifications = filterMessages(combinedNotifications);

    const selectMessage = (message) => {
        setSelectedMessage(message);
        if (message.status === 'unread') {
            markMessageAsRead(message.id);
        }
    };

    const markMessageAsRead = async (messageId) => {
        try {
            await axios.put(`http://localhost:8085/messages/${messageId}`);
            setMessages(messages.map(msg => (msg.id === messageId ? { ...msg, status: 'read' } : msg)));
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    };

    const deleteMessage = async (messageId) => {
        try {
            await axios.delete(`http://localhost:8085/messages/${messageId}`);
            setMessages(messages.filter(message => message.id !== messageId));
            setSelectedMessage(null);
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    return (
        <AdminApp>
            <div className="container mb-5">
                <div>
                    <Link to="/adminapp" className="btn btn-outline-primary float-left py-2 mb-5 mt-5">Back</Link>
                </div>

                <div className="row">
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">
                                    <BsFillBellFill className="icon me-2" />
                                    Inbox
                                </h5>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search messages"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="list-group list-group-flush">
                                {filteredNotifications.map((message) => (
                                    <button
                                        key={message.id}
                                        className={`list-group-item list-group-item-action ${selectedMessage === message ? 'active' : ''} ${message.status === 'unread' ? 'unread' : ''}`}
                                        onClick={() => selectMessage(message)}
                                    >
                                        <div className="row">
                                            <div className="col">
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1 text-truncate" style={{ maxWidth: '200px' }}>
                                                        {message.email}
                                                    </h5>
                                                    <small className="text-dark">
                                                        {formatDateTime(message.contact_date)} {formatDateTime(message.created_at)}
                                                    </small>
                                                </div>
                                                <p className="mb-1">{message.subject}</p>
                                                <small className="text-muted">{message.message.substring(0, 50)}...</small>
                                                {message.status === 'unread' && <span className="badge bg-success">U</span>}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        {selectedMessage ? (
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">{selectedMessage.subject}</h5>
                                    <div className="d-flex align-items-center">
                                        <span>{selectedMessage.email}</span>
                                        <span className="ms-auto">{formatDateTime(selectedMessage.created_at)}</span>
                                        <button
                                            className="btn btn-sm btn-danger ms-3"
                                            onClick={() => deleteMessage(selectedMessage.id)}
                                        >
                                            <BsTrash className="me-1" /> Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p>{selectedMessage.message}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Select a message</h5>
                                    <p className="card-text">Click on a message to view details.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminApp>
    );
}

export default MessagePage;
