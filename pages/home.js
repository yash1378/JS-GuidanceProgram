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
