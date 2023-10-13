// Sidebar.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaBars } from "react-icons/fa";


function Homesidebar({ isOpen, closeSidebar }) {
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
        const data = await response.json();
        setMentorData(data);
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      }
    };

    fetchMentorData();
  }, []);

  return (
    <div      className={`fixed top-0 left-0 z-50 w-64 h-screen  overflow-y-auto transition-transform ${
        isOpen ? "" : "-translate-x-full"
      } bg-zinc-900 text-gray-200`}>Hello world</div>
    
);
}

export default Homesidebar;
