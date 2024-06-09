import React, { useEffect, useState } from "react";
import { formatDate } from "../../utils/timeConvert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function SunbscribeCard({ data, setPage }) {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState([]);
  const [subscribed , setSubscribed] = useState(false)

  console.log("user", user);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const axiosConfig = {
          method: "get",
          url: `${import.meta.env.VITE_BASE_URL}/api/user/chceksubscription?courseId=${data._id}`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true, // Include credentials (cookies) in the request
        };
        const d = await axios(axiosConfig);
        console.log("result", d.data);
        setSubscribed(d.data.subscribed);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log("error",error);
      }
  })()},[])

  const subscribe = async () => {
    try {
      const axiosConfig = {
        method: "put",
        url: `${import.meta.env.VITE_BASE_URL}/api/user/course/sub`,
        data: { id: data._id },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true, // Include credentials (cookies) in the request
      };
      console.log('subs');
      setLoading(true);
      const d = await axios(axiosConfig)
      console.log("result", d);
      setResult(d.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.log(error);
    }
  };
  const onClickHandler = (e) => {
    (async () => {
      user && (await subscribe());

      navigate(`./?m=0&l=0`, { replace: true });
      setPage(true);
    })();
  };

  const navigateEnrolled = ()=>{
    navigate(`./?m=0&l=0`, { replace: true });
    setPage(true);
  }

  return (
    <div className="ml-8 mr-6 flex-grow justify-center  hidden xl:flex ">
      <div className="bg-white max-w-lg p-5 h-max shadow-md mt-24 hover:shadow-lg">
        <div className="text-2xl font-semibold my-3">Course Statistics</div>
        {/* <div className="flex gap-6 mb-5 ">
          <div className="flex text-4xl text-green-600">
            87%
            <div className="text-sm ml-1 text-black">
              Success <div>Rate</div>
            </div>
          </div>
          <div className="flex text-4xl">
            24
            <div className="text-sm ml-2">
              People <div>Finished</div>
            </div>
          </div>
        </div> */}

        {/* <div className="outline outline-gray-200 outline-1 "></div> */}
        <img className="my-5 pt-5" src={data?.playlist_img} alt="" />
        <div className="font- text-gray-600">
          {data.review} ★ · ({data.review_number} review)
        </div>
        <div className="font- text-gray-600">
          {data.views?.split(" ")[0]} youtube views
        </div>
        <div className="font- text-gray-600">Tutuor : {data.channelName}</div>
        <div className="font- text-gray-600">Created by : {"Piyush Kumar"}</div>
        <div className="font- text-gray-600">
          Updated on : {formatDate(data.updatedDate)}
        </div>
        <div className="flex items-center mt-5 mb-6 gap-5">
          {
           !subscribed? 
          <button
            onClick={onClickHandler}
            className="px-6 py-2 bg-acc text-white hover:outline hover:outiline-1 hover:outline-acc hover:text-acc hover:bg-white"
          >
            Enroll for Free
          </button> : <button
            onClick={navigateEnrolled}
            className="px-6 py-2 bg-gray-500 text-white hover:outline hover:outiline-1 hover:outline-acc hover:text-acc hover:bg-white"
          >
            Enrolled
          </button> 
          }
          <div className="text-sm text-gray-700 font-light leading-4 max-w-[6rem]">
            {data.enrollmentCount} already enrolled
          </div>
        </div>
      </div>
    </div>
  );
}

export default SunbscribeCard;
