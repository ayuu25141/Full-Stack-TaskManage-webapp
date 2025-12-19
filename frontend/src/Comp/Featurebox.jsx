import React from 'react';
import lfa from '../assets/lfa.png';
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.png';
import encry from '../assets/encry.png';
import logo3 from '../assets/logo3.png';
import noti from '../assets/noti.png';
import logo4 from '../assets/logo4.png';
import collab from '../assets/collab.png';
import logo5 from '../assets/logo5.png';
import offline from '../assets/offline.png';
// Array of feature data
const features = [
  {
    id: 1,
    logo: logo1,
    title: "Lightning Fast Access",
    description: "Experience instant task creation with zero loading time. Our optimized engine processes your thoughts faster than you can think them. Quick shortcuts, voice commands, and one-tap actions keep you in the flow. Speed is productivity - every millisecond saved adds up to hours of extra achievement.",
    image: lfa,
  },
 
  {
    id: 2,
    logo: logo2,
    title: "Military-Grade Privacy",
    description: "Your thoughts deserve bank-level security. End-to-end encryption ensures your tasks remain completely private, even from us. Advanced privacy controls let you decide exactly what to share and with whom. Your productivity secrets stay secret - because trust is the foundation of great work.",
    image: encry,
  },
    {
    id: 3,
    logo: logo3,
    title: "Smart Notification Engine",
    description: "Intelligent reminders that learn your rhythm and adapt to your schedule. Never miss important deadlines while avoiding notification overload. Customizable timing, priority-based alerts, and contextual reminders that actually help instead of interrupt. Stay on track without losing focus.",
    image: noti,
  },
  ,
    {
    id: 4,
    logo: logo4,
    title: "Effortless Collaboration",
    description: "Invite team members, assign tasks, and multiply your impact through seamless collaboration. Real-time updates, comment threads, and progress tracking keep everyone aligned. Great teams use great tools - transform individual productivity into collective success.",
    image: collab,
  },
  ,
    {
    id: 5,
    logo: logo5,
    title: "Unstoppable Offline Mode",
    description: "Productivity never stops, even when the internet does. Full functionality offline with seamless sync when you reconnect. Work on flights, in remote locations, or during network outages without missing a beat. Your momentum stays unbroken - connectivity optional, results guaranteed.",
    image: offline,
  },
];

function Featurebox() {
  return (
       <div className="px-4 py-8 md:px-6 lg:px-8">
      {/* Map over the features array */}
      {features.map((feature) => (
        <div key={feature.id} className="bg-[#E9F1FF] rounded-xl shadow-md p-6 mx-auto max-w-4xl mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Left Side: Logo + Text Content (60%) */}
            <div className="md:w-3/5 space-y-4">
              {/* Logo */}
              <div className="mb-2">
                <img
                  src={feature.logo}
                  alt="Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
              {/* Headline */}
              <h2 className="text-2xl font-bold text-gray-800">
                {feature.title}
              </h2>
              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Right Side: Image Section (40%) */}
            <div className="md:w-2/5 flex justify-center">
              <div className="bg-white rounded-lg shadow-sm w-full max-w-xs h-64 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Featurebox;