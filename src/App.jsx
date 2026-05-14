import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

/* ═══════════════════════
   TOKENS & PALETTE
═══════════════════════ */
const C = {
  bg: '#050508',
  surface: '#0a0a12',
  navy: '#07111F',
  orange: '#FF7A18',
  orangeMid: '#fb923c',
  orangeLight: '#FFB457',
  sky: '#38BDF8',
  white: '#F8FAFC',
  muted: '#475569',
  dim: '#334155',
  subtle: '#1e293b',
}

const gradOrange = `linear-gradient(135deg, ${C.orange}, ${C.orangeMid}, ${C.orangeLight})`
const ease = [0.16, 1, 0.3, 1]

/* ═══════════════════════
   DATA
═══════════════════════ */
const NAV_LINKS = ['About', 'Services', 'Work', 'Process']

const SERVICES = [
  {
    idx: '01',
    title: 'Web Design & Development',
    body: 'Polished digital destinations built with precision — from brand strategy to pixel-perfect execution. Premium feel, scalable structure.',
    tag: 'Experience-first design',
    accent: C.sky,
    glow: 'rgba(56,189,248,0.07)',
  },
  {
    idx: '02',
    title: 'Brand & Visual Identity',
    body: 'Visual systems that build trust, signal authority, and communicate your unique voice across every touchpoint.',
    tag: 'Cinematic brand direction',
    accent: C.orangeMid,
    glow: 'rgba(255,122,24,0.07)',
  },
  {
    idx: '03',
    title: 'Video & Motion Content',
    body: 'Short-form storytelling and motion graphics that amplify your message and accelerate emotional connection.',
    tag: 'Strategic content systems',
    accent: '#a78bfa',
    glow: 'rgba(167,139,250,0.07)',
  },
]

const PROJECTS = [
  {
    title: 'Evoke Studio Launch',
    label: 'Brand System & Web Launch',
    role: 'Lead Product Designer',
    overview: 'A premium launch platform for a creative studio — designed to communicate authority, build trust, and convert on first impression.',
    challenge: 'Position a new studio as high-end without relying on generic layouts or bloated messaging.',
    solution: 'Built an immersive narrative structure with strong typographic hierarchy and strategic conversion cues.',
    outcome: '+42% audience engagement. Qualified inquiries doubled within the first month.',
    tools: ['React', 'Tailwind CSS', 'Figma', 'Brand Strategy'],
    accent: C.sky,
    bars: [40, 60, 45, 75, 55, 80, 90],
    gradFrom: 'rgba(56,189,248,0.1)',
    gradTo: 'rgba(56,189,248,0.01)',
  },
  {
    title: 'Motion Brand Reveal',
    label: 'Content System & Motion Direction',
    role: 'Creative Director',
    overview: 'A cinematic content system for a coaching brand — motion-led, story-driven, and built for premium social presence.',
    challenge: 'Translate brand emotion into short-form motion without losing premium visual coherence.',
    solution: 'Layered motion concepts, editorial structure, and story frameworks that gave the brand a distinct visual identity.',
    outcome: 'Stronger audience traction and a cohesive brand identity across all video channels.',
    tools: ['Premiere Pro', 'After Effects', 'Brand Strategy'],
    accent: C.orangeMid,
    bars: [55, 40, 70, 50, 85, 60, 95],
    gradFrom: 'rgba(251,146,60,0.1)',
    gradTo: 'rgba(251,146,60,0.01)',
  },
  {
    title: 'Responsive Product Narrative',
    label: 'Website Design & Strategy',
    role: 'Experience Architect',
    overview: 'A responsive digital experience for a product founder — designed for market clarity, premium positioning, and trust-first storytelling.',
    challenge: 'Build a memorable site that made the product feel intuitive, premium, and easy to scope.',
    solution: 'Minimalist interface with bold hierarchy, strategic whitespace, and elegant micro-interactions.',
    outcome: 'Launch-ready experience that elevated brand perception and opened new partnership conversations.',
    tools: ['React', 'Tailwind CSS', 'Content Strategy'],
    accent: '#a78bfa',
    bars: [35, 65, 50, 80, 45, 70, 88],
    gradFrom: 'rgba(167,139,250,0.1)',
    gradTo: 'rgba(167,139,250,0.01)',
  },
]

