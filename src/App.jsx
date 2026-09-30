import { useScroll, useTransform, AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  ArrowRight, ArrowUpRight, ChevronDown, Menu, X, Mail,
  Sparkles, Target, Monitor, Layers, Code2, Wrench, Rocket,
  Palette, PenTool, Video, FileText, MapPin,
} from 'lucide-react'
import PricingPage from './PricingPage.jsx'

/* ═══════════════════════════════════════
   DESIGN TOKENS — near-black + vivid orange
   ═══════════════════════════════════════ */
const T = {
  bg:          '#08090A',
  bgMid:       '#0B0D10',
  bgAlt:       '#101317',
  surface:     'rgba(255,255,255,0.05)',
  surfaceUp:   'rgba(255,255,255,0.09)',
  border:      '#1E293B',
  borderHov:   '#FF8A00',
  accent:      '#FF8A00',
  accentDeep:  '#FF5E00',
  accentSoft:  '#FFB04D',
  white:       '#FFFFFF',
  muted:       '#C3CFE2',
  dim:         '#94A3B8',
  text:        '#EAF0FA',
}

const pageGradient = '#08090A'
const accentGrad = 'linear-gradient(135deg, #FF5E00 0%, #FF9900 100%)'
const ease       = [0.22, 1, 0.36, 1]
const FONT_H     = "'Syne', sans-serif"
const FONT_B     = "'Inter', sans-serif"

/* ═══════════════════════════════════════
   REDUCED MOTION
═══════════════════════════════════════ */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fn = () => setReduced(mq.matches)
    fn()
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return reduced
}

/* ═══════════════════════════════════════
   CONTENT
═══════════════════════════════════════ */
const NAV_LINKS = [
  { label: 'Work',       href: '#work' },
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

const CAPABILITIES = [
  {
    idx: '01',
    icon: Monitor,
    title: 'Web Design & Development',
    body: 'Designing and building modern, responsive websites that communicate clearly and create meaningful experiences across devices.',
  },
  {
    idx: '02',
    icon: Code2,
    title: 'Frontend Development',
    body: 'Translating ideas and designs into interactive interfaces through structured, maintainable frontend code.',
  },
  {
    idx: '03',
    icon: Layers,
    title: 'Web Applications',
    body: 'Building functional digital experiences with practical workflows, user interactions, and business-focused functionality.',
  },
  {
    idx: '04',
    icon: Target,
    title: 'Business-Focused Thinking',
    body: 'Understanding the business behind the interface to create digital solutions that serve actual objectives.',
  },
]

const SUPPORTING_SKILLS = [
  { icon: Palette,         title: 'Graphic Design',      body: 'Layout, hierarchy, and visual composition that carry a brand consistently.' },
  { icon: PenTool,         title: 'Branding',            body: 'Identity and consistency across every touchpoint a business puts out.' },
  { icon: Video,           title: 'Video Editing',       body: 'Edited content that communicates an idea clearly and holds attention.' },
  { icon: FileText,        title: 'Content Production',  body: 'Producing the words, visuals, and assets a project actually needs.' },
]

const SKILL_GROUPS = [
  { icon: Code2,   label: 'Frontend',        items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'] },
  { icon: Wrench,  label: 'Development Tools', items: ['Git', 'GitHub', 'VS Code'] },
  { icon: Rocket,  label: 'Deployment',      items: ['Vercel'] },
]

const PROCESS = [
  { num: '01', title: 'Understand', body: 'Understand the business, objectives, audience, and problem.' },
  { num: '02', title: 'Design',    body: 'Establish structure, visual direction, and user experience.' },
  { num: '03', title: 'Develop',   body: 'Build responsive interfaces and functional experiences.' },
  { num: '04', title: 'Refine',    body: 'Test, improve, optimize, and prepare for delivery.' },
]

const EMAIL = 'smartmoses@gmail.com'

/* ═══════════════════════════════════════
   FLOATING CONTACT LINKS
   Leave blank until the real links are set — a blank
   value renders the button inert (no dead link).
   Telegram : https://t.me/yourusername
   WhatsApp : https://wa.me/<number>  (digits + country code, no '+')
   ═══════════════════════════════════════ */
const TELEGRAM_URL = ''
const WHATSAPP_URL = ''

/* ═══════════════════════════════════════
   BRAND GLYPHS — Telegram & WhatsApp are brand marks,
   which Lucide intentionally does not ship, so they are
   inlined here. Paths from the Simple Icons set.
   ═══════════════════════════════════════ */
const TELEGRAM_PATH = 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z'
const WHATSAPP_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.945c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.585 0 11.946-5.359 11.949-11.945a11.87 11.87 0 0 0-3.421-8.4'

/* ═══════════════════════════════════════
   SHARED ANIMATION HELPERS
═══════════════════════════════════════ */
const fadeUp = (delay = 0, distance = 32) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease, delay },
})

