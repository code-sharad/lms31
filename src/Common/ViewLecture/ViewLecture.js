import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Comment from "../../Tabs/Comment";
import Attachment from "../../Tabs/Attachment";
import Doubts from "../../Tabs/Doubts";
import Refrence from "../../Tabs/Refrence";
import axios from "axios";
import { useParams } from "react-router-dom";

function ViewLecture() {
  const { courseCode } = useParams();
  console.log(courseCode)
  const [activeVideo, setActiveVideo] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const playVideo = (data, video) => {
    setActiveVideo(video);
    setPlaying(true);
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleSeek = (seconds) => {
    setPlaying(false);
    setTimeout(() => setPlaying(true), 100);
    activeVideo.ref.seekTo(seconds, "seconds");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [lectureList, setLectureList] = useState([
    {
      lectureName: "Lecture Name",
      lectureDescription: "Lecture Description",
      videoLink: "https://www.w3schools.com/w3images/avatar.png",
    },
  ]);

  const [lectureDetails, setLectureDetails] = useState(
    {
      lectureName: "",
      lectureDescription: "",
      videoLink: "",

    },
  );

  const fetchLectureList = async () => {

    try {
      // form-urlencoded

      const code = new URLSearchParams();
      code.append("courseCode", courseCode);

      const response = await axios.post(
        "/api/student/getLecturesByCourse/",
        code
      );

      console.log("response => ", response);

      console.log("response.data.data => ", response.data.data);


      setLectureList(response.data.data);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLectureDetails = async (lectureCode) => {
    try {

      console.log("lectureCode => ", lectureCode);

      const body = {
        lectureCode: lectureCode,
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }

      const response = await axios.post(
        `/api/student/getLectureDetails`,
        body,
        config
      );
      

      console.log("response => ", response);

      console.log("response.data.data => ", response.data.data);


      setLectureDetails(response.data.data);

      playVideo(response.data.data, response.data.data?.videoLink?.private_url);
      
    } 
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLectureList();
  }, []);

  return (

    <div className="w-full">

      <nav className="flex justify-between shadow-md text-center items-center w-full bg-gray-700 p-5 text-white border-b">
          Lecture : {lectureDetails?.lectureName}
      </nav>

      <div className="flex  flex-col md:flex-row md:h-[60rem]">

        { (
          <div className="w-full md:w-full flex flex-col items-center bg-gray-900 p-5">
            
          
            <div className="w-full md:w-[100%] p-5 border border-gray-500 rounded">
            
              <ReactPlayer
                url={activeVideo}
                playing={playing}
                controls
                className="rounded md-h-[28rem]"
                width={"100%"}
                height={"32rem"}
                
              />
            
            </div>


            <div className="mt-5 flex space-x-4">
              <button
                onClick={handlePlayPause}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {playing ? "Pause" : "Play"}
              </button>

              {/* 
                <button
                  onClick={() => handleSeek(activeVideo.ref.getCurrentTime() - 5)}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  -5s
                </button>
                <button
                  onClick={() => handleSeek(activeVideo.ref.getCurrentTime() + 5)}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  +5s
                </button>
              */}

            </div>

            <ul className="text-white flex flex-col md:flex-row gap-2 md:gap-5 py-5 md:py-10">
              <li className="flex-1 text-center">
                <button
                  className="p-2 w-full cursor-pointer tracking-wider hover:text-slate-300"
                  onClick={() => handleTabChange("comments")}
                >
                  Comments
                </button>
              </li>

              <li className="flex-1 text-center">
                <button
                  className="p-2 w-full cursor-pointer tracking-wider hover:text-slate-300"
                  onClick={() => handleTabChange("attachments")}
                >
                  Attachments
                </button>
              </li>

              <li className="flex-1 text-center">
                <button
                  className="p-2 w-full cursor-pointer tracking-wider hover:text-slate-300"
                  onClick={() => handleTabChange("doubts")}
                >
                  Doubts
                </button>
              </li>

              <li className="flex-1 text-center">
                <button
                  className="p-2 w-full cursor-pointer tracking-wider hover:text-slate-300"
                  onClick={() => handleTabChange("refrence")}
                >
                  Refrence
                </button>
              </li>
            </ul>

            <div className="w-full">
              {activeTab === "comments" && <Comment />}
              {activeTab === "attachments" && <Attachment />}
              {activeTab === "doubts" && <Doubts />}
              {activeTab === "refrence" && <Refrence />}
            </div>
          </div>
        )}

        <ul className="space-y-5 py-5 mx-auto md:w-1/4 w-full max-w-screen-md border">
          {lectureList.map((data, i) => (
            <button
              key={i}
              className="flex flex-col w-full md:flex-row items-center shadow-lg gap-5 md:gap-10 px-5 md:px-10 bg-gray-800 rounded-lg shadow-gray-600 hover:bg-slate-400"
              onClick={() => fetchLectureDetails(data?._id)}
            >
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-medium mb-2 text-white">
                  {data.lectureName}
                </h3>
                <h5 className="text-gray-100 mb-2 text-lg md:text-xl">
                  {data.lectureDescription}
                </h5>
                <p className="text-gray-500">{data.channel}</p>
              </div>
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ViewLecture;