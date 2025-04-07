import React from 'react';
import background from '../assets/movie-collage.jpg';

const HeroBanner: React.FC = () => {
  return (
    <section
      className="h-screen w-full relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 h-full">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl mb-6 drop-shadow-md">
          The best of cinema — beyond the blockbusters
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-xl">
          Discover timeless classics, global gems, and unforgettable stories.
        </p>
        <p className="text-sm md:text-base text-gray-400 mb-6">
          Enter your email to start or restart your membership.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Email address"
            className="p-3 rounded-md w-80 text-black shadow focus:outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-md font-medium">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;