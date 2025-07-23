import React, { useState } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import toast, { Toaster } from 'react-hot-toast';
import './Feedback.css'; // Import the CSS file for styling

// Feedback component for submitting user feedback
const Feedback = ({ userId, roles}) => {
  // State to hold the feedback content
  const [content, setContent] = useState('');
  // State to hold the rating value
  const [rating, setRating] = useState(0);

  // Determine if the user is an admin based on roles
  // const isRoleArray = Array.isArray(roles);
  // const role = isRoleArray && roles.includes('admin') ? 'admin' : 'user';

  // Function to handle changes in the rating
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if the rating is provided
    if (!rating) {
      toast.error('Rating is required'); // Show error if rating is missing
      return;
    }

    try {
      // Send feedback data to the server
      const response = await axios.post('http://localhost:8085/api/feedback', {
        userId,
        content: content || '', // Ensure content is always a string
        rating,
        roles
      });
      toast.success(response.data.message || 'Feedback submitted successfully!'); // Show success message
      setContent(''); // Reset content field
      setRating(0); // Reset rating field
    } catch (error) {
      // Show error message if the request fails
      toast.error('Error submitting feedback');
      console.error('Error submitting feedback:', error.response?.data || error.message || error);
    }
  };

  return (
    <div className="feedback-container py-5 mt-6">
      <Toaster /> {/* Render toaster for displaying toast notifications */}
      <h2 className="feedback-title">We Value Your Feedback</h2>
      <div className="rating-container">
        <ReactStars
          count={5} // Number of stars to display
          onChange={handleRatingChange} // Callback function for rating changes
          size={50} // Size of the stars
          activeColor="#ffd700" // Color for active stars
          value={rating} // Current rating value
        />
      </div>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="content" className="form-label">Your Feedback</label>
          <textarea
            id="content"
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)} // Update content state on change
            placeholder="(Optional)"
          ></textarea>
        </div>
        <button type="submit" className="btn-submit">Send Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
