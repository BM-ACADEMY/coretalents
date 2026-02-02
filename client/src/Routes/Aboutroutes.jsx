import About from '@/Components/About/About'
import AboutCoreTalents from '@/Components/About/Aboutcontent'
import CompanyStatusSection from '@/Components/Homepage/CompanyStatusSection'
import React from 'react'
import { Helmet } from "react-helmet";

const Aboutroutes = () => {
  return (
    <div>
      <Helmet>
        <title>About Core Talents | AI-Powered Recruitment Company in India</title>
        <meta
          name="description"
          content="Core Talents is an AI-powered recruitment company helping businesses hire high-fit candidates faster through technology-driven hiring."
        />
      </Helmet>

      <About/>
      <AboutCoreTalents/>
      <CompanyStatusSection/>
    </div>
  )
}

export default Aboutroutes
