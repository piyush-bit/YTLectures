
import { Route, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Main from './components/Home/Main'
import Home from './components/Home/Home/Home'
import AboutUs from './components/Home/AboutUs/AboutUs'
import Explore from './components/Home/Explore/Explore'
import Create from './components/Home/Create/Create'
import {default as LectureMain} from './components/lecture/Main'
import {default as V2} from './components/HomeV2/main.jsx'
import DetailPage from './components/DetailPage/DetailPage.jsx'
import LoginPage from './components/LoginResister/LoginPage.jsx'
import SignupPage from './components/LoginResister/SignupPage.jsx'
import ForgotPassword from './components/LoginResister/ForgotPassword.jsx'


function App() {
  const router = createBrowserRouter([
    { path : '/',element : <V2/>, 
    children :[
      {path : '/',element : <Home/>},
      {path : '/about' , element : <AboutUs/>}, 
      {path : '/explore' , element : <Explore/>}, 
      {path : '/create' , element : <Create/>}, 
    ]},
    {
      path : '/course/:productId' , element :<DetailPage/>,
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
  ])

  // const router = createBrowserRouter([
  //   <Route>
  //    <Route path='/' element={<Main/>}/>
  //   </Route>
  //  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
