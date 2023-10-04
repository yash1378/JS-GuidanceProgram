import React, { useEffect, useState } from "react";
import Head from "next/head";
import Cookies from "js-cookie"; 
function DataPage({ data,d }) {
  const [isAuthorized, setIsAuthorized] = useState(true);
  let final =data;



  useEffect(() => {
    const usernameCookie = Cookies.get("id"); // Get the 'username' cookie value
    // let isMatch ;
    // console.log(isMatch);
    let isMatch = d.filter((it)=>usernameCookie === it._id);
    setIsAuthorized(isMatch);
    if(isMatch.length === 0){
      setIsAuthorized(false);
    }

  }, [final]);

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
 

  return (
    <>

      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-4 relative ml-40 mt-5">
          Mentor Data Dashboard
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
                <th className="border border-gray-300 p-2">Mentor Name</th>
                <th className="border border-gray-300 p-2">Total Students Guided</th>
                <th className="border border-gray-300 p-2">No.of Ongoing Students</th>
                <th className="border border-gray-300 p-2">Current Availability</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item._id}
                  className={index % 2 === 0 ? "bg-gray-200" : "bg-gray-400"}
                >
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{item.name}</td>
                  <td className="border border-gray-300 p-2">{item.total}</td>
                  <td className="border border-gray-300 p-2">{item.on}</td>
                  <td className="border border-gray-300 p-2">{item.handle-item.on}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    // Fetch data from your backend API on the server side
    const response = await fetch("https://gp-backend-u5ty.onrender.com/api/mentorData/");
    const data = await response.json();
    const r = await fetch("https://gp-backend-u5ty.onrender.com/api/ownerData/");
    const d = await response.json();

    return {
      props: {
        data,
        d,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: [],
        d:[],
      },
    };
  }
}

export default DataPage;
