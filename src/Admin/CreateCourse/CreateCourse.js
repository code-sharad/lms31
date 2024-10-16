import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import InputTags from "../../components/InputTags/InputTags";

//

function CreateCourse() {
  const [teachers, setTeachers] = useState(null);
  const inputTechnologyRef = useRef(null);
  const inputToolsRef = useRef(null);
  const [technology, setTechnology] = useState([]);
  const [tools, setTools] = useState([]);
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
    courseTechnology: [],
    courseTools: [],
  });

  useEffect(() => {
    axios
      .get("/api/admin/getTeachers")
      .then((res) => setTeachers(res.data.data));
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    courseData.courseStartDate = new Date(
      courseData.courseStartDate
    ).toDateString();
    courseData.courseEndDate = new Date(
      courseData.courseEndDate
    ).toDateString();
    courseData.courseTechnology = technology;
    courseData.courseTools = tools;
    const res = await axios.post("/api/course/createCourse", courseData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);

    if (res.status === 200 || res.status === 201) {
      alert("course created");
    }
  };

  const handleTechnologyInput = (tag) => {
    document
      .getElementById("inputTechnologyTag")
      .addEventListener("keypress", (e) => {
        console.log(tag);
        if (e.key === "Enter") {
          if (technology.filter((tags) => tags !== tag)) {
            setTechnology([...technology, tag]);
            inputTechnologyRef.current.value = "";
          }
        }
      });
  };
  const handleToolsInput = (tag) => {
    document
      .getElementById("inputToolsTag")
      .addEventListener("keypress", (e) => {
        console.log(tag);
        if (e.key === "Enter") {
          if (tools.filter((tags) => tags !== tag)) {
            setTools([...tools, tag]);
            inputToolsRef.current.value = "";
          }
        }
      });
  };

  const removeTechnologyTag = (wantToRemoveTag) => {
    console.log(wantToRemoveTag);
    const newTag = technology.filter((tag) => tag !== wantToRemoveTag);
    console.log(newTag);
    setTechnology(newTag);
  };

  const removeToolsTag = (wantToRemoveTag) => {
    console.log(wantToRemoveTag);
    const newTag = tools.filter((tag) => tag !== wantToRemoveTag);
    console.log(newTag);
    setTools(newTag);
  };

  return (
    <div className="flex items-center w-full justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white border border-black-300 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Create New Course
        </h2>
        <p className="text-center mb-6">
          Kindly fill this form to create a new course
        </p>
        <div
        // onSubmit={handleOnSubmit}
        // onSubmit={(e) => e.preventDefault()}
        // method="POST"
        // enctype="multipart/form-data"
        >
          {/* Course Name */}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="courseName"
            >
              Course Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="courseName"
              onChange={(e) =>
                setCourseData({ ...courseData, courseName: e.target.value })
              }
            ></input>
          </div>

          {/* Course Code */}

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="courseCode"
            >
              Course Code
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="courseCode"
              placeholder="Enter course Code"
              onChange={(e) =>
                setCourseData({ ...courseData, courseCode: e.target.value })
              }
            />
          </div>

          {/* Course Techonologs */}
          <div>
            <div className="flex gap-2 my-4">
              {technology.map((tags, i) => {
                return (
                  <button
                    key={i}
                    onClick={(e) =>
                      removeTechnologyTag(e.currentTarget.innerText)
                    }
                    className="p-2 border text-white bg-black rounded-lg"
                  >
                    {tags}
                  </button>
                );
              })}
            </div>
            <input
              className="mb-6 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="inputTechnologyTag"
              type="text"
              placeholder="Course Techonologs"
              onChange={(e) => handleTechnologyInput(e.target.value)}
              ref={inputTechnologyRef}
            />
          </div>

          {/* Course Tools */}
          <div>
            <div className="flex gap-2 my-4">
              {tools.map((tags, i) => {
                return (
                  <button
                    key={i}
                    onClick={(e) => removeToolsTag(e.currentTarget.innerText)}
                    className="p-2 border text-white bg-black rounded-lg"
                  >
                    {tags}
                  </button>
                );
              })}
            </div>
            <input
              className="mb-6 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="inputToolsTag"
              type="text"
              placeholder="Course Tools"
              onChange={(e) => handleToolsInput(e.target.value)}
              ref={inputToolsRef}
            />
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
              onChange={(e) =>
                setCourseData({
                  ...courseData,
                  courseDuration: e.target.value,
                })
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
              onChange={(e) =>
                setCourseData({
                  ...courseData,
                  courseEndDate: e.target.value,
                })
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
                      <option value={teacher.teacherEmail}>
                        {teacher.teacherEmail.split("@")[0]}
                      </option>
                    );
                  })
                ) : (
                  <option value={teachers[0]?.teacherEmail}>
                    {teachers[0]?.teacherEmail.split("@")[0]}
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
          </div>

          {/* Submit Button */}
          <button
            className="w-full px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
            onClick={handleOnSubmit}
          >
            Create Course
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
