import React from 'react';

const ContactUsSection = () => {
  return (
    // The main container now uses a subtle background design
    // 1. bg-white: Sets the base color to white.
    // 2. [background-image:radial-gradient...]: This is an Arbitrary Value using a subtle radial gradient.
    // 3. opacity-100: Ensure the gradient is visible over the white background.
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-white" 
         style={{
           backgroundImage: 'radial-gradient(#fef3c7 1px, transparent 1px)', // amber-100 dots
           backgroundSize: '20px 20px', 
           opacity: 1
         }}>
      
      {/* --- Header Section --- */}
      <div className="max-w-3xl mx-auto text-center mt-21 mb-12">
        <h2 className="text-5xl font-extrabold text-gray-800">Contact <span className="text-[#ffc700]">Us</span></h2>
        <p className="mt-4 text-xl text-gray-600">
          We'd love to hear from you! Get in touch with us for any queries, support, or collaboration opportunities.
        </p>
      </div>

      {/* --- Main Content Layout --- */}
      <div className="max-w-6xl mx-auto grid grid-cols-1  md:grid-cols-2 gap-10">
        
        {/* --- Get in Touch Card (Left) --- */}
        {/* Using z-10 and a strong shadow helps the card stand out over the patterned background */}
        <div className="bg-white rounded-2xl border border-gray-300 shadow-2xl p-10 space-y-8 z-10 transition duration-300 ">
          <h3 className="text-3xl font-bold text-gray-900">Get in Touch</h3>
          <p className="text-gray-600">
            Have questions or want to work with us? Reach out and we'll get back to you quickly.
          </p>
          
          <div className="space-y-8">
            
            {/* Address */}
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0 p-3 bg-yellow-100 rounded-full text-yellow-600">
                {/* Location Icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <p className="text-lg text-gray-800 pt-1">
                252, 2nd floor, M G ROAD, KOTTAKUPPAM, Vanur, Tamil Nadu 605104
              </p>
            </div>
            
            {/* Phone Number */}
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0 p-3 bg-yellow-100 rounded-full text-yellow-600">
                {/* Phone Icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.79 21 3 14.21 3 6V5z"></path></svg>
              </div>
              <p className="text-lg text-gray-800 pt-1">
                +91 9944509441
              </p>
            </div>
            
            {/* Email Addresses */}
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0 p-3 bg-yellow-100 rounded-full text-yellow-600">
                {/* Mail Icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <p className="text-lg text-gray-800 pt-1">
                <a href="mailto:admin@abmgroups.org" className="text-[#1e2939] hover:text-yellow-800 font-medium">admin@abmgroups.org</a>
              </p>
            </div>
            
          </div>
        </div>

        {/* --- Map Placeholder (Right) --- */}
        <div className="w-full h-96 md:h-full bg-gray-200 rounded-2xl shadow-2xl overflow-hidden relative">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.331497623447!2d79.835205314278!3d11.968825984379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a53638d212031cd%3A0x4c19741920c452b4!2sCore%20Talents!5e0!3m2!1sen!2sin!4v1734000000000!5m2!1sen!2sin"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Core Talents - Kottakuppam, Tamil Nadu"
    className="absolute inset-0"
  ></iframe>

</div>

      </div>
      
    </div>
  );
};

export default ContactUsSection;