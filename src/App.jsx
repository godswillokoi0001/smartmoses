import { useScroll, useTransform, AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, useEffect, createContext, useContext } from 'react'
import {
  ArrowRight, ArrowUpRight, ChevronDown, Menu, X, Mail,
  Monitor, Layers, Code2, Wrench, Rocket, MapPin, Target, Sparkles,
  ExternalLink as ExternalLinkIcon, CheckCircle2, Sun, Moon, Globe,
} from 'lucide-react'
import PricingPage from './PricingPage.jsx'
import ProjectCaseStudy from './ProjectCaseStudy.jsx'
import { PROJECTS } from './projects.js'
import {
  siHtml5, siCss, siSass, siJavascript, siTypescript, siReact, siTailwindcss,
  siVite, siGit, siGithub, siEslint, siPrettier, siFigma, siVercel,
} from 'simple-icons'

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS — DARK & LIGHT PALETTES
   ═══════════════════════════════════════════════════════════════ */
const THEMES = {
  dark: {
    isDark: true,
    name: 'dark',
    bg:            '#101713',
    bgMid:         '#151F19',
    bgAlt:         '#1A251E',
    surface:       '#202D24',
    surfaceUp:     '#29382D',
    border:        '#29382D',
    borderSub:     'rgba(255,255,255,0.08)',
    accent:        '#9ACD9A',
    accentAlt:     '#B6C99D',
    white:         '#F3F1E8',
    text:          '#E8E9DF',
    btnText:       '#101713',
    muted:         '#B0B8AC',
    dim:           '#879286',
    navBgScrolled: 'rgba(16,23,19,0.94)',
    navBgTop:      'rgba(16,23,19,0.72)',
    gridLines:     'rgba(205,218,196,0.035)',
    cardShadow:    '0 24px 60px rgba(0,0,0,0.5)',
    heroGlow1:     '#9ACD9A0B',
    heroGlow2:     '#B6C99D08',
    contactGlow:   '#9ACD9A0A',
    contactBoxBg:  'rgba(16,23,19,0.88)',
    projectVeil:   'linear-gradient(180deg, rgba(9,13,22,0) 45%, rgba(9,13,22,0.55) 100%)',
    toggleBg:      'rgba(255,255,255,0.05)',
    toggleActiveBg:'#1E293B',
    toggleBorder:  'rgba(255,255,255,0.1)',
    codeTagBg:     'rgba(255,255,255,0.02)',
  },
  light: {
    isDark: false,
    name: 'light',
    bg:            '#F4F2E9',
    bgMid:         '#FBFAF5',
    bgAlt:         '#EAEDE4',
    surface:       '#ECEFE6',
    surfaceUp:     '#E1E7DC',
    border:        '#DDE2D6',
    borderSub:     'rgba(32,48,37,0.12)',
    accent:        '#326B4A',
    accentAlt:     '#54745B',
    white:         '#1B2820',
    text:          '#26352B',
    btnText:       '#FBFAF5',
    muted:         '#526055',
    dim:           '#707B70',
    navBgScrolled: 'rgba(251,250,245,0.95)',
    navBgTop:      'rgba(244,242,233,0.82)',
    gridLines:     'rgba(32,48,37,0.025)',
    cardShadow:    '0 20px 48px rgba(15,23,42,0.08)',
    heroGlow1:     '#326B4A0D',
    heroGlow2:     '#879C6C0A',
    contactGlow:   '#326B4A0A',
    contactBoxBg:  'rgba(251,250,245,0.94)',
    projectVeil:   'linear-gradient(180deg, rgba(251,250,245,0) 40%, rgba(244,242,233,0.65) 100%)',
    toggleBg:      '#E6E9DF',
    toggleActiveBg:'#FBFAF5',
    toggleBorder:  '#D2D9CE',
    codeTagBg:     'rgba(32,48,37,0.025)',
  },
}

const ease   = [0.22, 1, 0.36, 1]
const FONT_H = "'Plus Jakarta Sans', sans-serif"
const FONT_B = "'Inter', sans-serif"

/* ═══════════════════════════════════════════════════════════════
   THEME CONTEXT & PROVIDER
   ═══════════════════════════════════════════════════════════════ */
const ThemeContext = createContext({
  mode: 'system',
  theme: 'dark',
  setMode: () => {},
  T: THEMES.dark,
})

function useTheme() {
  return useContext(ThemeContext)
}

function ThemeProvider({ children }) {
  const [mode, setModeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme')
      if (saved === 'dark' || saved === 'light' || saved === 'system') {
        return saved
      }
    }
    return 'system'
  })

  const [systemDark, setSystemDark] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return true
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => setSystemDark(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const setMode = (newMode) => {
    setModeState(newMode)
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-theme', newMode)
    }
  }

  const resolvedTheme = mode === 'system' ? (systemDark ? 'dark' : 'light') : mode
  const T = THEMES[resolvedTheme]

  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    root.setAttribute('data-theme', resolvedTheme)
    root.classList.remove('dark', 'light')
    root.classList.add(resolvedTheme)

    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', T.bg)
    }
  }, [resolvedTheme, T.bg])

  return (
    <ThemeContext.Provider value={{ mode, theme: resolvedTheme, setMode, T }}>
      {children}
    </ThemeContext.Provider>
  )
}

/* ═══════════════════════════════════════════════════════════════
   THEME TOGGLE COMPONENT (Dark, Light, System)
   ═══════════════════════════════════════════════════════════════ */
