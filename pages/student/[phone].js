import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Toast from "@/components/Toast";

function Student() {
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Add phone number state
  const [selectedDate, setSelectedDate] = useState(null); // Add date state
  const [selectedClass, setSelectedClass] = useState(""); // Add class state
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const router = useRouter();
  const { phone } = router.query;
  const back = () => {
    router.push("/edit");
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://gp-backend-u5ty.onrender.com/student/${phone}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName,
          studentEmail,
          phoneNumber, // Include phone number in the request
          selectedDate, // Include date in the request
          selectedClass, // Include class in the request
        }),
      });
      setStudentName("");
      setStudentEmail("");
      setPhoneNumber(""); // Clear phone number after submission
      setSelectedDate(null); // Clear date after submission
      setSelectedClass(""); // Clear class after submission

      if (response.ok) {
        setMessage("Data Updated Successfully");
        setColor("green");
        setShowToast(true);
        setIsButtonEnabled(true);
      } else {
        console.error("Failed to update student data.");
        setMessage("Failed to update data");
        setColor("red");
        setShowToast(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setMessage("An error occurred");
      setColor("red");
      setShowToast(true);
    }
  };

  return (
    <>
      <div
        className="mx-auto mt-8 p-4 rounded-lg bg-white dark:bg-gray-800"
        style={{ maxWidth: "60vw" }}
      >
        <form onSubmit={handleEditSubmit}>
          <div className="mb-4">
            <label
              htmlFor="studentName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Student Name
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Enter Student's Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="studentEmail"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Student Email
            </label>
            <input
              type="email"
              id="studentEmail"
              name="studentEmail"
              className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Enter Student's Email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="selectedDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date
            </label>
            <input
              type="date"
              id="selectedDate"
              name="selectedDate"
              className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="selectedClass"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Class
            </label>
            <input
              type="text"
              id="selectedClass"
              name="selectedClass"
              className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Enter Class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-20 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Update Data
              </span>
            </button>
          </div>
          <div className="mb-4">
            <button
              type="button"
              className={`text-white bg-blue-400 dark:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                isButtonEnabled
                  ? "bg-blue-400 dark:bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-600"
                  : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!isButtonEnabled}
              onClick={back}
            >
              Go Back
            </button>
          </div>
          <div
            className="mx-auto mt-8 p-4 rounded-lg bg-white dark:bg-gray-800"
            style={{ maxWidth: "60vw" }}
          >
            {showToast && (
              <Toast
                message={message}
                bgColor={color}
                onClose={() => setShowToast(false)}
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default Student;
