import React from 'react';
import lrft from '../assets/lrft.png';
import right from '../assets/right.jpg';

const ProgressSection = () => {
  return (
    <div className="bg-dark text-white py-16">
      <div className="container mx-auto px-4">
        {/* 50/50 Split Layout */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Side: Image Card */}
          <div className="md:w-1/2">
            <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden w-full max-w-md h-80">
              <img
                src={lrft}
                alt="Task Management"
                className="w-full h-50% object-cover"
              />
            </div>
          </div>

          {/* Right Side: Image Card */}
          <div className="md:w-1/2">
            <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden w-full max-w-md ">
              <img
                src={right}
                alt="Task Management"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
