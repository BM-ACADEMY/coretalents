import React from "react";
import { Helmet } from "react-helmet";
import { Calendar, CheckCircle, Clock, User } from "lucide-react";

const benefits = [
  ["Lower Recruitment Cost", "Freshers are generally more flexible with salary expectations while offering significant growth potential."],
  ["Easier to Train", "Fresh graduates adapt quickly to your company culture, tools, and processes."],
  ["Better Employee Loyalty", "Employees who begin their careers with you often stay longer when given meaningful learning opportunities."],
  ["Fresh Ideas & Digital Skills", "Young graduates arrive comfortable with AI tools, digital marketing, data analytics, and modern collaboration tools."],
];

const hiringChannels = [
  ["Campus Recruitment", "Partner with colleges across Pondicherry, Chennai, Villupuram, Cuddalore, Karaikal, Salem, Coimbatore, and Trichy."],
  ["Recruitment Agencies", "Use CoreTalents' verified database to receive a relevant candidate shortlist without weeks of searching."],
  ["Internship Programs", "Evaluate candidates before offering permanent roles to improve cultural fit and joining rates."],
  ["Job Portals & Referrals", "Combine portals such as LinkedIn, Indeed, and Naukri with referrals from your existing employees."],
];

const hiringSteps = [
  ["Define the Role", "Set a clear title, responsibilities, salary range, and realistic requirements for an entry-level position."],
  ["Focus on Skills and Potential", "Screen for communication, problem-solving, adaptability, computer knowledge, and willingness to learn."],
  ["Assess Practically", "Use a short skills task and ask candidates to explain college projects where they solved real problems."],
  ["Verify and Onboard", "Verify certificates and identity, then provide structured training on company culture, software, and customer interaction."],
];

const faqs = [
  ["How can I hire freshers in Tamil Nadu?", "Use campus recruitment, recruitment agencies, internship programs, employee referrals, and online job portals."],
  ["Why should businesses hire fresh graduates?", "Freshers are cost-effective, adaptable, easier to train, and often stay longer with employers who invest in their growth."],
  ["How long does it take to hire a fresher?", "With a structured recruitment partner, employers can receive a shortlisted set of candidates within 48 hours for suitable roles."],
  ["Is campus hiring better than online hiring?", "Campus hiring gives direct access to graduating students, while online hiring offers broader reach. Combining both usually delivers the best results."],
  ["Why choose CoreTalents for fresher recruitment?", "CoreTalents uses AI-assisted matching to connect employers with pre-screened, job-ready candidates across Tamil Nadu."],
];

const whatsappUrl =
  "https://wa.me/919944940051?text=Hi%20CoreTalents%2C%20I%20want%20to%20hire%20freshers";

