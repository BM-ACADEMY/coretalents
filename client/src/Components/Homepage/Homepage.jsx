import React, { useRef, useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
  AnimatePresence
} from "framer-motion";
import { X, Download } from "lucide-react";
import toast from "react-hot-toast";

// ASSETS
import Homebannerimage1 from "@/assets/banners/home1.png";
import HomeBackgroundImage from "@/assets/banners/hero_bg_8.jpg";
import BrochurePDF from "@/assets/ct.pdf"; // Ensure this path is correct

// ==========================================
// 1. BROCHURE MODAL COMPONENT
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
// 2. HOMEPAGE COMPONENT
// ==========================================
const Homepage = () => {
  const [modalOpen, setModalOpen] = useState(false); // State for Brochure Modal

  // 1. Define the First Slide (Static / Split Layout)
  const STATIC_FIRST_SLIDE = {
    id: "static-1",
    type: "split",
    title: (
      <>
        Zero Upfront
        <br />
        <span className="flex items-center mt-2">100% Confidence</span>
      </>
    ),
    description:
      "350+ successful placements. AI-powered matching. Pay nothing until your hire joins — and thrives.",
    cta: "Brochure",
    image: Homebannerimage1,
  };

  const [slides, setSlides] = useState([STATIC_FIRST_SLIDE]);
  const [slideIdx, setSlideIdx] = useState(0);
  const controls = useAnimation();
  const navigate = useNavigate();

  // 2. Fetch Banners from Backend
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axiosInstance.get("/banners");
        
        const backendSlides = res.data.map((banner) => ({
          id: banner._id,
          type: "full",
          title: banner.title,
          description: banner.subheading,
          cta: "Start Hiring Now",
          image: banner.image,
        }));

        setSlides([STATIC_FIRST_SLIDE, ...backendSlides]);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  // 3. Auto-slide logic
  useEffect(() => {
    if (slides.length <= 1) return;

    // Pause auto-slide if modal is open to prevent distraction
    if (modalOpen) return;

    const timer = setInterval(() => {
      setSlideIdx((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, modalOpen]);

  // --- ANIMATION VARIANTS ---
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  // --- TILT EFFECT (For Slide 1) ---
  const imgRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const goToSlide = (idx) => {
    setSlideIdx(idx);
    controls.start("visible");
  };

  // Get Current Slide
  const current = slides[slideIdx];

  // --- NAVIGATION DOTS ---
  const renderNavigation = () => (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
      {slides.map((_, i) => (
        <button
          key={i}
          onClick={() => goToSlide(i)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            i === slideIdx ? "bg-[#ffc804] w-8" : "bg-white/60"
          }`}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );

  // ==========================================
  // LAYOUT 1: SPLIT (Hardcoded First Slide)
  // ==========================================
  if (current.type === "split") {
    return (
      <>
        <div
          className="relative h-[100vh] overflow-hidden pt-18 bg-cover bg-center"
          style={{ backgroundImage: `url(${HomeBackgroundImage})` }}
        >
          {/* Background blobs */}
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-200 to-orange-200 rounded-full opacity-30 blur-2xl z-0"></div>
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-500 rounded-full opacity-70 z-0 animate-move-horizontal"></div>
          <div className="absolute bottom-1/4 right-1/2 w-3 h-3 bg-blue-400 rounded-full opacity-70 z-0 animate-move-horizontal"></div>

          <div className="container relative h-full mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-center md:justify-start z-10">
            {/* LEFT: Text */}
            <motion.div
              key={slideIdx}
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col justify-center p-8"
            >
              <motion.h1
                className="home-text-h1 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900"
                variants={textItemVariants}
              >
                {current.title}
              </motion.h1>

              <motion.p
                className="mt-6 text-lg text-gray-700 max-w-lg"
                variants={textItemVariants}
              >
                {current.description}
              </motion.p>

              <motion.div
                className="mt-5 flex items-center max-w-md"
                variants={textItemVariants}
              >
                {/* MODIFIED: Button triggers Modal */}
                <button 
                  onClick={() => setModalOpen(true)}
                  className="wave-btn bg-[#ffc804] hover:bg-[#deb006] text-white font-semibold py-3 px-8 rounded-full mr-1.5 transition duration-300"
                >
                  {current.cta}
                </button>
              </motion.div>
            </motion.div>

            {/* RIGHT: Tilt Image */}
            <motion.div
              ref={imgRef}
              className="relative hidden md:flex items-center justify-center"
              style={{ perspective: 1000 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.img
                key={current.image}
                src={current.image}
                alt="Hero banner"
                className="w-auto h-auto max-h-[75vh]"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                  transform: "translateZ(40px)",
                }}
              />
            </motion.div>
          </div>

          {renderNavigation()}
        </div>
        
        {/* Render Modal */}
        <BrochureModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  // ==========================================
  // LAYOUT 2: FULL (Backend Data Slides)
  // ==========================================
  return (
    <>
      <div
        className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${current.image})` }} 
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        <div className="container relative mx-auto px-6 z-10 text-center">
          <motion.div
            key={slideIdx}
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              className="home-text-h1 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white drop-shadow-lg"
              variants={textItemVariants}
            >
              {current.title}
            </motion.h1>

            <motion.p
              className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow"
              variants={textItemVariants}
            >
              {current.description}
            </motion.p>

            <motion.div
              className="mt-8 flex justify-center"
              variants={textItemVariants}
            >
              <button 
                onClick={() => navigate("/contact")} 
                className="wave-btn bg-[#ffc804] hover:bg-[#deb006] text-white font-semibold py-3 px-10 rounded-full transition duration-300"
              >
                {current.cta}
              </button>
            </motion.div>
          </motion.div>
        </div>

        {renderNavigation()}
      </div>

      {/* Render Modal (Just in case logic allows it to be open here, though button is typically on slide 1) */}
      <BrochureModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Homepage;