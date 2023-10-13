import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Homesidebar from "../components/homesidebar";
import styles from "../styles/Home.module.css";
import { FaBars } from "react-icons/fa";

function Home({ data }) {
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const usernameCookie = Cookies.get("id");
    let isMatch = data.filter((it) => usernameCookie === it._id);
    setIsAuthorized(isMatch);
    if (isMatch.length === 0) {
      setIsAuthorized(false);
    }
  }, [data]);

  const toggleSidebar = () => {
    const sidebar = document.getElementById("drawer-navigation");
    sidebar.classList.toggle("-translate-x-full");
    setIsSidebarOpen(!isSidebarOpen);

  };

  const closeSidebar = () => {
    const sidebar = document.getElementById("drawer-navigation");
    sidebar.classList.add("-translate-x-full");
  };

  if (!isAuthorized) {
    return (
      <div className={styles.accessDenied}>
        <Head>
          <title>Access Denied</title>
        </Head>
        <div className={styles.accessDeniedContent}>
          <h1 className={styles.accessDeniedTitle}>
            You're not allowed to access this page
          </h1>
          <p className={styles.accessDeniedMessage}>
            Please contact the administrator for assistance.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard for Pratham" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isSidebarOpen && (
        <div
          className=" fixed top-0 left-0 z-30 w-full h-full bg-black opacity-70 transition-opacity duration-300 ease-in-out"
          onClick={() => {setIsSidebarOpen(false);toggleSidebar();}} // Close the sidebar when overlay is clicked
        ></div>
      )}
      <div
        className="w-20  bg-zinc-800 z-100000 absolute left-0 top-0"
        style={{ height: "100%" }}
      >
        <FaBars
          style={{
            color: "white",
            height: "45px",
            width: "45px",
            position: "absolute",
            left: "13px",
            top: "13px",
            cursor: "pointer",
          }}
          onClick={toggleSidebar}
        />
      </div>






      {/* Sliding sidebar */}
      <div
        id="drawer-navigation"
        className="absolute top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800"
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Menu
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={()=>{closeSidebar();setIsSidebarOpen(false);}}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/delete"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ml-3">Refund Student</span>

              </a>
            </li>
            <li>
              <a
                href="/renroll"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ml-3">Re-Enroll Student</span>

              </a>
            </li>
            <li>
              <a
                href="/edit"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ml-3">Edit Student Data</span>

              </a>
            </li>
            {/* Add more menu items here */}
          </ul>
        </div>
      </div>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <b>Hi Pratham, Here you can access the Designated Page</b>
        </h1>

        <div className={styles.buttonContainer}>
          <Link href="/mentavail">
            <div className={styles.button}>Mentor Availability Update</div>
          </Link>
          <Link href="/mentdashboard">
            <div className={styles.button}>Mentor Dashboard</div>
          </Link>
          <Link href="/mregis">
            <div className={styles.button}>Mentor Data Input</div>
          </Link>
          <Link href="/registration">
            <div className={styles.button}>Student Checkin</div>
          </Link>
          <Link href="/stdashboard">
            <div className={styles.button}>Student Dashboard</div>
          </Link>
          <Link href="/pending">
            <div className={styles.button}>Student Assigning</div>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Footer content here</p>
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    // Fetch data from your backend API on the server side
    const response = await fetch(
      "https://gp-backend-u5ty.onrender.com/api/ownerData/"
    );
    const data = await response.json();

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: [],
      },
    };
  }
}

export default Home;
