import React, { useEffect, useState } from "react";
import axios from "axios";

//

function UpdateCourse() {
  const [teachers, setTeachers] = useState(null);
  const [TotalCourse, setTotalCourses] = useState([]);

  const [courseData, setCourseData] = useState({
    courseName: "",
    courseCode: "",
    courseDescription: "",
    coursePrice: "",
    courseDuration: "",
    courseStartDate: null,
    courseEndDate: null,
    courseTeacher: "",
    courseThumbnail: null,
  });

  useEffect(() => {
    axios
      .get("/api/admin/getTeachers")
      .then((res) => setTeachers(res.data.data));
    axios
      .get("/api/course/getCourses")
      .then((res) => setTotalCourses(res.data.data));
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    courseData.courseStartDate = new Date(
      courseData.courseStartDate
    ).toDateString();
    courseData.courseEndDate = new Date(
      courseData.courseEndDate
    ).toDateString();
    const res = await axios.post("/api/course/updateCourse", courseData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if(res.status === 200 || res.status === 201){
      alert("updated the course")
    }
    console.log(res);
  };

  return (
    <div className="flex items-center w-full justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white border border-black-300 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Update Course</h2>
        <p className="text-center mb-6">
          Kindly fill this form to Update course
        </p>
        <form
          onSubmit={handleOnSubmit}
          method="POST"
          enctype="multipart/form-data"
        >
          {/* Course Name */}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="courseName"
            >
              Course Name
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="courseName"
              onClick={(e) => {
                const course = TotalCourse.filter(
                  (name) => name !== e.target.value
                );
                console.log(e.target.value);
                console.log(course);
                setCourseData( ...course );
              }}
            >
              {TotalCourse.map((course, i) => {
                return (
                  <option className="" key={i} value={course.courseName}>
                    {course.courseName}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Course Code */}

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="courseCode"
            >
              Course Code
            </label>
            <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              {TotalCourse.map((course, i) => {
                return (
                  <option className="" key={i} value={course.courseCode}>
                    {course.courseCode}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Course Description */}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="courseDescription"
            >
              Course Description
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="courseDescription"
              placeholder="Enter course description"
              rows="4"
              value={courseData.courseDescription}
              onChange={(e) =>
                setCourseData({
                  ...courseData,
                  courseDescription: e.target.value,
                })
              }
            ></textarea>
          </div>

          {/* Course Price */}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="coursePrice"
            >
              Course Price
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              id="coursePrice"
              placeholder="Enter course price"
              value={courseData.coursePrice}
              onChange={(e) =>
                setCourseData({ ...courseData, coursePrice: e.target.value })
              }
            />
          </div>

          {/* Course Duration */}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="courseDuration"
            >
              Course Duration (minutes)
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              id="courseDuration"
              placeholder="Enter course duration in minutes"
              value={courseData.courseDuration}
              onChange={(e) =>
                setCourseData({ ...courseData, courseDuration: e.target.value })
              }
            />
          </div>

          {/* Course Start Date */}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="startDate"
            >
              Course Start Date
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="date"
              id="startDate"
              value={courseData.courseStartDate}
              onChange={(e) =>
                setCourseData({
                  ...courseData,
                  courseStartDate: e.target.value,
                })
              }
            />
          </div>

          {/* Course End Date */}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="endDate"
            >
              Course End Date
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="date"
              id="endDate"
              value={courseData.courseEndDate}
              onChange={(e) =>
                setCourseData({ ...courseData, courseEndDate: e.target.value })
              }
            />
          </div>

          {/* Course Teacher */}
          {teachers !== null && (
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor="courseTeacher"
              >
                Course Teacher
              </label>
              <select
                className="w-full text-black px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="courseTeacher"
                value={courseData.courseTeacher}
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    courseTeacher: e.target.value,
                  })
                }
              >
                <option value="">Select Teacher</option>
                {teachers.length > 1 ? (
                  teachers.map((teacher) => {
                    return (
                      <option value={teacher?.teacherFullName}>
                        {teacher?.teacherFullName}
                      </option>
                    );
                  })
                ) : (
                  <option value={teachers[0]?.teacherFullName}>
                    {teachers[0]?.teacherFullName}
                  </option>
                )}
              </select>
            </div>
          )}

          {/* Course Thumbnail */}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="courseThumbnail"
            >
              Course Thumbnail
            </label>
            <input
              
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) =>
                setCourseData({
                  ...courseData,
                  courseThumbnail: e.target.files[0],
                })
              }
            />
            {courseData.courseThumbnail && <img className="my-4" width={200} height={200} alt="" src={`${courseData.courseThumbnail.private_url}`} />}
          </div>

          {/* Submit Button */}
          <button
            className="w-full px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateCourse;
