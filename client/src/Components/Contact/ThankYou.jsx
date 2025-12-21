import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion"; // 1. Import Framer Motion

const ThankYou = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Timer for the text countdown number
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Timer to navigate back
    const redirectTimeout = setTimeout(() => {
      navigate(-1); // Go back to previous page
    }, 3000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Thank You | Core Talents</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">

        {/* Main Card with Entry Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="bg-white p-10 md:p-14 rounded-3xl shadow-2xl text-center max-w-lg w-full border border-gray-100 overflow-hidden relative"
        >

          {/* Icon Animation: Scale up and bounce */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="bg-green-100 p-4 rounded-full"
            >
              <CheckCircle className="w-16 h-16 text-green-600" strokeWidth={2.5} />
            </motion.div>
          </div>

          {/* Text Animation: Fade in and slide up */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Thank You!
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We have successfully received your enquiry. Our team will get back to you shortly.
            </p>
          </motion.div>

          {/* Progress Bar Animation: Smooth fill over 3 seconds */}
          <div className="w-full bg-gray-100 rounded-full h-2 mb-6 overflow-hidden relative">
             <motion.div
               className="bg-[#f0b104] h-full rounded-full"
               initial={{ width: "0%" }}
               animate={{ width: "100%" }}
               transition={{ duration: 3, ease: "linear" }}
             />
          </div>

          {/* Countdown Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-gray-400 font-medium"
          >
            Redirecting you back in <span className="text-[#f0b104] font-bold text-base">{countdown}</span> seconds...
          </motion.p>

        </motion.div>
      </div>
    </>
  );
};

export default ThankYou;
