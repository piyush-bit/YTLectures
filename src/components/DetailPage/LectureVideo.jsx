import React from 'react'
import { PTtocolConvert } from '../../utils/timeConvert'
import { useNavigate } from 'react-router-dom'

function LectureVideo({data,id,setPage}) {

  const navigate = useNavigate();

  const clickHandler = (e)=>{
    console.log('hey');
    navigate(id, { replace: true })
    setPage(true);
        
  }

  return (
    <div onClick={clickHandler}
     className="flex gap-3 items-center mx-[-1.4rem]  px-5 py-4 rounded-md hover:bg-white hover:shadow-xl">
      <img
        className="blue-fill h-8"
        src="https://cdn-icons-png.flaticon.com/64/2859/2859706.png"
        alt=""
      />
      <div className="mr-auto ml-3 font-semibold">
        {data.title}
      </div>
      <div className="text-gray-500">{PTtocolConvert(data.duration)}</div>
    </div>
  )
}

export default LectureVideo