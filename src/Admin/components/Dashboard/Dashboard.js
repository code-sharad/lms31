// /components/Dashboard/Dashboard.js
import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import axios from "axios";
import InputTags from "../../../components/InputTags/InputTags";
import {
  LineChart,
  Line,
  AreaChart,
  Tooltip,
  ResponsiveContainer,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
const Dashboard = () => {
  const [totalEntrolledStudents, setTotalEntrolledStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);


  const [totalSales, setTotalSales] = useState([0]);


  const fetchTotalSales = async () => {
    try {
      const response = await axios.get(`/api/admin/getTotalSale`);

      console.log("get all payment response=>", response);
      console.log("response.data =>", response.data);
      console.log("response.data.data =>", response.data.data);

      setTotalSales(response.data.data);
    } 
    catch (error) {
      console.log(error);

    }

  };

  const sale = totalSales.map(sale => sale?.totalSale / 100)


  console.log("sale=>", sale);

  let ans = 0;

  sale.map(sale => ans += sale);



  useEffect(() => {
    //fetch data from api
    axios
      .post("/api/admin/totalStudentsEnrolled")
      .then((res) => setTotalEntrolledStudents(res.data.data.length));
    axios
      .post("/api/admin/totalTeachers")
      .then((res) => setTotalTeachers(res.data.data.length));
    axios
      .post("/api/admin/totalCourses")
      .then((res) => setTotalCourses(res.data.data.length));

    fetchTotalSales()


  }, []);
  const data = [
    { date: "24-01-01", purcased: 5 },
    { date: "24-01-05", purcased: 10 },
    { date: "24-01-08", purcased: 100 },
    { date: "24-01-25", purcased: 100 },
    { date: "24-01-29", purcased: 300 },
  ];


  return (
    <div className="min-h-screen w-full bg-gray-100 p-4">
      <div className="container mx-auto rounded-lg shadow-md p-6 bg-white">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Enrolled Students"
            number={totalEntrolledStudents}
          />
          <DashboardCard title="Number of Teachers" number={totalTeachers} />
          <DashboardCard title="Number of Courses" number={totalCourses} />
          <br />
          <div className="h-[200px] w-full py-6 m-6 border bg-slate-50 rounded-sm">
            <ResponsiveContainer>
              <span className="px-6 text-xl font-medium">Total Sales</span>
              <br />
              <span className="px-6 text-3xl absolute">

                {
                  ans
                }
              
              </span>  

              <AreaChart
                width={400}
                height={400}
                data={data}
                title="Total Sales"
                className="p-0"
              >
                <Area
                  type="monotone"
                  dataKey="purcased"
                  stroke="#7137f9"
                  strokeWidth={4}
                  fill="#8884d8"
                />
                <XAxis dataKey={"date"} hide />
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/**  
        
          <div className="h-[200px] w-full py-6 m-6 border bg-slate-50 rounded-sm">
            <ResponsiveContainer>
              <span className="px-6 text-xl font-medium">Active Students</span>
              <br />
              <span className="px-6 text-3xl fixed">500</span>

              <AreaChart
                width={400}
                height={400}
                data={data}
                title="Total Sales"
                className="p-0"
              >
                <Area
                  type="monotone"
                  dataKey="purcased"
                  stroke="#7137f9"
                  strokeWidth={4}
                  fill="#8884d8"
                />
                <XAxis dataKey={"date"} hide />

                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="h-[200px] w-full py-6 m-6 border bg-slate-50 rounded-sm">
            <ResponsiveContainer>
              <span className="px-6 text-xl font-medium">Total Lectures</span>
              <br />
              <span className="px-6 text-3xl fixed">100</span>

              <AreaChart
                width={400}
                height={400}
                data={data}
                title="Total Sales"
                className="p-0"
              >
                <Area
                  type="monotone"
                  dataKey="purcased"
                  stroke="#7137f9"
                  strokeWidth={4}
                  fill="#8884d8"
                />
                <Tooltip />
                <XAxis dataKey={"date"} hide />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          */}
          
          
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
