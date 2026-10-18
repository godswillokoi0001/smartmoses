import {
  useScroll, useTransform, useMotionValue, useSpring,
  AnimatePresence, motion, MotionConfig,
} from 'framer-motion'
import { useRef, useState, useEffect, createContext, useContext } from 'react'
import {
  ArrowRight, ArrowUpRight, ChevronDown, Menu, X, Mail,
  Monitor, Layers, Code2, Wrench, Rocket, MapPin, Target, Sparkles,
  CheckCircle2, Sun, Moon, Globe,
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
    bg:            '#090D16',
    bgMid:         '#0D1422',
    bgAlt:         '#0F172A',
    surface:       '#1E293B',
    surfaceUp:     '#253448',
    border:        '#1E293B',
    borderSub:     'rgba(255,255,255,0.08)',
    accent:        '#10B981',
    accentAlt:     '#06B6D4',
    white:         '#F8FAFC',
    text:          '#F8FAFC',
    btnText:       '#0D1422',
    muted:         '#94A3B8',
    // Raised from #64748B: the old value only reached 4.4:1 on #090D16, which
    // fails WCAG AA for the many 9–11px labels and footnotes that use it.
    dim:           '#8593A6',
    navBgScrolled: 'rgba(9,13,22,0.92)',
    navBgTop:      'rgba(9,13,22,0.55)',
    gridLines:     'rgba(148,163,184,0.04)',
    cardShadow:    '0 24px 60px rgba(0,0,0,0.5)',
    heroGlow1:     '#10B98118',
    heroGlow2:     '#06B6D410',
    contactGlow:   '#06B6D412',
    contactBoxBg:  'rgba(9,13,22,0.85)',
    projectVeil:   'linear-gradient(180deg, rgba(9,13,22,0) 45%, rgba(9,13,22,0.55) 100%)',
    toggleBg:      'rgba(255,255,255,0.05)',
    toggleActiveBg:'#1E293B',
    toggleBorder:  'rgba(255,255,255,0.1)',
    codeTagBg:     'rgba(255,255,255,0.02)',
  },
  light: {
    isDark: false,
    name: 'light',
    bg:            '#F8FAFC',
    bgMid:         '#FFFFFF',
    bgAlt:         '#F1F5F9',
    surface:       '#F1F5F9',
    surfaceUp:     '#E2E8F0',
    border:        '#E2E8F0',
    borderSub:     'rgba(15,23,42,0.08)',
    accent:        '#059669',
    accentAlt:     '#0891B2',
    white:         '#0F172A',
    text:          '#1E293B',
    btnText:       '#FFFFFF',
    muted:         '#475569',
    // Raised from #64748B: only 4.2:1 on #F8FAFC, below the 4.5:1 AA floor.
    dim:           '#5B6675',
    navBgScrolled: 'rgba(255,255,255,0.92)',
    navBgTop:      'rgba(248,250,252,0.7)',
    gridLines:     'rgba(15,23,42,0.035)',
    cardShadow:    '0 20px 48px rgba(15,23,42,0.08)',
    heroGlow1:     '#10B98114',
    heroGlow2:     '#06B6D40A',
    contactGlow:   '#06B6D40E',
    contactBoxBg:  'rgba(255,255,255,0.92)',
    projectVeil:   'linear-gradient(180deg, rgba(255,255,255,0) 40%, rgba(248,250,252,0.6) 100%)',
    toggleBg:      '#E2E8F0',
    toggleActiveBg:'#FFFFFF',
    toggleBorder:  '#CBD5E1',
    codeTagBg:     'rgba(15,23,42,0.03)',
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
    root.style.setProperty('--motion-accent', T.accent)
    root.style.setProperty('--motion-accent-alt', T.accentAlt)

    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', T.bg)
    }
  }, [resolvedTheme, T.bg, T.accent, T.accentAlt])

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
const PRICING_LINK = { label: 'Pricing', href: '/pricingpage' }

/* Words of the hero headline, revealed one by one on load. */
const HERO_HEAD = ['I', 'design', 'and', 'build', 'websites', 'that', 'make', 'growing', 'businesses']

const EMAIL        = 'smartmoses@gmail.com'
const GITHUB_URL   = 'https://github.com/godswillokoi0001'
const WHATSAPP_URL =
  'https://wa.me/2348137038180?text=' +
  encodeURIComponent("Hi Smart Moses, I'd like to discuss a project.")

