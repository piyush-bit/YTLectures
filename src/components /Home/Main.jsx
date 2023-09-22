import React from 'react'
import Home from './Home/Home'
import { NavLink, Outlet } from 'react-router-dom'
import Explore from './Explore/Explore';
import Create from './Create/Create';

function Main() {
  return (
    <div className='flex h-screen w-screen '>
      <div className='w-1/5 flex-grow bg-zinc-800 pt-32'>


      <NavLink to="about" activeClassName="active-link">
        {(props) => (
          <div className={`flex items-center ml-12 py-3 pl-3 mb-4 rounded-tl-full rounded-bl-full ${props.isActive ? 'bg-white' : ''}`}>
            <img className={`h-5 mx-3 ${props.isActive?'':'invert'} `} src="https://cdn-icons-png.flaticon.com/64/471/471662.png" alt="" />
            <p className={` ${props.isActive?'':'text-white'} `}>About Us</p>
          </div>
        )}
      </NavLink>
      <NavLink to={''} activeClassName="active-link">
        {(props) => (
          <div className={`flex items-center ml-12 py-3 pl-3 mb-4 rounded-tl-full rounded-bl-full ${props.isActive ? 'bg-white' : ''}`}>
            <img className={`h-5 mx-3 ${props.isActive?'':'invert'} `} src="https://cdn-icons-png.flaticon.com/64/4225/4225546.png" alt="" />
            <p className={` ${props.isActive?'':'text-white'} `}>Home</p>
          </div>
        )}
      </NavLink>
      <NavLink to={'explore'} activeClassName="active-link">
        {(props) => (
          <div className={`flex items-center ml-12 py-3 pl-3 mb-4 rounded-tl-full rounded-bl-full ${props.isActive ? 'bg-white' : ''}`}>
            <img className={`h-5 mx-3 ${props.isActive?'':'invert'} `} src="https://cdn-icons-png.flaticon.com/64/484/484136.png" alt="" />
            <p className={` ${props.isActive?'':'text-white'} `}>Explore</p>
          </div>
        )}
      </NavLink>
      <NavLink to={'create'} activeClassName="active-link">
        {(props) => (
          <div className={`flex items-center ml-12 py-3 pl-3 mb-4 rounded-tl-full rounded-bl-full ${props.isActive ? 'bg-white' : ''}`}>
            <img className={`h-5 mx-3 ${props.isActive?'':'invert'} `} src="https://cdn-icons-png.flaticon.com/64/7420/7420919.png" alt="" />
            <p className={` ${props.isActive?'':'text-white'} `}>Create</p>
          </div>
        )}
      </NavLink>
        
      </div>
      <div className='w-4/5 h-full overflow-auto'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Main