import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './CashOut.css';
import { Link } from 'lucide-react';

function CashOut({ totalEarnings }) {
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [hasCard, setHasCard] = useState(false);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCashOutClick = (e) => {
    e.preventDefault();
    const cashoutAmount = parseFloat(amount);

    if (isNaN(cashoutAmount) || cashoutAmount <= 0) {
      setError('Please enter a valid cashout amount.');
      toast.error('Please enter a valid cashout amount.');
    } else if (cashoutAmount > totalEarnings) {
      setError(`Cashout amount cannot exceed your total earnings of R${totalEarnings}.`);
      toast.error(`Cashout amount cannot exceed your total earnings of R${totalEarnings}.`);
    } else {
      setError('');
      toast.success(`Proceeding with cashout of R${cashoutAmount}`);
      console.log('Proceeding with cashout of: R', cashoutAmount);
    }
  };

  const handleAddCardClick = () => {
    navigate('/cards');
  };

  return (
    <div className="cashout-container mt-5 py-5">
      <div className="row mb-3">
        <div className="col-12 col-md-6 mb-2 mb-md-0">
          <Link to="/wallet" className="btn btn-outline-primary float-left py-2">Back</Link>
        </div>
      </div>
      <Toaster /> {/* Ensure this is rendered to show the toast notifications */}
      <form className="cashout-form">
        <div className="cashout-header">
          <h1>Cash Out Your Earnings</h1>
          <p>Total Earnings: <span className="total-earnings">R{totalEarnings}</span></p>
          <p>Please ensure the amount does not exceed your available earnings.</p>
        </div>

        <div className="cashout-input-section">
          <label htmlFor="amount">Cashout Amount</label>
          <div className="cashout-input-container">
            <span className="currency-symbol">R</span>
            <input
              type="text"
              name="amount"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={handleAmountChange}
              required
            />
          </div>
          <button
            type="button"
            name="cashout"
            className="cashout-submit-btn"
            onClick={handleCashOutClick}
          >
            Cash Out
          </button>
          {error && <div className="cashout-error-message">{error}</div>}
        </div>

        {!hasCard ? (
          <div className="cashout-add-card-section">
            <h2>No Card On File</h2>
            <p>Add your card to proceed with the cashout process.</p>
            <button
              type="button"
              className="cashout-add-card-btn"
              onClick={handleAddCardClick}
            >
              Add Card
            </button>
          </div>
        ) : (
          <div className="cashout-card-details">
            <h2>Enter Card Details</h2>
            <label htmlFor="cardName">Card Name</label>
            <input
              type="text"
              name="name"
              id="cardName"
              placeholder="Name on card"
              required
            />

            <label htmlFor="cardNum">Card Number</label>
            <input
              type="text"
              name="number"
              id="cardNum"
              placeholder="Card Number"
              required
            />

            <label htmlFor="date">Expiry Date</label>
            <input
              type="date"
              name="date"
              id="date"
              required
            />

            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              name="cvv"
              id="cvv"
              placeholder="CVV"
              required
            />
            <button
              type="submit"
              name="pay"
              className="cashout-pay-btn"
            >
              Pay
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default CashOut;
