import { useEffect } from 'react'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2,
  ExternalLink as ExternalLinkIcon, Code2, Globe, Sparkles,
} from 'lucide-react'
import { PROJECTS } from './projects.js'
import './ProjectCaseStudy.css'

function ActionBtn({ href, children, primary = false, icon: Icon = ArrowUpRight }) {
  return (
    <a
      className={`case-link${primary ? ' case-link-primary' : ''}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon size={15} aria-hidden="true" />
      <span>{children}</span>
    </a>
  )
}

export default function ProjectCaseStudy({ project, onNavigate, ThemeToggle }) {
  const projectIndex = PROJECTS.findIndex(({ slug }) => slug === project.slug)
  const previous = PROJECTS[(projectIndex - 1 + PROJECTS.length) % PROJECTS.length]
  const next = PROJECTS[(projectIndex + 1) % PROJECTS.length]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.title = `${project.title} — Smart Moses`
    const description = `${project.description} Read the complete case study detailing the challenge, role, implementation, and outcome.`
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', `${project.title} — Smart Moses`)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector('link[rel="canonical"]')?.setAttribute(
      'href',
      `https://smartmoses.vercel.app/work/${project.slug}`,
    )
  }, [project])

  const handleNav = (url, e) => {
    if (e && e.preventDefault) e.preventDefault()
    if (onNavigate) {
      onNavigate(url)
    } else {
      window.location.href = url
    }
  }

  return (
    <div className="case-page">
      {/* Top Bar with Back Link & Theme Switcher */}
      <div className="case-topbar">
        <a className="case-back" href="/#work" onClick={(e) => handleNav('/#work', e)}>
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to selected work</span>
        </a>

        {ThemeToggle && (
          <div className="case-theme-wrap">
            <ThemeToggle showLabels={false} />
          </div>
        )}
      </div>

      <main>
        {/* Hero Header */}
        <header className="case-hero">
          <div className="case-eyebrow">
            <span className="case-num">{project.num}</span>
            <span className="case-slash" aria-hidden="true">/</span>
            <span className="case-category">{project.category}</span>
          </div>

          <h1 className="case-title">{project.title}</h1>
          <p className="case-intro">{project.description}</p>

          <div className="case-meta">
            <div>
              <span className="case-meta-label">My Role</span>
              <span className="case-meta-value">{project.role}</span>
            </div>
            <div>
              <span className="case-meta-label">Project Context</span>
              <span className="case-meta-value">{project.context}</span>
            </div>
          </div>

          <div className="case-actions">
            <ActionBtn href={project.live} primary icon={Globe}>
              View Live Website
            </ActionBtn>
            <ActionBtn href={project.source} icon={Code2}>
              View Source Code
            </ActionBtn>
          </div>
        </header>

        {/* Selected Screens (Hero Mockup) */}
        <section className="case-visual" aria-labelledby="selected-screens">
          <div className="case-section-heading">
            <span className="case-kicker">Visual Implementation</span>
            <h2 id="selected-screens">Selected Screens</h2>
          </div>
          <figure className="case-figure">
            <img
              src={project.image}
              alt={project.imageAlt}
              width="2000"
              height="1600"
              fetchPriority="high"
              loading="eager"
            />
            <figcaption className="case-figcaption">
              Official project mockup for {project.name}.
            </figcaption>
          </figure>

          {project.gallery?.length > 0 && (
            <div className="case-supporting-screens" aria-label="Supporting project screens">
              {project.gallery.map((screen) => (
                <figure className="case-supporting-figure" key={screen.src}>
                  <img src={screen.src} alt={screen.alt} loading="eager" />
                  <figcaption>{screen.label}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>

        {/* Structured Case Study Content */}
        <div className="case-content">
          {/* 01: Project Overview */}
          <section className="case-section case-overview">
            <div className="case-section-heading">
              <span className="case-kicker">01 — Context</span>
              <h2>Project Overview</h2>
            </div>
            <div className="case-prose">
              <p>{project.overview}</p>
            </div>
          </section>

          {/* 02 & 03: The Challenge & My Role & Approach */}
          <section className="case-section case-story">
            <article className="case-story-card">
              <span className="case-kicker">02 — The Requirement</span>
              <h2>The Challenge</h2>
              <p>{project.challenge}</p>
            </article>

            <article className="case-story-card">
              <span className="case-kicker">03 — My Approach</span>
              <h2>My Role &amp; Approach</h2>
              <p>{project.approach}</p>
            </article>
          </section>

          {/* 04: What I Built */}
          <section className="case-section case-built">
            <div className="case-section-heading">
              <span className="case-kicker">04 — Delivery</span>
              <h2>What I Built</h2>
            </div>
            <ul className="case-built-list">
              {project.built.map((item, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={18} strokeWidth={2.2} aria-hidden="true" className="case-check" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 05: The Outcome */}
          <section className="case-section case-outcome">
            <div className="case-section-heading">
              <span className="case-kicker">05 — Result</span>
              <h2>The Outcome</h2>
            </div>
            <div className="case-prose">
              <p>{project.outcome}</p>
            </div>
          </section>

          {/* 06: Technologies Used */}
          <section className="case-section case-tech">
            <div className="case-section-heading">
              <span className="case-kicker">Stack &amp; Tools</span>
              <h2>Technologies Used</h2>
            </div>
            <ul className="case-tech-list">
              {project.stack.map(tech => (
                <li key={tech} className="case-tech-tag">
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          {/* Bottom Conversion CTA */}
          <section className="case-bottom-cta">
            <div className="case-cta-text">
              <span className="case-kicker">Need a similar solution?</span>
              <h2>Let’s talk about what your website needs to do.</h2>
              <p>
                From clean business presentation sites to Figma-to-code implementations,
                I’m available to discuss your requirements and build a high-credibility frontend.
              </p>
            </div>
            <a
              href="/#contact"
              onClick={(e) => handleNav('/#contact', e)}
              className="case-link case-link-primary case-cta-btn"
            >
              <span>Discuss a project</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </section>
        </div>

        {/* Previous & Next Project Navigation */}
        <nav className="case-project-nav" aria-label="Other case studies">
          <a
            href={`/work/${previous.slug}`}
            onClick={(e) => handleNav(`/work/${previous.slug}`, e)}
            className="case-nav-prev"
          >
            <span className="case-nav-sub">
              <ArrowLeft size={14} aria-hidden="true" /> Previous Project
            </span>
            <strong className="case-nav-name">{previous.name}</strong>
          </a>

          <a
            href={`/work/${next.slug}`}
            onClick={(e) => handleNav(`/work/${next.slug}`, e)}
            className="case-nav-next"
          >
            <span className="case-nav-sub">
              Next Project <ArrowRight size={14} aria-hidden="true" />
            </span>
            <strong className="case-nav-name">{next.name}</strong>
          </a>
        </nav>
      </main>
    </div>
  )
}
