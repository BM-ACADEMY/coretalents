import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom"; // 1. Import Link

import PermenentStaffingImage from "@/assets/Services/permanent-BR1WH0YX.jpg";
import ContractStaffingImage from "@/assets/Services/handshale-C0bGMN43.jpg";
import HROutsourcingImage from "@/assets/Services/hr-uCbeigW9.jpg";
import CampusHiringImage from "@/assets/Services/hiring-D04oipYD.png";

const ServicesSection = () => {
  // Service Data
  const services = [
    {
      id: 1,
      title: "Permanent Staffing",
      description:
        "Top-tier talent that fits your culture and stays long-term.",
      image: PermenentStaffingImage,
    },
    {
      id: 2,
      title: "Contract Staffing",
      description:
        "Deploy vetted talent in 48 hours. We handle payroll & compliance.",
      image: ContractStaffingImage,
    },
    {
      id: 3,
      title: "HR Outsourcing",
      description:
        "Payroll, compliance & onboarding — handled with 99.9% accuracy.",
      image: HROutsourcingImage,
    },
    {
      id: 4,
      title: "Campus & Bulk Hiring",
      description: "Hire pre-trained graduates at scale. No training needed.",
      image: CampusHiringImage,
    },
  ];

  // Active service (image + title + description)
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <div className="min-h-screen mt-20 bg-black font-sans selection:bg-purple-500 selection:text-white overflow-hidden relative">
      {/* Shape Section */}
      <div className="bg-[#f8f8f8] w-full lg:w-[75%] rounded-br-[80px] lg:rounded-br-[400px] pt-16 pb-24 px-6 md:px-16 relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block bg-purple-100 text-purple-700 font-semibold px-4 py-2 rounded-full text-sm mb-6">
            Our Best Service For You
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight tracking-tight">
            Provide The Best Service With Out Of The Box Ideas
            <span className="text-purple-600">!</span>
          </h1>
        </div>
      </div>

      {/* Button */}
      <div className="hidden lg:block absolute top-12 right-26 z-20">
           
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column – Service List */}
        <div className="space-y-6">
          {services.map((service) => (
            <Link
              to="/contact" // 2. Link destination
              key={service.id}
              onMouseEnter={() => setActiveService(service)} 
              // 3. Added 'block' class to ensure it renders correctly as a container
              className="block group border hover:bg-[#3a39393d] border-gray-800 rounded-3xl p-6 md:p-8 hover:border-gray-600 transition-colors cursor-pointer"
            >
              <div className="group transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    {/* Number Circle */}
                    <div
                      className="
          w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center
          text-gray-400 
          transition-all duration-300 ease-out
          group-hover:text-white 
          group-hover:border-[#6b61fc]
        "
                    >
                      {service.id}
                    </div>

                    {/* Heading With Smooth Transition */}
                    <h3
                      className="
          text-xl md:text-2xl font-bold text-white
          transition-all duration-300 ease-out
          group-hover:text-[#6b61fc]
        "
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Arrow Box */}
                  <div
                    className="
        w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center
        text-gray-500 
        transition-all duration-300 ease-out
        group-hover:text-[#6b61fc]
        group-hover:border-[#6b61fc]
      "
                  >
                    <ArrowUpRight
                      size={20}
                      className="
          transition-transform duration-500 ease-out
          group-hover:rotate-45
        "
                    />
                  </div>
                </div>
              </div>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed pl-14">
                {service.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Right Column – Image Card */}
        <div className="relative mt-10 lg:mt-0 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md  transition-transform duration-500 ease-out">
            <div className="bg-gray-200 rounded-4xl overflow-hidden shadow-2xl relative">
              {/* Service Image */}
              <img
                key={activeService.image}
                src={activeService.image}
                alt="Service preview"
                className="w-full h-[400px] object-cover animate-in fade-in duration-500"
              />

              {/* Bottom Info Card */}
              <div className="absolute bottom-0 right-0 p-6 bg-white/90 backdrop-blur-sm w-full rounded-t-[2rem]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-full bg-yellow-400" />
                  <div className="h-8 w-8 rounded-full bg-red-400 -ml-4" />
                  <div className="h-8 w-8 rounded-full bg-blue-400 -ml-4" />
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  {activeService.title}
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  {activeService.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;