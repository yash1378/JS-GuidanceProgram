import '@/styles/globals.css';
import '@/styles/Home.module.css';
import Head from 'next/head';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {


  return (
    <>
      <Head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.css"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></script>
    </>
  );
}
