import React, { useState } from 'react';
import "../../components/FormStyle/FormStyles.css"; 
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; // Importing axios for making HTTP requests

const LoginForm = ({ isAdmin, admin }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  }); // State to store input values for email and password
  const [errors, setErrors] = useState({}); // State to store validation errors

  // Function to handle input changes and update state
  const handleInput = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to validate form inputs
  const validateForm = () => {
    let isValid = true; // Flag to track overall form validity
    const errors = {}; // Object to store any validation errors

    // Validate email field: checks if it's not empty and follows a valid email pattern
    if (!values.email.trim() || !/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address'; // Set error message for invalid email
      isValid = false; // Mark form as invalid
    }

    // Validate password field: check for minimum length and required character types
    if (values.password.length < 8) {
      errors.passwordLength = 'Password must be at least 8 characters long'; // Set error message for short passwords
      isValid = false; // Mark form as invalid
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
      // Check for unique characters in the password (e.g., symbols)
      if (!/[^a-zA-Z0-9]/.test(values.password)) {
        errors.passwordUnique = 'Password must contain at least one unique character';
        isValid = false;
      }
    }

    setErrors(errors); // Update state with validation errors
    return isValid; // Return overall form validity
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!validateForm()) {
      return; // If form is not valid, exit early
    }

    try {
      // Send a POST request to the server to attempt login
      const response = await axios.post('http://localhost:8085/login', values);
      const { login, message, roles } = response.data; // Destructure the response data

      if (login) {
        // If login is successful, navigate to the appropriate route
        if (admin) {
          navigate('/adminapp'); // Redirect to admin dashboard if user is admin
        } else {
          navigate('/'); // Redirect to home page for other roles
        }
        window.location.reload(); // Reload the page to apply any changes
      } else {
        // If login fails due to invalid credentials, set error message
        setErrors({ loginError: "Invalid email or password. Please try again." });
      }
    } catch (error) {
      console.error('Error login:', error); // Log any errors to the console
      // Handle other errors (e.g., network errors)
      setErrors({ loginError: "Please enter a valid email or password." });
    }
  };

  return (
    <div className='container py-5 mt-5 mb-5'>
      <div className="py-5 px-4 rounded-lg shadow-lg bg-white">
        {/* Form element to handle login inputs */}
        <form onSubmit={handleSubmit} className="py-5 px-4 mt-0 rounded-lg shadow-lg bg-white">
          {/* Email input field with label */}
          <div className="mb-4">
            <label htmlFor="Email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={`border ${errors.email ? 'border-danger' : 'border-gray-300'} form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500`}
              onChange={handleInput} // Update state on input change
            />
            {/* Display error message if email is invalid */}
            {errors.email && <p className="text-danger text-xs italic">Please enter a valid Email</p>}
          </div>
          {/* Password input field with label */}
          <div className="mb-4">
            <label htmlFor="Password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className={`border ${errors.password ? 'border-danger' : 'border-gray-300'} form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500`}
              onChange={handleInput} // Update state on input change
            />
            {/* Display various password error messages based on validation */}
            {errors.password && <p className="text-danger text-xs italic">{errors.password}</p>}
            {errors.passwordLength && <p className="text-danger text-xs italic">{errors.passwordLength}</p>}
            {errors.passwordLowerCase && <p className="text-danger text-xs italic">{errors.passwordLowerCase}</p>}
            {errors.passwordUpperCase && <p className="text-danger text-xs italic">{errors.passwordUpperCase}</p>}
            {errors.passwordNumber && <p className="text-danger text-xs italic">{errors.passwordNumber}</p>}
            {errors.passwordUnique && <p className="text-danger text-xs italic">{errors.passwordUnique}</p>}
          </div>
          {/* Display login error message if authentication fails */}
          {errors.loginError && <p className="text-danger text-xs italic">{errors.loginError}</p>}
          {/* Login button */}
          <button type='submit' className='btn btn-primary btn-lg btn-block rounded-pill'>Login</button>
          {/* Link to signup page */}
          <div className="text-center mt-4">
            <span className="text-gray-600">No account yet?&nbsp;</span>
            <Link to="/signup" className="text-primary font-semibold ml-1">Signup</Link>
          </div>
          {/* Link to forgot password page */}
          <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-primary font-semibold">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm; // Export the LoginForm component for use in other parts of the application
