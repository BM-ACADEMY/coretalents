import React from 'react';

// --- Image Imports ---
import Brand1 from '@/assets/Brands/brand1.png';
import Brand2 from '@/assets/Brands/brand2.png';
import Brand3 from '@/assets/Brands/brand3.png';
import Brand4 from '@/assets/Brands/brand4.png';
import Brand5 from '@/assets/Brands/brand5.png';
import Brand6 from '@/assets/Brands/brand6.png';
import Brand7 from '@/assets/Brands/brand7.png';

const ScrollAnimationStyles = () => {
  return (
    <style jsx="true" global="true">{`
      /* 1. Added Google Font import for Poppins (bold 700 weight) */
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }

      .animate-scroll {
        animation: scroll 20s linear infinite;
      }
    `}</style>
  );
};

// --- Logos Array Updated ---
const logos = [
  // 3. Changed non-standard 'h-22' to 'h-[5.5rem]' (88px)
  { name: 'Brand 1', url: Brand1, heightClass: 'h-[5.5rem]' },
  { name: 'Brand 2', url: Brand2, heightClass: 'h-12' },
  { name: 'Brand 3', url: Brand3, heightClass: 'h-12' },
  { name: 'Brand 4', url: Brand4, heightClass: 'h-12' },
  { name: 'Brand 5', url: Brand5, heightClass: 'h-12' },
  { name: 'Brand 6', url: Brand6, heightClass: 'h-20' },
  { name: 'Brand 7', url: Brand7, heightClass: 'h-20' },
];

const Trustbrand = () => {
  const allLogos = [...logos, ...logos];

  return (
    <div className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* 2. Added inline style to apply the Poppins font */}
        <h1
          className="text-4xl mt-10 font-bold text-center text-gray-800 mb-16"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Trusted by Leading Brands
        </h1>

        <div
          className="relative w-full overflow-hidden"
          
        >
          <div className="flex items-center w-max animate-scroll">
            {allLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                aria-hidden={index >= logos.length ? 'true' : 'false'}
              >
                <img
                  src={logo.url}
                  alt={index < logos.length ? logo.name : ''}
                  className={`${logo.heightClass} w-auto mx-10  transition-all duration-300 hover:grayscale-0 hover:opacity-100`}
                  onError={(e) => {
                    e.target.src = `https://placehold.co/150x50/gray/white?text=${logo.name}`;
                    e.target.className = `${logo.heightClass} w-auto mx-10 grayscale opacity-60`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <hr className="mt-14 border-t border-1 border-gray-400" />
      </div>
    </div>
  );
};

export default function Section() {
  return (
    <div className="flex items-center justify-center">
      <ScrollAnimationStyles />

      <div className="w-full max-w-6xl">
        <Trustbrand />
      </div>
    </div>
  );
}