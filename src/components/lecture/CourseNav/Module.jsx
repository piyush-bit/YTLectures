import React, { useEffect, useState } from 'react'
import Lecture from './Lecture'
import classNames from 'classnames'

function Module(params) {
    const selected =params.id===params.progress[0]
    const [open,setOpen]=useState(selected)

    useEffect(()=>{
        params.id===params.progress[0]?setOpen(true) : null;
    },[params.progress])
    const onClickHandler=()=>{setOpen(!open)}
    return (
        <div>
            <div onClick={onClickHandler} className='flex items-center p-1 cursor-pointer  border-black border-t bg-slate-200'>
                <div className='cursor-default'>
                    <div> {params.data.title}</div>
                    <div>{params.data.content.length} Videos</div>
                </div>

                <img className={classNames('ml-auto h-4',{ 'transform rotate-180' : open})} src="https://cdn-icons-png.flaticon.com/64/2985/2985150.png" alt="" />
            </div>
            <div className={classNames('',{'hidden' : !open})}>
                {params.data.content.map((d,index)=>{return <Lecture progress={params.progress} setProgress={params.setProgress} id={[params.id,index]} key={[params.id,index]} data={d}/>})}
                
            </div>
        </div>
    )
}

export default Module