function ThemeToggle({ showLabels = false, style = {} }) {
  const { mode, setMode, T } = useTheme()

  const options = [
    { id: 'light',  label: 'Light',  icon: Sun },
    { id: 'system', label: 'System', icon: Monitor },
    { id: 'dark',   label: 'Dark',   icon: Moon },
  ]

  return (
    <div
      role="radiogroup"
      aria-label="Color theme selector"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px',
        borderRadius: 99,
        background: T.toggleBg,
        border: `1px solid ${T.toggleBorder}`,
        transition: 'background 0.25s, border-color 0.25s',
        ...style,
      }}
    >
      {options.map(({ id, label, icon: Icon }) => {
        const active = mode === id
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${label} theme`}
            title={`Switch to ${label} theme`}
            onClick={() => setMode(id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              padding: showLabels ? '6px 12px' : '6px 8px',
              borderRadius: 99,
              border: 'none',
              cursor: 'pointer',
              background: active ? T.toggleActiveBg : 'transparent',
              color: active ? T.accent : T.dim,
              boxShadow: active
                ? T.isDark
                  ? '0 2px 8px rgba(0,0,0,0.4)'
                  : '0 2px 8px rgba(15,23,42,0.1)'
                : 'none',
              fontFamily: FONT_B,
              fontSize: 11,
              fontWeight: active ? 600 : 500,
              transition: 'all 0.2s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <Icon size={14} strokeWidth={active ? 2.4 : 1.9} />
            {showLabels && <span>{label}</span>}
          </button>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   REDUCED MOTION
   ═══════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════
   CONTENT DATA
   ═══════════════════════════════════════════════════════════════ */
const NAV_LINKS = [
  { label: 'Work',     href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About',   href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const EMAIL        = 'smartmoses@gmail.com'
const GITHUB_URL   = 'https://github.com/godswillokoi0001'
const WHATSAPP_URL =
  'https://wa.me/2348137038180?text=' +
  encodeURIComponent("Hi Godswill, I'd like to discuss a project.")

const SERVICES = [
  {
    num: '01',
    title: 'Business Websites & Redesigns',
    body: 'Clean, multi-section web experiences built to establish authority, present your services clearly, and turn traffic into qualified inquiries.',
    deliverables: ['Semantic HTML5/CSS3', 'Mobile Optimisation', 'CMS / WordPress Setups', 'Cross-Browser Testing'],
  },
  {
    num: '02',
    title: 'Landing Pages & Figma-to-Code',
    body: 'Pixel-accurate conversion of Figma files into fast, lightweight, and high-converting single pages tailored for product launches and campaigns.',
    deliverables: ['CSS Grid & Flexbox', 'Interactive JavaScript', 'Fluid Breakpoints', 'Performance Optimisation'],
  },
  {
    num: '03',
    title: 'Digital Brand Assets & Visuals',
    body: 'Structured typography, visual hierarchy, banners, and digital graphics that ensure your marketing assets match your website seamlessly.',
    deliverables: ['UI Layouts', 'Brand Asset Preparation', 'Social/Hero Graphics', 'Visual Direction'],
  },
]

const EXPERIENCE = [
  {
    period: '2024 — Present',
    role: 'Founder & Frontend Developer',
    org: 'Smotiva Digital Ltd.',
    location: 'Nigeria',
    points: [
      'Leading digital design and web development projects for growing businesses.',
      'Designed and delivered the complete Rayto Prolog logistics web platform.',
      'Connecting client business goals with practical frontend architecture.',
    ],
  },
  {
    period: '2023 — 2024',
    role: 'Frontend Developer',
    org: 'Azawire Africa',
    location: 'Nigeria',
    points: [
      'Contributed to the multi-page financial services frontend codebase.',
      'Implemented personal and business user journeys, pricing, and onboarding flows.',
      'Collaborated within an active development team using React and modern styling.',
    ],
  },
  {
    period: '2023 — 2023',
    role: 'Frontend Developer',
    org: 'Technolix Digitals',
    location: 'Abuja, Nigeria',
    points: [
      'Implemented Figma designs into code for client projects, including Vista MFB.',
      'Built responsive interfaces and ensured pixel-accurate layout consistency.',
      'Structured reusable components with attention to typography and spacing.',
    ],
  },
  {
    period: '2022 — 2023',
    role: 'Graphics Designer & Digital Creator',
    org: 'Disolmedia',
    location: 'Cross River State, Nigeria',
    points: [
      'Created visual brand assets, video edits, and digital media for clients.',
      'Conducted practical computer literacy and design instruction.',
    ],
  },
]

/* ═══════════════════════════════════════════════════════════════
   BRAND LOGOS
   ═══════════════════════════════════════════════════════════════ */
const BRAND = {
  html5: siHtml5, css: siCss, sass: siSass, javascript: siJavascript,
  typescript: siTypescript, react: siReact, tailwindcss: siTailwindcss,
  vite: siVite, git: siGit, github: siGithub, eslint: siEslint,
  prettier: siPrettier, figma: siFigma, vercel: siVercel,
}

function hexLuminance(hex) {
  const c = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(x => (x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}
function contrastRatio(a, b) {
  const l1 = hexLuminance(a), l2 = hexLuminance(b)
  const [hi, lo] = l1 < l2 ? [l2, l1] : [l1, l2]
  return (hi + 0.05) / (lo + 0.05)
}
const BRAND_MIN_CONTRAST = 2.4
function readableBrandColor(hex, isDark = true, bg = isDark ? '#1E293B' : '#F1F5F9') {
  if (!hex) return isDark ? '#FFFFFF' : '#0F172A'
  return contrastRatio(hex, bg) >= BRAND_MIN_CONTRAST ? hex : (isDark ? '#FFFFFF' : '#0F172A')
}

const SKILL_GROUPS = [
  {
    icon: Code2,
    label: 'Languages & Styling',
    items: [
      { slug: 'html5', name: 'HTML5' },
      { slug: 'css', name: 'CSS3' },
      { slug: 'sass', name: 'Sass' },
      { slug: 'javascript', name: 'JavaScript' },
      { slug: 'typescript', name: 'TypeScript' },
    ],
  },
  {
    icon: Layers,
    label: 'Frameworks & Libraries',
    items: [
      { slug: 'react', name: 'React' },
      { slug: 'tailwindcss', name: 'Tailwind CSS' },
      { slug: 'framer-motion', name: 'Framer Motion', mono: 'FM' },
    ],
  },
  {
    icon: Wrench,
    label: 'Tools & Workflow',
    items: [
      { slug: 'git', name: 'Git' },
      { slug: 'github', name: 'GitHub' },
      { slug: 'vite', name: 'Vite' },
      { slug: 'eslint', name: 'ESLint' },
      { slug: 'prettier', name: 'Prettier' },
    ],
  },
  {
    icon: Rocket,
    label: 'Design & Platform',
    items: [
      { slug: 'figma', name: 'Figma' },
      { slug: 'vercel', name: 'Vercel' },
    ],
  },
]

const WHATSAPP_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.945c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.585 0 11.946-5.359 11.949-11.945a11.87 11.87 0 0 0-3.421-8.4'

/* ═══════════════════════════════════════════════════════════════
   ANIMATION HELPERS
   ═══════════════════════════════════════════════════════════════ */
const fadeUp = (delay = 0, distance = 28) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.65, ease, delay },
})

/* ═══════════════════════════════════════════════════════════════
   SHARED UI COMPONENTS
   ═══════════════════════════════════════════════════════════════ */
function Pill({ children, accent }) {
  const { T } = useTheme()
  const col = accent ? T.accent : T.muted
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      marginBottom: 20, padding: '5px 14px', borderRadius: 99,
      border: `1px solid ${col}35`, background: `${col}0C`,
      transition: 'border-color 0.25s, background-color 0.25s',
    }}>
      <span style={{ position: 'relative', width: 6, height: 6, flexShrink: 0,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ position: 'absolute', inset: 0, borderRadius: '50%',
          border: `1px solid ${col}`, animation: 'chipPing 2.4s ease-out infinite' }} />
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: col }} />
      </span>
      <span style={{ fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '0.3em',
        color: `${col}CC`, fontFamily: FONT_B, fontWeight: 600 }}>
        {children}
      </span>
    </div>
  )
}

function PrimaryBtn({ href, children, onClick }) {
  const { T } = useTheme()
  const [hov, setHov] = useState(false)
  const hoverBg = T.isDark ? '#0ea572' : '#047857'

  return (
    <a href={href} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 9,
        borderRadius: 10, padding: '13px 22px',
        background: hov ? hoverBg : T.accent,
        color: T.btnText,
        fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
        textTransform: 'uppercase', fontFamily: FONT_B, textDecoration: 'none',
        flexShrink: 0,
        boxShadow: hov ? `0 10px 32px ${T.accent}40` : `0 4px 16px ${T.accent}28`,
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)',
      }}>
      {children}
      <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true"
        style={{ flexShrink: 0, transform: hov ? 'translateX(3px)' : 'translateX(0)',
          transition: 'transform 0.22s cubic-bezier(0.22,1,0.36,1)' }} />
    </a>
  )
}

function GhostBtn({ href, children, onClick }) {
  const { T } = useTheme()
  const [hov, setHov] = useState(false)
  return (
    <a href={href} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        borderRadius: 10, padding: '13px 20px',
        border: `1px solid ${hov ? T.accent + '55' : T.borderSub}`,
        background: hov ? `${T.accent}0D` : 'transparent',
        color: hov ? (T.isDark ? T.white : T.accent) : T.muted,
        fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
        textTransform: 'uppercase', fontFamily: FONT_B, textDecoration: 'none',
        flexShrink: 0,
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)',
      }}>
      {children}
    </a>
  )
}

function SMBadge({ size = 34 }) {
  const { T } = useTheme()
  return (
    <span aria-hidden="true" style={{
      width: size, height: size, borderRadius: Math.round(size * 0.3),
      background: T.accent, color: T.btnText,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: FONT_H, fontWeight: 800, letterSpacing: '-0.02em',
      fontSize: Math.round(size * 0.38), lineHeight: 1, flexShrink: 0,
      transition: 'background-color 0.25s, color 0.25s',
    }}>
      SM
    </span>
  )
}

function SectionShell({ id, children, noBorder }) {
  const { T } = useTheme()
  return (
    <section id={id} style={{
      padding: 'clamp(72px,9vw,120px) 0',
      borderTop: noBorder ? 'none' : `1px solid ${T.border}`,
      transition: 'border-color 0.25s',
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 clamp(16px,4vw,32px)' }}>
        {children}
      </div>
    </section>
  )
}

function Label({ children }) {
  const { T } = useTheme()
  return (
    <p style={{
      fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.32em',
      color: T.accent, fontFamily: FONT_B, fontWeight: 600, marginBottom: 20,
    }}>
      {children}
    </p>
  )
}

function IconTile({ icon: Icon, size = 40 }) {
  const { T } = useTheme()
  return (
    <span aria-hidden="true" className="icon-tile" style={{
      width: size, height: size, borderRadius: 10, flexShrink: 0,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      border: `1px solid ${T.border}`,
      background: `${T.accent}14`,
      color: T.accent,
      transition: 'border-color 0.3s, transform 0.3s, background-color 0.3s',
    }}>
      <Icon size={Math.round(size * 0.48)} strokeWidth={1.9} />
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════════════ */
function Nav({ onNavigate }) {
  const { T } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const close = () => setOpen(false)

  const handleNavClick = (href, e) => {
    if (href.startsWith('#')) {
      if (window.location.pathname !== '/') {
        onNavigate('/' + href, e)
      }
    }
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
      style={{
        position: 'fixed', top: 16, left: 0, right: 0,
        zIndex: 9000, display: 'flex', justifyContent: 'center', pointerEvents: 'none',
      }}
    >
      <div style={{
        pointerEvents: 'all',
        width: 'calc(100% - 32px)', maxWidth: 1100,
        background: scrolled ? T.navBgScrolled : T.navBgTop,
        border: `1px solid ${scrolled ? T.borderSub : T.border}`,
        borderRadius: 14,
        backdropFilter: 'blur(20px)',
        boxShadow: scrolled
          ? T.isDark ? '0 20px 50px rgba(0,0,0,0.55)' : '0 16px 40px rgba(15,23,42,0.08)'
          : 'none',
        transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 18px' }}>
          <a
            href="/"
            onClick={(e) => onNavigate('/', e)}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}
            aria-label="Godswill Okoi — home"
          >
            <SMBadge size={30} />
            <span style={{ fontFamily: FONT_H, fontSize: 14, fontWeight: 700, color: T.white, letterSpacing: '-0.01em' }}>
              Godswill Okoi
            </span>
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="nav-desktop" aria-label="Primary">
              {NAV_LINKS.map(link => (
                <NavLink key={link.href} href={link.href} onClick={(e) => handleNavClick(link.href, e)}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <ThemeToggle />
              <PrimaryBtn href="#contact" onClick={(e) => handleNavClick('#contact', e)}>
                Let's Talk
              </PrimaryBtn>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="nav-mobile-bar">
            <ThemeToggle style={{ marginRight: 4 }} />
            <button onClick={() => setOpen(o => !o)} className="hamburger"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              style={{
                background: 'none', border: `1px solid ${open ? T.accentAlt : T.borderSub}`,
                borderRadius: 9, width: 38, height: 38, cursor: 'pointer', color: T.muted,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 0.25s, color 0.25s',
              }}>
              {open
                ? <X size={16} strokeWidth={2.2} aria-hidden="true" />
                : <Menu size={16} strokeWidth={2.2} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              key="mob"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.26, ease }}
              style={{ borderTop: `1px solid ${T.border}`, overflow: 'hidden' }}
            >
              <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {NAV_LINKS.map(link => (
                  <a key={link.href} href={link.href} onClick={(e) => { close(); handleNavClick(link.href, e); }}
                    style={{
                      padding: '11px 0', fontSize: 13, color: T.text, textDecoration: 'none',
                      fontFamily: FONT_B, borderBottom: `1px solid ${T.border}`,
                    }}>
                    {link.label}
                  </a>
                ))}

                <div style={{
                  padding: '12px 0 6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: `1px solid ${T.border}`,
                }}>
                  <span style={{ fontSize: 12, color: T.dim, fontFamily: FONT_B, fontWeight: 500 }}>
                    Theme:
                  </span>
                  <ThemeToggle showLabels />
                </div>

                <div style={{ marginTop: 12 }}>
                  <PrimaryBtn href="#contact" onClick={(e) => { close(); handleNavClick('#contact', e); }}>
                    Let's Talk
                  </PrimaryBtn>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

function NavLink({ href, children, onClick }) {
  const { T } = useTheme()
  const [hov, setHov] = useState(false)
  return (
    <a href={href} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: '8px 13px', fontSize: 11.5, letterSpacing: '0.03em',
        color: hov ? T.white : T.muted, textDecoration: 'none',
        borderRadius: 8, fontFamily: FONT_B, fontWeight: 500,
        transition: 'color 0.2s',
      }}>
      {children}
    </a>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  const { T } = useTheme()
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '8%'])

  return (
    <section id="top" ref={ref}
      style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
        paddingTop: 140, paddingBottom: 100, overflow: 'hidden',
      }}>
      {/* Subtle grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${T.gridLines} 1px,transparent 1px),linear-gradient(90deg,${T.gridLines} 1px,transparent 1px)`,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)',
        }} />
        <div style={{
          position: 'absolute', top: '-10%', left: '-8%', width: '55%', height: '65%',
          background: `radial-gradient(ellipse, ${T.heroGlow1}, transparent 65%)`,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-8%', right: '-5%', width: '45%', height: '55%',
          background: `radial-gradient(ellipse, ${T.heroGlow2}, transparent 65%)`,
          pointerEvents: 'none',
        }} />
      </div>

      <motion.div style={{ y: yParallax, position: 'relative', zIndex: 10, width: '100%',
        maxWidth: 1160, margin: '0 auto', padding: '0 clamp(16px,4vw,32px)' }}>
        <div className="hero-grid">
          <div>
            <motion.div {...fadeUp(0.05)} style={{ marginBottom: 0 }}>
              <Pill accent>● Available for Business Websites &amp; Landing Pages</Pill>
            </motion.div>

            <motion.div {...fadeUp(0.15)} style={{ marginBottom: 24 }}>
              <h1 style={{
                fontFamily: FONT_H, fontSize: 'clamp(1.9rem,5.5vw,3.6rem)', fontWeight: 800,
                lineHeight: 1.05, letterSpacing: '-0.03em', color: T.white, maxWidth: 700,
              }}>
                I design and build websites that make growing businesses{' '}
                <span style={{ color: T.accent }}>look legit.</span>
              </h1>
            </motion.div>

            <motion.p {...fadeUp(0.25)}
              style={{
                fontSize: 'clamp(14px,1.55vw,16px)', lineHeight: 1.85, color: T.muted,
                maxWidth: 540, marginBottom: 36, fontFamily: FONT_B,
              }}>
              Hi, I'm Godswill (Smart Moses). I'm a web designer and frontend developer turning
              Figma designs, messy ideas, and outdated pages into clean, fast, mobile-friendly
              websites that build trust and drive inquiries.
            </motion.p>

            <motion.div {...fadeUp(0.32)} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
              <PrimaryBtn href="#work">View My Work</PrimaryBtn>
              <GhostBtn href="#contact">Let's Talk About Your Project</GhostBtn>
            </motion.div>

            <motion.p {...fadeUp(0.4)}
              style={{
                fontSize: 11, color: T.dim, fontFamily: FONT_B,
                letterSpacing: '0.02em', fontStyle: 'italic',
              }}>
              No bloated templates. No excuses. Just clean, responsive code.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            whileHover={{ y: -6 }}
            style={{ position: 'relative' }}
          >
            <div style={{
              position: 'relative', borderRadius: 18, overflow: 'hidden',
              border: `1px solid ${T.border}`,
              background: T.bgMid,
              boxShadow: T.cardShadow,
              transition: 'box-shadow 0.3s, border-color 0.3s',
            }}>
              <img src="/images/me.jpeg" alt="Godswill Okoi — Web Designer and Frontend Developer"
                style={{
                  width: '100%', height: 'clamp(340px,40vw,440px)',
                  objectFit: 'cover', objectPosition: 'top center', display: 'block',
                }} />
              <div style={{
                padding: '16px 20px', borderTop: `1px solid ${T.border}`,
                background: T.bgMid,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
              }}>
                <div>
                  <p style={{ fontFamily: FONT_H, fontSize: 13.5, fontWeight: 700, color: T.white, lineHeight: 1.2 }}>
                    Godswill Okoi
                  </p>
                  <p style={{
                    fontSize: 8.5, color: T.dim, textTransform: 'uppercase',
                    letterSpacing: '0.22em', marginTop: 4, fontFamily: FONT_B,
                  }}>
                    Web Designer &amp; Frontend Developer
                  </p>
                </div>
                <SMBadge size={32} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.a href="#work" aria-label="Scroll to work"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.7 }}
        whileHover={{ y: 3 }}
        style={{
          position: 'absolute', bottom: 32, left: '50%', marginLeft: -22, zIndex: 10,
          width: 44, height: 44, borderRadius: '50%', display: 'flex',
          alignItems: 'center', justifyContent: 'center', color: T.muted,
          border: `1px solid ${T.borderSub}`,
          background: T.isDark ? 'rgba(9,13,22,0.5)' : 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(10px)', textDecoration: 'none',
        }}>
        <ChevronDown size={18} strokeWidth={2} aria-hidden="true"
          style={{ animation: 'bounceDown 2.2s ease-in-out infinite' }} />
      </motion.a>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   WORK (FEATURED PROJECTS: RAYTO, VISTA, AZAWIRE)
   ═══════════════════════════════════════════════════════════════ */
