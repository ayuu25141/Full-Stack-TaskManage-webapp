import React from 'react';

function FeatureHeadline() {
  return (
    <div className="flex flex-col items-center justify-center text-white py-12 px-4">
      {/* Main Headline */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
        Unleash Your Productivity
      </h1>

      {/* Subheadline */}
      <h3 className="text-xl md:text-2xl text-gray-400 text-center max-w-2xl">
        Every feature designed to transform your chaos into conquest.
      </h3>
    </div>
  );
}

export default FeatureHeadline;
