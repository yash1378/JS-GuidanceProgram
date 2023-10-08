import React, { useState, useEffect } from "react";
import Head from "next/head";
import Modal from "@/components/Modal";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function ParentComponent({ data,t }) {
  // console.log(t);
  const [selectedIds, setSelectedIds] = useState([]);
  // const [selectedMentors, setSelectedMentors] = useState([]);
  const [selectedMentorNames, setSelectedMentorNames] = useState([]);

  const [message, setMessage] = useState("");
  const [dat, setDat] = useState(data);
  // State variable to manage modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isAuthorized, setIsAuthorized] = useState(true);
  const router = useRouter();

  // Function to open the modal
  const openModal = () => {
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedIds([]);

  };



  const handleCheckboxChange = (id) => {``
    // Toggle selection of the checkbox
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
      setSelectedMentorNames(selectedMentorNames.filter((mentor) => mentor.mentor !== ment));
      

    } else {
      setSelectedIds([...selectedIds, id]);
    // Find the mentor name based on the selected student id and add it to the array
    const selectedStudent = dat.find((student) => student._id === id);
    if (selectedStudent) {
      setSelectedMentorNames([...selectedMentorNames, selectedStudent.mentor]);
    }
    }
  };
  console.log(selectedIds);

  const handleRefundClick = async () => {
    try {
      // Send a request to your backend API to delete the selected rows
      const response = await fetch("https://gp-backend-u5ty.onrender.com/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedIds, mentors: selectedMentorNames }),
      });

      if (response.ok) {
        setMessage("Selected rows have been refunded successfully.");
        // Clear the selected IDs and fetch updated data
        // setSelectedIds([]);
        const response1 = await fetch(
          "https://gp-backend-u5ty.onrender.com/api/data"
        ); // Replace with your API URL
        const updatedData = await response1.json();
        console.log(updatedData);
        // // Update the 'data' prop by calling a parent function (if you have one)
        // // This will ensure the parent component re-renders and passes the updated 'data' prop
        if (updatedData) {
          setDat(updatedData);
        }
      } else {
        setMessage("Failed to refund selected rows.");
      }
    } catch (error) {
      console.error("Error refunding rows:", error);
      setMessage("An error occurred while refunding rows.");
    }
  };
  useEffect(() => {
    // setDat(data);
  // Check if selectedIds is not empty and then clear it
  const usernameCookie = Cookies.get("id"); // Get the 'username' cookie value
  // let isMatch ;
  // console.log(isMatch);
  let isMatch = t.filter((it) => usernameCookie === it._id);
  // console.log(usernameCookie);
  // console.log(t[0]._id);
  // setMessage("");
  setIsAuthorized(isMatch);
  if (isMatch.length === 0) {
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
    ); // Return null to prevent rendering this component
  }


  return (
    <div>
      <Head>
        <title>Your Page Title</title>
      </Head>
      <div className="flex flex-col items-center bg-gray-700 w-screen h-[100vh] mt-0">
        <h1 className="text-white text-4xl font-'Roboto Slab' mt-3">
          <b>Refund Page</b>
        </h1>
        <div className="flex flex-col w-[80vw] h-[80vh] mt-6">
          <button
            onClick={()=>{
              // handleRefundClick();
              openModal();            }
            }
            className="px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Refund Selected
          </button>
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow-2xl overflow-hidden sm:rounded-lg">
                <table className="min-w-full text-sm text-white sm:table">
                  <thead className="bg-gray-800 text-xs uppercase font-medium">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left tracking-wider">
                        Select
                      </th>
                      <th scope="col" className="px-6 py-3 text-left tracking-wider">
                        No.
                      </th>
                      <th scope="col" className="px-6 py-3 text-left tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left tracking-wider">
                        Phone No
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800">
                    {dat.map((item, index) => (
                      <tr
                        key={item._id}
                        className={index % 2 === 0 ? "bg-black bg-opacity-20" : ""}
                      >
                        <td className="px-6 py-2">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(item._id)}
                            checked={selectedIds.includes(item._id)}
                          />
                        </td>
                        <td className="pl-4">{index + 1}</td>
                        <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.name}</span>
                        </td>
                        <td className="px-6 py-2 sm:py-4 sm:px-2 whitespace-nowrap">
                          <span className="sm:block">{item.phone}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {message && <p className="text-white mt-4">{message}</p>}
      </div>
      {isModalVisible && (
        <Modal onClose={closeModal}>
          <div className="p-6 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            ></svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to assign this mentor to Selected Students?
            </h3>
            <button
              onClick={() => {
                handleRefundClick();
                closeModal();
              }} // Call handleSubmit when "Yes, I'm sure" is clicked
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={closeModal} // Close the modal when "No, cancel" is clicked
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </Modal>
      )}
      <button
        onClick={() => {
          // Your button click handler here
          router.push("/home");
        }}
        className="fixed bottom-2 right-5"
      >
        <span className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Go Back
          </span>
        </span>
      </button>
    </div>
  );
}

export default ParentComponent;

export async function getServerSideProps() {
  try {
    // Fetch data from your API routes (backend)
    const response1 = await fetch("https://gp-backend-u5ty.onrender.com/api/data"); // Replace with your API URL
    const data = await response1.json();

    const r = await fetch(
      "https://gp-backend-u5ty.onrender.com/api/ownerData/"
    );
    const t = await r.json();
    // console.log(t);

    return {
      props: {
        data,
        t,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: [],
        t:[],
      },
    };
  }
}
