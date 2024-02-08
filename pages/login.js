import React, { useEffect, useState } from "react";
import Toast from "@/components/Toast";
import { useRouter } from "next/router";
import Head from "next/head";
import "../styles/Home.module.css";
import { Typography } from "@mui/material";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [initialTodos, setInitialTodos] = useState([]);
  const [mpp, setMpp] = useState(new Map());

  useEffect(() => {
    async function handleRouteChange() {
      const response = await fetch(
        "https://gp-backend-u5ty.onrender.com/api/ownerData/"
        // "http://localhost:5000/api/ownerData/"
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setInitialTodos(data);
        setFoundUser(data[0]._id);
      }
    }
    handleRouteChange();
  }, []);
  const [foundUser, setFoundUser] = useState();
  // console.log(initialTodos[0]._id);
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
    console.log("clicked");

    const mpp = new Map();
    mpp.set(initialTodos[0]?.email, 1);
    mpp.set(initialTodos[0]?.password, 1);

    // console.log(mpp);

    if (mpp.get(formData.email) === 1 && mpp.get(formData.password) === 1) {
      router.push("/home");
      document.cookie = `id=${initialTodos[0]._id}; max-age=3600; path=/; SameSite=None; Secure`;
    } else {
      setMessage("Password or email is incorrect !");
      setColor("red");
      toast();
    }
    console.log("executed");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Head>
        <style>
          {`
          body {
            background-color: #E1AD01;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
        </style>
      </Head>
      <div
        style={{
          position: "relative",
          width: "47vw",
          height: "56vh",
          borderRadius: "20px",
          marginTop: "20vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.9)",
          overflow: "hidden",
        }}
      >
        {/* Background image with reduced opacity */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url(./back.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "20px",
            zIndex: -1,
            opacity: "0.8", // Adjust the opacity value as needed
          }}
        >
        </div>


        <form
          onSubmit={handleSubmit}
          style={{width: "80%",height:"60%",marginTop:"0.2vh" }}
        >
          {/* ... rest of your form code */}
          <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <Typography
              style={{
                fontFamily: "'Graphik', sans-serif",
                color: "white",
                marginTop: "2vh",
              }}
              variant="h3"
              gutterBottom
              color="white"
              fontWeight="bold"
            >
               LOGIN
            </Typography>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              style={{ color: "white",fontSize:"1.1rem" }}
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
              style={{backgroundColor:"transparent"}}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              style={{ color: "white",fontSize:"1.1rem" }}
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
              style={{backgroundColor:"transparent"}}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <button
              onClick={handleSubmit}
              id="slide-button"
              style={{backgroundColor:"transparent",border:"2px solid white",borderRadius:"10px",color:"white",fontWeight:"bold",fontSize:"1.2rem",padding:"0.5rem 1rem",cursor:"pointer"}}
            >
              Login
            </button>

            <p
              className="cursor-pointer font-bold text-lg text-white hover:text-xl"
              onClick={() => router.push("/forgpassword")}
            >
              Forgot Password?
            </p>
            <p
              className="cursor-pointer font-bold text-lg text-white hover:text-xl"
              onClick={() => router.push("/password-change")}
            >
              Change Password?
            </p>
            <p
              className="cursor-pointer inline-block align-baseline font-bold text-lg text-white hover:text-xl"
              onClick={() => router.push("/")}
            >
              Back to Home
            </p>
          </div>
        </form>
      </div>
      <div
            className="mx-auto mt-4 p-4 rounded-lg bg-transparent dark:bg-gray-800"
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
    </>
  );
};

export default LoginPage;

// import React, { useEffect, useState } from "react";
// import Toast from "@/components/Toast";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import "../styles/Home.module.css";

// const LoginPage = ({ initialTodos }) => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const mpp = new Map([
//     [initialTodos[0].email, 1],
//     [initialTodos[0].password, 1],
//   ]);
//   const [foundUser, setFoundUser] = useState(initialTodos[0]._id);
//   console.log(initialTodos[0]._id);
//   const [color, setColor] = useState("");
//   const [showToast, setShowToast] = useState(false);
//   const [message, setMessage] = useState("");
//   const router = useRouter();

//   const toast = async () => {
//     setShowToast(true);
//     setTimeout(() => {
//       setShowToast(false);
//     }, 3000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("clicked");
//     console.log(formData);
//     console.log(mpp.get(formData.email));

//     if (mpp.get(formData.email) === 1 && mpp.get(formData.password) === 1) {
//       document.cookie = `id=${initialTodos[0]._id}; max-age=3600; path=/; SameSite=None; Secure`;
//       router.push("/home");
//     } else {
//       setMessage("Password or email is incorrect !");
//       setColor("red");
//       toast();
//     }
//     console.log("executed");
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <>
//       <div className="container mx-auto h-screen flex justify-center items-center bg-teal-950">
//         <div className="w-[70vw] h-[80vh] flex">
//           <div className="bg-white shadow-4xl rounded px-8 pt-6 pb-8 mb-4  border-2 rounded-3xl  w-[30vw] h-[80vh]">
//             <h1 className="text-2xl font-bold mb-8 text-center">LOGIN</h1>
//             <form onSubmit={handleSubmit}>
//               {/* ... rest of your form code */}
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
//               <div
//                 className="mx-auto mt-4 p-4 rounded-lg bg-white dark:bg-gray-800"
//                 style={{ maxWidth: "60vw" }}
//               >
//                 {showToast && (
//                   <Toast
//                     message={message}
//                     bgColor={color}
//                     onClose={() => setShowToast(false)}
//                   />
//                 )}
//               </div>
//             </form>
//             {/* <div> */}

//             {/* </div> */}
//             {/* </form> */}
//           </div>
//           <div className="w-[40vw] h-[70vh]">
//               <img
//                 src="https://i.ibb.co/FBYscr3/profile.jpg"
//                 style={{
//                   maxWidth: "100%",
//                   height: "79.8vh",
//                   borderRadius: "20px",
//                 }}
//                 alt="profile"
//                 border="0"
//               />
//             </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export async function getServerSideProps() {
//   // Fetch the initial todos from the backend
//   try {
//     const response = await fetch(
//       "https://gp-backend-u5ty.onrender.com/api/ownerData/"
//     );
//     // console.log(response)
//     if (response.ok) {
//       const initialTodos = await response.json();
//       // console.log(initialTodos)
//       return {
//         props: { initialTodos },
//       };
//     }
//   } catch (error) {
//     console.error("Error fetching initial todos:", error);
//   }

//   // If there's an error, return an empty initialTodos array
//   return {
//     props: { initialTodos: [] },
//   };
// }

// export default LoginPage;
