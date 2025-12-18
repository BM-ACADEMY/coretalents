// Homepage.jsx
import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";

import Homebannerimage1 from "@/assets/banners/home1.png";
import HomeBackgroundImage from "@/assets/banners/hero_bg_8.jpg";
import Slide2Image from "@/assets/banners/ctbanner.jpg"; // your screenshot
import Slide3Image from "@/assets/banners/officebanner.jpg"; // your screenshot

const SLIDES = [
  {
    id: 1,
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
  },
  {
    id: 2,
    type: "full",
    title: <>Hire First Pay Later</>,
    description:
      "Get pre-verified, job-ready professionals delivered within 48 hours — pay only after successful joining.",
  cta: "Start Hiring Now",
      image: Slide2Image,
  },
  {
    id: 3,
    type: "full",
    title: <>48 Hours to Your Next Hire.</>,
    description:
      "AI matches, human-verified professionals — delivered fast. No cost until they start.Trusted by 25+ Tamil Nadu & Pondicherry businesses.",
    cta: "Start Hiring Now",
    image: Slide3Image,
  },
];

const Homepage = () => {
  const [slideIdx, setSlideIdx] = useState(0);
  const controls = useAnimation();

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Container variant with stagger, used for BOTH slides
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  // Item variant, used for all text/button elements
  const textItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  // Tilt effect (only for split slide)
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

  const current = SLIDES[slideIdx];

  // Navigation – only dots (arrows removed)
  const renderNavigation = () => (
    <>
      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {SLIDES.map((_, i) => (
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
    </>
  );

  // SLIDE 1: Split Layout
  if (current.type === "split") {
    return (
      <div
        className="relative h-[100vh] overflow-hidden pt-18 bg-cover bg-center"
        style={{ backgroundImage: `url(${HomeBackgroundImage})` }}
      >
        {/* Background blobs */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-200 to-orange-200 rounded-full opacity-30 blur-2xl z-0"></div>
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-500 rounded-full opacity-70 z-0 animate-move-horizontal"></div>
        <div className="absolute bottom-1/4 right-1/2 w-3 h-3 bg-blue-400 rounded-full opacity-70 z-0 animate-move-horizontal"></div>

        {/* --- MODIFIED LINE ---
            Added h-full (to fill parent height)
            Added justify-center (to center mobile grid)
            Added md:justify-start (to reset justification for desktop grid)
        */}
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
              <button className="wave-btn bg-[#ffc804] hover:bg-[#deb006] text-white font-semibold py-3 px-8 rounded-full mr-1.5 transition duration-300">
                {current.cta}
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT: Tilt Image */}
          <motion.div
            ref={imgRef}
            className="relative hidden  md:flex items-center justify-center"
            style={{ perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.img
              key={current.image}
              src={current.image}
              alt="Hero banner"
              className="w-auto h-auto max-h-[75vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
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
    );
  }

  // SLIDE 2: Full Image Background + Centered Text
  return (
    <div
      className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${current.image})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="container relative mx-auto px-6 z-10 text-center">
        <motion.div
          key={slideIdx}
          variants={textContainerVariants} // Uses the same stagger as Slide 1
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
            {current.trust && (
              <span className="block mt-3 text-base md:text-lg text-white/80">
                {current.trust}
              </span>
            )}
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center"
            variants={textItemVariants}
          >
            <button className="wave-btn bg-[#ffc804] hover:bg-[#deb006] text-white font-semibold py-3 px-10 rounded-full transition duration-300">
              {current.cta}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {renderNavigation()}
    </div>
  );
};

export default Homepage;