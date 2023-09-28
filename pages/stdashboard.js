import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
import { FaBars } from "react-icons/fa"; // Import the hamburger icon
function DataPage({ data }) {
  const [totalStudents, setTotalStudents] = useState(0);
  const [activeStudents, setActiveStudents] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility
  const [final,setFinal]=useState([]);



  const router = useRouter();
  let filteredData=data;

  useEffect(() => {
    const { mentorName,enddate,enrolled } = router.query; // Get the mentorName from query parameters
    const endDate = new Date(enddate);
    endDate.setDate(endDate.getDate()-30);


    // const name  = mentorName;
    console.log(mentorName);
    if (mentorName) {
        filteredData = filteredData.filter((item)=>item.mentor === mentorName);
    }
    if(enddate){
        // tempfinal = temp.filter((item)=>item.date === endDate);
        const formattedEndDate = endDate.toISOString().slice(0, 10); // Format endDate to YYYY-MM-DD
        filteredData = filteredData.filter((item) => item.date === formattedEndDate);
    }
    if(enrolled){
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);
    
        filteredData = filteredData.filter((item) => {
          const enrollmentDate = new Date(item.date);
          return enrollmentDate >= thirtyDaysAgo && enrollmentDate <= today;
        });
    }
    console.log(filteredData)
    setFinal(filteredData);

    console.log("Effect Triggered");


    // Calculate the total number of students
    setTotalStudents(filteredData.length);

    // Calculate the number of active students (enrolled within the last 30 days)
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const activeStudentCount = filteredData.filter((item) => {
      const enrollmentDate = new Date(item.date);
      return enrollmentDate >= thirtyDaysAgo && enrollmentDate <= today;
    }).length;

    setActiveStudents(activeStudentCount);
  }, [router.query]); // Add router.query to the dependency array

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false); // Close the sidebar
  };

  console.log(final);

  return (
    <>
    <div className="w-20  bg-zinc-800 z-100 absolute" style={{height:'100%'}}>
    <FaBars  style={{color:'white',height:'45px',width:'45px',position:'absolute',left:'13px',top:'13px',cursor:'pointer'}} onClick={toggleSidebar}/>
    </div>

      {/* Background overlay */}
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 z-30 w-full h-full bg-black opacity-70 transition-opacity duration-300 ease-in-out"
          onClick={()=>setIsSidebarOpen(false)} // Close the sidebar when overlay is clicked
        ></div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        {/* Rest of your page content */}
        {/* ...
           (rest of your page content)
        */}
      </div>
      {/* Page Content */}
      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-4 relative ml-40 mt-5">
          Data Table
        </h1>
        <div
          className="container mx-auto mt-10 overflow-y-auto"
          style={{ maxWidth: "80vw", maxHeight: "60vh" }}
        >

          <table
            className="min-w-full border-collapse border border-gray-300"
            style={{ borderRadius: "20px" }}
          >
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="border border-gray-300 p-2">No.</th>
                <th className="border border-gray-300 p-2">Student Name</th>
                <th className="border border-gray-300 p-2">Enrollment Date</th>
                <th className="border border-gray-300 p-2">Mobile.No</th>
                <th className="border border-gray-300 p-2">Mentor Name</th>
                <th className="border border-gray-300 p-2">Sub Type</th>
                <th className="border border-gray-300 p-2">Class</th>
                <th className="border border-gray-300 p-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {final.map((item, index) => (
                <tr
                  key={item._id}
                  className={index % 2 === 0 ? "bg-gray-200" : "bg-gray-400"}
                >
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{item.name}</td>
                  <td className="border border-gray-300 p-2">{item.date}</td>
                  <td className="border border-gray-300 p-2">{item.phone}</td>
                  <td className="border border-gray-300 p-2">{item.mentor}</td>
                  <td className="border border-gray-300 p-2">{item.sub}</td>
                  <td className="border border-gray-300 p-2">{item.class}</td>
                  <td className="border border-gray-300 p-2">{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-4 ml-40 relative mt-10">
          <div className="relative mb-5 font-bold text-2xl">
            Total Students: {totalStudents}
          </div>
          <div className="relative mb-5 font-bold text-2xl">
            Active Students (Last 30 Days): {activeStudents}
          </div>
        </div>
        {/* <div></div> */}
      </div>
      {/* </div> */}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    // Fetch data from your backend API on the server side
    const response = await fetch("https://gp-backend-u5ty.onrender.com/api/data/");
    const data = await response.json();

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: [],
      },
    };
  }
}

export default DataPage;
