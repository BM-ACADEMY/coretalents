import React from "react";
import { motion } from "framer-motion";
import { FiTarget, FiUsers, FiTrendingUp, FiAward } from "react-icons/fi"; // Install react-icons

const features = [
  {
    icon: <FiTarget />,
    title: "Practical Training",
    desc: "Hands-on projects that mimic real-world industry scenarios.",
  },
  {
    icon: <FiUsers />,
    title: "Personalized Guidance",
    desc: "1-on-1 mentorship to ensure you never feel lost in the crowd.",
  },
  {
    icon: <FiTrendingUp />,
    title: "Career Growth",
    desc: "We don't just teach; we help you land your dream role.",
  },
  {
    icon: <FiAward />,
    title: "Industry Exposure",
    desc: "Direct networking opportunities with top-tier professionals.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative w-full py-24 overflow-hidden bg-gray-900">
      {/* Background with Parallax-like feel */}
      <div
        className="absolute inset-0 opacity-40 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')",
        }}
      />
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight"
          >
            Why Choose <span className="text-[#ffcc18]">Us?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg"
          >
            We are more than just an institute; we are your dedicated career partner 
            bridging the gap between learning and earning.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <div className="text-[#ffcc18] text-3xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;