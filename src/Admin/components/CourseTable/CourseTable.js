import React, { useEffect, useState } from "react";
import OrdersTable from "../Orders/OrdersTable";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
//Course Sidebar Data panel

const inputClasses = "border border-input rounded p-1";
const buttonClasses = "p-2 border border-border rounded";

const primaryClasses = "bg-primary text-primary-foreground";

// Define the CourseCard component
const initialVideos = [];

const CourseTable = () => {
  const [showOverview, setShowOverview] = useState(false);
  const [getCourse, setgetCourse] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [teacherDetails, setTeacherDetail] = useState();
  const [selectedTeacher, setSelectedTeacher] = useState();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    axios.get("/api/course/getCourses").then((res) => {
      setgetCourse(res.data.data);
      setTeacherDetail(res.data?.anything);
      // setFilteredProducts(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      selectedProduct.courseTeacher.map((data) => {
        teacherDetails.map((teacher) => {
          if (teacher.teacherEmail === data) {
            console.log(teacher);
            setSelectedTeacher(teacher);
          }
          return null;
        });
        return null;
      });
    }
  }, [selectedProduct, showOverview]);
  const [file, setfile] = useState();
  const [videos, setVideos] = useState(initialVideos);
  const [showForm, setShowForm] = useState(false);
  const [signedUrl, seteSignedUrl] = useState(null);
  const [newVideo, setNewVideo] = useState({});
  const [courseCode,setCourseCode]= useState();
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
      `/api/course/uploadLecturesa?courseCode=${courseCode}`
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
        `/api/course/uploadLecturesa/videoUrl`,
        videoForm
      );
      console.log("response 3=>", response3);
    }

    setUploading(false);

    console.log("response 2=>", resposne2);
  };

  const CourseCard = ({ product }) => (
    <div
      onClick={() => {
        setSelectedProduct(product);
        setCourseCode(product.courseCode)
      }}
      className="flex bg-white rounded-2xl  flex-col "
    >
      <img
        src={`${product.courseThumbnail.private_url}`}
        alt="Course"
        className="w-full rounded-t-2xl mb-4 object-fill h-40"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.courseName}</h3>
        <p>
          <strong>Course Code:</strong> {product.courseCode}
        </p>
        <p>
          <strong>Price:</strong> {product.coursePrice}
        </p>
        <p>
          <strong>Duration:</strong>{" "}
          {`${(Number(product.courseDuration) / 60).toFixed()}  Hrs`}
        </p>
        <div className="flex justify-between w-full">
          <p className="">
            <strong>Start Date:</strong> {product.courseStartDate.slice(0, 7)}
          </p>
          <p>
            <strong>End Date:</strong> {product.courseEndDate.slice(0, 7)}
          </p>
        </div>
        {/* <p>
          <strong>Teacher:</strong> {product.courseTeacher.map((data) => data)}
        </p> */}
        <section className="flex my-4 justify-center gap-12 items-center ">
          <button
            onClick={() => setShowOverview(true)}
            className="border-1 shadow-md rounded-lg border-gray-300 p-2 text-xl text-gray-600 hover:bg-gray-100 bg-blue-300 hover:text-green-500 transition-colors duration-200"
          >
            View Course
          </button>

          <Link to={`/admin/viewLectures/${product.courseCode}`}>
            <button className="border-1 shadow-md rounded-lg border-gray-300 p-2 text-xl text-gray-600 hover:bg-gray-100 bg-blue-300 hover:text-green-500 transition-colors duration-200">
              View Lectures
            </button>
          </Link>
          <button
            onClick={() => setShowForm(true)}
            className="border-1 shadow-md rounded-lg border-gray-300 p-2 text-xl text-gray-600 hover:bg-gray-100 bg-blue-300 hover:text-green-500 transition-colors duration-200"
          >
            Upload Lecture
          </button>
        </section>
        <Link to="/admin/updateCourse">
          <button className="border-1 shadow-md rounded-lg border-gray-300 p-2 text-xl text-gray-600 hover:bg-gray-100 bg-blue-300 hover:text-green-500 transition-colors duration-200">
            Update Course
          </button>
        </Link>
      </div>
    </div>
  );

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setFilteredProducts(
      getCourse.filter((product) =>
        product.course.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className="my-8 mx-4 h-screen w-full">
      <div className="p-4  rounded-lg flex flex-col w-full">
        {/* <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <input
              type="text"
              className={inputClasses}
              placeholder="Search courses..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className={buttonClasses + " " + primaryClasses}>Add Course</button>
          </div>
        </div> */}
        {/* <div className="flex flex-wrap">
          {filteredProducts.map(product => (
            <CourseCard 
              key={getCourse.id} 
              product={getCourse} 
            />
          ))}
        </div> */}
        <div className="flex gap-10  flex-wrap">
          {getCourse.map((product) => (
            <CourseCard key={product.id} product={product} />
          ))}
        </div>
        <div>
          {showForm && (
            <div className="modal">
              <div className="modal-content">
                <span className="close-btn" onClick={() => setShowForm(false)}>
                  &times;
                </span>
                <form
                  className="upload-form"
                  onSubmit={(e) => e.preventDefault()}
                >
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
                      <label className="text-gray-800">
                        Lecture Description *
                      </label>
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
        </div>
        <div>
          {showOverview && (
            <div className="mt-4 p-4 border border-gray-200 rounded shadow-md shadow-gray-600 bg-gray-50">
              <h3 className="text-lg text-center font-semibold">
                Course Overview
                <span
                  className="absolute top-0 right-0 p-2 text-gray-400 bg-gray-100 rounded-full cursor-pointer"
                  onClick={() => setShowOverview(false)}
                >
                  {" "}
                  x{" "}
                </span>
              </h3>

              <header className="flex flex-col md:flex-row justify-center items-start md:justify-around lg:justify-around xl:items-start">
                <main className="flex rounded p-4 flex-col justify-between items-start ">
                  <img
                    src={`${selectedProduct.courseThumbnail.private_url}`}
                    alt="Course"
                    className="w-full mb-4 h-40 object-cover"
                  />

                  <h3 className="text-xl font-semibold mb-2">
                    {selectedProduct.courseName}
                  </h3>
                  <p>
                    <strong>Course Code:</strong>
                    {selectedProduct.courseCode}
                  </p>

                  <p>
                    <strong>Price:</strong>
                    {selectedProduct.coursePrice}
                  </p>
                  <p>
                    <strong>Duration:</strong>
                    {selectedProduct.courseDuration}
                  </p>
                  {/* 
                  <div className="flex flex-col justify-between w-full">
                    <p className="">
                      <strong>Start Date:</strong>{" "}
                      {selectedProduct.courseStartDate.slice(0, 7)}
                    </p>
                    <p>
                      <strong>End Date:</strong>{" "}
                      {selectedProduct.courseEndDate.slice(0, 7)}
                    </p>
                  </div> */}
                </main>

                {/***  Course teachers  ***/}
                <main className="flex rounded p-4 flex-col py-12 justify-between items-center shadow-xl shadow-gray-600">
                  <h3 className="text-lg text-center mb-6 font-semibold">
                    Course Teachers
                  </h3>
                  <div className="flex flex-col gap-4">
                    {selectedTeacher && (
                      <div className="flex gap-4  w-[400px] justify-center  items-start">
                        <img
                          src={`${selectedTeacher.teacherProfile}`}
                          alt="Teacher"
                          className="w-20 h-20 rounded-full"
                        />
                        <div className="flex flex-col gap-3">
                          <h3 className="text-lg font-semibold">
                            {selectedTeacher.teacherFullName}
                          </h3>
                          <p>{selectedTeacher.teacherEmail}</p>
                          <p>{selectedTeacher.teacherPhoneNumber}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </main>
              </header>

              <OrdersTable courseCode={selectedProduct.courseCode} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseTable;
