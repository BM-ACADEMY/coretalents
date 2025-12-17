import React from 'react';
import { Check } from 'lucide-react';
// Make sure this path is 100% correct based on your folder structure
import bgImage from '@/assets/vector/choose_bg_1.png'; 


import Whyimage1 from '@/assets/other/whyimage1.png';
import Whyimage2 from '@/assets/other/whyimage2.png';

const WhyChooseUs = () => {
  return (
    <section className="relative w-full overflow-hidden py-12 md:py-16 lg:py-24">
      
      {/* BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-0">
        <img 
          src={bgImage} 
          alt="Background pattern" 
          className="w-full h-full" 
        />
      </div>

      {/* CONTENT LAYER */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* LEFT COLUMN: Text Content */}
          <div className="flex flex-col justify-center order-1 lg:order-1">
            
            <div>
              <span className="inline-block bg-purple-100 text-purple-700 font-semibold px-4 py-2 rounded-full text-xs md:text-sm mb-4 md:mb-6">
                Our Advantages
              </span>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight tracking-tight mb-4 md:mb-6">
                Why Business Trust Core Talents
                {/* <span className="text-purple-600">.</span> */}
              </h1>
            </div>

            {/* Main Description - Point 1: Speed & Precision */}
            <div className="flex items-center gap-2 mb-2">
                <Check className="w-5 h-5 text-purple-600 font-bold shrink-0" strokeWidth={3} />
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Speed & Precision</h3>
            </div>
            
            <p className="text-gray-600 text-base md:text-md leading-relaxed mb-6 md:mb-8">
              Businesses trust Core Talents to eliminate hiring delays with 48-hour shortlists and a 95% AI fit rate, powered by cutting-edge algorithms plus expert human vetting—delivering candidates perfectly aligned with your skills, culture, and budget.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-10">
              
              {/* Feature 2: Cost & Confidence */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-purple-600 font-bold shrink-0" strokeWidth={3} />
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">Cost & Confidence</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Enjoy transparent pricing with no hidden fees or mark-ups—just a fixed cost per hire—and our hire first, pay later model means you only pay when your selected talent starts, removing all financial risk.
                </p>
              </div>

              {/* Feature 3: Reach & Reliability */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-purple-600 font-bold shrink-0" strokeWidth={3} />
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">Reach & Reliability</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Scale effortlessly with 25+ trusted corporate partners and access to 1.2 million pre-vetted profiles across Pan-India and GCC regions, from Tier-2/3 cities to UAE, Saudi Arabia, Qatar, Bahrain, Oman, and Kuwait.
                </p>
              </div>

            </div>

            <div>
              <button className="bg-[#84cc16] hover:bg-[#65a30d] text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full transition-colors duration-300 flex items-center gap-2 shadow-lg shadow-lime-200 text-sm md:text-base">
                Explore Careers
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Images Composition */}
          <div className="relative w-full max-w-md lg:max-w-none mx-auto p-0 md:p-4 order-2 lg:order-2">
            <div className="grid grid-cols-2 gap-4 md:gap-6 h-full min-h-[300px] md:min-h-[500px]">
              
              <div className="flex flex-col justify-end pt-8 md:pt-16">
                <div className="relative h-[220px] sm:h-[300px] md:h-[420px] w-full overflow-hidden rounded-[60px] md:rounded-[90px] group cursor-pointer shadow-lg">
                  
                  <img 
                    src={Whyimage1} 
                    alt="Corporate collaboration" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/40 to-transparent z-10 
                                transform translate-y-full -translate-x-full group-hover:-translate-y-full group-hover:translate-x-full 
                                transition-transform duration-1000 ease-in-out pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col justify-start">
                
                <div className="relative h-[220px] sm:h-[300px] md:h-[420px] w-full overflow-hidden rounded-[60px] md:rounded-[90px] group cursor-pointer shadow-lg">
                  
                  <img 
                    src={Whyimage2} 
                    alt="Successful hiring team" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/40 to-transparent z-10 
                                transform translate-y-full -translate-x-full group-hover:-translate-y-full group-hover:translate-x-full 
                                transition-transform duration-1000 ease-in-out pointer-events-none" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;