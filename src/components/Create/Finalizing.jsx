import React, { useState } from "react";
import { Link } from "react-router-dom";

function Finalizing({ data }) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [language, setLanguage] = useState();
  const [description, setDescription] = useState("");
  // const [views, setViews] = useState("");
  return (
    <div className="bg-black h-screen w-screen bg-opacity-20 flex flex-col items-center justify-center overflow-auto">
      <div className="bg-white w-[700px] min-h-[750px]  h-fit flex flex-col flex-shrink shadow-md p-10 pb-0">
        <div className="text-2xl font-bold">
          <a className="text-acc">Y</a>Courses
        </div>

        <div>
          <div>Extra Details</div>

          <div className="md:px-20 flex flex-col gap-12 my-auto py-20">
            <div className="group -mb-6">
              <div className="flex justify-between">
                <div className="uppercase font-bold text-sm">PlaylistID</div>
                <div className="outline-none text-right flex-grow font-bold"></div>
              </div>
            </div>
            <div className="group -mb-6">
              <div className="flex justify-between">
                <div className="uppercase font-bold text-sm">Channel Name</div>
                <div className="outline-none text-right flex-grow font-bold"></div>
              </div>
            </div>

            {/* Title */}
            <div className="group">
              <div className="flex justify-between">
                <div className="uppercase font-bold text-sm">Title</div>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="outline-none text-right flex-grow font-bold"
                  type="text"
                  name="title"
                />
              </div>
              <div className="outline w-full my-2 group-focus-within:outline-acc"></div>
            </div>
            {/* Description */}
            <div className="group">
              <div className="flex  flex-col justify-between">
                <div className="uppercase font-bold text-sm">Description</div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="outline-none text-right flex-grow font-bold"
                  rows="4"
                  name="description"
                />
              </div>
              <div className="outline w-full my-2 group-focus-within:outline-acc"></div>
            </div>

            {/* Views */}
            {/* <div className="group">
              <div className="flex justify-between">
                <div className="uppercase font-bold text-sm">Views</div>
                <input
                  value={views}
                  onChange={(e) => setViews(e.target.value)}
                  className="outline-none text-right flex-grow font-bold"
                  type="text"
                  name="views"
                />
              </div>
              <div className="outline w-full my-2 group-focus-within:outline-acc"></div>
            </div> */}

            <div className="group">
              <div className="flex justify-between">
                <div className="uppercase font-bold text-sm">Language</div>
                <input
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="outline-none text-right flex-grow font-bold"
                  type="text"
                  name="title"
                />
              </div>
              <div className="flex">
                <div className="bg-gray-200 py-1 m-1 px-4 flex gap-2 rounded-2xl">Hindi <p>x</p> </div>
              </div>
              <div className="outline w-full my-2 group-focus-within:outline-acc"></div>
            </div>

            <div className="group">
              <div className="flex justify-between">
                <div className="uppercase font-bold text-sm">Tags</div>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="outline-none text-right flex-grow font-bold"
                  type="text"
                  name="title"
                />
              </div>
              <div className="flex">
                <div className="bg-gray-200 py-1 m-1 px-4 flex gap-2 rounded-2xl">UI&UX <p>x</p> </div>
              </div>
              <div className="outline w-full my-2 group-focus-within:outline-acc"></div>
            </div>
          </div>
        </div>

        <div className="flex mt-auto items-center font-semibold">
          <div className="ml-auto bg-black text-white py-4 px-16 mr-[-2.5rem] uppercase hover:bg-acc transition-all duration-200">
            Finish
          </div>
        </div>
      </div>
    </div>
  );
}

export default Finalizing;
