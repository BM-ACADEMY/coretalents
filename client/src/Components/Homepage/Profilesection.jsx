import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Mock Data based on the image ---
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Sarah Abnin",
    role: "Front end Developer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "bg-gray-100"
  },
  {
    id: 2,
    name: "Caleb Foster",
    role: "Web Developer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "bg-blue-50"
  },
  {
    id: 3,
    name: "Emily Jackson",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "bg-teal-50"
  },
  {
    id: 4,
    name: "Scarlett Adams",
    role: "Wordpress Developer",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "bg-amber-50"
  },
  {
    id: 5,
    name: "James Carter",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "bg-indigo-50"
  },
  {
    id: 6,
    name: "Maya Patel",
    role: "Data Scientist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "bg-rose-50"
  }
];

const TeamSlideShow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  
  const gap = 24; 
  const safeItemsPerPage = itemsPerPage > 0 ? itemsPerPage : 1;
  const maxIndex = Math.max(0, TEAM_MEMBERS.length - safeItemsPerPage);

  // --- Responsive Logic ---
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
      
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(1);
      } else if (width < 1024) {
        setItemsPerPage(2);
      } else if (width < 1280) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Navigation Logic Wrapped in useCallback for useEffect ---
  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0)); // Loops back to 0
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : maxIndex)); // Loops to end
  }, [maxIndex]);

  // --- Auto Slide Logic ---
  useEffect(() => {
    let interval;
    // Only set interval if not paused and we have enough items to scroll
    if (!isPaused && TEAM_MEMBERS.length > safeItemsPerPage) {
      interval = setInterval(() => {
        nextSlide();
      }, 3000); // 3 seconds delay
    }
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, safeItemsPerPage]);


  const cardWidth = containerWidth > 0 
    ? (containerWidth - (safeItemsPerPage - 1) * gap) / safeItemsPerPage 
    : 280; 

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-8 font-sans text-slate-800">
      
      {/* Header */}
      <div className="text-center mb-12 px-4 flex flex-col items-center">
        <motion.span 
          className="bg-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase inline-block mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
         Our Teams
        </motion.span>
        <motion.h1 
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Meet Our Expert Team
        </motion.h1>
        <motion.p 
          className="text-slate-500 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          We are a team of dedicated professionals ready to help you build your dream project with cutting-edge technology and design.
        </motion.p>
      </div>

      {/* Carousel Container - Added mouse handlers for pausing */}
      <div 
        className="relative w-full max-w-7xl mx-auto group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        
        {/* Left Navigation Button */}
        <button 
          onClick={prevSlide}
          className="absolute -left-2 sm:-left-6 lg:-left-12 top-1/2 -translate-y-1/2 z-30 bg-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-slate-50 active:scale-95 transition-all duration-300 border border-slate-100 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-slate-600" />
        </button>

        {/* Slider Window */}
        <div 
          ref={containerRef} 
          className="overflow-hidden w-full px-1 py-8" 
        >
          <div 
            className="flex transition-transform duration-700 ease-in-out will-change-transform"
            style={{ 
              transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
              gap: `${gap}px`
            }}
          >
            {TEAM_MEMBERS.map((member) => (
              <ProfileCard 
                key={member.id} 
                member={member} 
                width={cardWidth} 
              />
            ))}
          </div>
        </div>

        {/* Right Navigation Button */}
        <button 
          onClick={nextSlide}
          className="absolute -right-2 sm:-right-6 lg:-right-12 top-1/2 -translate-y-1/2 z-30 bg-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-slate-50 active:scale-95 transition-all duration-300 border border-slate-100 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-slate-600" />
        </button>

      </div>

      {/* Pagination Dots */}
      <div className="flex gap-2 mt-4 justify-center flex-wrap px-4">
        {Array.from({ length: Math.max(1, TEAM_MEMBERS.length - safeItemsPerPage + 1) }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-8 bg-slate-800" : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Individual Card Component ---
const ProfileCard = ({ member, width }) => {
  return (
    <div 
      className="relative flex-shrink-0 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group/card cursor-pointer select-none bg-white"
      style={{ 
        width: `${width}px`,
        height: `${width * 1.3}px`, 
        minHeight: '380px'
      }}
    >
      {/* Image Background */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={member.image} 
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* SOCIAL OVERLAY - Isolated to group/card */}
      <div className="absolute top-5 right-5 flex flex-col gap-3 translate-x-12 opacity-0 pointer-events-none group-hover/card:translate-x-0 group-hover/card:opacity-100 group-hover/card:pointer-events-auto transition-all duration-500 ease-out z-20">
        <SocialButton icon={<Linkedin size={20} />} delay="0" />
        <SocialButton icon={<Twitter size={20} />} delay="75" />
        <SocialButton icon={<Mail size={20} />} delay="150" />
      </div>

      {/* Bottom Content Card */}
      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-3xl p-5 shadow-lg transform transition-transform duration-300 group-hover/card:-translate-y-2 z-20">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              {member.name}
            </h3>
            <p className="text-sm text-slate-500 font-medium mt-1">
              {member.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialButton = ({ icon, delay }) => (
  <button 
    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-slate-700 hover:bg-[#ffc700] hover:text-white transition-all duration-300 hover:scale-110"
    style={{ transitionDelay: `${delay}ms` }}
  >
    {icon}
  </button>
);

export default TeamSlideShow;