import classNames from 'classnames'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navigation(params) {
  const navigae = useNavigate()
  const onChangeHandler = (e) => {
    const v=e.target.checked
    // localStorage.setItem(params.playListId,{...localStorage.getItem(params.playListId), (""params.progress[0]+params.progress[1]):v})
  }
  return (
    <div className='flex items-center sticky top-0 bg-white'>
      <img onClick={()=>{navigae('/')}} className='h-6 m-6' src="https://cdn-icons-png.flaticon.com/64/507/507257.png" alt="" />
      <p>Now Playing - {params.data}</p>
      <input onChange={onChangeHandler} className='w-5 h-5 ml-2' type="checkbox" name="" id="" />
      <div className='flex ml-auto gap-5 mr-5'>
        <div className={classNames('flex items-center gap-1 cursor-pointer', { 'hidden': params.progress[0] === 0 && params.progress[1] === 0 })}
          onClick={params.previous}>
          <img className='h-4' src="https://cdn-icons-png.flaticon.com/64/271/271220.png" alt="" />
          <p>Previous</p>
        </div>
        <div className={classNames('flex items-center gap-1 cursor-pointer', { 'hidden': params.progress[0] === params.size[0] && params.progress[1] === params.size[1] })}
          onClick={params.next} >
          <p>Next</p>
          <img className='h-4' src="https://cdn-icons-png.flaticon.com/64/271/271228.png" alt="" />
        </div>

      </div>
    </div>
  )
}

export default Navigation