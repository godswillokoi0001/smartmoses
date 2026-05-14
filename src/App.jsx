import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
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
    title: 'Web Design & Development',
    description: 'Polished digital destinations that feel premium, scale effortlessly, and communicate your brand with total clarity.',
    highlight: 'Experience-first websites built with design, structure, and technical finesse.',
    dot: '#38bdf8',
    glow: 'rgba(56,189,248,0.08)',
  },
  {
    index: '02',
    title: 'Brand & Visual Design',
    description: 'Visual systems, identity work, and expressive digital assets that elevate perception and build lasting trust.',
    highlight: 'Brand direction with a cinematic, modern, and highly intentional voice.',
    dot: '#fb923c',
    glow: 'rgba(251,146,60,0.08)',
  },
  {
    index: '03',
    title: 'Video Editing & Content',
    description: 'Short-form storytelling, motion content, and social visuals that amplify message and speed emotional connection.',
    highlight: 'Clean, strategic edits and visual systems for consistent brand impact.',
    dot: '#a78bfa',
    glow: 'rgba(167,139,250,0.08)',
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
    outcome: '+42% audience engagement. Qualified inquiries doubled in the first month.',
    tools: ['React', 'Tailwind CSS', 'Figma', 'Brand Strategy'],
    dot: '#38bdf8',
    bars: [40, 60, 45, 75, 55, 80, 90],
    gradFrom: 'rgba(56,189,248,0.12)',
    gradTo: 'rgba(56,189,248,0.02)',
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
    dot: '#fb923c',
    bars: [55, 40, 70, 50, 85, 60, 95],
    gradFrom: 'rgba(251,146,60,0.12)',
    gradTo: 'rgba(251,146,60,0.02)',
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
    dot: '#a78bfa',
    bars: [35, 65, 50, 80, 45, 70, 88],
    gradFrom: 'rgba(167,139,250,0.12)',
    gradTo: 'rgba(167,139,250,0.02)',
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
  { quote: 'The site felt cinematic yet grounded — it helped our brand feel more strategic and emotionally resonant.', name: 'Daniel Nwachukwu', role: 'CEO, Novo Studio', initial: 'DN' },
  { quote: 'His design system made content feel purposeful and polished across every digital touchpoint.', name: 'Kemi Ade', role: 'Creative Director, Atlas Labs', initial: 'KA' },
]

const processSteps = [
  { num: '01', title: 'Discovery & Direction', body: 'Deep-dive into your brand, audience, and goals to build a creative foundation that informs every decision.' },
  { num: '02', title: 'Strategy & Structure', body: 'Information architecture, narrative mapping, and user flow design that makes the experience feel inevitable.' },
  { num: '03', title: 'Design & Development', body: 'High-fidelity visual design built alongside production code — no handoff friction, no lost nuance.' },
  { num: '04', title: 'Refinement & Delivery', body: 'Iteration, polish, and a meticulous final review before handing you a live, launch-ready experience.' },
]

/* ═══════════════════════════════════════════════════════
   ANIMATION PRESETS
═══════════════════════════════════════════════════════ */
const ease = [0.16, 1, 0.3, 1]

const reveal = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 1, ease },
}

const stagger = (i = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.08 },
  transition: { duration: 0.9, ease, delay: i * 0.1 },
})

/* ═══════════════════════════════════════════════════════
   SHARED UI
═══════════════════════════════════════════════════════ */
const BG = "'Bricolage Grotesque', sans-serif"

function H({ as: Tag = 'h2', className = '', style = {}, children }) {
  return (
    <Tag className={className} style={{ fontFamily: BG, ...style }}>
      {children}
    </Tag>
  )
}

function SectionLabel({ children, accent = false }) {
  const color = accent ? 'rgba(249,115,22,0.6)' : 'rgba(56,189,248,0.55)'
  const line  = accent ? '#f97316' : '#38bdf8'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
      <span style={{ height: '1px', width: '28px', background: line, opacity: 0.5, flexShrink: 0 }} />
      <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.4em', color, fontFamily: "'Poppins',sans-serif" }}>
        {children}
      </p>
    </div>
  )
}