/* ═══════════════════════════════════════
   SHARED UI
═══════════════════════════════════════ */
function Chip({ children, accent }) {
  const col = accent ? T.accent : T.muted
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24,
      padding: '6px 14px', borderRadius: 99, border: `1px solid ${col}30`,
      background: `${col}0A` }}>
      <span style={{ position: 'relative', width: 6, height: 6, flexShrink: 0,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ position: 'absolute', inset: 0, borderRadius: '50%',
          border: `1px solid ${col}`, animation: 'chipPing 2.4s ease-out infinite' }} />
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: col,
          boxShadow: `0 0 8px ${col}` }} />
      </span>
      <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.34em',
        color: `${col}CC`, fontFamily: FONT_B, fontWeight: 600 }}>
        {children}
      </span>
    </div>
  )
}

function PrimaryBtn({ href, children, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 9,
        borderRadius: 12, padding: '14px 22px',
        background: accentGrad,
        color: '#0B0D10',
        fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
        textTransform: 'uppercase',
        fontFamily: FONT_B, textDecoration: 'none', flexShrink: 0,
        boxShadow: hov ? '0 10px 30px rgba(255,94,0,0.32)' : '0 4px 14px rgba(255,94,0,0.18)',
        transform: hov ? 'scale(1.04) translateY(-1px)' : 'scale(1) translateY(0)',
        transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s',
      }}>
      {children}
      <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true"
        style={{ flexShrink: 0, transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)',
          transform: hov ? 'translateX(3px)' : 'translateX(0)' }} />
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
        borderRadius: 12, padding: '14px 20px',
        border: `1px solid ${hov ? T.borderHov : T.border}`,
        background: hov ? 'rgba(255,94,0,0.10)' : 'transparent',
        color: hov ? T.white : T.muted,
        fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
        textTransform: 'uppercase',
        fontFamily: FONT_B, textDecoration: 'none', flexShrink: 0,
        transform: hov ? 'scale(1.03)' : 'scale(1)',
        boxShadow: hov ? '0 0 20px rgba(255,94,0,0.28)' : 'none',
        transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
      }}>
      {children}
    </a>
  )
}

/* Square icon chip used for capability / skill headings */
function IconTile({ icon: Icon, size = 40 }) {
  return (
    <span aria-hidden="true" className="icon-tile" style={{
      width: size, height: size, borderRadius: 11, flexShrink: 0,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      border: `1px solid ${T.border}`,
      background: 'linear-gradient(160deg, rgba(255,94,0,0.16), rgba(255,94,0,0.04))',
      color: T.accent,
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
      transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s cubic-bezier(0.22,1,0.36,1)',
    }}>
      <Icon size={Math.round(size * 0.48)} strokeWidth={1.9} />
    </span>
  )
}

function SMBadge({ size = 34 }) {
  return (
    <span aria-hidden="true" style={{
      width: size, height: size, borderRadius: Math.round(size * 0.34),
      background: accentGrad, color: '#0B0D10',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: FONT_H, fontWeight: 700, letterSpacing: '-0.02em',
      fontSize: Math.round(size * 0.4), lineHeight: 1, flexShrink: 0,
      boxShadow: '0 6px 22px rgba(255,94,0,0.42)',
    }}>
      SM
    </span>
  )
}

