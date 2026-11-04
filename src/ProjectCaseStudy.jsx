import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { PROJECTS } from './projects.js'
/* Uses design.css loaded via App.jsx */

const EASE = [0.22, 1, 0.36, 1]

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export default function ProjectCaseStudy({ project, onNavigate }) {
  const projectIndex = PROJECTS.findIndex(({ slug }) => slug === project.slug)
  const previous = PROJECTS[(projectIndex - 1 + PROJECTS.length) % PROJECTS.length]
  const next = PROJECTS[(projectIndex + 1) % PROJECTS.length]

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })

    const prevTitle = document.title
    const descMeta = document.querySelector('meta[name="description"]')
    const ogTitleMeta = document.querySelector('meta[property="og:title"]')
    const canonicalLink = document.querySelector('link[rel="canonical"]')
    const prevDesc = descMeta?.getAttribute('content')
    const prevOgTitle = ogTitleMeta?.getAttribute('content')
    const prevCanonical = canonicalLink?.getAttribute('href')

    document.title = `${project.title} — Smart Moses`
    const desc = `${project.description} Full case study: challenge, role, and implementation.`
    descMeta?.setAttribute('content', desc)
    ogTitleMeta?.setAttribute('content', `${project.title} — Smart Moses`)
    canonicalLink?.setAttribute('href', `https://smartmoses.vercel.app/work/${project.slug}`)

    return () => {
      document.title = prevTitle
      if (prevDesc != null) descMeta?.setAttribute('content', prevDesc)
      if (prevOgTitle != null) ogTitleMeta?.setAttribute('content', prevOgTitle)
      if (prevCanonical != null) canonicalLink?.setAttribute('href', prevCanonical)
    }
  }, [project])

  const handleNav = (url, e) => {
    e?.preventDefault()
    onNavigate ? onNavigate(url) : (window.location.href = url)
  }

  return (
    <main id="case-main" style={{ background: 'var(--bg)' }}>
      {/* Hero */}
      <section className="case-hero">
        <div className="case-hero__img" aria-hidden="true">
          <img
            src={project.image}
            alt=""
            width="2000"
            height="1125"
            fetchPriority="high"
            loading="eager"
          />
        </div>

        <div className="wrap">
          <div className="case-hero__content">
            <a
              className="case-hero__back"
              href="/#work"
              onClick={(e) => handleNav('/#work', e)}
            >
              <ArrowLeft size={13} aria-hidden="true" />
              Selected work
            </a>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  fontWeight: 600,
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)' }}>{project.num}</span>
                <span style={{ color: 'var(--muted)' }}>—</span>
                <span style={{ color: 'var(--muted)' }}>{project.category}</span>
              </div>

              <h1 className="case-hero__title">{project.title}</h1>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                flexWrap: 'wrap',
              }}
            >
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                Live site <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              {project.source && (
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--ghost"
                >
                  Source code <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Meta strip */}
      <div className="case-meta-strip">
        <div className="wrap">
          <dl className="case-meta-grid">
            {project.highlights.map(({ label, value }) => (
              <div className="case-meta-item" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Body */}
      <div className="wrap case-body">
        {/* Overview */}
        <Reveal className="case-section">
          <span
            style={{
              fontSize: '0.6875rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
            }}
          >
            01 — Context
          </span>
          <h2>Project Overview</h2>
          <p>{project.overview}</p>
        </Reveal>

        {/* Challenge + Approach */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          <Reveal className="case-section">
            <span
              style={{
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
              }}
            >
              02 — The Requirement
            </span>
            <h2>The Challenge</h2>
            <p>{project.challenge}</p>
          </Reveal>

          <Reveal className="case-section" delay={0.08}>
            <span
              style={{
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
              }}
            >
              03 — My Approach
            </span>
            <h2>Role & Approach</h2>
            <p>{project.approach}</p>
          </Reveal>
        </div>

        {/* What I built */}
        <Reveal className="case-section" style={{ maxWidth: '100%' }}>
          <span
            style={{
              fontSize: '0.6875rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
            }}
          >
            04 — Delivery
          </span>
          <h2>What I Built</h2>
          <ul className="case-built-list">
            {project.built.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Reveal>

        {/* Gallery */}
        {project.gallery?.length > 0 && (
          <Reveal>
            <div className="case-gallery">
              {project.gallery.map((screen) => (
                <figure key={screen.src}>
                  <img
                    src={screen.src}
                    alt={screen.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--muted)',
                      marginTop: 'var(--space-2)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {screen.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        )}

        {/* Outcome */}
        <Reveal className="case-section">
          <span
            style={{
              fontSize: '0.6875rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
            }}
          >
            05 — Result
          </span>
          <h2>The Outcome</h2>
          <p>{project.outcome}</p>
        </Reveal>

        {/* Stack */}
        <Reveal className="case-section">
          <span
            style={{
              fontSize: '0.6875rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
            }}
          >
            Stack & Tools
          </span>
          <h2>Technologies Used</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
            {project.stack.map((tech) => (
              <span key={tech} className="stack-chip">{tech}</span>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(2rem, 5vw, 4rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                Need something similar?
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  maxWidth: '28ch',
                }}
              >
                Let's build a site that does the work for your business.
              </h2>
            </div>
            <a
              href="/#contact"
              onClick={(e) => handleNav('/#contact', e)}
              className="btn btn--primary"
              style={{ width: 'fit-content' }}
            >
              Discuss a project <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>

      {/* Prev / Next */}
      <div className="wrap case-next">
        <nav
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-5)',
          }}
          aria-label="Other case studies"
        >
          <a
            href={`/work/${previous.slug}`}
            onClick={(e) => handleNav(`/work/${previous.slug}`, e)}
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
          >
            <span className="case-next__label">
              <ArrowLeft size={12} aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
              Previous
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                letterSpacing: '-0.02em',
                color: 'var(--ink)',
                transition: 'color 0.2s',
                lineHeight: 1.1,
              }}
            >
              {previous.name}
            </h3>
          </a>

          <a
            href={`/work/${next.slug}`}
            onClick={(e) => handleNav(`/work/${next.slug}`, e)}
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', textAlign: 'right' }}
          >
            <span className="case-next__label" style={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Next
              <ArrowRight size={12} aria-hidden="true" style={{ display: 'inline' }} />
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                letterSpacing: '-0.02em',
                color: 'var(--ink)',
                transition: 'color 0.2s',
                lineHeight: 1.1,
              }}
            >
              {next.name}
            </h3>
          </a>
        </nav>
      </div>
    </main>
  )
}
