import React, { useEffect, useState } from "react";
import Tabs from "./Tabs";
import LectureCard from "./LectureCard";
import TopicList from "./TopicList";
import axios from "axios";
import ProfileCard from "./ProfileCard";
import { useSelector } from "react-redux";

function main() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const [profile, setProfile] = useState(false);

  const user = useSelector((state) => state.user);
  

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const d = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/explore`
        );
        console.log(d);
        setData(d.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="bg-back min-h-screen ">
     
      <div
        className=" flex justify-between h-18 px-16 pt-10 pb-12 items-center  top-0 bg-back z-100 sticky w-screen z-10 "
        style={{
          background:
            "linear-gradient(deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 94%, rgba(255,255,255,0) 100%)",
        }}
      >
        <div className="flex">
          <div className="text-5xl font-bold mx-4 mt-[-6px] hover:cursor-pointer">
            <a className="text-acc">Y</a>Courses
          </div>
          <div className="h-10 w-10 bg-acc text-white rounded-full flex items-center justify-center relative hover:cursor-pointer shadow-md ">
            +
          </div>
        </div>
        <div className="flex gap-2">
          <Tabs name="Explore" num="12" isActive="1" />
          <Tabs name="Active" num="4" />
          |
          <Tabs name="Draft" num="2" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-7 w-7  bg-white rounded-full flex items-center justify-center shadow-md ">
            <img
              src="https://cdn-icons-png.flaticon.com/64/1827/1827422.png"
              alt=""
              className="h-3 w-3 contrast-50 hover:cursor-pointer"
            />
          </div>
          <div
            className="h-10 w-10 relative flex items-center justify-center bg-white rounded-full shadow-md transition-all hover:cursor-pointer"
            onClick={(e) => {
              setProfile((prev) => !prev);
            }}
          >
            {/* <img className="h-8 rounded-full shadow-inner" src="https://yt3.ggpht.com/yti/ADpuP3N7gkhhBgnD4DoAtDj8eaM4kKn36iLYlyjbRH7L=s108-c-k-c0x00ffffff-no-rj" alt="" 
            style={{background: "rgb(255,255,255)",
background: "radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 88%, rgba(255,255,255,1) 100%)"}}/> */}
            P
          </div>
          <div className={`absolute top-24 right-8 ${profile ? "" : "hidden"}`}>
            <ProfileCard data={user} />
          </div>
        </div>
      </div>
      <div className="h-screen w-72 fixed overflow-auto ">
        <div className="w-72  pl-16 pr-2 ">
          <div className="uppercase text-gra text-lg font-bold mt-5 mb-10 ml-4">
            Topics
          </div>
          <div className="topiclist  text-sm w-full ">
            <div className=" group flex items-center gap-2   py-2 px-4 my-1 w-52 text-lg mb-5 rounded-sm  outline-1 outline-gray-300 focus-within:outline-acc focus-within:shadow-md focus-within:outline hover:outline">
              <img
                src="https://cdn-icons-png.flaticon.com/64/149/149852.png"
                alt=""
                className="h-3 w-3 contrast-50"
              />
              <div>
                <input
                  className="shrink w-40 outline-none  text-gray-500 text-sm bg-back"
                  type="text"
                  name=""
                  id=""
                  placeholder="search"
                />
                {/* <div className="outline outline-1 outline-gray-500"></div> */}
              </div>
            </div>

            <TopicList name="All" isActive="1" />
            <TopicList name="javascript" />
            <TopicList name="java" />
            <TopicList name="python" />
            <TopicList name="golang" />
            <TopicList name="ruby" />
            <TopicList name="rust" />
            <TopicList name="javascript" />
          </div>
        </div>
      </div>
      <div className="flex  ">
        <div className="lecturelist flex flex-wrap gap-16  ml-72 pl-12 pr-12 pb-6 pt-16 justify-center">
          <div className={`${error ? "" : "hidden"}`}>{error.message}</div>
          <div className={`${loading ? "" : "hidden"}`}>Loading</div>
          {data.map((e) => (
            <LectureCard key={e._id} data={e} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default main;
