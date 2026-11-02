import { useEffect, useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Menu,
  X,
} from 'lucide-react'
import PricingPage from './PricingPage.jsx'
import ProjectCaseStudy from './ProjectCaseStudy.jsx'
import { PROJECTS } from './projects.js'
import './portfolio.css'

const EMAIL = 'smartmoses@gmail.com'
const GITHUB_URL = 'https://github.com/godswillokoi0001'
const WHATSAPP_URL =
  'https://wa.me/2348137038180?text=' +
  encodeURIComponent("Hi Smart Moses, I'd like to discuss a project.")
const EASE = [0.22, 1, 0.36, 1]

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES = [
  {
    number: '01',
    title: 'Business websites',
    detail: 'Clear, responsive websites that explain what a business does and make the next step easy to find.',
    scope: 'Structure · interface design · frontend build',
  },
  {
    number: '02',
    title: 'Landing pages',
    detail: 'Focused pages for a product, service, campaign, or launch, built around one useful action.',
    scope: 'Figma-to-code · React · responsive layouts',
  },
  {
    number: '03',
    title: 'Frontend development',
    detail: 'Thoughtful implementation of existing designs, with reusable components and careful browser testing.',
    scope: 'Semantic HTML · CSS · JavaScript · React',
  },
]

const PROCESS = [
  ['01', 'Understand', 'We agree on the audience, the main goal, and what the site needs to do.'],
  ['02', 'Set direction', 'I shape the page structure and visual approach around the real content.'],
  ['03', 'Build', 'The interface is developed responsively and checked in the browser as it takes shape.'],
  ['04', 'Review and hand off', 'We review the finished pages, resolve the details, and prepare the site for launch.'],
]

const EXPERIENCE = [
  {
    period: '2024-Present',
    role: 'Founder & Frontend Developer',
    organization: 'Smotiva Digital Ltd.',
    location: 'Nigeria',
    points: [
      'Lead digital design and web development projects for growing businesses.',
      'Designed and delivered the Rayto Prolog logistics website.',
      'Connect client business goals with practical frontend architecture.',
    ],
  },
  {
    period: '2023-2024',
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
    period: '2022-2023',
    role: 'Graphics Designer & Digital Creator',
    organization: 'Disolmedia',
    location: 'Cross River State, Nigeria',
    points: [
      'Created visual brand assets, video edits, and digital media for clients.',
      'Provided practical computer literacy and design instruction.',
    ],
  },
]

const SKILLS = [
  ['Frontend', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS'],
  ['Design', 'Figma', 'Visual design', 'Responsive UI'],
  ['Workflow', 'Git', 'GitHub', 'Vite', 'ESLint', 'Prettier', 'Vercel'],
]

function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const MotionElement = as === 'li' ? motion.li : motion.div
  return (
    <MotionElement
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </MotionElement>
  )
}

function SectionHeading({ index, label, title, copy, id }) {
  return (
    <div className="section-heading">
      <p className="eyebrow"><span>{index}</span>{label}</p>
      <h2 id={id}>{title}</h2>
      {copy && <p className="section-intro">{copy}</p>}
    </div>
  )
}

function SiteHeader({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const targets = NAV_LINKS
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean)
    if (!targets.length || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(`#${entry.target.id}`)
      })
    }, { rootMargin: '-30% 0px -60% 0px' })

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  const handleClick = (event, href) => {
    setMenuOpen(false)
    if (window.location.pathname !== '/') onNavigate(`/${href}`, event)
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="wordmark" href="/#top" onClick={(event) => handleClick(event, '#top')} aria-label="Smart Moses, home">
          <span className="wordmark-mark" aria-hidden="true">SM</span>
          <span className="wordmark-name">Smart Moses</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} onClick={(event) => handleClick(event, href)}
              aria-current={active === href ? 'location' : undefined}>
              {label}
            </a>
          ))}
          <a href="/pricingpage" onClick={(event) => onNavigate('/pricingpage', event)}>Pricing</a>
        </nav>

        <a className="header-cta" href="#contact" onClick={(event) => handleClick(event, '#contact')}>
          <span>Start a project</span><ArrowUpRight size={15} aria-hidden="true" />
        </a>

        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24, ease: EASE }}>
            {NAV_LINKS.map(({ label, href }) => (
              <a key={href} href={href} onClick={(event) => handleClick(event, href)}>{label}</a>
            ))}
            <a href="/pricingpage" onClick={(event) => onNavigate('/pricingpage', event)}>Pricing</a>
            <a className="mobile-nav-cta" href="#contact" onClick={(event) => handleClick(event, '#contact')}>
              Start a project <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero section-wrap" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow"><span>Independent practice</span>Web designer &amp; frontend developer</p>
        <h1 id="hero-title">Websites that make a business <em>clear, credible, and easy to choose.</em></h1>
        <p className="hero-lede">
          I design and build responsive websites and landing pages for growing businesses, pairing clear visual direction with careful frontend work.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#contact">Start a project <ArrowRight size={16} aria-hidden="true" /></a>
          <a className="text-link" href="#work">Selected work <ArrowDownRight size={16} aria-hidden="true" /></a>
        </div>
        <p className="hero-location"><span className="status-rule" aria-hidden="true" />Based in Nigeria · Working with teams worldwide</p>
      </div>

      <figure className="hero-portrait">
        <img src="/images/me.jpeg" alt="Smart Moses, web designer and frontend developer" width="832" height="837" fetchPriority="high" />
        <figcaption><span>Godswill Okoi</span><span>Web design / frontend</span></figcaption>
      </figure>
      <span className="hero-index" aria-hidden="true">SM / 01</span>
    </section>
  )
}

