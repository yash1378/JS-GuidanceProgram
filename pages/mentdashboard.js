import React, { useEffect, useState } from "react";
import Head from "next/head";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
function DataPage({ data, d }) {
  const [isAuthorized, setIsAuthorized] = useState(true);
  let final = data;
  console.log(d);
  const router = useRouter();

  useEffect(() => {
    const usernameCookie = Cookies.get("id"); // Get the 'username' cookie value
    // let isMatch ;
    // console.log(isMatch);
    let isMatch = d.filter((it) => usernameCookie === it._id);
    setIsAuthorized(isMatch);
    if (isMatch.length === 0) {
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
    ); // Return null to prevent rendering this component
  }

  return (
    <>
      <div className="flex flex-col items-center  bg-gray-700 w-screen min-h-screen  mt-0 zIndex-2" >
        <h1 className=" text-white text-4xl font-'Roboto Slab' mt-3">
          <b>Mentor Data </b>
        </h1>
        <div className="flex flex-col w-[80vw] h-[85vh]  mt-6 " >
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow-2xl overflow-hidden sm:rounded-lg">
                <table className="min-w-full text-sm text-white sm:table">
                  <thead className="bg-gray-800 text-sm uppercase font-Damion-cursive"  style={{ position: "sticky", top: "0", zIndex: "2" }}>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        No.
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Mentor Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Total Students Guided
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                         No.of Ongoing Students
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Current Availability
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 text-base font-Damion-cursive">
                    {data.map((item, index) => (
                      <tr
                        key={item._id}
                        className={
                          index % 2 === 0 ? "bg-black bg-opacity-20" : ""
                        }
                      >
                        <td className="pl-4">{index + 1}</td>
                        <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.name}</span>
                        </td>
                        <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.total}</span>
                        </td>
                        <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.on}</span>
                        </td>
                        <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.handle - item.on}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          </div>
          </div>
      <button
        onClick={() => {
          // Your button click handler here
          router.push("/home");
        }}
        className="fixed bottom-6 right-3"
      >
        <span className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-Damion-cursive text-white rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Go Back
          </span>
        </span>
      </button>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    // Fetch data from your backend API on the server side
    const response = await fetch(
      "https://gp-backend-u5ty.onrender.com/api/mentorData/"
    );
    const data = await response.json();
    const r = await fetch(
      "https://gp-backend-u5ty.onrender.com/api/ownerData/"
    );
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
        d: [],
      },
    };
  }
}

export default DataPage;
