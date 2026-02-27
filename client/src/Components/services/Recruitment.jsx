import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Zap, Target, BookOpen, Presentation, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const sectionsData = [
  {
    id: 'recruitment',
    title: 'Recruitment',
    subtitle: 'AI-Powered Hiring',
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    paragraph: "At Core Talents, we provide AI-powered recruitment solutions designed for speed, accuracy, and long-term performance. Our intelligent screening process ensures you receive pre-verified, job-ready candidates within 48 hours.",
    bullets: [
      "48-Hour Candidate Delivery",
      "95% Role-Fit Accuracy",
      "Hire First, Pay Later Model"
    ],
    ctaText: "Request Talent",
    ctaLink: "/contact",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
    alt: "Recruitment process"
  },
  {
    id: 'internship',
    title: 'Internship Program',
    subtitle: 'Bridge to Industry',
    icon: <Target className="w-6 h-6 text-blue-500" />,
    paragraph: "Our structured Internship Program bridges the gap between education and industry. We equip students and freshers with real-world exposure, practical skills, and industry mentorship to make them job-ready from Day 1.",
    bullets: [
      "Real-World Projects",
      "Industry Mentorship",
      "Certification & Placement Support"
    ],
    ctaText: "Apply for Internship",
    ctaLink: "/contact",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    alt: "Students working on laptops"
  },
  {
    id: 'training',
    title: 'Training & Placement',
    subtitle: 'Career Acceleration',
    icon: <BookOpen className="w-6 h-6 text-purple-500" />,
    paragraph: "Our 45-Day Training & Placement Program is designed to transform learners into job-ready professionals. We combine hands-on technical training, real-world projects, and dedicated placement support to accelerate career success.",
    bullets: [
      "Industry-Relevant IT & Non-IT Training",
      "Practical, Hands-On Learning",
      "Dedicated Placement Assistance"
    ],
    ctaText: "Enroll Now",
    ctaLink: "/contact",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    alt: "Trainer giving instructions"
  },
  {
    id: 'workshop',
    title: 'Workshop',
    subtitle: 'Skill Workshops',
    icon: <Presentation className="w-6 h-6 text-emerald-500" />,
    paragraph: "Core Talents conducts industry-oriented workshops for colleges, institutions, and aspiring professionals. Our sessions focus on practical skills, real-world insights, and career-ready knowledge aligned with current industry standards.",
    bullets: [
      "Online & Offline Sessions",
      "Industry Expert Mentors",
      "Certificate of Completion"
    ],
    ctaText: "Book a Workshop",
    ctaLink: "/contact",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop", 
    alt: "Workshop audience"
  },
  {
    id: 'career',
    title: 'Career Guidelines',
    subtitle: 'Strategic Path',
    icon: <MapPin className="w-6 h-6 text-rose-500" />,
    paragraph: "Our Career Guidance Program helps individuals identify their strengths, explore career paths, and make informed professional decisions. We provide personalized mentoring to build confidence, clarity, and long-term success.",
    bullets: [
      "Personalized Career Counseling",
      "Skill & Strength Assessment",
      "Career Roadmap Planning"
    ],
    ctaText: "Get Career Guidance",
    ctaLink: "/contact",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop", 
    alt: "Career guidance meeting"
  }
];

const CoreTalentsPrograms = () => {
  return (
    <div className="relative w-full bg-[#f8fafc] overflow-hidden py-10 lg:py-20">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-multiply">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      {/* Subtle Glows */}
      <div className="absolute top-0 right-0 -mr-[20%] -mt-[10%] w-[800px] h-[800px] bg-slate-200/40 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 -ml-[20%] -mb-[10%] w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 lg:space-y-24">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                Our Core Offerings
            </h2>
            <p className="mt-4 text-lg text-slate-600">
                End-to-end solutions for companies and candidates to bridge the talent gap.
            </p>
        </div>

        {sectionsData.map((section, index) => (
          <motion.section 
            key={section.id} 
            id={section.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="scroll-mt-24"
          >
            {/* The Main Container Card */}
            <div className="relative bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100/80 overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-shadow duration-500">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch h-full">
                
                {/* --- LEFT: TEXT CONTENT (Spans 7 columns on Desktop) --- */}
                <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10">
                  
                  {/* Subtle Top Badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
                      {section.icon}
                    </div>
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                      {section.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">
                    {section.title}
                  </h3>

                  {/* Paragraph */}
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    {section.paragraph}
                  </p>

                  {/* Bullets Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 pb-10 border-b border-slate-100">
                    {section.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-3 group">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div>
                    <Link to={section.ctaLink} className="inline-block">
                      <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-bold overflow-hidden cursor-pointer shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30 transition-all duration-300 transform hover:-translate-y-1">
                        {/* Hover Gradient Overlay inside button */}
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-0"></div>
                        <span className="relative z-10">{section.ctaText}</span>
                        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:scale-110 transition-transform duration-300" />
                      </button>
                    </Link>
                  </div>

                </div>

                {/* --- RIGHT: IMAGE CONTENT (Spans 5 columns on Desktop) --- */}
                <div className="lg:col-span-5 relative min-h-[400px] lg:min-h-full overflow-hidden bg-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/90 lg:to-white z-10 pointer-events-none hidden lg:block" />
                  <img 
                    src={section.image} 
                    alt={section.alt} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                  />
                </div>

              </div>
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
};

export default CoreTalentsPrograms;