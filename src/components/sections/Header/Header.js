import React from 'react';
import demoScreen from '../../../assets/img/nthome.mp4'
import appBedge from '../../../assets/img/app-store-badge.svg'
import playBedge from '../../../assets/img/google-play-badge.svg'
// import portrait_black from '../../../assets/img/portrait_black.png'
const Header = () => {
    return (
        <header className="masthead">
            <div className="container px-5">
                <div className="row gx-5 align-items-center">
                    <div className="col-lg-6">
                        {/* Mashead text and app badges */}
                        <div className="mb-5 mb-lg-0 text-center text-lg-start">
                            <h1 className="display-1 lh-1 text-dark text-start mb-3">Ride Smart, just Send Me!</h1>
                            <p className="lead fw-normal text-muted mb-5">Experience peace of mind with our secure and affordable rides. We prioritize your safety while delivering unbeatable prices tailored to your needs. Enjoy effortless journeys with us today!</p>
                            <div className="d-flex flex-column flex-lg-row align-items-center">
                                <a className="me-lg-3 mb-4 mb-lg-0" href="#!"><img className="app-badge" src={playBedge} alt="..." /></a>
                                <a href="#!"><img className="app-badge" src={appBedge} alt="..." /></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        {/* Masthead device mockup feature */}
                        <div className="masthead-device-mockup">
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
                                        {/* PUT CONTENTS HERE: */}
                                        {/* This can be a video, image, or just about anything else. */}
                                        {/* Set the max width of your media to 100% and the height to 100% like the demo example below. */}
                                        <video muted="muted" autoPlay  style={{ maxWidth: '100%', height: '100%' }}>
                                            <source src={demoScreen} type="video/mp4" />
                                        </video>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
