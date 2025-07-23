import React from 'react';
import demoScreen from '../../../assets/img/nthome.mp4'

const AppFeatures = () => {
  return (
    <section id="features">
      <div className="container px-5">
        <div className="row gx-5 align-items-center">
          <div className="col-lg-8 order-lg-1 mb-5 mb-lg-0">
            <div className="container-fluid px-5">
              <div className="row gx-5">
                <div className="col-md-6 mb-5">
                  <div className="text-center">
                    <i className="bi bi-calendar icon-feature text-gradient d-block mb-3"></i>
                    <h3 className="font-alt">Booking a Ride</h3>
                    <p className="text-muted mb-0">Book your ride easily and ride hassle-free with us!</p>
                  </div>
                </div>
                <div className="col-md-6 mb-5">
                  <div className="text-center">
                    <i className="bi bi-arrow-right icon-feature text-gradient d-block mb-3"></i>
                    <h3 className="font-alt">Tracking the Ride</h3>
                    <p className="text-muted mb-0">Track your ride in real-time for peace of mind on every journey!</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-5 mb-md-0">
                  <div className="text-center">
                    <i className="bi bi-lock-fill icon-feature text-gradient d-block mb-3"></i>
                    <h3 className="font-alt">Secure Payments</h3>
                    <p className="text-muted mb-0">Enjoy worry-free transactions with our secure payment system!</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="text-center">
                    <i className=" bi bi-clock icon-feature text-gradient d-block mb-3"></i>
                    <h3 className="font-alt">24/7 Support</h3>
                    <p className="text-muted mb-0">Need assistance anytime? Count on our 24/7 support for all your queries!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 order-lg-0">
            <div className="features-device-mockup">
              <svg className="circle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="circleGradient" gradientTransform="rotate(45)">
                    <stop className="gradient-start-color" offset="0%"></stop>
                    <stop className="gradient-end-color" offset="100%"></stop>
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="50"></circle>
              </svg>
              <svg className="shape-1 d-none d-sm-block" viewBox="0 0 240.83 240.83" xmlns="http://www.w3.org/2000/svg">
                <rect x="-32.54" y="78.39" width="305.92" height="84.05" rx="42.03" transform="translate(120.42 -49.88) rotate(45)"></rect>
                <rect x="-32.54" y="78.39" width="305.92" height="84.05" rx="42.03" transform="translate(-49.88 120.42) rotate(-45)"></rect>
              </svg>
              <svg className="shape-2 d-none d-sm-block" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50"></circle>
              </svg>
              <div className="device-wrapper">
                <div className="device" data-device="iPhoneX" data-orientation="portrait" data-color="black">
                  <div className="screen bg-black">
                    <video muted autoPlay loop style={{ maxWidth: '100%', height: '100%' }}>
                      <source src={demoScreen} type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AppFeatures;
