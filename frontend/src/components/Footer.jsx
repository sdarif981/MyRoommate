import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left Section - Branding & Copyright */}
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300"
            >
              MyRoommate
            </Link>
            <p className="mt-1 text-xs text-gray-400">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Middle Section - Navigation Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <Link
              to="/"
              className="text-gray-300 hover:text-blue-400 text-sm font-medium transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-blue-400 text-sm font-medium transition-colors duration-300"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 hover:text-blue-400 text-sm font-medium transition-colors duration-300"
            >
              Contact
            </Link>
          </div>

          {/* Right Section - Social Media */}
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;