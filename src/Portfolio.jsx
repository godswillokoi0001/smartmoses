import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// --- Project Data ---
const PROJECTS = [
  {
    id: 'rayto-prolog',
    num: '01',
    name: 'Rayto Prolog',
    category: 'Web Design & Development',
    role: 'Lead Designer & Frontend Developer',
    description:
      'A modern, high-clarity web presence designed for Rayto Prolog. Built with a keen focus on brand authority, streamlined navigation, responsive layout hierarchy, and seamless user conversion.',
    tech: ['React', 'Tailwind CSS', 'JavaScript', 'Responsive UI'],
    status: 'Completed',
    statusType: 'completed',
    stats: 'Full Responsive Launch',
    accentColor: '#63D6BE',
    previewType: 'browser',
    previewDetails: {
      url: 'raytoprolog.com',
      sections: ['Hero Architecture', 'Product Spectrum', 'Interactive Inquiry'],
    },
  },
  {
    id: 'vendor-marketplace',
    num: '02',
    name: 'Vendor Marketplace',
    category: 'Web Application',
    role: 'Frontend Architect & UI Developer',
    description:
      'A scalable multi-vendor digital commerce platform interface. Designed with modular store fronts, vendor product management flows, category filters, and an intuitive customer shopping experience.',
    tech: ['React', 'JavaScript', 'Tailwind CSS', 'State Management'],
    status: 'In Active Development',
    statusType: 'prototype',
    stats: 'Multi-Store Architecture',
    accentColor: '#52C7AE',
    previewType: 'marketplace',
    previewDetails: {
      url: 'marketplace-app.local',
      sections: ['Storefront Directory', 'Vendor Dashboard', 'Checkout Cart'],
    },
  },
  {
    id: 'freshcart',
    num: '03',
    name: 'Freshcart',
    category: 'E-Commerce Platform',
    role: 'UI Designer & Frontend Developer',
    description:
      'A clean, highly usable grocery and essential shopping e-commerce interface. Emphasizes instant cart feedback, clear price breakdown, accessible search, and smooth mobile usability.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    status: 'Completed',
    statusType: 'completed',
    stats: 'Fast Item Discovery',
    accentColor: '#63D6BE',
    previewType: 'store',
    previewDetails: {
      url: 'freshcart-shop.app',
      sections: ['Dynamic Catalog', 'Instant Basket', 'Order Summary'],
    },
  },
  {
    id: 'logistics-application',
    num: '04',
    name: 'Logistics Application',
    category: 'Web Application & Dashboard',
    role: 'Frontend UI Engineer',
    description:
      'An end-to-end logistics dispatch and parcel routing portal. Features parcel status tracking, shipment route visualization, and structured operational dashboards designed for everyday utility.',
    tech: ['React', 'Tailwind CSS', 'Interactive Components'],
    status: 'Prototype / In Development',
    statusType: 'prototype',
    stats: 'Fleet & Parcel Tracking',
    accentColor: '#4EBDA6',
    previewType: 'dashboard',
    previewDetails: {
      url: 'logistics-portal.internal',
      sections: ['Live Tracking Map', 'Dispatch Analytics', 'Delivery Logs'],
    },
  },
]

const CAPABILITIES = [
  {
    number: 'A',
    title: 'Web Design & Development',
    description:
      'Designing and building modern, responsive websites that communicate clearly and create meaningful experiences across devices.',
    detail:
      'From initial layout wireframes to live production code, every screen is built with clean typography, balanced spacing, and purposeful visual flow.',
  },
  {
    number: 'B',
    title: 'Frontend Development',
    description:
      'Translating ideas and designs into interactive interfaces through structured, maintainable frontend code.',
    detail:
      'Writing performant, clean React and modern CSS that loads quickly, scales effortlessly, and ensures seamless interactions for users.',
  },
  {
    number: 'C',
    title: 'Web Applications',
    description:
      'Building functional digital experiences with practical workflows, user interactions, and business-focused functionality.',
    detail:
      'Architecting intuitive user interfaces for dashboards, e-commerce stores, and digital tools where user experience and utility are paramount.',
  },
  {
    number: 'D',
    title: 'Business-Focused Thinking',
    description:
      'Understanding the business behind the interface to create digital solutions that serve actual objectives.',
    detail:
      'A website should not merely look attractive; it must communicate authority, guide decisions, and generate tangible growth for your business.',
  },
]

