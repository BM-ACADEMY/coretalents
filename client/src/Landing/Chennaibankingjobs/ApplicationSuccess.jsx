import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle, Home, Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ApplicationSuccess = () => {
  const navigate = useNavigate();
  const whatsappUrl = "https://whatsapp.com/channel/0029VbB8SEVKmCPXZrSy4q2j";

  // ✅ Google Analytics + WhatsApp Auto Open
  useEffect(() => {

    // ===== Google Analytics Script Load =====
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-XZY4TK63EJ";
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XZY4TK63EJ');
    `;
    document.head.appendChild(script2);

    // ===== WhatsApp Auto Open =====
    const timer = setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1500);

    return () => clearTimeout(timer);

  }, []);

  return (
    <div className="min-h-screen bg-violet-50 py-35 flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl text-center border border-slate-100"
      >
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6 shadow-sm">
          <CheckCircle2 size={40} />
        </div>
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Application Submitted Successfully
        </h2>
        
        {/* Description */}
        <p className="text-slate-500 mb-6 leading-relaxed">
          Thank you for applying to{" "}
          <span className="font-semibold text-slate-700">
            Core Talents – Chennai Banking Client Support Hiring
          </span>.
          <br/><br/>
          Our screening team will contact shortlisted candidates within{" "}
          <span className="font-bold text-slate-800">
            24–48 hours
          </span>.
        </p>

        {/* Instructions */}
        <div className="bg-slate-50 p-5 rounded-2xl mb-8 text-sm text-slate-600 text-left border border-slate-200">
          <p className="font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">
            Meanwhile:
          </p>

          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Check size={16} className="text-green-500 mt-1" />
              <span>Keep your phone reachable</span>
            </li>

            <li className="flex items-start gap-2">
              <Check size={16} className="text-green-500 mt-1" />
              <span>Prepare a brief self-introduction</span>
            </li>

            <li className="flex items-start gap-2">
              <Check size={16} className="text-green-500 mt-1" />
              <span>Follow our updates</span>
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="space-y-4">

          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1">
            Join Our Official WhatsApp Channel <ArrowRight size={12} />
          </p>
            
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-100 transform hover:scale-[1.02]"
          >
            <MessageCircle size={22} />
            Join WhatsApp Channel
          </a>

          <button 
            onClick={() => navigate('/chennai-banking-jobs')}
            className="w-full py-3 text-slate-400 font-medium hover:text-slate-600 flex items-center justify-center gap-2 transition-colors"
          >
            <Home size={16} />
            Back to Home
          </button>

        </div>
      </motion.div>
    </div>
  );
};

export default ApplicationSuccess;
