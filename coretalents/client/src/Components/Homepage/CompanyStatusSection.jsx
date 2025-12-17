import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup'; 
import OfficeTeamVideo from '@/assets/vector/video-img.jpg'; 

// Fix for bundler compatibility
const FinalCountUp = CountUp.CountUp || CountUp.default || CountUp; 

// --- Custom CountUp Component ---
const AnimatedCount = ({ end, duration = 7, start = 0, suffix, textClass, staticText, isInView }) => {
  return (
    <p className={`text-6xl font-bold mb-2 ${textClass}`}>
      {isInView ? (
        <FinalCountUp 
          end={end}
          duration={duration}
          start={start}
          suffix="" 
          separator=""
          useEasing={true}
        />
      ) : (
        <span>{start}</span>
      )}

      <span className="text-4xl align-top">{suffix}</span>
      {staticText && <span className="text-lg font-normal ml-2">{staticText}</span>}
    </p>
  );
};

// --- Main Section Component ---
const CompanyStatusSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); 

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 font-sans bg-white" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-16">

        {/* --- Left Column: Image/Video Area --- */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src={OfficeTeamVideo}
            alt="Team working in office"
            className="w-full h-full object-cover min-h-[400px]"
          />
        </motion.div>

        {/* --- Right Column: Title & Status Numbers --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span className="inline-block px-3 py-1 text-sm font-medium rounded-full text-purple-700 bg-purple-100 mb-4" variants={itemVariants}>
            Company Status
          </motion.span>

          <motion.h2 className="text-4xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-10 leading-tight" variants={itemVariants}>
            Building Brands That Inspire A Better Tomorrow
          </motion.h2>

          {/* --- Status Numbers Grid --- */}
          <div className="grid grid-cols-2 gap-x-0 gap-y-0">

            {/* 1. Corporate Clients */}
            {/* Changed to standard div so border doesn't move */}
            <div className="py-6 pr-4 border-r border-b border-gray-400">
               {/* Wrapped content in motion.div so only TEXT moves */}
               <motion.div variants={itemVariants}>
                  <AnimatedCount isInView={isInView} end={25} suffix="+" textClass="text-purple-600" />
                  <p className="text-lg text-gray-600">Corporate Clients</p>
               </motion.div>
            </div>

            {/* 2. Candidates Placed */}
            <div className="py-6 pl-8 border-b border-gray-400">
               <motion.div variants={itemVariants}>
                  <AnimatedCount isInView={isInView} end={350} suffix="+" textClass="text-green-600" />
                  <p className="text-lg text-gray-600">Candidates Placed</p>
               </motion.div>
            </div>

            {/* 3. Hour Hiring Cycle */}
            <div className="py-6 pr-4 border-r border-gray-400">
               <motion.div variants={itemVariants}>
                  <AnimatedCount isInView={isInView} end={48} suffix="+" textClass="text-yellow-600" />
                  <p className="text-lg text-gray-600">Hour Hiring Cycle</p>
               </motion.div>
            </div>

            {/* 4. States & Countries */}
            <div className="py-6 pl-8">
               <motion.div variants={itemVariants}>
                  <AnimatedCount isInView={isInView} end={18} suffix="+" textClass="text-blue-600" />
                  <p className="text-lg text-gray-600">States & 6 Countries</p>
               </motion.div>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default CompanyStatusSection;