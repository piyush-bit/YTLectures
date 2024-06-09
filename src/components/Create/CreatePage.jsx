import React, { useState } from "react";
import JsonElement from "./JsonElement";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

import DetailPage from "../DetailPage/DetailPage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createPortal } from "react-dom";
import VideoSeq from "../LectureV2/VideoSeq";
import Resultshow from "./Resultshow";
import Finalizing from "./Finalizing";

function CreatePage() {
  const navigate = useNavigate()

  const [playlistURL,setPlaylistURL] = useState()
  const [error,setError] = useState(false);
  const [loading , setLoading] = useState()
  const [result, setResult] = useState();

  const [tags,setTags] = useState()
  const [languages,setLanguages] = useState();
 
  const [useAi,setUseAi] = useState(false);

  const checkAviabilityandGenerate = async ()=>{
      try {
        setLoading(true)
        //playlistid as query
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/course/getwithplaylistid`,
        {params:{playlistId:playlistURL}})
        navigate(`/course/${res.data.course._id}`)

      } catch (error) {
        //if status is  not 404 throw error
        if(error.response.status==404){
          onGenerateHandler();
          console.log(error);
        }
        else{
          console.log(error);
          setLoading(false)
          setError(true)
          return
        }
      
      }
  }

  const onGenerateHandler = async ()=>{
    console.log(playlistURL);
      try {
        setLoading(true)
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/generate/playlist${useAi?"":"noai"}`,{id:playlistURL})
        console.log(response.data);
        setResult(response.data);
        setLoading(false)
        const restag = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/explore/tags`,)
        setTags(restag.data)
        const reslang = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/explore/languages`,)
        setLanguages(reslang.data)
      } catch (error) {
        setLoading(false)
        setError(true)
        console.log(error);
      }
  }

  const [isFianlizing , setIsFianlizing] = useState()

  return (
    <>
    {result&&!isFianlizing&&
      createPortal(<div className="absolute h-screen w-screen bg-black bg-opacity-10 top-0 py-20 overflow-auto">
        <Resultshow result={result} regenerate={onGenerateHandler} proceed={()=>{setIsFianlizing(true)}} loading={loading} />
         </div>,document.getElementById("portal"))
    }
    {
      result&&isFianlizing&&
      createPortal(<div className="absolute h-screen w-screen bg-black bg-opacity-10 top-0 py-20 overflow-auto">
        <Finalizing result={result} tagOptions={tags} languageOptions={languages}/>
         </div>,document.getElementById("portal"))
         }
      <div className="flex bg-back w-screen pt-10">
        <div className="flex h-screen w-screen">
          <div
            onClick={() => {
              navigate(-1);
            }}
            className="h-8 w-8 ml-16 mr-10 mt-3 rounded-full outline outline-gray-500 outline-1 lg:flex items-center justify-center hover:h-12 hover:w-12 hover:mx-14 hover:mt-1 duration-150 hover:cursor-pointer hidden"
          >
            <img
              className="h-5 contrast-0 "
              src="https://cdn-icons-png.flaticon.com/64/130/130882.png"
              alt=""
            />
          </div>
          <div className="flex-grow h-full pr-8 pl-6 pb-10 overflow-y-auto">
            <div className="flex items-center gap-3  h-14">
              <div className="mr-auto text-4xl font-semibold text-gray-700">
                Create Playlist
              </div>
            </div>
            <div className="mt-32 flex flex-col  my-auto">
              
              <div className="font-semibold text-lg capitalize my-3 text-gray-600 hidden">
                Enter youtube Playlist link 
              </div >
              <input type="text" placeholder="PLTCrU9sGyburBw9wNOHebv9SjlE4Elv5a" className="shadow-md h-32 w-full px-4 text-lg text-gray-600 " value={playlistURL} onChange={(e)=>{setPlaylistURL(e.target.value)}}/>
              <div className="flex">
              <div className="font-semibold text-lg capitalize my-3 text-gray-600">
                Enter youtube Playlist Id <br />
                <input type="checkbox" onChange={(e)=>{setUseAi(e.target.checked)}} value={useAi} name="" id="" /> 
                <span className="text-base ml-3">Use AI sorting</span>
                {error && <div className="text-red-500">{error}</div>}
              </div >
              <div  onClick={checkAviabilityandGenerate}
              className="ml-auto px-8 py-4 text-2xl bg-acc my-3 text-white flex gap-4">
                {loading?
                    <>
                      <svg
                        class="animate-spin h-5 w-5 mr-3 ..."
                        viewBox="0 0 24 24"
                      ></svg>
                      Processing...
                    </>:<>
                    <img src="https://cdn-icons-png.flaticon.com/64/11865/11865326.png" alt=""  className=" invert h-8"/>
                
                Generate
                    </>}
              </div>
              </div>

              <div className="mx-auto text-xl text-gray-600 my-4">
                OR
              </div>
              <div className=" flex items-center capitalize gap-2 bg-gray-200 w-fit px-4 py-2 mx-auto my-8">
                <img className="h-10 " src="https://cdn-icons-png.flaticon.com/64/1698/1698477.png" alt="" />
                make your custom playlist
              </div>
            </div>
          </div>
          <div className="h-full outline outline-1 outline-gray-200 "></div>
          <div className=" h-full p-10 flex ">

            <div className="bg-white p-16 mt-36 h-fit ">
              <div className="text-2xl font-semibold">
                How it Works !
              </div>
              <div className="flex gap-3 my-6 items-center">
                <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">1</div>
                <div>
                  <div className="text-xs uppercase text-gray-700">Step-1</div>
                  <div className="">Fetching data from Youtube</div>
                </div>
              </div>

              <div className="flex gap-3 my-6 items-center">
                <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">2</div>
                <div>
                  <div className="text-xs uppercase text-gray-700">Step-2</div>
                  <div className="">Arrange lectures using AI into <br /> subcategories.</div>
                </div>
              </div>

              <div className="flex gap-3 my-6 items-center">
                <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">3</div>
                <div>
                  <div className="text-xs uppercase text-gray-700">Step-3</div>
                  <div className="">Structure data and add details</div>
                </div>
              </div>
              
            </div>

          </div>
          
        </div>
      </div>
    </>
  );
}

export default CreatePage;
