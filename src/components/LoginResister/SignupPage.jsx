import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import validateEmail from "../../utils/Email";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();

  // Validation effect that runs on form field changes
  useEffect(() => {
    if (submitted) {
      validateForm();
    }
  }, [name, email, password, confirmPassword, submitted]);

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (name.trim() === "") {
      newErrors.name = "Name is required";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    // Email validation
    if (email.trim() === "") {
      newErrors.email = "Email is required";
      setValidEmail(false);
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
    
    // Password validation
    if (password === "") {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    // Confirm password validation
    if (confirmPassword === "") {
      newErrors.confirmPassword = "Please confirm your password";
      setPasswordMatch(false);
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNameChange = (e) => setName(e.target.value);
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (submitted) {
      setValidEmail(validateEmail(e.target.value));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (submitted) {
      setPasswordMatch(e.target.value === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (submitted) {
      setPasswordMatch(password === e.target.value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    const isValid = validateForm();
    
    if (isValid) {
      signup();
    } else {
      console.log("Form validation failed");
    }
  };

  const signup = async () => {
    // Prevent multiple submissions
    if (loading) return;
    
    // Set loading state to true
    setLoading(true);
    
    // Set up Axios request configuration
    const axiosConfig = {
      method: "post",
      url: `${import.meta.env.VITE_BASE_URL}/api/auth/signup`,
      data: { name, email, password },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    
    axios(axiosConfig)
      .then(response => {
        console.log('Response:', response.data);
        // Redirect to login page on successful signup
        navigate('/login');
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle specific API errors
        if (error.response && error.response.data) {
          if (error.response.data.message === "Email already exists") {
            setErrors({...errors, email: "This email is already registered"});
          } else {
            setErrors({...errors, general: "Signup failed. Please try again."});
          }
        } else {
          setErrors({...errors, general: "Network error. Please check your connection."});
        }
      })
      .finally(() => {
        // Reset loading state regardless of success or failure
        setLoading(false);
      });
  };

  return (
    <div className="bg-back flex items-center justify-center min-h-screen min-w-screen">
      <div className="bg-white w-[700px] h-screen min-h-[750px] flex flex-col flex-shrink shadow-md p-10 pb-0">
        <div className="text-2xl font-bold">
          <a className="text-acc">Y</a>Courses
        </div>
        
        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4" role="alert">
            <span className="block sm:inline">{errors.general}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="md:px-20 flex flex-col gap-10 my-auto pt-5">
          <div className="group">
            <div className="flex justify-between">
              <div className="uppercase font-bold text-sm">Name</div>
              <input
                className={`outline-none text-right flex-grow font-bold ${errors.name ? 'text-red-600' : ''}`}
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleNameChange}
                disabled={loading}
              />
            </div>
            <div className={`outline w-full my-2 group-focus-within:outline-acc ${errors.name ? 'outline-red-600' : ''} ${loading ? 'opacity-50' : ''}`}></div>
            {errors.name && <div className="text-sm text-red-600 mt-1">{errors.name}</div>}
          </div>

          <div className="group">
            <div className="flex justify-between">
              <div className="uppercase font-bold text-sm">Email</div>
              <input
                className={`outline-none text-right flex-grow font-bold ${errors.email ? 'text-red-600' : ''}`}
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                disabled={loading}
              />
            </div>
            <div className={`outline w-full my-2 group-focus-within:outline-acc ${errors.email ? 'outline-red-600' : ''} ${loading ? 'opacity-50' : ''}`}></div>
            {errors.email && <div className="text-sm text-red-600 mt-1">{errors.email}</div>}
          </div>
          
          <div className="group">
            <div className="flex justify-between">
              <div className="uppercase font-bold text-sm">Password</div>
              <div className="flex items-center w-full justify-end">
                <input
                  className={`outline-none text-right flex-grow font-bold ${errors.password ? 'text-red-600' : ''}`}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={loading}
                />
                <button 
                  type="button"
                  className="ml-2 text-gray-500 focus:outline-none"
                  onClick={togglePasswordVisibility}
                  disabled={loading}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className={`outline w-full my-2 group-focus-within:outline-acc transition-all ${errors.password ? 'outline-red-600' : ''} ${loading ? 'opacity-50' : ''}`}></div>
            {errors.password && <div className="text-sm text-red-600 mt-1">{errors.password}</div>}
          </div>
          
          <div className="group">
            <div className="flex justify-between">
              <div className="uppercase font-bold text-sm">
                Confirm Password
              </div>
              <div className="flex items-center w-full justify-end">
                <input
                  className={`outline-none text-right flex-grow font-bold ${errors.confirmPassword ? 'text-red-600' : ''}`}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  disabled={loading}
                />
                <button 
                  type="button"
                  className="ml-2 text-gray-500 focus:outline-none"
                  onClick={toggleConfirmPasswordVisibility}
                  disabled={loading}
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className={`outline w-full my-2 group-focus-within:outline-acc transition-all ${errors.confirmPassword ? 'outline-red-600' : ''} ${loading ? 'opacity-50' : ''}`}></div>
            {errors.confirmPassword && <div className="text-sm text-red-600 mt-1">{errors.confirmPassword}</div>}
          </div>
          
          <div className="flex flex-wrap items-center gap-2 my-6 justify-around">
            <div className="transition-all group w-52 outline flex gap-2 items-center uppercase text-sm font-bold py-2 px-5 hover:outline-blue-600 hover:bg-blue-600 hover:text-white hidden">
              <img
                className="h-5 group-hover:invert"
                src="https://cdn-icons-png.flaticon.com/64/20/20837.png"
                alt=""
              />
              Using Facebook
            </div>
            <div className="transition-all group w-52 outline flex gap-2 items-center uppercase text-sm font-bold py-2 px-5 hover:outline-red-600 hover:bg-red-600 hover:text-white hidden">
              <img
                className="h-5 group-hover:invert"
                src="https://cdn-icons-png.flaticon.com/64/104/104093.png"
                alt=""
              />
              Using Google
            </div>
          </div>
        </form>
        
        <div className="flex mt-auto items-center font-semibold">
          <div className="flex flex-wrap">
            <p>Already have an account? </p>

            <Link
              className="mx-2 font-bold uppercase hover:underline"
              to={"/login"}
            >
              LogIn
            </Link>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`ml-auto bg-black text-white py-4 px-16 mr-[-2.5rem] uppercase hover:bg-acc transition-all duration-200 text-nowrap ${loading ? 'opacity-90' : ''}`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                <span>Signing up...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;