const CREATIVE_SKILLS = [
  {
    title: 'Graphic Design',
    description: 'High-impact visual assets, digital banners, and marketing materials that align with your core identity.',
  },
  {
    title: 'Visual Communication',
    description: 'Structuring complex information visually so customers grasp your core value proposition in seconds.',
  },
  {
    title: 'Branding & Identity',
    description: 'Cohesive color systems, typography pairing, and visual guidelines that cultivate customer trust.',
  },
  {
    title: 'Video Editing & Motion',
    description: 'Engaging motion and short-form video pacing that captivate audiences and elevate brand storytelling.',
  },
  {
    title: 'Content Production',
    description: 'Strategic digital assets crafted to reinforce brand credibility across social and web touchpoints.',
  },
]

const TECH_CATEGORIES = [
  {
    name: 'Frontend Development',
    description: 'Core technologies used to architect fast, responsive interfaces.',
    skills: ['HTML5', 'CSS3 / Modern CSS', 'JavaScript (ES6+)', 'React.js', 'Tailwind CSS', 'Responsive Layouts'],
  },
  {
    name: 'Development Tools',
    description: 'Version control, editors, and design tools in my daily workflow.',
    skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Chrome DevTools', 'Postman'],
  },
  {
    name: 'Deployment & Practices',
    description: 'Hosting, maintenance, and engineering standards.',
    skills: ['Vercel', 'Vite', 'Component Architecture', 'Semantic HTML', 'SEO Fundamentals', 'Web Performance'],
  },
]

const EXPERIENCE_ITEMS = [
  {
    period: '2022 — Present',
    role: 'Web Designer & Developer',
    organization: 'Independent / Freelance',
    type: 'Client Projects',
    summary:
      'Partnering directly with business owners, startups, and creative brands to design and build custom websites, landing pages, and interactive web tools.',
    bulletPoints: [
      'Design and code bespoke responsive websites using React, modern JavaScript, and Tailwind CSS.',
      'Transform client requirements into clear, goal-driven user experiences and functional digital products.',
      'Optimize web performance, cross-browser compatibility, mobile responsiveness, and on-page SEO.',
      'Deliver ongoing iterative improvements and technical advisory for clients across multiple industries.',
    ],
  },
  {
    period: '2022 — Present',
    role: 'Creative & Digital Brand Support',
    organization: 'Smotiva Digital',
    type: 'Agency & Collaborative Engagements',
    summary:
      'Contributing creative perspective, graphic design, and video editing to broader digital brand-building projects alongside core web development initiatives.',
    bulletPoints: [
      'Coordinate visual communication assets, brand identity elements, and promotional digital collateral.',
      'Produce short-form video edits and motion content that complement digital brand launches.',
      'Bridge the gap between marketing brand aesthetics and technical web execution.',
    ],
  },
]

