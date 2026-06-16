import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

function IconLinkedIn({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.5h4.56V23H.22V8.5zM8.7 8.5h4.37v1.98h.06c.61-1.16 2.11-2.38 4.34-2.38 4.64 0 5.5 3.05 5.5 7.02V23h-4.75v-6.52c0-1.56-.03-3.57-2.18-3.57-2.18 0-2.51 1.7-2.51 3.45V23H8.7V8.5z" />
    </svg>
  );
}

function IconInstagram({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.4a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.16.46.346 1.26.4 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.4 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.46.16-1.26.346-2.43.4-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.4a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.16-.46-.346-1.26-.4-2.43C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.054-1.17.24-1.97.4-2.43A4.9 4.9 0 0 1 3.82 2.95 4.9 4.9 0 0 1 5.59 1.8c.46-.16 1.26-.346 2.43-.4C9.284 1.342 9.67 1.33 12 1.33zm0 1.8c-3.15 0-3.52.012-4.76.07-1.02.047-1.57.217-1.94.36-.49.19-.83.418-1.2.789-.37.37-.6.71-.79 1.2-.14.37-.31.92-.36 1.94-.058 1.24-.07 1.61-.07 4.76s.012 3.52.07 4.76c.047 1.02.217 1.57.36 1.94.19.49.418.83.789 1.2.37.37.71.6 1.2.79.37.14.92.31 1.94.36 1.24.058 1.61.07 4.76.07s3.52-.012 4.76-.07c1.02-.047 1.57-.217 1.94-.36.49-.19.83-.418 1.2-.789.37-.37.6-.71.79-1.2.14-.37.31-.92.36-1.94.058-1.24.07-1.61.07-4.76s-.012-3.52-.07-4.76c-.047-1.02-.217-1.57-.36-1.94a3.1 3.1 0 0 0-.79-1.2 3.1 3.1 0 0 0-1.2-.79c-.37-.14-.92-.31-1.94-.36-1.24-.058-1.61-.07-4.76-.07zm0 3.6a6.4 6.4 0 1 1 0 12.8 6.4 6.4 0 0 1 0-12.8zm0 2a4.4 4.4 0 1 0 0 8.8 4.4 4.4 0 0 0 0-8.8zm6.9-2.04a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
    </svg>
  );
}

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const certifications = [
  { name: "Google Analytics Certification", issuer: "Issued by Google", image: "/certifications/google-analytics.png" },
  { name: "Google Ads Search Certification", issuer: "Issued by Google", image: "/certifications/google-ads-search.png" },
  { name: "Google Ads Display Certification", issuer: "Issued by Google", image: "/certifications/google-ads-display.png" },
  { name: "Google Ads Video Certification", issuer: "Issued by Google", image: "/certifications/google-ads-video.png" },
  { name: "Google Ads Measurement Certification", issuer: "Issued by Google", image: "/certifications/google-ads-measurement.png" },
  { name: "Google Ads AI-Powered Performance Certification", issuer: "Issued by Google", image: "/certifications/google-ads-ai-powered-performance.png" },
  { name: "Google Tag Manager Certification", issuer: "Issued by Google", image: "/certifications/google-tag-manager.png" },
  { name: "HubSpot SEO Certification", issuer: "Issued by HubSpot", image: "/certifications/hubspot-seo.png" },
];

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { threshold: 0.5 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return [active, setActive];
}

function SectionIntro({ overline, title, description }) {
  return (
    <div className="mb-10 md:mb-12">
      <p className="section-overline">{overline}</p>
      <h2 className="section-title">{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}

function Toast({ show, message }) {
  return (
    <div className={`toast ${show ? "toast-visible" : ""}`} role="status" aria-live="polite">
      <span className="toast-icon">OK</span>
      <span>{message}</span>
    </div>
  );
}

function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#e8f2ff_0%,#fbfdff_55%,#ffffff_100%)]" />
      <div className="glow-orb glow-orb-a" />
      <div className="glow-orb glow-orb-b" />
      <div className="mesh-pattern" />
    </div>
  );
}

function Lightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return;
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
    >
      <div className="lightbox-panel" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
        <img src={item.image} alt={item.title} className="lightbox-image" />
        <div className="lightbox-footer">
          <div>
            <p className="lightbox-title">{item.title}</p>
            {item.issuer ? <p className="lightbox-issuer">{item.issuer}</p> : null}
          </div>
          {item.tags ? (
            <div className="creative-tags">
              {item.tags.map((tag) => <span key={tag} className="creative-tag">{tag}</span>)}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const sections = useMemo(() => ["home", "about", "skills", "certifications", "services", "projects", "creatives", "contact"], []);
  const [active, setActive] = useActiveSection(sections);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [lightboxItem, setLightboxItem] = useState(null);

  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return;
    const nav = navRef.current;
    const links = nav.querySelectorAll("a.nav-link");
    const current = Array.from(links).find((a) => a.getAttribute("href") === `#${active}`);
    if (!current) return;
    const navRect = nav.getBoundingClientRect();
    const linkRect = current.getBoundingClientRect();
    const left = linkRect.left - navRect.left + nav.scrollLeft;
    indicatorRef.current.style.width = `${linkRect.width}px`;
    indicatorRef.current.style.transform = `translateX(${left}px)`;
  }, [active]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  };

  const openCertLightbox = (cert) => {
    setLightboxItem({ title: cert.name, image: cert.image, issuer: cert.issuer });
  };

  return (
    <div className="min-h-screen text-[var(--text)] antialiased">
      <BackgroundFX />
      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />

      <header className="sticky top-3 z-50 px-3 md:px-6">
        <div className="mx-auto flex max-w-6xl justify-center">
          <nav ref={navRef} className="relative overflow-x-auto no-scrollbar rounded-full border border-slate-200/80 bg-white/80 px-3 py-2 shadow-[0_10px_35px_rgba(15,23,42,0.12)] backdrop-blur">
            <span ref={indicatorRef} className="nav-indicator" style={{ width: 0, transform: "translateX(0px)" }} />
            <div className="relative z-10 flex items-center gap-1">
              {sections.map((id) => (
                <a key={id} href={`#${id}`} onClick={() => setActive(id)} className={`nav-link ${active === id ? "text-white" : "text-slate-700 hover:text-slate-900"}`}>
                  <span className="capitalize">{id}</span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="mx-auto grid max-w-6xl gap-8 px-6 pb-16 pt-16 md:grid-cols-12 md:items-center md:gap-14">
          <div className="md:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Open to internships and freelance projects
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.06] text-slate-950 sm:text-5xl md:text-6xl">
              Jaydev Dharne
              <span className="mt-3 block text-2xl font-medium text-slate-700 sm:text-3xl">Performance Marketing Executive | Google Ads, Meta Ads, GA4 &amp; GTM Specialist</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Fresher with internship experience in SEO and paid ads. Hands-on with Google Ads, Meta Ads, GA4, GTM, conversion tracking, and campaign optimization using data.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#contact" className="btn-primary">Hire Me</a>
              <a href="/JaydevDharne_Resume.pdf" download="JaydevDharne_Resume.pdf" className="btn-secondary">Download Resume</a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-slate-600">
              <a href="https://www.linkedin.com/in/jaydevdharne" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-slate-900"><IconLinkedIn /><span className="font-medium">LinkedIn</span></a>
              <a href="https://www.instagram.com/digirank_" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-slate-900"><IconInstagram /><span className="font-medium">Instagram</span></a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 text-center md:max-w-xl">
              <div className="card-panel"><p className="text-2xl font-semibold text-slate-900">9+</p><p className="text-sm text-slate-500">GA4 Events Implemented</p></div>
              <div className="card-panel"><p className="text-2xl font-semibold text-slate-900">2</p><p className="text-sm text-slate-500">Live Tracking Projects</p></div>
              <div className="card-panel"><p className="text-2xl font-semibold text-slate-900">4+</p><p className="text-sm text-slate-500">Months Experience</p></div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 md:max-w-xl">
              <span className="skill-pill text-sm">Google Analytics Certified</span>
              <span className="skill-pill text-sm">Google Ads Search Certified</span>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-3xl border border-slate-200/70 bg-white/95 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
              <img
                src="/jaydev-photo.png"
                alt="Jaydev Dharne"
                className="mx-auto h-56 w-40 rounded-3xl border border-slate-200 object-cover object-top shadow-lg"
              />
              <h3 className="mt-6 text-center text-2xl font-semibold text-slate-900">Personal Brand Snapshot</h3>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl bg-slate-50 p-4"><p className="text-slate-500">Role</p><p className="mt-1 font-semibold text-slate-800">Performance Marketing Fresher</p></div>
                <div className="rounded-xl bg-slate-50 p-4"><p className="text-slate-500">Core Stack</p><p className="mt-1 font-semibold text-slate-800">Google Ads, Meta Ads, GA4, GTM</p></div>
                <div className="rounded-xl bg-slate-50 p-4"><p className="text-slate-500">Base</p><p className="mt-1 font-semibold text-slate-800">Pune, India</p></div>
                <div className="rounded-xl bg-slate-50 p-4"><p className="text-slate-500">Work Style</p><p className="mt-1 font-semibold text-slate-800">Execution and Optimization</p></div>
              </div>
            </div>
          </div>
        </section>

        <motion.section id="about" className="section-shell" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <SectionIntro overline="About" title="Computer science graduate focused on performance marketing" description="I combine campaign execution with analytics to improve CTR, reduce CPC, and build reliable tracking foundations." />
          <div className="about-spotlight">
            <div>
              <p className="about-kicker">Profile Snapshot</p>
              <h3 className="about-heading">Performance marketing fresher with practical internship exposure</h3>
              <p className="about-text">I have worked on SEO execution, paid campaign support, and analytics tracking setup. I enjoy combining data clarity with practical execution to improve campaign results.</p>
            </div>
            <div className="about-badges">
              <span className="quick-chip">Google Ads</span>
              <span className="quick-chip">Meta Ads</span>
              <span className="quick-chip">GA4</span>
              <span className="quick-chip">GTM</span>
              <span className="quick-chip">SEO</span>
              <span className="quick-chip">Excel</span>
            </div>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-3">
            <article className="card-panel about-card"><h3 className="card-title">Internship Experience</h3><p className="card-text">Digital Marketing Intern at DigitizeBrand Hub. Improved website SEO through on-page and technical optimization. Assisted in Google Ads campaign monitoring and analyzed CTR, CPC, and conversions for optimization.</p></article>
            <article className="card-panel about-card"><h3 className="card-title">Analytics Foundation</h3><p className="card-text">Hands-on with GA4, GTM, Search Console, UTM tracking, and Excel reporting for campaign performance checks.</p></article>
            <article className="card-panel about-card"><h3 className="card-title">Education</h3><p className="card-text">BSc Computer Science from Savitribai Phule Pune University, building a solid technical base for digital roles.</p></article>
          </div>

          <div className="mt-7">
            <p className="about-kicker">My Journey</p>
            <div className="journey-timeline">
              {[
                { year: "2022", label: "BSc Computer Science (Started)" },
                { year: "2023", label: "Frontend Internship" },
                { year: "2024", label: "Digital Marketing Internship" },
                { year: "2025", label: "GA4/GTM Projects Live" },
              ].map((item) => (
                <div key={`${item.year}-${item.label}`} className="journey-item">
                  <span className="journey-year">{item.year}</span>
                  <span className="journey-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="skills" className="section-shell bg-white/45" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <SectionIntro overline="Skills" title="My current capability stack" />
          <div className="skills-highlight">
            <p className="about-kicker">Current Focus</p>
            <h3 className="about-heading">Execution-first marketing with strong analytics tracking</h3>
            <p className="about-text">I currently focus on campaign execution, event tracking, reporting, and SEO fundamentals. This gives me practical end-to-end support capability for entry-level growth roles.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[{ heading: "Performance Marketing", items: ["Google Ads", "Meta Ads", "Campaign Optimization", "Conversion Tracking", "UTM Tracking"] }, { heading: "Analytics and Reporting", items: ["GA4", "Google Tag Manager", "Google Search Console", "Excel and Pivot Tables", "Power BI"] }, { heading: "SEO and Web", items: ["Technical SEO", "On-Page SEO", "Off-Page SEO", "HTML CSS JavaScript", "Responsive UI"] }].map((group) => (
              <div key={group.heading} className="card-panel skill-card">
                <h3 className="card-title skill-title">{group.heading}</h3>
                <ul className="mt-4 space-y-2 text-slate-600">
                  {group.items.map((item) => <li key={item} className="skill-pill">{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="certifications" className="section-shell" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <SectionIntro overline="Certifications" title="Industry credentials that back my skills" />
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {certifications.map((cert) => (
              <article
                key={cert.name}
                className="card-panel skill-card cert-card"
                role="button"
                tabIndex={0}
                onClick={() => openCertLightbox(cert)}
                onKeyDown={(e) => e.key === "Enter" && openCertLightbox(cert)}
                aria-label={`View ${cert.name}`}
              >
                <h3 className="card-title skill-title">{cert.name}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <button
                  type="button"
                  className="cert-verify-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    openCertLightbox(cert);
                  }}
                >
                  Verify
                </button>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section id="services" className="section-shell" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <SectionIntro overline="What I Can Contribute" title="How I add value to your marketing team" />
          <div className="services-highlight">
            <p className="about-kicker">How I Add Value</p>
            <h3 className="about-heading">Support across paid ads, analytics tracking, and SEO execution</h3>
            <p className="about-text">I contribute in practical execution tasks that improve visibility, measurement accuracy, and campaign efficiency.</p>
          </div>
          <div className="mt-7 grid gap-6 md:grid-cols-3">
            <article className="card-panel service-card"><h3 className="card-title service-title">Campaign Assistance</h3><p className="card-text">Support in planning, launching, and monitoring Google Ads and Meta Ads campaigns.</p></article>
            <article className="card-panel service-card"><h3 className="card-title service-title">Tracking Setup</h3><p className="card-text">GA4 and GTM setup for events like page views, leads, add_to_cart, and purchase.</p></article>
            <article className="card-panel service-card"><h3 className="card-title service-title">SEO Execution</h3><p className="card-text">On-page improvements, technical audits, and off-page activities to improve search visibility.</p></article>
          </div>
        </motion.section>

        <motion.section id="projects" className="section-shell bg-white/45" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <SectionIntro overline="Projects" title="Work samples" />
          <div className="projects-highlight">
            <p className="about-kicker">Project Portfolio</p>
            <h3 className="about-heading">Execution samples from tracking, campaign support, frontend work, and design creatives</h3>
            <p className="about-text">Each project reflects practical implementation experience with clear tools, outcomes, and testing validation.</p>
          </div>
          <div className="mt-7 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "Grocery Store: Live GA4 and GTM Ecommerce Tracking",
                challenge: "Live grocery site needed accurate ecommerce event tracking across the full user journey.",
                actions: "Built and deployed the site; implemented 9 custom GA4 events via GTM.",
                result: "9 custom GA4 events firing live, full ecommerce funnel tracked across 9 pages, 100% validated via GTM Preview and GA4 DebugView.",
                tags: ["GA4", "GTM", "Ecommerce Tracking", "Live Project"],
                image: "/grocery-store-project.png",
                live: true,
                viewUrl: "https://grocerystore.free.je",
              },
              {
                title: "B2B Lead Generation: GA4 and GTM Conversion Tracking",
                challenge: "B2B lead site lacked reliable conversion and engagement measurement.",
                actions: "Configured GA4 + GTM for lead, scroll depth, and CTA events; validated in GTM Preview and DebugView.",
                result: "generate_lead, form_submit, scroll_depth, CTA click — all verified in GTM Preview and GA4 DebugView. Full lead funnel tracked.",
                tags: ["GA4", "GTM", "Lead Tracking", "DebugView", "Live Project"],
                image: "/b2b-lead-project.png",
                live: true,
                viewUrl: "https://demoproject.lovestoblog.com/",
              },
              {
                title: "Meta Ads Lead Generation — Campaign Optimization",
                challenge: "Two live Meta Ads lead generation campaigns had high cost per lead (₹172–₹183) and limited reach due to missing attribution setup and broad audience targeting.",
                actions: "Analyzed campaign structure, fixed attribution window to 7-day click, refined audience targeting, and scaled budget from ₹200 to ₹350/day with performance monitoring.",
                result: "CPL reduced from ₹183 → ₹101 (−44.7%) and leads grew from 1,041 → 1,892 (+81.7%) after optimization. Reach increased by 150%.",
                tags: ["Meta Ads", "Lead Generation", "Campaign Optimization", "CPL Reduction"],
                image: "/meta-ads-project.png",
                viewUrl: "/meta-ads-case-study.html",
                linkLabel: "Read Case Study →",
              },
              {
                title: "Google Ads Search Campaign — Zero to 72 Conversions",
                challenge: "A live Google Ads Search campaign was generating almost no results — only 31 impressions, 26 clicks, zero conversions, and a ROAS of 0.05 — due to low impression share, missing conversion tracking, and weak keyword/ad relevance.",
                actions: "Audited the campaign to diagnose low impression share, restructured keywords with broader match types and negative keywords, set up and validated conversion tracking via GTM, rewrote ad copy for relevance, then scaled budget once conversions were validated.",
                result: "Conversions grew 0 → 72, impressions rose 31 → 5,468 (+17,529%), clicks rose 26 → 1,256 (+4,738%), CPC dropped ₹9.56 → ₹6.21 (−35%), and ROAS improved from 0.05 → 2.53.",
                tags: ["Google Ads", "GTM", "Keyword Optimization", "ROAS"],
                image: "/google-ads-project.png",
                viewUrl: "/google-ads-case-study.html",
                linkLabel: "Read Case Study →",
              },
            ].map((project) => (
              <article key={project.title} className="project-card overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative">
                  {project.placeholder ? (
                    <div className="project-stack-placeholder aspect-video w-full" aria-label="HTML, CSS, JavaScript">
                      <span className="project-stack-badge">HTML</span>
                      <span className="project-stack-divider">|</span>
                      <span className="project-stack-badge">CSS</span>
                      <span className="project-stack-divider">|</span>
                      <span className="project-stack-badge">JavaScript</span>
                    </div>
                  ) : (
                    <img src={project.image} alt={project.title} className="aspect-video w-full object-cover" loading="lazy" />
                  )}
                  {project.live && (
                    <span className="project-live-badge">
                      <span className="project-live-dot" />
                      Live
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="card-title project-title">{project.title}</h3>
                  <div className="mt-2 space-y-2">
                    <p className="card-text project-text"><span className="font-semibold text-slate-800">Challenge:</span> {project.challenge}</p>
                    <p className="card-text project-text"><span className="font-semibold text-slate-800">Actions:</span> {project.actions}</p>
                    <p className="project-outcome"><span className="project-outcome-label">Result:</span> {project.result}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="tag-chip">{tag}</span>)}</div>
                  {project.viewUrl && (
                    <a href={project.viewUrl} target={project.linkLabel ? undefined : "_blank"} rel={project.linkLabel ? undefined : "noreferrer"} className="project-view-link">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                      {project.linkLabel || "View Site"}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section id="creatives" className="section-shell" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <SectionIntro overline="Creatives" title="Designs that support the strategy" description="Visual creatives built in Canva for campaigns, social media, and brand communication." />
          <div className="creatives-highlight">
            <p className="about-kicker">Design Portfolio</p>
            <h3 className="about-heading">Campaign creatives and social assets built for performance and brand clarity</h3>
            <p className="about-text">Each creative is designed with intent — aligned to platform specs, audience targeting goals, and brand consistency. Built in Canva for social media, paid ads, and campaign communication.</p>
          </div>
          <div className="mt-7 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { title: "Meta Ad Creative", tags: ["Canva", "Paid Ads"], image: "/meta-ad-creative.png" },
              { title: "Instagram Story", tags: ["Canva", "Social Media"], image: "/instagram-story-creative.png" },
              { title: "Campaign Banner", tags: ["Canva", "Paid Ads"], image: "/campaign-banner-creative.png" },
              { title: "Brand Awareness Post", tags: ["Canva", "Social Media"], image: "/brand-post-creative.png" },
              { title: "Email Campaign Banner", tags: ["Canva", "Email Marketing"], image: "/email-banner-creative.png" },
              { title: "Product Ad Creative", tags: ["Canva", "Paid Ads"], image: "/product-ad-creative.png" },
            ].map((creative) => (
              // eslint-disable-next-line no-unused-vars
              <article key={creative.title} className="creative-card" onClick={() => setLightboxItem(creative)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setLightboxItem(creative)} aria-label={`View ${creative.title}`}>
                <div className="creative-image-wrap">
                  <img src={creative.image} alt={creative.title} className="creative-image" loading="lazy" />
                  <div className="creative-overlay"><span className="creative-view-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg></span></div>
                </div>
                <div className="creative-body">
                  <p className="creative-caption">{creative.title}</p>
                  <div className="creative-tags">
                    {creative.tags.map((tag) => (
                      <span key={tag} className="creative-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section id="contact" className="section-shell pb-24" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <SectionIntro overline="Contact" title="Open to Marketing Roles and Internships" description="Looking for a performance marketing fresher? Let's connect." />
          <div className="grid gap-8 md:grid-cols-2">
            <form name="contact" method="POST" data-netlify="true" onSubmit={(event) => {
              event.preventDefault();
              const form = event.target;
              const formData = new FormData(form);
              fetch("/", { method: "POST", body: formData }).then(() => { showToast(); form.reset(); }).catch(() => window.alert("Unable to submit form right now. Please try again."));
            }} className="card-panel contact-form-panel grid gap-4">
              <p className="text-sm font-medium text-slate-500">Project Inquiry Form</p>
              <input type="hidden" name="form-name" value="contact" />
              <input name="name" type="text" placeholder="Your Name" className="input-base" required />
              <input name="email" type="email" placeholder="Your Email" className="input-base" required />
              <textarea name="message" rows="5" placeholder="Tell me about your project" className="input-base resize-none" required />
              <button type="submit" className="btn-primary mt-2">Send Message</button>
            </form>

            <div className="card-panel contact-info-panel">
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Direct Contact</p>
              <h3 className="mt-2 text-3xl font-semibold text-slate-900">Start a conversation</h3>
              <p className="mt-2 text-slate-600">Share your goal, timeline, and budget range. I will send a clear action plan.</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="quick-chip">Performance Marketing</span>
                <span className="quick-chip">GA4 and GTM Setup</span>
                <span className="quick-chip">SEO Support</span>
              </div>

              <div className="mt-4 space-y-3 text-slate-600">
                <p><span className="font-medium text-slate-900">Email:</span> dharnejaydev1@gmail.com</p>
                <p><span className="font-medium text-slate-900">Phone:</span> +91 9371420359</p>
                <p><span className="font-medium text-slate-900">Location:</span> Pune, India</p>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-3 text-slate-700">
                <a href="https://www.linkedin.com/in/jaydevdharne" target="_blank" rel="noreferrer" className="social-pill"><IconLinkedIn /> LinkedIn</a>
                <a href="https://www.instagram.com/digirank_" target="_blank" rel="noreferrer" className="social-pill"><IconInstagram /> Instagram</a>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-slate-200 py-7 text-center text-sm text-slate-500">Copyright {new Date().getFullYear()} Jaydev Dharne. All rights reserved.</footer>
      <a href="/JaydevDharne_Resume.pdf" download="JaydevDharne_Resume.pdf" className="sticky-resume-btn btn-primary">Download Resume</a>
      <Toast show={toastVisible} message="Thank you. Your message has been submitted successfully." />
    </div>
  );
}
