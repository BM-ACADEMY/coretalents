import React, { useState } from 'react';
import { Plus, Minus, CheckCircle, Sparkles } from 'lucide-react';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // Set 0 to have the first one open by default, or null for all closed

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What services does Core Talents offer to companies?",
      answer: "We provide end-to-end recruitment solutions including permanent hiring, contract staffing, bulk hiring, executive search, and industry-specific talent acquisition."
    },
    {
      question: "How do you ensure the quality of candidates?",
      answer: "We use AI-assisted screening tools combined with expert recruiter evaluation. Every candidate is skill-assessed, reference-verified, and matched based on role requirements and company culture."
    },
    {
      question: "Can Core Talents handle bulk or mass hiring projects?",
      answer: "Yes. Our structured sourcing process and dedicated hiring teams allow us to manage large-scale recruitment drives efficiently while maintaining quality standards."
    },
    {
      question: "What industries do you specialize in?",
      answer: "We specialize in IT, construction, healthcare, retail, logistics, manufacturing, and education — delivering industry-specific talent tailored to business needs."
    },
    {
      question: "How long does it take to fill a position?",
      answer: "Hiring timelines vary based on role complexity and industry. However, our structured screening process helps reduce time-to-hire while ensuring quality placements."
    },
    {
      question: "Do you offer replacement guarantees?",
      answer: "Yes, we offer a replacement guarantee period to ensure client satisfaction and long-term hiring success."
    }
  ];

  return (
    <section className="py-20 bg-[#f8f8f8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-4 border border-indigo-100">
            FAQs
          </span>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our hiring process, industries, timelines, and recruitment solutions.
          </p>
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`group rounded-2xl transition-all duration-300 ${
                  isOpen 
                    ? 'bg-gray-50 shadow-sm border border-gray-200/60' 
                    : 'bg-white border border-gray-100 hover:border-indigo-100 hover:shadow-md'
                }`}
              >
                <button
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className={`font-semibold text-lg pr-8 transition-colors duration-200 ${
                    isOpen ? 'text-indigo-700' : 'text-gray-800 group-hover:text-indigo-600'
                  }`}>
                    {faq.question}
                  </span>
                  <span className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${
                    isOpen ? 'bg-indigo-600 text-white rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                  }`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </span>
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;