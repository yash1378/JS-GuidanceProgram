import React, { useState, useEffect } from "react";
import Head from "next/head";
import Modal from "@/components/Modal";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function ParentComponent({ data, t }) {
  // console.log(t);
  const [selectedIds, setSelectedIds] = useState([]);
  // const [selectedMentors, setSelectedMentors] = useState([]);
  const [selectedMentorNames, setSelectedMentorNames] = useState([]);

  const [message, setMessage] = useState("");
  const [dat, setDat] = useState(data);
  // State variable to manage modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isAuthorized, setIsAuthorized] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [studentData, setStudentData] = useState(data);
  const [selectedMentor, setSelectedMentor] = useState(""); // State to track selected mentor
  console.log(data);
  console.log(studentData);
  useEffect(() => {
    // Fetch data from the API and set it to studentData
    // ...
  }, [data]);

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

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const filteredNames = studentData.filter(
      (student, index, self) =>
        student.phone.toLowerCase().startsWith(value.toLowerCase()) &&
        index === self.findIndex((s) => s.phone === student.phone)
    );

    setSearchText(value);
    setSuggestions(filteredNames);
  };

  const handleSuggestionClick = (student) => {
    setSearchText(student.phone); // Update the search text with the student's phone
    setSelectedMentor(student.mentor);
    setSelectedIds([student._id]); // Use the clicked student's _id
    setSelectedMentorNames([student.mentor]); // Use the clicked student's mentor
    console.log(selectedMentorNames);
    console.log(selectedIds);
  };

  const handleCheckboxChange = (id, ment) => {
    // Toggle selection of the checkbox
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
      setSelectedMentorNames(
        selectedMentorNames.filter((mentor) => mentor.mentor !== ment)
      );
    } else {
      setSelectedIds([...selectedIds, id]);
      // Find the mentor name based on the selected student id and add it to the array
      const selectedStudent = dat.find((student) => student._id === id);
      if (selectedStudent) {
        setSelectedMentorNames([
          ...selectedMentorNames,
          selectedStudent.mentor,
        ]);
      }
    }
  };
  // console.log(selectedIds);

  const handleDeleteClick = async () => {
    try {
      // Send a request to your backend API to delete the selected rows
      const response = await fetch(
        "https://gp-backend-u5ty.onrender.com/api/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: selectedIds,
            mentors: selectedMentorNames,
          }),
        }
      );

      if (response.ok) {
        setMessage("Selected rows have been Deleted successfully.");
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
        setSearchText("");
        setSelectedMentor("");
        setSelectedDate("");
      } else {
        setMessage("Failed to Delete selected rows.");
      }
    } catch (error) {
      console.error("Error Deleteing rows:", error);
      setMessage("An error occurred while Deleteing rows.");
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
          <h1 className="text-4xl font-Damion-cursive text-gray-800 mb-4">
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
      <div className="flex flex-col items-center bg-gray-700 w-screen min-h-screen mt-0">
        <h1 className="text-white text-4xl font-Damion-cursive mt-1">
          <b>Delete Page</b>
        </h1>
        <div>
          {/* Search Bar */}
          <label
            htmlFor="default-search"
            className="mb-2 text-base font-Damion-cursive text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div
            className="relative mt-3 w-[80vw] mx-auto"
            style={{ position: "sticky", top: "0" }}
          >
            <input
              type="search"
              id="default-search"
              className="block w-[79vw] p-4 pl-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Student by Phone No..."
              required
              value={searchText}
              onChange={handleSearchChange}
            />
            {searchText.length > 0 && (
              <div className="suggestions text-white">
                {suggestions.length > 0 && (
                  <ul>
                    {suggestions.map((student, index) => (
                      <li
                        className={`
                ${
                  index % 2 === 0 ? "bg-black bg-opacity-20" : ""
                } hover:bg-indigo-600 hover:text-white
              `}
                        style={{ cursor: "pointer" }}
                        key={student.name}
                        onClick={() => {
                          handleSuggestionClick(student);
                          setSuggestions([]);
                        }}
                      >
                        {student.name} - <b> Mentor:</b> {student.mentor}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          {/* End of Search Bar */}
        </div>
        <div className="flex flex-col w-[80vw] h-[75vh] mt-4">
          <button
            onClick={() => {
              // handleDeleteClick();
              openModal();
            }}
            className="px-4 py-2  mb-4 text-white  w-[79vw] bg-blue-500 rounded hover:bg-blue-600"
          >
            Delete Selected
          </button>
          <div className=" overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className=" align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow-2xl overflow-hidden sm:rounded-lg">
                <table className="min-w-full text-base text-white sm:table">
                  <thead className="bg-gray-800 text-base uppercase font-Damion-cursive" >
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Select
                      </th>
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
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Phone No
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 text-base font-Damion-cursive">
                    {dat.map((item, index) => (
                      <tr
                        key={item._id}
                        className={
                          index % 2 === 0 ? "bg-black bg-opacity-20" : ""
                        }
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
        <>
          <div
            className=" fixed top-0 left-0 z-10 w-full h-full bg-black opacity-70 transition-opacity duration-300 ease-in-out"
            onClick={closeModal} // Close the sidebar when overlay is clicked
          ></div>
          <Modal onClose={closeModal}>
            <div className="p-6 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              ></svg>
              <h3 className="mb-5 text-lg font-normal text-gray-900 dark:text-gray-400">
                Are you sure you want to Delete the Selected
                Students?
              </h3>
              <button
                onClick={() => {
                  handleDeleteClick();
                  closeModal();
                }} // Call handleSubmit when "Yes, I'm sure" is clicked
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-Damion-cursive rounded-lg text-base inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={closeModal} // Close the modal when "No, cancel" is clicked
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-base font-Damion-cursive px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </Modal>
        </>
      )}
      <button
        onClick={() => {
          // Your button click handler here
          router.push("/registration");
        }}
        className="fixed bottom-2 right-5"
      >
        <span className="relative inline-flex items-center justify-center p-0.5 mb-0 mr-2 overflow-hidden text-base font-Damion-cursive text-white rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
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
    const response1 = await fetch(
      "https://gp-backend-u5ty.onrender.com/api/data"
    ); // Replace with your API URL
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
        t: [],
      },
    };
  }
}
