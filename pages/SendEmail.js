import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const SendEmailPage = () => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://gp-backend-u5ty.onrender.com/send-password-reset-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful email sending, e.g., show a success message or redirect to another page
        console.log('Email sent successfully');
        router.push('/login'); // Redirect to the login page or another appropriate page
      } else {
        // Handle email sending errors, e.g., display an error message
        console.error('Email sending failed');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <>


      <div className={styles.container1}></div>

      <div className={styles.container2}>
        <div className={styles.image}>
          <img src="/pics/icons8-user-96.png" alt="" />
        </div>

        <h1 className={styles['form-heading']}>SEND EMAIL</h1>
        <br />
        <br />
        <form >
          <div className={styles['form-group'] + ' ' + styles.inline}>
            <label htmlFor="email">
              <i
                className="fa-solid fa-user"
                style={{ color: '#ffffff' }}
              ></i>
              &nbsp;&nbsp;&nbsp;
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <br />
          <br />
          <button onClick={handleSubmit} id={styles['slide-button']}>
            SEND
          </button>
        </form>
      </div>
      {/* <script src="../script.js"></script> */}
    </>
  );
};

export default SendEmailPage;
