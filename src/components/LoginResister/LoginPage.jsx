import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../features/UserSlice";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (e) => {
    // Clear previous errors
    setError('');
    
    // Prevent multiple submissions
    if (loading) return;
    
    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Set loading state to true
    setLoading(true);
    
    // Set up Axios request configuration
    const axiosConfig = {
      method: "post",
      url: `${import.meta.env.VITE_BASE_URL}/api/auth/signin`,
      data: {email, password},
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true, // Include credentials (cookies) in the request
    };
    
    axios(axiosConfig)
      .then(response => {
        console.log('Response:', response.data);
        dispatch(addUser({
          id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          username: response.data.username,
          img: response.data.img
        }));
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status === 401) {
            setError('Invalid email or password');
          } else if (error.response.data && error.response.data.message) {
            setError(error.response.data.message);
          } else {
            setError('Login failed. Please try again.');
          }
        } else if (error.request) {
          // The request was made but no response was received
          setError('No response from server. Please check your internet connection.');
        } else {
          // Something happened in setting up the request
          setError('An error occurred. Please try again later.');
        }
      })
      .finally(() => {
        // Reset loading state regardless of success or failure
        setLoading(false);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle enter key press for login
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <div className="bg-back flex items-center justify-center min-h-screen min-w-screen">
      <div className="bg-white w-[700px] h-[650px] flex flex-col flex-shrink shadow-md p-10 pb-0">
        <div className="text-2xl font-bold">
          <a className="text-acc">Y</a>Courses
        </div>
        <div className="md:px-20 flex flex-col gap-12 my-auto pt-5">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="group">
            <div className="flex justify-between">
              <div className="uppercase font-bold text-sm">Email</div>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onKeyPress={handleKeyPress}
                className="outline-none text-right flex-grow font-bold"
                type="text"
                name="email"
                disabled={loading}
              />
            </div>
            <div className={`outline w-full my-2 group-focus-within:outline-acc ${loading ? 'opacity-50' : ''}`}></div>
          </div>
          <div className="group">
            <div className="flex justify-between">
              <div className="uppercase font-bold text-sm">Password</div>
              <div className="flex items-center w-full justify-end">
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyPress={handleKeyPress}
                  value={password}
                  className="outline-none text-right flex-grow font-bold"
                  type={showPassword ? "text" : "password"}
                  name="password"
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
            <div className={`outline w-full my-2 group-focus-within:outline-acc transition-all ${loading ? 'opacity-50' : ''}`}></div>
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
          <div className="flex flex-wrap hidden">
            <Link
              className="ml-auto font-bold text-sm hover:underline hover:cursor-pointer"
              to={"/forgotpassword"}
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className="flex mt-auto items-center font-semibold">
          <div className="flex flex-wrap">
            <p>Don't have an account? </p>
            <Link
              className="mx-2 font-bold uppercase hover:underline"
              to={"/signup"}
            >
              {" "}
              Sign Up
            </Link>
          </div>

          <button
            onClick={login}
            disabled={loading}
            className={`ml-auto bg-black text-white py-4 md:px-16 px-10 mr-[-2.5rem] uppercase hover:bg-acc transition-all duration-200 relative ${loading ? 'opacity-90' : ''}`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                <span>Logging in...</span>
              </div>
            ) : (
              "Log In"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;