import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'

/* ═══════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════ */
const T = {
  bg:          '#03030A',
  surface:     '#070710',
  surfaceUp:   '#0C0C1A',
  border:      'rgba(255,255,255,0.06)',
  borderHov:   'rgba(255,255,255,0.13)',
  orange:      '#FF6B1A',
  orangeHot:   '#FF4500',
  orangeLight: '#FFB347',
  gold:        '#D4A853',
  sky:         '#22D3EE',
  violet:      '#818CF8',
  white:       '#F9FAFB',
  muted:       '#94A3B8',
  dim:         '#3B4A5C',
  text:        '#E2E8F0',
}

const gradFire  = `linear-gradient(130deg, ${T.orangeHot}, ${T.orange}, ${T.orangeLight})`
const gradGold  = `linear-gradient(130deg, ${T.gold}, ${T.orangeLight})`
const ease      = [0.22, 1, 0.36, 1]
const FONT_H    = "'Syne', sans-serif"
const FONT_B    = "'DM Sans', sans-serif"

/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const NAV_LINKS = ['About', 'Services', 'Work', 'Process']

const SERVICES = [
  {
    idx: '01',
    title: 'Web Design & Development',
    body: 'Polished digital destinations built with precision — from brand strategy to pixel-perfect execution. Premium feel, scalable structure.',
    tag: 'Experience-first design',
    accent: T.sky,
    icon: '⬡',
  },
  {
    idx: '02',
    title: 'Brand & Visual Identity',
    body: 'Visual systems that build trust, signal authority, and communicate your unique voice across every touchpoint.',
    tag: 'Cinematic brand direction',
    accent: T.orange,
    icon: '◈',
  },
  {
    idx: '03',
    title: 'Video & Motion Content',
    body: 'Short-form storytelling and motion graphics that amplify your message and accelerate emotional connection.',
    tag: 'Strategic content systems',
    accent: T.violet,
    icon: '◎',
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
    accent: T.sky,
    num: '01',
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
    accent: T.orange,
    num: '02',
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
    accent: T.violet,
    num: '03',
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

const STATS = [
  { val: '+42%', label: 'Lead Growth' },
  { val: '2×',   label: 'Brand Clarity' },
  { val: '3yr+', label: 'Experience' },
  { val: '100%', label: 'Client Satisfaction' },
]

/* ═══════════════════════════════════════
   SHARED ANIMATION HELPERS
═══════════════════════════════════════ */
const fadeUp = (delay = 0, distance = 40) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.08 },
  transition: { duration: 0.85, ease, delay },
})

/* ═══════════════════════════════════════
   CURSOR GLOW
═══════════════════════════════════════ */
function CursorGlow() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { damping: 20, stiffness: 180 })
  const sy = useSpring(y, { damping: 20, stiffness: 180 })

  useEffect(() => {
    const move = e => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <motion.div
      style={{
        position: 'fixed', top: 0, left: 0, pointerEvents: 'none',
        zIndex: 9998, width: 520, height: 520,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,26,0.055) 0%, transparent 70%)',
        x: sx, y: sy, translateX: '-50%', translateY: '-50%',
      }}
    />
  )
}

/* ═══════════════════════════════════════
   SECTION LABEL
═══════════════════════════════════════ */
function Chip({ children, accent }) {
  const col = accent ? T.orange : T.sky
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24,
      padding: '6px 14px', borderRadius: 99, border: `1px solid ${col}30`,
      background: `${col}0A` }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: col, flexShrink: 0 }} />
      <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.38em',
        color: `${col}CC`, fontFamily: FONT_B, fontWeight: 600 }}>
        {children}
      </span>
    </div>
  )
}

/* ═══════════════════════════════════════
   BUTTONS
═══════════════════════════════════════ */
function FireBtn({ href, children, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 9,
        borderRadius: 12, padding: '14px 28px',
        background: gradFire,
        color: '#0A0005',
        fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
        textTransform: 'uppercase',
        fontFamily: FONT_B, textDecoration: 'none', flexShrink: 0,
        boxShadow: hov
          ? '0 0 48px rgba(255,80,0,0.45), 0 0 16px rgba(255,80,0,0.2)'
          : '0 0 0px rgba(0,0,0,0)',
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'box-shadow 0.3s, transform 0.3s',
      }}>
      {children}
      <span style={{ fontSize: 16, lineHeight: 1 }}>→</span>
    </a>
  )
}

function GhostBtn({ href, children }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        borderRadius: 12, padding: '14px 28px',
        border: `1px solid ${hov ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.09)'}`,
        background: hov ? 'rgba(255,255,255,0.055)' : 'transparent',
        color: hov ? T.white : T.muted,
        fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
        textTransform: 'uppercase',
        fontFamily: FONT_B, textDecoration: 'none', flexShrink: 0,
        transition: 'all 0.25s',
      }}>
      {children}
    </a>
  )
}

