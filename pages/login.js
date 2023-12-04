import React, { useEffect, useState } from "react";
import Toast from "@/components/Toast";
import { useRouter } from "next/router"; 
import Head from "next/head";
import "../styles/Home.module.css";

const LoginPage = ({ initialTodos }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const mpp = new Map([[initialTodos[0].email,1], [initialTodos[0].password,1]]);
  const [foundUser, setFoundUser] = useState(initialTodos[0]._id);
  console.log(initialTodos[0]._id)
  const [color, setColor] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const toast = async () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked")
    console.log(formData)
    console.log(mpp.get(formData.email))


    if (mpp.get(formData.email)=== 1 && mpp.get(formData.password)=== 1) {
      document.cookie = `id=${initialTodos[0]._id}; max-age=3600; path=/; SameSite=None; Secure`;
      router.push("/home");
    } else {
      setMessage("Password or email is incorrect !");
      setColor("red");
      toast();
    }
    console.log("executed")
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  return (
    <>
      <div className="container mx-auto h-screen flex justify-center items-center bg-teal-950">
        <div className="w-[70vw] h-[80vh] flex">
          <div className="bg-white shadow-4xl rounded px-8 pt-6 pb-8 mb-4  border-2 rounded-3xl  w-[30vw] h-[80vh]">
            <h1 className="text-2xl font-bold mb-8 text-center">LOGIN</h1>
            <form onSubmit={handleSubmit}>
              {/* ... rest of your form code */}
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
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};


export async function getServerSideProps() {
  // Fetch the initial todos from the backend
  try {
    const response = await fetch("https://gp-backend-u5ty.onrender.com/api/ownerData/");
    // console.log(response)
    if (response.ok) {

      const initialTodos = await response.json();
      // console.log(initialTodos)
      return {
        props: { initialTodos },
      };
    }
  } catch (error) {
    console.error("Error fetching initial todos:", error);
  }

  // If there's an error, return an empty initialTodos array
  return {
    props: { initialTodos: [] },
  };
}

export default LoginPage;
