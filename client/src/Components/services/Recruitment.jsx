import React from 'react';
import { motion } from 'framer-motion';

const sectionsData = [
  {
    id: 'recruitment',
    title: 'Recruitment',
    content: [
      "At Core Talents, we follow a structured talent development and placement approach that integrates strategic career guidance, comprehensive skill assessment, and expert mentoring.",
      "Our program prepares students, freshers, and working professionals for roles that align with both industry requirements and individual career goals, ensuring a seamless transition from learning to employment."
    ],
    image: "https://img.freepik.com/free-photo/business-job-interview-concept_1421-77.jpg",
    alt: "Mentor guiding students",
    reverse: false 
  },
  {
    id: 'internship',
    title: 'Internship Program',
    content: [
      "Building a strong workforce starts with nurturing the right talent. Core Talents offers structured Internship Programs designed to empower students, freshers, and working professionals.",
      "Through a blend of online and offline learning, these programs bridge the gap between academic knowledge and industry requirements.",
      "Participants gain practical skills, hands-on experience, and real-world exposure, preparing them to excel in their careers."
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    alt: "Two students working on laptop",
    reverse: true 
  },
  {
    id: 'training',
    title: 'Training and Placement',
    content: [
      "Core Talents’ 45-Day Comprehensive Training and Placement Program is a career-focused, fast-track initiative designed for students, freshers, and working professionals.",
      "The program equips learners with industry-relevant skills across IT and Non-IT services, combining hands-on training with dedicated placement support.",
      "Delivered through both online and offline modes, it ensures flexibility, practical learning, and real-world exposure.",
      "The program is structured to prepare participants for successful career opportunities across diverse industries, helping them become job-ready in a short time frame."
    ],
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    alt: "Trainer giving training to the students",
    reverse: false 
  },
  {
    id: 'workshop',
    title: 'Workshop',
    content: [
      "Core Talents’ Industry-Oriented Workshop Program is designed for schools, colleges, students, freshers, and working professionals.",
      "The workshops focus on delivering practical knowledge, career guidance, and hands-on industry exposure aligned with current industry standards.",
      "We conduct workshops in both online and offline modes, ensuring flexible and effective participation.",
      "The program includes free and paid workshop options based on institutional and learning requirements.",
      "Participants receive a certificate of completion, adding value to their academic and professional profiles.",
      "These workshops help learners gain real-world insights and build industry-ready skills."
    ],
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop", 
    alt: "Students sitting in a workshop lecture",
    reverse: true 
  },
  {
    id: 'career',
    title: 'Career Guidelines',
    content: [
      "Core Talents’ Career Guidance Program offers free career counseling to students, freshers, and working professionals.",
      "The program helps individuals identify their core strengths, interests, and career aspirations.",
      "Through personalized guidance, we support participants in exploring suitable career paths and understanding industry opportunities.",
      "Our experts provide clarity on career choices, skill development, and future growth prospects.",
      "This guidance enables individuals to make informed decisions and build a successful, confident, and sustainable professional future."
    ],
    image: "https://img.freepik.com/free-photo/top-view-career-written-note-with-pen-notepad-white-background-job-school-copybook-salary-college-office-color_179666-19733.jpg", 
    alt: "Career guidance note",
    reverse: false 
  }
];

const CoreTalentsPrograms = () => {
  return (
    <div className="relative w-full bg-white overflow-hidden">
      
      {/* --- FIXED BACKGROUND --- */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none h-full">
        <svg
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
            <defs>
                <pattern id="grid-pattern-main" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-900" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern-main)" />
        </svg>
      </div>

      {/* --- SECTIONS LOOP --- */}
      <div className="relative z-10">
        {sectionsData.map((section, index) => (
          <section 
            key={section.id} 
            id={section.id} 
            className="py-20 lg:py-24 border-b border-slate-100 last:border-0 scroll-mt-24"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${section.reverse ? 'lg:grid-flow-dense' : ''}`}>
                
                {/* TEXT CONTENT */}
                <motion.div 
                  initial={{ opacity: 0, x: section.reverse ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`${section.reverse ? 'lg:col-start-2' : 'lg:col-start-1'}`}
                >
                  
                  {/* --- HEADING STYLE: VERTICAL SIDE ACCENT --- */}
                  <div className="flex items-start gap-5 mb-8">
                    {/* The Accent Bar */}
                    <div className="w-1.5 h-12 bg-[#ffd749] rounded-full mt-1 shrink-0"></div>
                    
                    {/* The Title */}
                    <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                        {section.title}
                    </h2>
                  </div>
                  {/* ----------------------------------------------- */}

                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-lg text-slate-700 leading-relaxed font-medium">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>

                {/* IMAGE CONTENT */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative ${section.reverse ? 'lg:col-start-1' : 'lg:col-start-2'}`}
                >
                  {/* Decorative Offset Shape */}
                  <div className={`absolute top-6 ${section.reverse ? '-left-6' : '-right-6'} w-full h-full bg-gradient-to-br from-blue-100 to-cyan-50 rounded-2xl -z-10`}></div>

                  <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3]">
                    <img 
                      src={section.image} 
                      alt={section.alt} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </motion.div>

              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default CoreTalentsPrograms;