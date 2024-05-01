import React from 'react'

function ServerStarting({error}) {
  return (
    <div className='bg-back h-screen w-full flex flex-col justify-center items-center'>
        <img className='h-16 my-10' src="/logo.png" alt="" />
        <div className="loader my-8"></div>
        <div className='text-gray-900 text-xl mb-28 font-semibold text-center'>Server is booting up , Please Wait ! <br /> it may take 30- 40 s </div>
        <div>{error?.message}</div>
    </div>
  )
}

export default ServerStarting