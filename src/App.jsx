import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion, MotionConfig, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ArrowRight, ArrowLeft, ArrowUp } from 'lucide-react'
import ProjectCaseStudy from './ProjectCaseStudy.jsx'
import PricingPage from './PricingPage.jsx'
import { PROJECTS } from './projects.js'
import './design.css'

/* ─── CONSTANTS ─────────────────────────────────────────────────────────────── */
const EMAIL = 'smartmoses@gmail.com'
const GITHUB_URL = 'https://github.com/godswillokoi0001'
const WHATSAPP_URL =
  'https://wa.me/2348137038180?text=' +
  encodeURIComponent("Hi Smart Moses, I'd like to discuss a project.")
const LINKEDIN_URL = 'https://linkedin.com/in/smart-moses'
const EASE = [0.22, 1, 0.36, 1]

const REDUCED_MOTION =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES = [
  {
    number: '01',
    title: 'Business websites',
    detail: 'Clear, fast websites that explain what you do and make the next step obvious. Built around your real content, not a template.',
    scope: 'Structure · UI Design · Frontend Build',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Landing pages',
    detail: 'Focused pages for a product launch, service, or campaign — built around one clear action, with copy and layout that work together.',
    scope: 'Figma-to-code · React · Conversion-first layouts',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Frontend development',
    detail: 'Careful implementation of existing designs into reusable React components, with responsive layouts and real browser testing.',
    scope: 'Semantic HTML · CSS · JavaScript · React · TypeScript',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
]

const PROCESS = [
  ['01', 'Understand', 'We agree on the audience, the main goal, and what the site needs to do. I ask the questions your future users would ask.'],
  ['02', 'Set direction', 'I shape the page structure and visual approach around the real content — not around what looks nice in a mood board.'],
  ['03', 'Build', 'The interface is developed responsively, component by component, and checked in the browser as it takes shape.'],
  ['04', 'Review & launch', 'We review the finished pages, resolve the details, and prepare the site for handoff or direct deployment.'],
]

const EXPERIENCE = [
  {
    period: '2024–Present',
    role: 'Founder & Frontend Developer',
    organization: 'Smotiva Digital Ltd.',
    location: 'Nigeria',
    points: [
      'Lead digital design and development for growing businesses.',
      'Designed and built the Rayto Prolog logistics website end-to-end.',
      'Connect client goals with practical frontend architecture.',
    ],
  },
  {
    period: '2023–2024',
    role: 'Frontend Developer',
    organization: 'Azawire Africa',
    location: 'Nigeria',
    points: [
      'Contributed to a multi-page financial services frontend.',
      'Implemented personal and business user journeys, pricing, and onboarding flows.',
      'Collaborated with the development team using React and modern styling.',
    ],
  },
  {
    period: '2023',
    role: 'Frontend Developer',
    organization: 'Technolix Digitals',
    location: 'Abuja, Nigeria',
    points: [
      'Implemented Figma designs in code for client projects, including Vista MFB.',
      'Built responsive interfaces and maintained layout consistency across pages.',
    ],
  },
  {
    period: '2022–2023',
    role: 'Graphics Designer',
    organization: 'Disolmedia',
    location: 'Cross River State, Nigeria',
    points: [
      'Created visual brand assets, video edits, and digital media for clients.',
      'Foundation in visual hierarchy, layout, and brand communication.',
    ],
  },
]

const STACK = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS',
  'Figma', 'Git', 'GitHub', 'Vite', 'Vercel', 'Framer Motion',
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS',
  'Figma', 'Git', 'GitHub', 'Vite', 'Vercel', 'Framer Motion',
]

