import Lottie from "lottie-react";
import welcomeAni from '../assets/animation/HomeAni.json';
import Navbar from '../Components/Navbar';
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const Home = () => {
  const user =useSelector((state) => state.auth.value)


  if (!user) {
    return <Navigate to="/login" replace />;
  }


  const handleLogout = () => {
    alert('Logged out!');
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />

      {/* Main Section */}
      <main className="min-h-[calc(100vh-0px)] flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-[#f0fff4] via-[#e6ffe6] to-[#c6f6d5] px-4 sm:px-8 md:px-12 lg:px-16 py-12 max-w-7xl mx-auto">
        {/* Left: Text and button */}
        <div className="w-full md:w-1/2 max-w-md text-center md:text-left">
          <h2 className="text-3xl font-semibold text-[#5b8506] mb-4">Welcome to Home</h2>
          <p className="text-gray-700 mb-6 max-w-md">
            You are now logged in. Explore your secure dashboard or use the Logout button to exit.
          </p>
          <button
            onClick={handleLogout}
            className="bg-[#5b8506] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#487004] transition"
          >
            Logout
          </button>
        </div>

        {/* Right: Lottie Animation */}
        <div className="w-full md:w-1/2 max-w-md mt-8 md:mt-0">
          <Lottie animationData={welcomeAni} loop={true} />
        </div>
      </main>
    </>
  );
};

export default Home;
