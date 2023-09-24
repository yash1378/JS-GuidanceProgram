import '@/styles/globals.css';
import Head from 'next/head';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  const toggleSidebar = () => {
    const sidebar = document.getElementById("drawer-navigation");
    const backgroundOverlay = document.getElementById("background-overlay");

    if (sidebar && backgroundOverlay) {
      sidebar.classList.toggle("-translate-x-full");
      backgroundOverlay.classList.toggle("hidden");
    }
  };

  const closeSidebar = () => {
    const sidebar = document.getElementById("drawer-navigation");
    const backgroundOverlay = document.getElementById("background-overlay");
  
    if (sidebar && backgroundOverlay) {
      sidebar.classList.add("-translate-x-full");
      backgroundOverlay.classList.add("hidden");
    }
  };

  useEffect(() => {
    const showSidebarButton = document.getElementById("showSidebarButton");
    if (showSidebarButton) {
      showSidebarButton.addEventListener("click", toggleSidebar);
    }

    const closeSidebarButton = document.getElementById("closeSidebarButton");
    if (closeSidebarButton) {
      closeSidebarButton.addEventListener("click", closeSidebar);
    }

    return () => {
      if (showSidebarButton) {
        showSidebarButton.removeEventListener("click", toggleSidebar);
      }
      if (closeSidebarButton) {
        closeSidebarButton.removeEventListener("click", closeSidebar);
      }
    };
  }, []);

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