/* ═══════════════════════════════════════
   NAV
═══════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease }}
      style={{
        position: 'fixed', top: 16, left: 0, right: 0,
        zIndex: 9000,
        display: 'flex', justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div style={{
        pointerEvents: 'all',
        width: 'calc(100% - 32px)', maxWidth: 1100,
        background: scrolled ? 'rgba(3,3,10,0.88)' : 'rgba(3,3,10,0.4)',
        border: `1px solid ${scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)'}`,
        borderRadius: 18,
        backdropFilter: 'blur(28px) saturate(1.6)',
        boxShadow: scrolled ? '0 32px 80px rgba(0,0,0,0.65)' : 'none',
        transition: 'background 0.45s, border-color 0.45s, box-shadow 0.45s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 22px' }}>
          {/* Logo */}
          <a href="#" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: gradFire, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 13, color: '#0A0005', fontWeight: 900, fontFamily: FONT_H }}>SM</span>
              </div>
              <div>
                <p style={{ fontFamily: FONT_H, fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', color: T.white, lineHeight: 1 }}>Smart Moses</p>
                <p style={{ fontSize: 8, color: T.dim, letterSpacing: '0.26em', textTransform: 'uppercase', marginTop: 2, fontFamily: FONT_B }}>Creative Technologist</p>
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="nav-desktop">
            {NAV_LINKS.map(link => <NavLink key={link} href={`#${link.toLowerCase()}`}>{link}</NavLink>)}
            <div style={{ marginLeft: 12 }}>
              <FireBtn href="#contact">Let's Talk</FireBtn>
            </div>
          </nav>

          {/* Hamburger */}
          <button onClick={() => setOpen(o => !o)} className="hamburger"
            aria-label="Toggle menu"
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '8px 10px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                height: 1.5, width: 22, background: 'rgba(255,255,255,0.7)', display: 'block', borderRadius: 2,
                transform: open ? (i === 0 ? 'rotate(45deg) translate(4.5px,4.5px)' : i === 2 ? 'rotate(-45deg) translate(4.5px,-4.5px)' : 'none') : 'none',
                opacity: open && i === 1 ? 0 : 1,
                transition: 'transform 0.3s, opacity 0.25s',
              }} />
            ))}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="mob"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease }}
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}
            >
              <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {NAV_LINKS.map(link => (
                  <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}
                    style={{ padding: '10px 0', fontSize: 13, color: T.text, textDecoration: 'none', fontFamily: FONT_B, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    {link}
                  </a>
                ))}
                <div style={{ marginTop: 16 }}>
                  <FireBtn href="#contact" onClick={() => setOpen(false)}>Let's Talk</FireBtn>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

function NavLink({ href, children }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: '8px 15px', fontSize: 11, letterSpacing: '0.05em', textTransform: 'uppercase',
        color: hov ? T.white : T.muted, textDecoration: 'none',
        borderRadius: 9, fontFamily: FONT_B, fontWeight: 600,
        background: hov ? 'rgba(255,255,255,0.055)' : 'transparent',
        transition: 'color 0.2s, background 0.2s',
      }}>
      {children}
    </a>
  )
}

