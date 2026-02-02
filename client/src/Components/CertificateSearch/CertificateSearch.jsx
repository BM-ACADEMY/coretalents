import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Search, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const CertificateSearch = () => {
  const [certId, setCertId] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (certId.trim()) {
      // Navigate to the public certificate view with the entered ID/Number
      navigate(`/verify-certificate/${certId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100 text-center"
      >
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-2">Certificate Verification</h1>
        <p className="text-slate-500 mb-8">
          Enter your unique certificate ID (e.g., CT2026001) to verify and download your credential.
        </p>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Enter Certificate Number"
              className="pl-10 h-12 text-lg border-slate-200 focus:border-indigo-500"
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-lg shadow-indigo-200"
          >
            Verify Certificate
          </Button>
        </form>
      </motion.div>

      <p className="mt-8 text-sm text-slate-400">
        &copy; {new Date().getFullYear()} Core Talents. All rights reserved.
      </p>
    </div>
  );
};

export default CertificateSearch;
