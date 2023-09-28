import React, { useState, useEffect } from "react";
import DataPage from "@/components/DataPage";

function ParentComponent({data,additionalData}) {

  const [d, setD] = useState([]);
  const [ad,setAD] = useState([])

  // Function to update the data state
  const updateData = (newData) => {
    setD(newData);
  };

  // Function to update the additionalData state
  const updateAdditionalData = (newAdditionalData) => {
    setAD(newAdditionalData);
  };


  return (
    <DataPage
      data={data} // Pass the data state
      updateData={updateData} // Pass the updateData function
      additionalData={additionalData} // Pass the additionalData state
      updateAdditionalData={updateAdditionalData} // Pass the updateAdditionalData function
    />
  );
}

export default ParentComponent;



export async function getServerSideProps() {
  try {
    // Fetch data from your API routes (backend)
    const response1 = await fetch("http://localhost:4000/api/data"); // Replace with your API URL
    const data = await response1.json();

    const response2 = await fetch("http://localhost:4000/api/mentordata"); // Replace with your other API URL
    const additionalData = await response2.json();

    return {
      props: {
        data,
        additionalData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: [],
        additionalData: [],
      },
    };
  }
}
