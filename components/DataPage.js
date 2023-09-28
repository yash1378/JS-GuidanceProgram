
import React, { useState,useEffect } from "react";
import Modal from "@/components/Modal";

const DataPage = ({ data, additionalData,updateData,updateAdditionalData }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState("");
    const [selectedStudentIds, setSelectedStudentIds] = useState([]);
    const [value, setValue] = useState(0);
  
  
    // State variable to manage modal visibility
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Function to open the modal
    const openModal = () => {
      setIsModalVisible(true);
    };
  
    // Function to close the modal
    const closeModal = () => {
      setIsModalVisible(false);
    };
  
    // Function to toggle selection for a specific row
    const toggleSelect = (id) => {
      if (selectedRows.includes(id)) {
        setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      } else {
        setSelectedRows([...selectedRows, id]);
      }
    };
  
    // Handle mentor selection
    const handleMentorSelect = (mentorName) => {
      setSelectedMentor(mentorName);
    };
  
    // Handle form submission
    const handleSubmit = async () => {
      if (!selectedMentor) {
        // Handle mentor not selected
        // openModal();
        return;
      }
  
      try {
        // Send an API request to update mentor and students
        const response = await fetch("http://localhost:4000/api/finalMentor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mentorName: selectedMentor,
            studentIds: selectedStudentIds,
          }),
        });
        if (response.ok) {
          // Handle success
          console.log("Mentor and students updated successfully");
  
          // Unselect all checkboxes
          setSelectedRows([]);
          setSelectedMentor("");
  
          // Fetch the latest data from the server
          const response1 = await fetch("http://localhost:4000/api/data"); // Replace with your API URL
          const updatedData = await response1.json();
          console.log(updatedData);
        // Update the 'data' prop by calling a parent function (if you have one)
        // This will ensure the parent component re-renders and passes the updated 'data' prop
        if (updateData) {
            updateData(updatedData);
          }
  
  
          // You can fetch updated 'additionalData' here if it has changed on the server
        } else {
          // Handle error
          console.error("Failed to update mentor and students");
        }
      } catch (error) {
        console.error("An error occurred while updating data:", error);
      }
    };
  
    useEffect(() => {
      // Update the selectedStudentIds whenever selectedRows change
      const ids = data
        .filter((item) => selectedRows.includes(item._id))
        .map((item) => item._id);
      setSelectedStudentIds(ids);
    }, [selectedRows]);
  
    return (
      <>
        <div className="flex">
          <div className="w-1/2 pr-4">
            <div
              className="relative ml-10 mt-20 overflow-x-auto shadow-md sm:rounded-lg"
              style={{ maxWidth: "70vw" }}
            >
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-x text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Select
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Student Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone.No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Payment Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Sub Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Class
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter((item) => item.mentor === "") // Filter by mentor name being empty
                    .map((item, index) => (
                      <tr
                        key={item._id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="border px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(item._id)}
                            onChange={() => toggleSelect(item._id)}
                          />
                        </td>
                        <td className="border text-x text-black px-6 py-4">
                          {item.name}
                        </td>
                        <td className="border px-6 py-4">{item.phone}</td>
                        <td className="border px-6 py-4">{item.date}</td>
                        <td className="border px-6 py-4">{item.sub}</td>
                        <td className="border px-6 py-4">{item.class}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
  
          <div className="w-1/2 pl-4">
            <div
              className="relative ml-10 mt-20 overflow-x-auto shadow-md sm:rounded-lg"
              style={{ maxWidth: "70vw" }}
            >
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-x text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {/* Add headers for additional data */}
                    <th scope="col" className="px-6 py-3">
                      Mentor
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ongoing
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Available
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Select
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {additionalData.map((item, index) => (
                    <tr
                      key={item._id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border text-x text-black px-6 py-4">
                        {item.name}
                      </td>
                      <td className="border px-6 py-4">{item.on}</td>
                      <td className="border px-6 py-4">
                        {item.handle - item.on}
                      </td>
                      <td className="border px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedMentor === item.name} // Check if the mentor name matches the selectedMentor
                          onChange={() => handleMentorSelect(item.name)} // Pass the mentor name
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
  
        <div className="text-center mt-4">
          <button
            onClick={openModal}
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </div>
        {/* Modal */}
        {isModalVisible && (
          <Modal onClose={closeModal}>
            <div className="p-6 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to assign this mentor to Selected Students?
              </h3>
              <button
                onClick={()=>{
                  handleSubmit();
                  closeModal();
                }} // Call handleSubmit when "Yes, I'm sure" is clicked
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
        )};

</>
  );
};


export default DataPage;