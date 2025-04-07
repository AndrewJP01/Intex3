import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-transparent absolute w-full z-10">
      <h1 className="text-red-600 text-3xl font-bold">CineNiche</h1>
      <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        Sign In
      </button>
    </nav>
  );
};

export default Navbar;