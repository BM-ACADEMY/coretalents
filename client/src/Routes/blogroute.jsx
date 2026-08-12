import React from 'react'
import { Routes, Route } from "react-router-dom";
import BlogDetails from "@/Components/Blog/BlogDetails";
import BlogList from '@/Components/Blog/BlogLis';
import CoreTalentsPondicherryBlog from "@/Components/Blog/coretalents-pondicherry_blog";
import CoreTalentsHireFreshersTamilNadu from "@/Components/Blog/coretalents-hire-freshers-tamil-nadu";
import CoreTalentsRecruitmentFeesCostIndia from "@/Components/Blog/coretalents-recruitment-fees-cost-india";
import PayAfterHireRecruitmentExplained from "@/Components/Blog/pay-after-hire-recruitment-explained";
import HowToReduceTimeToHireForSmallBusiness from "@/Components/Blog/how-to-reduce-time-to-hire-for-small-business";
import StaffingSolutionsForStartupsInTamilNadu from "@/Components/Blog/staffing-solutions-for-startups-in-tamil-nadu";
import HireDigitalMarketingStaff from "@/Components/Blog/hire-digital-marketing-staff";
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
        <Route path="pay-after-hire-recruitment" element={<PayAfterHireRecruitmentExplained />} />
        <Route path="reduce-time-to-hire" element={<HowToReduceTimeToHireForSmallBusiness />} />
        <Route path="staffing-solutions-tamil-nadu" element={<StaffingSolutionsForStartupsInTamilNadu />} />
        <Route path="hire-digital-marketing-staff" element={<HireDigitalMarketingStaff />} />
        <Route path=":slug" element={<BlogDetails />} />
      </Routes>
    </div>
  )
}

export default Blogroute;
