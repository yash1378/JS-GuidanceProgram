import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

function PhoneNumberInputPage({ data }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [studentData, setStudentData] = useState(data);
  const [selectedMentorNames, setSelectedMentorNames] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(""); // State to track selected mentor
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const isValidPhoneNumber =searchText.length === 10;
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const goBack = () => {
    router.push("/registration");
  };

  const handleCloseAlert = () => {
    setIsAlertVisible(false);
    setIsSubmitClicked(false);
  };

  const handleGoToEdit = () => {
    setIsSubmitClicked(true);

    // For demonstration purposes, simulate a submission delay
    setTimeout(() => {
      // After the form submission, you can update state or show an alert based on conditions
      if (searchText.length === 10) {
        // Phone number is valid, you can display the alert here or perform other actions
      }
    }, 1000); // Simulated delay

    // Check if the phone number is not empty
    if (searchText.trim() !== "") {
      // Navigate to the "edit" page with the provided phone number as a query parameter
      router.push(`/student/${searchText}`);
    } else {
      // Display an error or alert if the phone number is empty
      setIsAlertVisible(true); // Reset isAlertVisible to true to make the alert reappear
    }
  };
  console.log(data);
  const router = useRouter();
  useEffect(() => {
    // Fetch data from the API and set it to studentData
    // ...
  }, [data]);
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

  return (
    <>
      <div
        className="mx-auto mt-40 p-4 rounded-lg bg-white dark:bg-gray-800 relative"
        style={{ maxWidth: "60vw" }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Enter Phone Number
        </h2>
        <input
          type="search"
          id="default-search"
          name="searchText"
          className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder="Search Student by Phone No..."
          value={searchText}
          onChange={handleSearchChange}
          required
        />
        {searchText.length > 0 && (
          <div className="suggestions text-white">
            {suggestions.length > 0 && (
              <ul>
                {suggestions.map((student, index) => (
                  <li
                    className={`
                ${
                  index % 2 === 0
                    ? "bg-black bg-opacity-90"
                    : "bg-white text-black"
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

        <button
          onClick={handleGoToEdit}
          className="mt-4 mr-5 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
        >
          Go to Edit
        </button>
        <button
          onClick={goBack}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
        >
          Back
        </button>
      </div>
      {isAlertVisible && isSubmitClicked && !isValidPhoneNumber && (
        <div
          id="alert-border-2"
          className="flex items-center p-4 mt-0 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800 absolute top-0 left-0 w-full z-50"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
          <div className="ml-3 text-sm font-medium">
            Phone Number is Incorrect ! Enter a Valid Phone Number
          </div>
          <button
            type="button"
            onClick={handleCloseAlert}
            className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-border-2"
            aria-label="Close"
          >
            <span className="sr-only">Dismiss</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

export default PhoneNumberInputPage;
export async function getServerSideProps() {
  try {
    // Fetch data from your API routes (backend)
    const response = await fetch(
      "https://gp-backend-u5ty.onrender.com/api/data"
    ); // Replace with your API URL
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
