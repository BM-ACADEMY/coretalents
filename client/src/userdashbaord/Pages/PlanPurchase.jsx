import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Loader2, Crown } from 'lucide-react';
import axiosInstance from '@/api/axiosInstance';
import { showToast } from '@/utils/customToast';
import { useAuth } from "@/Context/Authcontext"; // 1. Import AuthContext

const PlanPurchase = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const navigate = useNavigate();

  // 2. GET checkUser FROM CONTEXT
  // This function forces the app to re-fetch the user profile (including the new subscription)
  const { checkUser } = useAuth();

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
      // A. Create Order
      const orderRes = await axiosInstance.post('/payment/create-order', { planId: plan._id });
      const { order } = orderRes.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Resume Builder",
        description: `Upgrade to ${plan.name}`,
        order_id: order.id,
        // --- HANDLER FUNCTION ---
        handler: async function (response) {
          try {
            // B. Verify Payment
            const verifyRes = await axiosInstance.post('/payment/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              showToast('success', 'Payment Successful! Activating plan...');

              // C. REFRESH USER DATA (The Critical Step)
              // We wrap this in a separate try/catch so it doesn't trigger "Payment Failed"
              try {
                if (checkUser) {
                  await checkUser();
                } else {
                  console.warn("checkUser function missing in AuthContext");
                }
              } catch (refreshError) {
                console.error("Failed to refresh user data:", refreshError);
                // Even if refresh fails, we continue to dashboard
              }

              // D. Navigate
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
          color: "#3b82f6",
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

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600 w-10 h-10" /></div>;

  return (
    <div className="min-h-screen pt-32 bg-slate-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Upgrade Your Plan</h1>
          <p className="text-slate-600">Unlock more resumes and premium features</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-xl transition-shadow relative overflow-hidden flex flex-col">
              {plan.price > 0 && plan.price < 1000 && (
                 <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                   POPULAR
                 </div>
              )}

              <h3 className="text-xl font-bold text-slate-800 mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold text-blue-600 mb-6">
                ₹{plan.price}
                <span className="text-sm text-slate-400 font-normal"> / {plan.durationInDays} days</span>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center gap-3 text-slate-600">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Create <strong>{plan.resumeLimit}</strong> Resumes</span>
                </div>
                {plan.description && (
                  <div className="flex items-center gap-3 text-slate-600">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{plan.description}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleBuy(plan)}
                disabled={processingId === plan._id}
                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  processingId === plan._id
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-900 text-white hover:bg-slate-800 hover:scale-[1.02]'
                }`}
              >
                {processingId === plan._id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {plan.price === 0 ? "Get Started" : <Crown className="w-5 h-5" />}
                    {plan.price === 0 ? "Free" : "Upgrade Now"}
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanPurchase;
