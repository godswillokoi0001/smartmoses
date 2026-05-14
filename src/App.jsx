import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

/* ─── DATA ─────────────────────────────────────────────────── */
const trustPoints = [
  'Brand clarity for premium audiences',
  'Cinematic digital storytelling',
  'High-conversion product systems',
  'Deliberate interface composition',
  'Responsive, premium web experiences',
]

const services = [
  {
    index: '01',
    title: 'Web Design\n& Development',
    description: 'Polished digital destinations that feel premium, scale effortlessly, and communicate your brand with total clarity.',
    highlight: 'Experience-first websites built with design, structure, and technical finesse.',
    accent: '#38bdf8',
  },
  {
    index: '02',
    title: 'Brand &\nVisual Design',
    description: 'Visual systems, identity work, and expressive digital assets that elevate perception and build lasting trust.',
    highlight: 'Brand direction with a cinematic, modern, and highly intentional voice.',
    accent: '#a78bfa',
  },
  {
    index: '03',
    title: 'Video Editing\n& Content',
    description: 'Short-form storytelling, motion content, and social visuals that amplify message and speed emotional connection.',
    highlight: 'Clean, strategic edits and visual systems for consistent brand impact.',
    accent: '#34d399',
  },
]

const projects = [
  {
    title: 'Evoke Studio Launch',
    label: 'Brand, Web System & Launch',
    role: 'Lead Product Designer',
    overview: 'A premium launch platform for a creative studio needing digital presence, storytelling, and conversion clarity.',
    challenge: 'Position the studio as a thoughtful, high-end brand without relying on generic visuals or complex navigation.',
    solution: 'Crafted an immersive narrative structure with dramatic pacing, strong visual hierarchy, and strategic contact cues.',
    outcome: '+42% audience engagement, qualified inquiries doubled in the first month.',
    tools: ['React', 'Tailwind CSS', 'Figma', 'Brand Strategy'],
    color: 'from-cyan-500/20 to-blue-600/10',
    dot: '#38bdf8',
  },
  {
    title: 'Motion Brand Reveal',
    label: 'Content System & Motion Direction',
    role: 'Creative Director',
    overview: 'A visual content system for a coaching brand needing cinematic digital experiences and memorable launch messaging.',
    challenge: 'Translate brand emotion into short-form motion without losing the premium visual direction.',
    solution: 'Built layered motion concepts, clear editorial structure, and story-driven social frameworks.',
    outcome: 'Stronger social traction and a more coherent brand identity across all video channels.',
    tools: ['Premiere', 'After Effects', 'Brand Strategy'],
    color: 'from-violet-500/20 to-purple-600/10',
    dot: '#a78bfa',
  },
  {
    title: 'Responsive Product Narrative',
    label: 'Website Design & Strategy',
    role: 'Experience Architect',
    overview: 'A responsive digital experience for a product founder needing market clarity, trust, and premium positioning.',
    challenge: 'Build a memorable website that made the product feel premium, intuitive, and easy to scope.',
    solution: 'Executed a minimalist interface with bold hierarchy, clear storytelling, and elegant interactions.',
    outcome: 'Launch-ready experience that elevated brand perception and accelerated new conversations.',
    tools: ['React', 'Tailwind CSS', 'Content Strategy'],
    color: 'from-emerald-500/20 to-teal-600/10',
    dot: '#34d399',
  },
]

const whyPoints = [
  { num: '01', title: 'Strategic Thinking', description: 'Every visual decision starts with a business outcome: trust, clarity, and movement toward action.' },
  { num: '02', title: 'Premium Visual Direction', description: 'Minimal details, cinematic contrast, and considered spacing that elevate how your brand is perceived.' },
  { num: '03', title: 'User-Focused Execution', description: 'Interfaces that feel intuitive, composed, and purpose-built for modern audiences.' },
  { num: '04', title: 'Multi-Disciplinary Approach', description: 'Design, technology, branding, and motion working together for a cohesive creative system.' },
]

