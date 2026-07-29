import React from 'react'
import { Routes, Route } from "react-router-dom";
import BlogDetails from "@/Components/Blog/BlogDetails";
import BlogList from '@/Components/Blog/BlogLis';
import CoreTalentsPondicherryBlog from "@/Components/Blog/coretalents-pondicherry_blog";
import CoreTalentsHireFreshersTamilNadu from "@/Components/Blog/coretalents-hire-freshers-tamil-nadu";
import CoreTalentsRecruitmentFeesCostIndia from "@/Components/Blog/coretalents-recruitment-fees-cost-india";
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
        <Route index element={<BlogList />} />
        <Route path="coretalents-pondicherry" element={<CoreTalentsPondicherryBlog />} />
        <Route path="coretalents-hire-freshers-tamil-nadu" element={<CoreTalentsHireFreshersTamilNadu />} />
        <Route path="coretalents-recruitment-fees-cost-india" element={<CoreTalentsRecruitmentFeesCostIndia />} />
        <Route path=":slug" element={<BlogDetails />} />
      </Routes>
    </div>
  )
}

export default Blogroute;
