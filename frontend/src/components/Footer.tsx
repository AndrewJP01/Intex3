import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-400 text-sm py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center px-4">
        <div className="flex justify-between w-full max-w-4xl text-center md:text-left gap-32">
          <div className="text-center">
            <h4 className="text-white font-semibold mb-2">Explore</h4>
            <ul>
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Movies</a></li>
              <li><a href="#" className="hover:underline">Genres</a></li>
            </ul>
          </div>
          <div className="text-center">
            <h4 className="text-white font-semibold mb-2">Company</h4>
            <ul>
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="text-center">
            <h4 className="text-white font-semibold mb-2">Support</h4>
            <ul>
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} CINENICHE. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