const PROCESS_STEPS = [
  {
    step: '01',
    name: 'Understand',
    summary: 'Understand the business, objectives, audience, and problem.',
    description:
      'Every project begins by getting to the core of what you do, who your audience is, and the measurable outcome your website must achieve.',
  },
  {
    step: '02',
    name: 'Design',
    summary: 'Establish structure, visual direction, and user experience.',
    description:
      'Crafting intentional layout compositions, establishing typographic hierarchy, and designing thoughtful interactive components.',
  },
  {
    step: '03',
    name: 'Develop',
    summary: 'Build responsive interfaces and functional experiences.',
    description:
      'Transforming approved designs into clean, maintainable frontend code. Building with speed, accessibility, and responsiveness across all screens.',
  },
  {
    step: '04',
    name: 'Refine',
    summary: 'Test, improve, optimize, and prepare for delivery.',
    description:
      'Meticulous quality control, device testing, performance tuning, and final launch preparation to ensure your digital presence is flawless.',
  },
]

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('smartmoses@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2400)
  }

  return (
    <div className="min-h-screen bg-[#0B1513] text-[#F2F5F3] font-sans selection:bg-[#63D6BE]/20 selection:text-[#63D6BE]">
      
      {/* ───────────────────────────────────────────────────────────
          1. NAVIGATION
      ─────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B1513]/90 backdrop-blur-md border-b border-[#63D6BE]/10 py-4 shadow-lg shadow-black/20'
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Mark */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#63D6BE]"
          >
            <div className="w-9 h-9 rounded-lg bg-[#111E1B] border border-[#63D6BE]/25 flex items-center justify-center text-[#63D6BE] font-bold text-sm tracking-wider group-hover:border-[#63D6BE] transition-colors">
              SM
            </div>
            <div className="flex flex-col">
              <span className="font-['Syne'] font-bold text-base tracking-tight text-[#F2F5F3] group-hover:text-[#63D6BE] transition-colors">
                Smart Moses
              </span>
              <span className="text-[10px] tracking-widest text-[#A0AEA9] uppercase font-medium">
                Web Designer &amp; Developer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-sm font-medium text-[#A0AEA9] hover:text-[#63D6BE] transition-colors tracking-wide"
            >
              Home
            </a>
            <a
              href="#work"
              className="text-sm font-medium text-[#A0AEA9] hover:text-[#63D6BE] transition-colors tracking-wide"
            >
              Work
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-[#A0AEA9] hover:text-[#63D6BE] transition-colors tracking-wide"
            >
              About
            </a>
            <a
              href="#capabilities"
              className="text-sm font-medium text-[#A0AEA9] hover:text-[#63D6BE] transition-colors tracking-wide"
            >
              Capabilities
            </a>
            <a
              href="#experience"
              className="text-sm font-medium text-[#A0AEA9] hover:text-[#63D6BE] transition-colors tracking-wide"
            >
              Experience
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-[#A0AEA9] hover:text-[#63D6BE] transition-colors tracking-wide"
            >
              Contact
            </a>
          </nav>

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#63D6BE] text-[#0B1513] text-xs font-bold uppercase tracking-wider hover:bg-[#7ff3dc] transition-all transform hover:-translate-y-0.5 shadow-md shadow-[#63D6BE]/10"
            >
              <span>Hire Me</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#111E1B] border border-[#63D6BE]/15 text-[#A0AEA9] hover:text-[#63D6BE]"
              aria-label="Toggle Navigation Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0E1B18] border-b border-[#63D6BE]/15 px-6 py-6"
            >
              <div className="flex flex-col gap-4">
                <a
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[#F2F5F3] hover:text-[#63D6BE] transition-colors py-1"
                >
                  Home
                </a>
                <a
                  href="#work"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[#F2F5F3] hover:text-[#63D6BE] transition-colors py-1"
                >
                  Work
                </a>
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[#F2F5F3] hover:text-[#63D6BE] transition-colors py-1"
                >
                  About
                </a>
                <a
                  href="#capabilities"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[#F2F5F3] hover:text-[#63D6BE] transition-colors py-1"
                >
                  Capabilities
                </a>
                <a
                  href="#experience"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[#F2F5F3] hover:text-[#63D6BE] transition-colors py-1"
                >
                  Experience
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[#F2F5F3] hover:text-[#63D6BE] transition-colors py-1"
                >
                  Contact
                </a>
                <div className="pt-3 border-t border-[#63D6BE]/10">
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex w-full justify-center items-center gap-2 py-3 rounded-xl bg-[#63D6BE] text-[#0B1513] font-bold text-sm tracking-wide"
                  >
                    Hire Me
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ───────────────────────────────────────────────────────────
          2. HERO SECTION (Editorial Two-Column Layout)
      ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#63D6BE]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-48 w-96 h-96 bg-[#63D6BE]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-7 flex flex-col items-start">
              
              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#111E1B] border border-[#63D6BE]/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#63D6BE] animate-pulse-subtle" />
                <span className="text-[11px] font-semibold tracking-widest text-[#63D6BE] uppercase">
                  Web Designer &amp; Developer
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-['Syne'] font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] text-[#F2F5F3] leading-[1.08] tracking-tight mb-6">
                I build digital experiences that make{' '}
                <span className="text-[#63D6BE] relative inline-block">
                  businesses stand out.
                  <span className="absolute left-0 bottom-1 w-full h-[3px] bg-[#63D6BE]/30 -z-10 rounded-full" />
                </span>
              </h1>

              {/* Supporting Description */}
              <p className="text-base sm:text-lg text-[#A0AEA9] leading-relaxed max-w-xl mb-8 font-normal">
                I design and develop modern websites and functional web applications, combining thoughtful design with practical engineering to turn ideas into meaningful digital experiences.
              </p>

              {/* CTAs and Availability Status */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-10">
                <a
                  href="#work"
                  className="px-7 py-3.5 rounded-xl bg-[#63D6BE] text-[#0B1513] font-bold text-sm tracking-wide hover:bg-[#7ff3dc] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#63D6BE]/15 flex items-center gap-2"
                >
                  <span>View My Work</span>
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3V13M8 13L13 8M8 13L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                
                <a
                  href="#contact"
                  className="px-7 py-3.5 rounded-xl bg-[#111E1B] text-[#F2F5F3] border border-[#63D6BE]/20 font-semibold text-sm hover:border-[#63D6BE]/50 hover:bg-[#152622] transition-all"
                >
                  Let's Talk
                </a>
              </div>

              {/* Availability Note */}
              <div className="flex items-center gap-3 text-xs text-[#A0AEA9] pt-4 border-t border-[#63D6BE]/10 w-full sm:w-auto">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#63D6BE] animate-pulse-subtle" />
                <span>Available for selected client projects &amp; development roles</span>
              </div>
            </div>

            {/* Right Column: Art-Directed Editorial Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Visual Decorative Frame Backdrop */}
                <div className="absolute -inset-3 bg-gradient-to-br from-[#63D6BE]/15 via-transparent to-[#63D6BE]/5 rounded-3xl blur-xl" />
                
                {/* Portrait Card */}
                <div className="relative rounded-2xl bg-[#111E1B] border border-[#63D6BE]/20 overflow-hidden shadow-2xl shadow-black/60 group">
                  
                  {/* Image Container with Careful Dark Vignette */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#0B1513]">
                    <img
                      src="/images/me.jpeg"
                      alt="Smart Moses — Web Designer and Developer"
                      className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111E1B] via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Editorial Tag Floating on Image */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#0B1513]/85 backdrop-blur-md border border-[#63D6BE]/20 flex items-center justify-between">
                    <div>
                      <p className="font-['Syne'] font-bold text-sm text-[#F2F5F3]">
                        Smart Moses
                      </p>
                      <p className="text-[11px] text-[#63D6BE] tracking-wider uppercase font-medium">
                        Web Designer &amp; Developer
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#63D6BE]/10 border border-[#63D6BE]/30 flex items-center justify-center text-[#63D6BE] text-xs">
                      ✦
                    </div>
                  </div>

                </div>

                {/* Asymmetric Floating Spec Card */}
                <div className="absolute -bottom-6 -left-6 hidden sm:block p-4 rounded-xl bg-[#152622] border border-[#63D6BE]/30 shadow-xl backdrop-blur-md">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-[#63D6BE] mb-1">
                    Design &amp; Engineering
                  </div>
                  <div className="text-xs font-medium text-[#F2F5F3]">
                    Thoughtful Digital Products
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          3. VALUE PILLARS (Brand Position Sub-Banner)
      ─────────────────────────────────────────────────────────── */}
      <section className="border-y border-[#63D6BE]/10 bg-[#111E1B]/50 py-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-[#63D6BE] font-semibold mb-1">Core Focus</span>
              <span className="font-['Syne'] font-bold text-base text-[#F2F5F3]">Web Design &amp; Dev</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-[#63D6BE] font-semibold mb-1">Creative Edge</span>
              <span className="font-['Syne'] font-bold text-base text-[#F2F5F3]">Visual &amp; Brand Systems</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-[#63D6BE] font-semibold mb-1">Execution</span>
              <span className="font-['Syne'] font-bold text-base text-[#F2F5F3]">Clean Frontend Code</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-[#63D6BE] font-semibold mb-1">Philosophy</span>
              <span className="font-['Syne'] font-bold text-base text-[#F2F5F3]">Purpose-Driven Digital</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          4. SELECTED WORK / PROJECT SHOWCASE
      ─────────────────────────────────────────────────────────── */}
      <section id="work" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Section Header */}
          <div className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#63D6BE] uppercase tracking-widest mb-3">
              <span>01</span>
              <span className="w-8 h-[1px] bg-[#63D6BE]" />
              <span>Project Showcase</span>
            </div>
            <h2 className="font-['Syne'] font-bold text-3xl sm:text-4xl md:text-5xl text-[#F2F5F3] tracking-tight mb-4">
              Selected Work
            </h2>
            <p className="text-base text-[#A0AEA9] leading-relaxed">
              A collection of digital experiences shaped by design thinking, technical execution, and real-world problem-solving.
            </p>
          </div>

          {/* Project List: Deliberate Variations in Composition */}
          <div className="flex flex-col gap-14 sm:gap-20">
            {PROJECTS.map((project, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div
                  key={project.id}
                  className="rounded-2xl bg-[#111E1B] border border-[#63D6BE]/15 overflow-hidden hover:border-[#63D6BE]/35 transition-all duration-300 shadow-xl shadow-black/40 group"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 items-stretch ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                    
                    {/* Project Information */}
                    <div className={`p-8 sm:p-12 lg:col-span-6 flex flex-col justify-between ${isEven ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
                      <div>
                        
                        {/* Eyebrow & Status */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold tracking-widest text-[#63D6BE] uppercase">
                            {project.category}
                          </span>
                          <span
                            className={`text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider ${
                              project.statusType === 'completed'
                                ? 'bg-[#63D6BE]/15 text-[#63D6BE] border border-[#63D6BE]/30'
                                : 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-['Syne'] font-bold text-2xl sm:text-3xl text-[#F2F5F3] mb-3 group-hover:text-[#63D6BE] transition-colors">
                          {project.name}
                        </h3>

                        {/* Role */}
                        <div className="text-xs text-[#A0AEA9] font-medium mb-4 flex items-center gap-2">
                          <span className="text-[#52635E]">Role:</span>
                          <span className="text-[#F2F5F3]">{project.role}</span>
                        </div>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-[#A0AEA9] leading-relaxed mb-6">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Badges & Link */}
                      <div className="pt-6 border-t border-[#63D6BE]/10">
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="text-xs px-3 py-1 rounded-md bg-[#0B1513] text-[#A0AEA9] border border-[#63D6BE]/15 font-mono"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#63D6BE]">
                            <span>{project.stats}</span>
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Project Visual / Browser Mockup Panel */}
                    <div className={`bg-[#0E1A17] p-8 lg:col-span-6 flex items-center justify-center border-t lg:border-t-0 border-[#63D6BE]/10 ${isEven ? 'order-1 lg:order-2 lg:border-l' : 'order-1 lg:order-1 lg:border-r'}`}>
                      
                      {/* Interactive Look Mockup Frame */}
                      <div className="w-full max-w-md rounded-xl bg-[#0B1513] border border-[#63D6BE]/20 overflow-hidden shadow-2xl shadow-black/80">
                        
                        {/* Browser Window Header */}
                        <div className="bg-[#111E1B] px-4 py-2.5 border-b border-[#63D6BE]/15 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                          </div>
                          <div className="text-[11px] font-mono text-[#52635E] bg-[#0B1513] px-3 py-0.5 rounded-md border border-[#63D6BE]/10">
                            {project.previewDetails.url}
                          </div>
                          <div className="w-4" />
                        </div>

                        {/* Mockup Canvas Screen */}
                        <div className="p-6 flex flex-col gap-4">
                          
                          {/* Mock Header Area */}
                          <div className="h-6 w-1/3 rounded bg-[#63D6BE]/20 animate-pulse-subtle" />
                          
                          {/* Mock Banner */}
                          <div className="h-28 rounded-lg bg-gradient-to-br from-[#152622] to-[#0B1513] border border-[#63D6BE]/15 flex flex-col justify-center px-4">
                            <span className="text-[10px] uppercase font-mono tracking-widest text-[#63D6BE]">
                              {project.name}
                            </span>
                            <span className="text-xs font-semibold text-[#F2F5F3] mt-1">
                              {project.category}
                            </span>
                          </div>

                          {/* Mock Feature Highlights */}
                          <div className="grid grid-cols-3 gap-2">
                            {project.previewDetails.sections.map((sec, i) => (
                              <div
                                key={i}
                                className="p-2.5 rounded bg-[#111E1B] border border-[#63D6BE]/10 text-center"
                              >
                                <span className="block text-[9px] uppercase tracking-wider text-[#A0AEA9] font-mono">
                                  {sec}
                                </span>
                              </div>
                            ))}
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          5. CAPABILITIES SECTION ("What I Bring to the Table")
      ─────────────────────────────────────────────────────────── */}
      <section id="capabilities" className="py-24 bg-[#111E1B]/30 border-y border-[#63D6BE]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#63D6BE] uppercase tracking-widest mb-3">
              <span>02</span>
              <span className="w-8 h-[1px] bg-[#63D6BE]" />
              <span>Core Strengths</span>
            </div>
            <h2 className="font-['Syne'] font-bold text-3xl sm:text-4xl md:text-5xl text-[#F2F5F3] tracking-tight mb-4">
              What I Bring to the Table
            </h2>
            <p className="text-base text-[#A0AEA9] leading-relaxed">
              Combining design acumen, technical craftsmanship, and a grounded business mindset to construct digital experiences that perform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.number}
                className="p-8 sm:p-10 rounded-2xl bg-[#111E1B] border border-[#63D6BE]/15 hover:border-[#63D6BE]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xl font-['Syne'] font-bold text-[#63D6BE]">
                      {cap.number}.
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#63D6BE]" />
                  </div>
                  
                  <h3 className="font-['Syne'] font-bold text-xl sm:text-2xl text-[#F2F5F3] mb-4">
                    {cap.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-[#F2F5F3] font-medium leading-relaxed mb-4">
                    "{cap.description}"
                  </p>

                  <p className="text-xs sm:text-sm text-[#A0AEA9] leading-relaxed">
                    {cap.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          6. MY CREATIVE ADVANTAGE (Supporting Capabilities)
      ─────────────────────────────────────────────────────────── */}
      <section className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Description */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#63D6BE] uppercase tracking-widest mb-3">
                <span>03</span>
                <span className="w-8 h-[1px] bg-[#63D6BE]" />
                <span>Multidisciplinary Eye</span>
              </div>
              
              <h2 className="font-['Syne'] font-bold text-3xl sm:text-4xl text-[#F2F5F3] tracking-tight mb-6">
                More Than Development. A Creative Perspective.
              </h2>
              
              <div className="space-y-4 text-sm sm:text-base text-[#A0AEA9] leading-relaxed">
                <p>
                  "My background in graphic design, branding, and video production gives me a broader perspective on how digital experiences are created and communicated."
                </p>
                <p>
                  "These skills help me approach web development with a stronger understanding of visual hierarchy, storytelling, brand consistency, and the way businesses connect with their audiences."
                </p>
                <p className="text-xs text-[#52635E] italic pt-2">
                  *These creative abilities directly reinforce my primary identity as a Web Designer &amp; Developer, ensuring every website is aesthetically coherent and commercially persuasive.
                </p>
              </div>
            </div>

            {/* Right Skills Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CREATIVE_SKILLS.map((skill, index) => (
                <div
                  key={skill.title}
                  className={`p-6 rounded-xl bg-[#111E1B] border border-[#63D6BE]/15 hover:border-[#63D6BE]/30 transition-all ${
                    index === 0 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="text-xs text-[#63D6BE]">✦</span>
                    <h4 className="font-['Syne'] font-bold text-base text-[#F2F5F3]">
                      {skill.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#A0AEA9] leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          7. TECHNICAL SKILLS (Restrained, Organized Toolkit)
      ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#111E1B]/30 border-y border-[#63D6BE]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#63D6BE] uppercase tracking-widest mb-3">
              <span>04</span>
              <span className="w-8 h-[1px] bg-[#63D6BE]" />
              <span>Technical Skills</span>
            </div>
            <h2 className="font-['Syne'] font-bold text-3xl sm:text-4xl text-[#F2F5F3] tracking-tight mb-4">
              Tools &amp; Technologies
            </h2>
            <p className="text-base text-[#A0AEA9] leading-relaxed">
              Organized by their practical purpose in production. No arbitrary percentage bars or vanity scores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TECH_CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="p-8 rounded-2xl bg-[#111E1B] border border-[#63D6BE]/15 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-['Syne'] font-bold text-lg text-[#F2F5F3] mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#A0AEA9] mb-6">
                    {cat.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1.5 rounded-lg bg-[#0B1513] text-[#F2F5F3] border border-[#63D6BE]/20 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          8. ABOUT SECTION (Authentic Editorial Narrative)
      ─────────────────────────────────────────────────────────── */}
      <section id="about" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Visual Column */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="p-8 rounded-2xl bg-[#111E1B] border border-[#63D6BE]/20 relative overflow-hidden">
                <div className="mb-6 pb-6 border-b border-[#63D6BE]/10">
                  <span className="text-xs font-mono text-[#63D6BE] uppercase tracking-widest block mb-1">
                    Identity
                  </span>
                  <h3 className="font-['Syne'] font-bold text-2xl text-[#F2F5F3]">
                    Smart Moses
                  </h3>
                  <p className="text-xs text-[#A0AEA9]">
                    Web Designer &amp; Developer
                  </p>
                </div>

                <div className="space-y-4 text-xs text-[#A0AEA9] leading-relaxed font-mono">
                  <div className="flex justify-between">
                    <span className="text-[#52635E]">Location</span>
                    <span className="text-[#F2F5F3]">Nigeria · Remote Worldwide</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#52635E]">Main Focus</span>
                    <span className="text-[#63D6BE]">Websites &amp; Web Applications</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#52635E]">Company Studio</span>
                    <span className="text-[#F2F5F3]">Smotiva Digital</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#52635E]">Status</span>
                    <span className="text-[#34D399]">Available for Projects</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#63D6BE]/10">
                  <p className="text-xs text-[#A0AEA9] italic">
                    "I believe good technology should not only work well. It should make sense, communicate clearly, and serve a purpose."
                  </p>
                </div>
              </div>
            </div>

            {/* Right Story Column */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#63D6BE] uppercase tracking-widest mb-3">
                <span>05</span>
                <span className="w-8 h-[1px] bg-[#63D6BE]" />
                <span>Background &amp; Philosophy</span>
              </div>
              
              <h2 className="font-['Syne'] font-bold text-3xl sm:text-4xl md:text-5xl text-[#F2F5F3] tracking-tight mb-8">
                Design-minded. Technology-driven. Purpose-focused.
              </h2>

              <div className="space-y-5 text-sm sm:text-base text-[#A0AEA9] leading-relaxed">
                <p>
                  I'm Smart Moses, a Web Designer and Developer with a creative background and a strong interest in building meaningful digital experiences.
                </p>
                <p>
                  My journey across visual design, content production, and web development has shaped how I approach digital work. I don't see a website as just a collection of pages. I see it as a tool for communication, interaction, and business growth.
                </p>
                <p>
                  I enjoy understanding how things work, solving problems, and turning ideas into experiences people can actually use.
                </p>
                <p>
                  Today, my primary focus is web design and development, with an emphasis on thoughtful interfaces, functional websites, and practical digital solutions.
                </p>
              </div>

              <div className="mt-8 pt-6 flex items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#63D6BE] text-[#0B1513] text-xs font-bold uppercase tracking-wider hover:bg-[#7ff3dc] transition-all"
                >
                  Start a Conversation
                </a>
                <a
                  href="/assets/pdf/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111E1B] text-[#F2F5F3] border border-[#63D6BE]/20 text-xs font-semibold hover:border-[#63D6BE] transition-all"
                >
                  Download Résumé
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          9. PROFESSIONAL EXPERIENCE ("Experience & Journey")
      ─────────────────────────────────────────────────────────── */}
      <section id="experience" className="py-24 bg-[#111E1B]/30 border-y border-[#63D6BE]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#63D6BE] uppercase tracking-widest mb-3">
              <span>06</span>
              <span className="w-8 h-[1px] bg-[#63D6BE]" />
              <span>Career Track</span>
            </div>
            <h2 className="font-['Syne'] font-bold text-3xl sm:text-4xl text-[#F2F5F3] tracking-tight mb-4">
              Experience &amp; Journey
            </h2>
            <p className="text-base text-[#A0AEA9] leading-relaxed">
              Demonstrating consistent growth in web engineering, client delivery, and multidisciplinary problem-solving.
            </p>
          </div>

          <div className="space-y-8 max-w-4xl">
            {EXPERIENCE_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="p-8 sm:p-10 rounded-2xl bg-[#111E1B] border border-[#63D6BE]/15 hover:border-[#63D6BE]/35 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-['Syne'] font-bold text-xl sm:text-2xl text-[#F2F5F3]">
                      {item.role}
                    </h3>
                    <div className="text-xs text-[#63D6BE] font-medium tracking-wide">
                      {item.organization} · <span className="text-[#A0AEA9]">{item.type}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#0B1513] text-[#A0AEA9] border border-[#63D6BE]/15 w-fit">
                    {item.period}
                  </span>
                </div>

                <p className="text-sm text-[#A0AEA9] leading-relaxed mb-6">
                  {item.summary}
                </p>

                <ul className="space-y-2.5">
                  {item.bulletPoints.map((bp, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F2F5F3]/90">
                      <span className="text-[#63D6BE] mt-0.5">✦</span>
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          10. HOW I WORK (Process Section)
      ─────────────────────────────────────────────────────────── */}
      <section className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#63D6BE] uppercase tracking-widest mb-3">
              <span>07</span>
              <span className="w-8 h-[1px] bg-[#63D6BE]" />
              <span>Collaborative Workflow</span>
            </div>
            <h2 className="font-['Syne'] font-bold text-3xl sm:text-4xl text-[#F2F5F3] tracking-tight mb-4">
              From Understanding to Execution.
            </h2>
            <p className="text-base text-[#A0AEA9] leading-relaxed">
              A structured, four-phase delivery framework that ensures clarity, quality, and momentum at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-8 rounded-2xl bg-[#111E1B] border border-[#63D6BE]/15 hover:border-[#63D6BE]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-['Syne'] font-bold text-3xl text-[#63D6BE]/40 block mb-6">
                    {step.step}
                  </span>
                  <h3 className="font-['Syne'] font-bold text-xl text-[#F2F5F3] mb-2">
                    {step.name}
                  </h3>
                  <p className="text-xs text-[#63D6BE] font-medium mb-4">
                    {step.summary}
                  </p>
                  <p className="text-xs sm:text-sm text-[#A0AEA9] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          11. CONTACT SECTION
      ─────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-28 bg-[#111E1B]/50 border-t border-[#63D6BE]/10 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#63D6BE] uppercase tracking-widest mb-4">
              <span>08</span>
              <span className="w-8 h-[1px] bg-[#63D6BE]" />
              <span>Let's Connect</span>
            </div>
            
            <h2 className="font-['Syne'] font-bold text-4xl sm:text-5xl md:text-6xl text-[#F2F5F3] tracking-tight mb-6">
              Have an idea worth building?
            </h2>
            
            <p className="text-base sm:text-lg text-[#A0AEA9] leading-relaxed max-w-2xl mx-auto mb-10">
              Whether you're looking for someone to design and develop a website, build a digital product, or join your team, I'd love to hear what you're working on.
            </p>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:smartmoses@gmail.com"
                className="px-8 py-4 rounded-xl bg-[#63D6BE] text-[#0B1513] font-bold text-sm tracking-wide hover:bg-[#7ff3dc] transition-all transform hover:-translate-y-0.5 shadow-xl shadow-[#63D6BE]/20"
              >
                Let's Start a Conversation
              </a>

              <button
                onClick={copyEmailToClipboard}
                className="px-6 py-4 rounded-xl bg-[#111E1B] text-[#F2F5F3] border border-[#63D6BE]/25 font-semibold text-sm hover:border-[#63D6BE] transition-all flex items-center gap-2"
              >
                <span>{copiedEmail ? 'Copied to Clipboard!' : 'smartmoses@gmail.com'}</span>
                <svg className="w-4 h-4 text-[#63D6BE]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  {copiedEmail ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Contact Channels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            
            <a
              href="mailto:smartmoses@gmail.com"
              className="p-6 rounded-2xl bg-[#111E1B] border border-[#63D6BE]/15 hover:border-[#63D6BE]/40 transition-all text-center group"
            >
              <span className="text-xs uppercase tracking-widest text-[#63D6BE] font-semibold block mb-2">Direct Email</span>
              <span className="text-sm font-semibold text-[#F2F5F3] group-hover:text-[#63D6BE] transition-colors">smartmoses@gmail.com</span>
            </a>

            <a
              href="https://github.com/Smart-Moses"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-[#111E1B] border border-[#63D6BE]/15 hover:border-[#63D6BE]/40 transition-all text-center group"
            >
              <span className="text-xs uppercase tracking-widest text-[#63D6BE] font-semibold block mb-2">GitHub Profile</span>
              <span className="text-sm font-semibold text-[#F2F5F3] group-hover:text-[#63D6BE] transition-colors">github.com/Smart-Moses ↗</span>
            </a>

            <a
              href="https://www.linkedin.com/in/smartmoses/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-[#111E1B] border border-[#63D6BE]/15 hover:border-[#63D6BE]/40 transition-all text-center group"
            >
              <span className="text-xs uppercase tracking-widest text-[#63D6BE] font-semibold block mb-2">LinkedIn Network</span>
              <span className="text-sm font-semibold text-[#F2F5F3] group-hover:text-[#63D6BE] transition-colors">linkedin.com/in/smartmoses ↗</span>
            </a>

          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          12. FOOTER
      ─────────────────────────────────────────────────────────── */}
      <footer className="py-12 border-t border-[#63D6BE]/10 bg-[#0B1513]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-[#111E1B] border border-[#63D6BE]/30 flex items-center justify-center text-[#63D6BE] text-xs font-bold font-mono">
                SM
              </div>
              <span className="text-sm text-[#A0AEA9]">
                Smart Moses — Web Designer &amp; Developer
              </span>
            </div>

            <div className="text-xs text-[#52635E]">
              &copy; {new Date().getFullYear()} Smart Moses. Thoughtfully designed and engineered.
            </div>

            <div className="flex items-center gap-6">
              <a href="#work" className="text-xs text-[#A0AEA9] hover:text-[#63D6BE] transition-colors">Work</a>
              <a href="#about" className="text-xs text-[#A0AEA9] hover:text-[#63D6BE] transition-colors">About</a>
              <a href="#experience" className="text-xs text-[#A0AEA9] hover:text-[#63D6BE] transition-colors">Experience</a>
              <a href="#contact" className="text-xs text-[#A0AEA9] hover:text-[#63D6BE] transition-colors">Contact</a>
            </div>

          </div>
        </div>
      </footer>

    </div>
  )
}
