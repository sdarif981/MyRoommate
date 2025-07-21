import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    icon: <FaFacebook size={20} />,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: <FaTwitter size={20} />,
    href: "https://twitter.com",
    label: "Twitter",
  },
  {
    icon: <FaInstagram size={20} />,
    href: "https://instagram.com",
    label: "Instagram",
  },
];

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Branding */}
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300"
              aria-label="MyRoommate Home"
            >
              MyRoommate
            </Link>
            <p className="mt-1 text-xs text-gray-400">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            {navLinks.map(({ path, label }) => (
              <Link
                key={label}
                to={path}
                className="text-gray-300 hover:text-blue-400 text-sm font-medium transition-colors duration-300"
                aria-label={label}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
