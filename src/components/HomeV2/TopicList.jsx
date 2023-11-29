import React from "react";

function TopicList(props) {
  return (
    <div className={`uppercase flex items-center hover:shadow-md hover:outline outline-1 outline-gray-200   hover:cursor-pointer  font-semibold py-2 px-4 my-1 w-52 rounded-sm  ${props.isActive ? 'bg-white shadow-df':'text-gra'} `}>
      {props.name}
    </div>
    
  );
}

export default TopicList;
