import React, { useState } from "react";
import Video from "./Video";
import { formatTimetohour } from "../../utils/timeConvert";

function VideoSeq({ data , index , active ,progress , setProgress }) {
    const [openstatus,setOpenstatus] = useState(active)
  return (
    <div className="my-2">
      <div className="flex items-center  gap-3 bg-yellow-10 pt-4 pb-2" onClick={(e)=>{setOpenstatus(prev=>!prev)}}>
        <div className="outline outline-4 outline-acc rounded-full h-7 w-7 flex items-center justify-center flex-shrink-0">
          {index+1}
        </div>
        <div className="pl-2" >
          <div className="text-xs -mb-">{`${data.data.length} videos . ${formatTimetohour(data.duration)}`}</div>
          <div className="font-medium text-lg text-gray-600 leading-5 ">{data?.subtopic}</div>
          
        </div>
        <div className="ml-auto ">
          <img
            className={`h-4 transition-all  ${openstatus?'rotate-180':''}`}
            src="https://cdn-icons-png.flaticon.com/64/2985/2985150.png"
            alt=""
          />
        </div>
      </div>
        <div className={`pl-3  transition-all  ${openstatus?'':'hidden'}`}>
            {data.data.map((e ,i)=>{

                return <Video key={index+','+i} data={e} active={active&&i==progress[1]} index={[index,i]}  setProgress={setProgress}/>
            })}
            

        </div>
    </div>
  );
}

export default VideoSeq;
