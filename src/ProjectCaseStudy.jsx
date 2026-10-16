import { useEffect } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { PROJECTS } from './projects.js'
import './ProjectCaseStudy.css'

function ExternalLink({ href, children, primary = false }) {
  return (
    <a
      className={`case-link${primary ? ' case-link-primary' : ''}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  )
}

export default function ProjectCaseStudy({ project, onNavigate }) {
  const projectIndex = PROJECTS.findIndex(({ slug }) => slug === project.slug)
  const previous = PROJECTS[(projectIndex - 1 + PROJECTS.length) % PROJECTS.length]
  const next = PROJECTS[(projectIndex + 1) % PROJECTS.length]

  useEffect(() => {
    document.title = `${project.title} | Godswill Okoi`
    const description = `${project.description} Read about my role, approach, and the delivered work.`
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', `${project.title} | Godswill Okoi`)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector('link[rel="canonical"]')?.setAttribute(
      'href',
      `${window.location.origin}/work/${project.slug}`,
    )
  }, [project])

  return (
    <div className="case-page">
      <a className="case-back" href="/#work" onClick={onNavigate}>
        <ArrowLeft size={15} aria-hidden="true" />
        Back to selected work
      </a>

      <main>
        <header className="case-hero">
          <p className="case-eyebrow">
            <span>{project.num}</span>
            <span aria-hidden="true">/</span>
            <span>{project.category}</span>
          </p>
          <h1>{project.title}</h1>
          <p className="case-intro">{project.description}</p>
          <div className="case-meta">
            <div>
              <span className="case-meta-label">My role</span>
              <span>{project.role}</span>
            </div>
            <div>
              <span className="case-meta-label">Project context</span>
              <span>{project.context}</span>
            </div>
          </div>
          <div className="case-actions">
            <ExternalLink href={project.live} primary>View Live Website</ExternalLink>
            <ExternalLink href={project.source}>View Source Code</ExternalLink>
          </div>
        </header>

        <section className="case-visual" aria-labelledby="selected-screens">
          <div className="case-section-heading">
            <span className="case-kicker">Project visual</span>
            <h2 id="selected-screens">Selected Screens</h2>
          </div>
          <figure>
            <img
              src={project.image}
              alt={project.imageAlt}
              width="2000"
              height="1600"
              fetchPriority="high"
            />
            <figcaption>Project mockup supplied with the portfolio assets.</figcaption>
          </figure>
        </section>

        <div className="case-content">
          <section className="case-overview">
            <div className="case-section-heading">
              <span className="case-kicker">01 — Context</span>
              <h2>Project Overview</h2>
            </div>
            <p>{project.overview}</p>
          </section>

          <section className="case-story">
            <article>
              <span className="case-kicker">02 — The need</span>
              <h2>The Challenge</h2>
              <p>{project.challenge}</p>
            </article>
            <article>
              <span className="case-kicker">03 — My contribution</span>
              <h2>My Role &amp; Approach</h2>
              <p>{project.approach}</p>
            </article>
          </section>

          <section className="case-built">
            <div className="case-section-heading">
              <span className="case-kicker">04 — Delivery</span>
              <h2>What I Built</h2>
            </div>
            <ul>
              {project.built.map(item => (
                <li key={item}>
                  <CheckCircle2 size={17} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="case-outcome">
            <span className="case-kicker">05 — Result</span>
            <h2>The Outcome</h2>
            <p>{project.outcome}</p>
          </section>

          <section className="case-tech">
            <div className="case-section-heading">
              <span className="case-kicker">Implementation</span>
              <h2>Technologies Used</h2>
            </div>
            <ul>
              {project.stack.map(item => <li key={item}>{item}</li>)}
            </ul>
          </section>

          <section className="case-bottom-cta">
            <span className="case-kicker">Have a similar project?</span>
            <h2>Let’s talk about what your website needs to do.</h2>
            <a href="/#contact" onClick={onNavigate} className="case-link case-link-primary">
              Discuss a project
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </section>
        </div>

        <nav className="case-project-nav" aria-label="Other case studies">
          <a href={`/work/${previous.slug}`} onClick={onNavigate}>
            <span><ArrowLeft size={14} aria-hidden="true" /> Previous project</span>
            <strong>{previous.name}</strong>
          </a>
          <a href={`/work/${next.slug}`} onClick={onNavigate}>
            <span>Next project <ArrowRight size={14} aria-hidden="true" /></span>
            <strong>{next.name}</strong>
          </a>
        </nav>
      </main>
    </div>
  )
}