const WHY = [
  { num: '01', title: 'Strategic Thinking', body: 'Every visual decision begins with a business outcome — trust, clarity, and movement toward action.' },
  { num: '02', title: 'Premium Visual Direction', body: 'Minimal details, cinematic contrast, and considered spacing that elevate brand perception.' },
  { num: '03', title: 'User-Focused Execution', body: 'Interfaces that feel intuitive, composed, and purpose-built for modern audiences.' },
  { num: '04', title: 'Multi-Disciplinary Range', body: 'Design, technology, branding, and motion working as one cohesive creative system.' },
]

const TESTIMONIALS = [
  { quote: 'Smart Moses brought real clarity to our launch — and helped us communicate our value with confidence and style.', name: 'Aisha Bello', role: 'Founder, Luma Collective', initial: 'AB' },
  { quote: 'The site felt cinematic yet grounded. It made our brand feel more strategic, trustworthy, and emotionally resonant.', name: 'Daniel Nwachukwu', role: 'CEO, Novo Studio', initial: 'DN' },
  { quote: 'His design system made every touchpoint feel polished and purposeful — nothing random, nothing wasted.', name: 'Kemi Ade', role: 'Creative Director, Atlas Labs', initial: 'KA' },
]

const PROCESS = [
  { num: '01', title: 'Discovery & Direction', body: 'Deep-dive into your brand, audience, and goals — building a creative foundation that informs every decision.' },
  { num: '02', title: 'Strategy & Structure', body: 'Architecture, narrative mapping, and user flow design that makes the experience feel inevitable.' },
  { num: '03', title: 'Design & Development', body: 'High-fidelity design built alongside production code — no handoff friction, no lost nuance.' },
  { num: '04', title: 'Refinement & Delivery', body: 'Iteration, polish, and meticulous final review before handing you a live, launch-ready experience.' },
]

/* ═══════════════════════
   SHARED ANIMATION
═══════════════════════ */
const revealUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.9, ease, delay },
})

/* ═══════════════════════
   SHARED COMPONENTS
═══════════════════════ */
const BG_FONT = "'Bricolage Grotesque', sans-serif"

function Label({ children, accent }) {
  const color = accent ? 'rgba(255,122,24,0.65)' : 'rgba(56,189,248,0.6)'
  const line = accent ? C.orange : C.sky
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
      <span style={{ height: '1px', width: '24px', background: line, opacity: 0.55, flexShrink: 0 }} />
      <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.38em', color, fontFamily: "'Poppins', sans-serif" }}>
        {children}
      </p>
    </div>
  )
}

function OrangeBtn({ href, children, style = {} }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        borderRadius: '9999px', padding: '13px 26px',
        background: gradOrange, color: '#1c0800',
        fontSize: '12px', fontWeight: 700, letterSpacing: '0.01em',
        fontFamily: "'Poppins', sans-serif", textDecoration: 'none', flexShrink: 0,
        boxShadow: hov ? '0 0 40px rgba(255,122,24,0.4)' : '0 0 0 rgba(0,0,0,0)',
        transform: hov ? 'translateY(-1px)' : 'translateY(0)',
        transition: 'box-shadow 0.3s, transform 0.3s',
        ...style,
      }}>
      {children} <span style={{ fontSize: '14px' }}>→</span>
    </a>
  )
}

function GhostBtn({ href, children, style = {} }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        borderRadius: '9999px', padding: '13px 26px',
        border: '1px solid rgba(255,255,255,0.1)',
        background: hov ? 'rgba(255,255,255,0.05)' : 'transparent',
        color: hov ? '#fff' : '#64748b',
        fontSize: '12px', fontWeight: 500, letterSpacing: '0.01em',
        fontFamily: "'Poppins', sans-serif", textDecoration: 'none', flexShrink: 0,
        transition: 'color 0.25s, background 0.25s',
        ...style,
      }}>
      {children}
    </a>
  )
}

