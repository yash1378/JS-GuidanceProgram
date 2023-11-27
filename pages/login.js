// import React, { useState } from "react";
// import Toast from "@/components/Toast";
// import { useRouter } from "next/router"; // Import the useRouter hook
// import Head from "next/head";
// import "../styles/Home.module.css";

// const LoginPage = ({ td }) => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [color, setColor] = useState("");
//   const [showToast, setShowToast] = useState(false);
//   const [message, setMessage] = useState("");
//   const router = useRouter(); // Initialize the router
//   // console.log(td);
//   const toast = async () => {
//     setShowToast(true);
//     setTimeout(() => {
//       setShowToast(false);
//     }, 3000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("https://gp-backend-u5ty.onrender.com/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       setFormData({ email: "", password: "" });

//       console.log(response);
//       if (response.ok) {
//         const data = await response.json();
//         // Handle success, e.g., show a success message or redirect to another page
//         console.log(data.message);
//         console.log(data);
//         // if (data.type === "owner") {
//           let it = td.filter((item) => item.ownername === data.name);
//           console.log(it);
//           console.log(it[0]._id); //because it is an array of objects
//           document.cookie = `id=${it[0]._id}; max-age=3600; path=/`;
//           router.push("/home"); // Use router.push to navigate
//         // }
//       } else {
//         // Handle errors, e.g., display an error message to the user
//         console.error("Login failed");
//         setMessage("Password or email is incorrect !");
//         setColor("red");
//         toast();
//       }
//     } catch (error) {
//       console.error("An error occurred", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <>
//   <div className="container mx-auto h-screen flex justify-center items-center bg-teal-950 ">
//     <div className="w-[70vw] h-[80vh] flex">
//       {/* Left Side: Form */}
//       <div className="bg-white shadow-4xl rounded px-8 pt-6 pb-8 mb-4  border-2 rounded-3xl  w-[30vw] h-[80vh]">
//         <h1 className="text-2xl font-bold mb-8 text-center">LOGIN</h1>
//             <form>
//               <div className="mb-4">
//                 <label
//                   htmlFor="email"
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                 >
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 />
//               </div>
//               <div className="mb-6">
//                 <label
//                   htmlFor="password"
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   required
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 />
//               </div>
//               <div className="flex flex-col items-center justify-center space-y-2">
//                 <button
//                   onClick={handleSubmit}
//                   id="slide-button"
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 >
//                   Login
//                 </button>

//                 <p
//                   className="cursor-pointer font-bold text-sm text-blue-500 hover:text-blue-800"
//                   onClick={() => router.push("/forgpassword")}
//                 >
//                   Forgot Password?
//                 </p>
//                 <p
//                   className="cursor-pointer font-bold text-sm text-blue-500 hover:text-blue-800"
//                   onClick={() => router.push("/password-change")}
//                 >
//                   Change Password?
//                 </p>
//                 <p
//                   className="cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
//                   onClick={() => router.push("/")}
//                 >
//                   Back to Home
//                 </p>
//               </div>
//             </form>
//             <div
//               className="mx-auto mt-4 p-4 rounded-lg bg-white dark:bg-gray-800"
//               style={{ maxWidth: "60vw" }}
//             >
//               {showToast && (
//                 <Toast
//                   message={message}
//                   bgColor={color}
//                   onClose={() => setShowToast(false)}
//                 />
//               )}
//             </div>
//           </div>
//           <div className="w-[40vw] h-[70vh]">
//           <img src="https://i.ibb.co/FBYscr3/profile.jpg" style={{maxWidth:"100%",height:"79.8vh",borderRadius:"20px"}}
//           alt="profile" border="0" />
//       </div>
//         </div>
//       </div>

//       {/* <script src="../script.js"></script> */}
//     </>
//   );
// };

// export async function getServerSideProps(context) {
//   try {
//     const response = await fetch(
//       "https://gp-backend-u5ty.onrender.com/ownerData/"
//     );
//     const td = await response.json();
//     // const r = await fetch(
//     //   "https://gp-backend-u5ty.onrender.com/api/mentorData/"
//     // );
//     // const d = await r.json();
//     // console.log(td);

//     return {
//       props: {
//         // d,
//         td,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       props: {
//         // d: [],
//         td: [],
//       },
//     };
//   }
// }

// export default LoginPage;

import React, { useState, useEffect } from "react";
import Toast from "@/components/Toast";
import { useRouter } from "next/router";
import Head from "next/head";
import "../styles/Home.module.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [color, setColor] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [td, setTd] = useState([]); // State to store owner data
  const router = useRouter();

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const response = await fetch("https://gp-backend-u5ty.onrender.com/ownerData/");
        const data = await response.json();
        setTd(data);
      } catch (error) {
        console.error("Error fetching owner data:", error);
      }
    };

    fetchOwnerData(); // Fetch owner data on component mount
  }, []); // Empty dependency array to ensure it runs only once on mount

  const toast = () => {
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

      if (response.ok) {
        const data = await response.json();
        let it = td.filter((item) => item.ownername === data.name);
        document.cookie = `id=${it[0]._id}; max-age=3600; path=/`;
        router.push("/home");
      } else {
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
      <div className="container mx-auto h-screen flex justify-center items-center bg-teal-950">
        <div className="w-[70vw] h-[80vh] flex">
          <div className="bg-white shadow-4xl rounded px-8 pt-6 pb-8 mb-4  border-2 rounded-3xl  w-[30vw] h-[80vh]">
            <h1 className="text-2xl font-bold mb-8 text-center">LOGIN</h1>
            <form>
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
            </form>
          </div>
          <div className="w-[40vw] h-[70vh]">
            <img
              src="https://i.ibb.co/FBYscr3/profile.jpg"
              style={{
                maxWidth: "100%",
                height: "79.8vh",
                borderRadius: "20px",
              }}
              alt="profile"
              border="0"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
