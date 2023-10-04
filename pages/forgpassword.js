import React, { useState } from "react";
import { useRouter } from "next/router";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // To display success or error message
  const router = useRouter();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendEmail = async () => {
    try {
      const response = await fetch("https://gp-backend-u5ty.onrender.com/send-password-reset-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Send the email to the backend
      });

      if (response.ok) {
        // Email sent successfully
        setMessage("Recovery email sent successfully.");
        router.push("/login");

      } else {
        // Error sending email
        setMessage("Failed to send recovery email. Please try again.");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("An error occurred:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold mb-8 text-center">Forgot Password</h1>
          {message && <p className="text-red-500 text-center mb-4">{message}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={handleSendEmail}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
