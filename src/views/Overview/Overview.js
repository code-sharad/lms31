import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Overview.css";
import Companies from "../../components/Companies/Companies";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { extractErrorMessage } from "../../components/CustomError/Response.error";

function Overview() {
  const [activeCourse, setActiveCourse] = useState(null);

  const [category, setCategory] = useState({
    id: 1,
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/41/4d3d7c05fb42729c9d90352e072ca3/1060x596_GCC-photos_Karrim.png?auto=format%2Ccompress%2C%20enhance&dpr=1&w=320&h=180&fit=crop&q=50&crop=faces",
    courseName: "Data Science & Analytics",
    courseDuration: "2 months",
    btn1: "Backend dev",
    btn2: "Frontend dev",
    coursePrice: "50",
    courseDescription:
      "Learn data science and analytics with our comprehensive courses.",
    courseThumbnail:
      "https://ik.imagekit.io/sheryians/BackEnd%20Donation/nodeJs_0PymuvVgr.jpg",
    projects: "7",
    courseTeacher: "",

    assignment: "70+",
    lectures: "160",
  });

  const courseContent = {
    nodejs: [
      "Introduction to Node.js and NPM",
      "Setting up Node.js environment",
      "Understanding the Event Loop",
      "Working with Modules",
      "Creating HTTP Server",
      "Introduction to Express.js",
    ],
    expressjs: [
      "Setting up Express.js",
      "Routing in Express.js",
      "Middleware functions",
      "Building RESTful APIs",
      "Error handling in Express.js",
    ],
    mongodb: [
      "Introduction to MongoDB",
      "CRUD Operations",
      "Indexing and Aggregation",
      "Working with Mongoose",
      "Connecting MongoDB with Node.js",
    ],
  };

  const tools = [
    {
      name: "Node.js",
      image: "https://nodejs.org/static/images/logo.svg",
    },

    {
      name: "VS Code",
      image: "https://code.visualstudio.com/assets/images/code-stable.png",
    },
    {
      name: "Postman",
      image: "https://www.postman.com/assets/logos/postman-logo-stacked.svg",
    },
    {
      name: "GitHub",
      image:
        "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    },
    {
      name: "Docker",
      image:
        "https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png",
    },
  ];

  const { courseCode } = useParams();

  const type = useSelector((state) => state.user.user);

  console.log("type => ", type);

  const navigate = useNavigate();

  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        `/api/course/getCourseByCode?courseCode=${courseCode}`
      );

      console.log(" response => ", response);

      console.log("data => ", response.data);
      setCategory(response.data.data);
    } 
    catch (error) {
      console.log(error);
      alert("could not fetch the course");
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const checkoutHandler = async (amount, courseCode) => {
    try {
      const {
        data: { key },
      } = await axios.get("/api/getkey");

      const data = {
        amount: amount,
      };

      const {
        data: { order },
      } = await axios.post("/api/payment/createPaymentForCourse", data);

      const options = {
        key,
        amount: amount,
        currency: "INR",
        name: "gaurav ghuge",
        description: "Test Transaction of softwares",
        image: "https://example.com/your_logo",
        order_id: order.id,
        callback_url: `/api/payment/verifyPaymentForCourse/${courseCode}/${amount}`,
        prefill: {
          name: "Gaurav ghuge",
          email: "gauravghuge@microsoft.com",
          contact: "8767482793",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#83E633",
        },
      };

      let razor = new window.Razorpay(options);

      razor.open();
    } 
    catch (error) {
      console.log(error);
      console.log(error.response.data);

      const message = extractErrorMessage(error.response.data);

      if(message === "unauthorised user") {
          navigate("/login")
      }

    }
  };

  const buyCourse = async (courseCode, amount) => {


    if (!type) {
      navigate("/login");
    }

    checkoutHandler(category.coursePrice, courseCode)
                
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

        {/*  Headline Section */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 py-12">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-cyan-400 animate-fadeInSlow transition duration-1000 ease-in-out">
            Welcome to Our {category.courseName}
          </h1>
          <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-300 font-semibold max-w-3xl mx-auto">
            Start your journey in {category.courseName} with expert guidance, engaging projects, and hands-on learning.
          </p>
        </div>
      </div>


        {/* Course Details Section */}
        <div className="bg-gradient-to-b from-gray-900 to-black text-white rounded-lg shadow-xl overflow-hidden my-8 p-6 sm:p-10 mx-4 lg:mx-20 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Course Description */}
          <div className="flex-1 mb-10 lg:mb-0">
            <p className="text-3xl sm:text-4xl font-extrabold text-cyan-400 transition-colors duration-300 hover:text-cyan-300">
              {category.courseName}
            </p>
            
            {/* Price */}
            <p className="text-4xl sm:text-5xl font-bold mt-10">
              Only:{" "}
              <span className="text-cyan-400 animate-pulse">
                💵 ₹ {category.coursePrice / 100}
              </span>
            </p>
      
            {/* Buy Now Button */}
            <button
              onClick={() => buyCourse(courseCode, category.coursePrice)}
              className="mt-8 py-4 px-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 font-bold text-2xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Buy Now - Start Learning
            </button>
      
            {/* Course Description */}
            <p className="text-base sm:text-xl font-semibold mt-5 text-gray-300">
              {category.courseDescription}
            </p>
          </div>
      
          {/* Course Thumbnail */}
          <div className="flex-1 lg:ml-10">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 overflow-hidden rounded-lg shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
              <img
                src={category.courseThumbnail.private_url}
                alt={category.courseName}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out hover:rotate-3"  // Added hover rotation
              />
              <div className="absolute inset-0 border-4 border-gradient-to-r from-purple-500 to-pink-500 rounded-lg pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
      




        {/* Highlights Section */}
        <div className="flex flex-wrap justify-center gap-8 my-20">
          {[
            { label: "Projects", value: category.projects },
            { label: "Assignments", value: category.assignment },
            { label: "Lectures", value: category.lectures },
          ].map((item, index) => (
            <div
              key={index}
              className="relative text-center font-bold text-3xl p-10 rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-3xl border-2 border-transparent animate-pulse"></div>
              <div className="relative text-cyan-400 bg-gray-800 rounded-3xl p-10 font-sans shadow-lg">
                <p className="text-4xl mb-2">{item.value}</p>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Course Content Section */}
        <div className="flex flex-col items-center mt-20 mb-10">
          <h2 className="text-4xl text-cyan-500 font-bold">What You’ll Learn</h2>
          <h2 className="text-4xl text-white mt-2 font-bold">From Start to Victory</h2>

          {/* Toggle Content for Node.js */}
          <button
            className="bg-gray-800 text-white text-2xl mt-12 py-3 px-6 rounded-lg hover:bg-cyan-700 transition duration-300 ease-in-out"
            onClick={() =>
              setActiveCourse(activeCourse === "nodejs" ? null : "nodejs")
            }
          >
            {activeCourse === "nodejs" ? "Hide" : "Show"} Node.js Content
          </button>
          {activeCourse === "nodejs" && (
            <div className="p-4 bg-gray-800 text-cyan-400 rounded-lg mt-8 w-11/12 text-xl font-bold shadow-md">
              <h2 className="text-3xl mb-4">Node.js Course Content</h2>
              <ul className="list-disc list-inside text-white space-y-2">
                {courseContent.nodejs.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Toggle Content for Express.js */}
          <button
            className="bg-gray-800 text-white text-2xl mt-7 py-3 px-6 rounded-lg hover:bg-cyan-700 transition duration-300 ease-in-out"
            onClick={() =>
              setActiveCourse(activeCourse === "expressjs" ? null : "expressjs")
            }
          >
            {activeCourse === "expressjs" ? "Hide" : "Show"} Express.js Content
          </button>
          {activeCourse === "expressjs" && (
            <div className="p-4 bg-gray-800 text-cyan-400 rounded-lg mt-2 w-11/12 text-xl font-bold shadow-md">
              <h2 className="text-3xl mb-4">Express.js Course Content</h2>
              <ul className="list-disc list-inside text-white space-y-2">
                {courseContent.expressjs.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Toggle Content for MongoDB */}
          <button
            className="bg-gray-800 text-white text-2xl mt-7 py-3 px-6 rounded-lg hover:bg-cyan-700 transition duration-300 ease-in-out"
            onClick={() =>
              setActiveCourse(activeCourse === "mongodb" ? null : "mongodb")
            }
          >
            {activeCourse === "mongodb" ? "Hide" : "Show"} MongoDB Content
          </button>
          {activeCourse === "mongodb" && (
            <div className="p-4 bg-gray-800 text-cyan-400 rounded-lg mt-2 w-11/12 text-xl font-bold shadow-md">
              <h2 className="text-3xl mb-4">MongoDB Course Content</h2>
              <ul className="list-disc list-inside text-white space-y-2">
                {courseContent.mongodb.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Tools Section */}
        <div className="flex flex-col items-center mt-20 mb-10">
          <h2 className="text-4xl text-cyan-500 font-bold">Master These Tools</h2>
          <div className="flex overflow-x-auto mt-10 space-x-6 py-4">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="bg-gray-800 text-white rounded-lg shadow-lg m-4 p-5 text-center flex-shrink-0"
                style={{ minWidth: "200px" }}
              >
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="h-20 mx-auto mb-4"
                />
                <h3 className="text-2xl font-bold">{tool.name}</h3>
              </div>
            ))}
          </div>
        </div>
 

      <Companies />
      <Footer />
    </div>

  );
}

export default Overview;
