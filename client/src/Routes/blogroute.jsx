import React from 'react'
import { Routes, Route } from "react-router-dom";
import BlogDetails from "@/Components/Blog/BlogDetails";
import BlogList from '@/Components/Blog/BlogLis';
import { Helmet } from 'react-helmet'


const Blogroute = () => {
  return (
    <div>

       <Helmet>
        <title>Recruitment & Hiring Insights Blog | Core Talents</title>
        <meta
          name="description"
          content="Read expert insights on recruitment, AI hiring, staffing trends, and career growth from Core Talents."
        />
      </Helmet>

      
      <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/:slug" element={<BlogDetails />} />
    </Routes>
    </div>
  )
}

export default Blogroute;