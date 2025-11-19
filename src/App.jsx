import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, useTexture, Environment } from "@react-three/drei";
import { motion } from "framer-motion";

/* -------------------- SVG ICONS (No extra library) -------------------- */
function IconLinkedIn({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.5h4.56V23H.22V8.5zM8.7 8.5h4.37v1.98h.06c.61-1.16 2.11-2.38 4.34-2.38 4.64 0 5.5 3.05 5.5 7.02V23h-4.75v-6.52c0-1.56-.03-3.57-2.18-3.57-2.18 0-2.51 1.7-2.51 3.45V23H8.7V8.5z"/>
    </svg>
  );
}
function IconInstagram({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.4a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.16.46.346 1.26.4 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.4 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.46.16-1.26.346-2.43.4-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.4a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.16-.46-.346-1.26-.4-2.43C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.054-1.17.24-1.97.4-2.43A4.9 4.9 0 0 1 3.82 2.95 4.9 4.9 0 0 1 5.59 1.8c.46-.16 1.26-.346 2.43-.4C9.284 1.342 9.67 1.33 12 1.33zm0 1.8c-3.15 0-3.52.012-4.76.07-1.02.047-1.57.217-1.94.36-.49.19-.83.418-1.2.789-.37.37-.6.71-.79 1.2-.14.37-.31.92-.36 1.94-.058 1.24-.07 1.61-.07 4.76s.012 3.52.07 4.76c.047 1.02.217 1.57.36 1.94.19.49.418.83.789 1.2.37.37.71.6 1.2.79.37.14.92.31 1.94.36 1.24.058 1.61.07 4.76.07s3.52-.012 4.76-.07c1.02-.047 1.57-.217 1.94-.36.49-.19.83-.418 1.2-.789.37-.37.6-.71.79-1.2.14-.37.31-.92.36-1.94.058-1.24.07-1.61.07-4.76s-.012-3.52-.07-4.76c-.047-1.02-.217-1.57-.36-1.94a3.1 3.1 0 0 0-.79-1.2 3.1 3.1 0 0 0-1.2-.79c-.37-.14-.92-.31-1.94-.36-1.24-.058-1.61-.07-4.76-.07zm0 3.6a6.4 6.4 0 1 1 0 12.8 6.4 6.4 0 0 1 0-12.8zm0 2a4.4 4.4 0 1 0 0 8.8 4.4 4.4 0 0 0 0-8.8zm6.9-2.04a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
    </svg>
  );
}

/* -------------------- 3D LOGO -------------------- */
function Logo3D() {
  const texture = useTexture("/logo.png"); // put logo.png in /public
  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={1.2}>
      <mesh scale={[2.8, 2.8, 2.8]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial map={texture} transparent />
      </mesh>
    </Float>
  );
}

/* -------------------- UTIL: SECTION FADE-IN -------------------- */
const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* -------------------- Track active section -------------------- */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.6 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

