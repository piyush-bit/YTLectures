import classNames from 'classnames'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Lecture(params) {
  const navigate = useNavigate();
  const selected =params.id[1]==params.progress[1]&&params.id[0]==params.progress[0]
   const onClickHandler = ()=>{
    params.setProgress(params.id)
    navigate(`./?m=${params.id[0]}&l=${params.id[1]}`,{replace:true})
  }
  return (
    <div className={classNames('flex border-t border-gray-700 pl-3 ',{'bg-gray-300' : selected,'bg-slate-50 ' : !selected})}>
        <div onClick={onClickHandler}>
            <div>{params.data.title}</div>
            <div className='flex items-center'>
                <img className='h-4 m-2' src="https://cdn-icons-png.flaticon.com/512/0/375.png" alt="" />
                <div>{params.data.duration.slice(2)}</div>
            </div>
        </div>
        <input className='ml-auto mr-1' type="checkbox" name="" id="" />
    </div>
  )
}

export default Lecture