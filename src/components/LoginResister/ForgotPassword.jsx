import React from 'react'
import { Link } from 'react-router-dom';

function ForgotPassword() {
    return (
        <div className="bg-back flex items-center justify-center min-h-screen min-w-screen  ">
          <div className="bg-white w-[700px] h-[650px] flex flex-col flex-shrink shadow-md p-10 pb-0">
            <div className="text-2xl font-bold"><a className="text-acc">Y</a>Courses</div>

            <div className="md:px-20  flex flex-col gap-12  pt-5">

            <div className="uppercase font-bold text-lg mb-4  mt-20">Forgot Password</div>

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
             <div className='text-gray-400 text-sm -mt-8'>An e-mail will be send to containing the link to regerate the password</div>
              
             
            </div>
            <div className="flex mt-auto items-center font-semibold">
              <div className="flex flex-wrap">
                <p>Don't have an account ? </p>
    
                <Link className="mx-2 font-bold uppercase hover:underline" to={'/signup'}> 
                  {" "}
                  Sign Up
                </Link>
              </div>
    
              <div className="ml-auto bg-black text-white py-4 px-16 mr-[-2.5rem] uppercase hover:bg-acc transition-all duration-200">
                Send
              </div>
            </div>
          </div>
        </div>
      );
}

export default ForgotPassword