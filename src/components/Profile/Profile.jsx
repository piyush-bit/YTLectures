import React from "react";

function Profile() {
  return (
    <div className="flex bg-back w-screen h-screen pt-10">
       <div onClick={()=>{navigate(-1)}} className="h-8 w-8 ml-16 mr-10 mt-3 rounded-full outline outline-gray-500 outline-1 lg:flex items-center justify-center hover:h-12 hover:w-12 hover:mx-14 hover:mt-1 duration-150 hover:cursor-pointer hidden">
          <img
            className="h-5 contrast-0 "
            src="https://cdn-icons-png.flaticon.com/64/130/130882.png"
            alt=""
          />
        </div>
        <div className="mx-8 flex-grow">
            <div className="mt-2 font-semibold text-gray-800 text-3xl">
              
            </div >


            <div className="flex mx-10 my-20 items-center">

                <div className="h-72 w-72 m-4 bg-white rounded-full">
                    <img className="h-72 w-72 object-cover rounded-full p-2" src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                    alt="" />
                </div>
                <div className=" mx-10">
                    <h1 className="text-4xl font-semibold text-gray-800">Piyush Kumar</h1>
                    <h2 className="text-lg text-gray-600">@piyush223 . 12 enrollment</h2>
                    <h3 className="text-gray-600">2 completed . 10 in progress</h3>
                </div>
            </div>
            <p>Enrolled Courses</p>
            <div className="outline outline-1 outline-gray-200 mr-40"></div>

            <div className=" my-8 flex gap-6">
                <img src="https://i.ytimg.com/vi/vz1RlUyrc3w/mqdefault.jpg" alt="" />
                <div className="">
                    <h1 className="text-2xl">React Native Mastery with 10 apps</h1>
                    <h2 className="font-medium">Hitesh Choudhary . 438,974 youtube views</h2>
                    <h3>Learn reactjs with chai and me. This is one of beginner friendly reactjs series that will teach you foundation of reactjs by building projects in react.</h3>

                    <h1 className="text-8xl">*****</h1>

                </div>
                <div className="">
                    2/5 lectures completed
                </div>
            </div>
        </div>
    </div>
  );
}

export default Profile;