function OrangeBtn({ href, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        borderRadius: '9999px', padding: '13px 28px',
        background: 'linear-gradient(135deg,#f97316,#fb923c,#fdba74)',
        color: '#1c0800', fontSize: '13px', fontWeight: 700, textDecoration: 'none',
        fontFamily: "'Poppins',sans-serif", letterSpacing: '0.01em', flexShrink: 0,
        boxShadow: hovered ? '0 0 48px rgba(249,115,22,0.45)' : '0 0 0 rgba(249,115,22,0)',
        transition: 'box-shadow 0.3s',
      }}>
      {children} <span>→</span>
    </a>
  )
}

function GhostBtn({ href, children }) {
  return (
    <a href={href}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        borderRadius: '9999px', padding: '13px 28px',
        border: '1px solid rgba(255,255,255,0.1)',
        color: '#94a3b8', fontSize: '13px', fontWeight: 500, textDecoration: 'none',
        fontFamily: "'Poppins',sans-serif', transition: 'color 0.2s, background 0.2s",
      }}
      onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
      onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent' }}>
      {children}
    </a>
  )
}

/* ═══════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = ['About', 'Services', 'Work', 'Process']

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease }}
      style={{
        position: 'fixed', top: '12px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 50, width: 'calc(100% - 24px)', maxWidth: '1024px',
        background: scrolled ? 'rgba(5,5,10,0.88)' : 'transparent',
        border: `1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'}`,
        borderRadius: '14px',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 20px 60px rgba(0,0,0,0.5)' : 'none',
        transition: 'all 0.5s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px' }}>
        <div>
          <H as="p" style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)' }}>
            Smart Moses
          </H>
          <p style={{ fontSize: '9px', color: '#475569', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '2px', fontFamily: "'Poppins',sans-serif" }}>
            Creative Technologist
          </p>
        </div>

        {/* Desktop */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden-mobile">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              style={{ padding: '8px 12px', fontSize: '11px', color: '#64748b', textDecoration: 'none', borderRadius: '8px', fontFamily: "'Poppins',sans-serif", transition: 'color 0.2s, background 0.2s' }}
              onMouseEnter={e => { e.target.style.color = '#fff'; e.target.style.background = 'rgba(255,255,255,0.05)' }}
              onMouseLeave={e => { e.target.style.color = '#64748b'; e.target.style.background = 'transparent' }}>
              {link}
            </a>
          ))}
          <div style={{ marginLeft: '8px' }}><OrangeBtn href="#contact">Let's Talk</OrangeBtn></div>
        </nav>

        {/* Hamburger */}
        <button onClick={() => setOpen(o => !o)}
          style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
          className="show-mobile"
          aria-label="Toggle menu">
          <span style={{ height: '1px', width: '20px', background: 'rgba(255,255,255,0.6)', display: 'block', transform: open ? 'rotate(45deg) translate(4px,4px)' : 'none', transition: 'transform 0.3s' }} />
          <span style={{ height: '1px', width: '20px', background: 'rgba(255,255,255,0.6)', display: 'block', opacity: open ? 0 : 1, transition: 'opacity 0.3s' }} />
          <span style={{ height: '1px', width: '20px', background: 'rgba(255,255,255,0.6)', display: 'block', transform: open ? 'rotate(-45deg) translate(4px,-4px)' : 'none', transition: 'transform 0.3s' }} />
        </button>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}
              style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontFamily: "'Poppins',sans-serif" }}>
              {link}
            </a>
          ))}
          <OrangeBtn href="#contact">Let's Talk</OrangeBtn>
        </motion.div>
      )}
    </motion.header>
  )
}

