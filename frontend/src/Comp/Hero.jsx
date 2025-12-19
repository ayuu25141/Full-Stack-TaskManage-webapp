
import heroimage from  '../assets/heroimage.jpg';
import { useNavigate } from 'react-router-dom';
function Hero() {
    const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/Dashboard');
  };
  return (
    <div className="bg-dark text-white py-16">
      <div className="container mx-auto px-4">
        {/* 50/50 Layout */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Side: Text Content */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Your Tasks, Everywhere, <span className='text-blue-600'> Secure</span>
            </h1>
                  <h3 className=" text-white">
          <span className='text-blue-600 text-2xl'>Fluenta</span> – A Smart To-Do List for Deep Work
            </h3>
            <p className="text-sm text-gray-300">
              Finally, a To-Do App That Doesn’t Just Organize Your Tasks — It Helps You Stay Focused, Motivated, and In Control of Your Day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button  onClick = {goToDashboard}className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Getting Started
              </button>
              <button className="px-6 py-3 border border-gray-500 text-white rounded-lg hover:bg-gray-800 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side: Image Card */}
          <div className="md:w-1/2">
            <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden ">
              {/* Replace with your image URL or import */}
              <img
                src={heroimage}
                alt="Task Management"
                className="w- h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