function Work({ onNavigate }) {
  const { T } = useTheme()
  return (
    <SectionShell id="work">
      <motion.div {...fadeUp()} style={{ marginBottom: 'clamp(40px,5vw,64px)' }}>
        <Label>Selected Work</Label>
        <h2 style={{
          fontFamily: FONT_H, fontSize: 'clamp(1.7rem,4vw,2.8rem)',
          lineHeight: 1.07, letterSpacing: '-0.03em', color: T.white, maxWidth: 680,
        }}>
          Featured client and commissioned work.
        </h2>
        <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.9, maxWidth: 540,
          fontFamily: FONT_B, marginTop: 16 }}>
          Real projects demonstrating business understanding, design-to-code implementation,
          and production frontend development.
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(56px,8vw,100px)' }}>
        {PROJECTS.map((project, idx) => (
          <ProjectEntry key={project.slug} project={project} index={idx} onNavigate={onNavigate} />
        ))}
      </div>
    </SectionShell>
  )
}

function ProjectEntry({ project: p, index: i, onNavigate }) {
  const { T } = useTheme()
  const flip = i % 2 === 1

  const handleCaseStudyClick = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    onNavigate(`/work/${p.slug}`)
  }

  return (
    <motion.article {...fadeUp(0.05)} className={`project-entry${flip ? ' is-flipped' : ''}`}>
      {/* Media Mockup */}
      <motion.div className="project-media"
        initial={{ opacity: 0, scale: 1.02 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.85, ease }}>
        <a
          href={`/work/${p.slug}`}
          onClick={handleCaseStudyClick}
          aria-label={`View case study for ${p.name}`}
          style={{
            display: 'block', position: 'relative', aspectRatio: '16/10',
            borderRadius: 14, overflow: 'hidden', border: `1px solid ${T.border}`,
            background: T.bgMid,
            boxShadow: T.cardShadow,
            transition: 'border-color 0.25s, box-shadow 0.25s',
          }}>
          <img
            src={p.image}
            alt={p.imageAlt}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <span className="project-veil" style={{ background: T.projectVeil }} />
        </a>
        <span className="project-index" aria-hidden="true">{p.num}</span>
      </motion.div>

      {/* Body Details */}
      <motion.div className="project-body" {...fadeUp(0.12)}>
        <p className="project-meta">
          <span>{p.category}</span>
          <span className="project-dot" aria-hidden="true" />
          <span>{p.num === '01' ? 'Featured' : p.num === '02' ? 'Design-to-Code' : 'Multi-Page'}</span>
        </p>

        <h3 className="project-title">
          <a
            href={`/work/${p.slug}`}
            onClick={handleCaseStudyClick}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {p.name}
          </a>
        </h3>

        <p style={{
          fontSize: 14,
          lineHeight: 1.85,
          color: T.muted,
          fontFamily: FONT_B,
          marginBottom: 18,
        }}>
          {p.description}
        </p>

        <div className="project-contrib">
          <p className="project-contrib-label">My Role</p>
          <p className="project-contrib-text">{p.role}</p>
        </div>

        <div style={{ marginBottom: 22 }}>
          <ul className="project-tech">
            {p.stack.map(t => <li key={t}>{t}</li>)}
          </ul>
        </div>

        <div className="project-foot">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <a
              href={`/work/${p.slug}`}
              onClick={handleCaseStudyClick}
              className="project-link-primary"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '10px 18px', borderRadius: 8,
                background: T.accent, color: T.btnText,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
                textTransform: 'uppercase', textDecoration: 'none',
                boxShadow: `0 4px 14px ${T.accent}28`,
                transition: 'all 0.2s ease',
              }}
            >
              <span>Read Case Study</span>
              <ArrowRight size={13} strokeWidth={2.5} aria-hidden="true" />
            </a>

            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-ghost"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '9px 14px', borderRadius: 8,
                border: `1px solid ${T.borderSub}`, color: T.text,
                fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
                textTransform: 'uppercase', textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <Globe size={13} aria-hidden="true" />
              <span>Live Website</span>
              <ArrowUpRight size={13} strokeWidth={2.4} aria-hidden="true" />
            </a>

            <a
              href={p.source}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-ghost"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '9px 14px', borderRadius: 8,
                border: `1px solid ${T.borderSub}`, color: T.muted,
                fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
                textTransform: 'uppercase', textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <Code2 size={13} aria-hidden="true" />
              <span>Source</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════════════════════════ */
