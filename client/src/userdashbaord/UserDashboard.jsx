import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus, CloudUpload, FileText, Trash2, X, Loader2,
  Crown, Lock
} from "lucide-react";
import Navbar from "@/Components/layout/Navbar";
import { useAuth } from "@/Context/Authcontext";
import axiosInstance from "@/api/axiosInstance";
import { showToast } from "@/utils/customToast";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // The 'user' object now contains 'subscription' data from backend

  // --- State Management ---
  const [savedResumes, setSavedResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // --- PREMIUM & LIMIT LOGIC ---
  const FREE_LIMIT = 2;

  // Check if user is Premium (Active Subscription or Admin)
  // This relies on the Backend Controller sending { subscription: { status: 'active' } }
  const isPremium = user?.subscription?.status === 'active' || user?.role === 'admin';

  // Check if Free Limit is Reached (Not Premium AND Count >= 2)
  const isLimitReached = !isPremium && savedResumes.length >= FREE_LIMIT;

  // --- Fetch Saved Resumes ---
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await axiosInstance.get("/resume/all");
        if(res.data && res.data.data) {
           setSavedResumes(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching resumes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleUploadUnavailable = () => {
    showToast("info", "Upload feature currently unavailable");
  };

  // --- Handle Create Resume (From Modal) ---
  const handleCreateResume = async () => {
    if (!resumeTitle.trim()) {
      showToast("error", "Please enter a resume name");
      return;
    }

    setIsCreating(true);
    try {
      const res = await axiosInstance.post("/resume/create", {
        title: resumeTitle,
        personalInfo: { fullName: user?.name || "" }
      });

      if (res.data && res.data.data._id) {
        showToast("success", "Resume created successfully!");
        setIsModalOpen(false);
        navigate(`/user/create-resume/${res.data.data._id}`);
      }
    } catch (error) {
      console.error("Creation error", error);

      // --- BACKEND SAFETY CHECK ---
      // If user bypassed frontend check, backend sends 403
      if (error.response && error.response.status === 403 && error.response.data.isLimitReached) {
        showToast("info", "Free limit reached. Please upgrade to create more.");
        setIsModalOpen(false);
        navigate("/user/plans");
        return;
      }

      showToast("error", "Failed to create resume");
    } finally {
      setIsCreating(false);
    }
  };

  // --- Handle Delete Resume ---
  const handleDeleteResume = async (id, e) => {
    e.stopPropagation(); // Stop click from triggering card navigation
    if(!window.confirm("Are you sure you want to delete this resume?")) return;

    try {
      await axiosInstance.delete(`/resume/${id}`);
      setSavedResumes(prev => prev.filter(r => r._id !== id));
      showToast("success", "Resume deleted");
    } catch (error) {
      showToast("error", "Failed to delete");
    }
  };

  // --- Handle Click on "Create New" Card ---
  const handleCreateCardClick = () => {
    if (isLimitReached) {
      // If limit reached, direct to Pricing
      navigate("/user/plans");
      showToast("info", "Upgrade to create unlimited resumes!");
    } else {
      // If allowed, open name input modal
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-32 pb-12 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* --- HEADER --- */}
          <div className="mb-8 text-left flex flex-col sm:flex-row justify-between sm:items-end gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name}</h1>
              <p className="text-gray-500 mt-2">Manage your professional resumes</p>
            </div>

            {/* Show Limit Counter if User is NOT Premium */}
            {!isPremium && (
              <div className="text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2">
                <span>Free Plan Usage:</span>
                <span className={`${isLimitReached ? 'text-red-500' : 'text-green-600'} font-bold text-lg`}>
                  {savedResumes.length}
                </span>
                <span className="text-gray-400">/ {FREE_LIMIT}</span>
              </div>
            )}

            {/* Show Premium Badge if User IS Premium */}
            {isPremium && (
              <div className="bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 px-4 py-2 rounded-lg shadow-sm font-bold flex items-center gap-2">
                <Crown size={18} fill="currentColor" /> Premium Member
              </div>
            )}
          </div>

          {/* --- TOP ACTIONS --- */}
          <div className="flex flex-wrap justify-start items-start gap-8 mt-8">

            {/* CARD 1: Create Resume (Dynamic Appearance) */}
            <div
              onClick={handleCreateCardClick}
              className={`group flex flex-col items-center justify-center w-64 h-64 p-8 bg-white rounded-3xl border-2 border-dashed cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-sm hover:shadow-xl
                ${isLimitReached
                  ? 'border-amber-300 hover:border-amber-500'
                  : 'border-indigo-200 hover:border-indigo-500'}`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300
                ${isLimitReached
                  ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                  : 'bg-gradient-to-br from-blue-400 to-indigo-600'}`}
              >
                {isLimitReached ? (
                  <Crown className="w-8 h-8 text-white" strokeWidth={2.5} />
                ) : (
                  <Plus className="w-8 h-8 text-white" strokeWidth={2.5} />
                )}
              </div>
              <h3 className={`text-lg font-semibold transition-colors text-center
                ${isLimitReached ? 'text-gray-800 group-hover:text-amber-600' : 'text-gray-700 group-hover:text-indigo-600'}`}>
                {isLimitReached ? "Upgrade to Create" : "Create New Resume"}
              </h3>
              <p className="text-xs text-gray-400 mt-2 text-center">
                {isLimitReached ? `Limit reached (${FREE_LIMIT}/${FREE_LIMIT})` : "Start from scratch"}
              </p>
            </div>

            {/* CARD 2: Upload Existing (Static) */}
            <div
              onClick={handleUploadUnavailable}
              className="group flex flex-col items-center justify-center w-64 h-64 p-8 bg-white rounded-3xl border-2 border-dashed border-purple-200 cursor-pointer hover:border-purple-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
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

          {/* --- SAVED RESUMES GRID --- */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-indigo-600" /> My Resumes
            </h2>

            {isLoading ? (
              <div className="flex items-center gap-2 text-gray-500">
                 <Loader2 className="animate-spin w-5 h-5"/> Loading...
              </div>
            ) : savedResumes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {savedResumes.map((resume, index) => {

                  // LOCKING LOGIC:
                  // If user is NOT premium AND this is the 3rd (index 2) resume or higher...
                  // Lock it visually.
                  const isLocked = !isPremium && index >= FREE_LIMIT;

                  return (
                    <div
                      key={resume._id}
                      onClick={() => {
                        if (isLocked) {
                          navigate("/user/plans");
                          showToast("info", "Unlock this resume by upgrading!");
                        } else {
                          navigate(`/user/create-resume/${resume._id}`);
                        }
                      }}
                      className={`relative group bg-white rounded-xl shadow-sm border p-5 transition-all cursor-pointer
                        ${isLocked
                          ? 'border-gray-200 opacity-80 hover:border-amber-300'
                          : 'border-gray-100 hover:shadow-md hover:border-indigo-200'}`}
                    >
                      {/* LOCKED OVERLAY */}
                      {isLocked && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center rounded-xl transition-opacity group-hover:bg-white/40">
                          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-2 shadow-sm">
                            <Lock className="w-6 h-6 text-amber-600" />
                          </div>
                          <span className="text-xs font-bold text-amber-700 uppercase tracking-wide bg-amber-100 px-3 py-1 rounded-full">
                            Premium Lock
                          </span>
                        </div>
                      )}

                      {/* RESUME PREVIEW (Placeholder or Image) */}
                      <div className="h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        {resume.personalInfo?.image ? (
                          <img src={resume.personalInfo.image} alt="resume" className="w-full h-full object-cover opacity-80" />
                        ) : (
                          <FileText className="text-gray-300 w-12 h-12" />
                        )}
                      </div>

                      <div className="flex justify-between items-start">
                        <div className="overflow-hidden">
                          <h4 className="font-semibold text-gray-800 truncate pr-2" title={resume.title}>
                            {resume.title || resume.personalInfo?.fullName || "Untitled Resume"}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1">
                            Edited: {new Date(resume.updatedAt).toLocaleDateString()}
                          </p>
                        </div>

                        {/* DELETE BUTTON (Hide if Locked to prevent accidental deletion of locked content) */}
                        {!isLocked && (
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => handleDeleteResume(resume._id, e)}
                              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                              title="Delete Resume"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-gray-500 italic">No saved resumes found. Create one above!</div>
            )}
          </div>

        </div>
      </div>

      {/* --- CREATE RESUME MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">Name your Resume</h2>
            <p className="text-gray-500 mb-6 text-sm">Give your resume a name to help you identify it later.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resume Name</label>
                <input
                  type="text"
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                  placeholder="e.g. Software Engineer Role, Google App"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateResume()}
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateResume}
                  disabled={isCreating}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors disabled:opacity-70 flex items-center gap-2"
                >
                  {isCreating && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isCreating ? "Creating..." : "Create Resume"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDashboard;
