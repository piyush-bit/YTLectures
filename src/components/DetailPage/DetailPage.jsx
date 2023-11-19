import React from "react";

function DetailPage() {
  return (
    <div className="flex bg-back w-screen pt-10">
      <div className="flex h-screen w-screen">
        <div className="h-8 w-8 ml-16 mr-10 mt-3 rounded-full outline outline-gray-500 outline-1 flex items-center justify-center    hover:h-12 hover:w-12 hover:mx-14 hover:mt-1 duration-150 hover:cursor-pointer">
          <img
            className="h-5 contrast-0 "
            src="https://cdn-icons-png.flaticon.com/64/130/130882.png"
            alt=""
          />
        </div>
        <div className="max-w-[60rem] h-screen pr-8 pl-6 overflow-y-auto">
          <div className="flex items-center gap-3  h-14">
            <div className="mr-auto text-2xl font-semibold text-gray-800">
              Course Details
            </div>
            <div className="flex items-center text-gray-600 gap-2 text-xs outline py-1 px-2 outline-gray-500 outline-1 hover:cursor-pointer hover:bg-gray-200">
              <img
                className="h-3 contrast-0"
                src="https://cdn-icons-png.flaticon.com/64/9356/9356210.png"
                alt=""
              />
              Edit Course
            </div>
            <div className="w-10 h-6 flex items-center justify-center outline outline-gray-500 m-1 outline-1 hover:cursor-pointer hover:bg-gray-200">
              <img
                className="h-5 contrast-0"
                src="https://cdn-icons-png.flaticon.com/64/3018/3018442.png"
                alt=""
              />
            </div>
          </div>
          <div className="text-7xl font-bold my-20 mr-40 ">
            Fundamentals of Design Thinking
          </div>
          <div className="flex items-center gap-10 text-lg text-gra">
            <div className="text-lg px-4  py-1 rounded-md bg-black text-white">
              Design
            </div>
            |
            <div className="flex items-center gap-3">
              <img
                className="h-5 contrast-0"
                src="https://cdn-icons-png.flaticon.com/64/3239/3239945.png"
                alt=""
              />

              <div className="flex text-gray-700">
                1<div className="text-xs mr-2 text-gray-500">H</div>
                32
                <div className="text-xs text-gray-500">MIN</div>
              </div>
            </div>
            |
            <div className="flex items-center gap-3 text-gray-700">
              <img
                className="h-5 contrast-0"
                src="https://cdn-icons-png.flaticon.com/64/2948/2948088.png"
                alt=""
              />
              Aug 17 , 2019
            </div>
            |
            <div className="text-lg px-4  py-1 rounded-sm  text-gray-600 outline outline-gray-600 outline-1">
              Hindi
            </div>
          </div>

          <div className="outline outline-1 outline-gray-200 mx-0 my-10"></div>

          <div className="pt-6">
            <div className="text-2xl font-semibold my-3">Course Statistics</div>
            <div className="text-gray-500 line-clamp-2">
              ln this design thinking course you'll get to work on an actual
              business case example - we'll be using design thinkíng to create
              the best experience. This will allow you to full undestand how the
              desing This text was recognized by the built-in Ocrad engine. A
              better transcription may be attained by right clicking on the
              selection and changing the OCR engine to "Tesseract" (under the
              "Language" menu). This message can be removed in the future by
              unchecking "OCR Disclaimer" (under the Options menu). More info:
              http://projectnaptha.com/ocrad{" "}
            </div>
            <div className="text-acc mt-3 hover:cursor-pointer">Read more</div>
          </div>

          <div className="outline outline-1 outline-gray-200 mx-0 my-10"></div>

          <div className="pt-10">
            <div className="mb-6">
              <div className="text-2xl font-bold">Introduction</div>
              <div className="text-sm text-gray-500">2 Videos . 10:34</div>
            </div>
            <div className="flex gap-3 items-center mx-[-1.4rem]  px-5 py-4 rounded-md hover:bg-white hover:shadow-xl">
              <img
                className="blue-fill h-8"
                src="https://cdn-icons-png.flaticon.com/64/2859/2859706.png"
                alt=""
              />
              <div className="mr-auto ml-3 font-semibold">An Introduction to Design Thinking</div>
              <div className="text-gray-500">2:00</div>
            </div>

            

          
              

           

            



            

           

                </div>
        </div>

        <div className="h-screen outline outline-1 outline-gray-200 "></div>
        <div className="ml-8 mr-6 flex-grow  flex justify-center">
          <div className="bg-white max-w-lg p-5 h-max shadow-md mt-24 hover:shadow-lg">
            <div className="text-2xl font-semibold my-3">Course Statistics</div>
            <div className="flex gap-6 mb-5 ">
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
            </div>

            <div className="outline outline-gray-200 outline-1 "></div>
            <img
              className="my-5 pt-5"
              src="https://img.youtube.com/vi/JoJ8Sw5Yb4c/mqdefault.jpg"
              alt=""
            />
            <div className="font- text-gray-600">4.5 ★ · (445 review)</div>
            <div className="font- text-gray-600">55k + youtube views</div>
            <div className="font- text-gray-600">Tutuor : Hitesh Choudhary</div>
            <div className="font- text-gray-600">created by : Piyush Kumar</div>
            <div className="font- text-gray-600">
              last Updatedd on :22-11-23
            </div>
            <div className="flex items-center mt-5 mb-6 gap-5">
              <button className="px-6 py-2 bg-acc text-white hover:outline hover:outiline-1 hover:outline-acc hover:text-acc hover:bg-white">
                Enroll for Free
              </button>
              <div className="text-sm text-gray-700 font-light leading-4 max-w-[6rem]">303 already enrolled</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
