import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/movie-collage.jpg';

interface HeroBannerProps {
  email: string;
  setEmail: (email: string) => void;
  onGetStarted: () => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ email, setEmail }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (email.trim()) {
      navigate(`/create-account?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <section
      className="h-screen w-full relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 h-full">
        <h1 className="text-5xl md:text-7xl font-black leading-tight max-w-5xl mb-6 drop-shadow-xl">
          The best of cinema — beyond the blockbusters
        </h1>
        <p className="text-2xl md:text-4xl text-white font-semibold mb-8 max-w-3xl drop-shadow-xl">
          Discover timeless classics, global gems, and unforgettable stories.
        </p>
        <p className="text-lg md:text-xl text-gray-400 mb-6 drop-shadow-xl">
          Enter your email to start or restart your membership.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-md w-80 text-white shadow focus:outline-none"
          />
          <button
            onClick={handleGetStarted}
            className="bg-[#00b0ff] hover:bg-[#0091d5] transition text-white px-6 py-3 rounded-md font-medium"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
