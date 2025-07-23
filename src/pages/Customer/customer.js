import React from 'react';
import { assets } from "../../assets/assets";
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
import CallToAction from '../../components/sections/callToAction/CallToAction';
import Questions from '../../components/sections/questions/questions';

const Customer = () => {
    return (
        <div className='container-fluid  mt-5'>
                     {/* hero */}
      <div className="about-us-hero-banner-pricing ">
        <div className="overlay"></div> {/* Add overlay */}
        <div className="text-container">
          <h1>How Our E-hailing App Works</h1>
               
        </div>
      </div>
      {/* endv of hero */}

            {/* <MDBContainer className="py-5 ">
                <div className="text-center">
                    <h4 className="mb-4">
                        <strong>How Our E-hailing App Works</strong>
                    </h4>
                    <p>Discover the convenience and reliability of our e-hailing service.</p>
                </div>
            </MDBContainer> */}
            
            {/* How It Works Section */}
            <section className='me-5 me-5'>
            <div className="text-center">
                <h2>How It Works</h2>
                <p>Our e-hailing app provides a seamless experience for booking rides anytime, anywhere. Here's how it works:</p>
                
                </div><MDBRow className="justify-content-center">
                    <MDBCol md="auto" className="mb-4">
                        <MDBCard>
                            <MDBCardBody className="mx-2">
                                <MDBCardTitle className="my-2">1. Download the App</MDBCardTitle>
                                <p className="text-muted">
                                    Start by downloading our app from the App Store or Google Play Store.
                                </p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol md="auto" className="mb-4">
                        <MDBCard>
                            <MDBCardBody className="mx-2">
                                <MDBCardTitle className="my-2">2. Sign Up</MDBCardTitle>
                                <p className="text-muted">
                                    Create an account or sign in with your existing credentials.
                                </p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol md="auto" className="mb-4">
                        <MDBCard>
                            <MDBCardBody className="mx-2">
                                <MDBCardTitle className="my-2">3. Book a Ride</MDBCardTitle>
                                <p className="text-muted">
                                    Enter your pickup and drop-off locations, choose your ride option, and confirm your booking.
                                </p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol md="auto" className="mb-4">
                        <MDBCard>
                            <MDBCardBody className="mx-2">
                                <MDBCardTitle className="my-2">4. Track Your Ride</MDBCardTitle>
                                <p className="text-muted">
                                    Track your driver's location in real-time and receive notifications when they arrive.
                                </p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol md="auto" className="mb-4">
                        <MDBCard>
                            <MDBCardBody className="mx-2">
                                <MDBCardTitle className="my-2">5. Enjoy Your Ride</MDBCardTitle>
                                <p className="text-muted">
                                    Sit back, relax, and enjoy a comfortable and safe ride to your destination.
                                </p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </section>
<CallToAction />
            {/* What to Look Out For Section */}
            <section className='me-5 me-5'>
            <div className="text-center">
                <h2>What to Look Out For</h2>
                <p>For a smooth and pleasant experience, here are some things to keep in mind while using our e-hailing app:</p>
                </div><MDBRow className="justify-content-center">
                    <MDBCol md="auto" className="mb-4">
                        <MDBCard>
                            <MDBCardBody className="mx-2">
                                <MDBCardTitle className="my-2">Safety</MDBCardTitle>
                                <p className="text-muted">
                                    Ensure your safety by verifying the details of your driver and vehicle before getting in.
                                </p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol md="auto" className="mb-4">
                        <MDBCard>
                            <MDBCardBody className="mx-2">
                                <MDBCardTitle className="my-2">Fares</MDBCardTitle>
                                <p className="text-muted">
                                    Check the fare estimate before booking your ride and be aware of any surge pricing.
                                </p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol md="auto" className="mb-4">
                        <MDBCard>
                            <MDBCardBody className="mx-2">
                                <MDBCardTitle className="my-2">Feedback</MDBCardTitle>
                                <p className="text-muted">
                                    Share your feedback after each ride to help us improve our service quality.
                                </p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </section>
            <Questions />
        </div>
    );
}

export default Customer;
