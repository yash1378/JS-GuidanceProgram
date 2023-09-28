import React, { useEffect, useState } from "react";
import Toast from "@/components/Toast";

function Registration() {
  const [selectedMentor, setSelectedMentor] = useState("");
  const [selectedStudentCount, setSelectedStudentCount] = useState("");
  const [mentors, setMentors] = useState([]); // Store mentor names fetched from the backend API
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Fetch mentor names from the backend API when the component mounts
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint to fetch mentors
      const response = await fetch("https://gp-backend-u5ty.onrender.com/api/mentorData");
      if (response.ok) {
        // console.log(response.json());
        const data = await response.json();

        const mentorNames = Object.values(data).map((mentor) => mentor.name);
        console.log(mentorNames);

        // console.log(data);
        setMentors(mentorNames); // Assuming data is an array of mentor names
      } else {
        console.error("Failed to fetch mentors.");
      }
    } catch (error) {
      console.error("An error occurred while fetching mentors:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
        console.log("Form submitted with:", {
          selectedMentor,
          selectedStudentCount,
        });
    
        // Send data to the backend API using fetch
        try {
          const response = await fetch("https://gp-backend-u5ty.onrender.com/api/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mentorName: selectedMentor,
              studentCount: selectedStudentCount,
            }),
          });
    
          if (response.ok) {
            setMessage("Data Sent Successfully");
            setColor("green");
            showToastMessage();
          } else {
            console.error("Failed to update data.");
          }
        } catch (error) {
          console.error("An error occurred while updating data:", error);
        }
    
        setSelectedMentor("");
        setSelectedStudentCount("");
      };
//   };

  const showToastMessage = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      <div
        className="mx-auto mt-8 p-4 rounded-lg bg-white dark:bg-gray-800"
        style={{ maxWidth: "60vw", boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.5)" }}
      >
        <form>
          <div className="mb-4">
            <label
              htmlFor="mentorSelect"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Mentor
            </label>
            <select
              id="mentorSelect"
              className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600`}
              value={selectedMentor}
              onChange={(e) => setSelectedMentor(e.target.value)}
              required
            >
              <option value="">Select Mentor</option>
              {mentors.map((mentor) => (
                <option key={mentor} value={mentor}>
                  {mentor}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="studentCountSelect"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Number of Students
            </label>
            <select
              id="studentCountSelect"
              className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600`}
              value={selectedStudentCount}
              onChange={(e) => setSelectedStudentCount(e.target.value)}
              required
            >
              <option value="">Select Number of Students</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <button
              id="submitButton"
              className={`relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ${
                selectedMentor && selectedStudentCount ? "has-value" : ""
              }`}
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
      <div
        className="mx-auto mt-8 p-4 rounded-lg bg-white dark:bg-gray-800"
        style={{ maxWidth: "60vw" }}
      >
        {showToast && (
          <Toast message={message} bgColor={color} onClose={() => setShowToast(false)} />
        )}
      </div>
    </>
  );
}

export default Registration;
