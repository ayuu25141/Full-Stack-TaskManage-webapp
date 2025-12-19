import React from 'react';
import { useNavigate } from 'react-router-dom';

import dash from '../assets/dash.png'
function GetStartedSection() {
      const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/Dashboard');
  };
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Boost Your Productivity?
        </h2>
        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already achieving more with our platform. Get started today and transform the way you work.
        </p>

        {/* Sign-Up Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Get Started Now
          </h3>
          <form className="space-y-4 ">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <button onClick={goToDashboard}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
              >
                Sign Up Free
              </button>
            </div>
          </form>
          <p className="text-gray-500 text-sm mt-4">
            No credit card required. Cancel anytime.
          </p>
        </div>

        {/* Visual Element */}
        <div className="mt-12">
          <img
            src={dash}
            alt="Productivity Dashboard"
            className="rounded-xl shadow-xl mx-auto max-w-3xl w-full"
          />
        </div>
      </div>
      
    </section>
  );
}

export default GetStartedSection;
