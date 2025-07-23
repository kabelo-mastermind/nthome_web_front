import React, { useContext, useEffect, useState } from 'react';
import InputItem from './Input1';
import { SourceContext } from '../../Context/SourceContext';
import { DestinationContext } from '../../Context/DestinationContext';
import CarListOptions from './CarListOptions';
import PaymentModal from '../Modal/PaymentModal';
// import InputItem from './InputItem';
import axios from 'axios';

const SearchSection1 = ({ userId, customerName, emails }) => {
    const { source, setSource } = useContext(SourceContext);
    const { destination, setDestination } = useContext(DestinationContext);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState('');

    const [distance, setDistance] = useState(null); // Initialize distance as null

    // useEffect(() => {
    //     if (source) {
    //         console.log("+++++++++++++",source);
    //     }
    //     if (destination) {
    //         console.log("+++++++++++++",destination);
    //     }
    // }, [source, destination]);

    const calculateDistance = () => {
        if (!source || !destination || !window.google) return; // Ensure google is available

        const dist = window.google.maps.geometry.spherical.computeDistanceBetween(
            new window.google.maps.LatLng(source.lat, source.lng),
            new window.google.maps.LatLng(destination.lat, destination.lng)
        );

        setDistance(dist / 1000); // Set distance in meters
    };
    // Check trip status and update payment modal visibility
    useEffect(() => {
        const checkTripStatus = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:8085/api/trips/latest/${userId}`);
                    const trip = response.data;

                    if (trip) {
                        sessionStorage.setItem('tripId', trip.id);

                        if (trip.payment_status === 'No') {
                            setShowPaymentModal(true);

                            const driverResponse = await axios.get(`http://localhost:8085/api/drivers/${trip.driverId}/payment-url`);
                            const driverData = driverResponse.data;

                            setPaymentUrl(driverData.URL_payment || '');
                        } else if (trip.payment_status === 'Yes') {
                            setShowPaymentModal(false);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching trip status:', error);
                }
            }
        };

        checkTripStatus();
        const intervalId = setInterval(checkTripStatus, 10000); // Check every 10 seconds
        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [userId]);

    return (
        <div className='mt-5'>
            <div className='container mt-5'>
                <h1 className='text-lg md:text-2xl text-dark font-bold'>Get a ride</h1>
                <div className='p-3 md:p-5 border border-1 rounded-xl'>
                    <InputItem type='source' setCoordinate={setSource} />
                    <InputItem type='destination' setCoordinate={setDestination} />

                    <button
                        className='btn btn-primary w-100 mt-4'
                        onClick={calculateDistance}
                    >
                        Search
                    </button>
                </div>
                {/* Conditionally render CarListOptions component if distance is calculated */}
                {distance !== null && (
                    <CarListOptions
                        distance={distance}
                        pickup={source}
                        dropOff={destination}
                        customerId={userId}
                        customerName={customerName}
                        emails={emails}
                        setShowPaymentModal={setShowPaymentModal}
                    />
                )}
                {/* Conditionally render PaymentModal component if payment modal should be shown */}
                {showPaymentModal && (
                    <PaymentModal
                        isOpen={showPaymentModal}
                        onClose={() => setShowPaymentModal(false)}
                        paymentUrl={paymentUrl}
                    />
                )}
            </div>
        </div>
    );
};

export default SearchSection1;
