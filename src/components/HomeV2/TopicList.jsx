import React from "react";

function TopicList(props) {
  return (
    <div className={`uppercase flex items-center hover:text-black hover:cursor-pointer  font-bold py-2 px-4 my-1 w-52 rounded-sm  ${props.isActive ? 'bg-white shadow-md':'text-gra'} `}>
      {props.name}
    </div>
    
  );
}

export default TopicList;
