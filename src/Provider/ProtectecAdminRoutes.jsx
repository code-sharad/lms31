import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";

import Admin from "../Admin/Admin";

import AdminDashboard from "../Admin/components/Dashboard/Dashboard";
import ViewLecture from "../Common/ViewLecture/ViewLecture";

import CreateCourse from "../Admin/CreateCourse/CreateCourse";
import TeacherList from "../Admin/components/Customer/TeacherList";
import CourseTable from "../Admin/components/CourseTable/CourseTable";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaUser,
  FaTimes,
} from "react-icons/fa";

import { LuAlignJustify } from "react-icons/lu";
import UpdateCourse from "../Admin/UpdateCourse/UpdateCourse";
import AdminNavbar from "../Admin/Navigation/AdminNavbar";
import { useState } from "react";

export function ProtectedAdminRoute() {
    const sidebarClasses =
      "w-64 bg-white border-r border-gray-200 shadow-lg fixed lg:static h-full z-50";
    const linkClasses =
      "flex items-center p-4 mt-2 text-gray-600 hover:bg-gray-100 hover:text-green-500 rounded-lg transition-colors duration-200";

    const menu = [
      {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <FaTachometerAlt />,
      },
      { name: "Courses", path: "/admin/courses", icon: <FaBoxOpen /> },

      { name: "CreateCourse", path: "/createCourse", icon: <FaTags /> },

      // { name: "update Course", path: "/admin/updateCourse", icon: <FaUser /> },
      { name: "Teacher List", path: "/admin/teachers", icon: <FaUser /> },
    ];
    const [hideSidebar, sethideSidebar] = useState(true);
  const isAdmin = useSelector((state) => state.user.user);
  console.log(isAdmin);
  return isAdmin === "admin" ? (
    <div>
     <AdminNavbar />
      {!hideSidebar && (
        <div className="bg-white">
          <button className="ml-3">
            <LuAlignJustify
              className="size-6"
              onClick={() => sethideSidebar(!hideSidebar)}
            />
          </button>
        </div>
      )}
      <div className="flex">
        {hideSidebar && (
          <div className={sidebarClasses}>
            <div className="p-4 flex justify-between items-center w-[280px]">
              <button
                className="text-gray-400 hover:text-green-500 lg:hidden"
                onClick={null}
              >
                <FaTimes
                  onClick={() => sethideSidebar(!hideSidebar)}
                  className="absolute right-6"
                />
              </button>
            </div>
            <nav className="mt-8 h-screen">
              {menu.map((item, index) => (
                <Link to={item.path} key={index} className={linkClasses}>
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      <Outlet />
    </div>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
}
