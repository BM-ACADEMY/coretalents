import FaqSection from '@/Components/services/Faq'
import HiringSection from '@/Components/services/HiringSection'
import Industries from '@/Components/services/Industries'
import ServicesSection from '@/Components/services/Servciescard'
import React from 'react'
import { Helmet } from 'react-helmet'

const Servicesroute = () => {
  return (
    <div>
          <Helmet>
        <title>AI-Powered Recruitment Services Across Industries | Core Talents</title>
        <meta
          name="description"
          content="Core Talents provides AI-powered recruitment solutions across multiple industries including IT, Non-IT, and operations roles, helping you hire faster with reduced risk."
        />
      </Helmet>
    <ServicesSection/>
    <HiringSection/>
    <Industries/>
    <FaqSection/>
      
    </div>
  )
}

export default Servicesroute
