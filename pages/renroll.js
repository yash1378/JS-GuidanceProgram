import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Define your API endpoint
// Replace with your actual API endpoint

function Enroll({ data }) {
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

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const filteredNames = studentData.filter((student) =>
      student.name.toLowerCase().startsWith(value.toLowerCase())
    );

    setSearchText(value);
    setSuggestions(filteredNames); // Update suggestions
  };


  const handleSuggestionClick = (student) => {
    setSearchText(student.name);
    setSelectedMentor(student.mentor);
    // setSuggestions([]); // Clear suggestions
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to the backend API
      const response = await fetch("https://gp-backend-u5ty.onrender.com/renroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName: searchText,
          mentorName: selectedMentor,
          date: selectedDate,
        }),
      });

      if (response.ok) {
        console.log("Data submitted successfully!");
        // Reset form fields
        setSearchText("");
        setSelectedMentor("");
        setSelectedDate(new Date());
      } else {
        console.error("Error submitting data to the backend.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gray-700 w-screen min-h-screen border-solid border-2 border-indigo-600 overflow-hidden">
      <h1 className="relative py-7 w-[100vw] text-center text-4xl text-white border-solid border-2 border-indigo-600 mx-auto">
        <b> Type the Name of the Student to Search</b>
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-wrap justify-center">
        <div>
          {/* Search Bar */}
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div
            className="relative mt-5 w-[80vw] mx-auto"
            style={{ position: "sticky", top: "0" }}
          >
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Student by name..."
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
                        {student.name} - Mentor: {student.mentor}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          {/* End of Search Bar */}
        </div>
        <div className=" ml-4 px-2 mt-4  w-[25vw] ">
          <label className="text-white">Select Date&nbsp;:&nbsp;</label>
          <input
            type="date"
            className="rounded-md px-1 py-3 transition-all ease-in duration-75 bg-gradient-to-br from-purple-600 to-blue-500"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>
        <div className="mt-4 ml-4">
          <button
            id="classButton"
            className={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800`}
            type="submit"
            onClick={handleSubmit}
          >
            <span className="relative px-20 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Submit
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

// This function will run on the server and fetch initial data
export async function getServerSideProps(context) {
  try {
    // Fetch data from your backend API on the server side
    const response = await fetch("https://gp-backend-u5ty.onrender.com/api/data/");
    const data = await response.json();

    console.log(data);

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

export default Enroll;
