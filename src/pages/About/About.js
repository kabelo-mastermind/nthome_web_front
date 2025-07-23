import React from 'react'
import { assets } from '../../assets/assets'
   

const About = () => {
  return (
    <div>
      {/* hero */}
      <div className="about-us-hero-banner">
        <div className="overlay"></div> {/* Add overlay */}
        <div className="text-container">
          <h1>WELCOME TO NTHOME COURIER</h1>
          {/* <p>
            The Nthome Ride aims to address safety and affordability challenges.
          </p> */}
        </div>
      </div>
      {/* endv of hero */}
      <div className="px-4 py-5 my-1 text-center">
        <div className="col-lg-6 mx-auto">
          <img className="d-block mx-auto mb-4" src={assets.logo} alt="" width="400" height="110" />
          <p className="lead mb-">
            The Nthome Ride aims to address safety and affordability challenges. By incorporating safety features, affordable driver subscriptions, dynamic pricing, support programs, and ongoing improvements, the goal is to create a secure, financially viable environment, enhancing trust and satisfaction for all stakeholders.
          </p>
        </div>
      </div>
      <div className="p-5 text-center bg-body-tertiary rounded-3">
        {/* <svg className="bi mt-4 mb-3" style={{ color: "var(--bs-indigo)" }} width="100" height="100"><use xlinkHref="#bootstrap"></use></svg> */}
        <h1 className="text-body-emphasis">About Us</h1>
        <p className="col-lg-8 mx-auto fs-5 text-muted">
          A growing courier, delivery, and e-hailing service, founded in 2019, primarily operating in Mamelodi, Pretoria. Specializes in the delivery of food and parcels.
          Employs few contractors and aims to grow operations and improve services. Plans to implement an e-hailing ride system and provide better benefits for drivers, ensuring a smoother experience for customers.
        </p>
      </div>
      <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom">Why Choose Us?</h2>

        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            </div>
            <h3 className="fs-2 text-body-emphasis">Professional</h3>
            <p>Elevate Your Move: Where Care Meets Efficiency. Experience Our Professionalism Today</p>
          </div>

          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            </div>
            <h3 className="fs-2 text-body-emphasis">Countrywide</h3>
            <p>We offer a range of services tailored to your needs, whether you're commuting across town or traveling long distances. Our drivers are equipped to handle everything from pick-ups to drop-offs, ensuring a seamless journey for you. With transparent pricing and no hidden fees, you can trust that you're getting a fair and competitive rate for our services. Get started with a quote today!</p>
          </div>

          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            </div>
            <h3 className="fs-2 text-body-emphasis">Personal Touch</h3>
            <p>At our essence, we believe that e-hailing should be an exhilarating and enjoyable experience, not a burdensome one. By delivering outstanding e-hailing services, we aim to transform the perception of e-hailing and deliver a superior, more tailored experience for our passengers. Reach out to us today to discover how we can assist you with your next journey. Request a quote now and let us elevate your e-hailing experience!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

