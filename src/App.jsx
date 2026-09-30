import { useScroll, useTransform, AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  ArrowRight, ArrowUpRight, ChevronDown, Menu, X, Mail, Download,
  Sparkles, Target, Monitor, Layers, Code2, Wrench, Rocket, MapPin,
} from 'lucide-react'
import PricingPage from './PricingPage.jsx'
import {
  siHtml5, siCss, siSass, siJavascript, siTypescript, siReact, siTailwindcss,
  siVite, siGit, siGithub, siEslint, siPrettier, siFigma, siVercel,
} from 'simple-icons'

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
  { label: 'Home',       href: '#top' },
  { label: 'Work',       href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'About',      href: '#about' },
  { label: 'Contact',    href: '#contact' },
]

/* Contact details are taken from the project's own history — see
   src/components/Footer.jsx and src/components/App.jsx in commit 37cd57d.
   Nothing here is invented. LinkedIn is intentionally absent: the only
   reference to it anywhere in the repo was a bare "https://linkedin.com"
   with no username, which would be a dead link. */
const EMAIL = 'censusokoi515@gmail.com'
const GITHUB_URL = 'https://github.com/godswillokoi0001'

/* The repository ships public/assets/pdf/ with a placeholder README but no
   actual PDF, so the résumé buttons render in a "not yet uploaded" state
   rather than as dead download links. */
const RESUME_PATH = '/assets/pdf/Smart-Moses-Resume.pdf'

/* Real projects, recovered from src/components/Projects.jsx at commit
   37cd57d — all three have working live URLs. These are the same
   presentation images the project shipped with (editorial stock, not
   device screenshots); replace with real captures when available. */
const PROJECTS = [
  {
    name: 'Shamurr',
    category: 'E-commerce · Frontend',
    year: '2025',
    description:
      'A storefront for the Shamurr fashion brand, built so browsing, category navigation and checkout stay frictionless on a phone.',
    contribution:
      'Implemented the catalogue, category structure and the purchase flow end to end, and translated the brand identity into a consistent responsive interface.',
    technologies: ['React', 'CSS', 'E-commerce'],
    href: 'https://shamurr.com.ng/',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80',
    ratio: '21 / 9',
    align: 'left',
  },
  {
    name: 'Gericht',
    category: 'Restaurant · UI/UX',
    year: '2025',
    description:
      'An immersive site for a high-end restaurant, with a dynamic homepage, detailed menu sections, an awards showcase and a full photo gallery.',
    contribution:
      'Designed the page structure and visual system, then built the menu and gallery interactions — handling typography, spacing and imagery for a premium tone.',
    technologies: ['React', 'CSS3', 'UI/UX Design'],
    href: 'https://astounding-dodol-f6646a.netlify.app/',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
    ratio: '16 / 11',
    align: 'right',
  },
  {
    name: 'Godswill Okoi — Social Media',
    category: 'Marketing Site',
    year: '2024',
    description:
      'A single-page portfolio presenting services, client-focused value propositions, transparent pricing and a direct contact route.',
    contribution:
      'Built the layout and responsive behaviour, and structured the pricing and service content so prospective clients could self-qualify before reaching out.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    href: 'https://social-media-manager-godswill-okoi.netlify.app/',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1400&q=80',
    ratio: '4 / 3',
    align: 'left',
  },
]

/* Timeline transcribed from src/components/About.jsx at commit 37cd57d,
   where it was explicitly "populated from your CV". Dates, titles and
   organisations are reproduced as recorded — nothing added. */
const EXPERIENCE = [
  {
    period: '2023 — 2025',
    role: 'Frontend Developer',
    org: 'Technolix Digitals',
    location: 'Azawire-HQ, Abuja, Nigeria',
    web: true,
    points: [
      'Built and maintained responsive, user-facing web interfaces using React and Tailwind CSS.',
      'Turned design intent into production frontends, keeping components structured and maintainable.',
      'Worked inside a digital team delivering client web products.',
    ],
  },
  {
    period: '2023 — 2025',
    role: 'ICT Manager',
    org: 'Disolnet Technologies Ltd.',
    location: 'Cross River State, Nigeria',
    points: [
      'Oversaw daily operations and led a team delivering IT solutions.',
      'Managed staff duties and service delivery across the organisation.',
      'Conducted hands-on computer training for staff and clients.',
    ],
  },
  {
    period: '2024 — 2025',
    role: 'Director | Editor',
    org: 'Disolmedia',
    location: 'Cross River State, Nigeria',
    web: false,
    points: [
      'Directed and edited video content for brand and client projects.',
      'Owned production quality and storytelling across engagements.',
    ],
  },
  {
    period: '2022 — 2023',
    role: 'Graphics Designer | Video Editor | Instructor',
    org: 'Disolmedia',
    location: 'Cross River State, Nigeria',
    web: false,
    points: [
      'Created visual and video content for brand projects.',
      'Taught computer literacy and design tools to students.',
    ],
  },
  {
    period: '2018 — 2022',
    role: 'ICT Manager',
    org: 'Cyber Craft Technologies and Computer',
    location: 'Cross River State, Nigeria',
    web: false,
    points: [
      'Managed daily operations at a computer centre, keeping service delivery smooth.',
      'Provided practical, hands-on computer training to the public.',
    ],
  },
]

