
import { Route, RouterProvider, Routes, createBrowserRouter, useLocation } from 'react-router-dom'
import './App.css'
import {default as V2} from './components/HomeV2/main.jsx'
import DetailPage from './components/DetailPage/DetailPage.jsx'
import LoginPage from './components/LoginResister/LoginPage.jsx'
import SignupPage from './components/LoginResister/SignupPage.jsx'
import ForgotPassword from './components/LoginResister/ForgotPassword.jsx'
import CreatePage from './components/Create/CreatePage.jsx'
import LecturePage from './components/LectureV2/LecturePage.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from './features/UserSlice.js'
import Profile from './components/Profile/Profile.jsx'
import Finalizing from './components/Create/Finalizing.jsx'
import ConstructionAlert from './components/Create/ConstructionAlert.jsx'
import ServerStarting from './components/LoadingScreens/ServerStarting.jsx'
import PlaylistRedirect from './components/PlaylistRedirect.jsx'


function App() {

  const dispatch = useDispatch();
  const [serverStated , setServerStated] = useState(false)
  const [error , setError] = useState(false)

  useEffect(()=>{
    

    const axiosConfig = {
      method: "get",
      url: `${import.meta.env.VITE_BASE_URL}/api/user/`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true, // Include credentials (cookies) in the request
    };
    axios(axiosConfig) .then(response => {
      console.log('Response:', response.data);
      dispatch(addUser({name : response.data.name , email :response.data.email , username : response.data.username,img : response.data.img }))
    })
    .catch(error => {
      console.error('Error:', error);
    });


    // check server heallth ad tell user to wait for sever till it responds 
    axios.get(`${import.meta.env.VITE_BASE_URL}/`).then((res)=>{setServerStated(true)}).catch((err)=>{setError(err)})

  },[])

  const router = createBrowserRouter([
    { path : '/',element : <V2/>, },
    {
      path : '/course/:productId/#' , element :<DetailPage/>,
    },
    {
      path : '/course/pl/:playlistId' , element :<PlaylistRedirect/>,
    },
    {
      path : '/course/:productId/' , element :<DetailPage/>,
    },
    {
      path : '/login' , element :<LoginPage/>,
    },
    {
      path : '/signup' , element :<SignupPage/>,
    },
    {
      path : '/forgotpassword' , element :<ForgotPassword/>,
    },
    {
      path : '/create' , element :<ConstructionAlert/>,
    },
    {
      path : '/lecture' , element :<LecturePage/>,
    },
    {
      path : '/profile' , element :<Profile/>,
    },
    {
      path : '/test' , element :<CreatePage/>,
    },
    {
      path : '/testFinal' , element :<Finalizing/>,
    },
  ])

  if(!serverStated)
  return(
    <ServerStarting error={error}/>
  )

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
