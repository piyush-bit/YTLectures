
import { Route, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Main from './components /Home/Main'
import Home from './components /Home/Home/Home'
import AboutUs from './components /Home/AboutUs/AboutUs'
import Explore from './components /Home/Explore/Explore'
import Create from './components /Home/Create/Create'
import {default as LectureMain} from './components /lecture/Main'

function App() {
  const router = createBrowserRouter([
    { path : '/',element : <Main/>, 
    children :[
      {path : '/',element : <Home/>},
      {path : '/about' , element : <AboutUs/>}, 
      {path : '/explore' , element : <Explore/>}, 
      {path : '/create' , element : <Create/>}, 
    ]},
    {
      path : '/course/:productId' , element :<LectureMain/>,
    }
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