const testimonials = [
  { quote: 'Smart Moses brought clarity to our launch and helped us communicate our value with premium confidence.', name: 'Aisha Bello', role: 'Founder, Luma Collective', initial: 'AB' },
  { quote: 'The site felt cinematic yet grounded. It helped our brand feel more strategic and emotionally resonant.', name: 'Daniel Nwachukwu', role: 'CEO, Novo Studio', initial: 'DN' },
  { quote: 'His design system made content feel purposeful and polished across every digital touchpoint.', name: 'Kemi Ade', role: 'Creative Director, Atlas Labs', initial: 'KA' },
]

const processSteps = [
  { num: '01', title: 'Discovery & Direction', body: 'Deep-dive into your brand, audience, and goals to build a creative foundation that informs every decision.' },
  { num: '02', title: 'Strategy & Structure', body: 'Information architecture, narrative mapping, and user flow design that makes the experience feel inevitable.' },
  { num: '03', title: 'Design & Development', body: 'High-fidelity visual design built alongside production code — no handoff friction, no lost nuance.' },
  { num: '04', title: 'Refinement & Delivery', body: 'Iteration, polish, and a meticulous final review before handing you a live, launch-ready experience.' },
]

/* ─── UTILITIES ─────────────────────────────────────────────── */
const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
}

const stagger = (i) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
})

/* ─── NOISE TEXTURE (SVG data-url) ─────────────────────────── */
const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`

/* ─── SUB-COMPONENTS ────────────────────────────────────────── */

function Pill({ children, color = 'cyan' }) {
  const map = { cyan: 'border-cyan-400/20 text-cyan-300/80 bg-cyan-400/5', violet: 'border-violet-400/20 text-violet-300/80 bg-violet-400/5', emerald: 'border-emerald-400/20 text-emerald-300/80 bg-emerald-400/5' }
  return (
    <span className={`inline-block border px-3 py-1 text-[10px] uppercase tracking-[0.3em] rounded-full ${map[color] || map.cyan}`}>
      {children}
    </span>
  )
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="h-px w-8 bg-cyan-400/40" />
      <p className="text-[10px] uppercase tracking-[0.38em] text-cyan-300/60">{children}</p>
    </div>
  )
}

/* ─── NAV ───────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-500 ${scrolled ? 'bg-[#05050a]/90 border-white/[0.07] shadow-2xl shadow-black/40' : 'bg-transparent border-transparent'} border rounded-2xl backdrop-blur-xl`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-white/90" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '0.3em' }}>Smart Moses</p>
          <p className="text-[10px] text-slate-500 mt-0.5 tracking-widest uppercase">Creative Technologist</p>
        </div>
        <nav className="flex items-center gap-1 text-[11px] text-slate-400">
          {['About', 'Services', 'Work', 'Process'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              className="px-3 py-2 rounded-lg hover:text-white hover:bg-white/5 transition-all duration-200">
              {link}
            </a>
          ))}
          <a href="#contact"
            className="ml-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-[11px] font-semibold text-slate-950 hover:shadow-[0_0_30px_rgba(56,189,248,0.35)] transition-all duration-300">
            Let's Talk
          </a>
        </nav>
      </div>
    </motion.header>
  )
}

