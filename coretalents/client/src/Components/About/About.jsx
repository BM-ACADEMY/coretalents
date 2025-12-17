import React from 'react';
import { motion } from 'framer-motion'; 
import Aboutceo from "@/assets/Profiles/1.png";
import HeroBg from "@/assets/banners/hero_bg_8.jpg"; 

const About = () => {
  
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.4 }
    }
  };

  return (
    <section 
      className="w-full min-h-screen flex items-start lg:items-center justify-center overflow-hidden relative py-20 lg:py-0 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat font-['Poppins',_sans-serif]"
      style={{ 
        backgroundImage: `url(${HeroBg})` 
      }}
    >
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* --- LEFT COLUMN: Text & Button --- */}
        {/* UPDATED: Added 'order-2 lg:order-1' to push text below image on mobile, but left on desktop */}
        <motion.div 
          className="relative z-10 flex flex-col items-start order-2 lg:order-1" 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Decorative Green Dot Top */}
          <motion.div 
            variants={itemVariants}
            className="absolute -top-6 -left-6 w-4 h-4 bg-green-200 rounded-full hidden lg:block"
          />

          {/* 1. BADGE */}
          <motion.span 
            variants={itemVariants}
            className="inline-block bg-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-6"
          >
            About Us
          </motion.span>

          {/* 2. HEADING */}
          <motion.h1 
            variants={itemVariants}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.2] tracking-tight relative"
          >
            Empowering organizations through AI-driven recruitment and people excellence.
          </motion.h1>

          {/* 3. BUTTON */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 max-w-md"
          >
             <motion.button
               type="submit"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 whitespace-nowrap shadow-lg"
             >
               Get started
             </motion.button>
          </motion.div>
        </motion.div>

        {/* --- RIGHT COLUMN: Image & Shapes --- */}
        {/* UPDATED: Added 'order-1 lg:order-2' to pull image to TOP on mobile, but right on desktop */}
        <div className="relative flex justify-center lg:justify-end h-full min-h-[400px] md:min-h-[500px] order-1 lg:order-2">           
          
          {/* Decorative Green Dot Bottom Left */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute bottom-0 left-0 w-16 h-16 bg-green-300/50 rounded-full z-20 backdrop-blur-sm"
          />

          {/* Main Image */}
          <motion.div 
            className="relative z-10 w-full max-w-lg lg:max-w-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={imageVariants}
          >
            <img 
              src={Aboutceo} 
              alt="Smiling woman representing fintech" 
              className="w-full h-auto object-contain"
              style={{
                maskImage: 'linear-gradient(to bottom, black 95%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 95%, transparent 100%)'
              }}
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;