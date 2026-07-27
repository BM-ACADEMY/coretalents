import React from "react";
import { Helmet } from "react-helmet";
import { Calendar, CheckCircle, Clock, User } from "lucide-react";

const services = [
  {
    title: "Permanent & Bulk Hiring",
    text: "Long-term roles such as HR executives, developers, and accountants, plus bulk hiring for manufacturing companies, BPOs, retail chains, and warehouses.",
  },
  {
    title: "Campus Recruitment & Internships",
    text: "Connecting businesses with talented students graduating from colleges across Pondicherry and nearby districts.",
  },
  {
    title: "Executive Search",
    text: "Careful evaluation to identify experienced professionals for senior leadership positions.",
  },
  {
    title: "Industry-Specific Recruitment",
    text: "Recruitment support for IT, manufacturing, retail, healthcare, education, hospitality, finance, logistics, sales, and customer support.",
  },
];

const faqs = [
  {
    question: "Which is the best recruitment agency in Pondicherry?",
    answer:
      "CoreTalents is one of the trusted recruitment agencies in Pondicherry, offering AI-powered recruitment, experienced HR support, and a 48-hour candidate shortlist for many roles.",
  },
  {
    question: "How quickly can I receive candidates?",
    answer:
      "For most positions, qualified candidate profiles are shared within 48 hours after we understand your hiring requirement.",
  },
  {
    question: "Which locations do you serve?",
    answer:
      "Pondicherry, Cuddalore, Villupuram, Tindivanam, Chennai, and other parts of Tamil Nadu.",
  },
  {
    question: "Do you recruit for freshers and internships?",
    answer:
      "Yes. We help graduates and entry-level candidates find opportunities and connect businesses with talented interns.",
  },
  {
    question: "How do I get started with CoreTalents?",
    answer:
      "Share your hiring requirement with us on WhatsApp or contact our recruitment team, and we will begin sourcing qualified candidates.",
  },
];

const whatsappUrl =
  "https://wa.me/919944940051?text=Hi%20CoreTalents%2C%20I%20want%20to%20share%20a%20hiring%20requirement";

