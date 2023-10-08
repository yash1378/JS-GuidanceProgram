import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Cookies from "js-cookie"; // Import the Cookies library

function DataPage({ data, d }) {
  const router = useRouter();
  const ment = router.query.mentor;
  const [isAuthorized, setIsAuthorized] = useState(true);

  let final = [];
  console.log(data);
  console.log(d);
  let it = d.filter((item) => item.name === ment);
  final = data.filter((item) => item.mentor === ment);
  console.log(final);

  useEffect(() => {
    const usernameCookie = Cookies.get("id"); // Get the 'username' cookie value
    const isMatch = usernameCookie === it[0]._id;
    setIsAuthorized(isMatch);
  }, [ment]);

  if (!isAuthorized) {
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
    );
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&family=Roboto+Slab:wght@900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex flex-col items-center w-screen min-h-screen bg-white mt-0">
        <h1 className="text-lg text-gray-700 font-'Roboto Slab' mt-3">
          <b>Data Table</b>
        </h1>
        {window.innerWidth >= 952 ? (
          <div className="w-full mt-6">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full text-sm text-white sm:table">
                    <thead className="bg-gray-800 text-xs uppercase font-medium">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left tracking-wider"
                        >
                          No.
                        </th>                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Student Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Enrollment Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Mobile.No
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
                        Sub Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Class
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Email
                      </th>

                        {/* ... Rest of the table headers ... */}
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800">
                      {final.map((item, index) => (
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
                          <span className="sm:block">{item.date}</span>
                        </td>
                        <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.phone}</span>
                        </td>
                        <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.mentor}</span>
                        </td>
                        <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.sub}</span>
                        </td>
                        <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.class}</span>
                        </td>
                        <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.email}</span>
                        </td>
                          {/* ... Rest of the table rows ... */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col border-solid border-2 border-indigo-600 w-full mt-6">
            {final.map((item, index) => (
              <div
                key={item._id}
                className={
                  index % 2 === 0
                    ? "bg-black bg-opacity-20 p-4"
                    : "p-4 bg-gray-800"
                }
              >
                <div className="text-white">No. {index + 1}</div>
                <div className="text-white">Student Name. {item.name}</div>
                <div className="text-white">Enrollment Date. {item.date}</div>
                <div className="text-white">Mobile No. {item.phone}</div>
                <div className="text-white">Mentor Name {item.mentor}</div>
                <div className="text-white">Sub Type {item.sub}</div>
                <div className="text-white">Class {item.class}</div>
                <div className="text-white">Email {item.email}</div>
                {/* ... Rest of the data fields ... */}
              </div>
            ))}
          </div>
        )}
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
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    // Fetch data from your backend API on the server side
    const response = await fetch("http://localhost:4000/api/data/");
    const data = await response.json();
    const r = await fetch("http://localhost:4000/api/mentorData/");
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