const CAPABILITIES = [
  {
    idx: '01',
    icon: Monitor,
    title: 'Web Design & Development',
    body: 'Designing and building modern, responsive websites that communicate clearly and provide meaningful experiences.',
  },
  {
    idx: '02',
    icon: Code2,
    title: 'Frontend Development',
    body: 'Turning ideas and designs into interactive, responsive interfaces using structured frontend code.',
  },
  {
    idx: '03',
    icon: Layers,
    title: 'Web Applications',
    body: 'Building functional digital experiences with practical workflows, user interactions, and business-focused functionality.',
  },
]

/* ═══════════════════════════════════════
   BRAND LOGOS — official marks from Simple Icons.
   ═══════════════════════════════════════ */
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

/* Effective composite of .tech-mark (white 4%) over .tech-tile (2%)
   over .skill-card (5%) over the #08090A page. This is what a brand
   mark actually sits on, so it is what legibility is measured against. */
const MARK_BG = '#222324'

/* Several brands ship an all-black or very dark glyph (Next.js, Vercel,
   CSS, Vite, ESLint) that effectively disappears on a near-black page.
   Where the official hex cannot clear the threshold we fall back to pure
   white, which is the conventional dark-mode rendering for those marks.
   The threshold is 2.5:1 rather than the 3:1 non-text minimum because a
   brand mark sitting directly above its name is decorative — the name
   carries the meaning, and the strict figure would needlessly wash out
   legible marks such as Tailwind's cyan (2.86:1). Blending toward white
   instead was tried and rejected: it rotates saturated hues off-brand
   (CSS purple -> brown, Tailwind cyan -> olive). */
const BRAND_MIN_CONTRAST = 2.5

function readableBrandColor(hex, bg = MARK_BG) {
  return contrastRatio(hex, bg) >= BRAND_MIN_CONTRAST ? hex : '#FFFFFF'
}

/* Every entry here is defensible: each is either present in this project's
   own package.json, present in the previous Skills.jsx at commit 37cd57d,
   or listed in the CV-derived services data. Next.js and Node.js were
   removed for exactly that reason — they appeared in neither. */
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

/* Secondary/outline CTA — the "Let's Talk" button. */
function GhostBtn({ href, children, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href} onClick={onClick}
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

/* Résumé download.
   The PDF itself is not in the repo, so the button renders in a clearly
   "not yet available" state instead of linking to a 404. Drop the file at
   public/assets/pdf/Smart-Moses-Resume.pdf and it becomes a real download
   automatically — no other change needed. */
const RESUME_READY = false

const resumeBtnStyle = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  borderRadius: 12, padding: '14px 20px',
  border: `1px solid ${T.border}`, background: 'transparent',
  fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
  textTransform: 'uppercase', fontFamily: FONT_B,
  textDecoration: 'none', flexShrink: 0, whiteSpace: 'nowrap',
  transition: 'color 0.25s, border-color 0.25s, background 0.25s',
}