function SectionShell({ id, children }) {
  return (
    <section id={id} style={{ padding: 'clamp(72px,9vw,120px) 0', borderTop: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        {children}
      </div>
    </section>
  )
}

function SectionHeading({ chip, title, accentWord, lead }) {
  return (
    <motion.div {...fadeUp()} style={{ marginBottom: 'clamp(40px,5vw,64px)', maxWidth: 720 }}>
      <Chip accent>{chip}</Chip>
      <h2 style={{ fontFamily: FONT_H, fontSize: 'clamp(1.7rem,4vw,2.9rem)', lineHeight: 1.06,
        letterSpacing: '-0.035em', color: T.white, marginBottom: lead ? 20 : 0 }}>
        {title}{' '}
        {accentWord && (
          <span style={{ background: accentGrad, WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {accentWord}
          </span>
        )}
      </h2>
      {lead && (
        <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.9, maxWidth: 560, fontFamily: FONT_B }}>
          {lead}
        </p>
      )}
    </motion.div>
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
      transition={{ duration: 0.8, ease }}
      style={{
        position: 'fixed', top: 16, left: 0, right: 0,
        zIndex: 9000, display: 'flex', justifyContent: 'center', pointerEvents: 'none',
      }}
    >
      <div style={{
        pointerEvents: 'all',
        width: 'calc(100% - 32px)', maxWidth: 1150,
        background: scrolled ? 'rgba(3,7,18,0.85)' : 'rgba(15,23,42,0.45)',
        border: `1px solid ${T.border}`,
        borderRadius: 16,
        backdropFilter: 'blur(24px)',
        boxShadow: scrolled ? '0 24px 60px rgba(0,0,0,0.5)' : 'none',
        transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px' }}>
          <a href="#top" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}
            aria-label="Smart Moses — home">
            <SMBadge size={32} />
            <span style={{ fontFamily: FONT_H, fontSize: 15, fontWeight: 700, color: T.white, letterSpacing: '-0.01em' }}>
              Smart Moses
            </span>
          </a>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="nav-desktop"
            aria-label="Primary">
            {NAV_LINKS.map(link => <NavLink key={link.href} href={link.href}>{link.label}</NavLink>)}
            <div style={{ marginLeft: 10 }}>
              <PrimaryBtn href="#contact">Hire Me</PrimaryBtn>
            </div>
          </nav>

          <button onClick={() => setOpen(o => !o)} className="hamburger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            style={{ background: 'none', border: `1px solid ${open ? T.borderHov : T.border}`,
              borderRadius: 10, width: 38, height: 38, cursor: 'pointer', color: T.muted,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'color 0.25s, border-color 0.25s' }}>
            {open
              ? <X size={17} strokeWidth={2.2} aria-hidden="true" />
              : <Menu size={17} strokeWidth={2.2} aria-hidden="true" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              key="mob"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease }}
              style={{ borderTop: `1px solid ${T.border}`, overflow: 'hidden' }}
            >
              <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {NAV_LINKS.map(link => (
                  <a key={link.href} href={link.href} onClick={() => setOpen(false)}
                    style={{ padding: '11px 0', fontSize: 13, color: T.text, textDecoration: 'none',
                      fontFamily: FONT_B, borderBottom: `1px solid ${T.border}` }}>
                    {link.label}
                  </a>
                ))}
                <div style={{ marginTop: 14 }}>
                  <PrimaryBtn href="#contact" onClick={() => setOpen(false)}>Hire Me</PrimaryBtn>
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
        padding: '8px 14px', fontSize: 11, letterSpacing: '0.05em', textTransform: 'uppercase',
        color: hov ? T.white : T.muted, textDecoration: 'none',
        borderRadius: 8, fontFamily: FONT_B, fontWeight: 500,
        transition: 'color 0.2s',
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
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '10%'])

  return (
    <section id="top" ref={ref}
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
        paddingTop: 140, paddingBottom: 120, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(148,163,184,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.055) 1px,transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)' }} />
      </div>

      <motion.div style={{ y: yParallax, position: 'relative', zIndex: 10, width: '100%',
        maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <div className="hero-grid">
          <div>
            <motion.div {...fadeUp(0.05)} style={{ marginBottom: 28 }}>
              <Chip accent>Web Designer &amp; Developer</Chip>
            </motion.div>

            <motion.div {...fadeUp(0.15)} style={{ marginBottom: 26 }}>
              <h1 style={{ fontFamily: FONT_H, fontSize: 'clamp(2.3rem,6.2vw,4.6rem)', fontWeight: 700,
                lineHeight: 1.02, letterSpacing: '-0.03em', color: T.white, maxWidth: 680 }}>
                I build digital experiences that{' '}
                <span style={{ background: accentGrad, WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  make businesses stand out.
                </span>
              </h1>
            </motion.div>

            <motion.p {...fadeUp(0.25)}
              style={{ fontSize: 'clamp(14px,1.6vw,16px)', lineHeight: 1.85, color: T.muted,
                maxWidth: 520, marginBottom: 36, fontFamily: FONT_B }}>
              I design and develop modern websites and functional web applications, combining thoughtful
              design with practical engineering to turn ideas into meaningful digital experiences.
            </motion.p>

            <motion.div {...fadeUp(0.35)} style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <PrimaryBtn href="#work">View My Work</PrimaryBtn>
              <GhostBtn href="#contact">Let's Talk</GhostBtn>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease }}
            style={{ position: 'relative' }}
            whileHover={{ y: -6 }}
          >
            <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden',
              border: `1px solid ${T.border}`, background: T.surface,
              transition: 'border-color 0.35s, box-shadow 0.35s',
              boxShadow: '0 18px 50px rgba(0,0,0,0.42)' }}>
              <img src="/images/me.jpeg" alt="Smart Moses, Web Designer and Developer"
                style={{ width: '100%', height: 'clamp(340px,42vw,460px)', objectFit: 'cover',
                  objectPosition: 'top center', display: 'block' }} />
              <div style={{ padding: '18px 20px', borderTop: `1px solid ${T.border}`,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <div>
                  <p style={{ fontFamily: FONT_H, fontSize: 14, fontWeight: 700, color: T.white,
                    lineHeight: 1.2 }}>Smart Moses</p>
                  <p style={{ fontSize: 9, color: T.dim, textTransform: 'uppercase',
                    letterSpacing: '0.22em', marginTop: 5, fontFamily: FONT_B }}>
                    Web Designer &amp; Developer
                  </p>
                </div>
                <SMBadge size={34} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.a href="#work" aria-label="Scroll to work"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }}
        whileHover={{ y: 3 }}
        style={{ position: 'absolute', bottom: 34, left: '50%', marginLeft: -22, zIndex: 10,
          width: 44, height: 44, borderRadius: '50%', display: 'flex',
          alignItems: 'center', justifyContent: 'center', color: T.muted,
          border: `1px solid ${T.border}`, background: 'rgba(8,9,10,0.5)',
          backdropFilter: 'blur(10px)' }}>
        <ChevronDown size={18} strokeWidth={2} aria-hidden="true"
          style={{ animation: 'bounceDown 2.2s ease-in-out infinite' }} />
      </motion.a>
    </section>
  )
}

