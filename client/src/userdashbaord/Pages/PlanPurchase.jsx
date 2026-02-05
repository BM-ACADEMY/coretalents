import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Loader2, Crown, Zap, ShieldCheck } from 'lucide-react';
import axiosInstance from '@/api/axiosInstance';
import { showToast } from '@/utils/customToast';
import { useAuth } from "@/Context/Authcontext";

const PlanPurchase = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const navigate = useNavigate();

  const { checkUser } = useAuth(); //

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axiosInstance.get('/plans');
        setPlans(res.data.data || []);
      } catch (error) {
        showToast('error', 'Failed to load plans');
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBuy = async (plan) => {
    setProcessingId(plan._id);

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      showToast('error', 'Razorpay SDK failed to load');
      setProcessingId(null);
      return;
    }

    try {
      const orderRes = await axiosInstance.post('/payment/create-order', { planId: plan._id });
      const { order } = orderRes.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Resume Builder",
        description: `Upgrade to ${plan.name}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await axiosInstance.post('/payment/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              showToast('success', 'Payment Successful! Activating plan...');
              try {
                if (checkUser) {
                  await checkUser();
                }
              } catch (refreshError) {
                console.error("Failed to refresh user data:", refreshError);
              }
              navigate('/user/dashboard');
            }
          } catch (error) {
            console.error("Verification Error:", error);
            showToast('error', 'Payment verification failed');
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: {
          color: "#4F46E5", // Updated to Indigo-600 to match new UI
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){
        showToast('error', response.error.description);
      });
      rzp.open();

    } catch (error) {
      console.error(error);
      showToast('error', 'Transaction initialization failed');
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-indigo-600 w-12 h-12" />
        <p className="text-slate-500 font-medium">Loading premium plans...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-[#F8FAFC] relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-indigo-100/40 blur-[100px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-6">
            <Crown size={16} /> Premium Access
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Invest in your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Career</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Unlock professional templates, unlimited resumes, and AI-powered tools to land your dream job faster.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => {
            // Logic to determine if this is the "Popular" plan
            // (Using the logic from your original code: price > 0 and price < 1000)
            const isPopular = plan.price > 0 && plan.price < 1000;
            const isFree = plan.price === 0;

            return (
              <div 
                key={plan._id} 
                className={`relative group flex flex-col h-full p-8 rounded-3xl transition-all duration-300 
                  ${isPopular 
                    ? 'bg-white shadow-2xl shadow-indigo-200 border-2 border-indigo-500 scale-105 z-10' 
                    : 'bg-white/80 backdrop-blur-sm shadow-xl border border-slate-200 hover:border-indigo-200 hover:bg-white'
                  }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                    <Zap size={14} fill="currentColor" /> MOST POPULAR
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-8">
                  <h3 className={`text-lg font-bold mb-2 ${isPopular ? 'text-indigo-600' : 'text-slate-800'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">
                      ₹{plan.price}
                    </span>
                    <span className="text-slate-400 font-medium">
                      / {plan.durationInDays} days
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-slate-100 mb-8" />

                {/* Features List */}
                <ul className="space-y-4 mb-8 flex-1">
                  {/* Hardcoded Limit Feature */}
                  <li className="flex items-start gap-3">
                    <div className={`mt-1 p-0.5 rounded-full ${isPopular ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-slate-600 text-sm">
                      Create <strong className="text-slate-900">{plan.resumeLimit}</strong> Resumes
                    </span>
                  </li>

                  {/* Dynamic Description Feature */}
                  {plan.description && (
                    <li className="flex items-start gap-3">
                       <div className={`mt-1 p-0.5 rounded-full ${isPopular ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="text-slate-600 text-sm">{plan.description}</span>
                    </li>
                  )}
                  
                  {/* Placeholder Features to make the card look fuller */}
                  <li className="flex items-start gap-3">
                     <div className={`mt-1 p-0.5 rounded-full ${isPopular ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-slate-600 text-sm">PDF Downloads</span>
                  </li>
                  {!isFree && (
                     <li className="flex items-start gap-3">
                     <div className={`mt-1 p-0.5 rounded-full ${isPopular ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-slate-600 text-sm">Premium Templates</span>
                  </li>
                  )}
                </ul>

                {/* Action Button */}
                <button
                  onClick={() => handleBuy(plan)}
                  disabled={processingId === plan._id}
                  className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2
                    ${isPopular 
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02]' 
                      : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg'
                    }
                    ${processingId === plan._id ? 'opacity-75 cursor-not-allowed' : ''}
                  `}
                >
                  {processingId === plan._id ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {isFree ? "Get Started Free" : "Upgrade Now"}
                      {!isFree && <ShieldCheck size={18} />}
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
        
  

      </div>
    </div>
  );
};

export default PlanPurchase;