function ResumeBtn({ compact = false, onClick }) {
  const label = compact ? 'Résumé' : 'Download Résumé'
  if (RESUME_READY) {
    return (
      <a href={RESUME_PATH} download="Smart-Moses-Resume.pdf" onClick={onClick}
        style={{ ...resumeBtnStyle, color: T.muted }}
        onMouseEnter={e => {
          e.currentTarget.style.color = T.white
          e.currentTarget.style.borderColor = T.borderHov
          e.currentTarget.style.background = 'rgba(255,94,0,0.08)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = T.muted
          e.currentTarget.style.borderColor = T.border
          e.currentTarget.style.background = 'transparent'
        }}>
        <Download size={compact ? 13 : 14} strokeWidth={2.2} aria-hidden="true" />
        {label}
      </a>
    )
  }
  return (
    <span
      title="Résumé PDF is not uploaded yet — email me and I will send it over."
      aria-disabled="true"
      style={{ ...resumeBtnStyle, color: T.dim, borderStyle: 'dashed', cursor: 'not-allowed' }}>
      <Download size={compact ? 13 : 14} strokeWidth={2.2} aria-hidden="true" />
      {label}
      <span className="resume-soon">PDF pending</span>
    </span>
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
            <div style={{ marginLeft: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <ResumeBtn compact />
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
                <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  <ResumeBtn onClick={() => setOpen(false)} />
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
              <h1 style={{ fontFamily: FONT_H, fontSize: 'clamp(2rem,6.2vw,3.5rem)', fontWeight: 700,
                lineHeight: 1.02, letterSpacing: '-0.03em', color: T.white, maxWidth: 680 }}>
                I design and build digital experiences that{' '}
                <span style={{ background: accentGrad, WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  help businesses move forward.
                </span>
              </h1>
            </motion.div>

            <motion.p {...fadeUp(0.25)}
              style={{ fontSize: 'clamp(14px,1.6vw,16px)', lineHeight: 1.85, color: T.muted,
                maxWidth: 520, marginBottom: 36, fontFamily: FONT_B }}>
              I create modern websites and functional web applications, combining thoughtful design
              with practical frontend development to turn ideas into meaningful digital experiences.
            </motion.p>

            <motion.div {...fadeUp(0.35)} style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <PrimaryBtn href="#work">View My Work</PrimaryBtn>
              <GhostBtn href="#contact">Let's Talk</GhostBtn>
              <ResumeBtn />
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
        title="Three projects that show how I"
        accentWord="think and build."
        lead="Real client and commissioned work, with links to the live sites."
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px,7vw,88px)' }}>
        {PROJECTS.map((p, i) => (
          <ProjectEntry key={p.name} project={p} index={i} />
        ))}
      </div>
    </SectionShell>
  )
}

/* Each project gets its own composition — alternating alignment, its own
   image ratio and its own text block position — so the section reads as
   three deliberate spreads rather than a repeated card grid. */
function ProjectEntry({ project: p, index: i }) {
  const flip = i % 2 === 1
  return (
    <motion.article {...fadeUp(0.05)}
      className={`project-entry${flip ? ' is-flipped' : ''}`}>
      <motion.div className="project-media"
        initial={{ opacity: 0, scale: 1.03 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease }}>
        <a href={p.href} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', position: 'relative', aspectRatio: p.ratio,
            borderRadius: 14, overflow: 'hidden', border: `1px solid ${T.border}`,
            background: T.bgMid }}>
          <img src={p.image} alt={`${p.name} — ${p.category}`} loading="lazy" decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <span className="project-veil" />
        </a>
        <span className="project-index" aria-hidden="true">
          {String(i + 1).padStart(2, '0')}
        </span>
      </motion.div>

      <motion.div className="project-body" {...fadeUp(0.12)}>
        <p className="project-meta">
          <span>{p.category}</span>
          <span className="project-dot" aria-hidden="true" />
          <span>{p.year}</span>
        </p>
        <h3 className="project-title">{p.name}</h3>
        <p className="project-desc">{p.description}</p>

        <div className="project-contrib">
          <p className="project-contrib-label">My contribution</p>
          <p className="project-contrib-text">{p.contribution}</p>
        </div>

        <div className="project-foot">
          <ul className="project-tech">
            {p.technologies.map(t => <li key={t}>{t}</li>)}
          </ul>
          <a className="project-link" href={p.href} target="_blank" rel="noopener noreferrer">
            View live site
            <ArrowUpRight size={15} strokeWidth={2.4} aria-hidden="true" />
          </a>
        </div>
      </motion.div>
    </motion.article>
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
      <div className="cap-grid">
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
   TECH TILE
   ═══════════════════════════════════════ */
/* Brand-logo tile. Uses the official mark in its own brand colour;
   items with no official mark available render an honest monogram
   instead of a fabricated logo. */
function TechTile({ slug, name, mono }) {
  const [hov, setHov] = useState(false)
  const brand = BRAND[slug]
  const col = brand ? readableBrandColor(brand.hex) : T.dim
  return (
    <div className="tech-tile"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderColor: hov ? `${col}66` : T.border,
        boxShadow: hov ? `0 0 22px ${col}2E, inset 0 1px 0 rgba(255,255,255,0.05)` : 'none' }}>
      <span className="tech-mark" style={{ color: col, background: hov ? `${col}1A` : 'rgba(255,255,255,0.04)' }}>
        {brand
          ? <svg viewBox="0 0 24 24" role="img" aria-label={name}>
              <path d={brand.path} fill="currentColor" />
            </svg>
          : <span className="tech-mono" style={{ fontFamily: FONT_H,
              fontSize: (mono || '').length > 2 ? 8 : 9.5,
              fontWeight: 800, letterSpacing: '0.02em' }}>{mono}</span>}
      </span>
      <span className="tech-name">{name}</span>
    </div>
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
        title="The tools I use to"
        accentWord="build with."
        lead="Grouped by what they are actually used for."
      />
      <div className="skill-groups">
        {SKILL_GROUPS.map((g, i) => (
          <motion.div key={g.label} {...fadeUp(i * 0.07)}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3, ease }}
            className="skill-card"
            style={{ border: `1px solid ${T.border}`,
              borderRadius: 14, background: T.surface }}>
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
      <ol className="timeline">
        {EXPERIENCE.map((job, i) => (
          <motion.li key={job.role} {...fadeUp(0.05 * i)} className="timeline-row">
            <div className="timeline-rail" aria-hidden="true">
              <span className="timeline-node" />
            </div>
            <div className="timeline-period">
              {job.period}
            </div>
            <div className="timeline-body">
              <h3 className="timeline-role">{job.role}</h3>
              <p className="timeline-org">
                {job.company}
                {job.location ? <span className="timeline-org-sep" aria-hidden="true">·</span> : null}
                {job.location ? <span className="timeline-loc">{job.location}</span> : null}
              </p>
              <ul className="timeline-points">
                {job.points.map(pt => <li key={pt}>{pt}</li>)}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
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
              A developer who thinks like a{' '}
              <span style={{ color: T.dim }}>designer.</span>
            </h2>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.1)}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            "I'm Smart Moses, a Web Designer and Developer with a creative background and a strong interest in building meaningful digital experiences.",
            "My background in graphic design, content production, and web development shapes how I approach digital work — with attention to layout, clarity, and detail.",
            "I don't see a website as just a collection of pages. I see it as a tool for communication, interaction, and business growth.",
            "Today my focus is web design and development: understanding the problem, structuring the content, designing the interface, and building it properly.",
            "I care about the parts that are easy to skip — clear hierarchy, readable text, sensible spacing, and working code. Good technology should function well and make sense to the people using it.",
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

        .resume-soon {
          font-size: 8px;
          letter-spacing: 0.1em;
          color: ${T.dim};
          border: 1px solid ${T.border};
          border-radius: 4px;
          padding: 2px 5px;
          text-transform: uppercase;
        }

        .skill-groups {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .skill-card {
          padding: 14px;
        }
        @media (min-width: 640px) {
          .skill-groups { gap: 10px; }
          .skill-card { padding: 20px; }
        }

        /* Compact horizontal pill tiles. A side-by-side mark + label keeps
           the same information in roughly a third of the vertical space the
           old stacked tiles needed, which matters most on mobile. */
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(124px, 1fr));
          gap: 6px;
        }
        @media (min-width: 640px) {
          .tech-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 7px; }
        }

        .tech-tile {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 8px;
          padding: 7px 10px 7px 7px;
          min-width: 0;
          border: 1px solid ${T.border};
          border-radius: 9px;
          background: rgba(255,255,255,0.02);
          transition: border-color 0.3s, box-shadow 0.3s, background 0.3s, transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .tech-tile:hover { background: rgba(255,255,255,0.035); }
        @media (min-width: 640px) {
          .tech-tile { padding: 8px 12px 8px 8px; gap: 9px; }
        }

        .tech-mark {
          width: 24px; height: 24px;
          flex-shrink: 0;
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.3s, transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        @media (min-width: 640px) {
          .tech-mark { width: 27px; height: 27px; }
        }
        .tech-tile:hover .tech-mark { transform: scale(1.1) translateY(-1px); }
        .tech-mark svg { display: block; width: 14px; height: 14px; }
        @media (min-width: 640px) {
          .tech-mark svg { width: 16px; height: 16px; }
        }
        .tech-mono { display: block; line-height: 1; }

        .tech-name {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 500;
          color: ${T.muted};
          text-align: left;
          line-height: 1.25;
          min-width: 0;
          overflow-wrap: anywhere;
          transition: color 0.3s;
        }
        @media (min-width: 640px) {
          .tech-name { font-size: 11px; }
        }
        .tech-tile:hover .tech-name { color: ${T.white}; }

        /* ---- SELECTED WORK: three distinct editorial spreads ---- */
        .project-entry {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          align-items: center;
        }
        @media (min-width: 900px) {
          .project-entry {
            grid-template-columns: minmax(0, 1.18fr) minmax(0, 0.82fr);
            gap: 52px;
          }
          /* Odd entries mirror, so consecutive projects never line up. */
          .project-entry.is-flipped { grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr); }
          .project-entry.is-flipped .project-media { order: 2; }
          .project-entry.is-flipped .project-body { order: 1; }
        }

        .project-media { position: relative; min-width: 0; }

        .project-veil {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(8,9,10,0) 45%, rgba(8,9,10,0.55) 100%);
          transition: background 0.5s ease;
        }
        .project-media a:hover .project-veil {
          background: linear-gradient(180deg, rgba(255,94,0,0.06) 0%, rgba(255,94,0,0.16) 100%);
        }
        .project-media img {
          transition: transform 0.9s cubic-bezier(0.22,1,0.36,1), filter 0.5s ease;
          filter: saturate(0.85) contrast(1.02);
        }
        .project-media a:hover img { transform: scale(1.045); filter: saturate(1) contrast(1.04); }

        /* Oversized index numeral set into the image corner. */
        .project-index {
          position: absolute;
          top: 14px;
          left: 16px;
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.62);
          text-shadow: 0 2px 14px rgba(0,0,0,0.7);
          pointer-events: none;
        }

        .project-body { min-width: 0; }

        .project-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 9.5px;
          text-transform: uppercase;
          letter-spacing: 0.24em;
          font-weight: 600;
          color: ${T.accent};
          margin-bottom: 16px;
        }
        .project-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: ${T.dim};
          flex-shrink: 0;
        }

        .project-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.4rem, 3vw, 2.05rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.035em;
          color: ${T.white};
          margin-bottom: 14px;
        }

        .project-desc {
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          line-height: 1.85;
          color: ${T.muted};
          margin-bottom: 22px;
        }

        /* Left rule + label: an editorial note, not another card. */
        .project-contrib {
          border-left: 2px solid ${T.accent};
          padding-left: 16px;
          margin-bottom: 26px;
        }
        .project-contrib-label {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.24em;
          font-weight: 600;
          color: ${T.dim};
          margin-bottom: 7px;
        }
        .project-contrib-text {
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          line-height: 1.8;
          color: ${T.text};
        }

        .project-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 18px;
        }
        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .project-tech li {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: ${T.dim};
          border: 1px solid ${T.border};
          border-radius: 6px;
          padding: 5px 9px;
          white-space: nowrap;
        }

        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: ${T.accent};
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.25s, gap 0.25s;
        }
        .project-link:hover { color: ${T.white}; gap: 11px; }

        /* ---- PROFESSIONAL EXPERIENCE: rail timeline ---- */
        .timeline { list-style: none; margin: 0; padding: 0; }

        .timeline-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 6px 26px;
          padding-bottom: 42px;
        }
        @media (min-width: 860px) {
          .timeline-row { grid-template-columns: 20px 150px minmax(0, 1fr); gap: 0 26px; }
        }
        .timeline-row:last-child { padding-bottom: 0; }

        .timeline-rail { position: relative; display: none; }
        @media (min-width: 860px) { .timeline-rail { display: block; } }
        .timeline-rail::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 6px;
          bottom: -42px;
          width: 1px;
          background: ${T.border};
          transform: translateX(-50%);
        }
        .timeline-row:last-child .timeline-rail::before { display: none; }
        .timeline-node {
          position: absolute;
          left: 50%;
          top: 5px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: ${T.accent};
          transform: translateX(-50%);
          box-shadow: 0 0 0 4px rgba(255,94,0,0.14);
        }

        .timeline-period {
          font-family: 'Inter', sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: ${T.accent};
          padding-top: 1px;
        }

        .timeline-role {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.05rem, 2.2vw, 1.3rem);
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: ${T.white};
          margin-bottom: 7px;
        }
        .timeline-org {
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          color: ${T.text};
          margin-bottom: 14px;
        }
        .timeline-org-sep { margin: 0 8px; color: ${T.dim}; }
        .timeline-loc { color: ${T.dim}; font-weight: 400; }

        .timeline-points { list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 9px; }
        .timeline-points li {
          position: relative;
          padding-left: 16px;
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          line-height: 1.8;
          color: ${T.muted};
          max-width: 640px;
        }
        .timeline-points li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 10px;
          width: 5px;
          height: 1px;
          background: ${T.accent};
          opacity: 0.7;
        }

        /* ---- CORE CAPABILITIES: hairline-divided cells ---- */
        .cap-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          overflow: hidden;
        }
        @media (min-width: 720px) { .cap-grid { grid-template-columns: repeat(3, 1fr); } }

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
      <Experience />
      <Capabilities />
      <About />
      <Skills />
      <Contact />
      <Footer />
          <FloatingContact />
        </div>
      )}
    </>
  )
}
