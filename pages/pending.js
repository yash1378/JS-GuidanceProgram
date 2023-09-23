import React from "react";
import { useState } from "react";

const DataPage = ({ data }) => {
    const [selectedRows, setSelectedRows] = useState([]); // To store selected row IDs

    // Function to toggle selection for a specific row
    const toggleSelect = (id) => {
      if (selectedRows.includes(id)) {
        setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      } else {
        setSelectedRows([...selectedRows, id]);
      }
    };
  return (
    <div
      className="relative ml-10 mt-20 overflow-x-auto shadow-md sm:rounded-lg"
      style={{ maxWidth: "70vw" }}
    >
      <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
          {data.map((item, index) => (
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
  );
};

export default DataPage;

export async function getServerSideProps() {
  try {
    // Fetch data from your API route (backend)
    const response = await fetch("http://localhost:4000/api/data"); // Replace with your API URL
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