const MARQUEE_ITEMS = [
  { text: 'Web Design', outline: false },
  { text: 'Frontend Dev', outline: true },
  { text: 'React', outline: false },
  { text: 'Figma to Code', outline: true },
  { text: 'Landing Pages', outline: false },
  { text: 'TypeScript', outline: true },
  { text: 'Responsive UI', outline: false },
  { text: 'Nigeria', outline: true },
  { text: 'Web Design', outline: false },
  { text: 'Frontend Dev', outline: true },
  { text: 'React', outline: false },
  { text: 'Figma to Code', outline: true },
  { text: 'Landing Pages', outline: false },
  { text: 'TypeScript', outline: true },
  { text: 'Responsive UI', outline: false },
  { text: 'Nigeria', outline: true },
]

/* ─── PRELOADER ─────────────────────────────────────────────────────────────── */
function Preloader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, REDUCED_MOTION ? 0 : 1200)
    return () => clearTimeout(t)
  }, [onDone])

  if (REDUCED_MOTION) return null

  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <div className="preloader__logo">
        {['S', 'M'].map((letter, i) => (
          <motion.span
            key={letter + i}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.12, duration: 0.7, ease: EASE }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <div className="preloader__bar" />
    </motion.div>
  )
}

/* ─── CUSTOM CURSOR ─────────────────────────────────────────────────────────── */
function CustomCursor() {
  const cursorRef = useRef(null)
  const [state, setState] = useState('default') // default | hover | view

  useEffect(() => {
    if (REDUCED_MOTION) return
    const cursor = cursorRef.current
    if (!cursor) return

    let raf = null
    let mx = -100, my = -100

    const move = (e) => {
      mx = e.clientX; my = e.clientY
      if (raf) return
      raf = requestAnimationFrame(() => {
        cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
        raf = null
      })
    }

    const over = (e) => {
      const el = e.target.closest('a, button, [role="button"]')
      if (!el) { setState('default'); return }
      setState(el.dataset.cursorView ? 'view' : 'hover')
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)

    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  if (REDUCED_MOTION) return null

  return (
    <div
      ref={cursorRef}
      className={`cursor${state === 'hover' ? ' cursor--hover' : state === 'view' ? ' cursor--view' : ''}`}
      aria-hidden="true"
    />
  )
}

/* ─── LOCAL TIME ─────────────────────────────────────────────────────────────── */
function LocalTime() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString('en-NG', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
  )

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-NG', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }))
    }, 1000)
    return () => clearInterval(t)
  }, [])

  return <span className="hero__time" aria-label={`Local time in Lagos: ${time}`}>{time} WAT</span>
}

