import React, { useState, useEffect } from "react";
import Toast from "@/components/Toast";
import Head from "next/head";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Modal from "@/components/Modal";

function MentorInputForm() {
  const [mentorName, setMentorName] = useState("");
  const [mentorPhoneNumber, setMentorPhoneNumber] = useState("");
  const [mentorCollegeName, setMentorCollegeName] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const toast = async () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to open the modal
  const openModal = (e) => {
    e.preventDefault(); //this command is necessary otheriwse the form will get reload
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = (e) => {
    e.preventDefault(); //this command is necessary otheriwse the form will get reload
    setIsModalVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeModal(e);

    console.log("Form submitted with:", {
      mentorName,
      mentorPhoneNumber,
      mentorCollegeName,
      dateOfJoining,
    });

    const formData = {
      name: mentorName,
      phone: mentorPhoneNumber,
      college: mentorCollegeName,
      date: dateOfJoining,
      email: email,
      password: password,
    };
    try {
      const response = await fetch(
        "https://gp-backend-u5ty.onrender.com/mentorData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      setMentorName("");
      setMentorPhoneNumber("");
      setMentorCollegeName("");
      setDateOfJoining("");
      setEmail("");
      setPassword("");

      if (response.ok) {
        console.log("Form data submitted successfully!");
        setMessage("Data Sent Successfully");
        setColor("green");
        toast();
      } else {
        console.log(response);
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
    <div className="bg-gray-700 dark:bg-gray-900 pt-4 w-screen min-h-screen">
      <div
        className="mx-auto  relative p-4 rounded-lg bg-gray-900 dark:bg-gray-800"
        style={{
          maxWidth: "60vw",
          boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <form>
          <div className="mb-4 ">
            <label
              htmlFor="mentorName"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Mentor Name
            </label>
            <input
              type="text"
              id="mentorName"
              className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-amber-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
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
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Mentor Phone Number
            </label>
            <input
              type="tel"
              id="mentorPhoneNumber"
              className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-amber-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
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
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-amber-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                email ? "has-value" : ""
              }`}
              placeholder="Enter Mentor's Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-amber-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                password ? "has-value" : ""
              }`}
              placeholder="Enter Mentor's Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="mentorCollegeName"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Mentor College Name
            </label>
            <input
              type="text"
              id="mentorCollegeName"
              className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-amber-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
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
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Date of Joining
            </label>
            <input
              type="date"
              id="dateOfJoining"
              className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-amber-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark-text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
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
                  mentorName &&
                  mentorPhoneNumber &&
                  mentorCollegeName &&
                  dateOfJoining
                    ? "has-value"
                    : ""
                }`}
                type="submit"
                onClick={openModal}
              >
                <span className="relative px-20 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Submit
                </span>
              </button>
            </div>
            <div className="w-full md:w-1/3 mb-2 md:mb-0">
              <button
                id="subscriptionTypeButton"
                onClick={() => router.push("/home")}
                className={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 `}
                type="button"
              >
                <span className="relative px-20 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Go Back
                </span>
              </button>
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
                    Are you sure you want to appoint this Mentor ?
                  </h3>
                  <button
                    onClick={handleSubmit} // Call handleSubmit when "Yes, I'm sure" is clicked
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    onClick={closeModal} // Close the modal when "No, cancel" is clicked
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                </div>
              </Modal>
            )}
          </div>
        </form>
        <div
          className="mx-auto mt-8 p-4 rounded-lg bg-gray-900 dark:bg-gray-800"
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
      </div>
    </div>
    </>
  );
}

export default MentorInputForm;
