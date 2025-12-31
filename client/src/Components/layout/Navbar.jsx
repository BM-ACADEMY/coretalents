import React, { useState, useEffect } from 'react';
import { FiX, FiUser, FiLogIn, FiUserPlus, FiLogOut, FiLayout } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { ChevronDown as ChevronDownIcon } from "lucide-react";
import { useAuth } from "@/Context/Authcontext"; // Import Auth Context

import Logo from '@/assets/logo/logo.png';

// ==========================================
// 1. HELPER COMPONENTS
// ==========================================

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

      {hasDropdown && isOpen && (
        <div className="mt-1 bg-gray-50 rounded-lg overflow-hidden ml-4 border-l-2 border-gray-200">
          {dropdownLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={onClick}
              className="block px-4 py-2 text-sm text-gray-600 hover:text-indigo-600"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 2. MAIN NAVBAR COMPONENT
// ==========================================

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get Auth State
  const { user, logout } = useAuth();

  // Determine Dashboard Path based on Role
  const dashboardPath = user?.role === 'admin' ? '/admin' : '/user/dashboard';

  // Handle Logout
  const handleLogout = async () => {
    await logout();
    closeOffcanvas();
    navigate('/');
  };

  // Scroll hide/show logic
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

  // Smooth scroll
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

  const navItems = [
    { title: 'Home', to: '/' },
    { title: 'About', to: '/about' },
    {
      title: 'Services',
      to: '/services',
      dropdownLinks: [
        { to: '/services#ai-advantage', label: 'AI Advantage' },
        { to: '/services#industries',   label: 'Industries We Serve' },
      ],
    },
    { title: 'Blog', to: '/blog' },
    { title: 'Contact', to: '/contact' },
  ];

  return (
    <>
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
              <div key={item.title} className="relative group pb-2 pt-2">
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

                {/* Desktop Dropdown for Links */}
                {item.dropdownLinks && (
                  <div className="absolute top-full left-0 z-10 mt-0 w-56 border-t-2 border-indigo-500 bg-white rounded-b-lg shadow-xl overflow-hidden opacity-0 invisible transform scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all duration-200 ease-in-out">
                    {item.dropdownLinks.map((link) => (
                      <Link
                        key={link.label}
                        to={link.to}
                        className="block px-5 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 border-b border-gray-100 last:border-0"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* ======================================= */}
            {/* LOGIN / PROFILE DROPDOWN (DYNAMIC)      */}
            {/* ======================================= */}
            <div className="relative group pb-2 pt-2 ml-4">
              <button className={`flex items-center gap-2 font-medium transition-colors px-3 py-2 rounded-full border ${user ? 'border-indigo-200 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600'}`}>
                <FiUser className="w-5 h-5" />
                {/* Show Name if logged in, else "Account" */}
                <span className="max-w-[100px] truncate">{user ? user.name : "Account"}</span>
                <ChevronDown />
              </button>

              <div className="absolute right-0 top-full z-10 mt-0 w-48 border-t-2 border-[#615fff] bg-white rounded-b-lg shadow-xl overflow-hidden opacity-0 invisible transform scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all duration-200 ease-in-out">
                {user ? (
                  // LOGGED IN MENU
                  <>
                     <div className="px-5 py-3 text-xs text-gray-400 uppercase font-semibold border-b border-gray-100">
                      Signed in as <br/> <span className="text-gray-700 normal-case">{user.email}</span>
                    </div>
                    <Link
                      to={dashboardPath}
                      className="flex items-center gap-2 px-5 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-[#4f39f6] transition-colors border-b border-gray-100"
                    >
                      <FiLayout className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  // GUEST MENU
                  <>
                    <Link
                      to="/login"
                      className="flex items-center gap-2 px-5 py-3 text-sm text-gray-700 hover:bg-[#f3f4f6] hover:text-[#4f39f6] transition-colors border-b border-gray-100"
                    >
                      <FiLogIn className="w-4 h-4" />
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
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

      {/* Mobile Offcanvas */}
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
              className="fixed right-0 top-0 h-full w-72 bg-white shadow-2xl z-50 md:hidden flex flex-col"
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

              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {navItems.map((item) => (
                  <MobileNavItem
                    key={item.title}
                    title={item.title}
                    to={item.to}
                    dropdownLinks={item.dropdownLinks || []}
                    onClick={closeOffcanvas}
                  />
                ))}

                {/* Mobile Login / User Links */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Account
                  </p>
                  
                  {user ? (
                    // MOBILE LOGGED IN
                    <>
                      <div className="px-4 mb-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>

                      <Link
                        to={dashboardPath}
                        onClick={closeOffcanvas}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
                      >
                        <FiLayout className="w-5 h-5" />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiLogOut className="w-5 h-5" />
                        Logout
                      </button>
                    </>
                  ) : (
                    // MOBILE GUEST
                    <>
                      <Link
                        to="/login"
                        onClick={closeOffcanvas}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
                      >
                        <FiLogIn className="w-5 h-5" />
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={closeOffcanvas}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
                      >
                        <FiUserPlus className="w-5 h-5" />
                        Create Account
                      </Link>
                    </>
                  )}
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