import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie"; 
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

 function Home({data}) {
  const [isAuthorized, setIsAuthorized] = useState(true);
  let final =data;



  useEffect(() => {
    const usernameCookie = Cookies.get("id"); // Get the 'username' cookie value
    // let isMatch ;
    // console.log(isMatch);
    let isMatch = data.filter((it)=>usernameCookie === it._id);
    setIsAuthorized(isMatch);
    if(isMatch.length === 0){
      setIsAuthorized(false);
    }

  }, [final]);

  if (!isAuthorized) {
    // If the username in the cookie doesn't match the mentor name, you can redirect the user
    // router.push(`/${ment}`); // Replace "/unauthorized" with the appropriate URL for unauthorized access
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>Access Denied</title>
      </Head>
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">
          You're not allowed to access this page
        </h1>
        <p className="text-lg text-gray-600">
          Please contact the administrator for assistance.
        </p>
      </div>
    </div>
    ) // Return null to prevent rendering this component
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
          <Link href="/delete">
            <div className={styles.button}>Delete Student Data</div>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Footer content here</p>
      </footer>
    </div>
  );
}

export default Home;


export async function getServerSideProps(context){
  try{
  const response = await fetch("https://gp-backend-u5ty.onrender.com/api/ownerData/");
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