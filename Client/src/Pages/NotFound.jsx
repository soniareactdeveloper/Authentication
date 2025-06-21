import Lottie from "lottie-react";
import foundNotAni from '../assets/animation/Animation - 1750500613686.json';

const NotFound = () => {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-white px-4 text-center">
      <div className="w-full max-w-md h-[300px] sm:h-[400px] mb-4">
        <Lottie animationData={foundNotAni} loop={true} />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-[#5b8506] mb-2">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 text-base sm:text-lg">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
    </section>
  );
};

export default NotFound;
