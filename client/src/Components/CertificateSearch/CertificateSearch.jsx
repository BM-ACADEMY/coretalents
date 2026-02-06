import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Search, ShieldCheck, Loader2 } from "lucide-react"; // Added Loader2
import { motion, AnimatePresence } from "framer-motion";

const CertificateSearch = () => {
  const [certId, setCertId] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (certId.trim()) {
      setIsLoading(true);

      // Simulate a small delay for better UX or API call
      setTimeout(() => {
        const url = `/verify-certificate/${certId.trim()}`;
        window.open(url, "_blank", "noopener,noreferrer");
        setIsLoading(false);
      }, 800); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-slate-200 text-center"
      >
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-2">Certificate Verification</h1>
        <p className="text-slate-500 mb-8">
          Enter your unique certificate ID (e.g., CTXXXXXXX) to verify and download your credential.
        </p>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Enter Certificate Number"
              className="pl-10 h-12 text-lg border-slate-200 focus:border-indigo-500"
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              disabled={isLoading} // Disable input while loading
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !certId.trim()}
            className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-lg shadow-indigo-200 flex items-center justify-center"
          >
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Verifying...</span>
              </motion.div>
            ) : (
              "Verify Certificate"
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default CertificateSearch;