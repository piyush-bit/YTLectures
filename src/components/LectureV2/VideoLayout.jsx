import React from 'react'
import Description from './Description'

function VideoLayout({data,progress,next,previous}) {
  return (
    <div className="flex-grow bg-yellow-10 pl-4 pr-12 pt-8 h-screen overflow-auto">
          <div className="flex mb-10 mt-4 items-center">
            <div className=''>
              <div className="text-xs text-gray-600  ">
                {`Module ${progress[0]+1} : ${data.data.data[progress[0]].subtopic}/  Lecture ${progress[1]+1}`}
              </div>
              <div className="text-4xl font-bold">
                {data.data.data[progress[0]].data[progress[1]].title}
              </div>
            </div>

            <div className="ml-auto flex gap-0">
              <div className=" group w-10 h-10 flex justify-center items-center outline-gray-500 outline outline-1  transition-all  p-2 rounded-l-full ml-6 hover:w-16 hover:ml-0 ">
                <div className="flex items-center gap-1 "onClick={previous}>
                  <div className="hidden text-gray-500 group-hover:flex transition-all ">
                    next
                  </div>
                  <img
                    className="h-5 contrast-0 group-hover:hidden transition-all"
                    src="https://cdn-icons-png.flaticon.com/64/2985/2985161.png"
                    alt=""
                  />
                </div>
              </div>
              <div className=" group w-10 h-10 flex justify-center items-center bg-acc outline outline-1 outline-acc transition-all  p-2 rounded-r-full hover:w-16 hover:-mr-6">
                <div className="flex items-center gap-1" onClick={next}>
                  <div className="hidden text-white group-hover:flex transition-all ">
                    prev
                  </div>
                  <img
                    className="h-5 contrast- invert rotate-180 group-hover:hidden transition-all"
                    src="https://cdn-icons-png.flaticon.com/64/2985/2985161.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-5">
            <iframe
              className="w-full rounded-lg aspect-[1.9]"
              src={data.data.data[progress[0]].data[progress[1]].embedLink.replace(
                "watch?v=",
                "embed/"
              )}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="my-5">
            {/* <div className="text-4xl font-bold">Fundamental for Web Design</div> */}
            {/* {console.log('description',data.data.data[progress[0]].data[progress[1]].description)}
            <div >{
            data.data.data[progress[0]].data[progress[1]].description}</div> */}
            <Description data={data.data.data[progress[0]].data[progress[1]].description}/>

            <div className="group duration-300 flex gap-4 items-center justify-center outline rounded-md outline-1 outline-gray-500 px-5 py-3 w-fit ml-auto my-9 mx-5 hover:bg-acc hover:outline-acc hover:text-white cursor-pointer hover:mr-0 transition-all">
              <p className='-mr-8 group-hover:mr-0 transition-all'>Completed</p>
              <img className="h-5 rotate-180 scale-0  invert transition-all group-hover:scale-100 -my-4" src="https://cdn-icons-png.flaticon.com/64/2985/2985161.png" alt="" />
            </div>
          </div>
        </div>
  )
}

export default VideoLayout