import React from "react";

function Profile() {
  return (
    <div className="flex bg-back w-screen h-screen pt-10">
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
      <div className="mx-8 flex-grow">
        <h1 className="text-3xl font-bold h-8 mt-3 ">Profile</h1>
        div
      </div>
    </div>
  );
}

export default Profile;
