import React, { useState } from "react";
import { formatTimetohour } from "../../utils/timeConvert";
import { useNavigate } from "react-router-dom";

function LectureCard({ data }) {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState();
  return (
    <div
      onClick={(e) => {
        setClicked(!clicked);
        setTimeout(() => {
          navigate(`/course/${data?._id}/#`);
        }, 400);
      }}
      className={`${clicked ? "zoomed" : ""}`}
    >
      <div className="bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_4px] h-96 w-72 rounded-md flex flex-col hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_60px] hover:cursor-pointer transform scale-100 hover:scale-110 hover:z-50 duration-150 first-letter:` ">
        <div className="w-72 h-44  relative">
          <div
            className="absolute w-72 h-44 z-0"
            style={{
              background: "rgb(255,255,255)",
              background:
                "linear-gradient(-2deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 16%, rgba(255,255,255,0) 19%)",
            }}
          ></div>
          <img
            className="rounded-t-md"
            src={
              data?.playlist_img ||
              "https://img.youtube.com/vi/iPGXk-i-VYU/mqdefault.jpg"
            }
            alt=""
          />
        </div>
        <div className="flex flex- mx-2 overflow-auto">
          {/* <div className="text-sm m-1 px-3
      py-2 bg-gray-700 rounded-sm w-min  text-gray-200">
        Management
      </div>
      <div className="text-sm m-1 p-1 bg-cyan-300 rounded-md w-min bg-opacity-50 text-cyan-700">
        Man agement
      </div>
      <div className="text-sm m-1 p-1 bg-cyan-300 rounded-md w-min bg-opacity-50 text-cyan-700">
        HindiEnglish
      </div> */}
        </div>

        <div className="text-2xl font-semibold mx-3 mt-3 mb-2 ">
          {data?.title || "Authentication in NextJS fullStack"}
        </div>
        <div className="mx-3 mb-1 text-sm font-semibold text-gray-600">
          {
            console.log("tag", JSON.stringify(data)) // It's okay to keep this if it's for debugging
          }
          {data?.tags?.slice(0, 2).map((e, index) => {
            // Add a conditional check to append '.' only if it's not the last element
            return index !== 1 ? e.title + " . " : e.title;
          })}
          {/* Add a conditional check to include the language title */}
          {data?.tags?.length > 0 && data?.language && ` ${data?.language?.title}`}
        </div>
        <div className="mx-3 text-sm text-gray-600">
          {data?.channelName || "Hitesh Choudhary"}
        </div>
        <div className="mx-3 text-sm text-gray-600">
          {data?.review} ★ · {data?.views || "500k views"}
        </div>
        <div className="mx-3 text-sm text-gray-600">
          {(data && formatTimetohour(data?.duration)) || "27 hours"}
        </div>
      </div>
    </div>
  );
}

export default LectureCard;
