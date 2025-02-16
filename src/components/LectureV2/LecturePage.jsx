import React, { useEffect, useState } from "react";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import VideoSeq from "./VideoSeq";
import axios from "axios";
import VideoLayout from "./VideoLayout";
import { formatTimetohour } from "../../utils/timeConvert";

function LecturePage({ data: g , setPage }) {
  const [data, setData] = useState(g);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const { productId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const m = queryParams.get('m');
  const l = queryParams.get('l');

  const [progress, setProgress] = useState([Number(m?m:0), Number(l ? l : 0)]);
  const [progressData , setProgressData] = useState();

  useEffect(() => {
    if (g != undefined) return;
    setLoading(true);
    (async () => {
      try {
        const d = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/course/${productId}`
        );
        // console.log(d);
        setData(d.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    })();


  }, []);

  useEffect(() => {
    const getProgress = async()=>{
      console.log('progress',productId);
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/progress/getprogress?courseId=${productId}`,
          {withCredentials: true}
        )
        setProgressData(result.data.data.completedLectures);
      } catch (error) {
        console.log(error);
      }

    }
    getProgress()
  },[])


  const next = ()=>{
    let next =data.data.data[progress[0]].data[progress[1]+1] ? [progress[0],progress[1]+1] : [progress[0]+1,0];
    setProgress(next)
    navigate(`./?m=${next[0]}&l=${next[1]}`,{replace:true})
  }
  const previous = ()=>{
    let prev =  progress[1]==0 ? [progress[0]-1,data.data.data[progress[0]-1].data.length-1] : [progress[0],progress[1]-1]
    setProgress(prev)
    navigate(`./?m=${prev[0]}&l=${prev[1]}`,{replace:true})
  }




  if (loading || error || !data)
    return (
      <div className="flex bg-back items-center justify-center h-screen w-screen">
        <div className="text-5xl font-bold">Loading.......</div>
      </div>
    );

  return (
    <div className="bg-back  ">
      <div className="bg-back min-h-screen flex">
        <div>
          <div
            onClick={() => {
              navigate(-1);
            }}
            className="h-8 w-8 ml-16 mr-10 mt-14 rounded-full outline outline-gray-500 outline-1 lg:flex items-center justify-center hover:h-12 hover:w-12 hover:mx-14 hover:mt-12 duration-150 hover:cursor-pointer hidden"
          >
            <img
              className="h-5 contrast-0 "
              src="https://cdn-icons-png.flaticon.com/64/130/130882.png"
              alt=""
            />
          </div>
        </div>
        <VideoLayout data={data} progress={progress}  next={next} previous={previous} progressData={progressData} setProgressData={setProgressData}/>
        <div className="outline outline-1 outline-gray-200 my-6 "></div>
        <div className="pr-5 hidden lg:block pl-8 pt-10 w-[410px] flex-shrink-0 h-screen overflow-auto">
        <div className="text-xs -mb-">{`${data.data.data.length} modules . ${formatTimetohour(data.duration)}`}</div>
          <div
          onClick={(e)=>{setPage(false)}}
          
          className="text-2xl font-semibold mb-6">{data.title}</div>

          <div className="mb-16"> </div>
          <div className="flex gap-2"></div>
          {data.data.data.map((e, i) => {
            return <VideoSeq key={i} data={e} index={i} active={progress[0]==i} progress={progress} setProgress={setProgress} progressData={progressData}/>;
          })}
        </div>
      </div>
    </div>
  );
}

export default LecturePage;
