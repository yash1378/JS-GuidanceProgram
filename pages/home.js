import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Homesidebar from "../components/homesidebar";
import styles from "../styles/Home.module.css";
import { FaBars } from "react-icons/fa";
import { useRouter } from "next/router";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  // The text to simulate typing
  const typingText = "Hi Pratham, Here you can access the Designated Page";

  // State to manage the displayed text
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // Simulate typing animation
    if (textIndex < typingText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(typingText.slice(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      }, 100); // Adjust the typing speed as needed

      return () => clearTimeout(timer);
    }
  }, [textIndex, typingText]);

  // const toggleSidebar = () => {
  //   const sidebar = document.getElementById("drawer-navigation");
  //   sidebar.classList.toggle("-translate-x-full");
  //   setIsSidebarOpen(!isSidebarOpen);

  // };

  // const closeSidebar = () => {
  //   const sidebar = document.getElementById("drawer-navigation");
  //   sidebar.classList.add("-translate-x-full");
  // };

  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard for Pratham" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`font-Damion-cursive ${styles.main}`}>
        <h1 className={styles.title}>
          <b>{displayedText}</b>
        </h1>

        <div className={styles.buttonContainer}>
          {/* <Link href="/mentavail"> */}
            <button className={styles.button} onClick={()=>router.push("/mentavail")}>Mentor Availability Update</button>
          {/* </Link> */}
          {/* <Link href="/mentdashboard"> */}
            <button className={styles.button} onClick={()=>router.push("/mentdashboard")}>Mentor Dashboard</button>
          {/* </Link> */}
          {/* <Link href="/mregis"> */}
            <button className={styles.button} onClick={()=>router.push("/mregis")}>Mentor Data Input</button>
          {/* </Link> */}
          {/* <Link href="/registration"> */}
            <button className={styles.button} onClick={()=>router.push("/registration")}>Student Checkin</button>
          {/* </Link> */}
          {/* <Link href="/stdashboard"> */}
            <button className={styles.button} onClick={()=>router.push("/stdashboard")}>Student Dashboard</button>
          {/* </Link> */}
          {/* <Link href="/pending"> */}
            <button className={styles.button} onClick={()=>router.push("/pending")}>Student Assigning</button>
          {/* </Link> */}
        </div>
      </main>
      {/* Footer content */}
      <footer className={styles.footer}>
        <p>&copy; 2023 JEE Simplified. All rights reserved.</p>
        <p>Terms of Service | Privacy Policy</p>
      </footer>
    </div>
  );
}



export default Home;
