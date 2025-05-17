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
  const [] = useState();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        let url 
        if(section==EXPLORE)
         url = `${import.meta.env.VITE_BASE_URL}/api/course/getwithtag`
        else if(section==SUB){
          url = `${import.meta.env.VITE_BASE_URL}/api/user/course/subscribedCourses?q=`
        }
        setData([])
        setLoading(true);
        const d = await axios.get(
          url , { withCredentials : true , params: {tagId:tagId} }
        );
        console.log(d);
        setData(d.data);
        setLoading(false);
        setError(false)
      } catch (error) {
        if(error.response.status==401){
          setError(401)
        }
        else
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
          `${import.meta.env.VITE_BASE_URL}/api/explore/tags`
        );
        console.log(d1.data);
        setTags(d1.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="bg-back min-h-screen">
      <div
        className=" flex flex-col flex-wrap  justify-between h-18 px-4  md:px-16 pt-10 md:pb-12 items-center  top-0 bg-back z-100 sticky w-screen z-10 "
        style={{
          background:
            "linear-gradient(deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 94%, rgba(255,255,255,0) 100%)",
        }}
      >
        <div className="flex w-full">
        <div className="flex mb-3 gap-2 mr-auto ">
          <div className="text-5xl font-bold md:mx-4 mt-[-6px] hover:cursor-pointer">
            <a className="text-acc">Y</a>C<span className="hidden md:inline">ourses</span>
          </div>
          <div
            onClick={() => {
              navigate("/create");
            }}
            className="h-10 w-10 bg-acc  text-white rounded-full flex items-center justify-center relative hover:cursor-pointer shadow-md "
          >
            +
          </div>
          <div className="md:flex absolute top-[20px] left-[350px] hidden  bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg shadow- transform -translate-y-2 transition-all duration-300 hover:scale-105 gap-2 items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-acc animate-pulse"
              transform="scale(1,-1)"
            >
              <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>
            </svg>
            <span className="text-sm font-medium text-gray-700">Click to create your playlist</span>
          </div>
        </div>
        <div className="hidden md:flex gap-2 my-4">
          <Tabs name="Explore" id={EXPLORE}  isActive={section==EXPLORE} setSection={setSection}  />
          |
          <Tabs name="Subscribed" id={SUB}  isActive={section==SUB} setSection={setSection}/>
        </div>
        <div className="flex items-center gap-3 ml-auto">
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

        <div className="mx-auto md:hidden flex gap-2 my-4">
          <Tabs name="Explore" id={EXPLORE}  isActive={section==EXPLORE} setSection={setSection}  />
          |
          <Tabs name="Subscribed" id={SUB}  isActive={section==SUB} setSection={setSection}/>
        </div>
      </div>
      {tags&&<div className="w-full flex gap-2 px-5 flex-wrap  my-4 md:hidden ">
        <div onClick={()=>{setTagSelected(null);
              setTagId(null)}}
            className={`py-2 my-1 shadow-sm px-4 text-xs w-fit font-semibold uppercase rounded-full ${!tagSelected?"bg-white":""}`}>All</div>
          {tags.map((e)=>{
            return <div onClick={()=>{setTagSelected(e.title);
              setTagId(e._id)}}
            className={`py-2 my-1 shadow-sm px-4 text-xs w-fit font-semibold uppercase rounded-full ${tagSelected==e.title?"bg-white":""}`}>{e.title}</div>
          })}
      </div>}
      <div className="h-screen hidden md:flex transition-all w-72 fixed overflow-y-auto overflow-x-hidden ">
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
        <div className="lecturelist flex flex-wrap gap-16  md:ml-[18.5rem] md:px-3 md:mr-6  pb-6 pt-16 justify-center">
          {
            error==401?<div className="text-center">Please Login to see your subscribed courses , <button className="underline" onClick={()=>navigate("/login")}>Login</button></div>:null
          }
          <div className={`${error&&error!=401 ? "" : "hidden"}`}>{error.message}</div>
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
