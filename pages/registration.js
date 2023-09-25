import React, { useEffect, useState } from "react";
import Toast from "@/components/Toast";

function Registration() {
  const [studentName, setStudentName] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [selectedClass, setSelectedClass] = useState("Class");
  const [subscriptionType, setSubscriptionType] = useState("Type");
  const [reenrollment, setReenrollment] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  // State variables to track dropdown open/closed state
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const [subscriptionTypeDropdownOpen, setSubscriptionTypeDropdownOpen] =
    useState(false);
  const [reenrollmentDropdownOpen, setReenrollmentDropdownOpen] =
    useState(false);

  // Add state variable for toast visibility
  const [showToast, setshowToast] = useState(false);

  const toast = async () => {
    setshowToast(true);
    setTimeout(() => {
      setshowToast(false); // Hide the toast after 3 seconds
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted with:", {
      studentName,
      phoneNumber,
      studentEmail,
      paymentDate,
      selectedClass,
      subscriptionType,
    });
    setStudentName("");
    setPhoneNumber("");
    setStudentEmail("");
    setPaymentDate("");
    setSelectedClass("");
    setSubscriptionType("");
    const formData = {
      name: studentName,
      phone: phoneNumber,
      email: studentEmail,
      date: paymentDate,
      class: selectedClass,
      sub: subscriptionType,
    };
    try {
      const response = await fetch("http://localhost:4000/", {
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

        // Set a timer to hide the toast after 3 seconds
        // setTimeout(setshowToast(false), 3000);
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

    // Implement form submission logic here (e.g., send data to the backend)
  };

  const toggleDropdown = (field) => {
    // Toggle the dropdown state based on the field
    switch (field) {
      case "class":
        setClassDropdownOpen(!classDropdownOpen);
        break;
      case "subscriptionType":
        setSubscriptionTypeDropdownOpen(!subscriptionTypeDropdownOpen);
        break;
      case "reenrollment":
        setReenrollmentDropdownOpen(!reenrollmentDropdownOpen);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div
        className="mx-auto  mt-8 p-4 rounded-lg bg-white dark:bg-gray-800"
        style={{ maxWidth: "60vw", boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.5)" }}
      >
        <form>
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
              className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                studentName ? "has-value" : ""
              }`}
              placeholder="Enter your Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
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
              className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                phoneNumber ? "has-value" : ""
              }`}
              placeholder="Enter your Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
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
              className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                studentEmail ? "has-value" : ""
              }`}
              placeholder="Enter your Email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="paymentDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date of Payment
            </label>
            <input
              type="date"
              id="paymentDate"
              className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                paymentDate ? "has-value" : ""
              }`}
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              required
            />
          </div>
          {/* Responsive styling for Class, Subscription Type, and Reenrollment */}
          <div className="mb-4 md:flex md:space-x-2">
            {/* Class Field */}
            <div className="w-full md:w-1/3 mb-2 md:mb-0">
              <label
                htmlFor="selectedClass"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Class
              </label>
              <button
                id="classDropdownButton"
                // data-dropdown-toggle="dropdown"
                className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  selectedClass ? "has-value" : ""
                }`}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown("class");
                }}
              >
                {selectedClass || "Select Class"}{" "}
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              <div
                id="classDropdown"
                className={`z-10 ${
                  classDropdownOpen ? "block" : "hidden"
                } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                style={{ zIndex: 10 }}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="classDropdownButton"
                >
                  <li>
                    <button
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedClass("10th Grade");
                        toggleDropdown("class");
                      }}
                    >
                      10th Grade
                    </button>
                  </li>
                  <li>
                    <button
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedClass("11th Grade");
                        toggleDropdown("class");
                      }}
                    >
                      11th Grade
                    </button>
                  </li>
                  <li>
                    <button
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedClass("12th Grade");
                        toggleDropdown("class");
                      }}
                    >
                      12th Grade
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Subscription Type Field */}
            <div className="w-full md:w-1/3 mb-2 md:mb-0">
              <label
                htmlFor="subscriptionType"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Subscription Type
              </label>
              <button
                id="subscriptionTypeDropdownButton"
                // data-dropdown-toggle="dropdown"
                className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  subscriptionType ? "has-value" : ""
                }`}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown("subscriptionType");
                }}
              >
                {subscriptionType || "Select Type"}{" "}
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              <div
                id="subscriptionTypeDropdown"
                className={`z-10 ${
                  subscriptionTypeDropdownOpen ? "block" : "hidden"
                } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                style={{ zIndex: 10 }}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="subscriptionTypeDropdownButton"
                >
                  <li>
                    <button
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        setSubscriptionType("Type A");
                        toggleDropdown("subscriptionType");
                      }}
                    >
                      Type A
                    </button>
                  </li>
                  <li>
                    <button
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        setSubscriptionType("Type B");
                        toggleDropdown("subscriptionType");
                      }}
                    >
                      Type B
                    </button>
                  </li>
                  <li>
                    <button
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        setSubscriptionType("Type C");
                        toggleDropdown("subscriptionType");
                      }}
                    >
                      Type C
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Reenrollment Field */}
            <div className="w-full md:w-1/3 mb-2 md:mb-0">
              <label
                htmlFor="reenrollment"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Reenrollment
              </label>
              <button
                id="reenrollmentDropdownButton"
                // data-dropdown-toggle="dropdown"
                className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  reenrollment ? "has-value" : ""
                }`}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown("reenrollment");
                }}
              >
                {reenrollment ? "Yes" : "No"}{" "}
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              <div
                id="reenrollmentDropdown"
                className={`z-10 ${
                  reenrollmentDropdownOpen ? "block" : "hidden"
                } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                style={{ zIndex: 10 }}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="reenrollmentDropdownButton"
                >
                  <li>
                    <button
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        setReenrollment(true);
                        toggleDropdown("reenrollment");
                      }}
                    >
                      Yes
                    </button>
                  </li>
                  <li>
                    <button
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        setReenrollment(false);
                        toggleDropdown("reenrollment");
                      }}
                    >
                      No
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mb-4 md:flex md:space-x-2">
            {/* Class Field */}
            <div className="w-full md:w-1/3 mb-2 md:mb-0 mr-10">
              <button
                id="classButton"
                className={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ${
                  selectedClass ? "has-value" : ""
                }`}
                type="submit"
                onClick={handleSubmit}
              >
                <span className="relative px-20 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Submit
                </span>
              </button>
            </div>

            {/* Subscription Type Field */}
            <div className="w-full md:w-1/3 mb-2 md:mb-0">
              <button
                id="subscriptionTypeButton"
                className={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ${
                  subscriptionType ? "has-value" : ""
                }`}
                type="button"
              >
                <span className="relative px-20 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Edit Data
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div
        className="mx-auto mt-8 p-4 rounded-lg bg-white dark:bg-gray-800"
        style={{ maxWidth: "60vw" }}
      >
        {/* Your form and dropdowns here */}

        {/* Display the success toast if showSuccessToast is true */}
        {showToast && (
          <Toast
            message={message}
            bgColor={color}
            onClose={() => setshowToast(false)}
          />
        )}
      </div>
    </>
  );
}

export default Registration;

