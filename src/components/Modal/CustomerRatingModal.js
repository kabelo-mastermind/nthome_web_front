import React, { useState } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
// import './CustomerRatingModal.css'; // Import the CSS file for styling

const CustomerRatingModal = ({ userId, isOpen, onClose, onFeedbackSubmit }) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      setMessage('Rating is required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8085/api/feedback', {
        userId,
        content: content || '', // Ensure content is always a string
        rating
      });
      setMessage(response.data.message);
      setContent(''); // Reset content field
      setRating(0); // Reset rating field
      onFeedbackSubmit(); // Call the callback after successful submission
    } catch (error) {
      setMessage('Error submitting feedback');
      console.error('Error submitting feedback:', error.response?.data || error.message || error);
    }
  };

  return (
    <div className={`rating-modal-overlay ${isOpen ? 'show' : ''}`}>
      <div className="rating-modal-content">
        <button className="rating-close-button" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Rate Your Ride</h2>
        {message && <p className="feedback-message">{message}</p>}
        <div className="rating-container">
          <ReactStars
            count={5}
            onChange={handleRatingChange}
            size={50} // Increased size for the stars
            activeColor="#ffd700"
            value={rating}
          />
        </div>
        <textarea
          placeholder="(Optional) Enter your feedback"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ width: '100%' }}
        ></textarea>
        <button
          className="bg-success hover:bg-success text-white font-bold py-2 px-4 rounded-lg"
          style={{ width: '100%' }}
          onClick={handleSubmit}
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default CustomerRatingModal;
