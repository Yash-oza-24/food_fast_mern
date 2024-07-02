/* eslint-disable jsx-a11y/anchor-is-valid */
// Footer.js
import React from 'react';
import logo from '../utils/Images/log.png'; // Adjust the path to your logo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-red-800 text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full sm:w-1/2 lg:w-1/3  flex flex-col items-center sm:items-start">
            <img src={logo} alt="Company Logo" className="h-32 text-white" style={{ filter: 'brightness(0) invert(2)' }} />
            <p className="text-md text-center ml-8 sm:text-left">
              We are a company dedicated to providing the best services and products to our customers.
            </p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 mt-8 sm:mt-0 flex flex-col items-center">
            <h5 className="text-lg font-bold mb-4 flex items-center">
              <FontAwesomeIcon className="mr-2" icon={faMapMarkerAlt} /> Follow Us
            </h5>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-200">
                <FontAwesomeIcon icon={faFacebookF} className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-gray-200">
                <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-gray-200">
                <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-gray-200">
                <FontAwesomeIcon icon={faLinkedinIn} className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 mt-8 sm:mt-0 flex flex-col items-center sm:items-start">
            <h5 className="text-lg font-bold mb-4">Contact Us</h5>
            <p className="text-sm flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> 1234 Street Name, City, State, 12345
            </p>
            <p className="text-sm flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Email: contact@company.com
            </p>
            <p className="text-sm flex items-center">
              <FontAwesomeIcon icon={faPhone} className="mr-2" /> Phone: (123) 456-7890
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm">&copy; 2024 Food Fast. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
