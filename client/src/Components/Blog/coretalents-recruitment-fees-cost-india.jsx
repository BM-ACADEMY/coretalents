import React from "react";
import { Helmet } from "react-helmet";
import { Calendar, CheckCircle, Clock, User } from "lucide-react";

const feeRows = [
  ["Entry-Level Hiring", "6%–10% of annual CTC"],
  ["Mid-Level Hiring", "8%–12% of annual CTC"],
  ["Senior-Level Hiring", "10%–15% of annual CTC"],
  ["Executive Search", "15%–25% of annual CTC"],
  ["Bulk Hiring", "Custom pricing"],
  ["Contract Staffing", "Monthly service charges"],
];

const includedServices = [
  ["Candidate Sourcing & Skill Matching", "Access to an established talent database screened against the actual job requirements."],
  ["Initial Interviews & Verification", "Candidates are pre-interviewed and, where applicable, verified before reaching the employer."],
  ["Interview Coordination", "Scheduling, candidate follow-ups, and communication are handled throughout the process."],
  ["Offer Management & Follow-Up", "Support with negotiation, joining, and early follow-up helps reduce candidate drop-offs."],
];

const pricingModels = [
  ["Percentage of Annual Salary", "The most common model. A candidate with ₹4,00,000 annual CTC at an 8% fee results in a ₹32,000 recruitment fee."],
  ["Fixed Fee", "A flat fee, often ₹15,000–₹40,000, can suit repeat entry-level or mid-level hiring."],
  ["Monthly Subscription", "A recurring hiring plan can suit businesses that recruit continuously across several roles."],
  ["Custom Bulk-Hiring Plan", "High-volume recruitment is usually priced according to role type, volume, location, and required turnaround."],
];

const faqs = [
  ["What are recruitment agency fees in India?", "Most recruitment agencies charge between 6% and 15% of a candidate's annual CTC for permanent hiring. Executive hiring may attract higher fees."],
  ["Who pays the recruitment agency fee?", "In most cases, the employer pays. Job seekers generally should not pay placement fees for legitimate employer-funded recruitment services."],
  ["Is an agency cheaper than hiring internally?", "It can be when job advertising, HR effort, interview time, vacancy delays, and repeat hiring are included in the comparison."],
  ["How quickly can an agency provide candidates?", "For common roles, CoreTalents can provide a qualified shortlist within 48 hours, depending on the requirements and candidate availability."],
  ["Why choose CoreTalents?", "CoreTalents combines AI-assisted matching, local hiring expertise, pre-screened talent, and dedicated recruitment support."],
];

const whatsappUrl =
  "https://wa.me/919944940051?text=Hi%20CoreTalents%2C%20I%20want%20a%20recruitment%20fee%20quote";

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