// Drop the PDF at this exact public path to activate every résumé link.
// The asset is not in the repo yet — see public/assets/pdf/README.txt.
const RESUME_PATH     = '/assets/pdf/Smart-Moses-Resume.pdf'
const RESUME_FILENAME = 'Smart-Moses-Resume.pdf'

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

/* ═══════════════════════��═══════════════════════════════════════
   ANIMATION HELPERS
   ═══════════════════════════════════════════════════════════════ */
const fadeUp = (delay = 0, distance = 28) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.65, ease, delay },
})

/* Word-by-word masked reveal for the hero headline: each word slides up
   out of its own overflow-hidden box, staggered left to right. */
function WordReveal({ children, delay = 0 }) {
  return (
    <span style={{
      display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom',
      /* room for descenders (g, y) so the mask never clips them */
      paddingBottom: '0.16em', marginBottom: '-0.16em',
    }}>
      <motion.span
        style={{ display: 'inline-block' }}
        initial={{ y: '112%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.75, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/* 3D perspective tilt for project mockups. Fine pointers only, disabled for
   reduced-motion users. */
function TiltCard({ children }) {
  const reduced = useReducedMotion()
  const [fine, setFine] = useState(false)
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const rotateY = useSpring(mvX, { stiffness: 150, damping: 18, mass: 0.4 })
  const rotateX = useSpring(mvY, { stiffness: 150, damping: 18, mass: 0.4 })

  useEffect(() => {
    setFine(window.matchMedia('(pointer: fine)').matches)
  }, [])

  if (!fine || reduced) return <div>{children}</div>

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mvX.set(((e.clientX - r.left) / r.width - 0.5) * 7)
    mvY.set(-((e.clientY - r.top) / r.height - 0.5) * 6)
  }
  const onLeave = () => { mvX.set(0); mvY.set(0) }

  return (
    <div style={{ perspective: 1200 }} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div style={{ rotateY, rotateX, transformStyle: 'preserve-3d' }}>
        {children}
      </motion.div>
    </div>
  )
}

/* Desktop-only cursor garnish: a lagging accent ring plus a snappy dot.
   Never replaces the native cursor — purely decorative, and it is not
   mounted on touch devices or for reduced-motion users. */
function CursorGlow() {
  const reduced = useReducedMotion()
  const [on, setOn] = useState(false)
  const [big, setBig] = useState(false)
  const mx = useMotionValue(-240)
  const my = useMotionValue(-240)
  const ringX = useSpring(mx, { stiffness: 170, damping: 22, mass: 0.5 })
  const ringY = useSpring(my, { stiffness: 170, damping: 22, mass: 0.5 })
  const dotX = useSpring(mx, { stiffness: 900, damping: 42, mass: 0.25 })
  const dotY = useSpring(my, { stiffness: 900, damping: 42, mass: 0.25 })

  useEffect(() => {
    if (reduced) return undefined
    if (!window.matchMedia('(pointer: fine)').matches) return undefined
    setOn(true)
    const move = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      setBig(!!(e.target && e.target.closest && e.target.closest('a,button,[role="radio"]')))
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [reduced, mx, my])

  if (!on) return null
  return (
    <>
      <motion.div aria-hidden="true"
        animate={{ scale: big ? 1.85 : 1, opacity: big ? 0.9 : 0.5 }}
        transition={{ duration: 0.25, ease }}
        style={{
          position: 'fixed', top: 0, left: 0, width: 30, height: 30,
          marginLeft: -15, marginTop: -15, borderRadius: 999,
          border: '1px solid var(--motion-accent)',
          pointerEvents: 'none', zIndex: 10000, x: ringX, y: ringY,
        }} />
      <motion.div aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0, width: 5, height: 5,
          marginLeft: -2.5, marginTop: -2.5, borderRadius: 999,
          background: 'var(--motion-accent)',
          pointerEvents: 'none', zIndex: 10000, x: dotX, y: dotY,
        }} />
    </>
  )
}

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
      <span className="pill-label" style={{ color: col, fontFamily: FONT_B, fontWeight: 600 }}>
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
    <a href={href} onClick={onClick} className="btn-shine btn-cta"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center',
        borderRadius: 10,
        background: hov ? hoverBg : T.accent,
        color: T.btnText,
        fontWeight: 700,
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
    <a href={href} onClick={onClick} className="btn-cta"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center',
        borderRadius: 10,
        border: `1px solid ${hov ? T.accent + '55' : T.borderSub}`,
        background: hov ? `${T.accent}0D` : 'transparent',
        color: hov ? (T.isDark ? T.white : T.accent) : T.muted,
        fontWeight: 600,
        textTransform: 'uppercase', fontFamily: FONT_B, textDecoration: 'none',
        flexShrink: 0,
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)',
      }}>
      {children}
    </a>
  )
}

