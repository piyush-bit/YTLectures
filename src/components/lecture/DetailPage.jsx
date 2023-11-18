import React from 'react'

function DetailPage(param) {
  return (
    <div className='flex'>
      <div className='flex-grow'>
        <h2>{param.data.title}</h2>
      </div>
      <div >
        <img src="params.data.src" alt="" />
        shdd
      </div>
    </div>
  )
}

export default DetailPage