/* -------------------- Subtle Apple Style Background -------------------- */
function BackgroundFX() {
  return (
    <>
      <style>{`
        @keyframes softRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        
        {/* Soft radial main background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #dceeff, #ffffff 70%)",
          }}
        />

        {/* Very soft moving conic glow */}
        <div
          className="absolute -top-40 -right-40 h-[550px] w-[550px] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "conic-gradient(from 0deg, #92cfee, #ffffff, #b9ddff, #92cfee)",
            animation: "softRotate 45s linear infinite",
          }}
        />
      </div>
    </>
  );
}



/* ==================== APP ==================== */
function Toast({ message, show }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: show ? "20px" : "-400px",
        transition: "all 0.5s ease",
        padding: "14px 20px",
        background: "rgba(240, 248, 255, 0.9)", // bluish-white
        color: "black",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        fontSize: "15px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        zIndex: 9999
      }}
    >
      <span style={{ fontSize: "20px", color: "green" }}>✔</span>
      {message}
    </div>
  );
}


export default function App() {
  const sections = useMemo(
    () => ["home", "about", "skills", "services", "projects", "contact"],
    []
  );
  const active = useActiveSection(sections);
  // ADD THIS INSIDE App() — below your other useState lines
const [toastShow, setToastShow] = useState(false);

const showToast = () => {
  setToastShow(true);
  setTimeout(() => setToastShow(false), 4000);
};


  // iOS segmented indicator centering fix (accounts for nav padding)
  const navRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return;

    const nav = navRef.current;
    const links = nav.querySelectorAll("a.nav-link");
    const current = Array.from(links).find(
      (a) => a.getAttribute("href") === `#${active}`
    );

    if (current) {
      const navStyles = window.getComputedStyle(nav);
      const paddingLeft = parseFloat(navStyles.paddingLeft);
      const left = current.offsetLeft - paddingLeft;

      indicatorRef.current.style.width = `${current.offsetWidth}px`;
      // springy feel without changing your structure
      indicatorRef.current.style.transitionTimingFunction = "cubic-bezier(0.22,1,0.36,1)";
      indicatorRef.current.style.transform = `translateX(${left}px)`;
    }
  }, [active]);

  // enable smooth scroll behavior programmatically (keeps your scroll-smooth class too)
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = ""; };
  }, []);

  return (
    <div className="min-h-screen text-[var(--text)] selection:bg-[var(--accent)]/40 scroll-smooth">

      <BackgroundFX />

      {/* ---------- NAVBAR ---------- */}
      <header className="w-full flex justify-center sticky top-4 z-50 px-4">
        <nav
          ref={navRef}
          className="relative flex items-center gap-1 rounded-full px-4 py-2 backdrop-blur-xl bg-white/60 border border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
        >
          <span
            ref={indicatorRef}
            className="absolute inset-y-1 bg-black rounded-full transition-all duration-400"
            style={{ width: 0, transform: "translateX(0px)" }}
          />
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-link px-4 py-2 rounded-full relative z-10 transition ${
                active === id ? "text-white" : "text-gray-700 hover:text-black"
              }`}
            >
              <span className="capitalize">{id}</span>
            </a>
          ))}
        </nav>
      </header>

      {/* ---------- HERO (Professional Layout) ---------- */}
      <section
        id="home"
        className="max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-14 items-center"
      >
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 text-sm border border-black/10 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Available for Internship & Projects
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mt-6">
            Hi, I'm <span className="text-red-600">Jaydev Dharne</span>
          </h1>

          <p className="text-lg text-gray-700 mt-4 max-w-md leading-relaxed">
            Computer Science graduate exploring <span className="font-semibold">Digital Marketing</span>
            {" "}and <span className="font-semibold">Data Analytics</span> — combining data, creativity, and
            {" "}strategy to build meaningful digital experiences.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="#contact"
              className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-red-600 transition"
            >
              Hire Me
            </a>
            <a
              href="/resume.pdf"
              className="px-6 py-3 border border-black font-medium rounded-lg hover:border-red-600 hover:text-red-600 transition"
            >
              Download Resume
            </a>
          </div>

          {/* Socials with icons */}
          <div className="mt-5 flex items-center gap-5 text-black/70">
            <a
              href="https://www.linkedin.com/in/jaydevdharne"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-black"
            >
              <IconLinkedIn /> <span className="text-sm font-medium">LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/digirank_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-black"
            >
              <IconInstagram /> <span className="text-sm font-medium">Instagram</span>
            </a>
          </div>
        </motion.div>

        {/* 3D Logo (as you have) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
         
        </motion.div>
      </section>

      {/* ---------- ABOUT SECTION (Your text preserved) ---------- */}
      <motion.section
        id="about"
        className="max-w-6xl mx-auto px-6 py-24 border-t border-black/10"
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-sm font-semibold text-gray-500 tracking-wide mb-3">ABOUT ME</h2>

        <h3 className="text-4xl font-bold leading-tight mb-6">
          Building Meaningful<br />Digital & Data-Driven Experiences
        </h3>

        <p className="text-gray-700 max-w-3xl leading-7">
          I'm a Computer Science graduate with a growing focus in
          <span className="font-semibold text-black"> Digital Marketing</span> and
          <span className="font-semibold text-black"> Data Analytics</span>.
          I work on combining data understanding, user behavior, and modern design to help
          businesses make better decisions and grow online.
        </p>

        <p className="text-gray-700 max-w-3xl leading-7 mt-4">
          I am currently developing skills in
          <span className="font-medium"> SQL, Excel, Python, and Power BI</span> for analytics and reporting,
          while also executing marketing strategies that focus on conversions, performance, and audience insights.
          I also have hands-on experience with <span className="font-medium">HTML, CSS, JavaScript, and React</span>.
        </p>

        <p className="text-gray-700 max-w-3xl leading-7 mt-4">
          I previously worked at <span className="font-medium text-black">D-Mart (Retail Operations)</span>,
          where I learned workflow discipline, customer interaction, and practical teamwork in a fast environment.
          That experience strengthened my focus, communication, and execution mindset.
        </p>

        <h4 className="text-lg font-semibold mt-10 mb-4">What I Bring</h4>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="border p-6 rounded-xl bg-white hover:shadow-lg transition">
            <h5 className="font-semibold text-lg mb-2">Data & Marketing Skills</h5>
            <p className="text-gray-600 text-sm leading-6">
              Digital Marketing, Performance Strategy, SQL, Excel, Python, Power BI
            </p>
          </div>

          <div className="border p-6 rounded-xl bg-white hover:shadow-lg transition">
            <h5 className="font-semibold text-lg mb-2">Education</h5>
            <p className="text-gray-600 text-sm leading-6">
              B.Sc. in Computer Science
            </p>
          </div>

          <div className="border p-6 rounded-xl bg-white hover:shadow-lg transition">
            <h5 className="font-semibold text-lg mb-2">Work Mindset</h5>
            <p className="text-gray-600 text-sm leading-6">
              Consistent learner, structured thinker, result-oriented approach
            </p>
          </div>
        </div>
      </motion.section>

      {/* ---------- SKILLS SECTION ---------- */}
      <motion.section
        id="skills"
        className="max-w-6xl mx-auto px-6 py-24 border-t border-black/10"
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-sm font-semibold text-gray-500 tracking-wide mb-3">SKILLS</h2>

        <h3 className="text-4xl font-bold leading-tight mb-12">
          Tools & Skills I Work With
        </h3>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Digital Marketing */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Digital Marketing</h4>
            <div className="grid gap-3">
              {[
                "Meta Ads (FB/Instagram)",
                "Google Ads (Search & Display)",
                "Brand Strategy",
                "Content Marketing",
                "Landing Page Conversion Strategy",
              ].map((skill) => (
                <div
                  key={skill}
                  className="p-3 border rounded-lg bg-white hover:shadow-md transition text-gray-700"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Data / Analytics */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Data & Analytics</h4>
            <div className="grid gap-3">
              {[
                "SQL",
                "Excel (Data Cleaning + Reporting)",
                "Power BI Dashboards",
                "Python (Pandas / Analysis)",
                "Business Decision Insights",
              ].map((skill) => (
                <div
                  key={skill}
                  className="p-3 border rounded-lg bg-white hover:shadow-md transition text-gray-700"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Development */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Web Development</h4>
            <div className="grid gap-3">
              {[
                "HTML + CSS",
                "JavaScript",
                "React (Frontend UI)",
                "Tailwind CSS",
              ].map((skill) => (
                <div
                  key={skill}
                  className="p-3 border rounded-lg bg-white hover:shadow-md transition text-gray-700"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

{/* ---------- SERVICES SECTION ---------- */}
<motion.section
        id="services"
        className="max-w-6xl mx-auto px-6 py-24 border-t border-black/10"
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-sm font-semibold text-gray-500 tracking-wide mb-3">SERVICES</h2>

        <h3 className="text-4xl font-bold leading-tight mb-12">
          What I Can Help You With
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Performance Marketing */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="p-7 border rounded-2xl bg-white hover:shadow-xl transition shadow-sm"
          >
            <h4 className="text-lg font-semibold mb-3">Performance Marketing</h4>
            <p className="text-gray-600 text-sm leading-6">
              Creating strategic ad campaigns on Meta and Google that focus on conversion, audience intent,
              and measurable ROI.
            </p>
            <div className="mt-4">
              <span className="inline-block text-xs bg-black text-white px-3 py-1 rounded-full">Meta Ads</span>
              <span className="inline-block text-xs bg-black/80 text-white px-3 py-1 rounded-full ml-2">Google Ads</span>
            </div>
          </motion.div>

          {/* Web Development */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="p-7 border rounded-2xl bg-white hover:shadow-xl transition shadow-sm"
          >
            <h4 className="text-lg font-semibold mb-3">Web Development</h4>
            <p className="text-gray-600 text-sm leading-6">
              Designing and building responsive, modern websites with clean UI and smooth user journeys
              that convert visitors into leads.
            </p>
            <div className="mt-4">
              <span className="inline-block text-xs bg-black text-white px-3 py-1 rounded-full">React</span>
              <span className="inline-block text-xs bg-black/80 text-white px-3 py-1 rounded-full ml-2">Tailwind</span>
              <span className="inline-block text-xs bg-black/70 text-white px-3 py-1 rounded-full ml-2">HTML/CSS</span>
            </div>
          </motion.div>

          {/* Data Analytics */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="p-7 border rounded-2xl bg-white hover:shadow-xl transition shadow-sm"
          >
            <h4 className="text-lg font-semibold mb-3">Data Analytics & Insights</h4>
            <p className="text-gray-600 text-sm leading-6">
              Transforming raw data into meaningful dashboards and insights to support better business
              decisions and performance understanding.
            </p>
            <div className="mt-4">
              <span className="inline-block text-xs bg-black text-white px-3 py-1 rounded-full">Power BI</span>
              <span className="inline-block text-xs bg-black/80 text-white px-3 py-1 rounded-full ml-2">SQL</span>
              <span className="inline-block text-xs bg-black/70 text-white px-3 py-1 rounded-full ml-2">Excel</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ---------- PROJECTS SECTION ---------- */}
      <motion.section
        id="projects"
        className="max-w-6xl mx-auto px-6 py-24 border-t border-black/10"
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-sm font-semibold text-gray-500 tracking-wide mb-3">PROJECTS</h2>

        <h3 className="text-4xl font-bold leading-tight mb-12">
          Selected Work
        </h3>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Project 1 */}
          <a
            href="#"
            className="group border rounded-2xl overflow-hidden bg-white hover:shadow-xl transition block"
          >
            <div className="aspect-video bg-gray-200 relative overflow-hidden">
              <img
                src="https://picsum.photos/seed/grocery/800/450"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                alt="Grocery Website"
              />
            </div>
            <div className="p-6">
              <h4 className="font-semibold text-lg">Grocery E-Commerce Website</h4>
              <p className="text-gray-600 text-sm mt-2 leading-6">
                Full e-commerce web system with cart, checkout, and user accounts.
              </p>
              <div className="flex gap-2 mt-4 text-xs">
                <span className="px-3 py-1 rounded-full bg-black text-white">HTML</span>
                <span className="px-3 py-1 rounded-full bg-black text-white">CSS</span>
                <span className="px-3 py-1 rounded-full bg-black text-white">PHP</span>
              </div>
            </div>
          </a>

          {/* Project 2 */}
          <a
            href="#"
            className="group border rounded-2xl overflow-hidden bg-white hover:shadow-xl transition block"
          >
            <div className="aspect-video bg-gray-200 relative overflow-hidden">
              <img
                src="https://picsum.photos/seed/marketing/800/450"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                alt="Insurance Lead Campaign"
              />
            </div>
            <div className="p-6">
              <h4 className="font-semibold text-lg">Insurance Lead Campaign</h4>
              <p className="text-gray-600 text-sm mt-2 leading-6">
                Performance campaign generating high-intent leads with optimized funnels.
              </p>
              <div className="flex gap-2 mt-4 text-xs">
                <span className="px-3 py-1 rounded-full bg-black text-white">Meta Ads</span>
                <span className="px-3 py-1 rounded-full bg-black text-white">Copywriting</span>
                <span className="px-3 py-1 rounded-full bg-black text-white">Landing Pages</span>
              </div>
            </div>
          </a>

          {/* Project 3 */}
          <a
            href="#"
            className="group border rounded-2xl overflow-hidden bg-white hover:shadow-xl transition block"
          >
            <div className="aspect-video bg-gray-200 relative overflow-hidden">
              <img
                src="https://picsum.photos/seed/dashboard/800/450"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                alt="Data Dashboard"
              />
            </div>
            <div className="p-6">
              <h4 className="font-semibold text-lg">Sales & Trends Dashboard</h4>
              <p className="text-gray-600 text-sm mt-2 leading-6">
                Interactive Power BI dashboard showcasing business performance insights.
              </p>
              <div className="flex gap-2 mt-4 text-xs">
                <span className="px-3 py-1 rounded-full bg-black text-white">Power BI</span>
                <span className="px-3 py-1 rounded-full bg-black text-white">SQL</span>
                <span className="px-3 py-1 rounded-full bg-black text-white">Excel</span>
              </div>
            </div>
          </a>
        </div>
      </motion.section>


    {/* ---------- CONTACT SECTION ---------- */}
<motion.section
  id="contact"
  className="max-w-6xl mx-auto px-6 py-24 border-t border-black/10"
  variants={fadeIn}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.3 }}
>
  <h2 className="text-3xl font-bold mb-6">Get in Touch with Us</h2>
  <p className="text-gray-700 mb-8">I reply within 24 hours.</p>

  <div className="grid md:grid-cols-2 gap-8">

    {/* ---------- CONTACT FORM (Netlify) ---------- */}
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        fetch("/", {
          method: "POST",
          body: formData,
        })
          .then(() => {
            showToast();
            form.reset();
          })
          .catch((error) => alert(error));
      }}
      className="grid gap-4"
    >
      <input type="hidden" name="form-name" value="contact" />

      <input
        name="name"
        type="text"
        placeholder="Your Name"
        className="border p-3 rounded-lg"
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Your Email"
        className="border p-3 rounded-lg"
        required
      />

      <textarea
        name="message"
        placeholder="Your Message"
        rows="5"
        className="border p-3 rounded-lg"
        required
      />

      <button
        type="submit"
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-red-600 transition"
      >
        Send Message
      </button>
    </form>

    {/* ---------- CONTACT DETAILS ---------- */}
    <div className="space-y-3 text-gray-700">
      <p><strong>Email:</strong> dharnejaydev7@gmail.com</p>
      <p><strong>Phone:</strong> 9371420359</p>
      <p><strong>Location:</strong> Pune, India</p>

      <div className="pt-4 flex gap-5 text-black font-medium">
        <a
          href="https://www.linkedin.com/in/jaydevdharne"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-red-600"
        >
          <IconLinkedIn /> LinkedIn
        </a>
        <a
          href="https://www.instagram.com/digirank_"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-red-600"
        >
          <IconInstagram /> Instagram
        </a>
      </div>
    </div>

  </div>
</motion.section>
  
    

      {/* ---------- FOOTER ---------- */}
      <footer className="text-center py-8 border-t border-black/10 text-gray-600 text-sm">
        © {new Date().getFullYear()} DIGIRANK · All Rights Reserved.
      </footer>
      <Toast
  message="Your response has been submitted. I will reply shortly."
  show={toastShow}
/>

    </div>
  );
}
