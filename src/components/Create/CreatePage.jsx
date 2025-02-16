import React, { useEffect, useState } from "react";
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
 
  const [useAi,setUseAi] = useState(true);
  const [progress,setProgress] = useState([])
  const [progressStep,setProgressStep] = useState(0)
  const [isCompleted,setIsCompleted] = useState(false)

  const [InputText,setInputText] = useState("Enter youtube Playlist link")

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

  function isValidYouTubePlaylistLink(url) {
    // Define a regex pattern for YouTube playlist links
    const playlistRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/playlist\?list=|youtu\.be\/playlist\?list=|youtube\.com\/embed\/playlist\?list=)([a-zA-Z0-9_-]{10,})/;

    // Test the URL against the regex
    const match = url.match(playlistRegex);

    if (match && match[1]) {
        return {
            valid: true,
            playlistId: match[1],
        };
    }

    return {
        valid: false,
        playlistId: null,
    };
}



  useEffect(()=>{
    console.log(useAi)
  },[useAi])

  const playlistURLHandler = (e)=>{
    const res = isValidYouTubePlaylistLink(e.target.value)
    if(res.valid){
      setInputText("Valid Playlist Id")
    }
    else if(e.target.value.length>0){
      setInputText("Invalid Playlist Id")
    }
    else{
      setInputText("Enter youtube Playlist link")
    }
    setPlaylistURL(e.target.value)
  }

  const onGenerateHandler = async () => {
    try {
      setLoading(true);
  
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/generate/playlist${useAi ? "" : "noai"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: isValidYouTubePlaylistLink(playlistURL).playlistId }),
        }
      );
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
  
      while (true) {
        const { done, value } = await reader.read();
  
        if (done) {
          // Process any remaining data in the buffer
          if (buffer.trim()) {
            const parts = buffer.split("\n---END---\n");
            for (const part of parts) {
              if (part.trim()) {
                try {
                  const finalProgressUpdate = JSON.parse(part);
                  console.log("Final parsed data:", finalProgressUpdate);
  
                  if (finalProgressUpdate.final) {
                    setResult(finalProgressUpdate.result);
                    setIsCompleted(true);
                  }
  
                  setProgress((prevProgress) => [...prevProgress, finalProgressUpdate]);
                } catch (error) {
                  console.error("Error parsing final chunk:", error);
                }
              }
            }
          }
          break;
        }
  
        const chunkString = decoder.decode(value, { stream: true });
        buffer += chunkString;
  
        // Process complete JSON objects
        let parts = buffer.split("\n---END---\n");
        buffer = parts.pop(); // Keep the last incomplete part in the buffer
  
        for (const part of parts) {
          if (part.trim()) {
            try {
              const progressUpdate = JSON.parse(part);
              console.log("Parsed progress update:", progressUpdate);
              if(progressUpdate.step){
                setProgressStep(progressUpdate.step)
              }
  
              if (progressUpdate.final) {
                console.log("final",progressUpdate.final);
                setResult(progressUpdate.result);
                setIsCompleted(true);
              }
  
              setProgress((prevProgress) => [...prevProgress, progressUpdate]);
            } catch (error) {
              console.error("Error parsing chunk:", error);
            }
          }
        }
      }
  
      setLoading(false);
  
      // Fetch additional data after the stream ends
      const [restag, reslang] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/explore/tags`),
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/explore/languages`),
      ]);
  
      setTags(restag.data);
      setLanguages(reslang.data);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error(error);
    }
  };
  
  const [isFianlizing , setIsFianlizing] = useState()

  const onClose = ()=>{setIsFianlizing(false);setResult(false);setProgressStep(0)};

  return (
    <>
    
    {result&&!isFianlizing&&
      createPortal(<div className="absolute h-screen w-screen bg-black bg-opacity-10 top-0 py-20 overflow-auto" onClick={(e)=>{e.stopPropagation() ; console.log("Hello");
      }}>
        <Resultshow result={result} regenerate={onGenerateHandler} proceed={()=>{setIsFianlizing(true)}} loading={loading} onClose={onClose} />
         </div>,document.getElementById("portal"))
    }
    {
      result&&isFianlizing&&
      createPortal(<div className="absolute h-screen w-screen bg-black bg-opacity-10 top-0 py-20 overflow-auto" onClick={(e)=>{e.stopPropagation() ; console.log("Hello");}}>
        <Finalizing result={result} tagOptions={tags} languageOptions={languages} onClose={onClose}/>
         </div>,document.getElementById("portal"))
         }
      <div className="flex  bg-back w-screen pt-10">
        <div className="flex min-h-screen w-screen">
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
        <div className="flex w-full  lg:flex-row flex-col">
        <div className="flex-grow h-full pr-8 pl-6 pb-10 lg:overflow-y-auto">
            <div className="flex items-center gap-3  h-14">
              <div className="mr-auto text-4xl font-semibold text-gray-700">
                Create Playlist
              </div>
            </div>
            <div className="mt-32 flex flex-col  my-auto">
              
              <div className="font-semibold text-lg capitalize my-3 text-gray-600 hidden">
                Enter youtube Playlist link 
              </div >
              <input type="text" className="shadow-md h-32 w-full px-4 text-lg text-gray-600 " value={playlistURL} onChange={playlistURLHandler}/>
              <div className="flex flex-col sm:flex-row">
              <div className="font-semibold text-lg capitalize my-3 text-gray-600">
                {InputText} <br />
                <input type="checkbox" defaultChecked={true}  onChange={(e)=>{setUseAi(e.target.checked)}} value={useAi} name="" id="" /> 
                <span className="text-base ml-3">Use AI sorting</span>
                {error && <div className="text-red-500">{error}</div>}
              </div >
              <div  onClick={checkAviabilityandGenerate}
              className="ml-auto px-8 py-4 text-2xl bg-acc my-3 text-white flex gap-4 cursor-pointer">
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
              <div onClick={()=>navigate("/construction")} className=" flex items-center capitalize gap-2 bg-gray-200 w-fit px-4 py-2 mx-auto my-8">
                <img className="h-10 " src="https://cdn-icons-png.flaticon.com/64/1698/1698477.png" alt="" />
                make your custom playlist
              </div>
            </div>
          </div>
          <div className="h-full outline outline-1 hidden lg:block outline-gray-200 "></div>
          <div className=" h-full  flex ">

            <div className="bg-white p-16 lg:mt-36 h-fit mx-auto  ">
              <div className="text-2xl font-semibold">
                How it Works !
              </div>
              <div className="flex gap-3 my-6 items-center">
                <div className={`h-10 w-10 ${progressStep>=1?"bg-green-300":"bg-gray-300"} rounded-full flex items-center justify-center`}>1</div>
                <div>
                  <div className="text-xs uppercase text-gray-700">Step-1</div>
                  <div className="">Fetching data from Youtube</div>
                </div>
              </div>

              <div className="flex gap-3 my-6 items-center">
                <div className={`h-10 w-10 ${progressStep>=2?"bg-green-300":"bg-gray-300"} rounded-full flex items-center justify-center`}>2</div>
                <div>
                  <div className="text-xs uppercase text-gray-700">Step-2</div>
                  <div className="">Arrange lectures using AI into <br /> subcategories.</div>
                </div>
              </div>

              <div className="flex gap-3 my-6 items-center">
                <div className={`h-10 w-10 ${progressStep>=3?"bg-green-300":"bg-gray-300"} rounded-full flex items-center justify-center`}>3</div>
                <div>
                  <div className="text-xs uppercase text-gray-700">Step-3</div>
                  <div className="">Structure data and add details</div>
                </div>
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
