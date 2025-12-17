import React from 'react';
import { Facebook, Twitter, Linkedin, Send, Youtube, Instagram } from 'lucide-react';
import Footeriamge from "@/assets/vector/footer.png";

const Footer = () => {
  // Data for the columns
  const links = {
    Resources: ['Blog', 'Pricing', 'FAQ', 'Events', 'Ebook & Guide'],
    Services: ['Web Page Design', 'WordPress Theme', 'Web Application', 'iOS Application', 'UX Research'],
  };

  // Auto-updating current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-[#8a8a9e] pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <img src={Footeriamge} alt="BMTechx.in Logo" className="w-72 object-contain" />
            </div>
            
            <p className="text-sm leading-relaxed mb-8 max-w-xs">
              Core Talents – AI-powered recruitment with 48-hour delivery, 95% fit rate, and hire-first-pay-later model. Trusted by 25+ corporates across India & GCC. Scale smarter, risk-free.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <SocialIcon
                icon={<Facebook size={18} />}
                href="https://www.facebook.com/people/Core-Talents/pfbid0pAwuqcAo84LaswkirMhuQJv6gLK5PX94mdsGi8tcW7DVhB3D1A8dd6GkNvKkj8u3l/?mibextid=wwXIfr&rdid=vZRb5LNSBbTEp8UD&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CYRNJ5UAY%2F%3Fmibextid%3DwwXIfr"
              />
              <SocialIcon
                icon={<Instagram size={18} />}
                href="https://www.instagram.com/core_talents/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D#"
              />
              <SocialIcon
                icon={<Linkedin size={18} />}
                href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQFMyuJQwX-DTQAAAZq2pjQoKYwBatWFJSe-pPY5RSN0dI3QYDzogwMJGCN4M0IIELVUO5quq5bxVt9bndXRs92VWAq3vRyNume6JSGnvK1G813z-Lu1QVXYuwL5ZUj04kAAGGQ=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fcore-talents-417129389%2F"
              />
              <SocialIcon
                icon={<Youtube size={18} />}
                href="https://www.youtube.com/channel/UCM542AZm8Lrf5mPmoLkO0kQ"
              />
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row sm:justify-start lg:justify-end gap-12 sm:gap-20">
            {Object.entries(links).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-white font-semibold text-lg mb-6 relative inline-block group">
                  {category}
                  {/* Animated Underline */}
                  <span className="absolute -bottom-2 left-0 w-6 h-[3px] bg-[#5D5FEF] rounded-full"></span>
                  <span className="absolute -bottom-2 left-8 w-2 h-[3px] bg-[#5D5FEF] rounded-full animate-move-line"></span>
                </h3>
                
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item}>
                      <a 
                        href="#" 
                        className="text-sm hover:text-[#5D5FEF] transition-colors duration-200 block transform hover:translate-x-1 transition-transform"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Copyright - Updated Name & Dynamic Year */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-[#8a8a9e]">
            Copyright © {currentYear} <a href='https://bmtechx.in' target='_blank' className="text-[#ebdc0c]">BMTechx.in</a>. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Custom animation for the moving line */}
      <style jsx>{`
        @keyframes move-line {
          0%   { left: 8px;  opacity: 0; }
          50%  { left: 24px; opacity: 1; }
          100% { left: 40px; opacity: 0; }
        }
        .animate-move-line {
          animation: move-line 2s infinite ease-in-out;
        }
      `}</style>
    </footer>
  );
};

// Reusable Social Icon Component
const SocialIcon = ({ icon, href, title }) => (
  <a
    href={href || "#"}
    target="_blank"
    rel="noopener noreferrer"
    title={title}
    className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-[#ffc700] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
  >
    {icon}
  </a>
);

export default Footer;