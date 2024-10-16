import React, { useState, useEffect } from "react";
import { Camera, FileText, Download } from "lucide-react";

const TeacherDetails = ({ teacher }) => {
  // const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // const fetchTeacherDetails = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await fetch(`/api/teachers/${teacherId}`);
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch teacher details");
    //     }
    //     const data = await response.json();
    //     setTeacher(data);
    //   } catch (err) {
    //     setError(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchTeacherDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">Error: {error}</div>;
  }

  if (!teacher) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center overflow-hidden">
            {teacher.avatarUrl ? (
              <img
                src={teacher.avatarUrl}
                alt={teacher.teacherUserName}
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="w-10 h-10 text-gray-400" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{teacher.teacherFullName}</h1>
            <h3 className="">{teacher.teacherUserName}</h3>
            <p className="text-sm opacity-80">{teacher.teacherEmail}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p>{teacher.teacherbio}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {teacher?.teacherQualifications?.map((spec, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Experience</h3>
            <p className="text-gray-600">
              {teacher.teacherYearOfExperience} years
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p className="text-gray-600">{teacher.teacherPhoneNumber}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Personal Documents</h3>
            <div className="space-y-2">
              {teacher.documents &&
                teacher.documents.map((doc, index) => (
                  <a
                    key={index}
                    href={doc.url}
                    download
                    className="flex items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <FileText className="w-5 h-5 mr-2 text-gray-600" />
                    <span className="flex-grow text-gray-800">{doc.name}</span>
                    <Download className="w-5 h-5 text-gray-600" />
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
