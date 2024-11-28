import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LectureCard from "../HomeV2/LectureCard";
import { useSelector } from "react-redux";
import axios from "axios";

function Profile() {
  const data = {
    name: "Saurav",
    username: "saurav",
  };

  const [subscribedCourses,setSubscribedCourses] = useState([])
  const [createdCourses,setCreatedCourses] = useState([])

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/course/subscribedCourses`,{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    }).then(response => {
      setSubscribedCourses(response.data)
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    })
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/course/createdCourses`,{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    }).then(response => {
      setCreatedCourses(response.data)
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    })

  },[])

  const user = useSelector(state => state.user)
  
  return (
    <div className="flex bg-back w-screen h-screen pt-10">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="h-8 w-8 ml-16 mr-10 mt-3 rounded-full outline outline-gray-500 outline-1 lg:flex items-center justify-center hover:h-12 hover:w-12 hover:mx-14 hover:mt-1 duration-150 hover:cursor-pointer hidden"
      >
        <img
          className="h-5 contrast-0 "
          src="https://cdn-icons-png.flaticon.com/64/130/130882.png"
          alt=""
        />
      </div>
      <div className="mx-8 flex-grow ">
        <h1 className="text-3xl font-semibold text-gray-800 h-8 mt-3 ">
          Profile
        </h1>
        <div>
          <div className="w-fit  py-4  rounded-md  flex flex-col ">
            <div className="flex gap-4 ">
              {user?.img == undefined ? (
                <div className="h-16 w-16 rounded-full  mt-2 bg-yellow-200 flex items-center justify-center">
                  {user?.name[0]}
                </div>
              ) : (
                <img
                  className="h-20 w-20 rounded-full p-4 mt-2"
                  src={user?.img}
                  alt=""
                />
              )}
              <div className="flex-grow">
                <p className=" mt-4 font-semibold text-lg text-gray-800">
                  {user?.name}
                </p>
                <p className=" text-xs  text-gray-600">{user?.username || user?.email}</p>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 font-semibold text-xl text-gray-800">Created Courses</p>
        <div className="outline  outline-1  outline-gray-200"></div>
        <div className="flex px-3 py-4 my-2 mx-2 rounded-md gap-6  items-center text-gray-600 font-semibold text-sm hover:bg-gray-50 flex-wrap  ">
              {
                subscribedCourses.map(course => {
                  return <LectureCard data={course}/>
                })
              }
        </div>

        <p className="mt-4 font-semibold text-xl text-gray-800">Subscribed Course</p>

        <div className="outline  outline-1  outline-gray-200"></div>
        <div className="flex px-3 py-4 my-2 mx-2 rounded-md gap-6 items-center text-gray-600 font-semibold text-sm hover:bg-gray-50 flex-wrap  ">
          {createdCourses.map(course => {
            return <LectureCard data={course}/>
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
