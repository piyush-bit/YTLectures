import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeUser } from "../../features/UserSlice";

function ProfileCard({ data , setProfileClicked }) {
  const dispatch = useDispatch();
  const signoutHandler = async (e) => {
    // Set up Axios request configuration
    const axiosConfig = {
      method: "post",
      url: `${import.meta.env.VITE_BASE_URL}/api/auth/signout`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true, // Include credentials (cookies) in the request
    };
    axios(axiosConfig) .then(response => {
      dispatch(removeUser())
      setProfileClicked(prev=>!prev)
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  // console.log('user', data);
  if (!data||data==undefined)
    return (
      <div className="h-48 w-64 py-3 bg-white rounded-md shadow-md flex flex-col ">
        <Link to={"/login"}>Login</Link>
      </div>
    );
  return (
    <div className="h-48 w-64 py-3 bg-white rounded-md shadow-md flex flex-col ">
      <div className="flex ">
        {data.dp == undefined ? (
          <div className="h-16 w-16 rounded-full m-4 mt-2 bg-yellow-200 flex items-center justify-center">{data?.name[0]}</div>
        ) : (
          <img className="h-20 w-20 rounded-full p-4 mt-2" src={data.dp} alt="" />
        )}
        <div className="flex-grow">
          <p className=" mt-4 font-semibold text-lg text-gray-800">
            {data.name}r
          </p>
          <p className=" text-xs  text-gray-600">{data.username}</p>
          <Link to={'/profile'} className=" text-sm  mt-2  block text-acc hover:underline hover:cursor-pointer">view profile </Link>
        </div>
      </div>

      <div className="outline  outline-1 mt-5  mx-3 outline-gray-200"></div>

      <div onClick={signoutHandler}
       className="flex px-3 py-4 my-2 mx-2 rounded-md gap-2 items-center text-gray-600 font-semibold text-sm hover:bg-gray-50">
        <img
          className="h-4 contrast-50"
          src="https://cdn-icons-png.flaticon.com/64/992/992680.png"
          alt=""
        />
        Sign Out
      </div>
    </div>
  );
}

export default ProfileCard;
