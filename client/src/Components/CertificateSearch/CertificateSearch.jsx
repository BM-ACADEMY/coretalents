import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Search, ShieldCheck, Loader2, CheckCircle, ExternalLink, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/api/axiosInstance";
import { showToast } from "@/utils/customToast";

const CertificateSearch = () => {
  const [certId, setCertId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setIsLoading(true);
    setCertificateData(null);

    try {
      const res = await axiosInstance.get(`/certificates/${certId.trim()}`);
      if (res.data.success) {
        setCertificateData(res.data.data);
        showToast("success", "Certificate verified successfully!");
      }
    } catch (error) {
      showToast("error", "Certificate not found. Please check the ID.");
      setCertificateData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-10 items-center justify-center p-4">
      
      <motion.div
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.4 }}
         className="w-full max-w-[480px]"
      >
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 md:p-10 border border-slate-100 text-center">
              
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                  Certificate Verification
              </h1>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                  Enter your unique certificate ID (e.g., CTXXXXXXX) to verify and download your credential.
              </p>

              <form onSubmit={handleSearch} className="space-y-5">
                  <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <Search className="h-5 w-5" />
                      </div>
                      <Input
                          placeholder="Enter Certificate Number"
                          className="pl-11 h-12 bg-white border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all rounded-xl text-slate-900 placeholder:text-slate-400"
                          value={certId}
                          onChange={(e) => {
                              setCertId(e.target.value);
                              if (certificateData) setCertificateData(null);
                          }}
                          disabled={isLoading}
                      />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !certId.trim()}
                    className="w-full h-12 text-base font-semibold bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-200 rounded-xl transition-all"
                  >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Verifying...</span>
                        </div>
                    ) : (
                        "Verify Certificate"
                    )}
                  </Button>
              </form>

              {/* RESULT SECTION */}
              <AnimatePresence>
              {certificateData && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                  <div className="mt-8 pt-6 border-t border-slate-100 text-left">
                      <div className="flex items-center gap-2 mb-4 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg w-fit mx-auto text-sm font-medium">
                          <CheckCircle className="w-4 h-4" />
                          Verified
                      </div>
                      
                      <div className="space-y-3 bg-slate-50 rounded-xl p-4">
                          <div className="flex justify-between items-center text-sm">
                              <span className="text-slate-500">Student</span>
                              <span className="font-semibold text-slate-900">{certificateData.studentName}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                              <span className="text-slate-500">Course</span>
                              <span className="font-semibold text-slate-900">{certificateData.courseName}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                              <span className="text-slate-500">Issue Date</span>
                              <span className="font-medium text-slate-900">{formatDate(certificateData.issueDate)}</span>
                          </div>
                      </div>

                      <div className="mt-5">
                        <Button 
                            onClick={() => window.open(`/verify-certificate/${certificateData._id}`, "_blank")}
                            variant="outline"
                            className="w-full h-11 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                        >
                            View Full Certificate <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                  </div>
                  </motion.div>
              )}
              </AnimatePresence>
          </div>
      </motion.div>
    </div>
  );
};

export default CertificateSearch;