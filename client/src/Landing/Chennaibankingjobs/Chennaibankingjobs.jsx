import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  CheckCircle2,
  Briefcase,
  ArrowRight,
  Loader2,
  Users,
  Search,
  UserPlus,
  Menu,
  X,
  Star,
  Clock,
  GraduationCap,
  Mic2,
  Languages,
  Clock4,
  AlertCircle,
  MessageCircle,
  UploadCloud,
  FileText,
  Send,
  Plus,
  Check,
} from "lucide-react";
import Man from "@/assets/Landing/man.png";
import Logo from "@/assets/logo/logo.png";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz1qFpSXRF9SXUJwJwH7iYzJYfzofjYaY1bVFgC-lLp0cs7hd1DkN0pwBD2yiUThzMz/exec";

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-violet-200 selection:text-violet-900 overflow-x-hidden">
      <Helmet>
        <title>
          Chennai Banking Jobs | Banking Customer Support Hiring – Core Talents
        </title>
        <meta
          name="description"
          content="Apply for Chennai banking jobs with Core Talents. Immediate hiring for banking customer support roles with flexible shifts and growth opportunities. Apply now."
        />
      </Helmet>
      {/* <Navbar /> */}
      <main className="pt-24 pb-20 space-y-24">
        <HeroSection />
        <TrustSection />
        <EligibilitySection />
        <SalarySection />
        <ImportantNoticeSection />
        <ApplicationSection navigate={navigate} />
      </main>
    </div>
  );
};

// --- Navbar ---
// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinks = [
//     { name: "Home", href: "#" },
//     { name: "Process", href: "#process" },
//     { name: "Eligibility", href: "#eligibility" },
//     { name: "Salary", href: "#salary" },
//   ];

//   const isSolid = scrolled || isOpen;

//   return (
//     <nav
//       className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 shadow-sm ${
//         isSolid ? "bg-white shadow-md py-4" : "bg-transparent py-6"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-50">
//         {/* Logo Section */}
//         <div className="flex items-center gap-2">
//           <img
//             src={Logo}
//             alt="Core Talents"
//             className="h-10 w-auto object-contain"
//           />
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-10 font-medium text-slate-500">
//           {navLinks.map((link) => (
//             <a
//               key={link.name}
//               href={link.href}
//               className="hover:text-violet-600 transition-colors"
//             >
//               {link.name}
//             </a>
//           ))}
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() =>
//                 document
//                   .getElementById("apply")
//                   .scrollIntoView({ behavior: "smooth" })
//               }
//               className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-violet-200"
//             >
//               Apply Now
//             </button>
//           </div>
//         </div>

