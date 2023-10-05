import React, { useState } from "react";
import { useRouter } from "next/router";

function PhoneNumberInputPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleGoToEdit = () => {
    // Check if the phone number is not empty
    if (phoneNumber.trim() !== "") {
      // Navigate to the "edit" page with the provided phone number as a query parameter
      router.push(`/student/${phoneNumber}`);
    } else {
      // Display an error or alert if the phones number is empty
      alert("Please enter a valid phone number.");
    }
  };

  return (
    <div className="mx-auto mt-8 p-4 rounded-lg bg-white dark:bg-gray-800" style={{ maxWidth: "60vw" }}>
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Enter Phone Number</h2>
      <input
        type="text"
        id="phoneNumber"
        name="phoneNumber"
        className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        required
      />
      <button
        onClick={handleGoToEdit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
      >
        Go to Edit
      </button>
    </div>
  );
}

export default PhoneNumberInputPage;