const CoreTalentsRecruitmentFeesCostIndia = () => (
  <>
    <Helmet>
      <title>
        Recruitment Agency Fees & Cost in India (2026): Complete Guide for
        Employers | CoreTalents
      </title>
      <meta
        name="description"
        content="Recruitment agency fees in India typically range from 6% to 15% of annual CTC for permanent hiring. Learn about pricing models, hidden costs, and choosing the right partner."
      />
    </Helmet>

    <main className="min-h-screen bg-[#f5f5f2] px-5 pb-20 pt-28 text-[#1a1e23]">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="min-w-0">
          <nav className="mb-5 text-sm text-slate-500" aria-label="Breadcrumb">
            Home <span className="mx-2">›</span> Blog
            <span className="mx-2">›</span>
            <span className="font-semibold text-slate-800">
              Recruitment Agency Fees & Cost in India
            </span>
          </nav>

          <span className="inline-flex rounded-full bg-[#fbf0da] px-4 py-2 text-xs font-bold tracking-wider text-[#9c6b10]">
            HIRING COSTS
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-[#132840] md:text-5xl">
            Recruitment Agency Fees & Cost in India (2026): Complete Guide for
            Employers
          </h1>

          <div className="my-7 flex flex-wrap gap-6 border-b border-[#e5e1d6] pb-6 text-sm text-slate-500">
            <span className="flex items-center gap-2"><User size={16} /> CoreTalents Team</span>
            <span className="flex items-center gap-2"><Calendar size={16} /> July 24, 2026</span>
            <span className="flex items-center gap-2"><Clock size={16} /> 8 min read</span>
          </div>

          <img
            src="/blog-images/india-recruitment-fees.png"
            alt="Indian HR and finance managers reviewing recruitment costs"
            className="max-h-[440px] w-full rounded-2xl object-cover"
          />

          <div className="mt-8 space-y-6 text-[17px] leading-8 text-slate-700">
            <p>
              Recruitment agency fees in India typically range from{" "}
              <strong>6% to 15%</strong> of a candidate&apos;s annual CTC for
              permanent hiring, while executive and niche roles may cost{" "}
              <strong>15% to 25%</strong>. Some agencies also offer fixed-fee
              or monthly hiring plans.
            </p>
            <p>
              Whether you run a startup in Pondicherry, a manufacturing company
              in Cuddalore, an IT firm in Chennai, or a retail business in
              Villupuram, understanding the fee structure helps you compare
              partners and calculate the real cost of hiring.
            </p>
          </div>

          <section className="mt-14">
            <h2 className="text-3xl font-bold text-[#132840]">
              What Recruitment Agency Fees Cover
            </h2>
            <img
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?fm=jpg&q=60&w=1600&auto=format&fit=crop"
              alt="Recruiter reviewing an agreement"
              className="my-6 max-h-[360px] w-full rounded-2xl object-cover"
            />
            <p className="leading-8 text-slate-700">
              The fee pays a staffing partner to find, screen, and recommend
              suitable candidates instead of leaving your team to search
              through hundreds of applications.
            </p>
            <InfoGrid items={includedServices} />
          </section>

          <section className="mt-14">
            <h2 className="text-3xl font-bold text-[#132840]">
              How Much Do Recruitment Agencies Charge in India?
            </h2>
            <img
              src="https://images.unsplash.com/photo-1670329949691-f056ce6bb079?fm=jpg&q=60&w=1600&auto=format&fit=crop"
              alt="Calculator with banknotes and coins"
              className="my-6 max-h-[360px] w-full rounded-2xl object-cover"
            />
            <p className="leading-8 text-slate-700">
              Most Indian agencies use percentage-based pricing tied to the
              selected candidate&apos;s annual CTC. Actual quotes vary by role,
              industry, scarcity, volume, and urgency.
            </p>
            <div className="mt-7 overflow-x-auto rounded-xl border border-[#e5e1d6] bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#132840] text-white">
                  <tr><th className="p-4">Hiring Type</th><th className="p-4">Typical Agency Fee</th></tr>
                </thead>
                <tbody className="divide-y divide-[#e5e1d6]">
                  {feeRows.map(([type, fee]) => (
                    <tr key={type}><td className="p-4">{type}</td><td className="p-4 font-bold text-[#132840]">{fee}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 rounded-xl border-l-4 border-[#e3a72b] bg-[#fbf0da] p-6 leading-7 text-[#132840]">
              <strong>Important:</strong> These are typical market ranges, not
              guaranteed quotes. Ask each agency for written pricing, taxes,
              payment milestones, and replacement terms.
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-3xl font-bold text-[#132840]">
              Common Recruitment Pricing Models
            </h2>
            <img
              src="https://images.unsplash.com/photo-1716703435453-a7733d600d68?fm=jpg&q=60&w=1600&auto=format&fit=crop"
              alt="Team discussing a recruitment partnership"
              className="my-6 max-h-[360px] w-full rounded-2xl object-cover"
            />
            <InfoGrid items={pricingModels} />
          </section>

          <section className="mt-14">
            <h2 className="text-3xl font-bold text-[#132840]">
              Recruitment Agency vs. In-House Hiring
            </h2>
            <p className="mt-5 leading-8 text-slate-700">
              In-house recruitment can appear cheaper until job portal fees, HR
              time, interview hours, repeat recruitment, and lost productivity
              from vacant roles are included.
            </p>
            <div className="mt-7 overflow-x-auto rounded-xl border border-[#e5e1d6] bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#132840] text-white">
                  <tr><th className="p-4">Factor</th><th className="p-4">In-House Hiring</th><th className="p-4">Recruitment Agency</th></tr>
                </thead>
                <tbody className="divide-y divide-[#e5e1d6]">
                  <tr><td className="p-4">Candidate screening</td><td className="p-4">Manual HR work</td><td className="p-4 font-bold">Pre-screened profiles</td></tr>
                  <tr><td className="p-4">Hiring speed</td><td className="p-4">Often slower</td><td className="p-4 font-bold">Faster shortlist</td></tr>
                  <tr><td className="p-4">Candidate database</td><td className="p-4">Usually limited</td><td className="p-4 font-bold">Established talent pool</td></tr>
                  <tr><td className="p-4">Cost visibility</td><td className="p-4">Hidden internal costs</td><td className="p-4 font-bold">Agreed pricing</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-3xl font-bold text-[#132840]">
              Real Example: A Small Business in Pondicherry
            </h2>
            <img
              src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?fm=jpg&q=60&w=1600&auto=format&fit=crop"
              alt="Open sign in a retail shop"
              className="my-6 max-h-[360px] w-full rounded-2xl object-cover"
            />
            <div className="rounded-xl border-l-4 border-[#e3a72b] bg-[#fbf0da] p-6 leading-7 text-[#132840]">
              A retail showroom expanding before the festive season needed
              three sales executives, two cashiers, and one store manager.
              Working with an agency reduced the owner&apos;s screening workload,
              shortened the hiring cycle, and minimized business disruption.
            </div>
            <p className="mt-6 leading-8 text-slate-700">
              Recruitment fees are best evaluated as an investment in speed,
              access, and risk reduction—not just as a visible expense.
              Transparent pricing and a clear replacement policy are essential
              when choosing a partner.
            </p>
          </section>

          <section className="mt-14">
            <h2 className="text-3xl font-bold text-[#132840]">
              Frequently Asked Questions
            </h2>
            <div className="mt-6 space-y-3">
              {faqs.map(([question, answer]) => (
                <details key={question} className="rounded-xl border border-[#e5e1d6] bg-white p-5">
                  <summary className="cursor-pointer font-semibold text-[#132840]">{question}</summary>
                  <p className="mt-3 leading-7 text-slate-600">{answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-14 rounded-3xl bg-gradient-to-br from-[#132840] to-[#1d3a5f] p-8 text-center md:p-12">
            <h2 className="text-3xl font-bold text-white">
              Ready to Hire the Right Talent?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-200">
              Share your requirements and receive a clear recruitment quote
              with no hidden charges.
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-full bg-[#e3a72b] px-7 py-4 font-bold text-[#132840]">
              Request a Recruitment Fee Quote
            </a>
          </section>
        </article>

        <aside className="h-fit space-y-5 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-[#e5e1d6] bg-white p-6">
            <span className="text-xs font-bold tracking-widest text-slate-500">ABOUT CORETALENTS</span>
            <h2 className="mt-3 text-xl font-bold text-[#132840]">CoreTalents</h2>
            <p className="mt-3 leading-7 text-slate-600">
              AI-assisted matching, pre-screened candidates, local hiring
              expertise, and transparent recruitment pricing.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-600">
              {["#RecruitmentFees", "#HiringCost", "#RecruitmentAgency", "#CoreTalents"].map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-2">{tag}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="text-xl font-bold text-emerald-800">Wondering What It Will Cost?</h2>
            <p className="mt-2 leading-7 text-emerald-800/80">
              Share your role and get a clear, upfront quote.
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-5 block rounded-lg bg-emerald-600 px-5 py-3 text-center font-bold text-white">
              Connect on WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </main>
  </>
);

export default CoreTalentsRecruitmentFeesCostIndia;
