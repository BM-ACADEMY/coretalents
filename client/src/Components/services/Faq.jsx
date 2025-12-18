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
      answer: "We provide end-to-end recruitment, staffing, and HR support services including permanent hiring, contract staffing, bulk hiring, and executive search."
    },
    {
      question: "How do you ensure the quality of candidates?",
      answer: "Our recruitment team follows a detailed screening and verification process that includes skill assessment, background checks, and interview evaluations before shortlisting candidates."
    },
    {
      question: "Can Core Talents handle bulk or mass hiring projects?",
      answer: "Yes. We have a dedicated team and network to manage large-scale hiring efficiently across multiple roles and locations."
    },
    {
      question: "What industries do you specialize in?",
      answer: "We cater to diverse industries including IT, Non-IT, Manufacturing, BPO, Retail, Finance, and more — customizing our approach based on client needs."
    },
    {
      question: "How long does it take to fill a position?",
      answer: "The hiring timeline depends on the job role and requirements. However, our goal is always to deliver qualified candidates quickly without compromising on quality."
    }
  ];

  return (
    <section className="py-20 bg-[#f8f8f8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-4 border border-indigo-100">
            Support & Details
          </span>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Everything you need to know about our recruitment process and services.
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