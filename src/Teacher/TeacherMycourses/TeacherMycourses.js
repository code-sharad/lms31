import React from "react";
import {Link} from "react-router-dom"
import axios from "axios"

import {useState, useEffect} from "react"
import Navbar from "../../components/Navbar/Navbar";

 
function TeacherMycourses() {
  
  const [courses , setcourses]= useState([{
    _id: "",
    courseName : "",
    adminEmail:"",
    courseDescription : "",
    courseImage : "",
    courseLanguges : "",
    courseAuthor : "",
    viewCoursesLink : "/viewLecture",
    viewcourses:"View Courses",
    uploadCoursesLink : "/uploadvideo",
    uploadcourses:"Upload Lecture ",
    courseCode:"",
    }]);

  const fetchmycourses = async () => {
    
    try {
        const response = await axios.get('/api/teacher/getMyCourses');

        console.log("response =>", response);

        console.log("Get All My Courses",response.data);

        console.log("response.data =>", response.data);

        console.log("response.data.data =>", response.data.data);

        setcourses(response.data.data);

    }
    catch (error){
      
      console.log(error);
    }
  }
  useEffect(() => {
    fetchmycourses()

  }, [])

  return (

    <div>
    
      <Navbar />


      <div className="min-h-screen  p-10">

        

        <h1 className="text-white text-6xl ml-20 font-bold mb-10">
          My Courses.
        </h1>
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ml-20">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-black text-white rounded-lg shadow-lg overflow-hidden"
            >
                <img 
                  src={course.courseThumbnail?.private_url}
                  alt={course.title} 
                  className="w-full h-[250px]"
                  height="200px"
                />

              {/* <img
                src={course.courseImage}
                alt={course.title}
                className="w-full h-70 object-cover"
              /> */}
              <div className="p-5">
                <h2 className="text-2xl font-bold mt-4 mb-2">{course.courseName}</h2>
                
                <hr />
                <button className="text-cyan-400 mt-7 font-semibold text-xl ">
                  {course.courseLanguges}
                </button>

                <div className="mt-7 flex justify-between mb-2  text-gray-300  text-xl font-bold">
                  <div> By {course.adminEmail}</div>
                </div>
              </div>
              <div className="flex justify-center space-x-4 text-2xl mb-2">
                <Link to={`/teacher/ViewLecture/${course.courseCode}`}>
                  <button className="bg-cyan-400 text-black font-bold p-2 rounded">
                    View Lectures
                  </button>
                </Link>
                <Link to={`/uploadvideo/${course.courseCode}`}>
                  <button className="bg-cyan-400 text-black font-bold p-2 rounded">
                  Upload Lectures
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
    
      </div>

    </div>
  );
}

export default TeacherMycourses;
