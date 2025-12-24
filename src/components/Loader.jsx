import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-900">
      {/* Spinning Rings */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-t-green-400 border-b-green-400 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-4 border-t-white border-b-white border-l-transparent border-r-transparent rounded-full animate-spin delay-200"></div>
        <div className="absolute inset-0 border-4 border-t-blue-400 border-b-blue-400 border-l-transparent border-r-transparent rounded-full animate-spin delay-400"></div>
      </div>

      {/* Loading Text */}
      <h1 className="mt-8 text-2xl sm:text-3xl text-white font-bold tracking-wider">
        Loading...
      </h1>
      <p className="mt-2 text-gray-400 text-sm">Please wait a moment</p>
    </div>
  );
};

export default Loader;
