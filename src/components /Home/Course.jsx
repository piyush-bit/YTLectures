import React from 'react'
import { useNavigate } from 'react-router-dom'

function Course(props) {
  const navigate=useNavigate()
  const onClickHandler = () => {
    // console.log("gjfhd");
    navigate(`/course/${props.id}`)
  }
  return (
    <div className='w-96 m-5 ' onClick={onClickHandler}>
      <div className=' h-56 bg-black mb-3'>
        <img className='h-full w-full object-cover' src={props.src} alt="" />
      </div>
      <p className='font-bold mb-3 text-xl'>{props.tittle}</p>
    </div>
  )
}

export default Course