function ResumeBtn({ onClick, style = {} }) {
  const { T } = useTheme()
  const [hov, setHov] = useState(false)
  return (
    <a
      href={RESUME_PATH}
      download={RESUME_FILENAME}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label="Download résumé as a PDF"
      title="Download résumé (PDF)"
      className="btn-cta"
      style={{
        display: 'inline-flex', alignItems: 'center',
        borderRadius: 10,
        border: `1px solid ${hov ? T.accent + '55' : T.borderSub}`,
        background: hov ? `${T.accent}0D` : 'transparent',
        color: hov ? (T.isDark ? T.white : T.accent) : T.muted,
        fontWeight: 600,
        textTransform: 'uppercase', fontFamily: FONT_B, textDecoration: 'none',
        flexShrink: 0,
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)',
        ...style,
      }}
    >
      <Download size={14} strokeWidth={2.2} aria-hidden="true" style={{ flexShrink: 0 }} />
      <span className="resume-btn-label">Résumé</span>
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
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease }}
        style={{ width: 22, height: 1, background: T.accent, transformOrigin: '0% 50%', flexShrink: 0 }}
      />
      <p style={{
        fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.32em',
        color: T.accent, fontFamily: FONT_B, fontWeight: 600, margin: 0,
      }}>
        {children}
      </p>
    </div>
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
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* Scroll-spy: highlights the section currently in view and drives the
     layoutId pill that slides between nav links. */
  useEffect(() => {
    const els = NAV_LINKS.map(l => document.querySelector(l.href)).filter(Boolean)
    if (!els.length) return undefined
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive('#' + en.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const close = () => setOpen(false)

  const handleNavClick = (href, e) => {
    if (href.startsWith('#')) {
      if (window.location.pathname !== '/') {
        onNavigate('/' + href, e)
      }
    } else {
      onNavigate(href, e)
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
        pointerEvents: 'all', position: 'relative',
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
            aria-label="Smart Moses — home"
          >
            <SMBadge size={30} />
            <span style={{ fontFamily: FONT_H, fontSize: 14, fontWeight: 700, color: T.white, letterSpacing: '-0.01em' }}>
              Smart Moses
            </span>
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="nav-desktop" aria-label="Primary">
              {NAV_LINKS.map(link => (
                <NavLink key={link.href} href={link.href} active={active === link.href}
                  onClick={(e) => handleNavClick(link.href, e)}>
                  {link.label}
                </NavLink>
              ))}
              <NavLink href={PRICING_LINK.href} active={false}>
                {PRICING_LINK.label}
              </NavLink>
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

        {/* Reading-progress rail across the bottom edge of the nav pill */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute', bottom: -1, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, ${T.accent}, ${T.accentAlt})`,
            borderRadius: '0 0 14px 14px',
            scaleX: scrollYProgress, transformOrigin: '0% 50%',
          }}
        />

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
                      padding: '14px 0', fontSize: 13.5, color: T.text, textDecoration: 'none',
                      fontFamily: FONT_B, borderBottom: `1px solid ${T.border}`,
                    }}>
                    {link.label}
                  </a>
                ))}
                <a href={PRICING_LINK.href}
                  onClick={close}
                  style={{
                    padding: '14px 0', fontSize: 13.5, color: T.text, textDecoration: 'none',
                    fontFamily: FONT_B, borderBottom: `1px solid ${T.border}`,
                  }}>
                  {PRICING_LINK.label}
                </a>

                {/* Theme switching lives in the navbar itself, not here. */}

                {/* Stacked full-width so the tap target never wraps or breaks
                    on narrow phones. The résumé lives only at the end of the
                    page (contact + footer), not in the nav. */}
                <div className="menu-actions" style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
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

