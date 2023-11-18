import React from 'react'

function LectureCard() {
  return (
    <div><div className="bg-white shadow-md h-96 w-72 rounded-md flex flex-col hover:shadow-xl hover:cursor-pointer transform scale-100 hover:scale-103 duration-150 ">
    <div className="w-72 h-44  relative">
      <div
        className="absolute w-72 h-44 z-0"
        style={{
          background: "rgb(255,255,255)",
          background:
            "linear-gradient(-2deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 16%, rgba(255,255,255,0) 19%)",
        }}
      ></div>
      <img
        className="rounded-t-md"
        src="https://img.youtube.com/vi/iPGXk-i-VYU/mqdefault.jpg"
        alt=""
      />
    </div>
    <div className="flex flex- mx-2 overflow-scroll">
      <div className="text-sm m-1 p-1 bg-cyan-300 rounded-md w-min bg-opacity-50 text-cyan-700">
        Management
      </div>
      <div className="text-sm m-1 p-1 bg-cyan-300 rounded-md w-min bg-opacity-50 text-cyan-700">
        Management
      </div>
      <div className="text-sm m-1 p-1 bg-cyan-300 rounded-md w-min bg-opacity-50 text-cyan-700">
        HindiEnglish
      </div>
    </div>
    
    <div className="text-2xl font-semibold mx-3 mt-3 mb-2 ">
      Nextjs Fullstack course on Authentication
    </div>
    <div className='mx-3 text-sm text-gray-600'>
        Hitesh Choudhary
    </div>
    <div className='mx-3 text-sm text-gray-600'>
        4.5 ★ · 500k views
    </div>
    <div className='mx-3 text-sm text-gray-600'>
        27 hours
    </div>
  </div></div>
  )
}

export default LectureCard