import React, { useEffect, useState } from "react";
import Tabs from "./Tabs";
import LectureCard from "./LectureCard";
import TopicList from "./TopicList";
import axios from "axios";
import ProfileCard from "./ProfileCard";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Explore from "../Home/Explore/Explore";

function main() {


  const SUB = 'sub'
  const EXPLORE = 'explore'


  


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const [section,setSection] = useState('explore');
  const [tagSelected,setTagSelected] = useState();
  const [tags , setTags]=useState()
  const [profileclicked, setProfileClicked] = useState(false);
  const [tagId, setTagId] = useState();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        let url 
        if(section==EXPLORE)
         url = `${import.meta.env.VITE_BASE_URL}/api/course/getwithtag`
        else if(section==SUB)
        url = `${import.meta.env.VITE_BASE_URL}/api/user/course/subscribedCourses?q=`
        setLoading(true);
        const d = await axios.get(
          url , { withCredentials : true , params: {tagId:tagId} }
        );
        console.log(d);
        setData(d.data);
        setLoading(false);
        setError(false)
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [section,tagId]);


  console.log("user",user)

  useEffect(() => {
    (async () => {
      try {
        const d1 = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/explore/id`
        );
        console.log(d1.data);
        setTags(d1.data);
      } catch (error) {
        console.log(error);
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
          <div
            onClick={() => {
              navigate("/create");
            }}
            className="h-10 w-10 bg-acc text-white rounded-full flex items-center justify-center relative hover:cursor-pointer shadow-md "
          >
            +
          </div>
        </div>
        <div className="flex gap-2">
          <Tabs name="Explore" id={EXPLORE} num="12" isActive={section==EXPLORE} setSection={setSection}  />
          |
          <Tabs name="Subscribed" id={SUB} num="2" isActive={section==SUB} setSection={setSection}/>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-7 w-7  bg-white rounded-full flex items-center justify-center shadow-md ">
            <img
              src="https://cdn-icons-png.flaticon.com/64/1827/1827422.png"
              alt=""
              className="h-3 w-3 contrast-50 hover:cursor-pointer"
            />
          </div>
          {user?null:<Link to={"/login"}><div className="py-2 px-4 bg-acc rounded-full text-white shadow-md">
            Log In
          </div></Link>}
          {!user||<div
            className="h-10 w-10 relative flex items-center justify-center bg-white rounded-full shadow-md transition-all hover:cursor-pointer"
            onClick={(e) => {
              setProfileClicked((prev) => !prev);
            }}
          >
            {user.img ? (
              <img
                className="h-8 rounded-full shadow-inner"
                src="https://yt3.ggpht.com/yti/ADpuP3N7gkhhBgnD4DoAtDj8eaM4kKn36iLYlyjbRH7L=s108-c-k-c0x00ffffff-no-rj"
                alt=""
                style={{
                  background: "rgb(255,255,255)",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 88%, rgba(255,255,255,1) 100%)",
                }}
              />
            ) : (
              user.name?.charAt(0)
            )}
          </div>}
          <div className={`absolute top-24 right-8 ${profileclicked ? "" : "hidden"}`}>
            <ProfileCard data={user} setProfileClicked={setProfileClicked} />
          </div>
        </div>
      </div>
      <div className="h-screen flex transition-all w-72 fixed overflow-y-auto overflow-x-hidden ">
        <div className="w-72 transition-all  pl-16 pr-2 ">
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

            <TopicList name="All" setTagSelected={setTagSelected} id={""} isActive={tagSelected==null} setTagId={setTagId} />
            {tags&&tags.map((e)=>{
              return <TopicList name={e.title} id={e._id} setTagSelected={setTagSelected} isActive={tagSelected==e.title} setTagId={setTagId}/>
            })}
          </div>
        </div>
       
      </div>
      <div className="flex  ">
        <div className="lecturelist flex flex-wrap gap-16  ml-72 pl-12 pr-12 pb-6 pt-16 justify-center">
          <div className={`${error ? "" : "hidden"}`}>{error.message}</div>
          <div className={`${loading ? "" : "hidden"}`}>{"Loading ! May take 50-80 s server is starting "}</div>
          {data.map((e) => (
            <LectureCard key={e._id} data={e} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default main;