function NavLink({ href, children, onClick, active }) {
  const { T } = useTheme()
  const [hov, setHov] = useState(false)
  return (
    <a href={href} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        padding: '8px 13px', fontSize: 11.5, letterSpacing: '0.03em',
        color: hov || active ? T.white : T.muted, textDecoration: 'none',
        borderRadius: 8, fontFamily: FONT_B, fontWeight: 500,
        transition: 'color 0.2s',
      }}>
      {active && (
        <motion.span
          aria-hidden="true"
          layoutId="nav-active-pill"
          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          style={{
            position: 'absolute', inset: 0, borderRadius: 8,
            background: T.toggleActiveBg, border: `1px solid ${T.borderSub}`,
          }}
        />
      )}
      <span style={{ position: 'relative' }}>{children}</span>
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
    <section id="top" ref={ref} className="hero-section"
      style={{
        position: 'relative', display: 'flex', alignItems: 'center',
        // Kept deliberately tight so the hero CTAs stay above the fold on a
        // laptop viewport; the section used to be 1075px tall on a 900px screen.
        paddingTop: 'clamp(108px, 13vh, 132px)',
        paddingBottom: 'clamp(64px, 9vh, 92px)',
        overflow: 'hidden',
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
        }} className="aurora aurora-a" />
        <div style={{
          position: 'absolute', bottom: '-8%', right: '-5%', width: '45%', height: '55%',
          background: `radial-gradient(ellipse, ${T.heroGlow2}, transparent 65%)`,
          pointerEvents: 'none',
        }} className="aurora aurora-b" />
      </div>

      <motion.div style={{ y: yParallax, position: 'relative', zIndex: 10, width: '100%',
        maxWidth: 1160, margin: '0 auto', padding: '0 clamp(16px,4vw,32px)' }}>
        <div className="hero-grid">
          <div>
            <motion.div {...fadeUp(0.05)} style={{ marginBottom: 0 }}>
              <Pill accent>Available for Business Websites &amp; Landing Pages</Pill>
            </motion.div>

            <div style={{ marginBottom: 24 }}>
              <h1 style={{
                fontFamily: FONT_H, fontSize: 'clamp(2.15rem, 4.4vw, 3.05rem)', fontWeight: 800,
                lineHeight: 1.06, letterSpacing: '-0.035em', color: T.white, maxWidth: 660,
              }}>
                {HERO_HEAD.map((word, i) => (
                  /* Trailing space lives in a plain wrapper span: adjacent
                     inline-blocks would otherwise render with no gap. */
                  <span key={`${word}-${i}`}>
                    <WordReveal delay={0.26 + i * 0.045}>{word}</WordReveal>
                    {' '}
                  </span>
                ))}
                <WordReveal delay={0.26 + HERO_HEAD.length * 0.045}>
                  <span className="accent-shine">look legit.</span>
                </WordReveal>
              </h1>
            </div>

            <motion.p {...fadeUp(0.25)}
              style={{
                fontSize: 'clamp(14px,1.55vw,16px)', lineHeight: 1.85, color: T.muted,
                maxWidth: 540, marginBottom: 36, fontFamily: FONT_B,
              }}>
              Hi, I'm Smart Moses. I'm a web designer and frontend developer turning Figma
              designs, messy ideas, and outdated pages into clean, fast, mobile-friendly
              websites that build trust and drive inquiries.
            </motion.p>

            <motion.div {...fadeUp(0.32)} className="cta-actions" style={{ marginBottom: 28 }}>
              <PrimaryBtn href="#work">View My Work</PrimaryBtn>
              <GhostBtn href="#contact">
                <span className="lbl-wide">Let's Talk About Your Project</span>
                <span className="lbl-narrow">Let's Talk</span>
              </GhostBtn>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            whileHover={{ y: -6, transition: { duration: 0.24, ease } }}
            style={{ position: 'relative' }}
          >
            {/* Slowly rotating accent glow behind the portrait card
                (desktop only — hidden below 900px so it can never bleed
                into the headline column). */}
            <div className="hero-glowring" aria-hidden="true"
              style={{ background: `conic-gradient(from 0deg, transparent 0 55%, ${T.accent}66 70%, ${T.accentAlt}80%, transparent 100%)` }} />
            <div style={{
              position: 'relative', zIndex: 1, borderRadius: 18, overflow: 'hidden',
              border: `1px solid ${T.border}`,
              background: T.bgMid,
              boxShadow: T.cardShadow,
              transition: 'box-shadow 0.3s, border-color 0.3s',
            }}>
              <div className="hero-photo">
              <img
                src={T.isDark ? '/images/me.jpeg' : '/images/me-light.jpg'}
                alt="Smart Moses — Web Designer and Frontend Developer"
                  style={{
                    width: '100%', height: 'clamp(320px,36vw,420px)',
                    objectFit: 'cover', objectPosition: 'top center', display: 'block',
                  }} />
                <span className="hero-scan" aria-hidden="true"
                  style={{ background: `linear-gradient(180deg, transparent, ${T.accent}2E 50%, transparent)` }} />
              </div>
              <div style={{
                padding: '16px 20px', borderTop: `1px solid ${T.border}`,
                background: T.bgMid,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
              }}>
                <div>
                  <p style={{ fontFamily: FONT_H, fontSize: 13.5, fontWeight: 700, color: T.white, lineHeight: 1.2 }}>
                    Smart Moses
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

      <motion.a className="hero-scroll-indicator" href="#work" aria-label="Scroll to work"
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
        <TiltCard>
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
            loading="eager"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <span className="project-veil" style={{ background: T.projectVeil }} />
        </a>
        </TiltCard>
        <span className="project-index" aria-hidden="true">{p.num}</span>
      </motion.div>

      {/* Body Details */}
      <motion.div className="project-body" {...fadeUp(0.12)}>
        {/* Long categories used to wrap mid-row and strand the dot and tag.
            The category now owns the left column and the tag always sits right. */}
        <p className="project-meta">
          <span className="project-meta-category">{p.category}</span>
          <span className="project-meta-tag">
            {p.num === '01' ? 'Featured' : p.num === '02' ? 'Design-to-Code' : 'Multi-Page'}
          </span>
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

        {/* The two secondary links travel together so "Source" can never be
            orphaned on a line of its own. */}
        <div className="project-foot">
          <a
            href={`/work/${p.slug}`}
            onClick={handleCaseStudyClick}
            className="project-link-primary btn-shine"
            style={{
              display: 'inline-flex', alignItems: 'center',
              borderRadius: 8,
              background: T.accent, color: T.btnText,
              fontWeight: 700,
              textTransform: 'uppercase', textDecoration: 'none',
              boxShadow: `0 4px 14px ${T.accent}28`,
              transition: 'all 0.2s ease',
            }}
          >
            <span>Read Case Study</span>
            <ArrowRight size={13} strokeWidth={2.5} aria-hidden="true" />
          </a>

          <div className="project-link-group">
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-ghost"
              style={{
                display: 'inline-flex', alignItems: 'center',
                borderRadius: 8,
                border: `1px solid ${T.borderSub}`, color: T.text,
                fontWeight: 600,
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
                display: 'inline-flex', alignItems: 'center',
                borderRadius: 8,
                border: `1px solid ${T.borderSub}`, color: T.muted,
                fontWeight: 600,
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
            whileHover={{ y: -6, transition: { duration: 0.22, ease } }}
            onPointerMove={(e) => {
              /* Cursor-tracking spotlight: the card reports where the pointer
                 is and a radial gradient follows it. */
              const r = e.currentTarget.getBoundingClientRect()
              e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
              e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
            }}
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
            "I'm Smart Moses (Godswill Okoi). I'm a web designer and frontend developer based in Nigeria, focused on building websites that are clean, fast, and genuinely useful to the businesses they represent.",
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
      <motion.div {...fadeUp()} style={{ marginBottom: 'clamp(20px,3vw,32px)' }}>
        <Label>Technical Skills</Label>
        <h2 style={{
          fontFamily: FONT_H, fontSize: 'clamp(1.35rem,2.6vw,1.9rem)',
          lineHeight: 1.1, letterSpacing: '-0.03em', color: T.white,
        }}>
          The tools I build with.
        </h2>
      </motion.div>

      {/* One bordered panel of four dense rows: group label left, chips
          wrapping on the right. The old four-card grid with per-card icon
          headers ate most of a screen on both breakpoints. */}
      <div className="skills-compact">
        {SKILL_GROUPS.map((g, i) => (
          <motion.div key={g.label} {...fadeUp(i * 0.05)} className="skills-row">
            <span className="skills-row-label">
              <IconTile icon={g.icon} size={20} />
              {g.label}
            </span>
            <div className="skills-row-chips">
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
      <motion.div {...fadeUp()} className="contact-card"
        style={{
          position: 'relative', borderRadius: 20, overflow: 'hidden',
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
            <div className="cta-actions">
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
                /* Label above value: the old side-by-side row squeezed the value
                   into ~130px and wrapped "Web Design & Frontend Dev" mid-phrase. */
                <div key={row.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <row.icon size={14} strokeWidth={2} aria-hidden="true"
                    style={{ color: T.dim, flexShrink: 0, marginTop: 2 }} />
                  <div style={{ minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 9, textTransform: 'uppercase',
                      letterSpacing: '0.22em', color: T.dim, fontFamily: FONT_B }}>
                      {row.label}
                    </span>
                    <span style={{ display: 'block', fontSize: 11.5, color: T.text, fontFamily: FONT_B,
                      fontWeight: 500, lineHeight: 1.45, marginTop: 3 }}>
                      {row.value}
                    </span>
                  </div>
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
                Smart Moses
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
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
            © {new Date().getFullYear()} Smart Moses. All rights reserved.
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

function FooterLink({ href, children, onClick, download }) {
  const { T } = useTheme()
  const [hov, setHov] = useState(false)
  return (
    <a href={href} onClick={onClick} download={download}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-block', padding: '7px 0',
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

        /* Service cards — the lift is owned by framer-motion (inline transform),
           so no CSS transform rule here; that clash is what the old !important
           override was working around. */
        .service-card {
          position: relative; overflow: hidden; isolation: isolate;
          transition: border-color 0.25s, box-shadow 0.25s, background-color 0.25s;
        }
        .service-card::before {
          content: ''; position: absolute; z-index: 0; pointer-events: none;
          inset: auto 0 0; height: 2px;
          background: linear-gradient(90deg, ${T.accent}, ${T.accentAlt});
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .service-card > * { position: relative; z-index: 1; }
        .service-card:hover {
          border-color: ${T.accent}44;
          box-shadow: ${T.isDark ? '0 18px 42px rgba(0,0,0,0.32), 0 0 0 1px ' + T.accent + '22' : '0 16px 36px rgba(15,23,42,0.06), 0 0 0 1px ' + T.accent + '33'};
        }
        .service-card:hover::before { transform: scaleX(1); }

        /* ── MOTION GRAPHICS LAYER ─────────────────────── */
        @keyframes auroraDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(3.5%, 3%) scale(1.1); }
        }
        @keyframes accentShine {
          0%   { background-position: 130% 0; }
          100% { background-position: -130% 0; }
        }
        @keyframes spinRing { to { transform: rotate(360deg); } }
        @keyframes scanSweep {
          from { transform: translateY(-130%); }
          to   { transform: translateY(260%); }
        }
        @keyframes nodePulse {
          0%, 100% { box-shadow: 0 0 0 3px ${T.accent}2E; }
          50%      { box-shadow: 0 0 0 8px ${T.accent}12; }
        }

        /* Hero glows slowly breathe and drift */
        .aurora { animation: auroraDrift 16s ease-in-out infinite; will-change: transform; }
        .aurora-b { animation-duration: 22s; animation-direction: reverse; }

        /* Shimmer sweep across the hero accent phrase */
        .accent-shine {
          background: linear-gradient(100deg, ${T.accent} 25%, ${T.accentAlt} 45%, ${T.isDark ? '#A7F3D0' : '#065F46'} 52%, ${T.accent} 70%);
          background-size: 240% 100%;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
          animation: accentShine 7s linear infinite;
        }

        /* Rotating glow ring behind the hero portrait (desktop only) */
        .hero-glowring {
          display: none;
          position: absolute; inset: -16px; z-index: 0;
          border-radius: 30px; filter: blur(10px); opacity: 0.5;
          animation: spinRing 12s linear infinite;
          pointer-events: none;
        }
        @media (min-width: 900px) { .hero-glowring { display: block; } }

        /* Scan-line sweep when hovering the hero photo */
        .hero-photo { position: relative; overflow: hidden; }
        .hero-photo .hero-scan {
          position: absolute; left: 0; right: 0; top: 0; height: 55%;
          pointer-events: none; transform: translateY(-130%); opacity: 0;
        }
        .hero-photo:hover .hero-scan { animation: scanSweep 1.4s cubic-bezier(0.22,1,0.36,1); }

        /* Shine sweep across primary buttons on hover */
        .btn-shine { position: relative; overflow: hidden; isolation: isolate; }
        .btn-shine::after {
          content: ''; position: absolute; z-index: 1; pointer-events: none;
          top: 0; bottom: 0; left: -130%; width: 55%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,0.32), transparent);
          transform: skewX(-18deg);
          transition: left 0.65s cubic-bezier(0.22,1,0.36,1);
        }
        .btn-shine:hover::after { left: 135%; }

        /* Cursor-tracking spotlight behind service cards */
        .service-card::after {
          content: ''; position: absolute; z-index: 0; pointer-events: none; inset: 0;
          border-radius: inherit;
          background: radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), ${T.accent}1F, transparent 62%);
          opacity: 0; transition: opacity 0.35s ease;
        }
        .service-card:hover::after { opacity: 1; }

        /* Grouped buttons (2–3 together) sit on ONE row. On phones they are
           compacted — smaller padding/type, short label variant, trailing
           icons dropped — so the group still fits a single line. Measured:
           at 390px the hero pair and the contact trio fit ~358px of content. */
        .cta-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
        .btn-cta { padding: 15px 26px; font-size: 12.5px; letter-spacing: 0.06em; gap: 9px; white-space: nowrap; }
        .lbl-narrow { display: none; }
        /* Single button in the mobile menu still fills the sheet width. */
        .menu-actions > a { justify-content: center; }
        @media (max-width: 560px) {
          .cta-actions { gap: 8px; }
          .btn-cta { padding: 11px 14px; font-size: 10px; letter-spacing: 0.03em; gap: 7px; }
          .lbl-wide { display: none; }
          .lbl-narrow { display: inline; }
        }
        /* Last resort for narrow phones (≤440px): trim padding/type a step
           more so the trio still holds one line at a 360px viewport. */
        @media (max-width: 440px) {
          .cta-actions { gap: 5px; }
          .cta-actions > a { padding-left: 10px; padding-right: 10px; font-size: 10px; letter-spacing: 0.02em; }
          .cta-actions > a > svg { display: none; }
        }
        /* 360px tier: labels and icons stay, padding tightens one more notch
           so the contact trio still fits a 266px card. */
        @media (max-width: 400px) {
          .cta-actions { gap: 5px; }
          .cta-actions > a { padding-left: 9px; padding-right: 9px; font-size: 9px; }
        }
        /* Hero buttons stay comfortably sized on phones: this row has real
           slack (≈340px of width for ≈290px of buttons), unlike the contact
           trio, so it opts out of the compact tiers above. */
        @media (max-width: 560px) {
          .hero-section .cta-actions > a { font-size: 12px; padding: 13px 20px; }
          .hero-section .cta-actions > a > svg { display: block; }
        }

        :focus-visible {
          outline: 2px solid ${T.accent};
          outline-offset: 3px;
          border-radius: 4px;
        }

        /* HERO — svh with a vh fallback so mobile browser chrome can't push the
           call-to-action row off screen. */
        .hero-section { min-height: 100vh; min-height: 100svh; }
        @media (max-width: 560px) {
          .hero-scroll-indicator { display: none !important; }
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
          /* The heading column is short and used to leave ~350px of dead space;
             sticking it keeps the section visually balanced while scrolling. */
          .philosophy-grid > :first-child { position: sticky; top: 116px; }
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

        /* SKILLS — one panel of dense rows: label column + wrapping chips */
        .skills-compact {
          border: 1px solid ${T.border}; border-radius: 14px;
          background: ${T.bgMid}; overflow: hidden;
          transition: background-color 0.25s, border-color 0.25s;
        }
        .skills-row {
          display: flex; flex-direction: column; gap: 10px;
          padding: 13px clamp(14px, 2vw, 20px);
          border-top: 1px solid ${T.border};
        }
        .skills-row:first-child { border-top: none; }
        .skills-row-label {
          display: flex; align-items: center; gap: 9px;
          font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.2em; color: ${T.accent};
          line-height: 1.4;
        }
        .skills-row-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        @media (min-width: 780px) {
          .skills-row {
            flex-direction: row; align-items: center; gap: 20px;
            padding-top: 11px; padding-bottom: 11px;
          }
          .skills-row-label { width: 212px; flex-shrink: 0; }
        }
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
          .project-entry { grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr); gap: 56px; }
          .project-entry.is-flipped { grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr); }
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
        /* Was white-on-transparent, which disappeared over the light project
           screenshots. It now carries its own scrim. */
        .project-index {
          position: absolute; top: 14px; left: 14px; z-index: 2;
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 34px; height: 26px; padding: 0 9px; border-radius: 7px;
          background: rgba(9,13,22,0.72);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.14);
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px;
          font-weight: 700; letter-spacing: 0.14em; color: #F8FAFC;
          pointer-events: none;
        }
        .project-body { min-width: 0; }
        .project-meta {
          display: flex; align-items: baseline; justify-content: space-between;
          flex-wrap: wrap; gap: 6px 18px;
          font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.24em;
          font-weight: 600; color: ${T.accent}; margin-bottom: 12px; font-family: 'Inter', sans-serif;
        }
        .project-meta-category { flex: 1 1 auto; min-width: 0; }
        .project-meta-tag { flex: 0 0 auto; color: ${T.dim}; text-align: right; }
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
        .project-foot { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; }
        .project-link-group { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
        .project-link-primary {
          padding: 10px 14px; font-size: 10.5px; letter-spacing: 0.04em;
          gap: 7px; white-space: nowrap;
        }
        .project-link-ghost {
          padding: 9px 11px; font-size: 10.5px; letter-spacing: 0.04em;
          gap: 6px; white-space: nowrap;
        }
        @media (max-width: 560px) {
          .project-foot { gap: 8px; }
          .project-link-primary { padding: 8px 11px; font-size: 9px; }
          .project-link-ghost { padding: 7px 9px; font-size: 9px; gap: 5px; }
          /* The trailing arrow would push the group past one line. */
          .project-link-ghost svg:last-child { display: none; }
        }
        @media (max-width: 400px) {
          .project-link-primary > svg,
          .project-link-ghost svg { display: none; }
        }

        /* Pill and résumé label need their own rules so the small-screen
           adjustments don't have to fight inline styles. */
        .pill-label {
          font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.3em; line-height: 1.5;
        }
        @media (max-width: 560px) {
          .pill-label { font-size: 8.5px; letter-spacing: 0.14em; }
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
          animation: nodePulse 3s ease-in-out infinite;
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

        /* Contact card: horizontal padding used to be 36px minimum, which
           cut the inner row to ~267px on phones — just under the ~286px the
           three CTA buttons need, forcing a wrap. */
        .contact-card { padding: clamp(28px, 6vw, 72px) clamp(20px, 6vw, 72px); }

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

      <CursorGlow />

      {/* Nav lives outside the page-transition wrapper: framer-motion applies
          a transform during transitions, and a transformed ancestor would
          break the nav's position:fixed. */}
      {!showPricing && !isCaseStudy && <Nav onNavigate={navigateTo} />}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={showPricing ? 'pricing' : isCaseStudy ? currentPath : 'home'}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease }}
        >
          {showPricing ? (
            <div style={{ position: 'relative', minHeight: '100vh', background: T.bg, transition: 'background-color 0.25s' }}>
              <PricingPage onNavigate={navigateTo} ThemeToggle={ThemeToggle} />
              <Footer onNavigate={navigateTo} />
            </div>
          ) : isCaseStudy ? (
            <div style={{ position: 'relative', minHeight: '100vh', background: T.bg, transition: 'background-color 0.25s' }}>
              <ProjectCaseStudy
                project={caseStudyProject}
                onNavigate={navigateTo}
                ThemeToggle={ThemeToggle}
              />
              <Footer onNavigate={navigateTo} />
            </div>
          ) : (
            <div style={{ position: 'relative', minHeight: '100vh', background: T.bg, transition: 'background-color 0.25s' }}>
              <Hero />
              <Work onNavigate={navigateTo} />
              <Services />
              <Philosophy />
              <About />
              <Skills />
              <Contact />
              <Footer onNavigate={navigateTo} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <FloatingContact />
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════
   ROOT APP (with ThemeProvider)
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <MainContent />
      </MotionConfig>
    </ThemeProvider>
  )
}
