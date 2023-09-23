import React, { useState, useEffect } from "react";
import Toast from "@/components/Toast";

function MentorInputForm() {
  const [mentorName, setMentorName] = useState("");
  const [mentorPhoneNumber, setMentorPhoneNumber] = useState("");
  const [mentorCollegeName, setMentorCollegeName] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [showToast, setShowToast] = useState(false);

  const toast = async () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted with:", {
      mentorName,
      mentorPhoneNumber,
      mentorCollegeName,
      dateOfJoining,
    });
    setMentorName("");
    setMentorPhoneNumber("");
    setMentorCollegeName("");
    setDateOfJoining("");
    const formData = {
      name: mentorName,
      phone: mentorPhoneNumber,
      college: mentorCollegeName,
      date: dateOfJoining,
    };
    try {
      const response = await fetch("http://localhost:4000/mentorData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form data submitted successfully!");
        setMessage("Data Sent Successfully");
        setColor("green");
        toast();
      } else {
        console.error("Failed to submit form data.");
        setMessage("Failed to submit for Data");
        setColor("red");
        toast();
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setMessage("An error occurred");
      setColor("red");
      toast();
    }
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
              htmlFor="mentorName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mentor Name
            </label>
            <input
              type="text"
              id="mentorName"
              className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                mentorName ? "has-value" : ""
              }`}
              placeholder="Enter Mentor's Name"
              value={mentorName}
              onChange={(e) => setMentorName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="mentorPhoneNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mentor Phone Number
            </label>
            <input
              type="tel"
              id="mentorPhoneNumber"
              className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                mentorPhoneNumber ? "has-value" : ""
              }`}
              placeholder="Enter Mentor's Phone Number"
              value={mentorPhoneNumber}
              onChange={(e) => setMentorPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="mentorCollegeName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mentor College Name
            </label>
            <input
              type="text"
              id="mentorCollegeName"
              className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                mentorCollegeName ? "has-value" : ""
              }`}
              placeholder="Enter Mentor's College Name"
              value={mentorCollegeName}
              onChange={(e) => setMentorCollegeName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dateOfJoining"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date of Joining
            </label>
            <input
              type="date"
              id="dateOfJoining"
              className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark-text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                dateOfJoining ? "has-value" : ""
              }`}
              value={dateOfJoining}
              onChange={(e) => setDateOfJoining(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 md:flex md:space-x-2">
            <div className="w-full md:w-1/3 mb-2 md:mb-0">
              <button
                id="submitButton"
                className={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ${
                  mentorName && mentorPhoneNumber && mentorCollegeName && dateOfJoining
                    ? "has-value"
                    : ""
                }`}
                type="submit"
                onClick={handleSubmit}
              >
                <span className="relative px-20 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Submit
                </span>
              </button>
            </div>
          </div>
        </form>
        <div className="mx-auto mt-8 p-4 rounded-lg bg-white dark:bg-gray-800" style={{ maxWidth: "60vw" }}>
          {showToast && (
            <Toast message={message} bgColor={color} onClose={() => setShowToast(false)} />
          )}
        </div>
      </div>
    </>
  );
}

export default MentorInputForm;
