import React from 'react'
import Module from './CourseNav/Module'

function CourseNavigator(params) {
  return (
    <div className='gap-1 h-full overflow-scroll'>
      <p className='text-2xl mb-2 mt-6 font-semibold'>Course Timeline</p>
      {params.data.map((d,index)=>{ return <Module progress={params.progress} setProgress={params.setProgress} id={index} key={index} data={d}/>})}
    </div>
  )
}

export default CourseNavigator