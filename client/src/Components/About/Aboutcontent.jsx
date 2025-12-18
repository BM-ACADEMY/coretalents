import React from 'react';
import { motion } from 'framer-motion';

const AboutCoreTalents = () => {

  // 1. Stagger Container: Controls the sequence
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay between each item appearing
        delayChildren: 0.2,
      }
    }
  };

  // 2. Item Variant: How each individual element animates
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const ParallaxBg = "https://images.unsplash.com/photo-1566112718365-4c8ccbedc3d9?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; 

  return (
    <section className="relative w-full py-20 overflow-hidden">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        {/* Image with Blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed blur-[3px] scale-105" // Added blur and slight scale to hide blur edges
          style={{ backgroundImage: `url(${ParallaxBg})` }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/75"></div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center text-white font-['Poppins',_sans-serif]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        
        {/* 1. MAIN HEADLINE */}
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold tracking-tight mb-8 uppercase"
        >
          <span className="text-yellow-400">People. Process. Performance.</span>
        </motion.h2>

        {/* 2. TEXT BLOCKS (Grouped with reduced spacing) */}
        <div className="space-y-6 mb-12"> {/* space-y-6 handles the gap between paragraphs */}
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl leading-relaxed text-gray-200">
            <strong className="text-white font-semibold">Core Talents</strong> is a next-generation AI-powered staffing and recruitment company, 
            proudly operating as a specialized division of <span className="text-yellow-400 font-medium">ABM Groups</span> — a trusted name with over two decades 
            of excellence in manpower solutions across South India and beyond.
          </motion.p>

          <motion.p variants={itemVariants} className="text-lg md:text-xl leading-relaxed text-gray-200">
            We combine cutting-edge AI matching technology with human expertise to deliver pre-verified, job-ready professionals — ensuring your team gets talent that performs from Day 1.
          </motion.p>

          <motion.p variants={itemVariants} className="text-lg md:text-xl leading-relaxed text-gray-200">
            Guided by strong principles of integrity, quality, and customer-centricity, we collaborate closely with our clients to deliver tailor-made recruitment solutions that achieve measurable success.
          </motion.p>

        </div>

        {/* 3. MISSION STATEMENT BOX */}
        <motion.div 
          variants={itemVariants}
          className="relative py-10 px-6 md:px-16 border-t border-b border-white/20 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        >
           {/* Quote Icon */}
           <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-black p-2 rounded-full border border-white/20">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
               <path d="M14.017 21L14.017 18C14.017 16.896 14.383 15.953 15.114 15.172C15.847 14.39 16.964 14 18.465 14L19.465 14L19.465 8L18.465 8C16.964 8 15.789 8.355 14.941 9.065C14.092 9.775 13.668 10.953 13.668 12.6L13.668 21L14.017 21ZM4.99805 21L4.99805 18C4.99805 16.896 5.36405 15.953 6.09605 15.172C6.82905 14.39 7.94605 14 9.44605 14L10.4461 14L10.4461 8L9.44605 8C7.94605 8 6.77005 8.355 5.92205 9.065C5.07405 9.775 4.65005 10.953 4.65005 12.6L4.65005 21L4.99805 21Z"/>
             </svg>
           </div>

           <h4 className="text-sm uppercase tracking-[0.2em] text-yellow-400 mb-4">Our Mission</h4>
           <p className="text-xl md:text-2xl font-medium text-white italic font-serif leading-normal">
             "To redefine talent acquisition by combining the speed of automation with the precision of human intelligence — enabling businesses to grow faster with people who shape the future."
           </p>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default AboutCoreTalents;