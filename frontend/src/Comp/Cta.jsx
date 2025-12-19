import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cta = () => {
    const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/Dashboard');
  };
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Transform Your Productivity?
        </h2>
        <p className="text-lg text-blue-100 mb-8">
          Join thousands of satisfied users and start achieving your goals faster than ever before.
        </p>
        <button onClick={goToDashboard} className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
          Get Started for Free
        </button>
      </div>
    </section>
  );
};

export default Cta;
