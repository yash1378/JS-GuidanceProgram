import React, { useState } from "react";
import { useRouter } from "next/router";
import Toast from "@/components/Toast";
import Head from "next/head";
import "../styles/Home.module.css";

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [color, setColor] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter(); // Initialize the router
  // console.log(td);
  const toast = async () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://gp-backend-u5ty.onrender.com/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Password changed successfully, handle success here
        console.log("Password changed successfully");
        router.push("/login");
      } else {
        // Handle errors, e.g., display an error message to the user
        console.error("Password change failed");
        setMessage("Password or email is incorrect !");
        setColor("red");
        toast();
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="container mx-auto h-screen flex justify-center items-center">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="oldPassword"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button onClick={handleSubmit} className="text-center cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                  Change Password
                </button>
                <p
                  className="cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  onClick={() => router.push("/login")}
                >
                  Back to Home
                </p>
              </div>
            </form>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordPage;