const InfoGrid = ({ items }) => (
  <div className="mt-7 grid gap-4 sm:grid-cols-2">
    {items.map(([title, text]) => (
      <div key={title} className="rounded-xl border border-[#e5e1d6] bg-white p-6">
        <div className="flex gap-3">
          <CheckCircle className="mt-1 shrink-0 text-[#e3a72b]" size={20} />
          <div>
            <h3 className="font-bold text-[#132840]">{title}</h3>
            <p className="mt-2 leading-7 text-slate-600">{text}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const CoreTalentsHireFreshersTamilNadu = () => (
  <>
    <Helmet>
      <title>
        How to Hire Freshers in Tamil Nadu: A Complete Guide for Employers
        (2026) | CoreTalents
      </title>
      <meta
        name="description"
        content="Hiring freshers in Tamil Nadu is one of the smartest ways to build a loyal, skilled, and cost-effective workforce. Read the complete CoreTalents employer guide."
      />
    </Helmet>

    <main className="min-h-screen bg-[#f5f5f2] px-5 pb-20 pt-28 text-[#1a1e23]">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="min-w-0">
          <nav className="mb-5 text-sm text-slate-500" aria-label="Breadcrumb">
            Home <span className="mx-2">›</span> Blog
            <span className="mx-2">›</span>
            <span className="font-semibold text-slate-800">
              Hiring Freshers in Tamil Nadu
            </span>
          </nav>

          <span className="inline-flex rounded-full bg-[#fbf0da] px-4 py-2 text-xs font-bold tracking-wider text-[#9c6b10]">
            FRESHER HIRING
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-[#132840] md:text-5xl">
            How to Hire Freshers in Tamil Nadu: A Complete Guide for Employers
            (2026)
          </h1>

          <div className="my-7 flex flex-wrap gap-6 border-b border-[#e5e1d6] pb-6 text-sm text-slate-500">
            <span className="flex items-center gap-2"><User size={16} /> CoreTalents Team</span>
            <span className="flex items-center gap-2"><Calendar size={16} /> July 24, 2026</span>
            <span className="flex items-center gap-2"><Clock size={16} /> 8 min read</span>
          </div>

          <img
            src="https://images.pexels.com/photos/4622108/pexels-photo-4622108.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200"
            alt="Fresh graduates studying on a Tamil Nadu university campus"
            className="max-h-[440px] w-full rounded-2xl object-cover"
          />

          <div className="mt-8 space-y-6 text-[17px] leading-8 text-slate-700">
            <p>
              Hiring freshers in Tamil Nadu is one of the smartest ways to build
              a loyal, skilled, and cost-effective workforce. By partnering
              with colleges, using trusted recruitment agencies such as{" "}
              <strong>CoreTalents</strong>, and evaluating skills instead of
              experience alone, businesses can hire quality graduates quickly.
            </p>
            <p>
              Companies in Pondicherry, Chennai, Cuddalore, and Villupuram are
              increasingly hiring fresh talent. Graduates bring enthusiasm,
              adaptability, and a willingness to learn that can make them
              excellent long-term employees.
            </p>
          </div>

          <section className="mt-14">
            <h2 className="text-3xl font-bold text-[#132840]">
              Why Businesses Should Hire Freshers
            </h2>
            <img
              src="https://images.pexels.com/photos/29927465/pexels-photo-29927465.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200"
              alt="Young professionals collaborating in a modern office"
              className="my-6 max-h-[360px] w-full rounded-2xl object-cover"
            />
            <p className="leading-8 text-slate-700">
              Thousands of students graduate every year from engineering
              colleges, arts colleges, polytechnics, and universities across
              Tamil Nadu. Experience is valuable, but attitude, learning
              ability, and practical skills often predict entry-level success
              more accurately.
            </p>
            <InfoGrid items={benefits} />
          </section>

          <section className="mt-14">
            <h2 className="text-3xl font-bold text-[#132840]">
              Where to Find Freshers in Tamil Nadu
            </h2>
            <img
              src="https://images.pexels.com/photos/31815325/pexels-photo-31815325/free-photo-of-charming-blue-door-in-french-quarter-puducherry.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="French Quarter street in Pondicherry"
              className="my-6 max-h-[360px] w-full rounded-2xl object-cover"
            />
            <p className="leading-8 text-slate-700">
              Successful fresher recruitment uses multiple channels instead of
              relying on a single online job advertisement.
            </p>
            <InfoGrid items={hiringChannels} />
          </section>

          <section className="mt-14">
            <h2 className="text-3xl font-bold text-[#132840]">
              Step-by-Step Process to Hire Freshers
            </h2>
            <img
              src="https://images.pexels.com/photos/6814523/pexels-photo-6814523.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200"
              alt="Employer greeting a fresh graduate candidate"
              className="my-6 max-h-[360px] w-full rounded-2xl object-cover"
            />
            <InfoGrid items={hiringSteps} />
          </section>

          <section className="mt-14">
            <h2 className="text-3xl font-bold text-[#132840]">
              Recruitment Agency vs. Direct Hiring for Freshers
            </h2>
            <p className="mt-5 leading-8 text-slate-700">
              Direct hiring requires the employer to manage sourcing, screening,
              verification, and interview coordination. CoreTalents streamlines
              that work and can reduce a process lasting several weeks to a
              relevant shortlist in as little as 48 hours.
            </p>
            <div className="mt-7 overflow-x-auto rounded-xl border border-[#e5e1d6] bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#132840] text-white">
                  <tr>
                    <th className="p-4">Feature</th>
                    <th className="p-4">Direct Hiring</th>
                    <th className="p-4">Through CoreTalents</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e1d6]">
                  <tr><td className="p-4">Resume screening</td><td className="p-4">Time-consuming</td><td className="p-4 font-bold">Done by experts</td></tr>
                  <tr><td className="p-4">Verification</td><td className="p-4">Employer responsibility</td><td className="p-4 font-bold">Pre-verified candidates</td></tr>
                  <tr><td className="p-4">Hiring speed</td><td className="p-4">2–6 weeks</td><td className="p-4 font-bold">Up to 48-hour shortlist</td></tr>
                  <tr><td className="p-4">Quality matching</td><td className="p-4">Depends on internal HR</td><td className="p-4 font-bold">AI-assisted matching</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-3xl font-bold text-[#132840]">
              Real Results and the Future of Fresher Hiring
            </h2>
            <img
              src="https://images.pexels.com/photos/31047149/pexels-photo-31047149.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200"
              alt="Team working on an industrial floor in Tamil Nadu"
              className="my-6 max-h-[360px] w-full rounded-2xl object-cover"
            />
            <div className="rounded-xl border-l-4 border-[#e3a72b] bg-[#fbf0da] p-6 leading-7 text-[#132840]">
              <strong>Real example from Pondicherry:</strong> a growing retail
              company hired five fresh graduates for customer support before
              the festive season. After two weeks of product training, the
              company achieved better retention and lower recruitment costs
              than when hiring experienced staff.
            </div>
            <p className="mt-6 leading-8 text-slate-700">
              Tamil Nadu continues to grow in manufacturing, IT, healthcare,
              retail, logistics, and e-commerce. Employers that combine clear
              job roles, practical assessment, and structured training can
              build reliable, future-ready teams from fresh talent.
            </p>
          </section>

          <section className="mt-14">
            <h2 className="text-3xl font-bold text-[#132840]">
              Frequently Asked Questions
            </h2>
            <div className="mt-6 space-y-3">
              {faqs.map(([question, answer]) => (
                <details
                  key={question}
                  className="rounded-xl border border-[#e5e1d6] bg-white p-5"
                >
                  <summary className="cursor-pointer font-semibold text-[#132840]">
                    {question}
                  </summary>
                  <p className="mt-3 leading-7 text-slate-600">{answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-14 rounded-3xl bg-gradient-to-br from-[#132840] to-[#1d3a5f] p-8 text-center md:p-12">
            <h2 className="text-3xl font-bold text-white">
              Ready to Hire Freshers?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-200">
              Get a pre-screened shortlist of job-ready graduates across
              Pondicherry, Chennai, Cuddalore, and Villupuram.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex rounded-full bg-[#e3a72b] px-7 py-4 font-bold text-[#132840]"
            >
              WhatsApp Our Recruitment Team
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
              We connect employers with skilled, job-ready fresh graduates
              using AI-assisted matching and pre-screening.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-600">
              {["#FresherHiring", "#CampusRecruitment", "#TamilNadu", "#AIRecruitment"].map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-2">{tag}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="text-xl font-bold text-emerald-800">
              Need Freshers Fast?
            </h2>
            <p className="mt-2 leading-7 text-emerald-800/80">
              Share your role and get a pre-screened shortlist within 48 hours.
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

export default CoreTalentsHireFreshersTamilNadu;
