import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"



function Courses() {

  const [courses, setCourses] = useState([{
    _id: "",
    courseName: "",
    courseDescription: "",   
    courseCode: "",

    courseDuration: "",
    adminEmail: "",
    coursePrice: 0,

    courseThumbnail: "",
    courseStartDate: "",
    courseTeacher: [],



  }]);


  const fetchCourses = async () => {

    try {
    
      const response = await axios.get(`api/course/showAllCourses`) 

      console.log(" get all courses response  => ",response);

      console.log("response.data => ",response.data);

      console.log("response.data.data => ",response.data.data);

      if(response.data.data.length === 0) {

        return <div className="text-center text-white text-2xl font-bold">No Courses Found</div>
      }

      setCourses(response.data.data);
      
    } 
    
    catch (error) {
      console.log(error)
    }


  }


  useEffect(() => {

    fetchCourses()

  },[])




  return (
    <div className="min-h-screen  p-2">

  
      <h1 className="text-white text-6xl ml-20 font-bold mb-10">
        Courses Offered.
      </h1>



     <div className="flex flex-wrap justify-center gap-8">

      {courses && courses?.map((course) => (
        <div
          key={course._id}
          className="bg-gray-700 text-white rounded-lg shadow-lg overflow-hidden shadow-gray-200"
          style={{width:"25rem"}}
        >
          <img
            src={course.courseThumbnail.private_url}
            alt={course.title}
            className="w-full h-[250px]"
            height="200px"
          />

          <div className="p-5">
            <h2 className="text-2xl font-bold mt-4 mb-2">{course.courseName}</h2>
            
            <hr />
            <button className="text-cyan-400 mt-7 font-semibold text-xl ">
              { course.courseTeacher && course.courseTeacher?.map((teacher) => {
                return <div key={teacher.id}>{teacher}</div>
              })}
            </button>

            <div className="mt-7 flex flex-col justify-between mb-2  text-gray-300  text-xl font-bold">
              <div> By {course.adminEmail}</div>
              <div className="text-green-300"> ₹ {course.coursePrice /100}</div>
            </div>
          </div>
          
          <Link to={`/overview/${course.courseCode}`}>

            <div className="text-center text-black bg-cyan-400  font-bold p-2 ml-4 mr-4 mb-2  text-2xl  rounded">
              <button>Enrolled in Course</button>
            </div>

          </Link>

        </div>
      ))}
        
      </div>
 
    </div>
  );
}

export default Courses;
