import React, { useEffect, useState } from 'react'
import Course from '../Course'

function Explore() {

    const [result, setResult] = useState([]);

    useEffect(() => {
        // Define the URL you want to fetch data from
        const url = 'http://localhost:8080/api/explore';
        

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
                // console.log(data);
                setResult(data);
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                console.error('Fetch error:', error);
            });
    }, [])

    const a =(val)=>{
        // console.log(val);
        return <Course tittle={val.title} src={''} id={val._id}/>
    }

    return (
        <div>
            <p className='text-3xl font-bold mx-16 mt-8'>Enrolled Courses</p>
            <div className='w-52 h-1 bg-black mx-16'></div>
            <div className=' mx-10 flex flex-wrap justify-stretch'>
                {/* {process.env.REACT_APP_BASE_URL} */}
                {result.map(a)}
                <Course src='https://img.youtube.com/vi/8nNqk2NPbRA/sddefault.jpg' tittle='This is title of the Course' id='PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA' />



            </div>
        </div>
    )


}

export default Explore