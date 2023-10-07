import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Cookies from "js-cookie"; // Import the Cookies library
function DataPage({ data,d }) {

  const router = useRouter();
  const ment = router.query.mentor;
  const [isAuthorized, setIsAuthorized] = useState(true);

  let final = [];
  console.log(data);
  console.log(d);
  // console.log("ment -> "+ment);
  let it = d.filter((item)=> item.name === ment);
  // console.log(it);
  final = data.filter((item) => item.mentor === ment);
  console.log(final)



  useEffect(() => {
    const usernameCookie = Cookies.get("id"); // Get the 'username' cookie value
    const isMatch = usernameCookie === it[0]._id;
    setIsAuthorized(isMatch);
  }, [ment]);

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
      </div>
      <button
        onClick={() => {
          // Your button click handler here
          router.push("/login");
        }}
        className="fixed bottom-6 right-12"
      >
        <span className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Go Back
          </span>
        </span>
      </button>
      {/* </div> */}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    // Fetch data from your backend API on the server side
    const response = await fetch("https://gp-backend-u5ty.onrender.com/api/data/");
    const data = await response.json();
    const r  =  await fetch("https://gp-backend-u5ty.onrender.com/api/mentorData/");
    const d = await r.json();

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