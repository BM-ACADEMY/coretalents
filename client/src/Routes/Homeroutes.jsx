import { Helmet } from "react-helmet";
import About from "@/Components/Homepage/About";
import CompanyStatusSection from "@/Components/Homepage/CompanyStatusSection";
import Homepage from "@/Components/Homepage/Homepage";
import MissionVision from "@/Components/Homepage/Mission&vissison";
import ServicesSection from "@/Components/Homepage/Servcies";
import Section from "@/Components/Homepage/Trustbrand";
import WhyChooseUs from "@/Components/Homepage/Whycompany";
// import TestimonialSlider from '@/Components/Homepage/Testimonials'
import React from "react";
// import Gallerysection from '@/Components/Homepage/Gallery'
import Newspapercard from "@/Components/Homepage/Newspapercard";
import HomePopup from "@/Components/HomePopup/HomePopup";

const Homeroutes = () => {
  return (
    <div>
      <Helmet>
        <title>
          AI Recruitment Agency in India | Hire Talent in 48 Hours – Core
          Talents
        </title>
        <meta
          name="description"
          content="Hire pre-verified, job-ready candidates in just 48 hours. AI-powered recruitment with a hire-first-pay-later model."
        />
      </Helmet>

      <HomePopup />
      <Homepage />
      <Section />
      <About />
      <ServicesSection />
      <MissionVision />
      <CompanyStatusSection />
      <WhyChooseUs />
      {/* <TestimonialSlider/> */}
      {/* <Gallerysection/> */}
      <Newspapercard />
    </div>
  );
};

export default Homeroutes;
