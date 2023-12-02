import Head from "next/head";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();


  const goToLogIn = () => {
    router.push("/login");
  };



  return (
    <div className="min-h-screen flex flex-col items-center font-Damion-cursive justify-center bg-gradient-to-r from-white-500 via-blue-600 to-blue-700 text-white">
      <Head>
        <title>Home</title>
      </Head>
      <div className="text-center">
        <h1 className="text-[50px]  text-black font-extrabold mb-6">Welcome to Your App</h1>
        <div className="space-y-4 text-[60px]">
          <button onClick={goToLogIn} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-Damion-cursive text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Log In
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;