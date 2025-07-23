import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DriverWallet.css';

const Wallet = ({ driverId }) => {
    const [transactions, setTransactions] = useState([]);
    const [view, setView] = useState('monthly');
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [gender, setGender] = useState('male'); // Assuming gender is either 'male' or 'female'
    const [visibleTransactionsCount, setVisibleTransactionsCount] = useState(5); // Start with 5 visible transactions
    const navigate = useNavigate();

    useEffect(() => {
        if (driverId) {
            console.log('Fetching transactions for driver ID:', driverId);
            axios.get(`http://localhost:8085/driver-wallet/${driverId}`)
                .then(response => {
                    console.log('Fetched transactions:', response.data);
                    setTransactions(response.data.transactions || []);
                })
                .catch(error => {
                    console.error('Error fetching driver transactions:', error);
                });
        } else {
            console.error('Driver ID is missing.');
        }
    }, [driverId]);

    const getFilteredTransactions = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const currentWeek = getCurrentWeekNumber(currentDate);

        return transactions.filter(transaction => {
            const transactionDate = new Date(transaction.requestDate);
            const transactionMonth = transactionDate.getMonth() + 1;
            const transactionWeek = getCurrentWeekNumber(transactionDate);
            const transactionYear = transactionDate.getFullYear();

            return view === 'monthly'
                ? transactionMonth === currentMonth && transactionYear === currentYear
                : transactionWeek === currentWeek && transactionYear === currentYear;
        });
    };

    const calculateEarnings = (filteredTransactions) => {
        return filteredTransactions.reduce((total, transaction) => {
            const amountStr = String(transaction.amount || '').replace(/[^0-9.-]/g, '');
            const numericValue = parseFloat(amountStr);
            return !isNaN(numericValue) ? total + numericValue : total;
        }, 0).toFixed(2);
    };
    
    const getCurrentWeekNumber = (date) => {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    // Get the filtered transactions based on the selected view
    const filteredTransactions = getFilteredTransactions();
    
    // Calculate total earnings based on filtered transactions
    const totalEarnings = calculateEarnings(filteredTransactions);

    // Handle transaction click to show details
    const handleTransactionClick = (transaction) => {
        setSelectedTransaction(transaction);
    };

    // Close modal for transaction details
    const closeModal = () => {
        setSelectedTransaction(null);
    };

    // Handle cashout navigation
    const handleCashout = () => {
        navigate('/cashout', { state: { totalEarnings } });
    };

    // Show more transactions when button is clicked
    const handleShowMoreTransactions = () => {
        setVisibleTransactionsCount(prevCount => prevCount + 5); // Increase by 5
    };

    return (
        <div className='mt-5 py-5'>
        <div className="wallet-container mt-5 py-5">
            <h1>My Wallet</h1>

            <div 
                className={`wallet-earnings ${gender === 'male' ? 'wallet-male-earnings' : 'wallet-female-earnings'}`} >
                <h2 className="wallet-monthly-transactions">{view === 'monthly' ? 'Total Monthly Earnings' : 'Total Weekly Earnings'}</h2>
                <h3 className='wallet-earnings-value'>Earnings: R{totalEarnings}</h3>
            </div>

            <div className="wallet-transactions">
                <h2 className="wallet-transaction-heading">Transactions ({view === 'monthly' ? 'This Month' : 'This Week'})</h2>

                <div className="wallet-view-toggle">
                    <button onClick={() => setView('monthly')} className={view === 'monthly' ? 'active' : ''}>
                        Monthly Earnings
                    </button>
                    <button onClick={() => setView('weekly')} className={view === 'weekly' ? 'active' : ''}>
                        Weekly Earnings
                    </button>
                </div>

                <ul>
                    {filteredTransactions.slice(0, visibleTransactionsCount).map(transaction => (
                        <li key={transaction.trip_id} className={String(transaction.amount).startsWith('-') ? 'wallet-negative' : 'wallet-positive'} onClick={() => handleTransactionClick(transaction)}>
                            <span>{formatDate(transaction.requestDate)}</span>
                            <span>{transaction.amount}</span>
                            <span>{transaction.description}</span>
                        </li>
                    ))}
                    
                    {filteredTransactions.length === 0 && (
                        <li>No transactions available.</li>
                    )}
                </ul>

                {/* New container for buttons */}
                <div className="wallet-button-container gap-2">
                    {visibleTransactionsCount < filteredTransactions.length && (
                        <button className="wallet-show-more-btn" onClick={handleShowMoreTransactions}>
                            Show More
                        </button>
                    )}
                    
                    <button className="wallet-cashout-btn" onClick={handleCashout}>
                        Cash Out
                    </button>
                </div>
            </div>

            {selectedTransaction && (
                <div className="wallet-modal">
                    <div className="wallet-modal-content">
                        <h2>Transaction Details</h2>
                        <p><strong>Date:</strong> {formatDate(selectedTransaction.requestDate)}</p>
                        <p><strong>Amount:</strong> {selectedTransaction.amount}</p>
                        <p><strong>Description:</strong> {selectedTransaction.description}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default Wallet;