function ProjectEntry({ project, index, onNavigate }) {
  const openCaseStudy = (event) => onNavigate(`/work/${project.slug}`, event)
  const isLead = index === 0

  return (
    <Reveal className={`project-entry${isLead ? ' project-entry-lead' : ''}${index % 2 ? ' project-entry-reverse' : ''}`} delay={index * 0.04}>
      <a className="project-image-link" href={`/work/${project.slug}`} onClick={openCaseStudy}
        aria-label={`Read the ${project.name} case study`} style={{ aspectRatio: project.ratio || '16 / 9' }}>
        <img src={project.image} alt={project.imageAlt} width="2000" height="1125"
          loading={isLead ? 'eager' : 'lazy'} fetchPriority={isLead ? 'high' : 'auto'} decoding="async" />
        <span className="image-arrow" aria-hidden="true"><ArrowUpRight size={19} /></span>
      </a>
      <div className="project-copy">
        <div className="project-overline"><span>{project.num}</span><span>{project.category}</span></div>
        <h3><a href={`/work/${project.slug}`} onClick={openCaseStudy}>{project.name}</a></h3>
        <p className="project-summary">{project.description}</p>
        <p className="project-outcome"><span>Outcome</span>{project.outcome}</p>
        <dl className="project-details">
          <div><dt>Contribution</dt><dd>{project.role}</dd></div>
          <div><dt>Year</dt><dd>{project.year || 'Not provided'}</dd></div>
          <div><dt>Stack</dt><dd>{project.stack.join(' · ')}</dd></div>
        </dl>
        <div className="project-actions">
          <a href={`/work/${project.slug}`} onClick={openCaseStudy}>Case study <ArrowRight size={15} aria-hidden="true" /></a>
          <a href={project.live} target="_blank" rel="noopener noreferrer">Live site <ArrowUpRight size={14} aria-hidden="true" /></a>
          {project.source && <a href={project.source} target="_blank" rel="noopener noreferrer">Source <ArrowUpRight size={14} aria-hidden="true" /></a>}
        </div>
      </div>
    </Reveal>
  )
}

