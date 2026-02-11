import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck } from 'lucide-react';
// Make sure this path matches your project structure exactly
import bgImage from '@/assets/vector/blog_bg_1.jpg'; 
import Certificate from '@/assets/certificate.png'; 

const IssuedCertificates = () => {
  return (
    <section 
      className="relative py-24 bg-cover bg-center bg-no-repeat"
      // formatting the imported image into a CSS url string
      style={{  backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.2), rgba(248, 250, 252, 0.1)), url(${bgImage})`, }}
    >
      {/* Dark Overlay so text is readable on top of the image */}
      <div className="absolute inset-0"></div>

      {/* Content Container - z-10 puts it above the overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Left Side: Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-5xl font-bold tracking-tight text-black mb-6">
              Issued Certificates
            </h2>
            
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              We take pride in certifying top talents. Every certificate we issue is 
              digitally signed and verifiable. Ensure the authenticity of a credential 
              by using our secure verification tool below.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start">
              <Link to="/verification">
                <button className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-blue-500/50">
                  <BadgeCheck className="w-6 h-6 mr-2" />
                  Verify Certificate
                </button>
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-10 pt-8 border-t border-gray/10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 text-sm font-medium text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-900/20"></div>
                Official Credential
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400 shadow-lg shadow-blue-900/20"></div>
                Secure Lookup
              </div>
            </div>
          </div>

          {/* Right Side: Static Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-xl bg-white p-2 shadow-2xl shadow-black/30 border border-white/10">
              
              {/* Browser Header Visual */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-white rounded-t-lg">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                {/* Fake URL bar */}
                <div className="ml-2 flex-1 h-2 bg-slate-100 rounded-full max-w-[200px]"></div>
              </div>
              
              {/* Certificate Image - Replace src with your real certificate screenshot */}
              <img
                src={Certificate}
                alt="Certificate Verification"
                className="w-full h-auto rounded-b-lg block"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IssuedCertificates;