import React from "react";
import { PTtocolConvert } from "../../utils/timeConvert";
import { useNavigate } from "react-router-dom";

function Video({ data, active, setProgress, index }) {
  const navigate = useNavigate();

  const clickHandler = (e) => {
    setProgress(index);
    navigate(`./?m=${index[0]}&l=${index[1]}`, { replace: true });
  };
  return (
    <div
      onClick={clickHandler}
      className={`flex items-center bg-opacity-10 ${
        active ? "back-grad" : ""
      } grad-acc hover:bg-opacity-10`}
    >
      <div
        className={`w-1  h-16 ${
          active ? "bg-acc" : "bg-gray-300"
        } mr-2 font-medium flex-shrink-0`}
      ></div>
      <div className="leading-5 ">{`${data.title}`}</div>

      <div className="text-xs text-gray-600 ml-auto flex-shrink rotate-90">
        {PTtocolConvert(data.duration)}
      </div>
    </div>
  );
}

export default Video;
