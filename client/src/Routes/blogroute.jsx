import React from 'react'
import { Routes, Route } from "react-router-dom";
import BlogDetails from "@/Components/Blog/BlogDetails";
import BlogList from '@/Components/Blog/BlogLis';

const Blogroute = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/:slug" element={<BlogDetails />} />
    </Routes>
  )
}

export default Blogroute;