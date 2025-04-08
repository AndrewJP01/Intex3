import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-transparent absolute w-full z-10">
      <h1 className="text-blue-600 text-5xl font-bold">CINENICHE</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Sign In
      </button>
    </nav>
  );
};

export default Navbar;