/* ─── HERO ──────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-28 pb-24 overflow-hidden">
      {/* Radial backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full bg-cyan-500/[0.06] blur-[120px]" />
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/[0.07] blur-[100px]" />
        <div className="absolute bottom-0 left-[30%] w-[400px] h-[300px] rounded-full bg-blue-600/[0.05] blur-[90px]" />
        {/* Grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 lg:gap-20 items-center">

          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex items-center gap-3 mb-10"
            >
              <span className="h-px w-10 bg-cyan-400/50" />
              <p className="text-[10px] uppercase tracking-[0.42em] text-cyan-300/70">Creative partner for premium digital brands</p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.6rem,7vw,5.5rem)] font-black leading-[0.9] tracking-[-0.04em] text-white mb-8"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Crafting<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-400">
                cinematic
              </span>
              <br />
              digital brands.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.55 }}
              className="text-base lg:text-lg leading-8 text-slate-400 max-w-xl mb-12"
            >
              I help ambitious founders, studios, and startups move beyond developer-first websites — with premium storytelling, polished UX, and deliberate brand direction that actually converts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <a href="#contact"
                className="group relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-sm font-semibold text-slate-950 overflow-hidden transition-all duration-300 hover:shadow-[0_0_60px_rgba(56,189,248,0.4)]"
              >
                <span className="relative z-10">Start a premium project</span>
                <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-200">→</span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a href="#work"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 border border-white/10 text-sm font-medium text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300"
              >
                Explore case studies
              </a>
            </motion.div>

            {/* Trust pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="flex flex-wrap gap-2"
            >
              {trustPoints.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.95 + i * 0.08 }}
                  className="text-[10px] px-3 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] text-slate-400 tracking-wide"
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Right — portrait card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Outer glow */}
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-cyan-400/15 via-transparent to-violet-500/10 blur-2xl" />
            <div className="relative rounded-[2.5rem] border border-white/[0.08] bg-[#0a0a12] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.6)]">
              {/* Portrait */}
              <div className="relative h-80 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a12] z-10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-violet-500/10 z-10" />
                <img src="/images/me.jpeg" alt="Smart Moses portrait"
                  className="w-full h-full object-cover object-top" />
              </div>

              {/* Info cards inside */}
              <div className="p-5 space-y-3">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-cyan-300/60 mb-2">Identity</p>
                  <p className="text-sm text-slate-300 leading-6">A calm, confident visual system built around gradient depth, refined type, and intentional contrast.</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                    <p className="text-lg font-black text-white">+42%</p>
                    <p className="text-[10px] text-slate-500 mt-1">Lead growth</p>
                  </div>
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                    <p className="text-lg font-black text-white">2×</p>
                    <p className="text-[10px] text-slate-500 mt-1">Brand clarity</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 1.1 }}
              className="absolute -top-3 -right-3 rounded-2xl border border-cyan-400/20 bg-[#0a0a12]/90 backdrop-blur-xl px-4 py-2.5 shadow-xl"
            >
              <p className="text-[10px] uppercase tracking-widest text-cyan-300/70">Available</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-xs text-white font-medium">For new projects</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

