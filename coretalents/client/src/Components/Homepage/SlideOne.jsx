// src/components/SlideOne.js

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Homebannerimage1 from "@/assets/banners/home1.png";
import HomeBackgroundImage from "@/assets/banners/hero_bg_8.jpg";

const SlideOne = () => {
  // --- Text Animation Variants ---
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

  // --- Image Tilt/Magnet Effect ---
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

  return (
    <div
      className="relative min-h-[90vh] overflow-hidden pt-18 bg-cover bg-center"
      style={{ backgroundImage: `url(${HomeBackgroundImage})` }}
    >
      {/* ... dots ... */}
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-200 to-orange-200 rounded-full opacity-30 blur-2xl z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-500 rounded-full opacity-70 z-0 animate-move-horizontal"></div>
      <div className="absolute bottom-1/4 right-1/2 w-3 h-3 bg-blue-400 rounded-full opacity-70 z-0 animate-move-horizontal"></div>

      <div className="container relative mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        
        {/* === Left Column: Animated Text === */}
        <motion.div
          className="flex flex-col justify-center p-8"
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible" // <-- Changed from 'animate'
          viewport={{ once: true, amount: 0.5 }} // Triggers when 50% is visible
        >
          <motion.h1
            className="home-text-h1 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900"
            variants={textItemVariants}
          >
            Zero Upfront
            <br />
            <span className="flex items-center mt-2">100% Confidence</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-gray-700 max-w-lg"
            variants={textItemVariants}
          >
            350+ successful placements. AI-powered matching. Pay nothing until
            your hire joins — and thrives.
          </motion.p>

          <motion.div
            className="mt-5 flex items-center max-w-md"
            variants={textItemVariants}
          >
            <button className="wave-btn bg-[#ffc804] hover:bg-[#deb006] text-white font-semibold py-3 px-8 rounded-full mr-1.5 transition duration-300">
              Brochure
            </button>
          </motion.div>
        </motion.div>

        {/* === Right Column: Animated Image === */}
        <motion.div
          ref={imgRef}
          className="relative hidden md:flex items-center justify-center"
          style={{ perspective: 1000 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.img
            src={Homebannerimage1}
            alt="Woman pointing at content"
            className="w-auto h-auto max-h-[75vh]"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              transform: "translateZ(40px)",
            }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SlideOne;