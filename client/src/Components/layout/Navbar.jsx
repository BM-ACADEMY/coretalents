import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
// Imports specifically for the Modal
import { ChevronDown as ChevronDownIcon, X, Download } from "lucide-react";
import toast from "react-hot-toast";

// ASSETS
import Logo from '@/assets/logo/logo.png';
import BrochurePDF from "@/assets/ct.pdf"; // Make sure this path is correct in your project

// ==========================================
// 1. BROCHURE MODAL COMPONENT (From Code 1)
// ==========================================
const BrochureModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email";
    if (!purpose.trim()) newErrors.purpose = "Purpose is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const form = new FormData();
      form.append("name", name);
      form.append("email", email);
      form.append("purpose", purpose);

      // Submit to Google Sheets
      await fetch(
        "https://script.google.com/macros/s/AKfycbzvjtdmWY4p8qhftceu2NtrsnaN2BZK9SjMwUC9jTs_Zs9txVfqn2qcFtK7cV6YksTSvw/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: form,
        }
      );

      // Submit to backend for email
      const emailResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/email/send-brochure`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, purpose }),
      });

      if (!emailResponse.ok) {
        throw new Error("Email submission failed");
      }

      toast.success("Form submitted! Brochure downloading...");
      
      // Trigger Download
      const link = document.createElement("a");
      link.href = BrochurePDF;
      link.download = "coretalents_companyprofile_Brochure.pdf";
      link.click();

    } catch (err) {
      toast.error("Something went wrong. Try again later.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
      onClose();
      setName("");
      setEmail("");
      setPurpose("");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 sm:p-8"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            onClick={onClose}
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            Download Brochure
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0b104] ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0b104] ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Purpose */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Purpose for downloading</label>
              <textarea
                rows={3}
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0b104] ${
                  errors.purpose ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.purpose && <p className="mt-1 text-xs text-red-600">{errors.purpose}</p>}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-white bg-[#f0b104] rounded-md hover:bg-[#d89a03] transition disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : <><Download className="w-5 h-5" /> Download</>}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition disabled:opacity-70"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ==========================================
// 2. HELPER COMPONENTS (Chevron & Mobile)
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
        <div className="mt-1 bg-gray-50 rounded-lg overflow-hidden">
          {dropdownLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
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

// ==========================================
// 3. MAIN NAVBAR COMPONENT (Code 2 Modified)
// ==========================================

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // New state for Modal
  const location = useLocation();

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

  // Smooth scroll to hash
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
                        to={link.to}
                        className="block px-5 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Desktop Brochure Button (Triggers Modal) */}
            <button
              onClick={() => setModalOpen(true)}
              className="wave-btn bg-[#ffc804] hover:bg-[#deb006] text-white font-semibold py-2 px-4 rounded-full transition-colors ml-6 cursor-pointer"
            >
              Brochure
            </button>
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

                {/* Mobile Brochure Button (Triggers Modal) */}
                <div className="pt-4 px-4">
                  <button
                    onClick={() => {
                      closeOffcanvas();
                      setModalOpen(true);
                    }}
                    className="block w-full text-center bg-[#ffc804] hover:bg-[#deb006] text-white font-semibold py-3 px-7 rounded-lg transition-colors cursor-pointer"
                  >
                    Brochure
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Render the Brochure Modal */}
      <BrochureModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Navbar;