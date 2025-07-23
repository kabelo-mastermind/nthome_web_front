import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { IoIosCall, IoIosMail, IoLogoFacebook, IoLogoTwitter, IoLogoInstagram } from 'react-icons/io';
import { format } from 'date-fns-tz';
import toast, { Toaster } from 'react-hot-toast';
const Contact = ({ emails }) => {
    const navigate = useNavigate();

    // Initialize state for form values and errors
    const [values, setValues] = useState({
        subject: '',
        email: emails || '', // Use emails prop if available, otherwise initialize as empty string
        message: ''
    });
    const [showEmailInput, setShowEmailInput] = useState(!emails); // Show email input if emails prop is not available (user not logged in)
    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Validate form
    const validateForm = () => {
        let isValid = true;
        const errors = {};

        if (!values.subject) {
            errors.subject = 'Subject is required';
            isValid = false;
        }

        if (!values.message) {
            errors.message = 'Message is required';
            isValid = false;
        }

        // Validate email only if not logged in (no emails prop)
        if (!emails && !values.email) {
            errors.email = 'Email is required';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please correct the errors in the form.");
            return;
        }
  

        try {
            // Get the current date in the South African time zone
            const currentDate = format(new Date(), 'yyyy-MM-dd', { timeZone: 'Africa/Johannesburg' });

            const formData = {
                ...values,
                email: emails || values.email, // Use provided email if logged in, otherwise use form input
                contact_date: currentDate // Include the current date in the form data
            };

            await axios.post('http://localhost:8085/contact', formData);
            toast.success("Message sent successfully!");
            setTimeout(() => {
                navigate('/thankyou');
            }, 2000);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Handle call
    const handleCall = () => {
        window.location.href = 'tel:+27842346914'; // Replace with your phone number
    };

    // Handle email
    const handleEmail = () => {
        window.location.href = 'mailto:info@nthome.com'; // Replace with your email address
    };

    // Handle Facebook link
    const handleFacebook = () => {
        window.open('https://www.facebook.com/NthomeExpressCouriers', '_blank'); // Open in a new tab
    };

    // Handle Twitter link
    const handleTwitter = () => {
        window.open('https://twitter.com/Nthomekp', '_blank'); // Open in a new tab
    };

    // Handle Instagram link
    const handleInstagram = () => {
        window.open('https://www.instagram.com/Nthomekp', '_blank'); // Open in a new tab
    };

    return (
        <>
            <Toaster />
            <div className="contact-us-hero-banner">
                <div className="overlay"></div>
                <div className="text-container">
                    <h1>CONTACT US</h1>
                </div>
            </div>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-md-6 py-5 bg-light'>
                        <div className='container'>
                            <h1 className='display-4 text-dark'>Nthome Courier</h1>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5 className='card-title'>Address:</h5>
                                    <p className='card-text'>4652 N Mamabolo street, Pretoria West, South Africa</p>
                                </div>
                            </div>
                            <div className='card mt-3'>
                                <div className='card-body d-flex flex-column flex-sm-row justify-content-center justify-content-sm-start align-items-center'>
                                    <h5 className='card-title mb-2 mb-sm-0 me-sm-3'>Call:</h5>
                                    <button className='btn contacts me-2 mb-2 mb-sm-0' onClick={handleCall}>
                                        <IoIosCall /> +27 84 234 6914
                                    </button>
                                    <button className='btn contacts me-2 mb-2 mb-sm-0' onClick={handleCall}>
                                        <IoIosCall /> +27 84 234 6918
                                    </button>
                                </div>
                            </div>
                            <div className='card mt-3'>
                                <div className='card-body'>
                                    <h5 className='card-title'>Email:</h5>
                                    <button className='btn contacts' onClick={handleEmail}>
                                        <IoIosMail /> info@nthome.com
                                    </button>
                                </div>
                            </div>
                            <div className='card mt-3'>
                                <div className='card-body d-flex flex-column flex-sm-row justify-content-center justify-content-sm-start align-items-center'>
                                    <h5 className='card-title mb-2 mb-sm-0 me-sm-3'>Social Media:</h5>
                                    <button className='btn contacts me-2 mb-2 mb-sm-0' onClick={handleFacebook}>
                                        <IoLogoFacebook />
                                    </button>
                                    <button className='btn contacts me-2 mb-2 mb-sm-0' onClick={handleTwitter}>
                                        <IoLogoTwitter />
                                    </button>
                                    <button className='btn contacts me-2 mb-2 mb-sm-0' onClick={handleInstagram}>
                                        <IoLogoInstagram />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='container'>
                            <form onSubmit={handleSubmit} className="py-5 px-4 rounded-lg shadow-lg bg-white">
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Your Email"
                                        className={`border ${errors.email ? 'border-danger' : 'border-gray-300'} form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500`}
                                        value={values.email}
                                        onChange={handleInput}
                                    />
                                    {errors.email && <p className="text-danger text-xs italic">{errors.email}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="subject" className="block text-gray-700 text-sm font-semibold mb-2">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="Subject of Enquiry"
                                        className={`border ${errors.subject ? 'border-danger' : 'border-gray-300'} form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500`}
                                        value={values.subject}
                                        onChange={handleInput}
                                    />
                                    {errors.subject && <p className="text-danger text-xs italic">{errors.subject}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows='3'
                                        placeholder="Write us a message"
                                        className={`border ${errors.message ? 'border-danger' : 'border-gray-300'} form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500`}
                                        value={values.message}
                                        onChange={handleInput}
                                    />
                                    {errors.message && <p className="text-danger text-xs italic">{errors.message}</p>}
                                </div>
                                <button type='submit' className='btn btn-primary btn-lg btn-block rounded-pill'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='row mt-5 mb-5'>
                    <div className='col'>
                        <div className='container'>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d230025.97999465867!2d28.089436582161955!3d-25.732356294416075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s4652%20N%20Mamabolo%20street%2C%20Pretoria%20West%2C%20South%20Africa!5e0!3m2!1sen!2sza!4v1715240210321!5m2!1sen!2sza"
                                width="100%"
                                height="450"
                                style={{ border: '0' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
