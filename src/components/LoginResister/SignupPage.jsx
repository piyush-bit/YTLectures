import React from 'react'
import { Link } from 'react-router-dom';

function SignupPage() {
    return (
        <div className="bg-back flex items-center justify-center min-h-screen min-w-screen  ">
          <div className="bg-white w-[700px] h-[750px] flex flex-col flex-shrink shadow-md p-10 pb-0">
            <div className="text-2xl font-bold"><a className="text-acc">Y</a>Courses</div>
            <div className="md:px-20  flex flex-col gap-10 my-auto pt-5">
            <div className="group">
                <div className="flex justify-between">
                  <div className="uppercase font-bold text-sm ">Name</div>
                  <input
                    className=" outline-none text-right flex-grow font-bold "
                    type="text"
                    name=""
                    id=""
                  />
                </div>
                <div className="outline w-full my-2 group-focus-within:outline-acc"></div>
              </div>
              
              <div className="group">
                <div className="flex justify-between">
                  <div className="uppercase font-bold text-sm ">Email</div>
                  <input
                    className=" outline-none text-right flex-grow font-bold "
                    type="text"
                    name=""
                    id=""
                  />
                </div>
                <div className="outline w-full my-2 group-focus-within:outline-acc"></div>
              </div>
              <div className="group">
                <div className="flex justify-between">
                  <div className="uppercase font-bold text-sm ">Username</div>
                  <input
                    className=" outline-none text-right flex-grow font-bold "
                    type="text"
                    name=""
                    id=""
                  />
                </div>
                <div className="outline w-full my-2 group-focus-within:outline-acc"></div>
              </div>
              <div className="group">
                <div className="flex justify-between">
                  <div className="uppercase font-bold text-sm">Password</div>
                  <input
                    className="outline-none text-right flex-grow font-bold "
                    type="password"
                    name=""
                    id=""
                  />
                </div>
                <div className="outline w-full my-2 group-focus-within:outline-acc transition-all"></div>
              </div>
              <div className="group">
                <div className="flex justify-between">
                  <div className="uppercase font-bold text-sm">Confirm Password</div>
                  <input
                    className="outline-none text-right flex-grow font-bold "
                    type="password"
                    name=""
                    id=""
                  />
                </div>
                <div className="outline w-full my-2 group-focus-within:outline-acc transition-all"></div>
              </div>
              <div className="flex  flex-wrap items-center gap-2 my-6 justify-around">
                <div className=" transition-all group w-52 outline flex gap-2 items-center  uppercase text-sm font-bold py-2 px-5 hover:outline-blue-600 hover:bg-blue-600 hover:text-white">
                  <img
                    className="h-5 group-hover:invert "
                    src="https://cdn-icons-png.flaticon.com/64/20/20837.png"
                    alt=""
                  />
                  Using Facebook
                </div>
                <div className="transition-all group w-52 outline flex gap-2 items-center  uppercase text-sm font-bold py-2 px-5 hover:outline-red-600 hover:bg-red-600 hover:text-white">
                  <img
                    className="h-5 group-hover:invert "
                    src="https://cdn-icons-png.flaticon.com/64/104/104093.png"
                    alt=""
                  />
                  Using Google
                </div>
              </div>
            </div>
            <div className="flex mt-auto items-center font-semibold">
              <div className="flex flex-wrap">
                <p>already have an account ? </p>
    
                <Link className="mx-2 font-bold uppercase hover:underline" to={'/login'}>
                  {" "}
                  LogIn
                </Link>
              </div>
    
              <div className="ml-auto bg-black text-white py-4 px-16 mr-[-2.5rem] uppercase hover:bg-acc transition-all duration-200">
                Sign Up
              </div>
            </div>
          </div>
        </div>
      );
}

export default SignupPage