import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";

import { PersistGate } from "redux-persist/integration/react";
import Home from "./views/Home/Home";
import Coursespage from "./views/Coursespage/Coursespage";
import Overview from "./views/Overview/Overview";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import ViewLecture from "./Common/ViewLecture/ViewLecture";
import ProtectedRoutes from "./Provider/ProtectedRoutes";
import { ProtectedAdminRoute } from "./Provider/ProtectecAdminRoutes";
import ProtectedTeacherRoutes from "./Provider/ProtectedTecherRoutes"
import AdminDashboard from "./Admin/components/Dashboard/Dashboard";

import CreateCourse from "./Admin/CreateCourse/CreateCourse";
import TeacherList from "./Admin/components/Customer/TeacherList";
import CourseTable from "./Admin/components/CourseTable/CourseTable";


import UpdateCourse from "./Admin/UpdateCourse/UpdateCourse";
import YourProfile from "./Student/YourProfile/YourProfile";
import MyCourses from "./Student/MyCourses/MyCourses";
import UploadVideo from "./Teacher/UploadVideo/UploadVideo";
import TeacherProfile from "./Teacher/YourProfile/teacherProfile";
import TeacherMycourses from "./Teacher/TeacherMycourses/TeacherMycourses";
import ForgotPassword from "./Login/ForgetPassword";
import ResetPassword from "./Login/ResetPassword";
import UserRoutes from "./Layout/UserLayout/UserRoutes";
import { ToastContainer } from "react-toastify";
import axios from "axios";

// const api = axios.create({
//   baseURL: "http://13.60.87.251/",
//   withCredentials: true,
// });





const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route path="/" element={<Home />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      
      <Route path="/" element={ <UserRoutes  />}/>
    
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/resetpassword/:token" element={<ResetPassword/>} />
      <Route path="courses" element={<Coursespage />} />
      <Route path="overview/:courseCode" element={<Overview />} />


      <Route path="/resetpassword/:token" element={<ResetPassword />} />
      <Route path="courses" element={<Coursespage />} />
      <Route path="overview/:" element={<Overview />} />

      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />

      <Route path={`viewLecture`} element={<ViewLecture />} />
      <Route path={`viewLecture/:id`} element={<ViewLecture />} />
      <Route element={<ProtectedAdminRoute />}>
        {/* <AdminNavbar /> */}
        {/* <Route path="/admin" element={<AdminRoute/>}/> */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/teachers" element={<TeacherList />} />

        <Route path="/admin/courses" element={<CourseTable />} />
        <Route
          path="/admin/viewLectures/:courseCode"
          element={<ViewLecture />}
        />

        <Route path="/createCourse" element={<CreateCourse />} />
        <Route path="/admin/updateCourse" element={<UpdateCourse />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/student/profile" element={<YourProfile />} />
        <Route path="/student/mycourses" element={<MyCourses />} />
        <Route
          path={`/student/viewlecture/:courseCode`}
          element={<ViewLecture />}
        />
      </Route>

      <Route element={<ProtectedTeacherRoutes />}>
        <Route path="/uploadvideo" element={<UploadVideo />} />
        <Route path={"/uploadvideo/:courseCode"} element={<UploadVideo />} />
        <Route path="/teacherProfile" element={<TeacherProfile />} />

        <Route path="/teacher/Mycourses" element={<TeacherMycourses />} />
        <Route path="/teacher/ViewLecture" element={<ViewLecture />} />
        <Route
          path={`/teacher/ViewLecture/:courseCode`}
          element={<ViewLecture />}
        />
      </Route>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <ToastContainer /> 
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
