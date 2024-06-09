import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams ,useNavigate, useLocation } from "react-router-dom";
import SunbscribeCard from "./SunbscribeCard";
import LectureSeq from "./LectureSeq";
import { PTtocolConvert, formatDate } from "../../utils/timeConvert";
import LecturePage from "../LectureV2/LecturePage";

function DetailPage({data}) {

  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState(data);
  const [error, setError] = useState(false);

  const [isReadmore, setIsReadmore] = useState(false);

  
  const navigate = useNavigate();
  
  const { productId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const m = queryParams.get('m');
  const l = queryParams.get('l');
  
  const [page,setPage] =useState(queryParams.has('m') && queryParams.has('l'));
  useEffect(()=>{
    if(data!=undefined)
    return
    setLoading(true);
    ;(async () => {
      try {
        const d = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/course/${productId}`);
        console.log(d)
        setExtra(d.data);
        setLoading(false);
      } catch (error) {
        setError(error)
        setLoading(false);
      }
    })()
  }, []);
  if(loading||error||!extra)
  return(<div className="flex bg-back items-center justify-center h-screen w-screen">
    <div className="text-5xl font-bold" >Loading...</div>
    </div>)

    if(page){
      console.log(m,'m,l',l);
      console.log('data',data);
      return <LecturePage data={extra} setPage={setPage}/>
    }

  


  return (
    <div className="flex bg-back w-screen pt-10">
      <div className="flex h-screen w-screen">
        <div onClick={()=>{navigate(-1)}} className="h-8 w-8 ml-16 mr-10 mt-3 rounded-full outline outline-gray-500 outline-1 lg:flex items-center justify-center hover:h-12 hover:w-12 hover:mx-14 hover:mt-1 duration-150 hover:cursor-pointer hidden">
          <img
            className="h-5 contrast-0 "
            src="https://cdn-icons-png.flaticon.com/64/130/130882.png"
            alt=""
          />
        </div>
        <div className="max-w-[60rem] h-screen pr-8 pl-6 pb-10 overflow-y-auto">
          <div className="flex items-center gap-3  h-14">
            <div className="mr-auto text-2xl font-semibold text-gray-800">
              Course Details
            </div>
            <div className="flex items-center text-gray-600 gap-2 text-xs outline py-1 px-2 outline-gray-500 outline-1 hover:cursor-pointer hover:bg-gray-200">
              <img
                className="h-3 contrast-0"
                src="https://cdn-icons-png.flaticon.com/64/9356/9356210.png"
                alt=""
              />
              Edit Course
            </div>
            <div className="w-10 h-6 flex items-center justify-center outline outline-gray-500 m-1 outline-1 hover:cursor-pointer hover:bg-gray-200">
              <img
                className="h-5 contrast-0"
                src="https://cdn-icons-png.flaticon.com/64/3018/3018442.png"
                alt=""
              />
            </div>
          </div>
          <div className="text-7xl font-bold my-20 mr-48 ">
            {extra?.title || 'Fundamentals of Design Thinking'}
          </div>
          <div className="flex flex-wrap items-center gap-10 text-lg text-gra">
            <div className="text-lg px-4  py-1 rounded-md bg-black text-white">
              { extra.tags[0]?.title || 'Design Thinking'}
            </div>
            |
            <div className="flex items-center gap-3">
              <img
                className="h-5 contrast-0"
                src="https://cdn-icons-png.flaticon.com/64/3239/3239945.png"
                alt=""
              />

              <div className="flex text-gray-700">
                {extra&&PTtocolConvert(extra?.duration)?.split(':')[0]}<div className="text-xs mr-2 text-gray-500">H</div>
                {extra&&PTtocolConvert(extra?.duration)?.split(':')[1]}
                <div className="text-xs text-gray-500">MIN</div>
              </div>
            </div>
            |
            <div className="flex items-center gap-3 text-gray-700">
              <img
                className="h-5 contrast-0"
                src="https://cdn-icons-png.flaticon.com/64/2948/2948088.png"
                alt=""
              />
              {extra&&formatDate(extra?.updatedDate)}
            </div>
            |
            <div className="text-lg px-4  py-1 rounded-sm  text-gray-600 outline outline-gray-600 outline-1">
            {extra?.language || 'Hinglish'}
            </div>
          </div>

          <div className="outline outline-1 outline-gray-200 mx-0 my-10"></div>

          <div className="pt-6">
            <div className="text-2xl font-semibold my-3">Course Statistics</div>
            <div className={`text-gray-500 ${!isReadmore&&"line-clamp-2"}`}>
              {extra?.description}
            </div>
            <div onClick={()=>{setIsReadmore(!isReadmore)}} className="text-acc mt-3 hover:cursor-pointer">{isReadmore ? "Read Less" : "Read More"}</div>
          </div>

          <div className="outline outline-1 outline-gray-200 mx-0 my-10"></div>

         {extra?.data?.data?.map((e,i)=>{

           return  (i!=0)?<LectureSeq key={i} id={i} data={e} setPage={setPage}/> : <LectureSeq key={i} data={e} id={i} open={true} setPage={setPage}/>;
         })}
        </div>

        <div className="h-screen outline outline-1 outline-gray-200 "></div>
        <SunbscribeCard data={extra} setPage={setPage}/>
      </div>
    </div>
  );
}

export default DetailPage;