/* ═══════════════════════
   NAV
═══════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
      style={{
        position: 'fixed', top: '14px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 100, width: 'calc(100% - 32px)', maxWidth: '1040px',
        background: scrolled ? 'rgba(5,5,8,0.85)' : 'transparent',
        border: `1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'}`,
        borderRadius: '16px',
        backdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'none',
        boxShadow: scrolled ? '0 24px 64px rgba(0,0,0,0.55)' : 'none',
        transition: 'background 0.5s, border-color 0.5s, box-shadow 0.5s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 22px' }}>
        {/* Logo */}
        <div>
          <p style={{ fontFamily: BG_FONT, fontSize: '12px', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.92)', lineHeight: 1 }}>
            Smart Moses
          </p>
          <p style={{ fontSize: '9px', color: '#334155', letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: '3px', fontFamily: "'Poppins', sans-serif" }}>
            Creative Technologist
          </p>
        </div>

        {/* Desktop Nav */}
        <nav className="nav-desktop">
          {NAV_LINKS.map(link => (
            <NavLink key={link} href={`#${link.toLowerCase()}`}>{link}</NavLink>
          ))}
          <div style={{ marginLeft: '10px' }}>
            <OrangeBtn href="#contact">Let's Talk</OrangeBtn>
          </div>
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          className="nav-hamburger"
          aria-label="Toggle menu"
          style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              height: '1px', width: '20px', background: 'rgba(255,255,255,0.65)', display: 'block',
              transform: open ? (i === 0 ? 'rotate(45deg) translate(4px,4px)' : i === 2 ? 'rotate(-45deg) translate(4px,-4px)' : 'none') : 'none',
              opacity: open && i === 1 ? 0 : 1,
              transition: 'transform 0.3s, opacity 0.25s',
            }} />
          ))}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease }}
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}
          >
            <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {NAV_LINKS.map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}
                  style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontFamily: "'Poppins', sans-serif" }}>
                  {link}
                </a>
              ))}
              <OrangeBtn href="#contact">Let's Talk</OrangeBtn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function NavLink({ href, children }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: '8px 13px', fontSize: '11px', letterSpacing: '0.02em',
        color: hov ? '#fff' : '#64748b', textDecoration: 'none',
        borderRadius: '8px', fontFamily: "'Poppins', sans-serif",
        background: hov ? 'rgba(255,255,255,0.05)' : 'transparent',
        transition: 'color 0.2s, background 0.2s',
      }}>
      {children}
    </a>
  )
}

