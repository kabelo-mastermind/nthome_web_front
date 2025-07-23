import React from "react";
import { assets } from "../../assets/assets";
import Questions from '../../components/sections/questions/questions';
import axios from 'axios';
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

export default function Pricing({ email, userId }) {

  // Function to handle subscription
  const handleSubscribe = async (name, interval, amount) => {
    // Log the email for debugging purposes
    console.log('email from pricing', email);

    // Create payload for the subscription request
    const payload = {
      name,
      interval,
      amount: amount*100,
      email,
      userId
    };

    try {
      // Make a POST request to the subscription endpoint
      const response = await axios.post('http://localhost:8085/api/subscribe', payload);
      console.log('Subscription response:', "response data:", response.data);

      // Extract authorization URL from the response
      const authorizationUrl = response.data.authorization_url || (response.data.data && response.data.data.authorization_url);

      if (authorizationUrl) {
        // Redirect to the authorization URL for payment
        window.location.href = authorizationUrl;
      } else {
        console.error('Authorization URL not found in response data:', response.data);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className='container-fluid mt-5'>
      {/* Hero Banner Section */}
      <div className="about-us-hero-banner-pricing ">
        <div className="overlay"></div> {/* Overlay for hero banner */}
        <div className="text-container">
          <h1>BECOME A DRIVER</h1>
          {/* Uncomment the following paragraph if needed */}
          {/* <p>
            The Nthome Ride aims to address safety and affordability challenges.
          </p> */}
        </div>
      </div>
      {/* End of Hero Banner Section */}

      {/* Features Section */}
      <div className='container py-5 mt-5 mb-5'>
        {/* Feature Section - Why Drive With NthomeRidez */}
        <section className="feature section pt-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 ml-auto justify-content-center">
                {/* Feature Mockup Image */}
                <div className="image-content" data-aos="fade-right">
                  <img className="img-fluid" src={assets.img2} alt="iphone" />
                </div>
              </div>
              <div className="col-lg-6 mr-auto align-self-center">
                <div className="feature-content">
                  {/* Feature Title */}
                  <h2>WHY DRIVE WITH NTHOMERIDEZ?</h2>
                  {/* Feature Description */}
                  <p className="desc">
                    At NthomeRidez, we value our drivers. We offer fair compensation, flexible subscription plans, and
                    prioritize safety with features like real-time tracking. With enforced working hour limits and a
                    dedicated support team, drivers can expect a balanced and secure environment to thrive in. Plus,
                    they have access to growth opportunities and rewards for their hard work and dedication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End of Feature Section */}

        {/* Security Feature Section */}
        <section className="feature section pt-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 ml-auto align-self-center">
                <div className="feature-content">
                  {/* Feature Title */}
                  <h2>SECURITY</h2>
                  {/* Feature Description */}
                  <p>
                    NThomeRidez prioritizes safety by offering several robust security features for both drivers and
                    passengers. The app includes an in-app emergency button, allowing drivers to quickly alert
                    emergency services if they encounter a dangerous situation. Real-time GPS tracking ensures that all
                    rides are monitored, enabling the company to respond swiftly to any issues. Both drivers and
                    passengers must verify their identities through the app, adding an extra layer of security. NThome
                    Ridez also provides 24/7 customer support to address any safety concerns or incidents promptly.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 mr-auto justify-content-center">
                {/* Feature Mockup Image */}
                <div className="image-content" data-aos="fade-left">
                  <img className="img-fluid" src={assets.img3} alt="ipad" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End of Security Feature Section */}

        {/* Flexible Working Hours Feature Section */}
        <section className="feature section pt-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mr-auto justify-content-center">
                {/* Feature Mockup Image */}
                <div className="image-content" data-aos="fade-left">
                  <img className="img-fluid" src={assets.img4} alt="ipad" />
                </div>
              </div>
              <div className="col-lg-6 ml-auto align-self-center">
                <div className="feature-content">
                  {/* Feature Title */}
                  <h2>FLEXIBLE WORKING HOURS</h2>
                  {/* Feature Description */}
                  <p>
                    For working hour restriction, NthomeRidez ensures driver well-being and road safety by
                    implementing a maximum of 12 hours of driving per day. This policy aims to prevent driver fatigue,
                    promote better work-life balance, and enhance overall road safety for both drivers and passengers.
                    By adhering to this restriction, drivers can maintain optimal performance and deliver a safe and
                    reliable service to customers, while also prioritizing their health and well-being.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End of Flexible Working Hours Feature Section */}

        {/* Services Section */}
        <section className="service section bg-gray">
          <div className="container-fluid p-0">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title">
                  <h2>READY TO DRIVE WITH US?</h2>
                  <p>Subscription Plan Types:</p>
                </div>
              </div>
            </div>
            <div className="row no-gutters">
              {/* Weekly Subscription Plan */}
              <div className="col-lg-12 mr-auto align-self-center">
                <div className="service-box">
                  <div className="row align-items-center">
                    <div className="col-md-6 col-xs-12">
                      <div className="service-item">
                        <i className="ti-bookmark icon"></i>
                        <h3>Weekly Plan</h3>
                        <p className="plan-details">Plan Name: Weekly Subscription</p>
                        <p className="plan-details">Duration: 1 week</p>
                        <p className="plan-details">Fee: 400 ZAR per week</p>
                        <p className="plan-description">
                          Affordable weekly plan for drivers who prefer short-term commitments. Ideal for part-time drivers or those testing the platform.
                        </p>
                      </div>
                    </div>
                    {/* Monthly Subscription Plan */}
                    <div className="col-md-6 col-xs-12">
                      <div className="service-item">
                        <i className="ti-bar-chart icon"></i>
                        <h3>Monthly Plan</h3>
                        <p className="plan-details">Plan Name: Monthly Subscription</p>
                        <p className="plan-details">Duration: 1 month</p>
                        <p className="plan-details">Fee: 1500 ZAR per month</p>
                        <p className="plan-description">
                          Cost-effective plan for dedicated drivers. Best suited for full-time drivers looking for a longer-term commitment. Benefits: Full access to the NthomeRidez platform, eligibility for monthly incentives and bonuses, priority support, and access to exclusive features.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End of Services Section */}

        {/* Document Upload Section */}
        <MDBContainer className="py-5">
          <div className="text-center">
            <h2 className="mb-4">
              <strong>Upload documents here!</strong>
            </h2>
            <p>Click the button to upload required documents</p>
          </div>
          {/* Upload Documents Card */}
          <MDBRow className="justify-content-center">
            <MDBCol md="auto" className="mb-4">
              <MDBCard>
                <MDBCardBody className="mx-2">
                  <a href="/driverUpload" className="btn btn-primary d-block mb-2 mt-3 text-capitalize">
                    Upload
                  </a>
                </MDBCardBody>
                <MDBCardFooter>
                  <p className="text-uppercase fw-bold" style={{ fontSize: "12px" }}>
                    Required Documents:
                  </p>
                  <MDBTypography listUnStyled className="mt-3 mb-1">
                    <MDBTypography listItem>
                      <MDBIcon fas icon="file-alt" className="me-2" />
                      Driver's License
                    </MDBTypography>
                    <MDBTypography listItem>
                      <MDBIcon fas icon="file-alt" className="me-2" />
                      Vehicle Registration
                    </MDBTypography>
                    <MDBTypography listItem>
                      <MDBIcon fas icon="file-alt" className="me-2" />
                      Proof of Insurance
                    </MDBTypography>
                  </MDBTypography>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        {/* End of Document Upload Section */}

        {/* Subscribe Buttons */}
        <MDBContainer className="text-center mt-5">
          {/* Weekly Subscription Button */}
          <MDBRow>
            <MDBCol md="6">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBCardTitle>Weekly Subscription</MDBCardTitle>
                  <MDBTypography variant="h5">400 ZAR</MDBTypography>
                  <button
                    onClick={() => handleSubscribe("Weekly Plan", "weekly", 400)}
                    className="btn btn-primary mt-3"
                  >
                    Subscribe
                  </button>
                </MDBCardBody>
                <MDBCardFooter>
                  <p
                    className="text-uppercase fw-bold"
                    style={{ fontSize: "12px" }}
                  >
                    Benefits
                  </p>


                  <MDBTypography listUnStyled className="mb-0 px-4">
                    <li className="mb-3">
                      <MDBIcon
                        fas
                        icon="check"
                        className="text-success me-3"
                      />
                      <small> Short-term Planning</small>
                    </li>
                    <li className="mb-3">
                      <MDBIcon
                        fas
                        icon="check"
                        className="text-success me-3"
                      />
                      <small>Immediate Earnings Stability</small>
                    </li>
                  </MDBTypography>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
            {/* Monthly Subscription Button */}
            <MDBCol md="6">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBCardTitle>Monthly Subscription</MDBCardTitle>
                  <MDBTypography variant="h5">1500 ZAR</MDBTypography>
                  <button
                    onClick={() => handleSubscribe("Monthly Plan", "monthly", 1500)}
                    className="btn btn-primary mt-3"
                  >
                    Subscribe
                  </button>
                </MDBCardBody>
                <MDBCardFooter>
                  <p
                    className="text-uppercase fw-bold"
                    style={{ fontSize: "12px" }}
                  >
                    Benefits
                  </p>

                  <MDBTypography listUnStyled className="mb-0 px-4">
                    <li className="mb-3">
                      <MDBIcon
                        fas
                        icon="check"
                        className="text-success me-3"
                      />
                      <small>Long-Term Stability</small>
                    </li>
                    <li className="mb-3">
                      <MDBIcon
                        fas
                        icon="check"
                        className="text-success me-3"
                      />
                      <small>Predictable Budgeting</small>
                    </li>
                  </MDBTypography>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        {/* End of Subscribe Buttons */}
      </div>
    </div>
  );
}
