import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Toast from "@/components/Toast";
import Modal from "@/components/Modal";

function Student({data}) {
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [mentorName, setMentorName] = useState("");
  const [mentorEmail, setmentorEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0); // Add phone number state
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
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


  const router = useRouter();
  const { tryi } = router.query;
  const phone = tryi;
  console.log(phone)
  const back = () => {
    router.push("/edit");
  };

  // Set default values from the data prop when the component mounts
  useEffect(() => {
    const mentorData = data.find((item) => item.phone === phone);
    if (mentorData) {
      setMentorName(mentorData.name);
      setmentorEmail(mentorData.email);
      setPhoneNumber(mentorData.phone);
    }
  }, [data, phone]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    closeModal(e);

    try {
      const response = await fetch(`https://gp-backend-u5ty.onrender.com/mentorupdate/${phone}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name:mentorName,
          email:mentorEmail,
          phoneno:phoneNumber, // Include phone number in the request
        }),
      });
      // setMentorName("");
      // setmentorEmail("");
      // setPhoneNumber(""); // Clear phone number after submission
      // setSelectedDate(null); // Clear date after submission
      // setSelectedClass(""); // Clear class after submission

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
        <form >
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
              name="mentorName"
              className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Enter Student's Name"
              value={mentorName}
              onChange={(e) => setMentorName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="mentorEmail"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mentor Email
            </label>
            <input
              type="email"
              id="mentorEmail"
              name="mentorEmail"
              className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Enter Student's Email"
              value={mentorEmail}
              onChange={(e) => setmentorEmail(e.target.value)}
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
            <button
              type="submit"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
             onClick={openModal}>
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
                    Are you sure you want to assign this mentor to Selected
                    Students?
                  </h3>
                  <button
                    onClick={handleEditSubmit} // Call handleSubmit when "Yes, I'm sure" is clicked
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    onClick={closeModal} // Close the modal when "No, cancel" is clicked
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                </div>
              </Modal>
            )}
          </div>
        </form>
      </div>
    </>
  );
}


export async function getServerSideProps(context) {
  try {
    // Fetch data from your backend API on the server side
    const response = await fetch(
      "https://gp-backend-u5ty.onrender.com/api/mentorData/"
    );
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

export default Student;
