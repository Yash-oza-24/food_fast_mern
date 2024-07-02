/* eslint-disable jsx-a11y/iframe-has-title */
// ContactPage.js
import React from 'react';

const ContactPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      <div className="w-full max-w-4xl bg-white p-8 shadow-md rounded-lg">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Our Location</h2>
          <div className="w-full h-64  mb-4">

            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.0746152729516!2d73.13163537431872!3d21.069681880589854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be060e07393bc51%3A0xf96e044991e337e9!2sUKA%20TARSADIA%20University!5e0!3m2!1sen!2sin!4v1719591262847!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Visit Us</h2>
          <p className="text-md mb-4">
            We are located at 1234 Street Name, City, State, 12345. You can visit us from Monday to Friday between 9 AM and 5 PM. Our office is easily accessible by public transport and there is ample parking available for visitors.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Take the metro to XYZ station.</li>
            <li>From the station, walk north for about 10 minutes.</li>
            <li>Our building is located on the left side of the street.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Contact Information</h2>
          <p className="text-md mb-2">Email: contact@company.com</p>
          <p className="text-md mb-2">Phone: (123) 456-7890</p>
          <p className="text-md mb-2">Address: 1234 Street Name, City, State, 12345</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