/* ═══════════════════════════════════════
   WORK
═══════════════════════════════════════ */
function Work() {
  return (
    <SectionShell id="work">
      <SectionHeading
        chip="Selected Work"
        title="A collection of digital experiences shaped by"
        accentWord="design thinking and technical execution."
        lead="Case studies are being prepared and will be published here shortly. In the meantime, I am happy to walk you through relevant work directly."
      />
      <motion.div {...fadeUp(0.1)}
        style={{ padding: 'clamp(32px,5vw,56px)', borderRadius: 20, border: `1px solid ${T.border}`,
          background: T.surface, display: 'flex', flexWrap: 'wrap', gap: 28,
          alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ maxWidth: 520 }}>
          <h3 style={{ fontFamily: FONT_H, fontSize: 'clamp(1.1rem,2.2vw,1.4rem)', fontWeight: 700,
            color: T.white, marginBottom: 10, letterSpacing: '-0.02em' }}>
            Want to see the work first?
          </h3>
          <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.85, fontFamily: FONT_B }}>
            Get in touch and I will share relevant projects, screenshots, and context for what you are
            trying to build.
          </p>
        </div>
        <PrimaryBtn href="#contact">Request Work Samples</PrimaryBtn>
      </motion.div>
    </SectionShell>
  )
}

