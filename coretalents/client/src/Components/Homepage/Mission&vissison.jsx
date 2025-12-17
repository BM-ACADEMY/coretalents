import React from 'react';
import { Target, Eye } from 'lucide-react';

// --- 1. IMPORT YOUR IMAGE HERE ---
// Replace './assets/background.jpg' with the actual path to your image file
import missionBg from '@/assets/vector/blog_bg_1.jpg'; 

const MissionVision = () => {
  return (
    <section 
      className="relative py-24 flex items-center justify-center overflow-hidden" 
      style={{
        // --- 2. USE THE IMPORTED VARIABLE HERE ---
        backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.2), rgba(248, 250, 252, 0.1)), url(${missionBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* --- Heading --- */}
        <div className="text-center mb-20">
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full text-purple-700 bg-purple-100 mb-4">
           Our Mission & Vision
          </span>

          <h2 className="text-4xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-10 leading-tight">
            Mission to Empower Vision to Lead
          </h2>
        </div>
        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* --- MISSION CARD --- */}
          <div className="group relative bg-white rounded-[2.5rem] p-10 pt-14 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center min-h-[450px] overflow-hidden border border-slate-300">
            
            
            {/* The Decorative Ribbon */}
            <div className="absolute top-0 left-0 w-32 h-32 z-10 pointer-events-none">
              <div className="absolute top-2 left-2 w-full h-full bg-orange-200 rounded-tl-[2.5rem] rounded-br-[5rem] -z-10" />
              <div className="absolute top-0 left-0 w-full h-full bg-orange-400 rounded-tl-[2.5rem] rounded-br-[5rem] shadow-md" />
            </div>

            {/* Content Wrapper */}
            <div className="relative z-20 flex flex-col items-center h-full w-full">
              
              {/* Icon */}
              <div className="w-20 h-20 flex items-center justify-center mb-6 bg-white rounded-full shadow-sm border border-orange-100 group-hover:scale-110 group-hover:border-orange-200 transition-all duration-500">
                <Target className="w-10 h-10 text-orange-500" />
              </div>

              {/* Title */}
              <h3 className="text-4xl font-bold text-orange-500 tracking-wide mb-4 uppercase transition-colors duration-500">
                Mission
              </h3>

              {/* Body Text */}
              <p className="text-slate-500 leading-relaxed mb-auto max-w-sm text-lg group-hover:text-slate-700 transition-colors duration-500">
                We eliminate hiring guesswork. Every candidate is rigorously screened, <span className="font-semibold text-slate-700 group-hover:text-orange-600 transition-colors duration-500">skill-assessed, and AI-matched</span> to your exact needs — so you onboard talent that’s not just qualified, but ready to contribute immediately.
              </p>

            </div>
          </div>


          {/* --- VISION CARD --- */}
          <div className="group relative bg-white rounded-[2.5rem] p-10 pt-14 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center min-h-[450px] overflow-hidden border border-slate-300">
            
            {/* --- HOVER FILL BACKGROUND --- */}

            {/* The Decorative Ribbon */}
            <div className="absolute top-0 left-0 w-32 h-32 z-10 pointer-events-none">
              <div className="absolute top-2 left-2 w-full h-full bg-teal-200 rounded-tl-[2.5rem] rounded-br-[5rem] -z-10" />
              <div className="absolute top-0 left-0 w-full h-full bg-teal-500 rounded-tl-[2.5rem] rounded-br-[5rem] shadow-md" />
            </div>

            {/* Content Wrapper */}
            <div className="relative z-20 flex flex-col items-center h-full w-full">
              
              {/* Icon */}
              <div className="w-20 h-20 flex items-center justify-center mb-6 bg-white rounded-full shadow-sm border border-teal-100 group-hover:scale-110 group-hover:border-teal-200 transition-all duration-500">
                <Eye className="w-10 h-10 text-teal-500" />
              </div>

              {/* Title */}
              <h3 className="text-4xl font-bold text-teal-500 tracking-wide mb-4 uppercase transition-colors duration-500">
                Vision
              </h3>

              {/* Body Text */}
              <p className="text-slate-500 leading-relaxed mb-auto max-w-sm text-lg group-hover:text-slate-700 transition-colors duration-500">
                We’re building the future of hiring — where speed meets quality, risk is zero, and success is guaranteed. From <span className="font-semibold text-slate-700 group-hover:text-teal-600 transition-colors duration-500">Tamil Nadu to Telangana, Pondicherry to the GCC</span>, we’re redefining how businesses scale with confidence.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MissionVision;