import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom'; // ← Added useLocation
import Logo from '@/assets/logo/logo.png';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

// --- ChevronDown Component ---
const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5 ml-1"
  >
    <path
      fillRule="evenodd"
      d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

// --- Mobile NavLink Component ---
const MobileNavItem = ({ title, to, dropdownLinks = [], onClick }) => {
  const hasDropdown = dropdownLinks.length > 0;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e) => {
    if (hasDropdown) {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else {
      onClick();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="flex items-center w-full text-left text-gray-700 font-medium hover:text-indigo-600 transition-colors px-4 py-2 rounded-lg"
      >
        {title}
        {hasDropdown && <ChevronDown />}
      </button>

      {/* Mobile Dropdown */}
      {hasDropdown && isOpen && (
        <div className="mt-1 bg-gray-50 rounded-lg overflow-hidden">
          {dropdownLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}                 // ← Now includes #hash
              onClick={onClick}
              className="block px-6 py-2 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Main Navbar Component ---
const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const location = useLocation(); // ← Added

  // Scroll hide/show logic (unchanged)
  useEffect(() => {
    const HIDE_THRESHOLD = 600;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 50) {
        setIsVisible(true);
      } else if (currentScrollY <= HIDE_THRESHOLD) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ← NEW: Smooth scroll to hash when route has #id
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const closeOffcanvas = () => setIsOffcanvasOpen(false);

  // ← ONLY THIS PART CHANGED: dropdownLinks now have #hash
  const navItems = [
    { title: 'Home', to: '/' },
    { title: 'About', to: '/about' },
    {
      title: 'Services',
      to: '/services',
      dropdownLinks: [
        { to: '/services#ai-advantage', label: 'AI Advantage' },
        { to: '/services#industries',   label: 'Industries We Serve' },
        // Add more if you want
      ],
    },
    { title: 'Blog', to: '/blog' },
    { title: 'Contact', to: '/contact' },
  ];

  return (
    <>
      {/* Navbar - exactly your original */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-500 ease-in-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <div className="mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={Logo} alt="Company Logo" className="h-8 sm:h-10" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <div key={item.title} className="relative group pb-2">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `relative flex items-center text-gray-700 font-medium hover:text-indigo-600 transition-colors px-4 py-2 rounded-lg ${
                      isActive ? 'text-indigo-600 font-semibold' : ''
                    }`
                  }
                >
                  <span className="absolute inset-0 bg-gray-100 rounded-lg transform scale-0 origin-center transition-transform duration-300 ease-out group-hover:scale-100 -z-10"></span>
                  {item.title}
                  {item.dropdownLinks && <ChevronDown />}
                </NavLink>

                {/* Desktop Dropdown */}
                {item.dropdownLinks && (
                  <div className="absolute top-full left-0 z-10 mt-2 w-56 border-t-2 border-indigo-500 bg-white rounded-lg shadow-xl overflow-hidden opacity-0 invisible transform scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all duration-200 ease-in-out">
                    {item.dropdownLinks.map((link) => (
                      <Link
                        key={link.label}
                        to={link.to}   // ← Now includes #hash
                        className="block px-5 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Brochure Button */}
            <Link
              to="/brochure"
              className="wave-btn bg-[#ffc804] hover:bg-[#deb006] text-white font-semibold py-2 px-4 rounded-full transition-colors ml-6"
            >
              Brochure
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOffcanvasOpen(true)}
            className="md:hidden text-gray-700 hover:text-indigo-600 text-2xl"
          >
            <HiOutlineMenuAlt3 />
          </button>
        </div>
      </nav>

      {/* Mobile Offcanvas - exactly your original */}
      <AnimatePresence>
        {isOffcanvasOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeOffcanvas}
              className="fixed inset-0 bg-black/60 z-50 md:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-72 bg-white shadow-2xl z-50 md:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b">
                <Link to="/" onClick={closeOffcanvas}>
                  <img src={Logo} alt="Logo" className="h-8" />
                </Link>
                <button
                  onClick={closeOffcanvas}
                  className="text-gray-600 hover:text-indigo-600 text-2xl"
                >
                  <FiX />
                </button>
              </div>

              <div className="p-4 space-y-1">
                {navItems.map((item) => (
                  <MobileNavItem
                    key={item.title}
                    title={item.title}
                    to={item.to}
                    dropdownLinks={item.dropdownLinks || []}
                    onClick={closeOffcanvas}
                  />
                ))}

                <div className="pt-4 px-4">
                  <Link
                    to="/brochure"
                    onClick={closeOffcanvas}
                    className="block w-full text-center bg-[#ffc804] hover:bg-[#deb006] text-white font-semibold py-3 px-7 rounded-lg transition-colors"
                  >
                    Brochure
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;