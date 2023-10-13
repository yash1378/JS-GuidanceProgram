import React, { useState } from "react";
import Toast from "@/components/Toast";
import { useRouter } from "next/router"; // Import the useRouter hook
import Head from "next/head";
import "../styles/Home.module.css";

const LoginPage = ({ d, td }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await fetch("https://gp-backend-u5ty.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setFormData({ email: "", password: "" });

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        // Handle success, e.g., show a success message or redirect to another page
        console.log(data.message);
        console.log(data);

        if (data.type === "mentor") {
          let it = d.filter((item) => item.name === data.name);
          console.log(it);
          console.log(it[0]._id); //because it is an array of objects
          document.cookie = `id=${it[0]._id}; max-age=3600; path=/`;
          router.push("/mentor/" + data.name); // Use router.push to navigate
        } else if (data.type === "owner") {
          let it = td.filter((item) => item.ownername === data.name);
          console.log(it);
          console.log(it[0]._id); //because it is an array of objects
          document.cookie = `id=${it[0]._id}; max-age=3600; path=/`;
          router.push("/home"); // Use router.push to navigate
        }
      } else {
        // Handle errors, e.g., display an error message to the user
        console.error("Login failed");
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
      <div className="container mx-auto h-screen flex justify-center items-center ">
        <div className="w-full max-w-xs">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-2xl font-bold mb-8 text-center">LOGIN</h1>
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
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <button
                  onClick={handleSubmit}
                  id="slide-button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Login
                </button>

                <p
                  className="cursor-pointer font-bold text-sm text-blue-500 hover:text-blue-800"
                  onClick={() => router.push("/forgpassword")}
                >
                  Forgot Password?
                </p>
                <p
                  className="cursor-pointer font-bold text-sm text-blue-500 hover:text-blue-800"
                  onClick={() => router.push("/password-change")}
                >
                  Change Password?
                </p>
                <p
                  className="cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  onClick={() => router.push("/")}
                >
                  Back to Home
                </p>
              </div>
            </form>
            <div
              className="mx-auto mt-4 p-4 rounded-lg bg-white dark:bg-gray-800"
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

      {/* <script src="../script.js"></script> */}
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const response = await fetch(
      "https://gp-backend-u5ty.onrender.com/api/ownerData/"
    );
    const td = await response.json();
    const r = await fetch(
      "https://gp-backend-u5ty.onrender.com/api/mentorData/"
    );
    const d = await r.json();
    console.log(td);

    return {
      props: {
        d,
        td,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        d: [],
        td: [],
      },
    };
  }
}

export default LoginPage;
