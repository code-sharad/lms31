import React, { useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/User/userSlice";
import { useMediaQuery } from '@mui/material';
import axios from "axios";
import { message } from "react-message-popup";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {

  const [profilePhoto, setProfilePhoto] = useState("");

  
  


  const mediumDevice = useMediaQuery('(max-width: 768px)');

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  
  const isAdmin = user?.userType === "admin" ? true : false;


  const teacher = user === "teacher"; 

  

  const navigation = [
    { name: "Dashboard", href: "/dashboard", current: true, isAuth: isAdmin },
    { name: "Home", href: "/", current: false, isAuth: true },
    { name: "Courses", href: "/courses", current: false, isAuth: true },
    // { name: "My Courses", href: "/mycourses", current: false, isAuth: isAuth },
    { name: "Notes", href: "#", current: false, isAuth: isAuth },
    { name: "Blog", href: "#", current: false, isAuth: true },
    { name: "Login", href: "/login", current: false, isAuth: !isAuth },
    { name: "Signup", href: "/signup", current: false, isAuth: !isAuth },
  ];

  const logouthandler = async () => {

    try {

      if(teacher) {
        const response = await axios.post('/api/teacher/logout')

      }

      else {
        const response = await axios.post('/api/student/logout')


      }
   

      dispatch(logout());


    } 

    catch (error) {
      message.error(error?.message);
    }

  };

  const fetchProfile = async () => {

    try {

      if(isAuth) {

        if(!teacher) {

          const response = await axios.get(`/api/student/getProfile`);

          console.log("get all courses response=>", response);
          console.log("response.data =>", response.data);
          console.log("response.data.data =>", response.data.data);
    
          setProfilePhoto(response.data.data?.studentAvatar?.public_url);
        }
        else {
          const response = await axios.get(`/api/teacher/getProfile`);

          console.log("get all courses response=>", response);
          console.log("response.data =>", response.data);
          console.log("response.data.data =>", response.data.data);
    
          setProfilePhoto(response.data.data?.teacherProfile);
        }
      }
     
    } 
    catch (error) {
      console.log(error);
      window.location.href = "/login";
    }
  };
  

  useEffect(() => {
    fetchProfile();
  },[2])

  
  return (
    <Disclosure as="nav" className="bg-gray-800 w-full">

      {({ open }) => (

        <>
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-24 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">


                {
                  mediumDevice ? 
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>

                    
                    {open ? (
  
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
  
                    ) : (
  
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
  
                    )}
                
                  </Disclosure.Button>

                  :
                  
                  <div></div>
                }



              </div>


              <div className="flex flex-1 items-center justify-center ml-6 pl-4 sm:items-stretch sm:justify-start">
                
                <div className="flex items-center mr-48">
                  
                  <span> <img src="https://res.cloudinary.com/dsh5742fk/image/upload/v1725079904/qmb25ixvtaliw6sfjia3.png" alt="arohiLogo" className="h-12 w-12 rounded-full" /> </span>
                  <span className="text-4xl ml-4 font-bold text-white">AROHI SOFTWARES</span>
                  
                </div>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-2xl font-medium ",
                          item.isAuth ? "block" : "hidden"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>


              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              
                <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                
                <Menu
                  as="div"
                  className={`relative ml-3 ${isAuth ? "block" : "hidden"}`}
                >
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-12 w-12 rounded-full"
                        src={profilePhoto}
                        alt="Avatar"
                      />
                    </Menu.Button>
                  </div>
                  <Transition

                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >

                    {user
                    ? 
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      
                    
                    
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                          to={teacher ? "/teacherprofile" : "/student/profile"}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-lg text-gray-700"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={teacher ? "/teacher/mycourses" : "/student/mycourses"}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-lg text-gray-700"
                            )}
                          >
                            My Courses
                          </Link>
                        )}
                      </Menu.Item>


                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-lg text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={logouthandler}
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-lg text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>

                    </Menu.Items>

                    : 
                    <div>
                        <Link to="/login">
                          <button className="bg-cyan-400 text-black font-bold p-2 rounded">
                            Login
                          </button>
                        </Link>
                        <Link to="/signup">
                          <button className="bg-cyan-400 text-black font-bold p-2 rounded">
                            Signup
                          </button>
                        </Link>
                    
                    </div>
                  
                  }



                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-xl font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}


    </Disclosure>
  );
}

export default Navbar;