const CoreTalentsPondicherryBlog = () => {
  return (
    <>
      <Helmet>
        <title>
          Recruitment Agency in Pondicherry – Hire the Right Talent in 48
          Hours | CoreTalents
        </title>
        <meta
          name="description"
          content="Looking for a trusted recruitment agency in Pondicherry? CoreTalents helps businesses hire qualified employees within 48 hours through AI-powered recruitment and expert HR support."
        />
      </Helmet>

      <main className="min-h-screen bg-[#f5f5f2] px-5 pb-20 pt-28 text-[#1a1e23]">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="min-w-0">
            <nav className="mb-5 text-sm text-slate-500" aria-label="Breadcrumb">
              Home <span className="mx-2">›</span> Blog
              <span className="mx-2">›</span>
              <span className="font-semibold text-slate-800">
                Recruitment Agency in Pondicherry
              </span>
            </nav>

            <span className="inline-flex rounded-full bg-[#fbf0da] px-4 py-2 text-xs font-bold tracking-wider text-[#9c6b10]">
              RECRUITMENT AGENCY
            </span>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-[#132840] md:text-5xl">
              Recruitment Agency in Pondicherry — Hire the Right Talent in 48
              Hours
            </h1>

            <div className="my-7 flex flex-wrap gap-6 border-b border-[#e5e1d6] pb-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <User size={16} /> CoreTalents Team
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} /> July 24, 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} /> 8 min read
              </span>
            </div>

            <img
              src="/blog-images/pondicherry-recruitment.png"
              alt="CoreTalents recruiter interviewing job candidates in Pondicherry"
              className="max-h-[440px] w-full rounded-2xl object-cover"
            />

            <div className="mt-8 space-y-6 text-[17px] leading-8 text-slate-700">
              <p>
                Looking for a trusted{" "}
                <strong>recruitment agency in Pondicherry</strong>? CoreTalents
                helps businesses hire qualified employees within{" "}
                <strong>48 hours</strong> through AI-powered recruitment and
                expert HR support. We connect the right people with the right
                opportunities across Pondicherry, Cuddalore, Villupuram, and
                Tindivanam.
              </p>
              <p>
                Finding the right employee has become more challenging than
                ever. Businesses need skilled candidates quickly, while job
                seekers want genuine career opportunities with trusted
                employers. CoreTalents combines technology with experienced HR
                professionals to make hiring accurate, quick, and reliable.
              </p>
            </div>

            <section className="mt-14">
              <h2 className="text-3xl font-bold text-[#132840]">
                Why Businesses Need a Recruitment Agency in Pondicherry
              </h2>
              <img
                src="https://images.pexels.com/photos/29927465/pexels-photo-29927465.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200"
                alt="Recruitment team reviewing candidates"
                className="my-6 max-h-[360px] w-full rounded-2xl object-cover"
              />
              <p className="leading-8 text-slate-700">
                Hiring consumes valuable time and can lead to poor decisions. A
                professional recruitment agency reduces that risk by delivering
                pre-screened candidates, allowing businesses to focus on growth.
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {[
                  "Too many irrelevant applications",
                  "Long hiring cycles and interview no-shows",
                  "Wrong skill matches and high turnover",
                  "Rising recruitment costs",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-xl border border-[#e5e1d6] bg-white p-5"
                  >
                    <CheckCircle className="mt-1 shrink-0 text-[#e3a72b]" size={20} />
                    <span className="font-semibold text-[#132840]">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-14">
              <h2 className="text-3xl font-bold text-[#132840]">
                What Makes CoreTalents Different
              </h2>
              <img
                src="/blog-images/ai-assisted-candidate-matching.png"
                alt="CoreTalents recruiters using AI-assisted candidate matching"
                className="my-6 max-h-[360px] w-full rounded-2xl object-cover"
              />
              <p className="leading-8 text-slate-700">
                CoreTalents combines AI-powered screening with experienced HR
                professionals and deep local market expertise to identify
                candidates who genuinely match each role.
              </p>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                {services.map((service) => (
                  <div key={service.title} className="rounded-xl bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-[#132840]">
                      {service.title}
                    </h3>
                    <p className="mt-2 leading-7 text-slate-600">{service.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-14">
              <h2 className="text-3xl font-bold text-[#132840]">
                Real Results for Growing Businesses
              </h2>
              <div className="mt-6 rounded-xl border-l-4 border-[#e3a72b] bg-[#fbf0da] p-6 leading-7 text-[#132840]">
                <strong>A real hiring example from Pondicherry:</strong> a
                manufacturing company needed five production supervisors
                urgently. CoreTalents discussed the requirement on Day 1, ran
                AI screening on Day 2, and supplied a qualified shortlist for
                interviews by Day 3.
              </div>
              <div className="mt-7 overflow-x-auto rounded-xl border border-[#e5e1d6] bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#132840] text-white">
                    <tr>
                      <th className="p-4">Feature</th>
                      <th className="p-4">Hiring Yourself</th>
                      <th className="p-4">CoreTalents</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e1d6]">
                    <tr><td className="p-4">Hiring speed</td><td className="p-4">Several weeks</td><td className="p-4 font-bold">48-hour shortlist</td></tr>
                    <tr><td className="p-4">Candidate quality</td><td className="p-4">Mixed</td><td className="p-4 font-bold">Pre-screened</td></tr>
                    <tr><td className="p-4">Wrong-hire risk</td><td className="p-4">High</td><td className="p-4 font-bold">Significantly reduced</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-14">
              <h2 className="text-3xl font-bold text-[#132840]">
                Frequently Asked Questions
              </h2>
              <div className="mt-6 space-y-3">
                {faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-xl border border-[#e5e1d6] bg-white p-5"
                  >
                    <summary className="cursor-pointer font-semibold text-[#132840]">
                      {faq.question}
                    </summary>
                    <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="mt-14 rounded-3xl bg-gradient-to-br from-[#132840] to-[#1d3a5f] p-8 text-center md:p-12">
              <h2 className="text-3xl font-bold text-white">
                Ready to Hire? Don&apos;t Let Vacancies Slow Your Business Down
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-200">
                Get a pre-screened candidate shortlist within 48 hours across
                Pondicherry and nearby districts.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex rounded-full bg-[#e3a72b] px-7 py-4 font-bold text-[#132840]"
              >
                WhatsApp Your Hiring Requirement
              </a>
            </section>
          </article>

          <aside className="h-fit space-y-5 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-[#e5e1d6] bg-white p-6">
              <span className="text-xs font-bold tracking-widest text-slate-500">
                ABOUT CORETALENTS
              </span>
              <h2 className="mt-3 text-xl font-bold text-[#132840]">CoreTalents</h2>
              <p className="mt-3 leading-7 text-slate-600">
                AI-powered recruitment with 48-hour candidate delivery and a
                growing regional talent network.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-600">
                {["#RecruitmentAgency", "#Pondicherry", "#AIRecruitment"].map(
                  (tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-2">
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <h2 className="text-xl font-bold text-emerald-800">
                Need to Hire Fast?
              </h2>
              <p className="mt-2 leading-7 text-emerald-800/80">
                Share your requirement and receive a pre-screened shortlist.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 block rounded-lg bg-emerald-600 px-5 py-3 text-center font-bold text-white"
              >
                Connect on WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};

export default CoreTalentsPondicherryBlog;
