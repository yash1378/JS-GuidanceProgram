import React, { useState, useEffect } from "react";
import DataPage from "@/components/DataPage";
import Head from "next/head";
import Cookies from "js-cookie"; 

function ParentComponent({data,additionalData,d}) {

  const [isAuthorized, setIsAuthorized] = useState(true);


  const [studentsWithoutMentor, setStudentsWithoutMentor] = useState([]);

  useEffect(() => {
    // Filter students without mentors
    const studentsWithoutMentors = data.filter((student) => !student.mentor);
    setStudentsWithoutMentor(studentsWithoutMentors);
    const usernameCookie = Cookies.get("id"); // Get the 'username' cookie value
    // let isMatch ;
    // console.log(isMatch);
    let isMatch = d.filter((it)=>usernameCookie === it._id);
    setIsAuthorized(isMatch);
    if(isMatch.length === 0){
      setIsAuthorized(false);
    }
  }, [data]);

  if (!isAuthorized) {
    // If the username in the cookie doesn't match the mentor name, you can redirect the user
    // router.push(`/${ment}`); // Replace "/unauthorized" with the appropriate URL for unauthorized access
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>Access Denied</title>
      </Head>
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">
          You're not allowed to access this page
        </h1>
        <p className="text-lg text-gray-600">
          Please contact the administrator for assistance.
        </p>
      </div>
    </div>
    ) // Return null to prevent rendering this component
  }


  // Function to update data and remove assigned students
  const updateData = (newData) => {
    // Update the data array with the new data
    // This will trigger a re-render of DataPage with the updated data
    data = newData;

    // Filter students without mentors
    const studentsWithoutMentors = data.filter((student) => !student.mentor);
    setStudentsWithoutMentor(studentsWithoutMentors);
  };



  return (
    <DataPage
    data={studentsWithoutMentor} // Pass the filtered data without mentors
    updateData={updateData}
    additionalData={additionalData}
    />
  );
}

export default ParentComponent;



export async function getServerSideProps() {
  try {
    // Fetch data from your API routes (backend)
    const response1 = await fetch("https://gp-backend-u5ty.onrender.com/api/data"); // Replace with your API URL
    const data = await response1.json();

    const response2 = await fetch("https://gp-backend-u5ty.onrender.com/api/mentordata"); // Replace with your other API URL
    const additionalData = await response2.json();

    const r = await fetch("https://gp-backend-u5ty.onrender.com/api/ownerData"); // Replace with your other API URL
    const d = await r.json();

    return {
      props: {
        data,
        additionalData,
        d,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: [],
        additionalData: [],
        d:[],
      },
    };
  }
}
