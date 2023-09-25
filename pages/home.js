import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
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