function Work({ onNavigate }) {
  return (
    <section className="section-wrap work-section" id="work" aria-labelledby="work-heading">
      <SectionHeading id="work-heading" index="01" label="Selected work" title="A few different briefs. One clear standard." copy="Client and in-house work across logistics, financial services, and design-to-code builds." />
      <div className="project-list">
        {PROJECTS.map((project, index) => <ProjectEntry key={project.slug} project={project} index={index} onNavigate={onNavigate} />)}
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="section-wrap services-section" id="services" aria-labelledby="services-title">
      <SectionHeading id="services-title" index="02" label="What I do" title="Useful work, from first layout to finished build." />
      <div className="service-list">
        {SERVICES.map((service) => (
          <Reveal className="service-row" key={service.number}>
            <span className="row-number">{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.detail}</p>
            <span className="service-scope">{service.scope}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="section-wrap process-section" id="process" aria-labelledby="process-heading">
      <SectionHeading id="process-heading" index="03" label="Process" title="A straightforward way to get from brief to browser." />
      <ol className="process-list">
        {PROCESS.map(([number, title, description]) => (
          <Reveal as="li" className="process-step" key={number}>
            <span className="row-number">{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

function About() {
  return (
    <section className="section-wrap about-section" id="about" aria-labelledby="about-title">
      <div className="about-heading">
        <SectionHeading id="about-title" index="04" label="About" title="Design thinking, grounded in the browser." />
        <p className="about-location">Cross River State, Nigeria</p>
      </div>
      <div className="about-copy">
        <p className="about-lede">I’m Smart Moses (Godswill Okoi), a web designer and frontend developer. I build websites that are clear, fast, and useful to the businesses they represent.</p>
        <p>My background in graphic design and visual communication shapes how I think about hierarchy, content, and the details that make an interface feel considered.</p>
        <p>My focus is frontend work: semantic HTML, clean CSS, JavaScript, and React, with mobile responsiveness built in from the start.</p>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section-wrap experience-section" id="experience" aria-labelledby="experience-title">
      <SectionHeading id="experience-title" index="05" label="Experience" title="Work shaped by teams, clients, and real constraints." />
      <ol className="experience-list">
        {EXPERIENCE.map((job, index) => (
          <Reveal as="li" className="experience-row" key={`${job.organization}-${job.period}`} delay={index * 0.03}>
            <p className="experience-period">{job.period}</p>
            <div className="experience-main">
              <h3>{job.role}</h3>
              <p className="experience-org">{job.organization}<span> · {job.location}</span></p>
              <ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

function Skills() {
  return (
    <section className="section-wrap skills-section" id="skills" aria-labelledby="skills-title">
      <SectionHeading id="skills-title" index="06" label="Tools & skills" title="A practical set of tools for the work." />
      <div className="skill-list">
        {SKILLS.map(([category, ...items]) => (
          <div className="skill-row" key={category}>
            <h3>{category}</h3><p>{items.join(' · ')}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ContactForm() {
  const [state, setState] = useState('idle')
  const [errors, setErrors] = useState({})

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const values = Object.fromEntries(formData.entries())
    const nextErrors = {}
    if (!String(values.name || '').trim()) nextErrors.name = 'Add your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(values.email || '').trim())) nextErrors.email = 'Enter a valid email address.'
    if (!String(values.message || '').trim()) nextErrors.message = 'Add a short note about your project.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setState('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) throw new Error('Message could not be sent.')
      setState('success')
      form.reset()
    } catch {
      setState('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" name="name" autoComplete="name" required maxLength="120" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} />
        {errors.name && <span className="field-error" id="contact-name-error">{errors.name}</span>}
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength="254" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} />
        {errors.email && <span className="field-error" id="contact-email-error">{errors.email}</span>}
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" rows="5" required maxLength="6000" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} />
        {errors.message && <span className="field-error" id="contact-message-error">{errors.message}</span>}
      </div>
      <div className="form-trap" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" tabIndex="-1" autoComplete="off" />
      </div>
      <div className="form-submit-row">
        <button className="button button-primary" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending...' : 'Send message'} <ArrowRight size={16} aria-hidden="true" />
        </button>
        <p className="form-status" aria-live="polite" role={state === 'error' ? 'alert' : undefined}>
          {state === 'success' && 'Message sent. Thanks for getting in touch.'}
          {state === 'error' && <>The message could not be sent. Email me at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</>}
        </p>
      </div>
    </form>
  )
}

function Contact() {
  return (
    <section className="section-wrap contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="contact-intro">
        <SectionHeading id="contact-heading" index="07" label="Contact" title="Have a website to make clearer?" copy="Tell me what you’re working on. We can start with the audience, the problem, and what the site needs to do." />
        <a className="contact-email" href={`mailto:${EMAIL}`}>{EMAIL}<ArrowUpRight size={18} aria-hidden="true" /></a>
        <div className="social-links" aria-label="Contact links">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={14} aria-hidden="true" /></a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="contact-form-wrap">
        <ContactForm />
        <p className="form-note">Form delivery needs the Resend environment variables listed in the README. Email is available as a direct alternative.</p>
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <a className="footer-brand" href="#top">Smart Moses <span>Web Designer &amp; Frontend Developer</span></a>
        <p>© {new Date().getFullYear()} Smart Moses</p>
        <a className="back-to-top" href="#top">Back to top <ArrowUp size={14} aria-hidden="true" /></a>
      </div>
    </footer>
  )
}

function HomePage({ onNavigate }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader onNavigate={onNavigate} />
      <main id="main-content">
        <Hero />
        <Work onNavigate={onNavigate} />
        <Services />
        <Process />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}

function NotFound() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Page Not Found — Smart Moses'
    return () => { document.title = previousTitle }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main className="not-found section-wrap" id="main-content">
        <p className="eyebrow"><span>404</span>Page not found</p>
        <h1>This page isn’t here.</h1>
        <p>The address may have changed, or the page may not exist.</p>
        <a className="button button-primary" href="/">Back to the portfolio <ArrowRight size={16} aria-hidden="true" /></a>
      </main>
      <SiteFooter />
    </>
  )
}

function AppContent() {
  const [path, setPath] = useState(() => window.location.pathname.replace(/\/$/, '') || '/')

  useEffect(() => {
    const syncPath = () => setPath(window.location.pathname.replace(/\/$/, '') || '/')
    window.addEventListener('popstate', syncPath)
    return () => window.removeEventListener('popstate', syncPath)
  }, [])

  function navigate(url, event) {
    event?.preventDefault()
    window.history.pushState(null, '', url)
    setPath(window.location.pathname.replace(/\/$/, '') || '/')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hashIndex = url.indexOf('#')
    if (hashIndex >= 0) {
      const targetId = url.slice(hashIndex + 1)
      window.requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }))
    } else {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    }
  }

  if (path === '/pricingpage') {
    return <><a className="skip-link" href="#pricing-main">Skip to content</a><main id="pricing-main"><PricingPage onNavigate={navigate} /></main><SiteFooter /></>
  }

  const projectMatch = path.match(/^\/work\/([^/]+)$/)
  if (projectMatch) {
    const project = PROJECTS.find(({ slug }) => slug === projectMatch[1])
    if (!project) return <NotFound />
    return <><a className="skip-link" href="#case-main">Skip to content</a><ProjectCaseStudy project={project} onNavigate={navigate} /><SiteFooter /></>
  }

  if (path !== '/') return <NotFound />
  return <HomePage onNavigate={navigate} />
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppContent />
    </MotionConfig>
  )
}