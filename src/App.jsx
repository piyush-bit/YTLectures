
import { Route, RouterProvider, Routes, createBrowserRouter, useLocation } from 'react-router-dom'
import './App.css'
import Main from './components/Home/Main'
import Home from './components/Home/Home/Home'
import AboutUs from './components/Home/AboutUs/AboutUs'
import Explore from './components/Home/Explore/Explore'
import Create from './components/Home/Create/Create'
import {default as V2} from './components/HomeV2/main.jsx'
import DetailPage from './components/DetailPage/DetailPage.jsx'
import LoginPage from './components/LoginResister/LoginPage.jsx'
import SignupPage from './components/LoginResister/SignupPage.jsx'
import ForgotPassword from './components/LoginResister/ForgotPassword.jsx'
import CreatePage from './components/Create/CreatePage.jsx'
import LecturePage from './components/LectureV2/LecturePage.jsx'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from './features/UserSlice.js'
import Profile from './components/Profile/Profile.jsx'


function App() {

  const dispatch = useDispatch();

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
      // console.log('Response:', response.data);
      dispatch(addUser({name : response.data.name , email :response.data.email , username : response.data.username,img : response.data.img }))
    })
    .catch(error => {
      console.error('Error:', error);
    });
  },[])

  const router = createBrowserRouter([
    { path : '/',element : <V2/>, 
    // children :[
    //   {path : '/',element : <Home/>},
    //   {path : '/about' , element : <AboutUs/>}, 
    //   {path : '/explore' , element : <Explore/>}, 
    //   {path : '/create' , element : <Create/>}, 
    // ]
  },
    {
      path : '/course/:productId/#' , element :<DetailPage/>,
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
      path : '/create' , element :<CreatePage/>,
    },
    {
      path : '/lecture' , element :<LecturePage/>,
    },
    {
      path : '/profile' , element :<Profile/>,
    },
  ])

  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);

  // const router2 = createBrowserRouter([
  //   <Routes>
  //   <Route
  //     path="/"
  //     element={<V2 />}
  //   >
  //     <Route path="/" element={<Home />} />
  //     <Route path="/about" element={<AboutUs />} />
  //     <Route path="/explore" element={<Explore />} />
  //     <Route path="/create" element={<Create />} />
  //   </Route>
  //   <Route path="/course/:productId/" element={<DetailPage />} />

  //   <Route path="/login" element={<LoginPage />} />
  //   <Route path="/signup" element={<SignupPage />} />
  //   <Route path="/forgotpassword" element={<ForgotPassword />} />
  //   <Route path="/create" element={<CreatePage />} />
  //   <Route path="/lecture" element={<LecturePage />} />
  // </Routes>
  //  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
