import React, { useState, useEffect } from "react";
import DataPage from "@/components/DataPage";

function ParentComponent({data,additionalData}) {

  const [studentsWithoutMentor, setStudentsWithoutMentor] = useState([]);

  useEffect(() => {
    // Filter students without mentors
    const studentsWithoutMentors = data.filter((student) => !student.mentor);
    setStudentsWithoutMentor(studentsWithoutMentors);
  }, [data]);

  // Function to update data and remove assigned students
  const updateData = (newData) => {
    // Update the data array with the new data
    // This will trigger a re-render of DataPage with the updated data
    data = newData;

    // Filter students without mentors
    const studentsWithoutMentors = data.filter((student) => !student.mentor);
    setStudentsWithoutMentor(studentsWithoutMentors);
  };



  return (
    <DataPage
    data={studentsWithoutMentor} // Pass the filtered data without mentors
    updateData={updateData}
    additionalData={additionalData}
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
