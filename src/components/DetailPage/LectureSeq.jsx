import React, { useState } from "react";
import LectureVideo from "./LectureVideo";
import { PTtocolConvert } from "../../utils/timeConvert";

function LectureSeq({ data ,open=false , id}) {

  const [openstate,setOpenstate] = useState(open);


  return (
    <div className="pt-10">
      <div onClick={()=>{setOpenstate(prev=>!prev)}} className="flex justify-between items-center hover:cursor-pointer">
        <div className="mb-6">
          <div className="text-2xl font-bold">{data.subtopic}</div>
          <div className="text-sm text-gray-500">
            {data.data.length} Videos . {PTtocolConvert(data.duration)}
          </div>
        </div>
        <div>
          <img className="h-4" src="https://cdn-icons-png.flaticon.com/64/2985/2985150.png" alt="" />
        </div>
      </div>
      <div className={`${!openstate?'hidden':''}`}>
      {data.data.map((e,i) => (
        <LectureVideo data={e} key={id+','+i} />

      ))}
      </div>
    </div>
  );
}

export default LectureSeq;
