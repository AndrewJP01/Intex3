import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-400 text-sm py-6 px-4 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h4 className="text-white font-semibold mb-2">CineNiche</h4>
          <p>Your gateway to rare, independent, and global cinema.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Explore</h4>
          <ul>
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Movies</a></li>
            <li><a href="#" className="hover:underline">Genres</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Company</h4>
          <ul>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Support</h4>
          <ul>
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} CineNiche. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