/* ─── SITE HEADER ───────────────────────────────────────────────────────────── */
function SiteHeader({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const targets = NAV_LINKS
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean)
    if (!targets.length || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(`#${entry.target.id}`)
      })
    }, { rootMargin: '-30% 0px -60% 0px' })

    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  const handleClick = (event, href) => {
    setMenuOpen(false)
    if (window.location.pathname !== '/') onNavigate(`/${href}`, event)
  }

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap header-inner">
        <a
          className="wordmark"
          href="/#top"
          onClick={(e) => handleClick(e, '#top')}
          aria-label="Smart Moses — home"
        >
          <span className="wordmark__mark" aria-hidden="true">SM</span>
          <span className="wordmark__name">Smart Moses</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleClick(e, href)}
              aria-current={active === href ? 'location' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          className="header-cta"
          href="#contact"
          onClick={(e) => handleClick(e, '#contact')}
        >
          Start a project <ArrowUpRight size={13} aria-hidden="true" />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {menuOpen
              ? <><line x1="1" y1="1" x2="17" y2="13"/><line x1="17" y1="1" x2="1" y2="13"/></>
              : <><line x1="0" y1="1" x2="18" y2="1"/><line x1="0" y1="7" x2="18" y2="7"/><line x1="0" y1="13" x2="18" y2="13"/></>
            }
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleClick(e, href)}
              >
                {label}
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            ))}
            <a
              className="mobile-nav-cta"
              href="#contact"
              onClick={(e) => handleClick(e, '#contact')}
            >
              Start a project
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ─── HERO ──────────────────────────────────────────────────────────────────── */
/* Rotating circular text badge */
function CircularBadge() {
  const text = 'FRONTEND DEVELOPER · UI DESIGNER · NIGERIA ·'
  const radius = 50
  const circumference = 2 * Math.PI * radius
  const chars = text.split('')
  const anglePerChar = 360 / chars.length

  return (
    <svg
      className="hero__badge"
      viewBox="0 0 120 120"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <path
          id="circle-path"
          d={`M 60,60 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
        />
      </defs>
      <text
        fill="currentColor"
        fontSize="8.5"
        fontFamily="var(--font-body)"
        fontWeight="600"
        letterSpacing="0.5"
        textAnchor="start"
        dominantBaseline="middle"
      >
        <textPath href="#circle-path" startOffset="0%">
          {text}
        </textPath>
      </text>
      <circle cx="60" cy="60" r="5" fill="currentColor" />
    </svg>
  )
}

function Hero() {
  const headlineRef = useRef(null)
  const portraitRef = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, REDUCED_MOTION ? 0 : 80])

  const headline = ['Websites', 'that get your', 'business chosen.']

  useEffect(() => {
    if (REDUCED_MOTION) return
    if (!headlineRef.current) return
    const words = headlineRef.current.querySelectorAll('.word-inner')
    words.forEach((word, i) => {
      const delay = i * 0.07 + 0.15
      word.style.transitionDelay = `${delay}s`
      word.style.transitionDuration = '0.85s'
      word.style.transitionProperty = 'transform'
      word.style.transitionTimingFunction = 'cubic-bezier(0.22, 1, 0.36, 1)'
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          word.style.transform = 'translateY(0)'
        })
      })
    })
  }, [])

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero__inner">
        {/* Copy column */}
        <div className="hero__copy">
          <motion.div
            className="hero__status"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: REDUCED_MOTION ? 0 : 0.9, duration: 0.5, ease: EASE }}
          >
            <span className="hero__status-dot" aria-hidden="true" />
            Available for projects
          </motion.div>

          <h1
            id="hero-title"
            className="hero__headline"
            ref={headlineRef}
            aria-label={headline.join(' ')}
          >
            {headline.map((line, li) => (
              <span key={li} style={{ display: 'block' }}>
                {line.split(' ').map((word, wi) => {
                  const isAccent = word === 'chosen.'
                  return (
                    <span key={wi} className="word" aria-hidden="true">
                      <span
                        className="word-inner"
                        style={{ transform: REDUCED_MOTION ? 'none' : 'translateY(110%)' }}
                      >
                        {isAccent ? <em>{word}</em> : word}
                      </span>
                      {wi < line.split(' ').length - 1 ? '\u00A0' : ''}
                    </span>
                  )
                })}
              </span>
            ))}
          </h1>

          <motion.p
            className="hero__lede"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: REDUCED_MOTION ? 0 : 1.1, duration: 0.7, ease: EASE }}
          >
            I design and build responsive websites for growing businesses — pairing clear visual direction with careful frontend work.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: REDUCED_MOTION ? 0 : 1.2, duration: 0.7, ease: EASE }}
          >
            <a className="btn btn--primary" href="#contact">
              Start a project <ArrowRight size={15} aria-hidden="true" />
            </a>
            <a className="btn btn--ghost" href="#work">
              Selected work
            </a>
          </motion.div>

          <motion.div
            className="hero__meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: REDUCED_MOTION ? 0 : 1.35, duration: 0.7, ease: EASE }}
          >
            <span className="hero__location">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px', opacity: 0.5 }} aria-hidden="true">
                <circle cx="5" cy="5" r="5" />
              </svg>
              Nigeria — working worldwide
            </span>
            <LocalTime />
          </motion.div>
        </div>

        {/* Portrait column */}
        <motion.div
          className="hero__portrait-wrap"
          initial={{ opacity: 0, x: REDUCED_MOTION ? 0 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: REDUCED_MOTION ? 0 : 0.5, duration: 1.0, ease: EASE }}
        >
          <motion.div className="hero__portrait" ref={portraitRef} style={{ y }}>
            <img
              src="/images/me.jpeg"
              alt="Smart Moses (Godswill Okoi) — web designer and frontend developer based in Nigeria"
              width="832"
              height="1040"
              fetchPriority="high"
              decoding="async"
            />
          </motion.div>

          <motion.div
            style={{ color: 'var(--bg)', position: 'absolute', bottom: '-20px', right: 0 }}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: REDUCED_MOTION ? 0 : 1.0, duration: 0.8, ease: EASE }}
          >
            <CircularBadge />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: REDUCED_MOTION ? 0 : 1.5, duration: 0.6, ease: EASE }}
        aria-hidden="true"
      >
        <div className="hero__scroll-line" />
        <span>Scroll</span>
      </motion.div>
    </section>
  )
}

/* ─── MARQUEE BAND ──────────────────────────────────────────────────────────── */
function MarqueeBand() {
  return (
    <div className="marquee-band" aria-hidden="true">
      <div className="marquee-track" role="presentation">
        {MARQUEE_ITEMS.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className={item.outline ? 'marquee-item--outline' : ''}>
              {item.text}
            </span>
            <span className="marquee-sep" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── SECTION LABEL ─────────────────────────────────────────────────────────── */
function SectionLabel({ num, label }) {
  return (
    <div className="section-label">
      <span className="section-label__num">{num}</span>
      <span className="section-label__line" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

/* ─── REVEAL ────────────────────────────────────────────────────────────────── */
function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const MotionTag = motion[Tag] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: REDUCED_MOTION ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.10 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  )
}

/* ─── WORK ──────────────────────────────────────────────────────────────────── */
function BrowserFrame({ url, children }) {
  return (
    <div className="browser-frame">
      <div className="browser-frame__bar">
        <div className="browser-frame__dots" aria-hidden="true">
          <div className="browser-frame__dot" />
          <div className="browser-frame__dot" />
          <div className="browser-frame__dot" />
        </div>
        <div className="browser-frame__url" aria-label={`Site URL: ${url}`}>
          {url}
        </div>
      </div>
      <div className="browser-frame__img">{children}</div>
    </div>
  )
}

function ProjectEntry({ project, index, onNavigate, isReverse }) {
  const openCaseStudy = (e) => onNavigate(`/work/${project.slug}`, e)

  return (
    <motion.div
      className={`project-entry${isReverse ? ' project-entry--reverse' : ''}`}
      delay={0}
    >
      <div className="project-entry__ghost" aria-hidden="true">{project.num}</div>

      {/* Image */}
      <div className="project-image-wrap">
        <a
          className="project-image-link"
          href={`/work/${project.slug}`}
          onClick={openCaseStudy}
          aria-label={`View ${project.name} case study`}
          data-cursor-view="true"
        >
          <BrowserFrame url={project.live.replace('https://', '')}>
            <img
              src={project.image}
              alt={project.imageAlt}
              width="1600"
              height="900"
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              decoding="async"
            />
          </BrowserFrame>
          <span className="project-view-label" aria-hidden="true">View →</span>
        </a>
      </div>

      {/* Copy */}
      <div className="project-copy">
        <div className="project-overline">
          <span className="project-num">{project.num}</span>
          <span>{project.category}</span>
        </div>

        <h3>
          <a href={`/work/${project.slug}`} onClick={openCaseStudy}>
            {project.name}
          </a>
        </h3>

        <p className="project-summary">{project.description}</p>

        <div className="project-tags">
          {project.stack.map((tag) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>

        <dl className="project-meta">
          <div className="project-meta-item">
            <dt>Role</dt>
            <dd>{project.role.split('·')[0].trim()}</dd>
          </div>
          <div className="project-meta-item">
            <dt>Year</dt>
            <dd>{project.year || '2024'}</dd>
          </div>
          <div className="project-meta-item">
            <dt>Type</dt>
            <dd>{project.highlights?.[0]?.value || 'Client'}</dd>
          </div>
        </dl>

        <div className="project-actions">
          <a
            href={`/work/${project.slug}`}
            onClick={openCaseStudy}
            className="project-actions__primary"
          >
            Case study <ArrowRight size={14} aria-hidden="true" />
          </a>
          <a href={project.live} target="_blank" rel="noopener noreferrer">
            Live site <ArrowUpRight size={13} aria-hidden="true" />
          </a>
          {project.source && (
            <a href={project.source} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function Work({ onNavigate }) {
  return (
    <section className="work-section section-pad" id="work" aria-labelledby="work-heading">
      <div className="wrap">
        <div className="work-section__head">
          <div>
            <SectionLabel num="01" label="Selected Work" />
            <h2 className="work-section__title" id="work-heading">
              A few different briefs.<br />
              <em style={{ fontStyle: 'italic', color: 'var(--muted)' }}>One clear standard.</em>
            </h2>
          </div>
          <p className="work-section__sub">
            Client and in-house work across logistics, financial services, and design-to-code builds.
          </p>
        </div>

        <div className="project-list">
          {PROJECTS.map((project, i) => (
            <ProjectEntry
              key={project.slug}
              project={project}
              index={i}
              onNavigate={onNavigate}
              isReverse={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── SERVICES ──────────────────────────────────────────────────────────────── */
function Services() {
  return (
    <section className="services-section section-pad" id="services" aria-labelledby="services-title">
      <div className="wrap">
        <div className="services-head">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <SectionLabel num="02" label="Services" />
            <h2 className="services-title" id="services-title">
              Useful work, from first<br />layout to final build.
            </h2>
          </div>
          <p className="services-sub">
            I work with early-stage and growing businesses who need a website that earns trust, not just a presence.
          </p>
        </div>

        <div className="service-specimens" role="list">
          {SERVICES.map((service) => (
            <motion.div
              key={service.number}
              className="service-specimen"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              onclick={() => alert(service.title)}
            >
              <div className="service-specimen__frame">
                <div className="service-specimen__visual">
                  {service.svg}
                </div>
                <div className="service-specimen__overlay">
                  <span className="service-specimen__num">{service.number}</span>
                  <h3 className="service-specimen__title">{service.title}</h3>
                  <p className="service-specimen__detail">{service.detail}</p>
                  <span className="service-specimen__scope">{service.scope}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── ABOUT ─────────────────────────────────────────────────────────────────── */
function About() {
  const { scrollYProgress } = useScroll()
  const imgY = useTransform(scrollYProgress, [0, 1], [0, REDUCED_MOTION ? 0 : -40])

  return (
    <section className="about-section section-pad" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <Reveal>
          <SectionLabel num="03" label="About" />
        </Reveal>

        <div className="about-inner" style={{ marginTop: 'var(--space-8)' }}>
          {/* Photo */}
          <Reveal className="about-photo">
            <div className="about-photo__frame">
              <img
                src="/images/me-light.jpg"
                alt="Smart Moses — designer and developer"
                width="832"
                height="1040"
                loading="lazy"
                decoding="async"
              />
              <div className="about-photo__accent" aria-hidden="true" />
              <div className="about-photo__label">
                <span className="about-photo__label-name">Godswill Okoi</span>
                <span className="about-photo__label-title">Smart Moses · Web Design & Frontend</span>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal className="about-copy" delay={0.1}>
            <h2 className="about-lede" id="about-title">
              Design thinking,<br />grounded in the browser.
            </h2>

            <div className="about-body">
              <p>
                I'm Smart Moses (Godswill Okoi) — a web designer and frontend developer based in Cross River State, Nigeria. I build websites that are clear, fast, and actually useful to the businesses they represent.
              </p>
              <p>
                My background in graphic design shapes how I think about hierarchy, content, and the details that make an interface feel considered. My focus is the frontend: semantic HTML, clean CSS, JavaScript, and React — with mobile responsiveness built in from the start.
              </p>
              <p>
                I run <a href="https://smotivadigital.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Smotiva Digital Ltd.</a>, a small studio that designs and builds digital products for growing businesses across Nigeria and beyond.
              </p>
            </div>

            {/* Stats */}
            <div className="about-stats">
              <div className="about-stat">
                <span className="about-stat__num">4+</span>
                <span className="about-stat__label">Years in design</span>
              </div>
              <div className="about-stat">
                <span className="about-stat__num">2+</span>
                <span className="about-stat__label">Years in frontend</span>
              </div>
              <div className="about-stat">
                <span className="about-stat__num">NG</span>
                <span className="about-stat__label">Based in Nigeria</span>
              </div>
              <div className="about-stat">
                <span className="about-stat__num">3</span>
                <span className="about-stat__label">Client projects</span>
              </div>
            </div>

            {/* Stack ticker */}
            <div className="about-stack">
              <span className="about-stack-label">Tools & Stack</span>
              <div className="stack-ticker-wrap">
                <div className="stack-ticker" aria-label="Technology stack">
                  {STACK.map((item, i) => (
                    <span key={i} className="stack-chip">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─── PROCESS ───────────────────────────────────────────────────────────────── */
function Process() {
  return (
    <section className="process-section section-pad" id="process" aria-labelledby="process-heading">
      <div className="wrap">
        <Reveal className="process-head">
          <SectionLabel num="04" label="Process" />
          <h2 className="process-title" id="process-heading">
            From brief to browser — a direct line.
          </h2>
        </Reveal>

        <div className="process-grid">
          {PROCESS.map(([number, title, description], i) => (
            <Reveal key={number} className="process-step" delay={i * 0.08}>
              <span className="process-step__ghost" aria-hidden="true">{number}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                <span className="process-step__num">{number}</span>
                <div className="process-step__line" aria-hidden="true" />
                <h3 className="process-step__title">{title}</h3>
                <p className="process-step__desc">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── EXPERIENCE ─────────────────────────────────────────────────────────────── */
function Experience() {
  return (
    <section className="experience-section section-pad" id="experience" aria-labelledby="experience-title">
      <div className="wrap">
        <Reveal>
          <SectionLabel num="05" label="Experience" />
          <h2
            id="experience-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginTop: 'var(--space-5)',
            }}
          >
            Work shaped by teams, clients, and real constraints.
          </h2>
        </Reveal>

        <ol className="experience-list" aria-label="Work history">
          {EXPERIENCE.map((job, i) => (
            <Reveal
              as="li"
              className="experience-row"
              key={`${job.organization}-${job.period}`}
              delay={i * 0.06}
            >
              <p className="experience-period">{job.period}</p>
              <div className="experience-main">
                <h3>{job.role}</h3>
                <p className="experience-org">
                  {job.organization}
                  <span> · {job.location}</span>
                </p>
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ─── CONTACT FORM ──────────────────────────────────────────────────────────── */
function ContactForm() {
  const [state, setState] = useState('idle')
  const [errors, setErrors] = useState({})

  const validate = (values) => {
    const e = {}
    if (!String(values.name || '').trim()) e.name = 'Add your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(values.email || '').trim()))
      e.email = 'Enter a valid email address.'
    if (!String(values.message || '').trim()) e.message = 'Add a short note about your project.'
    return e
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const values = Object.fromEntries(new FormData(event.currentTarget).entries())
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setState('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error()
      setState('success')
      event.currentTarget.reset()
    } catch {
      setState('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {[
        { id: 'contact-name', name: 'name', label: 'Your name', type: 'text', autoComplete: 'name', maxLength: 120 },
        { id: 'contact-email', name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', maxLength: 254 },
      ].map((field) => (
        <div className="form-field" key={field.id}>
          <input
            id={field.id}
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            maxLength={field.maxLength}
            required
            placeholder=" "
            aria-invalid={Boolean(errors[field.name])}
            aria-describedby={errors[field.name] ? `${field.id}-error` : undefined}
          />
          <label htmlFor={field.id}>{field.label}</label>
          {errors[field.name] && (
            <span className="field-error" id={`${field.id}-error`} role="alert">
              {errors[field.name]}
            </span>
          )}
        </div>
      ))}

      <div className="form-field">
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          maxLength={6000}
          placeholder=" "
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        <label htmlFor="contact-message">Tell me about your project</label>
        {errors.message && (
          <span className="field-error" id="contact-message-error" role="alert">
            {errors.message}
          </span>
        )}
      </div>

      {/* Honeypot */}
      <div className="form-trap" aria-hidden="true">
        <label htmlFor="contact-website">Leave empty</label>
        <input id="contact-website" name="website" tabIndex="-1" autoComplete="off" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <button className="btn btn--primary" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send message'}
          <ArrowRight size={15} aria-hidden="true" />
        </button>

        {state === 'success' && (
          <p className="form-status form-status--success" aria-live="polite">
            Message sent. I'll be in touch shortly.
          </p>
        )}
        {state === 'error' && (
          <p className="form-status form-status--error" role="alert">
            Could not send. Email me directly at{' '}
            <a href={`mailto:${EMAIL}`} style={{ color: 'inherit' }}>{EMAIL}</a>.
          </p>
        )}
      </div>
    </form>
  )
}

/* ─── CONTACT ───────────────────────────────────────────────────────────────── */
function MagneticButton({ href, children }) {
  const ref = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (REDUCED_MOTION) return
    const btn = ref.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.2
    const dy = (e.clientY - cy) * 0.2
    btn.style.transform = `translate(${dx}px, ${dy}px)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }, [])

  return (
    <div
      className="btn-magnetic-wrap"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <a ref={ref} href={href} className="btn-magnetic">
        {children}
      </a>
    </div>
  )
}