function Services() {
  const { T } = useTheme()
  return (
    <SectionShell id="services">
      <motion.div {...fadeUp()} style={{ marginBottom: 'clamp(40px,5vw,60px)' }}>
        <Label>What I Offer</Label>
        <h2 style={{
          fontFamily: FONT_H, fontSize: 'clamp(1.7rem,4vw,2.8rem)',
          lineHeight: 1.07, letterSpacing: '-0.03em', color: T.white,
        }}>
          Three services. One focus.
        </h2>
      </motion.div>

      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <motion.div key={s.num} {...fadeUp(i * 0.08)}
            whileHover={{ y: -4 }}
            className="service-card"
            style={{
              padding: 'clamp(24px,3vw,32px)',
              borderRadius: 14, border: `1px solid ${T.borderSub}`,
              background: T.bgMid,
              display: 'flex', flexDirection: 'column', gap: 16,
              transition: 'all 0.28s ease',
            }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <p style={{
                fontFamily: 'monospace', fontSize: 11, color: T.accent,
                letterSpacing: '0.12em', fontWeight: 600,
              }}>{s.num}</p>
            </div>
            <h3 style={{
              fontFamily: FONT_H, fontSize: 'clamp(1rem,1.9vw,1.2rem)',
              fontWeight: 700, color: T.white, lineHeight: 1.3, letterSpacing: '-0.02em',
            }}>
              {s.title}
            </h3>
            <p style={{ fontSize: 13.5, color: T.muted, lineHeight: 1.85, fontFamily: FONT_B, flexGrow: 1 }}>
              {s.body}
            </p>
            <ul style={{
              listStyle: 'none', margin: 0, padding: 0,
              display: 'flex', flexWrap: 'wrap', gap: 7,
            }}>
              {s.deliverables.map(d => (
                <li key={d} style={{
                  fontSize: 10, fontFamily: FONT_B, fontWeight: 500,
                  color: T.dim, border: `1px solid ${T.border}`,
                  background: T.codeTagBg,
                  borderRadius: 6, padding: '4px 9px',
                }}>{d}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PHILOSOPHY
   ═══════════════════════════════════════════════════════════════ */
function Philosophy() {
  const { T } = useTheme()
  const standards = [
    {
      label: "I don't do average:",
      text: 'Your online presence is directly tied to my reputation as a developer, and I take that seriously.',
    },
    {
      label: 'Zero black-box communication:',
      text: 'Honest timelines, clean milestone updates, and clear technical advice.',
    },
    {
      label: 'Design meets execution:',
      text: 'Because I understand both visual design and frontend markup, what you approve in design is exactly how it behaves in the browser.',
    },
  ]

  return (
    <SectionShell id="philosophy">
      <div className="philosophy-grid">
        <motion.div {...fadeUp()}>
          <Label>How I Work</Label>
          <h2 style={{
            fontFamily: FONT_H, fontSize: 'clamp(1.8rem,4vw,2.9rem)',
            lineHeight: 1.06, letterSpacing: '-0.03em', color: T.white, marginBottom: 0,
          }}>
            Most business websites fail at the basics.
          </h2>
        </motion.div>

        <motion.div {...fadeUp(0.12)} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <p style={{ fontSize: 14.5, color: T.muted, lineHeight: 1.9, fontFamily: FONT_B }}>
            They either look broken on mobile screens, take forever to load, or make an established
            brand look like an amateur operation.
          </p>
          <p style={{ fontSize: 14.5, color: T.muted, lineHeight: 1.9, fontFamily: FONT_B }}>
            When you hire me, you aren't just getting someone who types HTML, CSS, and modern
            JavaScript. You get a builder who understands that your site exists to do one job: give
            your business instant credibility and make it frictionless for visitors to become paying
            clients.
          </p>

          <div style={{
            borderRadius: 14, border: `1px solid ${T.borderSub}`,
            background: T.surface, padding: 'clamp(20px,3vw,28px)',
            display: 'flex', flexDirection: 'column', gap: 20,
            transition: 'background-color 0.25s, border-color 0.25s',
          }}>
            {standards.map((s, i) => (
              <motion.div key={i} {...fadeUp(0.06 * i)} style={{ display: 'flex', gap: 14 }}>
                <CheckCircle2 size={17} strokeWidth={2} aria-hidden="true"
                  style={{ color: T.accent, flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: 13.5, color: T.muted, lineHeight: 1.85, fontFamily: FONT_B, margin: 0 }}>
                  <strong style={{ color: T.white, fontWeight: 600 }}>{s.label}</strong>{' '}{s.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionShell>
  )
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════════════════════ */
function About() {
  const { T } = useTheme()
  return (
    <SectionShell id="about">
      <div className="two-col">
        <div className="sticky-col">
          <motion.div {...fadeUp()}>
            <Label>About</Label>
            <h2 style={{
              fontFamily: FONT_H, fontSize: 'clamp(1.7rem,3.8vw,2.6rem)',
              lineHeight: 1.08, letterSpacing: '-0.03em', color: T.white,
            }}>
              Design mindset.{' '}
              <span style={{ color: T.dim }}>Frontend execution.</span>
            </h2>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.1)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            "I'm Godswill Okoi (Smart Moses). I'm a web designer and frontend developer based in Nigeria, focused on building websites that are clean, fast, and genuinely useful to the businesses they represent.",
            "My background spans visual communication, graphic design, and video production before narrowing into frontend development. That breadth shows up in how I approach projects: understanding the business need, structuring content clearly, and executing the build without losing the design intent along the way.",
            "I don't pitch myself as a senior backend software architect. My core strength is frontend development: semantic HTML, clean CSS, React-based interfaces, and the kind of mobile-first responsiveness that doesn't feel like an afterthought.",
            "When I take on a project, I'm thinking about what a visitor actually needs to see within the first five seconds — and building toward that. Because a site that doesn't build trust or communicate clearly isn't doing its job.",
          ].map((para, i) => (
            <p key={i} style={{
              fontSize: 14, color: i === 0 ? T.text : T.muted, lineHeight: 1.95,
              maxWidth: 600, fontFamily: FONT_B,
            }}>
              {para}
            </p>
          ))}

          <div style={{ marginTop: 20 }}>
            <Label>Experience</Label>
            <ol className="timeline" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {EXPERIENCE.map((job, i) => (
                <motion.li key={job.role + job.org} {...fadeUp(0.05 * i)} className="timeline-row">
                  <div className="timeline-rail" aria-hidden="true">
                    <span className="timeline-node" />
                  </div>
                  <div className="timeline-period">{job.period}</div>
                  <div className="timeline-body">
                    <h3 className="timeline-role">{job.role}</h3>
                    <p className="timeline-org">
                      {job.org}
                      {job.location && <span className="timeline-org-sep" aria-hidden="true">·</span>}
                      {job.location && <span className="timeline-loc">{job.location}</span>}
                    </p>
                    <ul className="timeline-points">
                      {job.points.map(pt => <li key={pt}>{pt}</li>)}
                    </ul>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  )
}

/* ═══════════════════════════════════════════════════════════════
   TECH SKILLS
   ═══════════════════════════════════════════════════════════════ */
function TechTile({ slug, name, mono }) {
  const { T } = useTheme()
  const [hov, setHov] = useState(false)
  const brand = BRAND[slug]
  const col = brand ? readableBrandColor(brand.hex, T.isDark) : T.dim

  return (
    <div className="tech-tile"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        borderColor: hov ? `${col}55` : T.border,
        boxShadow: hov ? `0 0 18px ${col}20` : 'none',
        background: T.codeTagBg,
      }}>
      <span className="tech-mark" style={{
        color: col,
        background: hov ? `${col}1A` : (T.isDark ? 'rgba(255,255,255,0.04)' : 'rgba(15,23,42,0.04)'),
      }}>
        {brand
          ? <svg viewBox="0 0 24 24" role="img" aria-label={name}><path d={brand.path} fill="currentColor" /></svg>
          : <span className="tech-mono" style={{ fontFamily: FONT_H,
              fontSize: (mono || '').length > 2 ? 8 : 9.5,
              fontWeight: 800, letterSpacing: '0.02em' }}>{mono}</span>}
      </span>
      <span className="tech-name">{name}</span>
    </div>
  )
}

function Skills() {
  const { T } = useTheme()
  return (
    <SectionShell id="skills">
      <motion.div {...fadeUp()} style={{ marginBottom: 'clamp(36px,5vw,56px)' }}>
        <Label>Technical Skills</Label>
        <h2 style={{
          fontFamily: FONT_H, fontSize: 'clamp(1.6rem,3.5vw,2.5rem)',
          lineHeight: 1.08, letterSpacing: '-0.03em', color: T.white,
        }}>
          The tools I build with.
        </h2>
      </motion.div>
      <div className="skill-groups">
        {SKILL_GROUPS.map((g, i) => (
          <motion.div key={g.label} {...fadeUp(i * 0.07)}
            whileHover={{ y: -2 }}
            className="skill-card"
            style={{
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              background: T.bgMid,
              transition: 'background-color 0.25s, border-color 0.25s',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <IconTile icon={g.icon} size={26} />
              <p style={{ fontSize: 8.5, textTransform: 'uppercase', letterSpacing: '0.24em',
                color: T.accent, fontFamily: FONT_B, fontWeight: 600 }}>
                {g.label}
              </p>
            </div>
            <div className="tech-grid">
              {g.items.map(item => (
                <TechTile key={item.slug} slug={item.slug} name={item.name} mono={item.mono} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT / CTA
   ═══════════════════════════════════════════════════════════════ */
function Contact() {
  const { T } = useTheme()
  return (
    <SectionShell id="contact">
      <motion.div {...fadeUp()}
        style={{
          position: 'relative', borderRadius: 20, overflow: 'hidden',
          padding: 'clamp(36px,6vw,72px)',
          border: `1px solid ${T.accent}35`,
          background: T.bgMid,
          boxShadow: T.cardShadow,
          transition: 'all 0.3s ease',
        }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(${T.gridLines} 1px,transparent 1px),linear-gradient(90deg,${T.gridLines} 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)',
        }} />
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%', width: '50%', height: '80%',
          background: `radial-gradient(ellipse, ${T.contactGlow}, transparent 65%)`,
          pointerEvents: 'none',
        }} />

        <div className="cta-grid" style={{ position: 'relative' }}>
          <div>
            <Label>Let's Build</Label>
            <h2 style={{
              fontFamily: FONT_H, fontSize: 'clamp(1.8rem,4.2vw,3rem)',
              lineHeight: 1.03, letterSpacing: '-0.04em', color: T.white, marginBottom: 18,
            }}>
              Got a website to build or a page to fix?
            </h2>
            <p style={{
              fontSize: 14, color: T.muted, lineHeight: 1.9, maxWidth: 460, fontFamily: FONT_B,
              marginBottom: 28,
            }}>
              Whether you need a dedicated business website, a landing page conversion, or a Figma design
              turned into working code — let's discuss your project.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              <PrimaryBtn href={`mailto:${EMAIL}`}>Send Me a Message</PrimaryBtn>
              <GhostBtn href={WHATSAPP_URL}>WhatsApp</GhostBtn>
            </div>
          </div>

          <div style={{
            padding: 'clamp(20px,3vw,28px)', borderRadius: 14,
            border: `1px solid ${T.borderSub}`, background: T.contactBoxBg,
            display: 'flex', flexDirection: 'column', gap: 18,
            transition: 'background-color 0.25s, border-color 0.25s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <Mail size={13} strokeWidth={2} aria-hidden="true" style={{ color: T.accent }} />
              <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.28em',
                color: T.dim, fontFamily: FONT_B }}>Email</p>
            </div>
            <a href={`mailto:${EMAIL}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                fontFamily: FONT_B, fontSize: 'clamp(0.9rem,1.9vw,1.1rem)', fontWeight: 600,
                color: T.accent, textDecoration: 'none', wordBreak: 'break-all',
              }}>
              {EMAIL}
              <ArrowUpRight size={14} strokeWidth={2.4} aria-hidden="true" style={{ flexShrink: 0 }} />
            </a>
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 18, display: 'flex',
              flexDirection: 'column', gap: 12 }}>
              {[
                { icon: Target,   label: 'Focus',      value: 'Web Design & Frontend Dev' },
                { icon: MapPin,   label: 'Based in',    value: 'Nigeria' },
                { icon: Sparkles, label: 'Engagements', value: 'Freelance & Contract' },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <row.icon size={13} strokeWidth={2} aria-hidden="true"
                    style={{ color: T.dim, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: T.dim, fontFamily: FONT_B,
                    flexShrink: 0, width: 88 }}>{row.label}</span>
                  <span style={{ fontSize: 11, color: T.text, fontFamily: FONT_B,
                    fontWeight: 500, textAlign: 'right', flexGrow: 1 }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  )
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */
function Footer({ onNavigate }) {
  const { T } = useTheme()

  const handleNav = (href, e) => {
    if (href.startsWith('#')) {
      if (window.location.pathname !== '/') {
        onNavigate('/' + href, e)
      }
    }
  }

  return (
    <footer style={{ borderTop: `1px solid ${T.border}`, padding: '44px clamp(16px,4vw,32px)', transition: 'border-color 0.25s' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div className="footer-grid" style={{ marginBottom: 36 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <SMBadge size={28} />
              <p style={{ fontFamily: FONT_H, fontSize: 14, fontWeight: 700, color: T.white,
                letterSpacing: '-0.01em' }}>
                Godswill Okoi
              </p>
            </div>
            <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.85, maxWidth: 300, fontFamily: FONT_B }}>
              Web Designer &amp; Frontend Developer — building clean, responsive websites for
              growing businesses.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div>
              <p style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.3em',
                color: T.dim, marginBottom: 14, fontFamily: FONT_B }}>Navigate</p>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {NAV_LINKS.map(link => (
                  <FooterLink key={link.href} href={link.href} onClick={(e) => handleNav(link.href, e)}>
                    {link.label}
                  </FooterLink>
                ))}
              </nav>
            </div>
            <div>
              <p style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.3em',
                color: T.dim, marginBottom: 14, fontFamily: FONT_B }}>Connect</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <FooterLink href={`mailto:${EMAIL}`}>{EMAIL}</FooterLink>
                <FooterLink href={GITHUB_URL}>GitHub</FooterLink>
                <FooterLink href={WHATSAPP_URL}>WhatsApp</FooterLink>
              </div>
            </div>
          </div>
        </div>
        <div style={{
          paddingTop: 22, borderTop: `1px solid ${T.border}`,
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 14,
        }}>
          <p style={{ fontSize: 10, color: T.dim, fontFamily: FONT_B }}>
            © {new Date().getFullYear()} Godswill Okoi. All rights reserved.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 10, color: T.dim, fontFamily: FONT_B }}>Theme:</span>
            <ThemeToggle showLabels />
          </div>

          <p style={{ fontSize: 10, color: T.dim, fontFamily: FONT_B }}>
            Web Designer &amp; Frontend Developer
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children, onClick }) {
  const { T } = useTheme()
  const [hov, setHov] = useState(false)
  return (
    <a href={href} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        fontSize: 12, color: hov ? T.accent : T.muted, textDecoration: 'none',
        fontFamily: FONT_B, transition: 'color 0.2s', wordBreak: 'break-all',
      }}>
      {children}
    </a>
  )
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING WHATSAPP
   ═══════════════════════════════════════════════════════════════ */
function FloatingContact() {
  const reduced = useReducedMotion()
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank" rel="noopener noreferrer"
      aria-label="WhatsApp — opens chat in a new tab"
      title="Chat on WhatsApp"
      className="float-btn"
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 999,
        width: 54, height: 54, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(145deg, #5BF07A 0%, #25D366 55%, #14A85A 100%)',
        color: '#fff', textDecoration: 'none',
        boxShadow: '0 10px 28px rgba(0,0,0,0.35), 0 0 0 1px rgba(37,211,102,0.4)',
        animation: reduced ? 'none' : 'float 3s ease-in-out infinite',
      }}>
      <span aria-hidden="true" style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'linear-gradient(145deg, #5BF07A 0%, #25D366 55%, #14A85A 100%)',
        animation: 'ringPing 3s ease-out infinite',
      }} />
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"
        style={{ position: 'relative', zIndex: 1 }}>
        <path d={WHATSAPP_PATH} />
      </svg>
    </a>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE CONTENT ROUTER
   ═══════════════════════════════════════════════════════════════ */
function MainContent() {
  const { T } = useTheme()
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname
    }
    return '/'
  })

  useEffect(() => {
    const onPop = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigateTo = (url, e) => {
    if (e && e.preventDefault) e.preventDefault()
    if (typeof window !== 'undefined') {
      if (url.startsWith('/#') || url.startsWith('#')) {
        const hash = url.startsWith('/#') ? url.substring(1) : url
        if (window.location.pathname !== '/') {
          window.history.pushState(null, '', '/' + hash)
          setCurrentPath('/')
          setTimeout(() => {
            const el = document.querySelector(hash)
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }, 80)
        } else {
          window.history.pushState(null, '', hash)
          const el = document.querySelector(hash)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }
        return
      }

      window.history.pushState(null, '', url)
      setCurrentPath(url)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Check if viewing a case study
  const isCaseStudy = currentPath.startsWith('/work/')
  let caseStudyProject = null
  if (isCaseStudy) {
    const slug = currentPath.replace(/^\/work\/?/, '').replace(/\/$/, '')
    caseStudyProject = PROJECTS.find(p => p.slug === slug) || PROJECTS[0]
  }

  const showPricing = currentPath.endsWith('/pricingpage')

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; background-color: ${T.bg}; }
        body {
          background: ${T.bg};
          color: ${T.text};
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
          transition: background-color 0.25s ease, color 0.25s ease;
        }
        img { max-width: 100%; display: block; }
        a { text-decoration: none; }
        h1, h2, h3 { font-family: 'Plus Jakarta Sans', sans-serif; }
        ::selection { background: ${T.accent}38; color: ${T.isDark ? '#fff' : '#0F172A'}; }

        /* Ambient keyframes */
        @keyframes chipPing {
          0%   { transform: scale(1);   opacity: 0.8; }
          70%  { transform: scale(2.5); opacity: 0;   }
          100% { transform: scale(2.5); opacity: 0;   }
        }
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0);   }
          50%      { transform: translateY(5px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0);    }
          50%      { transform: translateY(-7px); }
        }
        @keyframes ringPing {
          0%   { transform: scale(1);   opacity: 0.45; }
          70%  { transform: scale(1.75); opacity: 0;   }
          100% { transform: scale(1.75); opacity: 0;   }
        }

        /* Float button */
        .float-btn { transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s; }
        .float-btn:hover { transform: scale(1.1) translateY(-3px) !important; }
        .float-btn:active { transform: scale(0.96) !important; }

        /* Skill cards */
        .skill-card { padding: 14px; transition: background-color 0.25s, border-color 0.25s; }
        .skill-card:hover { border-color: ${T.accent}44; background: ${T.surface}; }
        .skill-card:hover .icon-tile { border-color: ${T.accent}44; transform: scale(1.06) rotate(-2deg); }
        @media (min-width: 640px) { .skill-card { padding: 20px; } }

        /* Service cards */
        .service-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s, background-color 0.25s; }
        .service-card:hover {
          border-color: ${T.accent}44;
          box-shadow: ${T.isDark ? '0 18px 42px rgba(0,0,0,0.32), 0 0 0 1px ' + T.accent + '22' : '0 16px 36px rgba(15,23,42,0.06), 0 0 0 1px ' + T.accent + '33'};
        }

        :focus-visible {
          outline: 2px solid ${T.accent};
          outline-offset: 3px;
          border-radius: 4px;
        }

        /* HERO GRID */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (min-width: 900px) {
          .hero-grid { grid-template-columns: 1.2fr 0.8fr; gap: 72px; }
        }

        /* PHILOSOPHY GRID */
        .philosophy-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (min-width: 900px) {
          .philosophy-grid { grid-template-columns: 0.9fr 1.1fr; gap: 72px; }
        }

        /* SERVICES GRID */
        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 680px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 960px) {
          .services-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* TWO-COL (About) */
        .two-col { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: start; }
        @media (min-width: 900px) { .two-col { grid-template-columns: 0.85fr 1.15fr; gap: 72px; } }
        .sticky-col { position: static; }
        @media (min-width: 900px) { .sticky-col { position: sticky; top: 110px; } }

        /* SKILL GROUPS */
        .skill-groups { display: flex; flex-direction: column; gap: 8px; }
        @media (min-width: 640px) { .skill-groups { gap: 10px; } }

        /* TECH TILES */
        .tech-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 6px; }
        @media (min-width: 640px) { .tech-grid { grid-template-columns: repeat(auto-fill, minmax(148px, 1fr)); gap: 7px; } }
        .tech-tile {
          display: flex; flex-direction: row; align-items: center;
          gap: 8px; padding: 7px 10px 7px 7px; min-width: 0;
          border: 1px solid ${T.border}; border-radius: 9px;
          transition: border-color 0.25s, box-shadow 0.25s, background-color 0.25s;
        }
        .tech-tile:hover {
          background: ${T.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.05)'};
        }
        @media (min-width: 640px) { .tech-tile { padding: 8px 12px 8px 8px; gap: 9px; } }
        .tech-mark {
          width: 24px; height: 24px; flex-shrink: 0; border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          transition: background-color 0.25s;
        }
        @media (min-width: 640px) { .tech-mark { width: 27px; height: 27px; } }
        .tech-mark svg { display: block; width: 14px; height: 14px; }
        @media (min-width: 640px) { .tech-mark svg { width: 16px; height: 16px; } }
        .tech-mono { display: block; line-height: 1; }
        .tech-name {
          font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 500;
          color: ${T.muted}; text-align: left; line-height: 1.25;
          min-width: 0; overflow-wrap: anywhere; transition: color 0.25s;
        }
        @media (min-width: 640px) { .tech-name { font-size: 11px; } }
        .tech-tile:hover .tech-name { color: ${T.white}; }

        /* PROJECT ENTRIES */
        .project-entry {
          display: grid; grid-template-columns: 1fr; gap: 32px; align-items: center;
        }
        @media (min-width: 900px) {
          .project-entry { grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); gap: 56px; }
          .project-entry.is-flipped { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); }
          .project-entry.is-flipped .project-media { order: 2; }
          .project-entry.is-flipped .project-body { order: 1; }
        }
        .project-media { position: relative; min-width: 0; }
        .project-veil {
          position: absolute; inset: 0; pointer-events: none;
          transition: background 0.5s ease;
        }
        .project-media a:hover .project-veil {
          background: linear-gradient(180deg, ${T.accent}0A 0%, ${T.accent}1A 100%);
        }
        .project-media img {
          transition: transform 0.85s cubic-bezier(0.22,1,0.36,1), filter 0.5s;
          filter: saturate(${T.isDark ? '0.88' : '0.96'}) contrast(1.02);
        }
        .project-media a:hover img { transform: scale(1.035); filter: saturate(1) contrast(1.04); }
        .project-index {
          position: absolute; top: 14px; left: 16px;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px;
          font-weight: 700; letter-spacing: 0.2em; color: rgba(255,255,255,0.7);
          text-shadow: 0 2px 12px rgba(0,0,0,0.7); pointer-events: none;
        }
        .project-body { min-width: 0; }
        .project-meta {
          display: flex; align-items: center; gap: 10px;
          font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.24em;
          font-weight: 600; color: ${T.accent}; margin-bottom: 12px; font-family: 'Inter', sans-serif;
        }
        .project-dot { width: 3px; height: 3px; border-radius: 50%; background: ${T.dim}; flex-shrink: 0; }
        .project-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(1.4rem, 2.8vw, 2.1rem);
          font-weight: 700; line-height: 1.12; letter-spacing: -0.03em;
          color: ${T.white}; margin-bottom: 14px;
        }
        .project-title a:hover { color: ${T.accent}; }
        .project-contrib {
          border-left: 2px solid ${T.accent}; padding-left: 14px; margin-bottom: 20px;
        }
        .project-contrib-label {
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.24em;
          font-weight: 600; color: ${T.dim}; margin-bottom: 4px; font-family: 'Inter', sans-serif;
        }
        .project-contrib-text {
          font-family: 'Inter', sans-serif; font-size: 12.5px; line-height: 1.75; color: ${T.text};
        }
        .project-foot {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
        }
        .project-tech {
          display: flex; flex-wrap: wrap; gap: 6px; list-style: none; margin: 0; padding: 0;
        }
        .project-tech li {
          font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: 0.06em; color: ${T.dim};
          border: 1px solid ${T.border}; border-radius: 6px; padding: 4px 9px; white-space: nowrap;
          background: ${T.codeTagBg};
        }
        .project-link-primary:hover {
          filter: brightness(1.08);
          transform: translateY(-2px);
        }
        .project-link-ghost:hover {
          border-color: ${T.accent} !important;
          color: ${T.white} !important;
          transform: translateY(-2px);
        }

        /* TIMELINE */
        .timeline { list-style: none; margin: 0; padding: 0; }
        .timeline-row {
          display: grid; grid-template-columns: 1fr; gap: 6px 24px; padding-bottom: 36px;
        }
        @media (min-width: 860px) {
          .timeline-row { grid-template-columns: 18px 148px minmax(0, 1fr); gap: 0 24px; }
        }
        .timeline-row:last-child { padding-bottom: 0; }
        .timeline-rail { position: relative; display: none; }
        @media (min-width: 860px) { .timeline-rail { display: block; } }
        .timeline-rail::before {
          content: ''; position: absolute; left: 50%; top: 6px; bottom: -36px;
          width: 1px; background: ${T.border}; transform: translateX(-50%);
        }
        .timeline-row:last-child .timeline-rail::before { display: none; }
        .timeline-node {
          position: absolute; left: 50%; top: 5px;
          width: 8px; height: 8px; border-radius: 50%;
          background: ${T.accent}; transform: translateX(-50%);
          box-shadow: 0 0 0 3px ${T.accent}28;
        }
        .timeline-period {
          font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase; color: ${T.accent}; padding-top: 1px;
        }
        .timeline-role {
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(1rem, 2vw, 1.2rem);
          font-weight: 700; line-height: 1.25; letter-spacing: -0.02em; color: ${T.white}; margin-bottom: 6px;
        }
        .timeline-org {
          font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500;
          color: ${T.text}; margin-bottom: 12px;
        }
        .timeline-org-sep { margin: 0 7px; color: ${T.dim}; }
        .timeline-loc { color: ${T.dim}; font-weight: 400; }
        .timeline-points { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
        .timeline-points li {
          position: relative; padding-left: 14px;
          font-family: 'Inter', sans-serif; font-size: 12px; line-height: 1.8; color: ${T.muted}; max-width: 600px;
        }
        .timeline-points li::before {
          content: ''; position: absolute; left: 0; top: 9px;
          width: 5px; height: 1px; background: ${T.accent}; opacity: 0.65;
        }

        /* CTA GRID */
        .cta-grid { display: grid; grid-template-columns: 1fr; gap: 36px; align-items: center; }
        @media (min-width: 900px) { .cta-grid { grid-template-columns: 1.3fr 0.7fr; gap: 52px; } }

        /* FOOTER GRID */
        .footer-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
        @media (min-width: 720px) { .footer-grid { grid-template-columns: 1.4fr 1fr; } }

        /* NAV responsive */
        .nav-desktop { display: flex; align-items: center; gap: 2px; }
        .hamburger { display: none !important; }
        .nav-mobile-bar { display: none !important; }
        @media (max-width: 860px) {
          .nav-desktop { display: none !important; }
          .hamburger { display: flex !important; }
          .nav-mobile-bar { display: flex !important; }
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
      ) : isCaseStudy ? (
        <div style={{ position: 'relative', minHeight: '100vh', background: T.bg, transition: 'background-color 0.25s' }}>
          <ProjectCaseStudy
            project={caseStudyProject}
            onNavigate={navigateTo}
            ThemeToggle={ThemeToggle}
          />
          <Footer onNavigate={navigateTo} />
          <FloatingContact />
        </div>
      ) : (
        <div style={{ position: 'relative', minHeight: '100vh', background: T.bg, transition: 'background-color 0.25s' }}>
          <Nav onNavigate={navigateTo} />
          <Hero />
          <Work onNavigate={navigateTo} />
          <Services />
          <Philosophy />
          <About />
          <Skills />
          <Contact />
          <Footer onNavigate={navigateTo} />
          <FloatingContact />
        </div>
      )}
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════
   ROOT APP (with ThemeProvider)
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  )
}