//         {/* Mobile Toggle Button */}
//         <button
//           className="md:hidden text-slate-900 p-2 focus:outline-none"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="md:hidden bg-white border-b border-slate-100 overflow-hidden absolute top-full left-0 w-full shadow-xl"
//           >
//             <div className="px-6 py-8 space-y-6 flex flex-col items-center">
//               {navLinks.map((link) => (
//                 <a
//                   key={link.name}
//                   href={link.href}
//                   onClick={() => setIsOpen(false)}
//                   className="text-lg font-medium text-slate-600 hover:text-violet-600"
//                 >
//                   {link.name}
//                 </a>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// --- Hero Section ---
const HeroSection = () => (
  <section className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center pt-6">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="space-y-6 z-10"
    >
      <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wide">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
        </span>
        Hiring Now in Chennai
      </div>
      <h1 className="text-3xl font-bold leading-[1.1] text-slate-900">
        Banking Client <span className="text-violet-600">Support</span> Hiring
        <span className="block text-xl lg:text-2xl mt-4 text-slate-500 font-medium">
          Chennai (Velachery Office)
        </span>
      </h1>
      <p className="text-slate-600 text-lg max-w-lg leading-relaxed font-medium">
        Professional Chennai Office | Structured Selection Process | Immediate
        Joiners Preferred
      </p>
      <div className="space-y-4 py-2">
        <p className="text-slate-600 flex items-center gap-3">
          <CheckCircle2 size={20} className="text-violet-600 shrink-0" />{" "}
          Freshers & Experienced Candidates Welcome
        </p>
        <p className="text-slate-600 flex items-center gap-3">
          <CheckCircle2 size={20} className="text-violet-600 shrink-0" />{" "}
          Multiple Language Openings
        </p>
        <p className="text-slate-600 flex items-center gap-3">
          <CheckCircle2 size={20} className="text-violet-600 shrink-0" /> Up to
          ₹18,000 In Hand Salary
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          onClick={() =>
            document
              .getElementById("apply")
              .scrollIntoView({ behavior: "smooth" })
          }
          className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl transition-all shadow-xl shadow-violet-200 flex items-center justify-center gap-2"
        >
          Apply Now <ArrowRight size={20} />
        </button>
        <div className="px-5 py-3 bg-slate-50 text-slate-500 font-medium rounded-xl flex items-center justify-center border border-slate-100">
          Limited Interview Slots
        </div>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative flex justify-center lg:justify-end"
    >
      <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="relative z-10">
        <img
          src={Man}
          alt="Professional Office"
          className="w-full drop-shadow-2xl"
        />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="absolute bottom-10 -left-6 bg-white p-5 rounded-xl shadow-xl max-w-[200px]"
        >
          <div className="flex gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <Briefcase size={20} />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">Velachery</div>
              <div className="text-xs text-slate-400">Chennai Office</div>
            </div>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-[80%]"></div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

// --- Trust Section ---
// ADDED scroll-mt-32 HERE
const TrustSection = () => (
  <section
    id="process"
    className="max-w-7xl mx-auto px-6 text-center scroll-mt-32"
  >
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="mb-16"
    >
      <h2 className="text-4xl font-bold text-slate-900 mb-4">
        Leading Banking & Financial Clients
      </h2>
      <p className="text-slate-500 max-w-2xl mx-auto">
        Core Talents is hiring for structured banking client support roles
        handled at our Chennai office.
      </p>
    </motion.div>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {[
        {
          icon: Search,
          title: "Transparent Process",
          desc: "No hidden charges or confusing terms.",
          color: "bg-blue-100 text-blue-600",
        },
        {
          icon: MessageCircle,
          title: "Clear Communication",
          desc: "We keep you informed at every step.",
          color: "bg-violet-100 text-violet-600",
        },
        {
          icon: Building2,
          title: "Professional Office",
          desc: "Work in a structured corporate environment.",
          color: "bg-pink-100 text-pink-600",
        },
        {
          icon: Clock,
          title: "Fast Confirmation",
          desc: "Shortlisted within 24–48 hours.",
          color: "bg-orange-100 text-orange-600",
        },
      ].map((item, idx) => (
        <motion.div
          key={idx}
          variants={fadeInUp}
          className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-violet-100 shadow-xl transition-all duration-300"
        >
          <div
            className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
          >
            <item.icon size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            {item.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

// --- Eligibility Section ---
// ADDED scroll-mt-32 HERE
const EligibilitySection = () => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeInUp}
    id="eligibility"
    className="max-w-7xl mx-auto px-6 mb-20 scroll-mt-32"
  >
    <div className="relative rounded-[3rem] overflow-hidden bg-slate-900">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-slate-900 to-violet-950"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>
      <div className="relative z-10 p-10 md:p-20 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-violet-200 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Who Can Apply
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Do You Match The <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-indigo-200">
              Profile?
            </span>
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-md">
            We are looking for dedicated candidates ready to build a career in
            the banking sector. Check the requirements below before applying.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() =>
                document
                  .getElementById("apply")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-violet-50 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2"
            >
              Apply Now <ArrowRight size={18} />
            </button>
            <div className="flex items-center gap-3 text-slate-400 text-sm px-4 py-2">
              <CheckCircle2 size={16} className="text-green-400" />
              <span>No Hidden Charges</span>
            </div>
          </div>
        </div>

        {/* Animated Grid using Stagger */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-4"
        >
          <CriteriaCard
            icon={GraduationCap}
            label="Education"
            value="10th / 12th / UG / Graduate"
            color="bg-blue-500"
          />
          <CriteriaCard
            icon={Mic2}
            label="Skill Requirement"
            value="Versant 3 Required"
            color="bg-pink-500"
          />
          <CriteriaCard
            icon={Languages}
            label="Languages"
            value="Tamil, Malayalam, Hindi, Telugu"
            color="bg-violet-500"
          />
          <CriteriaCard
            icon={Clock4}
            label="Shift"
            value="Rotational Shifts"
            color="bg-orange-500"
          />
        </motion.div>
      </div>
    </div>
  </motion.section>
);

const CriteriaCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    variants={fadeInUp}
    className="group p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
  >
    <div
      className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
    >
      <Icon size={24} />
    </div>
    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
      {label}
    </div>
    <div className="text-white font-bold text-lg leading-snug">{value}</div>
  </motion.div>
);

// --- Salary Section ---
// ADDED scroll-mt-32 HERE
const SalarySection = () => (
  <section id="salary" className="bg-slate-50 py-20 scroll-mt-32">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-slate-900 mb-3">
          Salary & Benefits
        </h2>
        <p className="text-slate-500">
          Competitive packages for freshers and experienced candidates.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
      >
        <motion.div
          variants={fadeInUp}
          className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
        >
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
            <Building2 size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Tamil Process
          </h3>
          <div className="text-3xl font-bold text-slate-900 mb-1">
            ₹14k - ₹16k
          </div>
          <p className="text-slate-400 text-sm mb-6">
            Approximate In-Hand / Month
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle2 size={16} className="text-green-500" />{" "}
              Day/Rotational Shifts
            </li>
            <li className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle2 size={16} className="text-green-500" /> Banking
              Domain
            </li>
          </ul>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          className="bg-white p-8 rounded-3xl border-2 border-violet-100 shadow-xl relative overflow-hidden"
        >
          <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center mb-6">
            <Star size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Malayalam Process
          </h3>
          <div className="text-3xl font-bold text-slate-900 mb-1">
            ₹16k - ₹18k
          </div>
          <p className="text-slate-400 text-sm mb-6">
            Approximate In-Hand / Month
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle2 size={16} className="text-green-500" /> Higher
              Incentives
            </li>
            <li className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle2 size={16} className="text-green-500" /> Immediate
              Joining
            </li>
          </ul>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
        >
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <UserPlus size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Job Benefits
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm text-slate-600">
              <CheckCircle2
                size={18}
                className="text-blue-500 shrink-0 mt-0.5"
              />{" "}
              <span>Professional Chennai Office Environment</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-600">
              <CheckCircle2
                size={18}
                className="text-blue-500 shrink-0 mt-0.5"
              />{" "}
              <span>Banking Domain Exposure</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-600">
              <CheckCircle2
                size={18}
                className="text-blue-500 shrink-0 mt-0.5"
              />{" "}
              <span>Performance-Based Growth</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-600">
              <CheckCircle2
                size={18}
                className="text-blue-500 shrink-0 mt-0.5"
              />{" "}
              <span>Structured Team Support</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// --- Important Notice ---
const ImportantNoticeSection = () => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeInUp}
    className="max-w-4xl mx-auto px-6 mb-12"
  >
    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start">
      <div className="bg-yellow-100 text-yellow-700 p-3 rounded-xl shrink-0">
        <AlertCircle size={32} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          Please Apply Only If:
        </h3>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
          <div className="flex items-center gap-2 text-slate-700 text-sm">
            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
            You can travel daily to Velachery
          </div>
          <div className="flex items-center gap-2 text-slate-700 text-sm">
            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
            You can commit minimum 3 months
          </div>
          <div className="flex items-center gap-2 text-slate-700 text-sm">
            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
            You are comfortable with rotational shifts
          </div>
          <div className="flex items-center gap-2 text-slate-700 text-sm">
            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
            You are serious about a stable job
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- Application Section ---
// INCREASED scroll-mt to 32 HERE
const ApplicationSection = ({ navigate }) => {
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    qualification: "",
    experience: "",
    languages: [],
    travelTime: "",
    expectedSalary: "",
    shiftOk: false,
    commitmentOk: false,
    immediateJoiner: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleLanguage = (lang) => {
    setFormData((prev) => {
      const current = prev.languages;
      if (current.includes(lang)) {
        return { ...prev, languages: current.filter((l) => l !== lang) };
      } else {
        return { ...prev, languages: [...current, lang] };
      }
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0].size > 5 * 1024 * 1024) {
        alert("File is too large. Please upload a file smaller than 5MB.");
        e.target.value = "";
        setResumeFile(null);
      } else {
        setResumeFile(e.target.files[0]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.languages.length === 0) {
      alert("Please select at least one language.");
      return;
    }
    if (!formData.commitmentOk) {
      alert("Please confirm the 3-month commitment to proceed.");
      return;
    }

    setLoading(true);

    let resumeData = null;
    if (resumeFile) {
      resumeData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(resumeFile);
        reader.onload = () =>
          resolve({
            name: resumeFile.name,
            mimeType: resumeFile.type,
            data: reader.result.split(",")[1],
          });
        reader.onerror = (error) => reject(error);
      });
    }

    const payload = {
      ...formData,
      languages: formData.languages.join(", "),
      resume: resumeData,
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate("/application-success");
    } catch (error) {
      console.error("Error submitting form", error);
      alert(
        "Something went wrong. Please check your internet connection and try again.",
      );
      setLoading(false);
    }
  };

  const languageOptions = [
    "Tamil",
    "English",
    "Malayalam",
    "Hindi",
    "Telugu",
    "Kannada",
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      id="apply"
      className="max-w-4xl mx-auto px-6 scroll-mt-32"
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-slate-800 opacity-50 pattern-grid-lg"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Banking Client Support Hiring
            </h2>
            <p className="text-slate-400">
              Complete the form below with your resume
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputGroup
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Eg: John Doe"
              />
              <InputGroup
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Eg: 9876543210"
                type="tel"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <InputGroup
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Eg: john@gmail.com"
                type="email"
              />
              {/* <SelectGroup
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                options={[
                  "Chennai - Velachery",
                  "Chennai - Other",
                  "Outside Chennai",
                ]}
              /> */}
              <InputGroup
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Eg: Chennai"
              />
            </div>

            {/* Qualification & Experience */}
            <div className="grid md:grid-cols-2 gap-6">
              <SelectGroup
                label="Qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                options={[
                  "10th Pass",
                  "12th Pass",
                  "Diploma",
                  "Graduate",
                  "Post Graduate",
                ]}
              />
              <SelectGroup
                label="Experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                options={[
                  "Fresher",
                  "Less than 1 Year",
                  "1-2 Years",
                  "2+ Years",
                ]}
              />
            </div>

            {/* Languages Multi-Select UI */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                Languages Known (Select Multiple)
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {languageOptions.map((lang) => {
                  const isSelected = formData.languages.includes(lang);
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleLanguage(lang)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all flex items-center gap-2 ${
                        isSelected
                          ? "bg-violet-600 border-violet-600 text-white shadow-md"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:border-violet-300"
                      }`}
                    >
                      {lang}
                      {isSelected ? <Check size={14} /> : <Plus size={14} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Logistics */}
            <div className="grid md:grid-cols-2 gap-6">
              <SelectGroup
                label="Travel Time to Velachery"
                name="travelTime"
                value={formData.travelTime}
                onChange={handleChange}
                options={[
                  "Not Applicable",
                  "Less than 30 mins",
                  "Less than 1 hr",
                  "More than 1 hr",
                ]}
              />
              <SelectGroup
                label="Expected Salary (LPA)"
                name="expectedSalary"
                value={formData.expectedSalary}
                onChange={handleChange}
                options={["Not Applicable", "1 - 3 LPA", "3 - 5 LPA"]}
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                Attach Resume (PDF/Doc){" "}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-violet-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="relative w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-100 file:text-violet-700 hover:file:bg-violet-200 transition-all cursor-pointer"
                />
              </div>
            </div>

            {/* Declarations */}
            {/* Declarations */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3">
                  Applicant Confirmation
                </h4>
                <div className="space-y-3">
                  <Checkbox
                    label="Shift (Day/Night) – Yes"
                    name="shiftOk"
                    checked={formData.shiftOk}
                    onChange={handleChange}
                  />
                  <Checkbox
                    label="Immediate Joiner – Yes"
                    name="immediateJoiner"
                    checked={formData.immediateJoiner}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3">
                  Commitment Confirmation
                  <span className="text-red-500 ml-1">*</span>
                </h4>
                <Checkbox
                  label="I confirm my availability for a minimum 3-month commitment"
                  name="commitmentOk"
                  checked={formData.commitmentOk}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-violet-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  Submit Application <Send size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-red-500 font-medium animate-pulse">
          ⚡ Interview slots are filling fast for Chennai banking support roles.
        </p>
      </div>
    </motion.section>
  );
};

// --- Helper Components ---
const InputGroup = ({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
}) => (
  <div>
    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
      {label} <span className="text-red-500 ml-1">*</span>
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10 outline-none transition-all font-medium text-slate-900"
    />
  </div>
);

const SelectGroup = ({ label, options, name, value, onChange }) => (
  <div>
    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
      {label} <span className="text-red-500 ml-1">*</span>
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10 outline-none transition-all font-medium text-slate-900 appearance-none"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const Checkbox = ({ label, name, checked, onChange }) => (
  <label className="flex items-start gap-3 cursor-pointer group">
    <div
      className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
        checked
          ? "bg-violet-600 border-violet-600"
          : "bg-white border-slate-300 group-hover:border-violet-400"
      }`}
    >
      {checked && <CheckCircle2 size={14} className="text-white" />}
    </div>
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="hidden"
    />
    <span className="text-sm text-slate-600 select-none group-hover:text-slate-900 transition-colors">
      {label}
    </span>
  </label>
);

export default LandingPage;