function Contact() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      {/* CTA Strip */}
      <div className="contact-cta-strip">
        <div className="wrap">
          <Reveal>
            <h2 className="contact-cta-headline" id="contact-heading">
              Let's build something<br />
              <em style={{ fontStyle: 'italic' }}>that gets you clients.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <MagneticButton href={WHATSAPP_URL}>
              Let's talk <ArrowUpRight size={18} aria-hidden="true" />
            </MagneticButton>
          </Reveal>
        </div>
      </div>

      {/* Form area */}
      <div className="contact-form-area">
        <div className="wrap">
          <div className="contact-form-inner">
            {/* Info */}
            <Reveal className="contact-info">
              <SectionLabel num="06" label="Contact" />
              <h3 className="contact-info-title">
                Have a website to make clearer?
              </h3>
              <div className="contact-channels">
                <a className="contact-channel" href={`mailto:${EMAIL}`}>
                  <div className="contact-channel__icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                  {EMAIL}
                  <ArrowUpRight size={13} style={{ marginLeft: 'auto' }} aria-hidden="true" />
                </a>
                <a className="contact-channel" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <div className="contact-channel__icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                    </svg>
                  </div>
                  WhatsApp
                  <ArrowUpRight size={13} style={{ marginLeft: 'auto' }} aria-hidden="true" />
                </a>
                <a className="contact-channel" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  <div className="contact-channel__icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  GitHub
                  <ArrowUpRight size={13} style={{ marginLeft: 'auto' }} aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.12}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FOOTER ────────────────────────────────────────────────────────────────── */
function FooterClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => setTime(
      new Date().toLocaleTimeString('en-NG', {
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    )
    update()
    const t = setInterval(update, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <span className="footer-time" aria-label="Current Lagos time">
      Lagos {time}
    </span>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer" id="footer">
      <div className="wrap footer-inner">
        <a
          href="#top"
          className="footer-wordmark"
          aria-label="Smart Moses — back to top"
        >
          Smart Moses
        </a>

        <div className="footer-row">
          <p className="footer-meta">
            © {new Date().getFullYear()} Smart Moses (Godswill Okoi).{' '}
            <span>Web Designer & Frontend Developer.</span>
          </p>

          <FooterClock />

          <nav className="footer-social" aria-label="Social and contact links">
            <a href={`mailto:${EMAIL}`}>Email</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>

          <a className="back-to-top" href="#top">
            Back to top <ArrowUp size={12} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}

/* ─── HOME PAGE ─────────────────────────────────────────────────────────────── */
function HomePage({ onNavigate }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader onNavigate={onNavigate} />
      <main id="main-content">
        <Hero />
        <MarqueeBand />
        <Work onNavigate={onNavigate} />
        <Services />
        <About />
        <Process />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}

/* ─── NOT FOUND ─────────────────────────────────────────────────────────────── */
function NotFound({ onNavigate }) {
  useEffect(() => {
    const prev = document.title
    document.title = 'Page Not Found — Smart Moses'
    return () => { document.title = prev }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader onNavigate={onNavigate} />
      <main className="not-found-page" id="main-content">
        <div className="not-found-code" aria-hidden="true">404</div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
          This page isn't here.
        </p>
        <p style={{ color: 'var(--muted)', fontSize: '0.9375rem' }}>
          The address may have changed, or the page may not exist.
        </p>
        <a className="btn btn--primary" href="/" onClick={(e) => onNavigate('/', e)}>
          Back to portfolio <ArrowRight size={15} aria-hidden="true" />
        </a>
      </main>
      <SiteFooter />
    </>
  )
}

/* ─── APP SHELL ─────────────────────────────────────────────────────────────── */
function AppContent() {
  const [path, setPath] = useState(
    () => window.location.pathname.replace(/\/$/, '') || '/'
  )
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const sync = () => setPath(window.location.pathname.replace(/\/$/, '') || '/')
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  function navigate(url, event) {
    event?.preventDefault()
    window.history.pushState(null, '', url)
    setPath(window.location.pathname.replace(/\/$/, '') || '/')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hashIdx = url.indexOf('#')
    if (hashIdx >= 0) {
      const targetId = url.slice(hashIdx + 1)
      window.requestAnimationFrame(() =>
        document.getElementById(targetId)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
      )
    } else {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    }
  }

  if (path === '/pricingpage') {
    return (
      <>
        <a className="skip-link" href="#pricing-main">Skip to content</a>
        <SiteHeader onNavigate={navigate} />
        <main id="pricing-main">
          <PricingPage onNavigate={navigate} />
        </main>
        <SiteFooter />
      </>
    )
  }

  const projectMatch = path.match(/^\/work\/([^/]+)$/)
  if (projectMatch) {
    const project = PROJECTS.find(({ slug }) => slug === projectMatch[1])
    if (!project) return <NotFound onNavigate={navigate} />
    return (
      <>
        <a className="skip-link" href="#case-main">Skip to content</a>
        <SiteHeader onNavigate={navigate} />
        <ProjectCaseStudy project={project} onNavigate={navigate} />
        <SiteFooter />
      </>
    )
  }

  if (path !== '/') return <NotFound onNavigate={navigate} />

  return (
    <>
      <AnimatePresence>
        {!loaded && <Preloader onDone={() => setLoaded(true)} key="preloader" />}
      </AnimatePresence>
      <CustomCursor />
      <HomePage onNavigate={navigate} />
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppContent />
    </MotionConfig>
  )
}
