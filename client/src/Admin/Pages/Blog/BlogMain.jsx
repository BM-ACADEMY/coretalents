import React, { useState } from "react";
import BlogCreate from "./Blog";
import BlogList from "./BlogList";
import { PlusCircle, List } from "lucide-react";

const BlogMain = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header & Tabs */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("create")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
              activeTab === "create" ? "bg-white shadow text-blue-600 font-bold" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <PlusCircle size={18} /> Create New
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
              activeTab === "list" ? "bg-white shadow text-blue-600 font-bold" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <List size={18} /> All Blogs
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div>
        {activeTab === "create" && <BlogCreate switchToView={() => setActiveTab("list")} />}
        {activeTab === "list" && <BlogList />}
      </div>
    </div>
  );
};

export default BlogMain;