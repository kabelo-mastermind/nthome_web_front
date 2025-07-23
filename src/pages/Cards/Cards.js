import React, { useState, useEffect } from "react";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster

const Cards = ({ userId, roles }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    userId: userId || "",
  });

  const [savedCards, setSavedCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      // Fetch saved cards for the logged-in user from the backend
      const fetchSavedCards = async () => {
        try {
          const response = await fetch(`http://localhost:8085/api/cards?userId=${userId}`);
          const data = await response.json();
          setSavedCards(data);
        } catch (error) {
          console.error("Failed to fetch saved cards:", error);
        }
      };

      fetchSavedCards();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber' && value.length > 16) {
      return; // Limit card number to 16 digits
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userId) {
      console.error("User ID is required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8085/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);

        // Fetch updated list of cards
        const updatedCards = await fetch(`http://localhost:8085/api/cards?userId=${userId}`);
        const updatedData = await updatedCards.json();
        setSavedCards(updatedData);

        setFormData({ cardNumber: "", expiry: "", cvv: "" });

        // Show success toast notification
        toast.success("Card details submitted successfully!");

        // Redirect after 2 seconds
        setTimeout(() => {
          if (roles === "driver") {
            navigate("/cashout");
          }
        }, 2000); // Delay for 2 seconds before redirect
      } else {
        toast.error("Failed to submit card details");
      }
    } catch (error) {
      toast.error("An error occurred while submitting card details");
      console.error("Error:", error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      const response = await fetch(`http://localhost:8085/api/cards/${cardId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedCards = await fetch(`http://localhost:8085/api/cards?userId=${userId}`);
        const updatedData = await updatedCards.json();
        setSavedCards(updatedData);
        toast.success("Card deleted successfully");
      } else {
        toast.error("Failed to delete card");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the card");
      console.error("Error deleting card:", error);
    }
  };

  const formatCardNumber = (cardNumber) => {
    return `**** **** **** ${cardNumber.slice(-4)}`;
  };

  const getCardIcon = (cardNumber) => {
    const firstDigit = cardNumber.charAt(0);
    if (firstDigit === "4") return <FaCcVisa />;
    if (firstDigit === "5") return <FaCcMastercard />;
    if (firstDigit === "3") return <FaCcAmex />;
    if (firstDigit === "6") return <FaCcDiscover />;
    return null; // Default or unknown card
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <Toaster /> {/* Add Toaster component to render the toast notifications */}
      <form className="bg-white p-4 rounded shadow mb-4" onSubmit={handleSubmit}>
        <div className="form-header mb-4">
          <h4 className="text-center">Credit Card Details</h4>
          <p className="text-muted text-center">
            Please note: Nthomeridez ensures that your payment information is securely stored and handled. Your card details will only be used for processing payments on our platform.
          </p>
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Payment Method Icons */}
        <div className="payment-icons text-center mb-3">
          <FaCcVisa size={40} className="mx-2" />
          <FaCcMastercard size={40} className="mx-2" />
          <FaCcAmex size={40} className="mx-2" />
          <FaCcDiscover size={40} className="mx-2" />
        </div>

        <button type="submit" className="btn btn-dark btn-block">
          Submit Card Details
        </button>
      </form>

      <div className="card-list w-100">
        <h5>Previously Added Cards</h5>
        <ul className="list-group">
          {savedCards.map((card, index) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
              <div>
                {getCardIcon(card.card_number)}
                {formatCardNumber(card.card_number)}
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCard(card.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-light p-3 mt-4 rounded">
        <h6>Important Information</h6>
        <p>
          At Nthomeridez, your card details are stored securely in compliance with industry standards and regulations. We use encryption and tokenization to ensure that your information is protected.
        </p>
        <p>
          We recommend that you never share your card information with anyone. For any issues or questions related to payments, feel free to contact our support team.
        </p>
      </div>
    </div>
  );
};

export default Cards;
