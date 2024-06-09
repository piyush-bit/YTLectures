import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../features/UserSlice";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (e) => {
    // Set up Axios request configuration
    const axiosConfig = {
      method: "post",
      url: `${import.meta.env.VITE_BASE_URL}/api/auth/signin`,
      data: {email,password},
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true, // Include credentials (cookies) in the request
    };
    axios(axiosConfig) .then(response => {
      console.log('Response:', response.data);
      dispatch(addUser({id:response.data._id,name : response.data.name , email :response.data.email , username : response.data.username,img : response.data.img }))
      navigate('/');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="bg-back flex items-center justify-center min-h-screen min-w-screen  ">
      <div className="bg-white w-[700px] h-[650px] flex flex-col flex-shrink shadow-md p-10 pb-0">
        <div className="text-2xl font-bold">
          <a className="text-acc">Y</a>Courses
        </div>
        <div className="md:px-20  flex flex-col gap-12 my-auto pt-5">
          <div className="group">
            <div className="flex justify-between">
              <div className="uppercase font-bold text-sm ">Email</div>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className=" outline-none text-right flex-grow font-bold "
                type="text"
                name=""
              />
            </div>
            <div className="outline w-full my-2 group-focus-within:outline-acc"></div>
          </div>
          <div className="group">
            <div className="flex justify-between">
              <div className="uppercase font-bold text-sm">Password</div>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                className="outline-none text-right flex-grow font-bold "
                type="password"
                name=""
              />
            </div>
            <div className="outline w-full my-2 group-focus-within:outline-acc transition-all"></div>
          </div>
          <div className="flex  flex-wrap items-center gap-2 my-6 justify-around">
            <div className=" transition-all group w-52 outline flex gap-2 items-center  uppercase text-sm font-bold py-2 px-5 hover:outline-blue-600 hover:bg-blue-600 hover:text-white hidden">
              <img
                className="h-5 group-hover:invert "
                src="https://cdn-icons-png.flaticon.com/64/20/20837.png"
                alt=""
              />
              Using Facebook
            </div>
            <div className="transition-all group w-52 outline flex gap-2 items-center  uppercase text-sm font-bold py-2 px-5 hover:outline-red-600 hover:bg-red-600 hover:text-white hidden">
              <img
                className="h-5 group-hover:invert "
                src="https://cdn-icons-png.flaticon.com/64/104/104093.png"
                alt=""
              />
              Using Google
            </div>
          </div>
          <div className="flex flex-wrap">
            {/* <div className="text-sm font-bold flex gap-2 items-center ">
              <input className="" type="checkbox" name="" id="" />
              Stay Logged in
            </div> */}
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
            <p>Don't have an account ? </p>

            <Link
              className="mx-2 font-bold uppercase hover:underline"
              to={"/signup"}
            >
              {" "}
              Sign Up
            </Link>
          </div>

          <div
            onClick={login}
            className="ml-auto bg-black text-white py-4 md:px-16 px-10 mr-[-2.5rem] uppercase hover:bg-acc transition-all duration-200 "
          >
            Log In
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
