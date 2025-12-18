import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // 1. Import Framer Motion
import Ceo from "@/assets/Profiles/ceo.png";

const About = () => {
  return (
    <section className="w-full py-12 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      {/* Load the Poppins Font */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');`}
      </style>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Image - Slides in from the Left */}
        <motion.div 
          className="relative flex justify-center items-center w-full max-w-lg mx-auto lg:max-w-none"
          initial={{ opacity: 0, x: -100 }} // Start invisible and to the left
          whileInView={{ opacity: 1, x: 0 }} // Animate to visible and original position
          viewport={{ once: true, amount: 0.5 }} // Trigger when 50% of element is in view
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute inset-0 m-auto w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] bg-indigo-50 rounded-full -z-10"></div>

          <img
            src={Ceo}
            alt="Business Professional"
            className="relative z-10 object-contain max-h-[400px] sm:max-h-[500px] lg:max-h-[650px]"
          />
        </motion.div>

        {/* Right Side: Content - Fades Up with Staggered Delays */}
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-8">
          
          {/* Badge */}
          <motion.span 
            className="bg-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            About Us
          </motion.span>

          {/* Title */}
          <motion.h2
            style={{ fontFamily: "'Poppins', sans-serif" }}
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1e2939] leading-snug"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }} // Slight delay after badge
          >
            Empowering organizations through AI-driven recruitment and people
            excellence.
          </motion.h2>

          {/* Paragraph 1 */}
          <motion.p 
            className="text-gray-500 leading-relaxed text-base sm:text-lg max-w-2xl mb-5 mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Core Talents is a next-generation AI-powered staffing and
            recruitment company, proudly operating as a specialized division of
            ABM Groups — a trusted name with over two decades of excellence in
            manpower solutions across South India and beyond.{" "}
          </motion.p>

          {/* Paragraph 2 */}
          <motion.p 
            className="text-gray-500 leading-relaxed text-base sm:text-lg max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            We combine cutting-edge AI matching technology with human expertise
            to deliver pre-verified, job-ready professionals — ensuring your
            team gets talent that performs from Day 1.{" "}
            <Link
              to="/about"
              className="text-indigo-600 text-sm font-medium hover:underline inline-flex items-center gap-1"
            >
              Read More
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 8l4 4m0 0l-3 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.p>

          {/* Button */}
          <motion.div 
            className="pt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold py-3 px-8 sm:px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Discover More
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;