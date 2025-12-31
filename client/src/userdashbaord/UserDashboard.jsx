import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus, CloudUpload } from "lucide-react";
import Navbar from "@/Components/layout/Navbar"; 
import { useAuth } from "@/Context/Authcontext";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-32 pb-12 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Header - Aligned to Left */}
          <div className="mb-8 text-left">
            <h1 className="text-2xl font-bold text-gray-800">Welcome, {user?.name}</h1>
            <p className="text-gray-500">What would you like to do today?</p>
          </div>

          {/* Cards Container - Aligned to Start (Left) */}
          <div className="flex flex-wrap justify-start items-start gap-8 mt-12">
            
            {/* CARD 1: Create Resume */}
            <div 
              onClick={() => navigate("/user/create-resume")}
              className="group flex flex-col items-center justify-center w-50 h-60 p-8 bg-white rounded-3xl border-2 border-dashed border-indigo-200 cursor-pointer hover:border-indigo-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors text-center">
                Create Resume
              </h3>
              <p className="text-xs text-gray-400 mt-2 text-center">Start from scratch</p>
            </div>

            {/* CARD 2: Upload Existing */}
            <div 
              onClick={() => navigate("/user/upload-resume")}
              className="group flex flex-col items-center justify-center w-50 h-60  p-8 bg-white rounded-3xl border-2 border-dashed border-purple-200 cursor-pointer hover:border-purple-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                <CloudUpload className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 group-hover:text-purple-600 transition-colors text-center">
                Upload Existing
              </h3>
              <p className="text-xs text-gray-400 mt-2 text-center">Edit your current resume</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;