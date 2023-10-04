import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name:"",
  });

  const router = useRouter();

  // Function to handle input changes and update formData state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://gp-backend-u5ty.onrender.com/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful registration, e.g., show a success message or redirect to another page
        console.log("Registration successful");
        router.push("/login"); // Redirect to the login page after successful registration
      } else {
        // Handle registration errors, e.g., display an error message
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <>
      <div className="container mx-auto h-screen flex justify-center items-center">
        <div className="w-full max-w-xs">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-2xl font-bold mb-8 text-center">
              REGISTER HERE
            </h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <i
                    className="fa-solid fa-lock absolute left-2 top-2 text-white"
                    style={{ color: "#ffffff" }}
                  ></i>
                </div>
                </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <i
                    className="fa-solid fa-user absolute left-2 top-2 text-white"
                    style={{ color: "#ffffff" }}
                  ></i>
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <i
                    className="fa-solid fa-lock absolute left-2 top-2 text-white"
                    style={{ color: "#ffffff" }}
                  ></i>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={handleSubmit}
                  id="slide-button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
