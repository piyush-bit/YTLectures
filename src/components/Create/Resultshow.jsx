import React from 'react'
import VideoSeq from '../LectureV2/VideoSeq';

function Resultshow({result,proceed,onClose}) {
  
  return (
    <div className='relative'>
        <div className="bg-white min-w-[300px] w-[60%] min-h-full h-fit mx-auto px-10 py-3 relative ">
        <p className='text-3xl font-semibold py-5 '>Here is the Generated check it out </p>
        {result.data.map((e, i) => {
          return <VideoSeq key={i} data={e} index={i} active={false} progress={[0,0]} setProgress={()=>{}} progressData={{}}/>;
        })}
        <div className="flex justify-end text-xl gap-5 font-semibold py-6">
          <button className='bg-acc text-white py-2 px-4'>Regenerate</button>
          <button onClick={proceed} className='bg-acc text-white py-2 px-7'>Proceed</button>
        </div>
        </div>
    </div>
  )
}

export default Resultshow