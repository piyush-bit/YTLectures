import React from 'react'

function Tabs(props) {

  return (
    <div className={`flex gap-2  rounded-xl px-3 py-2 text-xs hover:text-black hover:cursor-pointer  ${props.isActive ? 'shadow-md bg-white' : 'text-gra'}`}>
    <div className="uppercase  font-semibold">{props.name}</div>
    <div className="text-gra">{props.num}</div>
  </div>
  )
}

export default Tabs