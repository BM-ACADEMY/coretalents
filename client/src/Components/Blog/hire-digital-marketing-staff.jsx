import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const whatsappUrl =
  "https://wa.me/919944509441?text=Hi%20CoreTalents%2C%20I%27d%20like%20to%20hire%20digital%20marketing%20staff.";

const HireDigitalMarketingStaff = () => {
  return (
    <>
      <Helmet>
        <title>Hire Digital Marketing Staff (Job-Ready Freshers) | CoreTalents Blog</title>
        <meta name="description" content="Looking to hire digital marketing staff in Tamil Nadu? Learn how job-ready freshers can help your business grow online — and how CoreTalents delivers pre-screened candidates within 48 hours." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700;9..144,800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Helmet>

      <style dangerouslySetInnerHTML={{ __html: `
        .hdms { background:#f9fafb; color:#111827; font-family:'Inter',sans-serif; line-height:1.7; font-size:16px; min-height:100vh; }
        .hdms * { box-sizing:border-box; }
        .hdms h1,.hdms h2,.hdms h3 { font-family:'Fraunces',serif; font-weight:700; color:#111827; line-height:1.25; margin:0; word-break:break-word; }
        .hdms a { color:#4f46e5; text-decoration:none; }
        .hdms a:hover { text-decoration:underline; }
        .hdms img { max-width:100%; display:block; }
        .hdms article { min-width:0; overflow-wrap:break-word; }

        .hdms .page { max-width:1200px; width:100%; margin:0 auto; padding:96px 40px 80px; display:grid; grid-template-columns:minmax(0,1fr) 320px; gap:46px; }

        .hdms .breadcrumb { font-size:.85rem; color:#6b7280; margin-bottom:16px; display:flex; align-items:center; flex-wrap:wrap; gap:6px; }
        .hdms .breadcrumb a { color:#6b7280; }
        .hdms .breadcrumb a:hover { color:#4f46e5; }
        .hdms .breadcrumb .current { color:#111827; font-weight:600; }

        .hdms .tag-pill { display:inline-flex; align-items:center; gap:6px; background:#eef2ff; border:1px solid #c7d2fe; color:#4f46e5; font-size:.7rem; font-weight:700; letter-spacing:.08em; padding:6px 14px; border-radius:100px; margin-bottom:16px; }

        .hdms article h1 { font-size:2.2rem; max-width:720px; margin-bottom:18px; }
        .hdms .meta-row { display:flex; gap:22px; align-items:center; color:#6b7280; font-size:.88rem; padding-bottom:20px; border-bottom:1px solid #e5e7eb; margin-bottom:26px; flex-wrap:wrap; }

        .hdms .hero-image { width:100%; border-radius:1.25rem; overflow:hidden; margin-bottom:8px; border:1px solid #e5e7eb; box-shadow:0 4px 24px rgba(0,0,0,.06); }
        .hdms .hero-image img { width:100%; max-height:440px; object-fit:cover; }

        .hdms article > p.lead { font-size:1.05rem; color:#374151; margin:26px 0 14px; }
        .hdms article p { margin:0 0 16px; color:#374151; font-size:1rem; }

        .hdms .block { margin-top:52px; }
        .hdms .block h2 { font-size:1.55rem; margin-bottom:20px; }
        .hdms .block-image { width:100%; border-radius:1rem; overflow:hidden; margin-bottom:20px; border:1px solid #e5e7eb; }
        .hdms .block-image img { width:100%; max-height:360px; object-fit:cover; }
        .hdms .block-intro { margin-bottom:22px; color:#374151; }
        .hdms .sub { margin-bottom:20px; }
        .hdms .sub h3 { font-size:1.06rem; margin-bottom:6px; color:#1e1b4b; }
        .hdms .sub p { margin:0; color:#374151; font-size:.96rem; }

        .hdms .cta-wrap { text-align:center; margin:30px 0 6px; }
        .hdms .cta-btn { display:inline-flex; align-items:center; gap:8px; padding:14px 30px; border-radius:100px; font-weight:700; font-size:.95rem; text-decoration:none; cursor:pointer; transition:all .2s; box-shadow:0 4px 14px rgba(0,0,0,.1); }
        .hdms .cta-btn:hover { text-decoration:none; transform:translateY(-1px); }
        .hdms .cta-solid { background:#4f46e5; color:#fff; }
        .hdms .cta-solid:hover { background:#4338ca; }
        .hdms .cta-outline { background:transparent; border:2px solid #4f46e5; color:#4f46e5; box-shadow:none; }
        .hdms .cta-outline:hover { background:#eef2ff; }
        .hdms .cta-accent { background:linear-gradient(135deg,#4f46e5,#7c3aed); color:#fff; }

        .hdms .table-wrap { overflow-x:auto; margin:20px 0; border:1px solid #e5e7eb; border-radius:1rem; box-shadow:0 1px 6px rgba(0,0,0,.04); }
        .hdms table { width:100%; min-width:560px; border-collapse:collapse; background:#fff; }
        .hdms th { padding:11px 16px; background:#312e81; color:#fff; text-align:left; font-size:.82rem; font-family:'Inter',sans-serif; }
        .hdms td { padding:11px 16px; border-bottom:1px solid #e5e7eb; font-size:.88rem; color:#6b7280; }
        .hdms td.win { color:#1e1b4b; font-weight:700; }
        .hdms tr:last-child td { border-bottom:none; }

        .hdms .callout { background:#fef9c3; border-left:4px solid #eab308; border-radius:10px; padding:18px 22px; margin:22px 0; color:#713f12; font-size:.96rem; }

        .hdms .faq-row { background:#fff; border:1px solid #e5e7eb; border-radius:1rem; padding:16px 20px; margin-bottom:10px; box-shadow:0 1px 4px rgba(0,0,0,.03); }
        .hdms .faq-row summary { display:flex; justify-content:space-between; align-items:center; font-weight:600; color:#1e1b4b; font-size:.98rem; list-style:none; cursor:pointer; gap:15px; }
        .hdms .faq-row summary::-webkit-details-marker { display:none; }
        .hdms .plus-circle { width:26px; height:26px; border-radius:50%; background:#eef2ff; color:#4f46e5; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.1rem; flex-shrink:0; }
        .hdms details.faq-row[open] .plus-circle { background:#4f46e5; color:#fff; }
        .hdms .faq-row p { margin:12px 0 0; color:#6b7280; font-size:.9rem; }

        .hdms .bottom-cta { position:relative; overflow:hidden; background:linear-gradient(120deg,#1e1b4b 0%,#4338ca 60%,#7c3aed 130%); border-radius:1.5rem; padding:44px 40px; margin-top:50px; text-align:center; box-shadow:0 8px 32px rgba(79,70,229,.25); }
        .hdms .bottom-cta h2 { color:#fff; font-size:1.6rem; margin-bottom:12px; }
        .hdms .bottom-cta p { color:#c7d2fe; max-width:560px; margin:0 auto 22px; font-size:.98rem; }
        .hdms .bottom-cta .cta-btn { background:#facc15; color:#1e1b4b; box-shadow:0 4px 14px rgba(234,179,8,.4); }
        .hdms .bottom-cta .cta-btn:hover { background:#eab308; }

        .hdms aside { align-self:start; position:sticky; top:24px; display:flex; flex-direction:column; gap:20px; }
        .hdms .side-card { background:#fff; border:1px solid #f3f4f6; border-radius:2rem; padding:28px; box-shadow:0 1px 8px rgba(0,0,0,.04); }
        .hdms .eyebrow-mini { font-size:.68rem; letter-spacing:.1em; color:#9ca3af; font-weight:700; margin-bottom:16px; display:block; text-transform:uppercase; }
        .hdms .brand-row { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
        .hdms .brand-logo { width:48px; height:48px; border-radius:50%; background:#1e1b4b; display:flex; align-items:center; justify-content:center; color:#facc15; font-family:'Fraunces',serif; font-weight:800; font-size:1.15rem; flex-shrink:0; }
        .hdms .brand-row strong { font-size:1.05rem; color:#111827; }
        .hdms .side-card p { font-size:.87rem; color:#6b7280; margin:0 0 14px; line-height:1.65; }
        .hdms .tag-list { display:flex; flex-wrap:wrap; gap:8px; }
        .hdms .tag-list span { background:#f9fafb; border:1px solid #e5e7eb; color:#6b7280; font-size:.74rem; padding:5px 10px; border-radius:100px; }
        .hdms .cta-card { background:#f0fdf4; border:1px solid #bbf7d0; }
        .hdms .cta-card h3 { color:#166534; font-size:1.05rem; margin-bottom:8px; }
        .hdms .cta-card p { color:#166534cc; }
        .hdms .wa-btn { display:flex; align-items:center; justify-content:center; gap:8px; background:#16a34a; color:#fff; font-weight:700; font-size:.92rem; padding:14px; border-radius:.75rem; text-decoration:none; transition:background .2s; box-shadow:0 4px 12px rgba(22,163,74,.25); }
        .hdms .wa-btn:hover { text-decoration:none; background:#15803d; }

        @media (min-width:881px) and (max-width:1100px) {
          .hdms .page { padding:88px 28px 70px; gap:30px; grid-template-columns:minmax(0,1fr) 260px; }
          .hdms article h1 { font-size:1.95rem; }
          .hdms .block h2 { font-size:1.4rem; }
          .hdms .side-card { padding:22px; border-radius:1.75rem; }
          .hdms .bottom-cta { padding:38px 28px; }
          .hdms .hero-image img { max-height:380px; }
        }
        @media (max-width:880px) {
          .hdms .page { grid-template-columns:1fr; padding:80px 20px 50px; }
          .hdms aside { position:static; }
        }
        @media (max-width:640px) {
          .hdms article h1 { font-size:1.9rem; }
          .hdms .block h2 { font-size:1.3rem; }
          .hdms .cta-wrap { display:flex; flex-direction:column; align-items:center; gap:12px; }
          .hdms .cta-btn { width:100%; max-width:360px; justify-content:center; padding:13px 20px; font-size:.9rem; }
          .hdms .side-card { padding:20px; border-radius:1.5rem; }
          .hdms .bottom-cta { border-radius:1.25rem; }
          .hdms .faq-row { padding:14px 16px; }
          .hdms .table-wrap { border-radius:.75rem; }
        }
        @media (max-width:520px) {
          .hdms article h1 { font-size:1.65rem; }
          .hdms .meta-row { gap:10px; }
          .hdms .bottom-cta { padding:30px 18px; }
          .hdms .bottom-cta h2 { font-size:1.4rem; }
          .hdms .bottom-cta p { font-size:.88rem; }
          .hdms .hero-image { border-radius:1rem; }
          .hdms .hero-image img { max-height:220px; }
          .hdms .sub h3 { font-size:1rem; }
          .hdms .breadcrumb { font-size:.78rem; }
        }
        @media (max-width:380px) {
          .hdms article h1 { font-size:1.45rem; }
          .hdms .page { padding:72px 14px 44px; }
          .hdms .cta-btn { font-size:.85rem; padding:12px 16px; }
          .hdms .side-card { padding:16px; border-radius:1.25rem; }
          .hdms .bottom-cta { padding:26px 14px; }
          .hdms .faq-row { padding:12px 14px; }
        }
      `}} />

      <div className="hdms">
        <div className="page">
          <article>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
              <Link to="/blog">Blog</Link>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
              <span className="current">Hire Digital Marketing Staff</span>
            </nav>

            <span className="tag-pill">🏷 HIRING GUIDE</span>
            <h1>Hire Digital Marketing Staff (Job-Ready Freshers): A Complete Guide for Businesses in Tamil Nadu</h1>
            <div className="meta-row">
              <span>CoreTalents Team</span>
              <span>August 13, 2026</span>
            </div>

            <div className="hero-image">
              <img src="https://images.unsplash.com/photo-1758691736580-a41e0cfe9e9f?auto=format&fit=crop&w=1600&q=80" alt="Manager presenting marketing data to a team in a modern office" />
            </div>

            <p className="lead">Looking to hire digital marketing staff in Tamil Nadu? Job-ready freshers can be an excellent choice for startups and growing businesses — they bring updated digital skills, creativity, and enthusiasm at an affordable hiring cost. By partnering with a trusted recruitment agency like CoreTalents, businesses in Pondicherry, Chennai, Cuddalore, and Villupuram can receive pre-screened, job-ready candidates within 48 hours.</p>
            <p>Every business today wants a strong online presence. Whether you own a retail shop in Pondicherry, a restaurant in Chennai, a manufacturing company in Cuddalore, or a startup in Villupuram, digital marketing plays a major role in attracting customers and growing your brand.</p>
            <p>But here's the challenge — finding the right digital marketing employee. Experienced professionals often demand higher salaries, while many freshers lack practical exposure. This guide walks through what to look for, where to find talent, and how to build a strong digital marketing team without overspending.</p>

            {/* BLOCK 1 */}
            <div className="block" id="why-freshers">
              <h2>Why Every Business Needs Digital Marketing Staff — and Why Freshers Are the Smart Hire</h2>
              <div className="block-image">
                <img loading="lazy" src="https://images.unsplash.com/photo-1758270705172-07b53627dfcb?auto=format&fit=crop&w=1600&q=80" alt="Group of trained young marketing professionals collaborating around a laptop" />
              </div>
              <p className="block-intro">Customers no longer rely only on newspaper ads or word-of-mouth — they search online before making a purchase. A dedicated digital marketing employee helps businesses generate leads, improve visibility, and increase sales across social media, SEO, Google Ads, and Meta Ads. Many employers assume experienced candidates are always the better option, but job-ready freshers trained through structured programs bring real advantages.</p>
              <div className="sub"><h3>Latest Industry Knowledge</h3><p>Freshers trained in modern programs already know AI-powered tools, ChatGPT, Canva, CapCut, Google Analytics, Meta Business Suite, and current SEO practices.</p></div>
              <div className="sub"><h3>Affordable Hiring</h3><p>Experienced marketers expect higher salaries. Fresh graduates offer excellent value while giving you the chance to develop talent internally.</p></div>
              <div className="sub"><h3>Adaptability</h3><p>Digital marketing changes rapidly. Freshers are generally comfortable learning new platforms and adjusting to algorithm updates.</p></div>
              <div className="sub"><h3>Long-Term Growth</h3><p>Employees who begin their careers with your company often grow into future team leaders who understand your brand from day one.</p></div>
              <div className="cta-wrap"><a href={whatsappUrl} className="cta-btn cta-solid" target="_blank" rel="noopener noreferrer">🚀 Start Hiring Today</a></div>
            </div>

            {/* BLOCK 2 */}
            <div className="block" id="skills">
              <h2>Roles You Can Hire For &amp; Skills That Actually Matter</h2>
              <div className="block-image">
                <img loading="lazy" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80" alt="Laptop displaying marketing statistics and charts on a desk" />
              </div>
              <p className="block-intro">Digital marketing is a broad field — businesses can recruit freshers as a Digital Marketing Executive, SEO Executive, Social Media Executive, Content Writer, Graphic Designer, Video Editor, or Performance Marketing Assistant. Hiring based only on certificates isn't enough; evaluate practical, portfolio-backed skills instead.</p>
              <div className="sub"><h3>SEO &amp; Search</h3><p>Keyword research, on-page SEO, basic technical SEO, local SEO, and blog optimization.</p></div>
              <div className="sub"><h3>Social Media &amp; Content</h3><p>Managing Instagram, Facebook, LinkedIn, YouTube, and Google Business Profile, plus writing blogs, captions, and product descriptions.</p></div>
              <div className="sub"><h3>Design &amp; Video</h3><p>Basic Canva skills for posts, posters, and flyers, and short-form video editing using CapCut or Premiere Pro.</p></div>
              <div className="sub"><h3>Paid Ads &amp; AI Tools</h3><p>Understanding of Google Ads, Meta Ads, campaign optimization, audience targeting, and comfort with AI content assistants.</p></div>
              <div className="cta-wrap"><Link to="/contact" className="cta-btn cta-outline">📝 Post Your Job Role</Link></div>
            </div>

            {/* BLOCK 3 */}
            <div className="block" id="find-talent">
              <h2>Where to Find Talent &amp; How CoreTalents Speeds Up Hiring</h2>
              <div className="block-image">
                <img loading="lazy" src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=1600&q=80" alt="Diverse team of young professionals in a bright modern office" />
              </div>
              <p className="block-intro">Skilled candidates come from training institutes, campus recruitment drives, internship programs, and recruitment agencies. Each channel has trade-offs in speed and screening effort — recruitment agencies simplify hiring by providing pre-screened candidates so you interview only suitable applicants.</p>
              <div className="sub"><h3>Training Institutes</h3><p>Many digital marketing institutes now provide industry-focused practical training, with graduates completing live projects before entering the workforce.</p></div>
              <div className="sub"><h3>Campus Recruitment</h3><p>Engineering, arts, and business colleges across Tamil Nadu produce talented graduates eager to begin digital careers.</p></div>
              <div className="sub"><h3>Recruitment Agencies</h3><p>Agencies handle sourcing and screening, saving you time by shortlisting only relevant, qualified candidates.</p></div>
              <div className="sub"><h3>Internship Programs</h3><p>Internships let you evaluate candidates before offering full-time roles, reducing hiring risk while building long-term teams.</p></div>

              <div className="table-wrap">
                <table>
                  <thead><tr><th scope="col">Feature</th><th scope="col">Direct Hiring</th><th scope="col">Through CoreTalents</th></tr></thead>
                  <tbody>
                    <tr><td>Resume Screening</td><td>Manual</td><td className="win">Pre-screened candidates</td></tr>
                    <tr><td>Portfolio Review</td><td>Employer handles</td><td className="win">Initial evaluation completed</td></tr>
                    <tr><td>Hiring Speed</td><td>Slower</td><td className="win">Faster</td></tr>
                    <tr><td>Candidate Matching</td><td>Limited</td><td className="win">AI-assisted matching</td></tr>
                    <tr><td>Local Talent Access</td><td>Limited</td><td className="win">Strong network across Tamil Nadu</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="cta-wrap"><a href={whatsappUrl} className="cta-btn cta-accent" target="_blank" rel="noopener noreferrer">⚡ Get a Shortlist Within 48 Hours</a></div>
            </div>

            {/* BLOCK 4 */}
            <div className="block" id="mistakes">
              <h2>Common Hiring Mistakes to Avoid</h2>
              <div className="block-image">
                <img loading="lazy" src="https://images.unsplash.com/photo-1758518730384-be3d205838e8?auto=format&fit=crop&w=1600&q=80" alt="Manager shaking hands with a candidate after a successful interview" />
              </div>
              <p className="block-intro">Even with the right process, businesses often stumble on a few avoidable mistakes. Knowing these upfront helps you make faster, better hiring decisions and hold on to skilled candidates before a competitor does.</p>
              <div className="sub"><h3>Hiring Based Only on Degrees</h3><p>Practical skills matter more than academic qualifications — ask to see real work instead.</p></div>
              <div className="sub"><h3>Expecting One Person to Do Everything</h3><p>Digital marketing includes many specializations. As your business grows, build a balanced team.</p></div>
              <div className="sub"><h3>Ignoring Creativity</h3><p>Successful marketers combine technical knowledge with creative thinking — don't screen creativity out.</p></div>
              <div className="sub"><h3>Delayed Hiring Decisions</h3><p>Skilled candidates often receive multiple offers. Quick decisions improve hiring success.</p></div>

              <div className="callout"><strong>Real example from Pondicherry:</strong> A restaurant wanted to improve its online visibility. Instead of hiring an expensive senior marketer, the owner recruited a trained digital marketing fresher who handled Google Business Profile updates, Instagram content, Facebook promotions, and local SEO. Within a few months, the restaurant saw higher engagement, more inquiries, and more walk-in customers.</div>

              <div className="cta-wrap"><a href={whatsappUrl} className="cta-btn cta-outline" target="_blank" rel="noopener noreferrer">💬 Talk to a Recruitment Consultant</a></div>
            </div>

            {/* CONCLUSION */}
            <div className="block">
              <h2>Conclusion</h2>
              <p>Knowing how to hire digital marketing staff is essential for businesses that want to grow online. Instead of focusing only on years of experience, employers should prioritize <strong>practical skills, creativity, and a willingness to learn</strong>. Whether you're based in Pondicherry, Chennai, Cuddalore, or Villupuram, partnering with a trusted recruitment agency like <strong>CoreTalents</strong> gives you access to pre-screened digital marketing talent, reducing hiring time and helping your business grow faster.</p>
            </div>

            {/* FAQ */}
            <div className="block">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <details className="faq-row" open>
                <summary>What skills should I look for when hiring digital marketing staff?<span className="plus-circle">+</span></summary>
                <p>Look for SEO knowledge, social media management, content writing, Canva, video editing, Google Ads, Meta Ads, communication skills, and familiarity with AI tools.</p>
              </details>
              <details className="faq-row">
                <summary>Are freshers suitable for digital marketing roles?<span className="plus-circle">+</span></summary>
                <p>Yes. Job-ready freshers with practical training and project experience can perform well in entry-level digital marketing positions.</p>
              </details>
              <details className="faq-row">
                <summary>Is experience more important than skills?<span className="plus-circle">+</span></summary>
                <p>Not always. Practical skills, creativity, and a willingness to learn are often more valuable than years of experience, especially for entry-level roles.</p>
              </details>
              <details className="faq-row">
                <summary>How long does it take to hire digital marketing staff?<span className="plus-circle">+</span></summary>
                <p>For eligible roles, CoreTalents can provide a qualified shortlist within 48 hours, helping businesses hire more efficiently.</p>
              </details>
              <details className="faq-row">
                <summary>Why choose CoreTalents?<span className="plus-circle">+</span></summary>
                <p>CoreTalents offers AI-assisted recruitment, portfolio-based screening, pre-screened candidates, and dedicated recruitment support across Pondicherry, Chennai, Cuddalore, and Villupuram.</p>
              </details>
            </div>

            <div className="bottom-cta">
              <h2>Ready to Hire Digital Marketing Talent?</h2>
              <p>With CoreTalents, you get access to pre-screened, job-ready digital marketing professionals backed by AI-assisted recruitment and local hiring expertise.</p>
              <a href={whatsappUrl} className="cta-btn" target="_blank" rel="noopener noreferrer">⚡ Get a Qualified Shortlist Within 48 Hours</a>
            </div>
          </article>

          <aside>
            <div className="side-card">
              <span className="eyebrow-mini">About CoreTalents</span>
              <div className="brand-row">
                <div className="brand-logo">C</div>
                <strong>CoreTalents</strong>
              </div>
              <p>CoreTalents connects businesses with pre-screened, job-ready digital marketing talent using AI-assisted matching — with a qualified shortlist ready within 48 hours for eligible roles.</p>
              <div className="tag-list">
                <span>#DigitalMarketing</span>
                <span>#FresherHiring</span>
                <span>#TamilNadu</span>
                <span>#CoreTalents</span>
              </div>
            </div>
            <div className="side-card cta-card">
              <h3>Need talent this week?</h3>
              <p>Chat with a CoreTalents recruitment consultant on WhatsApp and get candidates moving today.</p>
              <a href={whatsappUrl} className="wa-btn" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm5.6 14.3c-.3.7-1.4 1.3-2 1.4-.5.1-1.1.2-3.6-.8-3-1.2-4.9-4.2-5.1-4.4-.1-.2-1.2-1.6-1.2-3 0-1.4.7-2.1 1-2.4.3-.3.6-.3.8-.3h.6c.2 0 .5-.1.7.5.3.7.9 2.3 1 2.5.1.2.1.4 0 .6-.1.2-.2.3-.4.5-.2.2-.4.5-.5.6-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.9.4.2.6.1.8-.1.2-.2.9-1 1.1-1.3.2-.3.4-.3.7-.2.3.1 1.9.9 2.2 1.1.3.2.5.2.6.4.1.2.1.9-.2 1.6z"/></svg>
                Connect on WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default HireDigitalMarketingStaff;
