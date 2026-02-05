import Contact from '@/Components/Contact/Contact'
import React from 'react'
import { Helmet } from 'react-helmet'


const Contactroutes = () => {
  return (
    <div>

       <Helmet>
        <title>Contact Core Talents | Hire Talent or Apply for Jobs</title>
        <meta
          name="description"
          content="Get in touch with Core Talents for AI-powered recruitment solutions or job placement support. Speak with our team today."
        />
      </Helmet>
    <Contact/>
      
    </div>
  )
}

export default Contactroutes