/* ═══════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════ */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '96px', paddingBottom: '80px', overflow: 'hidden' }}>
      {/* BG */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-8%', width: '520px', height: '520px', borderRadius: '50%', background: 'rgba(56,189,248,0.07)', filter: 'blur(120px)' }} />
        <div style={{ position: 'absolute', top: '8%', right: '-6%', width: '440px', height: '440px', borderRadius: '50%', background: 'rgba(249,115,22,0.08)', filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', bottom: '0', left: '30%', width: '360px', height: '280px', borderRadius: '50%', background: 'rgba(167,139,250,0.05)', filter: 'blur(90px)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.013) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.013) 1px,transparent 1px)', backgroundSize: '72px 72px' }} />
      </div>

      <motion.div style={{ y, opacity: fade, position: 'relative', zIndex: 10, width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <div className="hero-grid">
          {/* LEFT */}
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <span style={{ height: '1px', width: '32px', background: '#f97316', opacity: 0.5 }} />
              <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.42em', color: 'rgba(249,115,22,0.65)', fontFamily: "'Poppins',sans-serif" }}>
                Creative partner for premium digital brands
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.32, ease }}>
              <H as="h1" style={{ fontSize: 'clamp(2.7rem,8vw,5.6rem)', lineHeight: 0.92, letterSpacing: '-0.04em', color: '#fff', marginBottom: '28px' }}>
                Crafting<br />
                <span style={{ background: 'linear-gradient(90deg,#f97316,#fb923c,#fdba74)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  cinematic
                </span>
                <br />digital brands.
              </H>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.52 }}
              style={{ fontSize: 'clamp(13px,1.5vw,15px)', lineHeight: 2, color: '#64748b', maxWidth: '480px', marginBottom: '40px', fontFamily: "'Poppins',sans-serif" }}>
              I help ambitious founders, studios, and startups move beyond developer-first websites — with premium storytelling, polished UX, and deliberate brand direction that actually converts.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.68 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '48px' }}>
              <OrangeBtn href="#contact">Start a premium project</OrangeBtn>
              <GhostBtn href="#work">Explore case studies</GhostBtn>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.88 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {trustPoints.map((item, i) => (
                <motion.span key={item}
                  initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.9 + i * 0.07 }}
                  style={{ fontSize: '10px', padding: '6px 12px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)', color: '#475569', fontFamily: "'Poppins',sans-serif" }}>
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — portrait */}
          <motion.div initial={{ opacity: 0, scale: 0.94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.38, ease }}
            style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-12px', borderRadius: '2.2rem', background: 'linear-gradient(135deg,rgba(249,115,22,0.15),rgba(56,189,248,0.1),rgba(167,139,250,0.08))', filter: 'blur(24px)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', borderRadius: '1.75rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: '#090910', boxShadow: '0 60px 120px rgba(0,0,0,0.65)' }}>
              <div style={{ position: 'relative', overflow: 'hidden', height: 'clamp(200px,35vw,310px)' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 10, background: 'linear-gradient(to bottom,transparent 55%,#090910 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, zIndex: 10, background: 'linear-gradient(135deg,rgba(249,115,22,0.1),transparent 50%)' }} />
                <img src="/images/me.jpeg" alt="Smart Moses portrait" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
              </div>
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.025)' }}>
                  <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.32em', color: 'rgba(251,146,60,0.6)', marginBottom: '6px', fontFamily: "'Poppins',sans-serif" }}>Identity</p>
                  <p style={{ fontSize: '11px', color: '#475569', lineHeight: 1.7, fontFamily: "'Poppins',sans-serif" }}>A calm, confident visual system built around gradient depth, refined type, and intentional contrast.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[{ val: '+42%', label: 'Lead growth' }, { val: '2×', label: 'Brand clarity' }].map(s => (
                    <div key={s.val} style={{ padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.025)' }}>
                      <H as="p" style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>{s.val}</H>
                      <p style={{ fontSize: '9px', color: '#334155', marginTop: '2px', fontFamily: "'Poppins',sans-serif" }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Badge */}
            <motion.div initial={{ opacity: 0, x: 18, y: -8 }} animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05 }}
              style={{ position: 'absolute', top: '-10px', right: '-10px', padding: '10px 14px', borderRadius: '14px', border: '1px solid rgba(251,146,60,0.22)', background: 'rgba(9,9,16,0.92)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
              <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(251,146,60,0.65)', fontFamily: "'Poppins',sans-serif" }}>Available</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <span style={{ height: '6px', width: '6px', borderRadius: '50%', background: '#34d399', animation: 'pulse 2s infinite', flexShrink: 0 }} />
                <p style={{ fontSize: '11px', color: '#fff', fontWeight: 500, fontFamily: "'Poppins',sans-serif" }}>For new projects</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════ */
function About() {
  return (
    <motion.section id="about" {...reveal} style={{ maxWidth: '1280px', margin: '0 auto', padding: '96px 20px' }}>
      <div className="two-col">
        <div>
          <SectionLabel>About the practice</SectionLabel>
          <H as="h2" style={{ fontSize: 'clamp(1.8rem,3.8vw,2.9rem)', lineHeight: 1.06, letterSpacing: '-0.03em', color: '#fff', marginBottom: '20px' }}>
            I turn ambitious brands into digital experiences with clarity, craft, and lasting impact.
          </H>
          <p style={{ fontSize: '13px', lineHeight: 2, color: '#64748b', maxWidth: '440px', marginBottom: '28px', fontFamily: "'Poppins',sans-serif" }}>
            This work isn't about developer badges or generic layouts. It's about building calm, memorable systems that help brands feel more premium, more persuasive, and more present.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Focus', body: 'Digital products and brand systems for founders, studios, and premium service businesses.' },
              { label: 'Approach', body: 'Clear storytelling, strong visual rhythm, and deliberate interaction design to improve trust and conversion.' },
            ].map(item => (
              <div key={item.label} style={{ padding: '18px 20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)' }}>
                <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.32em', color: 'rgba(56,189,248,0.6)', marginBottom: '6px', fontFamily: "'Poppins',sans-serif" }}>{item.label}</p>
                <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.7, fontFamily: "'Poppins',sans-serif" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ padding: '28px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.07)', background: '#0a0a12', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(249,115,22,0.06)', filter: 'blur(60px)', pointerEvents: 'none' }} />
            <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.32em', color: 'rgba(251,146,60,0.65)', marginBottom: '14px', fontFamily: "'Poppins',sans-serif" }}>Why it works</p>
            <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.8, marginBottom: '18px', fontFamily: "'Poppins',sans-serif" }}>I blend brand-first strategy with polished digital craftsmanship so every screen feels intentional and aligned.</p>
            {['Calm layouts with premium breathing room.', 'Clear storytelling that removes friction.', 'Cinematic design language built for trust.'].map(pt => (
              <div key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                <span style={{ marginTop: '7px', height: '6px', width: '6px', borderRadius: '50%', background: '#fb923c', flexShrink: 0 }} />
                <p style={{ fontSize: '12px', color: '#475569', fontFamily: "'Poppins',sans-serif" }}>{pt}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[{ val: '+42%', label: 'Qualified lead growth' }, { val: '2×', label: 'Faster brand clarity' }].map(s => (
              <div key={s.val} style={{ padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', background: '#0a0a12' }}>
                <H as="p" style={{ fontSize: 'clamp(1.6rem,3vw,2rem)', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>{s.val}</H>
                <p style={{ fontSize: '9px', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.18em', fontFamily: "'Poppins',sans-serif" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* ═══════════════════════════════════════════════════════
   SERVICES
═══════════════════════════════════════════════════════ */
function Services() {
  const [active, setActive] = useState(null)
  return (
    <motion.section id="services" {...reveal} style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <div className="two-col">
          <div className="sticky-col">
            <SectionLabel accent>What Gets Built</SectionLabel>
            <H as="h2" style={{ fontSize: 'clamp(1.6rem,3vw,2.5rem)', lineHeight: 1.08, letterSpacing: '-0.03em', color: '#fff', marginBottom: '16px' }}>
              Design systems, digital products, and motion-led stories.
            </H>
            <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.8, fontFamily: "'Poppins',sans-serif" }}>
              I focus on experiences that look polished, feel effortless, and create a confident digital presence with every scroll.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {services.map((svc, i) => (
              <motion.article key={svc.title} {...stagger(i)}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{
                  padding: '24px 28px', borderRadius: '18px', cursor: 'default', overflow: 'hidden', position: 'relative',
                  border: `1px solid ${active === i ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)'}`,
                  background: active === i ? `radial-gradient(ellipse at top right,${svc.glow},transparent 65%), #0a0a12` : '#0a0a12',
                  transition: 'border-color 0.35s, background 0.35s',
                }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '18px' }}>
                  <span style={{ fontSize: '10px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.18)', marginTop: '4px', flexShrink: 0 }}>{svc.index}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                      <H as="h3" style={{ fontSize: 'clamp(0.95rem,1.8vw,1.15rem)', fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: '10px' }}>
                        {svc.title}
                      </H>
                      <motion.span animate={{ opacity: active === i ? 1 : 0.18, scale: active === i ? 1 : 0.85 }}
                        transition={{ duration: 0.3 }}
                        style={{ fontSize: '14px', color: svc.dot, flexShrink: 0 }}>↗</motion.span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.75, marginBottom: '14px', fontFamily: "'Poppins',sans-serif" }}>{svc.description}</p>
                    <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <p style={{ fontSize: '11px', color: '#64748b', fontFamily: "'Poppins',sans-serif" }}>{svc.highlight}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* ═══════════════════════════════════════════════════════
   WORK
═══════════════════════════════════════════════════════ */
function Work() {
  return (
    <motion.section id="work" {...reveal} style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ marginBottom: '56px' }}>
          <SectionLabel>Selected Case Studies</SectionLabel>
          <H as="h2" style={{ fontSize: 'clamp(1.8rem,3.8vw,2.9rem)', lineHeight: 1.06, letterSpacing: '-0.03em', color: '#fff', maxWidth: '560px' }}>
            Projects designed to feel premium, purposeful, and memorable.
          </H>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {projects.map((p, i) => (
            <motion.article key={p.title} {...stagger(i)}
              style={{
                borderRadius: '24px', overflow: 'hidden', position: 'relative',
                border: '1px solid rgba(255,255,255,0.07)',
                background: `linear-gradient(135deg,${p.gradFrom},${p.gradTo}), #0a0a12`,
                transition: 'border-color 0.4s',
              }}
              whileHover={{ borderColor: 'rgba(255,255,255,0.12)' }}>
              <div className="project-grid">
                {/* Content */}
                <div style={{ padding: 'clamp(24px,4vw,40px)', display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '9px', padding: '5px 12px', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.28em', border: `1px solid ${p.dot}30`, color: `${p.dot}cc`, background: `${p.dot}0d`, fontFamily: "'Poppins',sans-serif" }}>
                      {p.label}
                    </span>
                    <span style={{ fontSize: '9px', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: "'Poppins',sans-serif" }}>{p.role}</span>
                  </div>

                  <H as="h3" style={{ fontSize: 'clamp(1.4rem,3vw,2.1rem)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.03em', color: '#fff' }}>
                    {p.title}
                  </H>

                  <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.8, maxWidth: '420px', fontFamily: "'Poppins',sans-serif" }}>{p.overview}</p>

                  <div className="two-col-sm">
                    {[{ label: 'Challenge', body: p.challenge }, { label: 'Solution', body: p.solution }].map(item => (
                      <div key={item.label} style={{ padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.22)' }}>
                        <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.28em', color: `${p.dot}aa`, marginBottom: '8px', fontFamily: "'Poppins',sans-serif" }}>{item.label}</p>
                        <p style={{ fontSize: '11px', color: '#475569', lineHeight: 1.7, fontFamily: "'Poppins',sans-serif" }}>{item.body}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.22)' }}>
                    <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.28em', color: '#475569', marginBottom: '8px', fontFamily: "'Poppins',sans-serif" }}>Outcome</p>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: '#cbd5e1', fontFamily: "'Poppins',sans-serif" }}>{p.outcome}</p>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {p.tools.map(tool => (
                      <span key={tool} style={{ fontSize: '9px', padding: '5px 12px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.07)', color: '#475569', fontFamily: "'Poppins',sans-serif" }}>{tool}</span>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }} className="project-visual-border">
                  {/* Browser */}
                  <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: '#07070f', position: 'relative', minHeight: '160px' }}>
                    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 30% 20%,${p.dot}18,transparent 60%)`, pointerEvents: 'none' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ height: '8px', width: '8px', borderRadius: '50%', background: 'rgba(239,68,68,0.5)' }} />
                      <span style={{ height: '8px', width: '8px', borderRadius: '50%', background: 'rgba(251,191,36,0.5)' }} />
                      <span style={{ height: '8px', width: '8px', borderRadius: '50%', background: 'rgba(52,211,153,0.5)' }} />
                      <span style={{ flex: 1, height: '14px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', marginLeft: '8px' }} />
                    </div>
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ height: '16px', width: '70%', borderRadius: '4px', background: 'rgba(255,255,255,0.04)' }} />
                      <div style={{ height: '10px', width: '100%', borderRadius: '4px', background: 'rgba(255,255,255,0.03)' }} />
                      <div style={{ height: '10px', width: '85%', borderRadius: '4px', background: 'rgba(255,255,255,0.03)' }} />
                      <div style={{ height: '56px', width: '100%', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', marginTop: '8px' }} />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
                        <div style={{ height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)' }} />
                        <div style={{ height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)' }} />
                      </div>
                    </div>
                  </div>

                  {/* Bars */}
                  <div style={{ height: '80px', borderRadius: '16px', padding: '12px', border: '1px solid rgba(255,255,255,0.06)', background: '#07070f', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 85% 50%,${p.dot}12,transparent 60%)`, pointerEvents: 'none' }} />
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '100%', position: 'relative' }}>
                      {p.bars.map((h, j) => (
                        <motion.div key={j}
                          initial={{ height: 0 }} whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: j * 0.06, ease }}
                          style={{ flex: 1, borderRadius: '3px', background: p.dot, opacity: 0.3 }} />
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

/* ═══════════════════════════════════════════════════════
   WHY
═══════════════════════════════════════════════════════ */
function Why() {
  return (
    <motion.section {...reveal} style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <div className="two-col">
          <div>
            <SectionLabel>Why Work With Me</SectionLabel>
            <H as="h2" style={{ fontSize: 'clamp(1.6rem,3vw,2.5rem)', lineHeight: 1.08, letterSpacing: '-0.03em', color: '#fff' }}>
              A premium, trust-building approach grounded in strategy.
            </H>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px' }}>
            {whyPoints.map((pt, i) => (
              <motion.div key={pt.title} {...stagger(i)}
                style={{ padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', background: '#0a0a12', transition: 'border-color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}>
                <p style={{ fontSize: '10px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.18)', marginBottom: '14px' }}>{pt.num}</p>
                <H as="h3" style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>{pt.title}</H>
                <p style={{ fontSize: '11px', color: '#475569', lineHeight: 1.7, fontFamily: "'Poppins',sans-serif" }}>{pt.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* ═══════════════════════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════════════════════ */
function Testimonials() {
  return (
    <motion.section {...reveal} style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <SectionLabel accent>Testimonials</SectionLabel>
        <H as="h2" style={{ fontSize: 'clamp(1.6rem,3vw,2.5rem)', lineHeight: 1.06, letterSpacing: '-0.03em', color: '#fff', maxWidth: '480px', marginBottom: '48px' }}>
          Trusted by founders who demand digital work with confidence.
        </H>

        <div className="testimonials-grid">
          {/* Featured */}
          <div style={{ padding: '36px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.07)', background: '#0a0a12', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(249,115,22,0.06)', filter: 'blur(60px)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <H as="p" style={{ fontSize: '48px', fontWeight: 900, lineHeight: 1, marginBottom: '16px', background: 'linear-gradient(135deg,#f97316,#fdba74)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>"</H>
              <p style={{ fontSize: 'clamp(14px,1.4vw,17px)', lineHeight: 1.75, color: '#cbd5e1', marginBottom: '28px', fontFamily: "'Poppins',sans-serif", fontWeight: 300 }}>
                {testimonials[0].quote}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ height: '44px', width: '44px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, background: 'rgba(249,115,22,0.12)', color: '#fb923c', flexShrink: 0, fontFamily: "'Poppins',sans-serif" }}>
                  {testimonials[0].initial}
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#fff', fontFamily: "'Poppins',sans-serif" }}>{testimonials[0].name}</p>
                  <p style={{ fontSize: '11px', color: '#475569', fontFamily: "'Poppins',sans-serif" }}>{testimonials[0].role}</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {testimonials.slice(1).map(item => (
              <div key={item.name} style={{ padding: '22px 24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.07)', background: '#0a0a12' }}>
                <p style={{ fontSize: '13px', lineHeight: 1.75, color: '#64748b', marginBottom: '18px', fontFamily: "'Poppins',sans-serif", fontWeight: 300 }}>"{item.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ height: '36px', width: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, background: 'rgba(56,189,248,0.1)', color: '#38bdf8', flexShrink: 0, fontFamily: "'Poppins',sans-serif" }}>
                    {item.initial}
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: '#fff', fontFamily: "'Poppins',sans-serif" }}>{item.name}</p>
                    <p style={{ fontSize: '10px', color: '#475569', fontFamily: "'Poppins',sans-serif" }}>{item.role}</p>
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

/* ═══════════════════════════════════════════════════════
   PROCESS
═══════════════════════════════════════════════════════ */
function Process() {
  return (
    <motion.section id="process" {...reveal} style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <SectionLabel>Process</SectionLabel>
        <H as="h2" style={{ fontSize: 'clamp(1.6rem,3vw,2.5rem)', lineHeight: 1.06, letterSpacing: '-0.03em', color: '#fff', maxWidth: '480px', marginBottom: '12px' }}>
          A carefully designed journey from direction to launch.
        </H>
        <p style={{ fontSize: '12px', color: '#475569', marginBottom: '48px', maxWidth: '420px', lineHeight: 1.8, fontFamily: "'Poppins',sans-serif" }}>
          Every project follows a clear flow that keeps the brand voice consistent and the delivery polished.
        </p>
        <div className="process-grid">
          {processSteps.map((step, i) => (
            <motion.div key={step.num} {...stagger(i)}
              style={{ position: 'relative', padding: '22px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.07)', background: '#0a0a12', overflow: 'hidden' }}>
              <H as="span" style={{ position: 'absolute', top: '-4px', right: '-4px', fontSize: '72px', fontWeight: 900, color: 'rgba(255,255,255,0.025)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
                {step.num}
              </H>
              <p style={{ fontSize: '10px', fontFamily: 'monospace', marginBottom: '18px', color: i === 1 ? 'rgba(249,115,22,0.55)' : 'rgba(56,189,248,0.45)' }}>{step.num}</p>
              <H as="h3" style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '10px', lineHeight: 1.3 }}>{step.title}</H>
              <p style={{ fontSize: '11px', color: '#475569', lineHeight: 1.7, fontFamily: "'Poppins',sans-serif" }}>{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

/* ═══════════════════════════════════════════════════════
   CTA
═══════════════════════════════════════════════════════ */
function CTA() {
  return (
    <motion.section id="contact" {...reveal} style={{ padding: '64px 20px 96px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ position: 'relative', borderRadius: '28px', overflow: 'hidden', padding: 'clamp(36px,6vw,72px)', border: '1px solid rgba(255,255,255,0.07)', background: '#0a0a12' }}>
          {/* Orange-dominant BG glow */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-30%', left: '-12%', width: '520px', height: '520px', borderRadius: '50%', background: 'rgba(249,115,22,0.1)', filter: 'blur(120px)' }} />
            <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '380px', height: '380px', borderRadius: '50%', background: 'rgba(56,189,248,0.07)', filter: 'blur(100px)' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)', backgroundSize: '56px 56px' }} />
          </div>

          <div className="cta-grid">
            <div>
              <SectionLabel accent>Start Here</SectionLabel>
              <H as="h2" style={{ fontSize: 'clamp(1.9rem,5vw,3.6rem)', lineHeight: 0.98, letterSpacing: '-0.04em', color: '#fff', marginBottom: '20px' }}>
                Let's build something that feels{' '}
                <span style={{ background: 'linear-gradient(90deg,#f97316,#fb923c,#fdba74)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  cinematic
                </span>{' '}
                and converts.
              </H>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.9, maxWidth: '440px', fontFamily: "'Poppins',sans-serif" }}>
                If you want a website that communicates brand authority, feels intentional, and converts with confidence — this is the place to start.
              </p>
            </div>

            <div style={{ padding: '28px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ height: '6px', width: '6px', borderRadius: '50%', background: '#34d399', flexShrink: 0, animation: 'pulse 2s infinite' }} />
                <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.32em', color: '#475569', fontFamily: "'Poppins',sans-serif" }}>Available for new projects</p>
              </div>
              <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.8, fontFamily: "'Poppins',sans-serif" }}>
                I work with founders and teams who want a digital experience that feels elevated, intentional, and built to support their brand story.
              </p>
              <OrangeBtn href="mailto:hello@smartmoses.com">Send a project brief</OrangeBtn>
              <p style={{ fontSize: '10px', color: '#334155', textAlign: 'center', fontFamily: "'Poppins',sans-serif" }}>Include your brand focus, timeline, and audience.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* ═══════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '48px 20px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="footer-grid" style={{ marginBottom: '32px' }}>
          <div>
            <H as="p" style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>
              Smart Moses
            </H>
            <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.8, maxWidth: '320px', fontFamily: "'Poppins',sans-serif" }}>
              Creative Technologist & Digital Brand Builder. Building modern digital experiences through design, development, branding, and visual storytelling.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.32em', color: '#1e293b', marginBottom: '16px', fontFamily: "'Poppins',sans-serif" }}>Navigate</p>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['About', 'Services', 'Work', 'Process'].map(link => (
                  <a key={link} href={`#${link.toLowerCase()}`}
                    style={{ fontSize: '12px', color: '#475569', textDecoration: 'none', fontFamily: "'Poppins',sans-serif", transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#fff'}
                    onMouseLeave={e => e.target.style.color = '#475569'}>
                    {link}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.32em', color: '#1e293b', marginBottom: '16px', fontFamily: "'Poppins',sans-serif" }}>Connect</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href="mailto:hello@smartmoses.com"
                  style={{ fontSize: '12px', color: '#475569', textDecoration: 'none', wordBreak: 'break-all', fontFamily: "'Poppins',sans-serif", transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = '#475569'}>
                  hello@smartmoses.com
                </a>
                <a href="#contact"
                  style={{ fontSize: '12px', color: 'rgba(249,115,22,0.7)', textDecoration: 'none', fontFamily: "'Poppins',sans-serif", transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#f97316'}
                  onMouseLeave={e => e.target.style.color = 'rgba(249,115,22,0.7)'}>
                  Start a project →
                </a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px' }}>
          <p style={{ fontSize: '10px', color: '#1e293b', fontFamily: "'Poppins',sans-serif" }}>© {new Date().getFullYear()} Smart Moses. All rights reserved.</p>
          <p style={{ fontSize: '10px', color: '#1e293b', fontFamily: "'Poppins',sans-serif" }}>Creative Technologist</p>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,600;12..96,700;12..96,800&family=Poppins:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        body {
          background: #050508;
          color: #94a3b8;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }

        /* Film grain overlay */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.022;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        img { max-width: 100%; display: block; }
        a { text-decoration: none; }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(249,115,22,0.3); border-radius: 2px; }
        ::selection { background: rgba(249,115,22,0.22); color: #fff; }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* ── Layout helpers ── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr 420px; gap: 72px; }
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .two-col { grid-template-columns: 360px 1fr; gap: 64px; }
        }

        .two-col-sm {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }
        @media (min-width: 640px) {
          .two-col-sm { grid-template-columns: 1fr 1fr; }
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 1024px) {
          .testimonials-grid { grid-template-columns: 1.5fr 1fr; }
        }

        .cta-grid {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .cta-grid { grid-template-columns: 1.2fr 0.8fr; gap: 56px; }
        }

        .process-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (min-width: 1024px) {
          .process-grid { grid-template-columns: repeat(4, 1fr); }
        }

        .project-grid {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .project-grid { grid-template-columns: 1.15fr 0.85fr; }
        }

        .project-visual-border {
          border-left: none;
        }
        @media (min-width: 1024px) {
          .project-visual-border { border-top: none !important; border-left: 1px solid rgba(255,255,255,0.06) !important; }
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
        }
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 1.5fr 1fr; }
        }

        .sticky-col {
          position: static;
        }
        @media (min-width: 1024px) {
          .sticky-col { position: sticky; top: 112px; }
        }

        /* Mobile nav toggle */
        .hidden-mobile { display: flex; }
        .show-mobile { display: none; }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>

      <div style={{ position: 'relative', minHeight: '100vh', background: '#050508', color: '#94a3b8' }}>
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