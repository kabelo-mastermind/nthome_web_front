import React, { useState } from 'react';
import "../../components/FormStyle/FormStyles.css";  
import { Link, useNavigate } from 'react-router-dom';  
import axios from 'axios';  // Import axios for making HTTP requests
import toast, { Toaster } from 'react-hot-toast';  
import { assets } from '../../assets/assets';  

const Registration = () => {

  const navigate = useNavigate();

  // State for managing form input values
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',  // To capture the user role (customer or driver)
    gender: '' // To capture gender, specifically for customers
  });


  const [errors, setErrors] = useState({});

  // State for managing server or form submission error messages
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle input changes and update state
  const handleInput = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to validate form inputs before submission
  const validateForm = () => {
    let isValid = true;  
    const errors = {};  

    // Email validation
    if (!values.email.trim() || !/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
      isValid = false;
    }

    // Password validation
    if (values.password.length < 8) {
      errors.passwordLength = 'Password must be at least 8 characters long';
      isValid = false;
    } else {
      // Check for lowercase letters in the password
      if (!/[a-z]/.test(values.password)) {
        errors.passwordLowerCase = 'Password must contain at least one lowercase letter';
        isValid = false;
      }
      // Check for uppercase letters in the password
      if (!/[A-Z]/.test(values.password)) {
        errors.passwordUpperCase = 'Password must contain at least one uppercase letter';
        isValid = false;
      }
      // Check for numbers in the password
      if (!/\d/.test(values.password)) {
        errors.passwordNumber = 'Password must contain at least one number';
        isValid = false;
      }
      // Check for special characters in the password
      if (!/[^a-zA-Z0-9]/.test(values.password)) {
        errors.passwordUnique = 'Password must contain at least one unique character';
        isValid = false;
      }
    }

    // Role validation
    if (!values.role) {
      errors.role = 'Please select a role';
      isValid = false;
    }

    // Gender validation (only required if role is customer)
    if (values.role === "customer" && !values.gender) {
      errors.gender = 'Please select your gender';
      isValid = false;
    }

    // Confirm password validation
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(errors);  // Update the errors state
    return isValid;  // Return the overall form validity
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior

    // Validate form before submitting
    if (!validateForm()) {
      toast.error('Please correct the highlighted errors.');  // Show error toast if validation fails
      return;
    }

    try {
      // Send registration data to the server
      const response = await axios.post('http://localhost:8085/signup', values);
      toast.success('Registration successful! Redirecting to login...');  
      setTimeout(() => navigate('/login'), 2000); 
    } catch (error) {
      console.error('Error signing up:', error);  // Log any errors to the console
      // Handle specific server errors
      if (error.response && error.response.status === 400) {
        setErrorMessage('Email already exists. Please use a different email address.');
        toast.error('Email already exists. Please use a different email address.');  // Show error toast
      } else {
        setErrorMessage('An error occurred. Please try again.');
        toast.error('An error occurred. Please try again.');  // Show error toast
      }
    }
  };

  return (
    <div className='container py-5 mt-5 mb-5'>
      <Toaster />  {/* Toaster component for displaying toast notifications */}
      <div className="py-5 px-4 rounded-lg shadow-lg bg-white">
        {/* Form for user registration */}
        <form onSubmit={handleSubmit} className="py-5 px-4 mt-0 rounded-lg shadow-lg bg-white">
          {/* Input field for name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className={`border ${errors.name ? 'border-danger' : 'border-gray-300'} form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500`}
              onChange={handleInput}
            />
            {errors.name && <p className="text-danger text-xs italic">Please enter the name</p>}
          </div>

          {/* Input field for email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={`border ${errors.email ? 'border-danger' : 'border-gray-300'} form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500`}
              onChange={handleInput}
            />
            {errors.email && <p className="text-danger text-xs italic">Please enter a valid Email</p>}
          </div>

          {/* Input field for password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className={`border ${errors.password ? 'border-danger' : 'border-gray-300'} form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500`}
              onChange={handleInput}
            />
            {/* Display password-related error messages */}
            {errors.password && <p className="text-danger text-xs italic">{errors.password}</p>}
            {errors.passwordLength && <p className="text-danger text-xs italic">{errors.passwordLength}</p>}
            {errors.passwordLowerCase && <p className="text-danger text-xs italic">{errors.passwordLowerCase}</p>}
            {errors.passwordUpperCase && <p className="text-danger text-xs italic">{errors.passwordUpperCase}</p>}
            {errors.passwordNumber && <p className="text-danger text-xs italic">{errors.passwordNumber}</p>}
            {errors.passwordUnique && <p className="text-danger text-xs italic">{errors.passwordUnique}</p>}
          </div>

          {/* Input field for confirm password */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              className={`border ${errors.confirmPassword ? 'border-danger' : 'border-gray-300'} form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500`}
              onChange={handleInput}
            />
            {errors.confirmPassword && <p className="text-danger font-italic">Please enter the same Password</p>}
          </div>

          {/* Dropdown for selecting role */}
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 text-sm font-semibold mb-2">Role</label>
            <select
              id="role"
              name="role"
              value={values.role}
              onChange={handleInput}
              className={`border ${errors.role ? 'border-danger' : 'border-gray-300'} form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500`}
            >
              <option value="">Select Role</option>
              <option value="customer">Customer</option>
              <option value="driver">Driver</option>
            </select>
            {errors.role && <p className="text-danger font-italic">{errors.role}</p>}
          </div>

          {/* Conditional rendering of gender selection if the role is customer */}
          {values.role === 'customer' && (
            <div className="mb-4">
              <label htmlFor="gender" className="block text-gray-700 text-sm font-semibold mb-2">Gender</label>
              <select
                id="gender"
                name="gender"
                value={values.gender}
                onChange={handleInput}
                className={`border ${errors.gender ? 'border-danger' : 'border-gray-300'} form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500`}
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
              {errors.gender && <p className="text-danger font-italic">{errors.gender}</p>}
            </div>
          )}

          {/* Button to submit the registration form */}
          <button
            type="submit"
            className='btn btn-primary btn-lg btn-block rounded-pill'
          >
            Register
          </button>
        </form>

        {/* Link to redirect to login page */}
        <div className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;  // Export the Registration component for use in other parts of the application
