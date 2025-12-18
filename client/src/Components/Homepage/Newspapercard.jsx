import React from 'react';
import Calltoactionimage from '@/assets/vector/cta-img4.png'
const Newspapercard = () => {
  return (
    <div className="mb-22 flex items-center justify-center p-4">
      {/* Main Card Container */}
      <div className="relative w-full max-w-6xl bg-[#5D5FEF] rounded-[40px] overflow-hidden shadow-xl flex flex-col md:flex-row min-h-[100px]">
        
        {/* Decorative Background Elements */}
        {/* Semi-circle at bottom */}
        <div className="absolute bottom-[-100px] left-[30%] w-[400px] h-[400px] rounded-full border-[40px] border-white/10 transform -translate-x-1/2 pointer-events-none z-0"></div>
        
        {/* Diagonal Stripes (Top Right) */}
        <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden pointer-events-none z-0">
             <div className="absolute -top-[10%] right-[10%] w-24 h-[150%] bg-white/5 transform rotate-[25deg]"></div>
             <div className="absolute -top-[10%] right-[25%] w-24 h-[150%] bg-white/5 transform rotate-[25deg]"></div>
        </div>

        {/* Left Content Section */}
        <div className="relative z-10 flex-1 p-8 md:p-16 flex flex-col justify-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Sounds Great! Do You Have Any Ongoing Projects?
          </h2>
          
          <p className="text-sm md:text-base text-white/90 mb-10 max-w-lg leading-relaxed">
            We are committed to embedding corporate responsibility at the core of our business operations. By integrating sustainable and ethical practices.
          </p>
          
          <div>
            <button className="bg-[#1F1F1F] text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-black transition-colors duration-300 shadow-lg">
              Get Started Now
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative z-10 flex-1 flex items-end justify-center md:justify-end overflow-hidden">
          {/* Note: Since I cannot access the exact original image file of the woman, 
            I am using a high-quality Unsplash placeholder that closely matches the vibe 
            (professional woman with laptop). 
          */}
          <img 
            src={Calltoactionimage} 
            alt="Woman holding laptop" 
            className="w-full md:w-auto transform translate-y-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Newspapercard;