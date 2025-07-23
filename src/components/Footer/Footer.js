import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 bottom-0 w-100">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/about" className="text-white">About</a></li>
              <li><a href="/drivers" className="text-white">Driving</a></li>
              <li><a href="/customers" className="text-white">Requesting</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <h5>Resources</h5>
            <ul className="list-unstyled">
              <li><a href="/feedback" className="text-white">Feedback</a></li>
              <li><a href="#!" className="text-white">Documentation</a></li>
              <li><a href="/contact" className="text-white">Support</a></li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-3 mb-md-0">
            <h5>Services</h5>
            <ul className="list-unstyled">
              <li><a href="/nthomeair" className="text-white">NthomeAir</a></li>
              <li><a href="/food" className="text-white">NthomeFood</a></li>
              {/* <li><a href="/service3" className="text-white">Service 3</a></li> */}
            </ul>
          </div>

          <div className="col-md-3">
            <h5>Legal</h5>
            <ul className="list-unstyled">
              <li><a href="#!" className="text-white">Privacy Policy</a></li>
              <li><a href="#!" className="text-white">Terms of Service</a></li>
              <li><a href="#!" className="text-white">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col text-center">
            <h5>Follow Us</h5>
            <div>
              <a href="https://www.facebook.com" className="text-white me-3" aria-label="Facebook"><FaFacebook size={24} /></a>
              <a href="https://www.twitter.com" className="text-white me-3" aria-label="Twitter"><FaTwitter size={24} /></a>
              <a href="https://www.instagram.com" className="text-white me-3" aria-label="Instagram"><FaInstagram size={24} /></a>
              <a href="https://www.linkedin.com" className="text-white" aria-label="LinkedIn"><FaLinkedin size={24} /></a>
            </div>
          </div>
        </div>
        <div className="text-white-50 small text-center mt-4">
          <div className="mb-2">&copy; Nthome Ridez 2024. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
