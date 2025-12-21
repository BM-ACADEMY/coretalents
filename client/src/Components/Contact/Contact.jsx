import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Helmet } from "react-helmet";
// 1. Import useNavigate
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/customToast";

const Contact = () => {
  // 2. Initialize navigate
  const navigate = useNavigate();

  // ---- Form State ----
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyjFEjs7E7gJIk8Ld_dVb7AV8YSLSesjKuEeNvjYy45p2ninH0VCXfv5_tYfDxRBSCp1w/exec";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("message", formData.message);

    try {
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        body: form,
      });

      // showToast("success", "Enquiry sent successfully!"); // Optional: You can keep or remove this
      setFormData({ name: "", email: "", phone: "", message: "" });

      // 3. Navigate to the Thank You page on success
      navigate("/thank-you");

    } catch (error) {
      console.error("Submission error:", error);
      showToast("error", "Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Core Talents | Recruitment Agency in Tamil Nadu & Dubai</title>
        <meta
          name="description"
          content="Contact Core Talents, an AI-powered recruitment and staffing agency based near Pondicherry, serving India, Chennai and Dubai. Book a free hiring consultation today."
        />
      </Helmet>

      <div
        className="min-h-screen bg-white pb-0"
        style={{
          backgroundImage: "radial-gradient(#fef3c7 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          opacity: 1,
        }}
      >
        <div className="pt-16 pb-16 px-4 sm:px-6 lg:px-8">
          {/* --- Header Section --- */}
          <div className="max-w-3xl mx-auto text-center mt-10 mb-12">
            <h2 className="text-5xl font-extrabold text-gray-800">
              Contact <span className="text-[#ffc700]">Us</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              We'd love to hear from you! Get in touch with us for any queries,
              support, or collaboration opportunities.
            </p>
          </div>

          {/* --- Main Content Layout --- */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* --- Get in Touch Card (Left) --- */}
            <div className="bg-white rounded-2xl border border-gray-300 shadow-2xl p-10 space-y-8 z-10 transition duration-300">
              <h3 className="text-3xl font-bold text-gray-900">Get in Touch</h3>
              <p className="text-gray-600">
                Have questions or want to work with us? Reach out and we'll get
                back to you quickly.
              </p>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start space-x-5 group">
                  <div className="flex-shrink-0 p-3 bg-yellow-100 rounded-full text-yellow-600 group-hover:bg-yellow-200 transition">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <a
                    href="https://www.google.com/maps/place/QRF3%2BP77,+Hosur,+Tamil+Nadu/@12.774288,77.803172,16z/data=!4m5!3m4!1s0x3bae70c883f728a3:0x945404124d2f2a8d!8m2!3d12.7742875!4d77.8031719?hl=en&entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-gray-800 pt-1 hover:text-[#ffc700] transition"
                  >
                    252, 2nd floor, M G ROAD, KOTTAKUPPAM, Vanur, Tamil Nadu
                    605104
                  </a>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-5 group">
                  <div className="flex-shrink-0 p-3 bg-yellow-100 rounded-full text-yellow-600 group-hover:bg-yellow-200 transition">
                    <Phone className="w-6 h-6" />
                  </div>
                  <a
                    href="tel:+919944509441"
                    className="text-lg text-gray-800 pt-1 hover:text-[#ffc700] transition"
                  >
                    +91 9944509441
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-5 group">
                  <div className="flex-shrink-0 p-3 bg-yellow-100 rounded-full text-yellow-600 group-hover:bg-yellow-200 transition">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <a
                      href="mailto:admin@abmgroups.org"
                      className="text-lg text-[#1e2939] hover:text-yellow-600 font-medium transition"
                    >
                      admin@abmgroups.org
                    </a>
                    <a
                      href="mailto:ceo@abmgroups.org"
                      className="text-lg text-[#1e2939] hover:text-yellow-600 font-medium transition"
                    >
                      ceo@abmgroups.org
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Map (Right) --- */}
            <div className="w-full h-96 md:h-full bg-gray-200 rounded-2xl shadow-2xl overflow-hidden relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31224.655937623447!2d79.83820500000002!3d11.968825!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a53638d212031cd%3A0x4c19741920c452b4!2sCore%20Talents!5e0!3m2!1sen!2sin!4v1766299447561!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Core Talents - Kottakuppam, Tamil Nadu"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>

        {/* ---- ENQUIRY FORM SECTION ---- */}
        <div className="py-20" id="enquiry">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

              {/* Left Side: Visual/Text Area */}
              <div className="md:w-5/12 bg-gradient-to-br from-[#f0b104] to-[#ffc700] p-10 flex flex-col justify-center text-white relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                 <div className="absolute bottom-0 right-0 w-40 h-40 bg-black opacity-5 rounded-full translate-x-1/4 translate-y-1/4"></div>

                <h3 className="text-3xl font-bold mb-4 relative z-10">Let's start a conversation</h3>
                <p className="text-yellow-50 text-lg mb-8 relative z-10">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-full"><Phone size={20}/></div>
                    <span className="font-medium">+91 9944509441</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-full"><Mail size={20}/></div>
                    <span className="font-medium">admin@abmgroups.org</span>
                  </div>
                </div>
              </div>

              {/* Right Side: The Form */}
              <div className="md:w-7/12 p-10 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="core talents"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#f0b104] focus:border-transparent transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input
                        type="email"
                        name="email"
                        placeholder="coretalents@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#f0b104] focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input
                        type="tel"
                        name="phone"
                        placeholder="xxxxx xxxxx"
                        value={formData.phone}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                            setFormData({ ...formData, phone: value });
                        }}
                        required
                        pattern="[0-9]{10}"
                        maxLength="10"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#f0b104] focus:border-transparent transition"
                        />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                    <textarea
                      name="message"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#f0b104] focus:border-transparent transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#f0b104] text-white font-bold py-4 rounded-xl hover:bg-[#d9a003] transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Contact;
