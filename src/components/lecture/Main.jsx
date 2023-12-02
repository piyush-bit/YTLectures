import React, { useEffect, useState } from 'react'
import CourseNavigator from './CourseNavigator'
import Navigation from './Navigation'
import LectureContent from './LectureContent'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import NavButtons from './CourseNav/NavButtons'
import Loading from './Loading';

function Main(params) {



  const [data, setData] = useState([])
  const [fetched,setFetched ]= useState(false)
  const [extra,setExtra] = useState();

  const { productId } = useParams();

  useEffect(() => {
    // Define the URL you want to fetch data from
    const url = `${import.meta.env.VITE_BASE_URL}/api/course/${productId}` ;


    // Make a GET request using the Fetch API
    fetch(url)
      .then(response => {
        // Check if the response status is OK (200)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Parse the response as JSON
        return response.json();
      })
      .then(data => {
        // Do something with the JSON data
        console.log(data);
        setFetched(true)
        setExtra(data)
        setData(data.data);
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Fetch error:', error);
      });
  }, [])
  const navigate = useNavigate();

  

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const m = queryParams.get('m');
  const l = queryParams.get('l');


  const size = fetched?[data.length - 1, data[data.length - 1].content.length - 1] : 0

  const next = () => {
    let ret;
    setProgress(prev => {
      console.log(prev + ": prev");
      ret = data[prev[0]].content[prev[1] + 1] ? [prev[0], prev[1] + 1] : [prev[0] + 1, 0]
      return ret;
    })
    navigate(`./?m=${ret[0]}&l=${ret[1]}`,{replace:true})
    console.log(ret);
  }

  const previous = () => {
    let ret;
    setProgress(prev => {
      console.log(prev + ": prev");
      ret = data[prev[0]].content[prev[1] - 1] ? [prev[0], prev[1] - 1] : [prev[0] - 1, data[prev[0] - 1].content.length - 1]
      return ret
    })
    navigate(`./?m=${ret[0]}&l=${ret[1]}`,{replace:true})
    console.log(ret);
  }

  const [progress, setProgress] = useState([Number(m), Number(l ? l : 0)]);

  console.log(fetched)
  if (!m) {
    navigate(`/course/${productId}?m=0&l=0`);
  }
  if (!fetched) {
    console.log('not yet fetched');
    
    return <Loading/>
  }
  
    return (
      <div className='flex h-screen overflow-hidden'>
        <div className='w-3/4 h-full overflow-auto'>
          <Navigation playListId={productId} progress={progress} next={next} previous={previous} size={size} data={data[progress[0]].content[progress[1]].title} />
          <LectureContent data={data[progress[0]].content[progress[1]]} progress={progress} />

        </div>
        <div className='w-1/4'>
          <CourseNavigator playListId={productId} data={data} progress={progress} setProgress={setProgress} />
        </div>
      </div>
    )
  

}

export default Main
