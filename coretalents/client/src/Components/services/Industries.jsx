import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link
import { motion } from 'framer-motion';
import { 
  Monitor, 
  HardHat, 
  HeartPulse, 
  ShoppingBag, 
  Truck, 
  Factory, 
  GraduationCap, 
  ArrowRight
} from 'lucide-react';

// Data
const industries = [
  {
    id: 1,
    title: "IT & Technology",
    description: "Specialized recruitment for software developers, IT support specialists, cybersecurity experts, and tech innovators to accelerate your digital transformation and innovation initiatives.",
    icon: <Monitor className="w-6 h-6" />,
    theme: "blue",
    bg: "bg-blue-50",
    text: "text-blue-600",
    groupHover: "group-hover:bg-blue-600 group-hover:text-white"
  },
  {
    id: 2,
    title: "Construction",
    description: "Skilled engineers, project managers, architects, and on-site laborers to ensure timely project completion, safety compliance, and high-quality infrastructure development across diverse builds.",
    icon: <HardHat className="w-6 h-6" />,
    theme: "orange",
    bg: "bg-orange-50",
    text: "text-orange-600",
    groupHover: "group-hover:bg-orange-600 group-hover:text-white"
  },
  {
    id: 3,
    title: "Healthcare",
    description: "Qualified physicians, nurses, allied health professionals, and administrative staff to deliver exceptional patient care, maintain regulatory compliance, and optimize hospital or clinic operations.",
    icon: <HeartPulse className="w-6 h-6" />,
    theme: "rose",
    bg: "bg-rose-50",
    text: "text-rose-600",
    groupHover: "group-hover:bg-rose-600 group-hover:text-white"
  },
  {
    id: 4,
    title: "Retail & Sales",
    description: "Dynamic sales associates, store managers, merchandisers, and customer service experts to enhance in-store experiences, drive revenue growth, and adapt to evolving consumer trends.",
    icon: <ShoppingBag className="w-6 h-6" />,
    theme: "purple",
    bg: "bg-purple-50",
    text: "text-purple-600",
    groupHover: "group-hover:bg-purple-600 group-hover:text-white"
  },
  {
    id: 5,
    title: "Logistics",
    description: "Efficient supply chain coordinators, drivers, warehouse operators, and logistics planners to streamline operations, ensure on-time deliveries, and reduce costs in complex distribution networks.",
    icon: <Truck className="w-6 h-6" />,
    theme: "amber",
    bg: "bg-amber-50",
    text: "text-amber-600",
    groupHover: "group-hover:bg-amber-600 group-hover:text-white"
  },
  {
    id: 6,
    title: "Manufacturing",
    description: "Experienced production technicians, quality control specialists, assembly line workers, and engineers to boost efficiency, maintain product standards, and support scalable manufacturing processes.",
    icon: <Factory className="w-6 h-6" />,
    theme: "slate",
    bg: "bg-slate-50",
    text: "text-slate-600",
    groupHover: "group-hover:bg-slate-800 group-hover:text-white"
  },
  {
    id: 7,
    title: "Education",
    description: "Dedicated teachers, administrators, curriculum developers, and support staff to foster engaging learning environments, improve student outcomes, and advance educational institutions.",
    icon: <GraduationCap className="w-6 h-6" />,
    theme: "emerald",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    groupHover: "group-hover:bg-emerald-600 group-hover:text-white"
  }
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 50, 
      damping: 20 
    }
  }
};

const ExpertiseSection = () => {
  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden" id="industries">
      
      {/* --- Vector Background Elements --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Top Right Blob */}
        <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl opacity-50 mix-blend-multiply filter animate-blob" />
        {/* Bottom Left Blob */}
        <div className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-3xl opacity-50 mix-blend-multiply filter animate-blob animation-delay-2000" />
        {/* Center Hint Blob */}
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-indigo-200/30 rounded-full blur-3xl opacity-40 mix-blend-multiply filter animate-blob animation-delay-4000" />
        
        {/* Modern Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-blue-600 text-sm font-medium mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Industry Expertise
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Multi-Industry Expertise <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              One Reliable Partner
            </span>
          </h2>
          
          <p className="text-lg text-slate-600 leading-relaxed">
           We serve IT, Construction, Healthcare, Retail, Logistics, Manufacturing and Education.
          </p>
        </motion.div>

        {/* Modern Grid with Staggered Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {industries.map((item, index) => (
            <motion.div 
              key={item.id} 
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`
                group relative p-8 rounded-3xl cursor-pointer
                bg-white/80 backdrop-blur-md border border-white/50 
                hover:bg-white hover:border-transparent 
                shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)]
                flex flex-col
                ${index === 6 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2 md:mx-auto md:w-full lg:w-auto' : ''}
              `}
            >
              {/* Hover Background Fill Effect */}
              <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 ${item.text.replace('text-', 'bg-')}`} />

              {/* Header: Icon & Arrow */}
              <div className="flex items-start justify-between mb-6">
                <div className={`
                  p-4 rounded-2xl transition-all duration-300
                  ${item.bg} ${item.text}
                  ${item.groupHover}
                  shadow-sm group-hover:shadow-md
                `}>
                  {React.cloneElement(item.icon, { className: "w-7 h-7" })}
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className={`w-5 h-5 ${item.text}`} />
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-600">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA with Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          {/* Using a Link component wrapping the button content.
             We use a div styled as a button inside the Link to keep HTML valid 
             (no button inside an anchor tag).
          */}
          <Link to="/contact" className="inline-block">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-slate-900 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-600 transition-colors duration-300 shadow-xl hover:shadow-blue-500/25 flex items-center justify-center gap-3 cursor-pointer"
            >
              Request Candidates List By Industry
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default ExpertiseSection;