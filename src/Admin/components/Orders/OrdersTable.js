import axios from "axios";
import React, { useEffect, useState } from "react";

const sharedClasses = {
  primaryButton:
    "bg-white-100 border-[2px] border-gray-300 text-white-foreground px-4 py-2 rounded-lg flex items-center",
  tableCell: "p-4 text-left",
  actionButton: "text-purple-500 px-2",
  editButton: "text-red-500",
  deleteButton: "text-brown-500 px-2",
  searchInput: "w-full p-2 border rounded-lg bg-input text-foreground",
  tooltip:
    "absolute z-10 p-2 bg-gray-200 text-gray-800 rounded-lg shadow-lg whitespace-pre-wrap",
};

const OrdersTable = (courseCode) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [payment, setpayment] = useState([
    {
      enrolledStudent: "Arun Sinha",
      studentId: "1",
      paymentDate: "2024-01-01",
      paymentMethod: "Credit Card",
      courseEndDate: "2024-12-31",
      courseName: "Full Stack Development",
    },
    {
      enrolledStudent: "Tara Sighole",
      studentId: "2",
      paymentDate: "2024-02-15",
      paymentMethod: "PayPal",
      courseEndDate: "2025-02-14",
      courseName: "Python with Django",
    },
  ]);
  useEffect(() => {
    getPayment().then((res) => {
      return res;
    });
  }, [courseCode]);

  const getPayment = async () => {
    const res = await axios.post("/api/payment/admin/getpaymentdetails", {
      courseCode,
    });

    setpayment(res.data);
  };

  // const filteredOrders = orders.filter(
  //   (order) =>
  //     order.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     order.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const showTooltip = (content, event) => {
    const { clientX: left, clientY: top } = event;
    setTooltipContent(content);
    setTooltipPosition({ top, left });
    setTooltipVisible(true);
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
  };
  console.log(payment)
  return payment.message !== "No payments found" ? (
    <div className="relative p-4 bg-white mx-5 my-8 rounded-lg text-card-foreground">
      {tooltipVisible && (
        <div
          className={sharedClasses.tooltip}
          style={{
            top: tooltipPosition.top + 10,
            left: tooltipPosition.left + 10,
          }}
        >
          {tooltipContent}
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Enrollment List</h1>
        {/* <button className={sharedClasses.primaryButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 17l4 4 4-4m-4-5v9"
            />
          </svg>
          Enrolled Student
        </button> */}
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search here..."
          className={sharedClasses.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-blue-300 text-secondary-foreground">
              <th className={`${sharedClasses.tableCell} hidden sm:table-cell`}>
                Enrolled Student
              </th>
              <th className={`${sharedClasses.tableCell} hidden sm:table-cell`}>
                Payment id
              </th>
              <th className={sharedClasses.tableCell}>Payment</th>
              {/* <th className={sharedClasses.tableCell}>Action</th> */}
            </tr>
          </thead>
          <tbody>
           {payment.map((order, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-100 transition duration-200"
              >
                <td
                  className={`${sharedClasses.tableCell} hidden sm:table-cell`}
                >
                  {order.studentEmail}
                </td>
                <td
                  className={`${sharedClasses.tableCell} hidden sm:table-cell`}
                >
                  {order.razorpay_payment_id}
                </td>
                <td className={sharedClasses.tableCell}>
                  <button
                    className={sharedClasses.actionButton}
                    onMouseEnter={(e) =>
                      showTooltip(
                        `Course: ${order.courseName}\nPayment Date: ${order.paymentDate}\nPayment Method: ${order.paymentMethod}\nCourse End Date: ${order.courseEndDate}`,
                        e
                      )
                    }
                    onMouseLeave={hideTooltip}
                  >
                    View
                  </button>
                </td>

                <td className={sharedClasses.tableCell}>
                

                  <button className={sharedClasses.editButton}>
                
                  </button>

                  {/* <button className={sharedClasses.deleteButton}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.136 21H7.864a2 2 0 01-1.997-1.858L5 7m5-3V3h4v1m4 0H6m13 0a2 2 0 00-2-2h-1a2 2 0 00-2-2h-4a2 2 0 00-2 2H5a2 2 0 00-2 2h16z"
                      />
                    </svg>
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-12">
        <span className="text-xs">Showing {payment.length} Entries</span>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded-lg">1</button>
          <button className="px-3 py-1 border rounded-lg bg-primary text-primary-foreground">
            2
          </button>
          <button className="px-3 py-1 border rounded-lg">3</button>
        </div>
      </div>
    </div>
  ) : (
    <h2>No payments</h2>
  );
};

export default OrdersTable;
