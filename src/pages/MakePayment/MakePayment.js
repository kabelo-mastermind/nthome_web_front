import React, { useState } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBTypography,
    MDBIcon,
    MDBCardTitle,
} from "mdb-react-ui-kit";
import { PaystackButton } from 'react-paystack';

const MakePayment = () => {
    // Public key for Paystack payment integration
    const publicKey = process.env.REACT_APP_PAYMENT;
    
    // State variables for payment form
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [showForm, setShowForm] = useState(false);

    // Log public key for debugging purposes
    console.log("public Key:", publicKey);

    // Props for PaystackButton component
    const componentProps = {
        email,
        amount: amount * 100, // Amount is converted to the smallest currency unit (e.g., cents)
        metadata: {
            name,
            phone,
        },
        publicKey,
        text: "Pay Now", // Text displayed on the payment button
        onSuccess: () => alert("Thanks for donating to us! we do not take it for granted!!"), // Success alert
        onClose: () => alert("Wait! You need to donate, don't go!!!!"), // Alert if user closes the payment modal
    };

    return (
        <div className='container mt-5'>
            {/* Payment Methods Section */}
            <MDBContainer className="py-5">
                <div className="text-center">
                    <h2 className="mb-4">
                        <strong>Be one of us!</strong>
                    </h2>
                    <p>Join our exclusive e-hailing subscription service today!</p>
                </div>
                <MDBRow className="justify-content-center">
                    {/* Basic Plan Card */}
                    <MDBCol md="auto" className="mb-4">
                        <MDBCard>
                            <MDBCardBody className="mx-2">
                                <MDBCardTitle className="my-2">Plan</MDBCardTitle>
                                <p className="text-muted">
                                    Subscription per week for unlimited e-hailing services.
                                </p>
                                <p className="h2 fw-bold">
                                    R400
                                    <small className="text-muted" style={{ fontSize: "18px" }}>
                                        /weekly
                                    </small>
                                </p>
                                <a
                                    href="https://paystack.com/pay/nthomepay"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary d-block mb-2 mt-3 text-capitalize"
                                >
                                    Go Basic
                                </a>
                            </MDBCardBody>

                            <MDBCardFooter>
                                <p className="text-uppercase fw-bold" style={{ fontSize: "12px" }}>
                                    Benefits
                                </p>

                                <MDBTypography listUnStyled className="mb-0 px-4">
                                    <li className="mb-3">
                                        <MDBIcon fas icon="check" className="text-success me-3" />
                                        <small> Short-term Planning</small>
                                    </li>
                                    <li className="mb-3">
                                        <MDBIcon fas icon="check" className="text-success me-3" />
                                        <small>Immediate Earnings Stability</small>
                                    </li>
                                </MDBTypography>
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>

                    {/* Premium Plan Card */}
                    <MDBCol md="auto" className="mb-4">
                        <MDBCard>
                            <MDBCardBody className="mx-2">
                                <MDBCardTitle className="my-2">Plan</MDBCardTitle>
                                <p className="text-muted">
                                    Subscription per month for unlimited e-hailing services.
                                </p>
                                <p className="h2 fw-bold">
                                    R1500
                                    <small className="text-muted" style={{ fontSize: "18px" }}>
                                        /monthly
                                    </small>
                                </p>
                                <a
                                    href="https://paystack.com/pay/nthomepay2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary d-block mb-2 mt-3 text-capitalize"
                                >
                                    Go Premium
                                </a>
                            </MDBCardBody>

                            <MDBCardFooter>
                                <p className="text-uppercase fw-bold" style={{ fontSize: "12px" }}>
                                    Benefits
                                </p>

                                <MDBTypography listUnStyled className="mb-0 px-4">
                                    <li className="mb-3">
                                        <MDBIcon fas icon="check" className="text-success me-3" />
                                        <small>Long-Term Stability</small>
                                    </li>
                                    <li className="mb-3">
                                        <MDBIcon fas icon="check" className="text-success me-3" />
                                        <small>Predictable Budgeting</small>
                                    </li>
                                </MDBTypography>
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            {/* Accepted Payment Methods Section */}
            <section>
                <h2>Accepted Payment Methods</h2>
                <p>We accept a variety of secure payment methods to make subscribing easy and convenient for you. You can pay for your subscription using any major credit or debit card, including Visa, Mastercard, and American Express. Additionally, we support popular digital payment options such as PayPal and Apple Pay, ensuring a seamless checkout experience.</p>
                <p>Rest assured, all transactions are encrypted and processed securely to protect your sensitive payment information. Please note that subscriptions are set to automatically renew unless canceled, providing uninterrupted access to our services. You can manage your payment preferences and update your billing information at any time through your account settings.</p>
            </section>

            {/* Cancellation Policy Section */}
            <section>
                <h2>Cancellation Policy</h2>
                <p>We understand that circumstances may change, and you may need to cancel your subscription. Our cancellation process is simple and hassle-free. To cancel your subscription, simply log in to your account and navigate to the subscription management section. From there, you can initiate the cancellation process with just a few clicks.</p>
                <p>Please note that cancellations must be made at least 48 hours before your next billing cycle to avoid being charged for the upcoming period. Once canceled, you'll receive a confirmation email, and your access to subscription benefits will continue until the end of the current billing cycle.</p>
                <p>We do not offer refunds for partially used subscription periods, but you'll retain access to your subscription benefits until the end of the prepaid period. If you have any questions or need assistance with the cancellation process, our customer support team is here to help you every step of the way.</p>
            </section>
        </div>
    );
}

export default MakePayment;