/* ═══════════════════════
   HERO
═══════════════════════ */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '100px', paddingBottom: '72px', overflow: 'hidden' }}>
      {/* Background atmosphere */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-15%', left: '-10%', width: '560px', height: '560px', borderRadius: '50%', background: 'rgba(56,189,248,0.065)', filter: 'blur(130px)' }} />
        <div style={{ position: 'absolute', top: '5%', right: '-8%', width: '480px', height: '480px', borderRadius: '50%', background: 'rgba(255,122,24,0.07)', filter: 'blur(110px)' }} />
        <div style={{ position: 'absolute', bottom: '-5%', left: '35%', width: '320px', height: '280px', borderRadius: '50%', background: 'rgba(167,139,250,0.045)', filter: 'blur(80px)' }} />
        {/* Subtle grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
      </div>

      <motion.div style={{ y, opacity, position: 'relative', zIndex: 10, width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div className="hero-grid">
          {/* Left */}
          <div>
            <motion.div {...revealUp(0.15)} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
              <span style={{ height: '1px', width: '28px', background: C.orange, opacity: 0.45 }} />
              <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.4em', color: 'rgba(255,122,24,0.6)', fontFamily: "'Poppins', sans-serif" }}>
                Creative partner for premium digital brands
              </p>
            </motion.div>

            <motion.h1 {...revealUp(0.28)} style={{ fontFamily: BG_FONT, fontSize: 'clamp(2.8rem,7.5vw,5.4rem)', lineHeight: 0.94, letterSpacing: '-0.04em', color: '#fff', marginBottom: '28px' }}>
              Crafting<br />
              <span style={{ background: gradOrange, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                cinematic
              </span>
              <br />digital brands.
            </motion.h1>

            <motion.p {...revealUp(0.42)} style={{ fontSize: 'clamp(13px,1.4vw,15px)', lineHeight: 1.9, color: '#64748b', maxWidth: '460px', marginBottom: '40px', fontFamily: "'Poppins', sans-serif" }}>
              I help founders, studios, and startups move beyond generic developer websites — with premium storytelling, polished UX, and brand direction that builds trust and converts.
            </motion.p>

            <motion.div {...revealUp(0.54)} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '52px' }}>
              <OrangeBtn href="#contact">Start a project</OrangeBtn>
              <GhostBtn href="#work">View case studies</GhostBtn>
            </motion.div>

            {/* Identity strip */}
            <motion.div {...revealUp(0.66)} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Brand Strategy', 'Web Design', 'Motion Direction', 'Visual Systems'].map((tag, i) => (
                <motion.span key={tag}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.06, ease }}
                  style={{ fontSize: '10px', padding: '6px 13px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', color: '#475569', fontFamily: "'Poppins', sans-serif" }}>
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Right — Identity card */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.35, ease }}
            style={{ position: 'relative' }}
          >
            {/* Glow halo */}
            <div style={{ position: 'absolute', inset: '-16px', borderRadius: '2.4rem', background: 'linear-gradient(135deg,rgba(255,122,24,0.12),rgba(56,189,248,0.08),rgba(167,139,250,0.06))', filter: 'blur(28px)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', borderRadius: '1.75rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: '#090910', boxShadow: '0 64px 120px rgba(0,0,0,0.7)' }}>
              {/* Portrait */}
              <div style={{ position: 'relative', height: 'clamp(200px,32vw,300px)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 10, background: 'linear-gradient(to bottom,transparent 50%,#090910 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, zIndex: 10, background: 'linear-gradient(135deg,rgba(255,122,24,0.08),transparent 55%)' }} />
                <img src="/images/me.jpeg" alt="Smart Moses" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
              </div>

              {/* Info cards */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Current focus */}
                <div style={{ padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                  <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(255,122,24,0.55)', marginBottom: '5px', fontFamily: "'Poppins', sans-serif" }}>Current Focus</p>
                  <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.65, fontFamily: "'Poppins', sans-serif" }}>Building premium digital experiences for ambitious founders and studios.</p>
                </div>
                {/* Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[{ val: '+42%', label: 'Lead Growth' }, { val: '3yr+', label: 'Experience' }].map(s => (
                    <div key={s.val} style={{ padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                      <p style={{ fontFamily: BG_FONT, fontSize: '1.35rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{s.val}</p>
                      <p style={{ fontSize: '9px', color: '#334155', marginTop: '4px', fontFamily: "'Poppins', sans-serif" }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, x: 14, y: -6 }} animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease }}
              style={{ position: 'absolute', top: '-12px', right: '-12px', padding: '10px 14px', borderRadius: '14px', border: '1px solid rgba(255,122,24,0.2)', background: 'rgba(9,9,16,0.94)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 28px rgba(0,0,0,0.4)' }}
            >
              <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,122,24,0.6)', fontFamily: "'Poppins', sans-serif" }}>Available</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <span style={{ height: '6px', width: '6px', borderRadius: '50%', background: '#34d399', flexShrink: 0, animation: 'pulse 2s infinite' }} />
                <p style={{ fontSize: '11px', color: '#fff', fontWeight: 500, fontFamily: "'Poppins', sans-serif" }}>For new projects</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════
   ABOUT
═══════════════════════ */
function About() {
  return (
    <motion.section id="about" {...revealUp()} style={{ maxWidth: '1280px', margin: '0 auto', padding: '96px 24px' }}>
      <div className="two-col">
        <div>
          <Label>About the practice</Label>
          <h2 style={{ fontFamily: BG_FONT, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', lineHeight: 1.06, letterSpacing: '-0.03em', color: '#fff', marginBottom: '22px' }}>
            I turn ambitious brands into digital experiences with clarity, craft, and lasting impact.
          </h2>
          <p style={{ fontSize: '13px', lineHeight: 1.9, color: '#64748b', maxWidth: '440px', marginBottom: '32px', fontFamily: "'Poppins', sans-serif" }}>
            This isn't about developer portfolios or generic layouts. It's about calm, memorable systems that help brands feel more premium, more persuasive, and more present.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Focus', body: 'Digital products and brand systems for founders, studios, and premium service businesses.' },
              { label: 'Approach', body: 'Clear storytelling, strong visual rhythm, and deliberate interaction design that improve trust and conversion.' },
            ].map(item => (
              <div key={item.label} style={{ padding: '18px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
                <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.32em', color: 'rgba(56,189,248,0.55)', marginBottom: '6px', fontFamily: "'Poppins', sans-serif" }}>{item.label}</p>
                <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.75, fontFamily: "'Poppins', sans-serif" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ padding: '28px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.07)', background: C.surface, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,122,24,0.055)', filter: 'blur(60px)', pointerEvents: 'none' }} />
            <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.32em', color: 'rgba(255,122,24,0.55)', marginBottom: '16px', fontFamily: "'Poppins', sans-serif" }}>Why it works</p>
            <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.8, marginBottom: '20px', fontFamily: "'Poppins', sans-serif" }}>Brand-first strategy combined with polished digital craftsmanship — so every screen feels intentional and aligned.</p>
            {['Calm layouts with premium breathing room.', 'Clear storytelling that removes friction.', 'Cinematic design language built for trust.'].map(pt => (
              <div key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                <span style={{ marginTop: '6px', height: '5px', width: '5px', borderRadius: '50%', background: C.orangeMid, flexShrink: 0 }} />
                <p style={{ fontSize: '12px', color: '#475569', fontFamily: "'Poppins', sans-serif" }}>{pt}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[{ val: '+42%', label: 'Qualified lead growth' }, { val: '2×', label: 'Faster brand clarity' }].map(s => (
              <div key={s.val} style={{ padding: '22px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.07)', background: C.surface }}>
                <p style={{ fontFamily: BG_FONT, fontSize: 'clamp(1.6rem,3vw,2.1rem)', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>{s.val}</p>
                <p style={{ fontSize: '9px', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.18em', fontFamily: "'Poppins', sans-serif" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* ═══════════════════════
   SERVICES
═══════════════════════ */
function Services() {
  const [active, setActive] = useState(null)
  return (
    <section id="services" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div {...revealUp()} className="two-col">
          <div className="sticky-col">
            <Label accent>What Gets Built</Label>
            <h2 style={{ fontFamily: BG_FONT, fontSize: 'clamp(1.6rem,3vw,2.4rem)', lineHeight: 1.08, letterSpacing: '-0.03em', color: '#fff', marginBottom: '16px' }}>
              Design systems, digital products, and motion-led stories.
            </h2>
            <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.85, fontFamily: "'Poppins', sans-serif" }}>
              Experiences that look polished, feel effortless, and create a confident digital presence with every scroll.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {SERVICES.map((svc, i) => (
              <motion.article key={svc.title} {...revealUp(i * 0.08)}
                onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
                style={{
                  padding: '26px 28px', borderRadius: '18px', cursor: 'default', overflow: 'hidden', position: 'relative',
                  border: `1px solid ${active === i ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)'}`,
                  background: active === i ? `radial-gradient(ellipse at top right, ${svc.glow}, transparent 65%), ${C.surface}` : C.surface,
                  transition: 'border-color 0.3s, background 0.3s',
                }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <span style={{ fontSize: '9px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.15)', marginTop: '6px', flexShrink: 0 }}>{svc.idx}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
                      <h3 style={{ fontFamily: BG_FONT, fontSize: 'clamp(0.95rem,1.7vw,1.1rem)', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{svc.title}</h3>
                      <motion.span animate={{ opacity: active === i ? 1 : 0.15 }} transition={{ duration: 0.25 }}
                        style={{ fontSize: '13px', color: svc.accent, flexShrink: 0 }}>↗</motion.span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.8, marginBottom: '14px', fontFamily: "'Poppins', sans-serif" }}>{svc.body}</p>
                    <div style={{ padding: '9px 13px', borderRadius: '9px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <p style={{ fontSize: '11px', color: '#64748b', fontFamily: "'Poppins', sans-serif" }}>{svc.tag}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════
   WORK
═══════════════════════ */
function Work() {
  return (
    <section id="work" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div {...revealUp()} style={{ marginBottom: '56px' }}>
          <Label>Selected Case Studies</Label>
          <h2 style={{ fontFamily: BG_FONT, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', lineHeight: 1.06, letterSpacing: '-0.03em', color: '#fff', maxWidth: '540px' }}>
            Projects designed to feel premium, purposeful, and memorable.
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {PROJECTS.map((p, i) => (
            <motion.article key={p.title} {...revealUp(i * 0.08)}
              style={{
                borderRadius: '24px', overflow: 'hidden', position: 'relative',
                border: '1px solid rgba(255,255,255,0.07)',
                background: `linear-gradient(135deg, ${p.gradFrom}, ${p.gradTo}), ${C.surface}`,
                transition: 'border-color 0.4s',
              }}
              whileHover={{ borderColor: 'rgba(255,255,255,0.12)' }}>
              <div className="project-grid">
                {/* Content */}
                <div style={{ padding: 'clamp(24px,4vw,44px)', display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '9px', padding: '5px 12px', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.26em', border: `1px solid ${p.accent}30`, color: `${p.accent}cc`, background: `${p.accent}0d`, fontFamily: "'Poppins', sans-serif" }}>{p.label}</span>
                    <span style={{ fontSize: '9px', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.18em', fontFamily: "'Poppins', sans-serif" }}>{p.role}</span>
                  </div>

                  <h3 style={{ fontFamily: BG_FONT, fontSize: 'clamp(1.4rem,2.8vw,2rem)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.03em', color: '#fff' }}>{p.title}</h3>

                  <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.85, maxWidth: '420px', fontFamily: "'Poppins', sans-serif" }}>{p.overview}</p>

                  <div className="two-col-sm">
                    {[{ label: 'Challenge', body: p.challenge }, { label: 'Solution', body: p.solution }].map(item => (
                      <div key={item.label} style={{ padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.22)' }}>
                        <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.26em', color: `${p.accent}99`, marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>{item.label}</p>
                        <p style={{ fontSize: '11px', color: '#475569', lineHeight: 1.75, fontFamily: "'Poppins', sans-serif" }}>{item.body}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.22)' }}>
                    <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.26em', color: '#475569', marginBottom: '7px', fontFamily: "'Poppins', sans-serif" }}>Outcome</p>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: '#cbd5e1', fontFamily: "'Poppins', sans-serif" }}>{p.outcome}</p>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                    {p.tools.map(t => (
                      <span key={t} style={{ fontSize: '9px', padding: '5px 11px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.07)', color: '#475569', fontFamily: "'Poppins', sans-serif" }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }} className="project-visual-col">
                  {/* Browser mockup */}
                  <div style={{ flex: 1, borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: '#07070f', position: 'relative', minHeight: '160px' }}>
                    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 30% 20%, ${p.accent}18, transparent 60%)`, pointerEvents: 'none' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      {['rgba(239,68,68,0.45)', 'rgba(251,191,36,0.45)', 'rgba(52,211,153,0.45)'].map((bg, j) => (
                        <span key={j} style={{ height: '7px', width: '7px', borderRadius: '50%', background: bg }} />
                      ))}
                      <span style={{ flex: 1, height: '12px', borderRadius: '5px', background: 'rgba(255,255,255,0.035)', marginLeft: '8px' }} />
                    </div>
                    <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                      <div style={{ height: '14px', width: '65%', borderRadius: '4px', background: 'rgba(255,255,255,0.035)' }} />
                      <div style={{ height: '9px', width: '100%', borderRadius: '4px', background: 'rgba(255,255,255,0.025)' }} />
                      <div style={{ height: '9px', width: '80%', borderRadius: '4px', background: 'rgba(255,255,255,0.025)' }} />
                      <div style={{ height: '52px', width: '100%', borderRadius: '10px', background: 'rgba(255,255,255,0.025)', marginTop: '8px' }} />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px', marginTop: '6px' }}>
                        <div style={{ height: '28px', borderRadius: '7px', background: 'rgba(255,255,255,0.025)' }} />
                        <div style={{ height: '28px', borderRadius: '7px', background: 'rgba(255,255,255,0.025)' }} />
                      </div>
                    </div>
                  </div>

                  {/* Bar chart */}
                  <div style={{ height: '76px', borderRadius: '14px', padding: '12px', border: '1px solid rgba(255,255,255,0.06)', background: '#07070f', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 80% 50%, ${p.accent}12, transparent 60%)`, pointerEvents: 'none' }} />
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '100%', position: 'relative' }}>
                      {p.bars.map((h, j) => (
                        <motion.div key={j}
                          initial={{ height: 0 }} whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }} transition={{ duration: 0.65, delay: j * 0.05, ease }}
                          style={{ flex: 1, borderRadius: '3px', background: p.accent, opacity: 0.3 }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════
   WHY
═══════════════════════ */
function Why() {
  return (
    <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div {...revealUp()} className="two-col">
          <div>
            <Label>Why Work With Me</Label>
            <h2 style={{ fontFamily: BG_FONT, fontSize: 'clamp(1.6rem,3vw,2.4rem)', lineHeight: 1.08, letterSpacing: '-0.03em', color: '#fff' }}>
              A premium, trust-building approach grounded in strategy.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px' }}>
            {WHY.map((pt, i) => (
              <motion.div key={pt.title} {...revealUp(i * 0.07)}
                style={{ padding: '22px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', background: C.surface, transition: 'border-color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}>
                <p style={{ fontSize: '9px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.15)', marginBottom: '14px' }}>{pt.num}</p>
                <h3 style={{ fontFamily: BG_FONT, fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>{pt.title}</h3>
                <p style={{ fontSize: '11px', color: '#475569', lineHeight: 1.75, fontFamily: "'Poppins', sans-serif" }}>{pt.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════
   TESTIMONIALS
═══════════════════════ */
function Testimonials() {
  return (
    <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div {...revealUp()}>
          <Label accent>Testimonials</Label>
          <h2 style={{ fontFamily: BG_FONT, fontSize: 'clamp(1.6rem,3vw,2.4rem)', lineHeight: 1.06, letterSpacing: '-0.03em', color: '#fff', maxWidth: '480px', marginBottom: '48px' }}>
            Trusted by founders who demand digital work with confidence.
          </h2>
        </motion.div>

        <div className="testimonials-grid">
          {/* Featured */}
          <motion.div {...revealUp()} style={{ padding: '36px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.07)', background: C.surface, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,122,24,0.055)', filter: 'blur(60px)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <p style={{ fontFamily: BG_FONT, fontSize: '52px', fontWeight: 900, lineHeight: 1, marginBottom: '18px', background: gradOrange, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>"</p>
              <p style={{ fontSize: 'clamp(14px,1.35vw,16px)', lineHeight: 1.8, color: '#cbd5e1', marginBottom: '28px', fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}>{TESTIMONIALS[0].quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ height: '42px', width: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, background: 'rgba(255,122,24,0.1)', color: C.orangeMid, flexShrink: 0, fontFamily: "'Poppins', sans-serif" }}>
                  {TESTIMONIALS[0].initial}
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#fff', fontFamily: "'Poppins', sans-serif" }}>{TESTIMONIALS[0].name}</p>
                  <p style={{ fontSize: '11px', color: '#475569', fontFamily: "'Poppins', sans-serif" }}>{TESTIMONIALS[0].role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {TESTIMONIALS.slice(1).map((item, i) => (
              <motion.div key={item.name} {...revealUp(i * 0.1)}
                style={{ padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.07)', background: C.surface }}>
                <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#64748b', marginBottom: '18px', fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}>"{item.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ height: '34px', width: '34px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, background: 'rgba(56,189,248,0.1)', color: C.sky, flexShrink: 0, fontFamily: "'Poppins', sans-serif" }}>
                    {item.initial}
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: '#fff', fontFamily: "'Poppins', sans-serif" }}>{item.name}</p>
                    <p style={{ fontSize: '10px', color: '#475569', fontFamily: "'Poppins', sans-serif" }}>{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════
   PROCESS
═══════════════════════ */
function Process() {
  return (
    <section id="process" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div {...revealUp()}>
          <Label>Process</Label>
          <h2 style={{ fontFamily: BG_FONT, fontSize: 'clamp(1.6rem,3vw,2.4rem)', lineHeight: 1.06, letterSpacing: '-0.03em', color: '#fff', maxWidth: '460px', marginBottom: '14px' }}>
            A carefully designed journey from direction to launch.
          </h2>
          <p style={{ fontSize: '12px', color: '#475569', marginBottom: '48px', maxWidth: '400px', lineHeight: 1.85, fontFamily: "'Poppins', sans-serif" }}>
            Every project follows a clear, deliberate flow that keeps brand voice consistent and delivery polished.
          </p>
        </motion.div>
        <div className="process-grid">
          {PROCESS.map((step, i) => (
            <motion.div key={step.num} {...revealUp(i * 0.08)}
              style={{ position: 'relative', padding: '24px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.07)', background: C.surface, overflow: 'hidden' }}>
              <p style={{ fontFamily: BG_FONT, position: 'absolute', top: '-6px', right: '-2px', fontSize: '68px', fontWeight: 900, color: 'rgba(255,255,255,0.02)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>{step.num}</p>
              <p style={{ fontSize: '9px', fontFamily: 'monospace', marginBottom: '18px', color: i % 2 === 1 ? 'rgba(255,122,24,0.5)' : 'rgba(56,189,248,0.42)' }}>{step.num}</p>
              <h3 style={{ fontFamily: BG_FONT, fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '10px', lineHeight: 1.3 }}>{step.title}</h3>
              <p style={{ fontSize: '11px', color: '#475569', lineHeight: 1.75, fontFamily: "'Poppins', sans-serif" }}>{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════
   CTA
═══════════════════════ */
function CTA() {
  return (
    <section id="contact" style={{ padding: '64px 24px 96px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div {...revealUp()}
          style={{ position: 'relative', borderRadius: '28px', overflow: 'hidden', padding: 'clamp(36px,6vw,72px)', border: '1px solid rgba(255,255,255,0.07)', background: C.surface }}>
          {/* Atmosphere */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-30%', left: '-12%', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(255,122,24,0.08)', filter: 'blur(120px)' }} />
            <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '360px', height: '360px', borderRadius: '50%', background: 'rgba(56,189,248,0.06)', filter: 'blur(100px)' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.01) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.01) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>

          <div className="cta-grid">
            <div>
              <Label accent>Start Here</Label>
              <h2 style={{ fontFamily: BG_FONT, fontSize: 'clamp(1.9rem,4.5vw,3.4rem)', lineHeight: 0.98, letterSpacing: '-0.04em', color: '#fff', marginBottom: '20px' }}>
                Let's build something that feels{' '}
                <span style={{ background: gradOrange, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  cinematic
                </span>{' '}
                and converts.
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.9, maxWidth: '420px', fontFamily: "'Poppins', sans-serif" }}>
                If you want a website that communicates brand authority, feels intentional, and converts with confidence — this is where it starts.
              </p>
            </div>

            <div style={{ padding: '28px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.28)', backdropFilter: 'blur(12px)', display: 'flex', flexDirection: 'column', gap: '18px', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ height: '6px', width: '6px', borderRadius: '50%', background: '#34d399', flexShrink: 0, animation: 'pulse 2s infinite' }} />
                <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#475569', fontFamily: "'Poppins', sans-serif" }}>Available for new projects</p>
              </div>
              <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.85, fontFamily: "'Poppins', sans-serif" }}>
                I work with founders and teams who want a digital experience that feels elevated, intentional, and built to support their brand story.
              </p>
              <OrangeBtn href="mailto:hello@smartmoses.com">Send a project brief</OrangeBtn>
              <p style={{ fontSize: '10px', color: '#334155', textAlign: 'center', fontFamily: "'Poppins', sans-serif" }}>Include your brand focus, timeline, and audience.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════
   FOOTER
═══════════════════════ */
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="footer-grid" style={{ marginBottom: '32px' }}>
          <div>
            <p style={{ fontFamily: BG_FONT, fontSize: '12px', fontWeight: 800, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>Smart Moses</p>
            <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.85, maxWidth: '300px', fontFamily: "'Poppins', sans-serif" }}>
              Creative Technologist & Digital Brand Builder — building modern digital experiences through design, development, and visual storytelling.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.32em', color: '#1e293b', marginBottom: '16px', fontFamily: "'Poppins', sans-serif" }}>Navigate</p>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {NAV_LINKS.map(link => (
                  <FooterLink key={link} href={`#${link.toLowerCase()}`}>{link}</FooterLink>
                ))}
              </nav>
            </div>
            <div>
              <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.32em', color: '#1e293b', marginBottom: '16px', fontFamily: "'Poppins', sans-serif" }}>Connect</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <FooterLink href="mailto:hello@smartmoses.com">hello@smartmoses.com</FooterLink>
                <a href="#contact" style={{ fontSize: '12px', color: 'rgba(255,122,24,0.65)', textDecoration: 'none', fontFamily: "'Poppins', sans-serif", transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = C.orange}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,122,24,0.65)'}>
                  Start a project →
                </a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px' }}>
          <p style={{ fontSize: '10px', color: '#1e293b', fontFamily: "'Poppins', sans-serif" }}>© {new Date().getFullYear()} Smart Moses. All rights reserved.</p>
          <p style={{ fontSize: '10px', color: '#1e293b', fontFamily: "'Poppins', sans-serif" }}>Creative Technologist</p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ fontSize: '12px', color: hov ? '#fff' : '#475569', textDecoration: 'none', fontFamily: "'Poppins', sans-serif", transition: 'color 0.2s', wordBreak: 'break-all' }}>
      {children}
    </a>
  )
}

/* ═══════════════════════
   ROOT
═══════════════════════ */
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Poppins:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        body {
          background: #050508;
          color: #94a3b8;
          font-family: 'Poppins', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }

        /* Subtle film grain */
        body::before {
          content: '';
          position: fixed; inset: 0;
          pointer-events: none; z-index: 9999;
          opacity: 0.018;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        img { max-width: 100%; display: block; }
        a { text-decoration: none; }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,122,24,0.28); border-radius: 2px; }
        ::selection { background: rgba(255,122,24,0.2); color: #fff; }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        /* ── Layout helpers ── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr 400px; gap: 80px; }
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .two-col { grid-template-columns: 340px 1fr; gap: 64px; }
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
          .testimonials-grid { grid-template-columns: 1.4fr 1fr; }
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
          .project-grid { grid-template-columns: 1.2fr 0.8fr; }
        }

        .project-visual-col {
          border-top: 1px solid rgba(255,255,255,0.06);
          border-left: none;
        }
        @media (min-width: 1024px) {
          .project-visual-col {
            border-top: none !important;
            border-left: 1px solid rgba(255,255,255,0.06) !important;
          }
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
          .sticky-col { position: sticky; top: 108px; }
        }

        /* Nav responsive */
        .nav-desktop { display: flex; align-items: center; gap: 4px; }
        .nav-hamburger { display: none !important; }

        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>

      <div style={{ position: 'relative', minHeight: '100vh', background: '#050508' }}>
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