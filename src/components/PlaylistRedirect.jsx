import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function PlaylistRedirect() {
    const navigate = useNavigate();
    //get from the url 
    const {playlistId} = useParams()
    useEffect(()=>{
        const nav=async()=>{
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/course/getwithplaylistid`,
                {params:{playlistId}}
                )
                console.log(res);
                navigate(`/course/${res.data.course._id}`)
            } catch (error) {
                console.log(error);
                navigate(`/create/${playlistId}`)
            }
        }
        nav()
    },[])

  return (
    <div>

    </div>
  )
}

export default PlaylistRedirect