/* ═══════════════════════════════════════
   CAPABILITIES
═══════════════════════════════════════ */
function Capabilities() {
  return (
    <SectionShell id="capabilities">
      <SectionHeading
        chip="Capabilities"
        title="What I Bring to the"
        accentWord="Table"
        lead="The core of what I do, and the standard I hold it to."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 1,
        background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16, overflow: 'hidden' }}>
        {CAPABILITIES.map((c, i) => (
          <motion.div key={c.idx} {...fadeUp(i * 0.07)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease }}
            className="cap-cell"
            style={{ padding: 'clamp(26px,3vw,36px)',
              display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 12 }}>
              <IconTile icon={c.icon} />
              <span style={{ fontSize: 9, fontFamily: 'monospace', color: T.accent,
                letterSpacing: '0.1em' }}>
                {c.idx}
              </span>
            </div>
            <h3 style={{ fontFamily: FONT_H, fontSize: 'clamp(1rem,1.8vw,1.15rem)', fontWeight: 600,
              color: T.white, lineHeight: 1.3, letterSpacing: '-0.02em' }}>
              {c.title}
            </h3>
            <p style={{ fontSize: 12.5, color: T.muted, lineHeight: 1.85, fontFamily: FONT_B }}>
              {c.body}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}

/* ═══════════════════════════════════════
   CREATIVE ADVANTAGE
═══════════════════════════════════════ */
function CreativeAdvantage() {
  return (
    <SectionShell id="advantage">
      <div className="two-col">
        <div className="sticky-col">
          <motion.div {...fadeUp()}>
            <Chip>A Creative Perspective</Chip>
            <h2 style={{ fontFamily: FONT_H, fontSize: 'clamp(1.7rem,4vw,2.7rem)', lineHeight: 1.06,
              letterSpacing: '-0.035em', color: T.white, marginBottom: 22 }}>
              More Than Development.{' '}
              <span style={{ color: T.dim }}>A Creative Perspective.</span>
            </h2>
            <p style={{ fontSize: 13.5, color: T.muted, lineHeight: 1.9, fontFamily: FONT_B, marginBottom: 18 }}>
              My background in graphic design, branding, and video production gives me a broader
              perspective on how digital experiences are created and communicated.
            </p>
            <p style={{ fontSize: 13.5, color: T.muted, lineHeight: 1.9, fontFamily: FONT_B }}>
              These skills help me approach web development with a stronger understanding of visual
              hierarchy, storytelling, brand consistency, and the way businesses connect with their
              audiences.
            </p>
          </motion.div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {SUPPORTING_SKILLS.map((s, i) => (
            <motion.div key={s.title} {...fadeUp(i * 0.07)}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3, ease }}
              className="skill-row"
              style={{ padding: '22px 0', borderTop: `1px solid ${T.border}`,
                display: 'flex', flexDirection: 'column', gap: 7 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <IconTile icon={s.icon} size={32} />
                <h3 style={{ fontFamily: FONT_B, fontSize: 13, fontWeight: 600, color: T.text,
                  letterSpacing: '0.01em' }}>
                  {s.title}
                </h3>
              </div>
              <p style={{ fontSize: 12, color: T.dim, lineHeight: 1.8, fontFamily: FONT_B }}>
                {s.body}
              </p>
            </motion.div>
          ))}
          <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 22 }}>
            <p style={{ fontSize: 11.5, color: T.dim, lineHeight: 1.85, fontFamily: FONT_B, fontStyle: 'italic' }}>
              These support my work as a Web Designer &amp; Developer — they are not separate
              practices I lead with.
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

/* ═══════════════════════════════════════
   TECHNICAL SKILLS
═══════════════════════════════════════ */
function Skills() {
  return (
    <SectionShell id="skills">
      <SectionHeading
        chip="Technical Skills"
        title="The tools I actually"
        accentWord="work in daily."
        lead="Grouped by what they are used for."
      />
      <div className="skills-grid">
        {SKILL_GROUPS.map((g, i) => (
          <motion.div key={g.label} {...fadeUp(i * 0.07)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease }}
            className="skill-card"
            style={{ padding: 'clamp(24px,3vw,32px)', border: `1px solid ${T.border}`,
              borderRadius: 16, background: T.surface }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 18 }}>
              <IconTile icon={g.icon} size={34} />
              <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.28em',
                color: T.accent, fontFamily: FONT_B, fontWeight: 600 }}>
                {g.label}
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {g.items.map(item => (
                <span key={item} style={{ fontSize: 11.5, padding: '6px 13px', borderRadius: 7,
                  border: `1px solid ${T.border}`, color: T.text, fontFamily: FONT_B,
                  transition: 'border-color 0.25s, color 0.25s' }}>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}

/* ═══════════════════════════════════════
   EXPERIENCE
═══════════════════════════════════════ */
function Experience() {
  return (
    <SectionShell id="experience">
      <SectionHeading
        chip="Experience & Journey"
        title="Work that demonstrates"
        accentWord="how I think."
        lead="Professional engagements, freelance work, and independent projects."
      />
      <motion.div {...fadeUp(0.1)}
        style={{ padding: 'clamp(30px,4vw,48px)', border: `1px solid ${T.border}`, borderRadius: 18,
          background: T.surface }}>
        <p style={{ fontSize: 13.5, color: T.muted, lineHeight: 1.9, fontFamily: FONT_B, maxWidth: 640 }}>
          A detailed timeline of roles, dates, and responsibilities is being written up and will be
          published here shortly. I would rather leave this space accurate than fill it with
          approximations — so in the meantime, ask me directly and I will give you the full picture.
        </p>
        <div style={{ marginTop: 26 }}>
          <GhostBtn href="#contact">Ask Me About My Experience</GhostBtn>
        </div>
      </motion.div>
    </SectionShell>
  )
}

/* ═══════════════════════════════════════
   ABOUT
═══════════════════════════════════════ */
function About() {
  return (
    <SectionShell id="about">
      <div className="two-col">
        <div className="sticky-col">
          <motion.div {...fadeUp()}>
            <Chip>About</Chip>
            <h2 style={{ fontFamily: FONT_H, fontSize: 'clamp(1.7rem,4vw,2.7rem)', lineHeight: 1.08,
              letterSpacing: '-0.035em', color: T.white }}>
              Design-minded. Technology-driven.{' '}
              <span style={{ color: T.dim }}>Purpose-focused.</span>
            </h2>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.1)}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            "I'm Smart Moses, a Web Designer and Developer with a creative background and a strong interest in building meaningful digital experiences.",
            'My journey across visual design, content production, and web development has shaped how I approach digital work.',
            "I don't see a website as just a collection of pages. I see it as a tool for communication, interaction, and business growth.",
            'I enjoy understanding how things work, solving problems, and turning ideas into experiences people can actually use.',
            'Today, my primary focus is web design and development, with an emphasis on thoughtful interfaces, functional websites, and practical digital solutions.',
            'I believe good technology should not only work well. It should make sense, communicate clearly, and serve a purpose.',
          ].map((para, i) => (
            <p key={i} style={{ fontSize: 14, color: i === 0 ? T.text : T.muted, lineHeight: 1.95,
            maxWidth: 600, fontFamily: FONT_B }}>
              {para}
            </p>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  )
}

/* ═══════════════════════════════════════
   PROCESS
═══════════════════════════════════════ */
function Process() {
  return (
    <SectionShell id="process">
      <SectionHeading
        chip="How I Work"
        title="From Understanding to"
        accentWord="Execution."
        lead="Four stages, in order, every time."
      />
      <div className="process-grid">
        {PROCESS.map((step, i) => (
          <motion.div key={step.num} {...fadeUp(i * 0.08)}
            style={{ paddingTop: 26, borderTop: `2px solid ${i === 0 ? T.accent : T.border}`,
              display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontFamily: FONT_H, fontSize: 'clamp(1.8rem,3.4vw,2.4rem)', fontWeight: 700,
              color: i === 0 ? T.accent : T.dim, lineHeight: 1, letterSpacing: '-0.03em' }}>
              {step.num}
            </span>
            <h3 style={{ fontFamily: FONT_H, fontSize: 15, fontWeight: 600, color: T.white,
              letterSpacing: '-0.01em' }}>
              {step.title}
            </h3>
            <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.85, fontFamily: FONT_B }}>
              {step.body}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}

/* ═══════════════════════════════════════
   CONTACT
═══════════════════════════════════════ */
function Contact() {
  return (
    <SectionShell id="contact">
      <motion.div {...fadeUp()}
        style={{ position: 'relative', borderRadius: 22, overflow: 'hidden',
          padding: 'clamp(36px,6vw,72px)', border: `1px solid ${T.borderHov}`, background: T.surface }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(148,163,184,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.045) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)' }} />

        <div className="cta-grid" style={{ position: 'relative' }}>
          <div>
            <Chip accent>Contact</Chip>
            <h2 style={{ fontFamily: FONT_H, fontSize: 'clamp(1.9rem,4.6vw,3.2rem)', lineHeight: 1.02,
              letterSpacing: '-0.04em', color: T.white, marginBottom: 20 }}>
              Have an idea worth{' '}
              <span style={{ background: accentGrad, WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                building?
              </span>
            </h2>
            <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.9, maxWidth: 460, fontFamily: FONT_B,
              marginBottom: 32 }}>
              Whether you're looking for someone to design and develop a website, build a digital
              product, or join your team, I'd love to hear what you're working on.
            </p>
            <PrimaryBtn href={`mailto:${EMAIL}`}>Let's Start a Conversation</PrimaryBtn>
          </div>

          <div style={{ padding: 28, borderRadius: 16, border: `1px solid ${T.border}`,
            background: 'rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <Mail size={13} strokeWidth={2} aria-hidden="true" style={{ color: T.accent }} />
              <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.28em',
                color: T.dim, fontFamily: FONT_B }}>Email</p>
            </div>
            <a href={`mailto:${EMAIL}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7,
                fontFamily: FONT_B, fontSize: 'clamp(0.95rem,2vw,1.15rem)', fontWeight: 600,
                color: T.accent, textDecoration: 'none', wordBreak: 'break-all' }}>
              {EMAIL}
              <ArrowUpRight size={15} strokeWidth={2.4} aria-hidden="true" style={{ flexShrink: 0 }} />
            </a>
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 18, display: 'flex',
              flexDirection: 'column', gap: 12 }}>
              {[
                { icon: Target,   label: 'Focus',      value: 'Web design & development' },
                { icon: MapPin,   label: 'Based in',    value: 'Nigeria' },
                { icon: Sparkles, label: 'Engagements', value: 'Freelance & collaborative' },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <row.icon size={13} strokeWidth={2} aria-hidden="true"
                    style={{ color: T.dim, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: T.dim, fontFamily: FONT_B,
                    flexShrink: 0, width: 88 }}>{row.label}</span>
                  <span style={{ fontSize: 11, color: T.text, fontFamily: FONT_B, fontWeight: 500,
                    textAlign: 'right', flexGrow: 1 }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  )
}

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${T.border}`, padding: '48px 24px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div className="footer-grid" style={{ marginBottom: 36 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <SMBadge size={30} />
              <p style={{ fontFamily: FONT_H, fontSize: 15, fontWeight: 700, color: T.white,
                letterSpacing: '-0.01em' }}>
                Smart Moses
              </p>
            </div>
            <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.85, maxWidth: 320, fontFamily: FONT_B }}>
              Web Designer &amp; Developer — designing and building modern digital experiences that
              help businesses communicate, connect, and grow.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div>
              <p style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.3em',
                color: T.dim, marginBottom: 16, fontFamily: FONT_B }}>Navigate</p>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {NAV_LINKS.map(link => (
                  <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
                ))}
              </nav>
            </div>
            <div>
              <p style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.3em',
                color: T.dim, marginBottom: 16, fontFamily: FONT_B }}>Contact</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <FooterLink href={`mailto:${EMAIL}`}>{EMAIL}</FooterLink>
                <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <FooterLink href="#contact">Start a project</FooterLink>
                  <ArrowRight size={13} strokeWidth={2.2} aria-hidden="true"
                    style={{ color: T.accent }} />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 24, borderTop: `1px solid ${T.border}`, display: 'flex',
          flexWrap: 'wrap', justifyContent: 'space-between', gap: 8 }}>
          <p style={{ fontSize: 10, color: T.dim, fontFamily: FONT_B }}>
            © {new Date().getFullYear()} Smart Moses. All rights reserved.
          </p>
          <p style={{ fontSize: 10, color: T.dim, fontFamily: FONT_B }}>
            Web Designer &amp; Developer
          </p>
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
      style={{ fontSize: 12, color: hov ? T.accent : T.muted, textDecoration: 'none',
        fontFamily: FONT_B, transition: 'color 0.2s', wordBreak: 'break-all' }}>
      {children}
    </a>
  )
}

