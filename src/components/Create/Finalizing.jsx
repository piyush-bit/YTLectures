import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Finalizing({ result, tagOptions, languageOptions }) {
  const [title, setTitle] = useState(result?.title);
  const [tags, setTags] = useState([]);
  const [language, setLanguage] = useState();
  const [description, setDescription] = useState(result?.description);
  const navigate = useNavigate()

  const onSubmitHandler = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/createcourse`, {
        title,description
        ,...result
        ,language : undefined
        
      },{
        withCredentials: true
      })
      console.log(res);

      tags.map(async (e) => {
        await axios.put(`${import.meta.env.VITE_BASE_URL}/api/search/addtag`, {
          courseId : res.data[0]._id,
          tagId : e
        })
      })

      const lang = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/search/addlanguage`, {
        courseId : res.data[0]._id,
        languageId : language
      })

      navigate(`/course/${res.data[0]._id}`)

    } catch (error) {
      
    }
  }; 

  return (
    <div className="bg-white mx-auto w-[700px] min-h-[750px] max-h-full flex flex-col  shadow-md p-10 pb-0">
      <div className="text-2xl font-bold">
        <a className="text-acc">Y</a>Courses
      </div>

      <div className="md:px-20 flex flex-col gap-12 my-auto pt-10 overflow-auto">
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

        <div className="group">
          <div className="flex flex-wrap gap-3 justify-start items-baseline">
            <div className="uppercase font-bold text-sm">Language : </div>
            {languageOptions?.map((e, i) => {
              return (
                <div
                  onClick={() => {
                    if (language == e?._id) {
                      setLanguage(null);
                    } else setLanguage(e?._id);
                  }}
                  key={i}
                  className={`px-4 py-1 bg-white shadow-sm cursor-pointer rounded-full  ${
                    language == e?._id && "border-acc border-2"
                  }`}
                >
                  {e?.title}
                </div>
              );
            })}
            <div
              onClick={null}
              className={`px-4 py-1 bg-white shadow-sm cursor-pointer rounded-full  `}
            >
              +
            </div>
          </div>
          <div className="mt-4 outline w-full my-2 group-focus-within:outline-acc"></div>
        </div>

        <div className="group">
          <div className="flex flex-wrap gap-3 items-baseline justify-start">
            <div className="uppercase font-bold text-sm">Tags :</div>
            {tagOptions?.map((e, i) => {
              return (
                <div
                  onClick={() => {
                    if (tags.includes(e?._id)) {
                      setTags(tags.filter((f) => f != e?._id));
                    } else setTags([...tags, e?._id]);
                  }}
                  key={i}
                  className={`px-4 py-1 bg-white shadow-sm cursor-pointer rounded-full  ${
                    tags.includes(e?._id) && "border-acc border-2"
                  }`}
                >
                  {e?.title}
                </div>
              );
            })}
            <div
              onClick={null}
              className={`px-4 py-1 bg-white shadow-sm cursor-pointer rounded-full  `}
            >
              +
            </div>
          </div>
        </div>
      </div>
      <div className="ml-auto mb-8 mt-4">
        <button onClick={onSubmitHandler} className="bg-acc text-white py-2 px-8">Submit</button>
      </div>
    </div>
  );
}

export default Finalizing;
