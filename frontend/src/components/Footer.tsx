import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-400 text-sm py-6 px-4">
      <div className="flex justify-center items-center mt-6 border-t border-gray-700 pt-4 space-x-4">
        <div>© {new Date().getFullYear()} CINENICHE. All rights reserved.</div>
        <Link
          to="/PrivacyPage"
          className="text-[#00b0ff] hover:text-white transition-colors duration-200"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
