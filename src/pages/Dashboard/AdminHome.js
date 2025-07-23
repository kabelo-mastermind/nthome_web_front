import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminApp.css';
import {
  BsFillArchiveFill, BsFillGrid3X3GapFill,
  BsPeopleFill, BsFillBellFill
} from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import AdminApp from './AdminApp';
import { Link } from 'react-router-dom';

function AdminHome() {
  // State hooks for managing various data and UI states
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering feedback
  const [feedbackData, setFeedbackData] = useState([]); // Feedback data from the backend
  const [visibleCount, setVisibleCount] = useState(5); // Number of feedback items to show initially
  const [subscriptions, setSubscriptions] = useState([]); // Subscription data for charts
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(true); // Loading state for subscriptions
  const [errorSubscriptions, setErrorSubscriptions] = useState(null); // Error state for subscriptions
  const [totalTrips, setTotalTrips] = useState(0); // Total number of trips
  const [cancelledTrips, setCancelledTrips] = useState(0); // Number of cancelled trips
  const [completedTrips, setCompletedTrips] = useState(0); // Number of completed trips
  const [totalPayments, setTotalPayments] = useState(0); // Total payment amount

  useEffect(() => {
    // Fetch feedback data from the backend
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/feedback');
        setFeedbackData(response.data); // Update feedback data state
      } catch (error) {
        console.error('Error fetching feedback:', error); // Log errors
      }
    };

    // Fetch subscriptions data from the backend
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/subscriptions');
        setSubscriptions(response.data); // Update subscriptions data state
        setLoadingSubscriptions(false); // Update loading state
      } catch (error) {
        setErrorSubscriptions('Error fetching subscriptions'); // Update error state
        setLoadingSubscriptions(false); // Update loading state
      }
    };

    // Fetch total trips count from the backend
    const fetchTotalTrips = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/trips/total');
        console.log('Total Trips Response:', response.data); // Log the response data
        setTotalTrips(response.data.total_trips); // Update total trips state

        if (response.data.total_trips === 0) {
          console.log('No trips found. Consider adding some trips to the database.'); // Log if no trips are found
        }
      } catch (error) {
        console.error('Error fetching total trips:', error.response ? error.response.data : error.message); // Log errors
      }
    };

    // Fetch cancelled trips count from the backend
    const fetchCancelledTrips = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/trips/cancelled');
        console.log('Cancelled Trips Response:', response.data); // Log the response data
        setCancelledTrips(response.data.cancelled_trips); // Update cancelled trips state

        if (response.data.cancelled_trips === 0) {
          console.log('No cancelled trips found.'); // Log if no cancelled trips are found
        }
      } catch (error) {
        console.error('Error fetching cancelled trips:', error.response ? error.response.data : error.message); // Log errors
      }
    };

    // Fetch completed trips count from the backend
    const fetchCompletedTrips = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/trips/completed');
        console.log('Completed Trips Response:', response.data); // Log the response data
        setCompletedTrips(response.data.completedTrips); // Update completed trips state

        if (response.data.completedTrips === 0) {
          console.log('No completed trips found.'); // Log if no completed trips are found
        }
      } catch (error) {
        console.error('Error fetching completed trips:', error.response ? error.response.data : error.message); // Log errors
      }
    };

    fetchFeedback();
    fetchSubscriptions();
    fetchTotalTrips();
    fetchCancelledTrips();
    fetchCompletedTrips();
  }, []); // Empty dependency array means this effect runs once on mount

  // Fetch total payments amount from the backend
  useEffect(() => {
    const fetchTotalPayments = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/trips/payments/total');
        setTotalPayments(response.data.total_payment); // Update total payments state
      } catch (error) {
        console.error('Error fetching total payments:', error.response ? error.response.data : error.message); // Log errors
      }
    };

    fetchTotalPayments();
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to convert createdAt timestamp to formatted date and time
  const convertTime = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  };

  // Filter feedback based on the search term and convert timestamp
  const filteredFeedbackData = feedbackData.filter(feedback =>
    feedback.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.createdAt.includes(searchTerm) ||
    feedback.role.toLowerCase().includes(searchTerm.toLowerCase())
  ).map(feedback => ({
    ...feedback,
    createdAt: convertTime(feedback.createdAt) // Convert createdAt to formatted date and time
  }));

  // Function to show more items in the feedback list
  const handleViewMore = () => {
    setVisibleCount(prevCount => prevCount + 5); // Increase visible count by 5
  };

  // Transform subscriptions data for chart visualization
  const transformData = () => {
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      name: new Date(0, i).toLocaleString('default', { month: 'long' }), // Generate month names
      cancelled: 0,
      Approved: 0,
    }));

    subscriptions.forEach(sub => {
      const month = new Date(sub.created_at).getMonth();
      if (sub.statuses === 1) {
        monthlyData[month].Approved += sub.amount; // Accumulate approved amounts
      } else {
        monthlyData[month].cancelled += sub.amount; // Accumulate cancelled amounts
      }
    });

    return monthlyData;
  };

  const chartData = transformData(); // Prepare data for charts

  return (
    <AdminApp>
      <main className='main-container'>
        <div className="row g-4">
          {/* Card for Total Number of Trips */}
          <div className="col-md-3">
            <div className="card bg-primary text-white rounded-3 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h5 className="card-title mb-2">Total No Of Trips</h5>
                    <h2 className="card-text fw-bold">{totalTrips}</h2>
                  </div>
                  <BsFillArchiveFill className="card-icon fs-1" />
                </div>
              </div>
              <div className="card-footer bg-primary border-0">
                <Link to="/trip" className="text-white text-decoration-none">
                  View Details
                </Link>
              </div>
            </div>
          </div>

          {/* Card for Cancelled Trips */}
          <div className="col-md-3">
            <div className="card bg-danger text-white rounded-3 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h5 className="card-title mb-2">Cancelled Trips</h5>
                    <h2 className="card-text fw-bold">{cancelledTrips}</h2>
                  </div>
                  <BsFillGrid3X3GapFill className="card-icon fs-1" />
                </div>
              </div>
              <div className="card-footer bg-danger border-0">
                <Link to="/cancelled" className="text-white text-decoration-none">
                  View Details
                </Link>
              </div>
            </div>
          </div>

          {/* Card for Completed Trips */}
          <div className="col-md-3">
            <div className="card bg-success text-white rounded-3 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h5 className="card-title mb-2">Completed Trips</h5>
                    <h2 className="card-text fw-bold">{completedTrips}</h2>
                  </div>
                  <BsPeopleFill className="card-icon fs-1" />
                </div>
              </div>
              <div className="card-footer bg-success border-0">
                <Link to="/completed" className="text-white text-decoration-none">
                  View Details
                </Link>
              </div>
            </div>
          </div>

          {/* Card for Total Payments */}
          <div className="col-md-3">
            <div className="card bg-warning text-dark rounded-3 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h5 className="card-title mb-2">Total Payments</h5>
                    <h2 className="card-text fw-bold">${totalPayments.toFixed(2)}</h2>
                  </div>
                  <BsFillBellFill className="card-icon fs-1" />
                </div>
              </div>
              <div className="card-footer bg-warning border-0">
                <Link to="/payments" className="text-dark text-decoration-none">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>

      

        {/* Charts Section */}
        <div className="charts-section mt-5">
          <h4 className="mb-4">Subscription Analytics</h4>
          {loadingSubscriptions ? (
            <p>Loading subscriptions data...</p>
          ) : errorSubscriptions ? (
            <p>{errorSubscriptions}</p>
          ) : (
            <div className="row">
              <div className="col-md-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Approved" fill="#82ca9d" />
                    <Bar dataKey="cancelled" fill="#ff6347" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="col-md-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Approved" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="cancelled" stroke="#ff6347" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
          {/* Feedback Section */}
          <div className="feedback-section">
          <h4 className="mb-4">Recent Feedback</h4>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />

          <ul className="list-group">
            {filteredFeedbackData.slice(0, visibleCount).map((feedback) => (
              <li key={feedback.id} className="list-group-item">
                <p className="mb-1"><strong>{feedback.role}</strong>: {feedback.content}</p>
                <small className="text-muted">{feedback.createdAt}</small>
              </li>
            ))}
          </ul>

          {filteredFeedbackData.length > visibleCount && (
            <button className="btn btn-primary mt-3" onClick={handleViewMore}>
              View More
            </button>
          )}
        </div>
      </main>
    </AdminApp>
  );
}

export default AdminHome;