/* ─── ABOUT ─────────────────────────────────────────────────── */
function About() {
  return (
    <motion.section id="about" {...reveal} className="max-w-7xl mx-auto px-6 lg:px-10 py-28">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <SectionLabel>About the practice</SectionLabel>
          <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white mb-6"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            I turn ambitious brands into digital experiences with clarity, craft, and lasting impact.
          </h2>
          <p className="text-slate-400 leading-8 text-base mb-10 max-w-lg">
            This work isn't about developer badges or generic layouts. It's about building calm, memorable systems that help brands feel more premium, more persuasive, and more present.
          </p>

          <div className="space-y-3">
            {[
              { label: 'Focus', body: 'Digital products and brand systems for founders, studios, and premium service businesses.' },
              { label: 'Approach', body: 'Clear storytelling, strong visual rhythm, and deliberate interaction design to improve trust and conversion.' },
            ].map(item => (
              <div key={item.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-300/60 mb-2">{item.label}</p>
                <p className="text-sm text-slate-400 leading-6">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-white/[0.07] bg-[#0a0a12] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/5 rounded-full blur-3xl" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-300/60 mb-4">Why it works</p>
            <p className="text-slate-300 leading-8 text-sm mb-6">I blend brand-first strategy with polished digital craftsmanship so every screen feels intentional and aligned.</p>
            <div className="space-y-3">
              {['Calm layouts with premium breathing room.', 'Clear storytelling that removes friction.', 'Cinematic design language built for trust.'].map(point => (
                <div key={point} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                  <p className="text-sm text-slate-400">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/[0.07] bg-[#0a0a12] p-6">
              <p className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>+42%</p>
              <p className="text-[11px] text-slate-500 uppercase tracking-widest">Qualified lead growth</p>
            </div>
            <div className="rounded-2xl border border-white/[0.07] bg-[#0a0a12] p-6">
              <p className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>2×</p>
              <p className="text-[11px] text-slate-500 uppercase tracking-widest">Faster brand clarity</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* ─── SERVICES ──────────────────────────────────────────────── */
function Services() {
  const [active, setActive] = useState(null)

  return (
    <motion.section id="services" {...reveal} className="py-24 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[380px_1fr] gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <SectionLabel>What Gets Built</SectionLabel>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white mb-5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Design systems, digital products, and motion-led stories.
            </h2>
            <p className="text-sm text-slate-500 leading-7">
              I focus on experiences that look polished, feel effortless, and create a confident digital presence with every scroll.
            </p>
          </div>

          <div className="space-y-3">
            {services.map((service, i) => (
              <motion.article
                key={service.title}
                {...stagger(i)}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="group relative rounded-2xl border border-white/[0.07] bg-[#0a0a12] p-7 cursor-default overflow-hidden transition-all duration-500 hover:border-white/[0.12]"
              >
                {/* Hover glow */}
                <motion.div
                  animate={{ opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"
                />
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[10px] font-mono text-slate-600">{service.index}</span>
                      <span className="h-px flex-1 bg-white/[0.06]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 whitespace-pre-line leading-tight">{service.title}</h3>
                    <p className="text-sm text-slate-500 leading-7 mb-4">{service.description}</p>
                    <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] px-4 py-3">
                      <p className="text-[11px] text-slate-400">{service.highlight}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ scale: active === i ? 1 : 0.85, opacity: active === i ? 1 : 0.3 }}
                    transition={{ duration: 0.35 }}
                    className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-lg mt-1"
                    style={{ backgroundColor: `${service.dot}15`, color: service.dot }}
                  >
                    ↗
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* ─── WORK ──────────────────────────────────────────────────── */
function Work() {
  return (
    <motion.section id="work" {...reveal} className="py-24 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-16">
          <SectionLabel>Selected Case Studies</SectionLabel>
          <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white max-w-2xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Projects designed to feel premium, purposeful, and memorable.
          </h2>
        </div>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              {...stagger(i)}
              className="group relative rounded-3xl border border-white/[0.07] bg-[#0a0a12] overflow-hidden hover:border-white/[0.12] transition-all duration-500"
            >
              {/* Color accent strip */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40 pointer-events-none`} />

              <div className="relative grid lg:grid-cols-[1.1fr_0.9fr]">
                {/* Content */}
                <div className="p-8 lg:p-10 space-y-7">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Pill>{project.label}</Pill>
                    <span className="text-[10px] text-slate-600 uppercase tracking-widest">{project.role}</span>
                  </div>

                  <h3 className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.03em] text-white"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-7 max-w-md">{project.overview}</p>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { label: 'Challenge', body: project.challenge },
                      { label: 'Solution', body: project.solution },
                    ].map(item => (
                      <div key={item.label} className="rounded-2xl border border-white/[0.06] bg-black/20 backdrop-blur-sm p-5">
                        <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: project.dot }}>{item.label}</p>
                        <p className="text-xs text-slate-400 leading-6">{item.body}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-2">Outcome</p>
                    <p className="text-sm text-slate-300 font-medium">{project.outcome}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tools.map(tool => (
                      <span key={tool} className="text-[10px] px-3 py-1.5 rounded-full border border-white/[0.07] text-slate-500 tracking-wide">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visual mockup panel */}
                <div className="border-t lg:border-t-0 lg:border-l border-white/[0.06] p-8 flex flex-col gap-4">
                  <div className="flex-1 rounded-2xl border border-white/[0.06] bg-black/30 overflow-hidden relative">
                    <div className="absolute inset-0" style={{
                      background: `radial-gradient(ellipse at 30% 20%, ${project.dot}15, transparent 60%)`,
                    }} />
                    {/* Mock browser bar */}
                    <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/[0.05]">
                      <span className="h-2 w-2 rounded-full bg-red-500/60" />
                      <span className="h-2 w-2 rounded-full bg-amber-400/60" />
                      <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
                      <span className="ml-3 flex-1 h-4 rounded bg-white/[0.04]" />
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="h-5 w-3/4 rounded bg-white/[0.04]" />
                      <div className="h-3 w-full rounded bg-white/[0.03]" />
                      <div className="h-3 w-5/6 rounded bg-white/[0.03]" />
                      <div className="h-16 w-full rounded-xl mt-3 bg-white/[0.03]" />
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="h-10 rounded-lg bg-white/[0.03]" />
                        <div className="h-10 rounded-lg bg-white/[0.03]" />
                      </div>
                    </div>
                  </div>
                  <div className="h-24 rounded-2xl border border-white/[0.06] bg-black/30 p-4 relative overflow-hidden">
                    <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 80% 50%, ${project.dot}10, transparent 60%)` }} />
                    <div className="flex gap-2 h-full items-end">
                      {[40, 65, 50, 80, 55, 75, 90].map((h, j) => (
                        <div key={j} className="flex-1 rounded-sm opacity-30" style={{ height: `${h}%`, backgroundColor: project.dot }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

/* ─── WHY ───────────────────────────────────────────────────── */
function Why() {
  return (
    <motion.section {...reveal} className="py-24 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[380px_1fr] gap-16">
          <div>
            <SectionLabel>Why Work With Me</SectionLabel>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white mb-5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              A premium, trust-building approach grounded in strategy and clarity.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {whyPoints.map((point, i) => (
              <motion.div key={point.title} {...stagger(i)}
                className="rounded-2xl border border-white/[0.07] bg-[#0a0a12] p-6 hover:border-white/[0.12] transition-all duration-300">
                <p className="text-[10px] font-mono text-slate-700 mb-4">{point.num}</p>
                <h3 className="text-sm font-semibold text-white mb-3">{point.title}</h3>
                <p className="text-xs text-slate-500 leading-6">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* ─── TESTIMONIALS ──────────────────────────────────────────── */
function Testimonials() {
  return (
    <motion.section {...reveal} className="py-24 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel>Testimonials</SectionLabel>
        <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white mb-12 max-w-xl"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          Trusted by founders who demand digital work with confidence.
        </h2>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4">
          {/* Featured */}
          <div className="rounded-3xl border border-white/[0.07] bg-[#0a0a12] p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl" />
            <div className="relative">
              <p className="text-2xl leading-[1.6] text-slate-200 font-light mb-10"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                "{testimonials[0].quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-cyan-400/10 flex items-center justify-center text-cyan-300 text-sm font-semibold">
                  {testimonials[0].initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{testimonials[0].name}</p>
                  <p className="text-xs text-slate-500">{testimonials[0].role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {testimonials.slice(1).map(item => (
              <div key={item.name} className="rounded-2xl border border-white/[0.07] bg-[#0a0a12] p-6">
                <p className="text-base leading-8 text-slate-300 mb-6" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  "{item.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-violet-400/10 flex items-center justify-center text-violet-300 text-xs font-semibold">
                    {item.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="text-[11px] text-slate-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* ─── PROCESS ───────────────────────────────────────────────── */
function Process() {
  return (
    <motion.section id="process" {...reveal} className="py-24 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel>Process</SectionLabel>
        <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white mb-4 max-w-xl"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          A carefully designed journey from direction to launch.
        </h2>
        <p className="text-sm text-slate-500 mb-14 max-w-lg leading-7">
          Every project follows a clear flow that keeps the brand voice consistent, the experience intuitive, and the delivery polished.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {processSteps.map((step, i) => (
            <motion.div key={step.num} {...stagger(i)}
              className="relative rounded-2xl border border-white/[0.07] bg-[#0a0a12] p-6 overflow-hidden">
              <div className="absolute -top-4 -right-4 text-[80px] font-black text-white/[0.02] select-none leading-none">{step.num}</div>
              <p className="text-[10px] font-mono text-cyan-400/50 mb-5">{step.num}</p>
              <h3 className="text-sm font-semibold text-white mb-3 leading-snug">{step.title}</h3>
              <p className="text-[11px] text-slate-500 leading-6">{step.body}</p>
              {i < processSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-700 text-xs">→</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

/* ─── CTA ───────────────────────────────────────────────────── */
function CTA() {
  return (
    <motion.section id="contact" {...reveal} className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="relative rounded-3xl border border-white/[0.07] bg-[#0a0a12] overflow-hidden p-10 lg:p-16">
          {/* Background treatment */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/[0.08] rounded-full blur-[100px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-violet-600/[0.08] rounded-full blur-[90px]" />
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div>
              <SectionLabel>Start Here</SectionLabel>
              <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1] tracking-[-0.04em] text-white mb-6"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Let's build something that feels cinematic and converts.
              </h2>
              <p className="text-sm text-slate-400 leading-8 max-w-lg">
                If you want a website that communicates brand authority, feels intentional, and converts with confidence — this is the place to start.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-black/30 backdrop-blur-sm p-7 space-y-5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Available for new projects</p>
              </div>
              <p className="text-sm text-slate-400 leading-7">
                I work with founders and teams who want a digital experience that feels elevated, intentional, and built to support their brand story.
              </p>
              <a
                href="mailto:hello@smartmoses.com"
                className="group relative flex items-center justify-center gap-2 w-full rounded-full py-4 px-7 bg-gradient-to-r from-cyan-400 to-blue-500 text-sm font-semibold text-slate-950 overflow-hidden transition-all duration-300 hover:shadow-[0_0_60px_rgba(56,189,248,0.35)]"
              >
                <span className="relative z-10">Send a project brief</span>
                <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-200">→</span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <p className="text-[11px] text-slate-600 text-center">Include your brand focus, timeline, and audience.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* ─── FOOTER ────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-white/80 mb-3"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Smart Moses</p>
            <p className="text-sm text-slate-500 leading-7 max-w-md">
              Creative Technologist & Digital Brand Builder. Building modern digital experiences through design, development, branding, and visual storytelling.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-600 mb-4">Navigate</p>
              <nav className="flex flex-col gap-3">
                {['About', 'Services', 'Work', 'Process'].map(link => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-slate-500 hover:text-white transition-colors">{link}</a>
                ))}
              </nav>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-600 mb-4">Connect</p>
              <div className="flex flex-col gap-3">
                <a href="mailto:hello@smartmoses.com" className="text-sm text-slate-500 hover:text-white transition-colors">hello@smartmoses.com</a>
                <a href="#contact" className="text-sm text-slate-500 hover:text-white transition-colors">Start a project</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/[0.05] flex items-center justify-between">
          <p className="text-[11px] text-slate-700">© {new Date().getFullYear()} Smart Moses. All rights reserved.</p>
          <p className="text-[11px] text-slate-700">Creative Technologist</p>
        </div>
      </div>
    </footer>
  )
}

/* ─── ROOT APP ──────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      {/* Load Cormorant Garamond */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body {
          background: #050508;
          color: #cbd5e1;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        /* Grain overlay via pseudo */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 100;
          opacity: 0.028;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }

        ::selection { background: rgba(56,189,248,0.2); color: #fff; }
      `}</style>

      <div className="relative bg-[#050508] text-slate-300 min-h-screen">
        <Nav />
        <Hero />
        <About />
        <Services />
        <Work />
        <Why />
        <Testimonials />
        <Process />
        <CTA />
        <Footer />
      </div>
    </>
  )
}