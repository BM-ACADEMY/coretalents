import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import axiosInstance from "@/api/axiosInstance";
import BackgroundImage from "@/assets/other/map.png";

const FixedImage =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axiosInstance.get("/review");
        setTestimonials(response.data.data || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch testimonials");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const handleNext = () => {
    if (!loading)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    if (!loading)
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentData = testimonials[currentIndex] || {};

  return (
    <div className="w-full min-h-[700px] bg-white flex items-center justify-center p-6 md:p-16 font-sans text-slate-800 overflow-hidden relative">
      
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img src={BackgroundImage} alt="Background"
          className="w-full h-full object-cover opacity-[0.04]" />
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-40 items-center">
        
        {/* LEFT FIXED IMAGE */}
        <div className="relative flex justify-center lg:justify-end px-4 lg:px-0">
          <div className="relative w-full max-w-[400px] aspect-[4/5] md:aspect-square lg:aspect-[4/4.5]">

            <div className="absolute -top-8 -left-8 md:-top-10 md:-left-12 flex gap-2 z-0 mix-blend-multiply opacity-90">
              <div className="w-8 h-16 md:w-10 md:h-20 bg-indigo-200 skew-x-[-12deg] rounded-sm"></div>
              <div className="w-8 h-16 md:w-10 md:h-20 bg-indigo-200 skew-x-[-12deg] rounded-sm mt-4"></div>
            </div>

            <div className="absolute inset-0 rounded-[3rem] border-[2px] border-indigo-300 z-10 transform skew-x-[-6deg] mix-blend-multiply"></div>

            <div className="absolute inset-4 rounded-[2.5rem] overflow-hidden z-20 bg-indigo-50">
              <img src={FixedImage} alt="Customer"
                className={`w-full h-full object-cover transition-all duration-300`} />
              <div className="absolute inset-0 bg-indigo-500/5 mix-blend-overlay pointer-events-none"></div>
            </div>

            <div className="absolute bottom-4 left-4 w-3/4 h-3/4 bg-indigo-100 rounded-[3rem] -z-10 transform translate-y-4 -translate-x-4 mix-blend-multiply opacity-60"></div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col items-start space-y-8">
          <div className="bg-indigo-50 text-indigo-600 px-6 py-2 rounded-full text-sm font-bold tracking-wide">
            Testimonials
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            What Our Customers Say About SEO Agency?
          </h2>

          {/* Text Skeleton */}
          {loading ? (
            <div className="w-full h-20 bg-slate-200 rounded-lg animate-pulse"></div>
          ) : (
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium animate-fadeIn">
              "{currentData.content}"
            </p>
          )}

          {/* Name + Work */}
          <div className="w-full">
            {loading ? (
              <>
                <div className="w-40 h-6 bg-slate-200 rounded-md animate-pulse"></div>
                <div className="w-28 h-4 bg-slate-200 rounded-md animate-pulse mt-2"></div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-slate-900 animate-fadeIn">{currentData.name}</h3>
                <p className="text-slate-500 text-sm uppercase tracking-wide mt-1 animate-fadeIn">{currentData.work}</p>
              </>
            )}
          </div>

          {/* Navigation */}
          <div className="w-full flex justify-end gap-4 mt-4">
            <button disabled={loading}
              onClick={handlePrev}
              className={`w-12 h-12 rounded-full text-white flex items-center justify-center transition-all ${
                loading ? "bg-slate-400 cursor-not-allowed" : "bg-slate-900 hover:bg-slate-700"
              }`}>
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button disabled={loading}
              onClick={handleNext}
              className={`w-12 h-12 rounded-full text-white flex items-center justify-center transition-all ${
                loading ? "bg-slate-400 cursor-not-allowed" : "bg-slate-900 hover:bg-slate-700"
              }`}>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Testimonial;