/* ═══════════════════════════════════════
   FLOATING CONTACT — WhatsApp + Telegram
   ═══════════════════════════════════════ */
function FloatingContact() {
  const reduced = useReducedMotion()

  const items = [
    {
      label: 'Telegram',
      href: TELEGRAM_URL,
      hint: 'Set TELEGRAM_URL at the top of App.jsx',
      gradient: 'linear-gradient(145deg, #34AADC 0%, #0088CC 100%)',
      ring: 'rgba(0,136,204,0.45)',
      path: TELEGRAM_PATH,
    },
    {
      label: 'WhatsApp',
      href: WHATSAPP_URL,
      hint: 'Set WHATSAPP_URL at the top of App.jsx',
      gradient: 'linear-gradient(145deg, #5BF07A 0%, #25D366 55%, #14A85A 100%)',
      ring: 'rgba(37,211,102,0.45)',
      path: WHATSAPP_PATH,
    },
  ]

  return (
    <div aria-label="Instant contact"
      style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 999,
        display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map(item => {
        const live = Boolean(item.href)
        const Tag = live ? 'a' : 'div'
        return (
          <Tag key={item.label}
            {...(live ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' } : {})}
            aria-label={live ? `${item.label} — opens in a new tab` : `${item.label} (link not configured)`}
            title={live ? item.label : item.hint}
            className="float-btn"
            style={{
              position: 'relative', width: 56, height: 56, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: item.gradient, color: '#fff',
              boxShadow: `0 10px 30px rgba(0,0,0,0.45), 0 0 0 1px ${item.ring}`,
              textDecoration: 'none', cursor: live ? 'pointer' : 'not-allowed',
              opacity: live ? 1 : 0.45,
              animation: reduced
                ? 'none'
                : `float 3s ease-in-out ${item.label === 'WhatsApp' ? '0.35s' : '0s'} infinite`,
            }}>
            {!live && (
              <span aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: '50%',
                border: '1px dashed rgba(255,255,255,0.5)' }} />
            )}
            {live && (
              <span aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: '50%',
                background: item.gradient, animation: 'ringPing 3s ease-out infinite' }} />
            )}
            <svg viewBox="0 0 24 24" width="27" height="27" fill="currentColor" aria-hidden="true"
              style={{ position: 'relative', zIndex: 1, display: 'block' }}>
              <path d={item.path} />
            </svg>
            <span aria-hidden="true" style={{ position: 'absolute', top: -3, right: -1, zIndex: 2,
              minWidth: 20, height: 20, padding: '0 5px', borderRadius: 99,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: accentGrad, color: '#0B0D10',
              fontFamily: FONT_H, fontSize: 9, fontWeight: 800, lineHeight: 1,
              border: '2px solid #08090A' }}>
              {item.label === 'Telegram' ? 'TG' : 'WA'}
            </span>
          </Tag>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════
   ROOT
   ═══════════════════════════════════════ */
export default function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : ''
  const showPricing = path.endsWith('/pricingpage')

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; background-color: ${pageGradient}; }

        body {
          background: transparent;
          color: ${T.text};
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }

        img { max-width: 100%; display: block; }
        a { text-decoration: none; }
        h1, h2, h3 { font-family: 'Syne', sans-serif; }

        ::selection { background: rgba(255,94,0,0.34); color: #fff; }

        /* ── ANIMATED AMBIENT GLOWS ──
           body background stays flat and opaque-neutral; the drifting
           glows live on fixed pseudo-elements at z-index -1 so they
           render behind every section regardless of stacking. */
        @keyframes glowDriftA {
          0%   { transform: translate3d(0,0,0) scale(1);      opacity: 0.85; }
          50%  { transform: translate3d(4%,3%,0) scale(1.12); opacity: 1;    }
          100% { transform: translate3d(0,0,0) scale(1);      opacity: 0.85; }
        }
        @keyframes glowDriftB {
          0%   { transform: translate3d(0,0,0) scale(1.08);  opacity: 1;    }
          50%  { transform: translate3d(-5%,-4%,0) scale(1);  opacity: 0.8;  }
          100% { transform: translate3d(0,0,0) scale(1.08);  opacity: 1;    }
        }
        @keyframes chipPing {
          0%   { transform: scale(1);   opacity: 0.85; }
          70%  { transform: scale(2.6); opacity: 0;    }
          100% { transform: scale(2.6); opacity: 0;    }
        }
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0);   }
          50%      { transform: translateY(4px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0);    }
          50%      { transform: translateY(-8px); }
        }
        @keyframes ringPing {
          0%   { transform: scale(1);   opacity: 0.5; }
          70%  { transform: scale(1.7); opacity: 0;   }
          100% { transform: scale(1.7); opacity: 0;   }
        }

        body::before,
        body::after {
          content: '';
          position: fixed;
          top: -12%; left: -12%;
          width: 124%; height: 124%;
          pointer-events: none;
          z-index: -1;
          will-change: transform, opacity;
        }
        body::before {
          background: radial-gradient(ellipse 42% 38% at 12% 8%, rgba(56,132,255,0.17), transparent 62%);
          animation: glowDriftA 22s ease-in-out infinite;
        }
        body::after {
          background: radial-gradient(ellipse 40% 36% at 88% 92%, rgba(255,94,0,0.15), transparent 64%);
          animation: glowDriftB 26s ease-in-out infinite;
        }

        /* ── MICRO-INTERACTIONS ── */
        .float-btn { transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s, opacity 0.3s; }
        .float-btn:hover {
          transform: scale(1.1) translateY(-3px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 26px currentColor;
        }
        .float-btn:active { transform: scale(0.96); }

        .cap-cell,
        .skill-card,
        .skill-row { transition: background 0.3s, border-color 0.3s, box-shadow 0.3s; }

        /* Capabilities sits on a gap-1 grid whose parent paints the
           dividers, so the cells must be near-opaque and dark or the
           parent slate bleeds through and the block reads light. */
        .cap-cell { background: rgba(9,11,14,0.72); }
        .cap-cell:hover {
          background: rgba(255,94,0,0.055);
          box-shadow: inset 0 0 0 1px rgba(255,94,0,0.28), 0 0 26px rgba(255,94,0,0.16);
        }

        .skill-card:hover {
          background: rgba(255,94,0,0.05);
          border-color: ${T.borderHov};
          box-shadow: 0 0 24px rgba(255,94,0,0.16), inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .cap-cell:hover .icon-tile,
        .skill-card:hover .icon-tile,
        .skill-row:hover .icon-tile {
          border-color: ${T.borderHov};
          transform: scale(1.07) rotate(-3deg);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.07), 0 0 18px rgba(255,94,0,0.34);
        }

        :focus-visible {
          outline: 2px solid ${T.accent};
          outline-offset: 3px;
          border-radius: 4px;
        }

        /* ── LAYOUT ── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (min-width: 900px) {
          .hero-grid { grid-template-columns: 1.15fr 0.85fr; gap: 72px; }
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (min-width: 900px) {
          .two-col { grid-template-columns: 0.9fr 1.1fr; gap: 72px; }
        }

        .sticky-col { position: static; }
        @media (min-width: 900px) {
          .sticky-col { position: sticky; top: 120px; }
        }

        .skills-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        @media (min-width: 640px) {
          .skills-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .process-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 640px) {
          .process-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .process-grid { grid-template-columns: repeat(4, 1fr); }
        }

        .cta-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
        }
        @media (min-width: 900px) {
          .cta-grid { grid-template-columns: 1.25fr 0.75fr; gap: 56px; }
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
        }
        @media (min-width: 720px) {
          .footer-grid { grid-template-columns: 1.4fr 1fr; }
        }

        /* NAV responsive */
        .nav-desktop { display: flex; align-items: center; gap: 4px; }
        .hamburger { display: none !important; }
        @media (max-width: 860px) {
          .nav-desktop { display: none !important; }
          .hamburger { display: flex !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>

      {showPricing ? (
        <PricingPage />
      ) : (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
          <Nav />
          <Hero />
          <Work />
          <Capabilities />
          <CreativeAdvantage />
          <Skills />
          <Experience />
          <About />
          <Process />
          <Contact />
          <Footer />
          <FloatingContact />
        </div>
      )}
    </>
  )
}
