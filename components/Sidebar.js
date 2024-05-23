// Sidebar.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaBars } from "react-icons/fa";


function Sidebar({ isOpen, closeSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(true); // Initially, keep the calendar closed
  const [date, setDate] = useState(""); // Empty string for initial calendar value
  const [mentorData, setMentorData] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState("");
  const [enrol,setEnrol] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    // setIsCalendarOpen(false); // Close the calendar when opening the dropdown
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
    setIsDropdownOpen(false); // Close the dropdown when opening the calendar
  };
  const router = useRouter();

  const changeurl = ()=>{
    if(selectedMentor && !date && !enrol){
        router.push(`?mentorName=${selectedMentor}`)
    }
    else if(selectedMentor && !date && enrol){
        router.push(`?mentorName=${selectedMentor}&enrolled=${enrol}`)
    }
    else if(selectedMentor && date && !enrol){
        router.push(`?mentorName=${selectedMentor}&enddate=${date}`)
    }
    else if(selectedMentor && date && enrol){
        router.push(`?mentorName=${selectedMentor}&enddate=${date}&enrolled=${enrol}`)
    }
    else if(!selectedMentor && date && !enrol){
        router.push(`?enddate=${date}`)
    }
    else if(!selectedMentor && date && enrol){
        router.push(`?enddate=${date}&enrolled=${enrol}`)
    }
    else if(!selectedMentor && !date && enrol){
        router.push(`?enrolled=${enrol}`)
    }
    setEnrol(false);
  }

  const removefilter = () =>{
    router.push('/stdashboard/');

    resetValues();

  }

  // Function to reset all state variables
  const resetValues = () => {
    setIsDropdownOpen(false);
    setIsCalendarOpen(true);
    setDate("");
    setSelectedMentor("");
    setEnrol(false);
  };




  useEffect(() => {
    // Fetch mentor data from the server when the component mounts
    const fetchMentorData = async () => {
      try {
        const response = await fetch("https://gp-backend-u5ty.onrender.com/api/mentorData");
        // const response = await fetch("http://localhost:5000/api/mentorData");
        const data = await response.json();
        setMentorData(data);
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      }
    };

    fetchMentorData();
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-64 h-screen  overflow-y-auto transition-transform ${
        isOpen ? "" : "-translate-x-full"
      } bg-zinc-900 text-gray-200`}
    >
      {/* Close Button */}
      <button
        onClick={() => {
          resetValues();
          closeSidebar();
        }}
        className="absolute top-4 right-4 text-white hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none z-60"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Currently Enrolled Button */}
      <button className="ml-0 mt-40 mb-5 w-full px-3 py-5 mb-2 text-white bg-zinc-700 z-70 hover:bg-zinc-800" onClick={() => {
        console.log(enrol)
        setEnrol(true)}
      }>
        Currently Enrolled
      </button>

      {/* Calendar */}
      {isCalendarOpen && (
        <div className="w-full ml-0 mb-5 px-3 py-3 mb-2 text-white bg-zinc-700 relative z-70 hover:bg-zinc-800">
          <input
            type="date"
            id="endDate"
            className={`block rounded-lg px-2.5 pb-2.5 pt-1 w-full text-m text-white bg-transparent dark:bg-gray-700 border-0 border-b-2 border-gray-300  ${
              date ? "has-value" : ""
            }`}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
      )}

      {/* Dropdown Button */}
      <div className="relative z-70">
        <button
          className="w-full ml-0 px-3 py-5 mb-2 text-white bg-zinc-700 relative z-70 hover:bg-zinc-800"
          onClick={toggleDropdown}
        >
          {selectedMentor ? selectedMentor : "Sort by Mentor"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        {/* Dropdown Content */}
        {isDropdownOpen && (
          <div className="absolute mt-1 w-full bg-zinc-700 text-white rounded-lg py-2 text-left z-70 hover:bg-zinc-800">
            {mentorData.map((mentor) => (
              <button
                key={mentor.id}
                className={`w-full px-3 py-2 hover:bg-zinc-800 focus:outline-none ${
                  selectedMentor === mentor.name ? "bg-zinc-800" : ""
                }`}
                onClick={() => {
                  setSelectedMentor(mentor.name);
                  toggleDropdown(); // Close the dropdown after selecting a mentor
                }}
              >
                {mentor.name}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* ... rest of your sidebar content */}
      <button
        className="ml-0 mt-5 mb-5 w-full px-3 py-5 mb-2 text-white bg-zinc-700 z-60 hover:bg-zinc-800"
        onClick={changeurl}
    
      >
        Apply Filters
      </button>
      <button
        className="ml-0 mt-2 mb-5 w-full px-3 py-5 mb-2 text-white bg-zinc-700 z-60 hover:bg-zinc-800"
        onClick={removefilter}
    
      >
        Remove Filters
      </button>
    </div>
  );
}

export default Sidebar;
