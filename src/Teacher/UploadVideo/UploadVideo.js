import React, { useState } from "react";
import "./UploadVideo.css";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";

const initialVideos = [];

const UploadVideo = () => {
  const [videos, setVideos] = useState(initialVideos);
  const [showForm, setShowForm] = useState(false);
  const [signedUrl, seteSignedUrl] = useState(null);
  const [newVideo, setNewVideo] = useState({
    video: "",
    duration: "",
    lectureName: "",
    courseCode: "",
    lectureDescription: "",
    lectureImage: "",
    attachments: "",
    rating: "",
    teacherMail: "",
  });

  const [file, setfile] = useState();

  const [filterDuration, setFilterDuration] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { courseCode } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVideo({ ...newVideo, [name]: value });
  };

  const handleFile = (e) => {
    setfile(e.target.files[0]);
  };
  const handleVideoUpload = async (e) => {
    if (!file) return;

    // const videoUrl = URL.createObjectURL(file);
    // const video = document.createElement("video");

    // video.preload = "metadata";
    // video.onloadedmetadata = () => {
    //   window.URL.revokeObjectURL(videoUrl);
    //   const duration = Math.floor(video.duration);
    //   const minutes = Math.floor(duration / 60);
    //   const seconds = duration % 60;
    //   setNewVideo({
    //     ...newVideo,
    //     video: videoUrl,
    //     duration: ${minutes}m ${seconds}s,
    //   });
    // };
    // video.src = videoUrl;
    const response = await axios.post(
      `/api/course/uploadLectures?courseCode=${courseCode}`
    );
    seteSignedUrl(response.data.signedurl);
    console.log("response 1=>", response);

    const formData = new FormData();
    formData.append("file", file);
    const resposne2 = await axios.put(response.data.signedurl, file, {
      headers: {
        "Access-Control-Allow-Origin":
          "videostreaming31.s3.eu-north-1.amazonaws.com",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "video/mp4",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log("Upload percentCompleted=>", percentCompleted);
        setUploading(true);
        setUploadProgress(percentCompleted);
      },
    });
    const videoUrl = response.data.signedurl.split("/")[5].split("?")[0];

    if (resposne2.status === 200) {
      const videoForm = new FormData();
      videoForm.append("videourl", videoUrl);
      videoForm.append("lectureName", newVideo.lectureName);
      videoForm.append("lectureDescription", newVideo.lectureDescription);
      videoForm.append("courseCode", courseCode);
      const response3 = await axios.post(
        `/api/course/uploadLectures/videoUrl`,
        videoForm
      );
      console.log("response 3=>", response3);
    }

    setUploading(false);

    console.log("response 2=>", resposne2);
  };

  const filteredVideos = videos.filter((video) => {
    const videoDuration = parseInt(video.duration.split("m")[0]);
    const durationMatch =
      filterDuration === "" ||
      (filterDuration === "5" && videoDuration < 5) ||
      (filterDuration === "10" && videoDuration < 10) ||
      (filterDuration === "20" && videoDuration < 20) ||
      (filterDuration === "30" && videoDuration < 30) ||
      (filterDuration === "40" && videoDuration < 40) ||
      (filterDuration === "50" && videoDuration < 50) ||
      (filterDuration === "60" && videoDuration < 60) ||
      (filterDuration === "61" && videoDuration > 61);
    const categoryMatch =
      filterCategory === "" || video.category === filterCategory;
    return durationMatch && categoryMatch;
  });

  const handleVideoClick = (video) => {
    const videoElement = document.createElement("video");
    videoElement.src = video.video;
    videoElement.controls = true;
    videoElement.style.width = "100%";
    videoElement.style.height = "100%";
    document.body.appendChild(videoElement);
    videoElement.requestFullscreen();
    videoElement.play();

    videoElement.onended = () => {
      videoElement.remove();
    };

    videoElement.onfullscreenchange = () => {
      if (!document.fullscreenElement) {
        videoElement.remove();
      }
    };
  };

  return (
    <div className="upload-video-container">
      <Navbar />

      <div className="controls-container">
        <div className="upload-btn-container">
          <button onClick={() => setShowForm(true)} className="upload-btn">
            Upload Video
          </button>
        </div>
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowForm(false)}>
              &times;
            </span>
            <form className="upload-form" onSubmit={(e) => e.preventDefault()}>
              <h2>Upload Video</h2>
              <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
                <div className="mb-4">
                  <label
                    htmlFor="file-upload"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Choose a file
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFile}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <div className="form-group">
                  <label className="text-gray-800">Lecture Name *</label>
                  <input
                    type="text"
                    name="lectureName"
                    value={newVideo.lectureName}
                    onChange={handleInputChange}
                    placeholder="Lecture Name"
                    required
                  />
                </div>
                <div className="form-group my-4">
                  <label className="text-gray-800">Lecture Description *</label>
                  <textarea
                    name="lectureDescription"
                    value={newVideo.lectureDescription}
                    onChange={handleInputChange}
                    placeholder="Lecture Description"
                    required
                    className="p-1 text-black"
                  ></textarea>
                </div>
                <button
                  onClick={handleVideoUpload}
                  disabled={!file || uploading}
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
                {uploading && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-blue-700">
                        Uploading...
                      </span>
                      <span className="text-sm font-medium text-blue-700">
                        {uploadProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

                {/***
              <div className="form-row">

                <div className="form-group">
                  <label>Lecture Image *</label>
                  <input type="file" name="lectureImage" onChange={handleInputChange} accept="image/*" />
                </div>
                

                <div className="form-group">
                  <label>Attachments *</label>
                  <input type="file" name="attachments" onChange={handleInputChange} accept=".pdf,.doc,.ppt,.zip" />
                </div>

              </div>

              */}

 
            </form>
          </div>
        </div>
      )}



      <div>
        <h2 className="text-center text-5xl font-semibold"> Instructions and GuideLines For Video Uploading </h2>

        <br/>

        <ul className="text-lg">


        <li type="disc">Ensure the video is in a web-compatible format like MP4, WebM, or Ogg.</li>
        <li type="disc">Compress the video to reduce file size for faster loading and smoother playback.</li>
        <li type="disc">Host the video on a reliable platform or server for easy access and sharing.</li>
        <li type="disc">Include video metadata such as titles, descriptions, and keywords for better searchability.</li>
        <li type="disc">Test the video on multiple devices and browsers to ensure compatibility and responsiveness.</li>
          
        </ul>
      
      
      
      </div>
      



    </div>
  );
};

export default UploadVideo;
