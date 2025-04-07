import React from 'react';

const HeroBanner: React.FC = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-[url('/your-image.jpg')] bg-cover bg-center relative text-white text-center">
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Unlimited indie films, documentaries, and more.
        </h1>
        <p className="text-xl mb-6">Watch anywhere. Cancel anytime.</p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <input
            type="email"
            placeholder="Email address"
            className="p-3 rounded w-72 text-black"
          />
          <button className="bg-red-600 px-6 py-3 text-white rounded hover:bg-red-700">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;