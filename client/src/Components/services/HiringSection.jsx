import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Zap, Users, BrainCircuit } from "lucide-react";

// --- IMPORT IMAGES HERE ---
// Replace these paths with your actual file locations
// import HeroImage from "./assets/team-image.jpg"; 
import BgPattern from "@/assets/vector/blog_bg_1.jpg"; 


const ModernHiringSection = () => {
  // Floating animation for the stat cards
  const floatAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
  const HeroImage = "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1634&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden" id="ai-advantage">
      
      {/* --- BACKGROUND IMAGE VIA IMPORT METHOD --- */}
      <div 
        className="absolute inset-0 z-0 opacity-80"
        style={{
            backgroundImage: `url(${BgPattern})`,
            backgroundSize: 'cover', // or 'contain' / 'auto' based on your pattern
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <motion.div variants={textVariants}>
              <span className="inline-block bg-purple-100 text-purple-700 font-semibold px-4 py-2 rounded-full text-sm mb-0">
                AI Advantage
              </span>
            </motion.div>

            <motion.h2
              variants={textVariants}
              className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.3]"
            >
              AI + Human Expertise = <span className="text-yellow-600">Perfect Hiring Decisions</span>
            </motion.h2>

            <motion.p
              variants={textVariants}
              className="text-lg text-slate-600 leading-relaxed max-w-lg"
            >
              Stop guessing. Our AI analyzes retention probability and cultural
              fit to give you a clear "Yes" or "No". Combine data with human
              intuition for the perfect hire.
            </motion.p>

            <motion.div variants={textVariants} className="pt-4 flex gap-4">
              <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center gap-2 group">
                Request AI Hiring Demo
                <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT: Image & Floating Stats */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            
            {/* --- MAIN IMAGE VIA IMPORT METHOD --- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-[500px] lg:h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white"
            >
              <img
                src={HeroImage} // Using the imported variable here
                alt="Modern Team"
                className="w-full h-full object-cover"
              />
              {/* Image Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
            </motion.div>

            {/* FLOATING CARD 1: Accuracy */}
            <motion.div
              variants={floatAnimation}
              animate="animate"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-10 -right-4 lg:-right-12 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 w-48"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 text-xs font-bold uppercase">Accuracy</span>
                <div className="bg-green-100 p-1.5 rounded-full text-green-600">
                  <Zap size={14} />
                </div>
              </div>
              <p className="text-4xl font-black text-slate-900">92%</p>
              <p className="text-xs text-green-600 font-medium mt-1">Predictive Accuracy</p>
            </motion.div>

            {/* FLOATING CARD 2: Time to Hire */}
            <motion.div
              variants={floatAnimation}
              animate="animate"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              style={{ animationDelay: "1s" }} 
              className="absolute bottom-24 -left-4 lg:-left-12 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 w-52"
            >
               <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Time-to-Hire</p>
                    <p className="text-xs text-slate-500">Reduced significantly</p>
                  </div>
               </div>
               <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                  <div className="bg-indigo-600 h-2 rounded-full w-[40%]"></div>
               </div>
               <p className="text-right text-sm font-bold text-indigo-600">40% Faster</p>
            </motion.div>

             {/* FLOATING CARD 3: Retention */}
             <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center w-32 h-32"
            >
              <p className="text-3xl font-bold">25%</p>
              <p className="text-xs opacity-90 leading-tight mt-1">Higher<br/>Retention</p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHiringSection;