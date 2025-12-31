import React, { useState } from "react";
import { useAuth } from "@/Context/Authcontext";
import { User, Mail, Lock, Phone } from "lucide-react"; 
import { GoogleLogin } from "@react-oauth/google"; 

const Login = () => {
  const [state, setState] = useState("login");
  const { login, register, googleLoginHandler } = useAuth(); 
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (state === "login") {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password, formData.phone);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onGoogleSuccess = async (response) => {
    try {
      await googleLoginHandler(response);
    } catch (error) {
      console.error("Google logic failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:w-[400px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white shadow-lg py-10">
        <h1 className="text-gray-900 text-3xl font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        <p className="text-gray-500 text-sm mt-2 mb-6">
          Please {state === "login" ? "sign in" : "sign up"} to continue
        </p>

        {/* --- TRADITIONAL FORM (First) --- */}
        <form onSubmit={handleSubmit}>
            {state !== "login" && (
              <>
                <div className="flex items-center mt-2 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-4 gap-2">
                  <User className="text-gray-500 w-5 h-5" />
                  <input type="text" name="name" placeholder="Full Name" className="w-full h-full border-none outline-none text-sm" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-4 gap-2">
                   <Phone className="text-gray-500 w-5 h-5" />
                  <input type="tel" name="phone" placeholder="Phone Number" className="w-full h-full border-none outline-none text-sm" value={formData.phone} onChange={handleChange} required />
                </div>
              </>
            )}

            <div className={`flex items-center w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-4 gap-2 ${state === "login" ? "mt-2" : "mt-4"}`}>
               <Mail className="text-gray-500 w-5 h-5" />
              <input type="email" name="email" placeholder="Email Address" className="w-full h-full border-none outline-none text-sm" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-4 gap-2">
               <Lock className="text-gray-500 w-5 h-5" />
              <input type="password" name="password" placeholder="Password" className="w-full h-full border-none outline-none text-sm" value={formData.password} onChange={handleChange} required />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 transition-colors font-medium disabled:opacity-70"
            >
              {loading ? "Processing..." : state === "login" ? "Login" : "Sign up"}
            </button>
        </form>

        {/* --- DIVIDER --- */}
        <div className="relative flex py-2 items-center mt-6 mb-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* --- GOOGLE BUTTON (Bottom) --- */}
        <div className="flex justify-center mb-6">
           <GoogleLogin
              onSuccess={onGoogleSuccess}
              onError={() => console.log('Login Failed')}
              theme="outline"
              size="large"
              width="280"
              shape="pill"
              text={state === "login" ? "signin_with" : "signup_with"}
           />
        </div>

        <p className="text-gray-500 text-sm">
          {state === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setState(prev => (prev === "login" ? "register" : "login"));
              setFormData({ name: "", email: "", password: "", phone: "" });
            }}
            className="text-indigo-500 hover:underline font-medium"
          >
            Click here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;