/* ═══════════════════════════════════════
   HERO
═══════════════════════════════════════ */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const fadeOut   = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 120, paddingBottom: 80, overflow: 'hidden' }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Gradient orbs */}
        <div style={{ position: 'absolute', top: '-20%', left: '-5%', width: 700, height: 700, borderRadius: '50%', background: 'rgba(255,80,0,0.07)', filter: 'blur(140px)' }} />
        <div style={{ position: 'absolute', top: '10%', right: '-10%', width: 550, height: 550, borderRadius: '50%', background: 'rgba(34,211,238,0.06)', filter: 'blur(120px)' }} />
        <div style={{ position: 'absolute', bottom: '-5%', left: '40%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(129,140,248,0.05)', filter: 'blur(90px)' }} />
        {/* Fine grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.014) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.014) 1px,transparent 1px)', backgroundSize: '72px 72px', maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)' }} />
        {/* Horizontal rule accent */}
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,107,26,0.12),transparent)', pointerEvents: 'none' }} />
      </div>

      <motion.div style={{ y: yParallax, opacity: fadeOut, position: 'relative', zIndex: 10, width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div className="hero-grid">
          {/* LEFT */}
          <div>
            <motion.div {...fadeUp(0.1)} style={{ marginBottom: 32 }}>
              <Chip>Creative partner for premium digital brands</Chip>
            </motion.div>

            <motion.div {...fadeUp(0.22)} style={{ marginBottom: 28 }}>
              <h1 style={{ fontFamily: FONT_H, fontSize: 'clamp(3rem,8vw,6rem)', lineHeight: 0.92, letterSpacing: '-0.04em', color: T.white }}>
                Crafting<br />
                <span style={{ background: gradFire, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  cinematic
                </span>
                <br />
                <span style={{ color: 'rgba(255,255,255,0.35)' }}>digital brands.</span>
              </h1>
            </motion.div>

            <motion.p {...fadeUp(0.36)} style={{ fontSize: 'clamp(13px,1.5vw,15px)', lineHeight: 1.85, color: T.muted, maxWidth: 480, marginBottom: 40, fontFamily: FONT_B }}>
              I help founders, studios, and startups move beyond generic developer websites — with premium storytelling, polished UX, and brand direction that builds trust and converts.
            </motion.p>

            <motion.div {...fadeUp(0.46)} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 56 }}>
              <FireBtn href="#contact">Start a project</FireBtn>
              <GhostBtn href="#work">View case studies</GhostBtn>
            </motion.div>

            {/* Stat row */}
            <motion.div {...fadeUp(0.56)} style={{ display: 'flex', flexWrap: 'wrap', gap: 0, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 32 }}>
              {STATS.map((s, i) => (
                <div key={s.val} style={{ paddingRight: 32, marginRight: 32, borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', marginBottom: 16 }}>
                  <p style={{ fontFamily: FONT_H, fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: T.white, lineHeight: 1 }}>{s.val}</p>
                  <p style={{ fontSize: 9, color: T.dim, textTransform: 'uppercase', letterSpacing: '0.22em', marginTop: 5, fontFamily: FONT_B }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease }}
            style={{ position: 'relative' }}
          >
            {/* Halo glow */}
            <div style={{ position: 'absolute', inset: -24, borderRadius: '2.4rem', background: 'linear-gradient(135deg,rgba(255,80,0,0.14),rgba(34,211,238,0.07),rgba(129,140,248,0.06))', filter: 'blur(32px)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', borderRadius: 28, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.09)', background: T.surface, boxShadow: '0 80px 160px rgba(0,0,0,0.75)' }}>
              {/* Image area */}
              <div style={{ position: 'relative', height: 'clamp(220px,34vw,320px)', overflow: 'hidden', background: '#08081A' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 10, background: 'linear-gradient(to bottom, transparent 45%, #070710 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, zIndex: 9, background: 'linear-gradient(130deg, rgba(255,80,0,0.1), transparent 55%)' }} />
                {/* Placeholder gradient as image bg */}
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(160deg, #0D0D20 0%, #141430 50%, #0A0A18 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(255,80,0,0.25),rgba(34,211,238,0.15))', border: '1px solid rgba(255,255,255,0.1)' }} />
                </div>
                {/* Try to load real image */}
                <img src="/images/me.jpeg" alt="Smart Moses" onError={e => e.target.style.display='none'} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', zIndex: 8 }} />
              </div>

              {/* Card body */}
              <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Name badge */}
                <div style={{ padding: '14px 18px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontFamily: FONT_H, fontSize: 15, fontWeight: 700, color: T.white, lineHeight: 1.2 }}>Smart Moses</p>
                    <p style={{ fontSize: 9, color: T.dim, textTransform: 'uppercase', letterSpacing: '0.24em', marginTop: 4, fontFamily: FONT_B }}>Creative Technologist</p>
                  </div>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: gradFire, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 11, color: '#0A0005', fontWeight: 900, fontFamily: FONT_H }}>SM</span>
                  </div>
                </div>

                {/* Metrics row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[{ val: '+42%', label: 'Lead Growth', accent: T.orange }, { val: '3yr+', label: 'Experience', accent: T.sky }].map(s => (
                    <div key={s.val} style={{ padding: '16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, right: 0, width: 60, height: 60, borderRadius: '50%', background: `${s.accent}12`, filter: 'blur(20px)', pointerEvents: 'none' }} />
                      <p style={{ fontFamily: FONT_H, fontSize: '1.5rem', fontWeight: 800, color: T.white, lineHeight: 1 }}>{s.val}</p>
                      <p style={{ fontSize: 9, color: T.dim, marginTop: 5, fontFamily: FONT_B, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Focus */}
                <div style={{ padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
                  <p style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.34em', color: `${T.orange}80`, marginBottom: 5, fontFamily: FONT_B }}>Current Focus</p>
                  <p style={{ fontSize: 11, color: T.text, lineHeight: 1.7, fontFamily: FONT_B }}>Building premium digital experiences for ambitious founders and studios.</p>
                </div>
              </div>
            </div>

            {/* Floating availability badge */}
            <motion.div
              initial={{ opacity: 0, x: 16, y: -8 }} animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 1.15, ease }}
              style={{
                position: 'absolute', top: -14, right: -14,
                padding: '10px 16px', borderRadius: 14,
                border: '1px solid rgba(255,107,26,0.22)',
                background: 'rgba(3,3,10,0.96)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,107,26,0.08)',
              }}
            >
              <p style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.22em', color: `${T.orange}88`, fontFamily: FONT_B }}>Available</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 5 }}>
                <span style={{ height: 7, width: 7, borderRadius: '50%', background: '#34D399', flexShrink: 0, animation: 'pulse 2s infinite' }} />
                <p style={{ fontSize: 11, color: T.white, fontWeight: 600, fontFamily: FONT_B }}>For new projects</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════
   ABOUT
═══════════════════════════════════════ */
function About() {
  return (
    <section id="about" style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div className="two-col">
          <motion.div {...fadeUp()}>
            <Chip>About the practice</Chip>
            <h2 style={{ fontFamily: FONT_H, fontSize: 'clamp(1.8rem,3.5vw,3rem)', lineHeight: 1.02, letterSpacing: '-0.035em', color: T.white, marginBottom: 22 }}>
              I turn ambitious brands into digital experiences with clarity, craft, and lasting impact.
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.9, color: T.muted, maxWidth: 440, marginBottom: 36, fontFamily: FONT_B }}>
              This isn't about developer portfolios or generic layouts. It's about calm, memorable systems that help brands feel more premium, more persuasive, and more present.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Focus', body: 'Digital products and brand systems for founders, studios, and premium service businesses.' },
                { label: 'Approach', body: 'Clear storytelling, strong visual rhythm, and deliberate interaction design that improve trust and conversion.' },
              ].map(item => (
                <div key={item.label} style={{ padding: '18px 20px', borderRadius: 14, border: `1px solid ${T.border}`, background: 'rgba(255,255,255,0.018)' }}>
                  <p style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.34em', color: `${T.sky}77`, marginBottom: 6, fontFamily: FONT_B }}>{item.label}</p>
                  <p style={{ fontSize: 12, color: T.text, lineHeight: 1.78, fontFamily: FONT_B }}>{item.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.12)} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ padding: 32, borderRadius: 22, border: `1px solid ${T.border}`, background: T.surface, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,107,26,0.06)', filter: 'blur(70px)', pointerEvents: 'none' }} />
              <p style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.34em', color: `${T.orange}66`, marginBottom: 18, fontFamily: FONT_B }}>Why it works</p>
              <p style={{ fontSize: 13, color: T.text, lineHeight: 1.85, marginBottom: 22, fontFamily: FONT_B }}>Brand-first strategy combined with polished digital craftsmanship — so every screen feels intentional and aligned.</p>
              {['Calm layouts with premium breathing room.', 'Clear storytelling that removes friction.', 'Cinematic design language built for trust.'].map((pt, i) => (
                <div key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                  <span style={{ marginTop: 7, height: 4, width: 4, borderRadius: '50%', background: T.orange, flexShrink: 0, boxShadow: `0 0 8px ${T.orange}` }} />
                  <p style={{ fontSize: 12, color: T.text, fontFamily: FONT_B, lineHeight: 1.7 }}>{pt}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[{ val: '+42%', label: 'Qualified lead growth' }, { val: '2×', label: 'Faster brand clarity' }].map(s => (
                <div key={s.val} style={{ padding: '24px', borderRadius: 16, border: `1px solid ${T.border}`, background: T.surface, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', bottom: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,107,26,0.07)', filter: 'blur(30px)' }} />
                  <p style={{ fontFamily: FONT_H, fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: T.white, marginBottom: 5 }}>{s.val}</p>
                  <p style={{ fontSize: 9, color: T.dim, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: FONT_B }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   SERVICES
═══════════════════════════════════════ */
function Services() {
  const [active, setActive] = useState(null)
  return (
    <section id="services" style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div className="two-col">
          <motion.div {...fadeUp()} className="sticky-col">
            <Chip accent>What Gets Built</Chip>
            <h2 style={{ fontFamily: FONT_H, fontSize: 'clamp(1.6rem,3vw,2.6rem)', lineHeight: 1.04, letterSpacing: '-0.03em', color: T.white, marginBottom: 16 }}>
              Design systems, digital products, and motion-led stories.
            </h2>
            <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.85, fontFamily: FONT_B, maxWidth: 300 }}>
              Experiences that look polished, feel effortless, and create a confident digital presence with every scroll.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {SERVICES.map((svc, i) => (
              <motion.article key={svc.title} {...fadeUp(i * 0.09)}
                onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
                style={{
                  padding: '28px 30px', borderRadius: 20, cursor: 'default', position: 'relative', overflow: 'hidden',
                  border: `1px solid ${active === i ? T.borderHov : T.border}`,
                  background: active === i
                    ? `radial-gradient(ellipse at top right, ${svc.accent}0A, transparent 60%), ${T.surface}`
                    : T.surface,
                  transition: 'border-color 0.3s, background 0.3s',
                }}>
                {/* Accent line */}
                <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 2, borderRadius: 2,
                  background: active === i ? svc.accent : 'transparent', transition: 'background 0.3s' }} />
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
                  <div>
                    <p style={{ fontFamily: FONT_H, fontSize: 24, color: active === i ? svc.accent : 'rgba(255,255,255,0.1)', lineHeight: 1, transition: 'color 0.3s', marginBottom: 4 }}>{svc.icon}</p>
                    <p style={{ fontSize: 8, fontFamily: 'monospace', color: 'rgba(255,255,255,0.12)' }}>{svc.idx}</p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                      <h3 style={{ fontFamily: FONT_H, fontSize: 'clamp(1rem,1.8vw,1.15rem)', fontWeight: 700, color: T.white, lineHeight: 1.3 }}>{svc.title}</h3>
                      <motion.span animate={{ opacity: active === i ? 1 : 0.12, color: active === i ? svc.accent : T.muted }} transition={{ duration: 0.22 }}
                        style={{ fontSize: 16, flexShrink: 0 }}>↗</motion.span>
                    </div>
                    <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.82, marginBottom: 16, fontFamily: FONT_B }}>{svc.body}</p>
                    <span style={{ display: 'inline-block', padding: '7px 14px', borderRadius: 8, background: `${svc.accent}0D`, border: `1px solid ${svc.accent}20`, fontSize: 10, color: `${svc.accent}CC`, fontFamily: FONT_B, letterSpacing: '0.04em' }}>{svc.tag}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   WORK
═══════════════════════════════════════ */
function Work() {
  return (
    <section id="work" style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <motion.div {...fadeUp()} style={{ marginBottom: 60, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <div>
            <Chip>Selected Case Studies</Chip>
            <h2 style={{ fontFamily: FONT_H, fontSize: 'clamp(1.8rem,3.5vw,3rem)', lineHeight: 1.02, letterSpacing: '-0.035em', color: T.white, maxWidth: 560 }}>
              Projects designed to feel premium, purposeful, and memorable.
            </h2>
          </div>
          <GhostBtn href="#contact">Start a project</GhostBtn>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ p, i }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.article {...fadeUp(i * 0.09)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 26, overflow: 'hidden', position: 'relative',
        border: `1px solid ${hov ? T.borderHov : T.border}`,
        background: T.surface,
        transition: 'border-color 0.4s, box-shadow 0.4s',
        boxShadow: hov ? `0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px ${p.accent}18` : '0 0 0 rgba(0,0,0,0)',
      }}>
      {/* Top accent line */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${p.accent}, transparent)`, opacity: hov ? 1 : 0, transition: 'opacity 0.4s' }} />

      <div className="project-grid">
        {/* Content */}
        <div style={{ padding: 'clamp(24px,4vw,48px)', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
            <span style={{ padding: '5px 13px', borderRadius: 99, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.28em', border: `1px solid ${p.accent}28`, color: `${p.accent}BB`, background: `${p.accent}0C`, fontFamily: FONT_B }}>{p.label}</span>
            <span style={{ fontSize: 9, color: T.dim, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: FONT_B }}>{p.role}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <span style={{ fontFamily: FONT_H, fontSize: 'clamp(3rem,5vw,4rem)', fontWeight: 900, color: `${p.accent}12`, lineHeight: 1, flexShrink: 0 }}>{p.num}</span>
            <h3 style={{ fontFamily: FONT_H, fontSize: 'clamp(1.4rem,2.8vw,2.2rem)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.03em', color: T.white }}>{p.title}</h3>
          </div>

          <p style={{ fontSize: 13, color: T.text, lineHeight: 1.88, maxWidth: 420, fontFamily: FONT_B }}>{p.overview}</p>

          <div className="two-col-sm">
            {[{ label: 'Challenge', body: p.challenge }, { label: 'Solution', body: p.solution }].map(item => (
              <div key={item.label} style={{ padding: '16px 18px', borderRadius: 14, border: `1px solid rgba(255,255,255,0.05)`, background: 'rgba(0,0,0,0.25)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: `${p.accent}40`, borderRadius: '0 2px 2px 0' }} />
                <p style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.28em', color: `${p.accent}88`, marginBottom: 8, fontFamily: FONT_B }}>{item.label}</p>
                <p style={{ fontSize: 11, color: T.muted, lineHeight: 1.78, fontFamily: FONT_B }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div style={{ padding: '16px 18px', borderRadius: 14, border: `1px solid rgba(255,255,255,0.05)`, background: 'rgba(0,0,0,0.22)' }}>
            <p style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.28em', color: T.muted, marginBottom: 7, fontFamily: FONT_B }}>Outcome</p>
            <p style={{ fontSize: 12, fontWeight: 600, color: T.white, fontFamily: FONT_B, lineHeight: 1.6 }}>{p.outcome}</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {p.tools.map(t => (
              <span key={t} style={{ fontSize: 9, padding: '5px 12px', borderRadius: 99, border: `1px solid ${T.border}`, color: T.muted, fontFamily: FONT_B }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Visual mockup column */}
        <div className="project-visual-col" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Browser */}
          <div style={{ flex: 1, borderRadius: 16, overflow: 'hidden', border: `1px solid ${T.border}`, background: '#050510', position: 'relative', minHeight: 180 }}>
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 30% 20%, ${p.accent}14, transparent 65%)`, pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '9px 14px', borderBottom: `1px solid ${T.border}` }}>
              {['rgba(239,68,68,0.4)', 'rgba(251,191,36,0.4)', 'rgba(52,211,153,0.4)'].map((bg, j) => (
                <span key={j} style={{ height: 7, width: 7, borderRadius: '50%', background: bg }} />
              ))}
              <span style={{ flex: 1, height: 13, borderRadius: 6, background: 'rgba(255,255,255,0.03)', marginLeft: 8 }} />
            </div>
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ height: 2, width: '50%', borderRadius: 4, background: `${p.accent}40` }} />
              <div style={{ height: 16, width: '70%', borderRadius: 5, background: 'rgba(255,255,255,0.04)' }} />
              <div style={{ height: 9, width: '100%', borderRadius: 4, background: 'rgba(255,255,255,0.025)' }} />
              <div style={{ height: 9, width: '82%', borderRadius: 4, background: 'rgba(255,255,255,0.025)' }} />
              <div style={{ height: 56, width: '100%', borderRadius: 12, background: `${p.accent}0A`, border: `1px solid ${p.accent}18`, marginTop: 8 }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 6 }}>
                <div style={{ height: 30, borderRadius: 8, background: `${p.accent}1A` }} />
                <div style={{ height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.025)' }} />
              </div>
            </div>
          </div>

          {/* Bar chart */}
          <div style={{ height: 80, borderRadius: 14, padding: '12px 14px', border: `1px solid ${T.border}`, background: '#050510', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 80% 50%, ${p.accent}0F, transparent 55%)`, pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: '100%', position: 'relative' }}>
              {[40,60,45,75,55,80,90,65,85,95].map((h, j) => (
                <motion.div key={j}
                  initial={{ height: 0 }} whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: j * 0.045, ease }}
                  style={{ flex: 1, borderRadius: 3, background: `linear-gradient(to top, ${p.accent}55, ${p.accent}22)` }} />
              ))}
            </div>
          </div>

          {/* Metric tile */}
          <div style={{ padding: '16px 18px', borderRadius: 14, border: `1px solid ${p.accent}20`, background: `${p.accent}07`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.28em', color: `${p.accent}88`, marginBottom: 4, fontFamily: FONT_B }}>Result</p>
              <p style={{ fontFamily: FONT_H, fontSize: 22, fontWeight: 800, color: T.white, lineHeight: 1 }}>{i === 0 ? '+42%' : i === 1 ? '×2.3' : '98%'}</p>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 10, border: `1px solid ${p.accent}30`, background: `${p.accent}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
              {i === 0 ? '↑' : i === 1 ? '▶' : '✓'}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

/* ═══════════════════════════════════════
   WHY
═══════════════════════════════════════ */
function Why() {
  return (
    <section style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div className="two-col">
          <motion.div {...fadeUp()}>
            <Chip>Why Work With Me</Chip>
            <h2 style={{ fontFamily: FONT_H, fontSize: 'clamp(1.6rem,3vw,2.6rem)', lineHeight: 1.04, letterSpacing: '-0.03em', color: T.white }}>
              A premium, trust-building approach grounded in strategy.
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
            {WHY.map((pt, i) => (
              <WhyCard key={pt.title} pt={pt} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function WhyCard({ pt, i }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div {...fadeUp(i * 0.08)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding: '24px 22px', borderRadius: 18, border: `1px solid ${hov ? T.borderHov : T.border}`, background: hov ? T.surfaceUp : T.surface, transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: -30, right: -20, fontFamily: FONT_H, fontSize: 80, fontWeight: 900, color: 'rgba(255,255,255,0.02)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>{pt.num}</div>
      <p style={{ fontSize: 8, fontFamily: 'monospace', color: i % 2 === 0 ? `${T.sky}55` : `${T.orange}55`, marginBottom: 16 }}>{pt.num}</p>
      <h3 style={{ fontFamily: FONT_H, fontSize: 14, fontWeight: 700, color: T.white, marginBottom: 10 }}>{pt.title}</h3>
      <p style={{ fontSize: 11, color: T.muted, lineHeight: 1.78, fontFamily: FONT_B }}>{pt.body}</p>
    </motion.div>
  )
}

/* ═══════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════ */
function Testimonials() {
  return (
    <section style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <motion.div {...fadeUp()} style={{ marginBottom: 52 }}>
          <Chip accent>Testimonials</Chip>
          <h2 style={{ fontFamily: FONT_H, fontSize: 'clamp(1.6rem,3vw,2.6rem)', lineHeight: 1.04, letterSpacing: '-0.03em', color: T.white, maxWidth: 500 }}>
            Trusted by founders who demand digital work with confidence.
          </h2>
        </motion.div>

        <div className="testimonials-grid">
          {/* Featured */}
          <motion.div {...fadeUp()} style={{ padding: 40, borderRadius: 26, border: `1px solid ${T.border}`, background: T.surface, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,80,0,0.06)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <p style={{ fontFamily: FONT_H, fontSize: 64, fontWeight: 900, lineHeight: 1, marginBottom: 20, background: gradFire, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>"</p>
              <p style={{ fontSize: 'clamp(14px,1.4vw,17px)', lineHeight: 1.82, color: T.text, marginBottom: 32, fontFamily: FONT_B, fontWeight: 300 }}>{TESTIMONIALS[0].quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ height: 44, width: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, background: 'rgba(255,107,26,0.12)', color: T.orange, flexShrink: 0, fontFamily: FONT_H, border: '1px solid rgba(255,107,26,0.2)' }}>
                  {TESTIMONIALS[0].initial}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: T.white, fontFamily: FONT_H }}>{TESTIMONIALS[0].name}</p>
                  <p style={{ fontSize: 11, color: T.muted, fontFamily: FONT_B, marginTop: 2 }}>{TESTIMONIALS[0].role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {TESTIMONIALS.slice(1).map((item, i) => (
              <motion.div key={item.name} {...fadeUp(i * 0.1)}
                style={{ padding: 26, borderRadius: 22, border: `1px solid ${T.border}`, background: T.surface }}>
                <p style={{ fontSize: 13, lineHeight: 1.82, color: T.text, marginBottom: 20, fontFamily: FONT_B, fontWeight: 300 }}>"{item.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <div style={{ height: 36, width: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, background: 'rgba(34,211,238,0.1)', color: T.sky, flexShrink: 0, fontFamily: FONT_H, border: '1px solid rgba(34,211,238,0.18)' }}>
                    {item.initial}
                  </div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: T.white, fontFamily: FONT_H }}>{item.name}</p>
                    <p style={{ fontSize: 10, color: T.muted, fontFamily: FONT_B, marginTop: 2 }}>{item.role}</p>
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

/* ═══════════════════════════════════════
   PROCESS
═══════════════════════════════════════ */
function Process() {
  return (
    <section id="process" style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <motion.div {...fadeUp()} style={{ marginBottom: 60 }}>
          <Chip>Process</Chip>
          <h2 style={{ fontFamily: FONT_H, fontSize: 'clamp(1.6rem,3vw,2.6rem)', lineHeight: 1.04, letterSpacing: '-0.03em', color: T.white, maxWidth: 480, marginBottom: 14 }}>
            A carefully designed journey from direction to launch.
          </h2>
          <p style={{ fontSize: 13, color: T.muted, maxWidth: 400, lineHeight: 1.88, fontFamily: FONT_B }}>
            Every project follows a clear, deliberate flow that keeps brand voice consistent and delivery polished.
          </p>
        </motion.div>

        {/* Connected steps */}
        <div className="process-grid">
          {PROCESS.map((step, i) => (
            <motion.div key={step.num} {...fadeUp(i * 0.09)}
              style={{ position: 'relative', padding: '28px 24px', borderRadius: 20, border: `1px solid ${T.border}`, background: T.surface, overflow: 'hidden' }}>
              {/* Connector line (not on last) */}
              {i < PROCESS.length - 1 && (
                <div className="connector-line" />
              )}
              <div style={{ position: 'absolute', bottom: -10, right: -8, fontFamily: FONT_H, fontSize: 72, fontWeight: 900, color: 'rgba(255,255,255,0.025)', lineHeight: 1, pointerEvents: 'none' }}>{step.num}</div>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: i % 2 === 1 ? 'rgba(255,107,26,0.1)' : 'rgba(34,211,238,0.08)', border: `1px solid ${i % 2 === 1 ? T.orange : T.sky}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <p style={{ fontSize: 9, fontFamily: 'monospace', color: i % 2 === 1 ? `${T.orange}88` : `${T.sky}77` }}>{step.num}</p>
              </div>
              <h3 style={{ fontFamily: FONT_H, fontSize: 14, fontWeight: 700, color: T.white, marginBottom: 10 }}>{step.title}</h3>
              <p style={{ fontSize: 11, color: T.muted, lineHeight: 1.78, fontFamily: FONT_B }}>{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   CTA
═══════════════════════════════════════ */
function CTA() {
  return (
    <section id="contact" style={{ padding: '64px 24px 100px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div {...fadeUp()}
          style={{ position: 'relative', borderRadius: 32, overflow: 'hidden', padding: 'clamp(40px,6vw,80px)', border: '1px solid rgba(255,107,26,0.14)', background: T.surface }}>
          {/* Atmosphere */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-25%', left: '-8%', width: 560, height: 560, borderRadius: '50%', background: 'rgba(255,80,0,0.09)', filter: 'blur(130px)' }} />
            <div style={{ position: 'absolute', bottom: '-20%', right: '-8%', width: 380, height: 380, borderRadius: '50%', background: 'rgba(34,211,238,0.06)', filter: 'blur(110px)' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)' }} />
          </div>

          <div className="cta-grid">
            <div style={{ position: 'relative' }}>
              <Chip accent>Start Here</Chip>
              <h2 style={{ fontFamily: FONT_H, fontSize: 'clamp(2rem,5vw,3.8rem)', lineHeight: 0.96, letterSpacing: '-0.04em', color: T.white, marginBottom: 22 }}>
                Let's build something that feels{' '}
                <span style={{ background: gradFire, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  cinematic
                </span>
                {' '}and converts.
              </h2>
              <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.88, maxWidth: 420, fontFamily: FONT_B }}>
                If you want a website that communicates brand authority, feels intentional, and converts with confidence — this is where it starts.
              </p>
            </div>

            <div style={{ padding: 30, borderRadius: 22, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.32)', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', gap: 20, position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ height: 7, width: 7, borderRadius: '50%', background: '#34D399', flexShrink: 0, animation: 'pulse 2s infinite' }} />
                <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.3em', color: T.muted, fontFamily: FONT_B }}>Available for new projects</p>
              </div>

              {[{ label: 'Response time', value: '< 24 hours' }, { label: 'Project types', value: 'Web, Brand, Motion' }, { label: 'Availability', value: 'Limited slots' }].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontSize: 11, color: T.dim, fontFamily: FONT_B }}>{row.label}</p>
                  <p style={{ fontSize: 11, color: T.text, fontFamily: FONT_B, fontWeight: 600 }}>{row.value}</p>
                </div>
              ))}

              <FireBtn href="mailto:hello@smartmoses.com">Send a project brief</FireBtn>
              <p style={{ fontSize: 9, color: T.dim, textAlign: 'center', fontFamily: FONT_B }}>Include your brand focus, timeline, and audience.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '56px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="footer-grid" style={{ marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: gradFire, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 9, color: '#0A0005', fontWeight: 900, fontFamily: FONT_H }}>SM</span>
              </div>
              <p style={{ fontFamily: FONT_H, fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>Smart Moses</p>
            </div>
            <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.85, maxWidth: 300, fontFamily: FONT_B }}>
              Creative Technologist & Digital Brand Builder — building modern digital experiences through design, development, and visual storytelling.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div>
              <p style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.34em', color: T.muted, marginBottom: 18, fontFamily: FONT_B }}>Navigate</p>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {NAV_LINKS.map(link => <FooterLink key={link} href={`#${link.toLowerCase()}`}>{link}</FooterLink>)}
              </nav>
            </div>
            <div>
              <p style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.34em', color: T.muted, marginBottom: 18, fontFamily: FONT_B }}>Connect</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                <FooterLink href="mailto:hello@smartmoses.com">hello@smartmoses.com</FooterLink>
                <a href="#contact" style={{ fontSize: 12, color: `${T.orange}88`, textDecoration: 'none', fontFamily: FONT_B, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = T.orange}
                  onMouseLeave={e => e.currentTarget.style.color = `${T.orange}88`}>
                  Start a project →
                </a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8 }}>
          <p style={{ fontSize: 10, color: T.dim, fontFamily: FONT_B }}>© {new Date().getFullYear()} Smart Moses. All rights reserved.</p>
          <p style={{ fontSize: 10, color: T.dim, fontFamily: FONT_B }}>Creative Technologist · Built with precision</p>
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
      style={{ fontSize: 12, color: hov ? T.white : T.muted, textDecoration: 'none', fontFamily: FONT_B, transition: 'color 0.2s', wordBreak: 'break-all' }}>
      {children}
    </a>
  )
}

/* ═══════════════════════════════════════
   ROOT
═══════════════════════════════════════ */
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        body {
          background: #03030A;
          color: #E2E8F0;
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }

        /* Film grain overlay */
        body::after {
          content: '';
          position: fixed; inset: 0;
          pointer-events: none; z-index: 9999;
          opacity: 0.022;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        img { max-width: 100%; display: block; }
        a { text-decoration: none; }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,107,26,0.3); border-radius: 2px; }
        ::selection { background: rgba(255,107,26,0.22); color: #fff; }

        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(52,211,153,0.4); }
          50% { opacity: 0.6; box-shadow: 0 0 0 5px rgba(52,211,153,0); }
        }

        /* ── LAYOUT ── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr 400px; gap: 88px; }
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .two-col { grid-template-columns: 340px 1fr; gap: 72px; }
        }

        .two-col-sm {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }
        @media (min-width: 600px) {
          .two-col-sm { grid-template-columns: 1fr 1fr; }
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 1024px) {
          .testimonials-grid { grid-template-columns: 1.45fr 1fr; }
        }

        .cta-grid {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .cta-grid { grid-template-columns: 1.2fr 0.85fr; gap: 64px; }
        }

        .process-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          position: relative;
        }
        @media (min-width: 1024px) {
          .process-grid { grid-template-columns: repeat(4, 1fr); }
        }

        .project-grid {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .project-grid { grid-template-columns: 1.25fr 0.75fr; }
        }

        .project-visual-col {
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        @media (min-width: 1024px) {
          .project-visual-col {
            border-top: none !important;
            border-left: 1px solid rgba(255,255,255,0.05) !important;
          }
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
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

        /* NAV responsive */
        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .hamburger { display: none !important; }

        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .hamburger { display: flex !important; }
        }

        /* Process connector (desktop only) */
        .connector-line { display: none; }
        @media (min-width: 1024px) {
          .connector-line {
            display: block;
            position: absolute;
            top: 46px;
            right: -7px;
            width: 14px;
            height: 1px;
            background: rgba(255,255,255,0.06);
            z-index: 10;
          }
        }
      `}</style>

      <div style={{ position: 'relative', minHeight: '100vh', background: '#03030A' }}>
        <CursorGlow />
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