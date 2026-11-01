import { useState } from 'react'
import { ArrowUpRight, Menu, X, MapPin, Download, Check } from 'lucide-react'
import { PROJECTS } from './projects.js'

const skills = ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Figma to Code', 'Responsive UI']
const experience = [
  { period: '2024 — Present', role: 'Founder & Frontend Developer', company: 'Smotiva Digital Ltd.', detail: 'Leading digital design and web development projects for growing businesses.' },
  { period: '2023 — 2024', role: 'Frontend Developer', company: 'Azawire Africa', detail: 'Contributed to a multi-page financial services product across personal and business journeys.' },
  { period: '2023', role: 'Frontend Developer', company: 'Technolix Digitals', detail: 'Translated supplied Figma designs into responsive, production-ready React interfaces.' },
]

function Header({ open, setOpen }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Smart Moses home"><span className="brand-mark">SM</span><span>Smart Moses</span></a>
      <nav className={open ? 'nav open' : 'nav'} aria-label="Primary navigation">
        <a href="#work" onClick={() => setOpen(false)}>Selected work</a>
        <a href="#about" onClick={() => setOpen(false)}>About</a>
        <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
      </nav>
      <a className="header-cta" href="mailto:smartmoses@gmail.com">Let&apos;s talk <ArrowUpRight size={15} /></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X size={21} /> : <Menu size={21} />}</button>
    </header>
  )
}

function ProjectCard({ project, featured = false }) {
  return (
    <article className={featured ? 'project-card featured' : 'project-card'}>
      <a className="project-image" href={project.live} target="_blank" rel="noreferrer">
        <img src={project.image} alt={project.imageAlt} />
        <span className="image-link">View live site <ArrowUpRight size={16} /></span>
      </a>
      <div className="project-info">
        <div className="project-meta"><span>{project.num}</span><span>{project.category}</span></div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="tag-list">{project.stack.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
    </article>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  return (
    <div className="site-shell" id="top">
      <Header open={open} setOpen={setOpen} />
      <main>
        <section className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Available for select projects · Nigeria</p>
            <h1>I build digital products with <em>clarity.</em></h1>
            <p className="hero-intro">I&apos;m Smart Moses, a frontend developer and UI designer focused on making ambitious businesses look credible, feel intuitive, and work beautifully on every screen.</p>
            <div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <ArrowUpRight size={17} /></a><a className="text-link" href="/assets/pdf/Smart-Moses-Resume.pdf" download>Download résumé <Download size={15} /></a></div>
          </div>
          <div className="hero-aside"><div className="portrait-frame"><img src="/images/me.jpeg" alt="Smart Moses" /></div><p>Designing from idea<br />to interface.</p></div>
        </section>

        <section className="intro-strip section-wrap" aria-label="Introduction"><span>01 / What I do</span><p>Thoughtful interfaces for people and businesses that have something important to say.</p><span className="strip-line" /></section>

        <section className="work section-wrap" id="work">
          <div className="section-heading"><div><p className="eyebrow">02 / Selected work</p><h2>A few things I&apos;ve<br /><em>helped bring to life.</em></h2></div><p className="heading-note">A selection of client, studio, and in-house work. Each project starts with understanding the problem before choosing the pixels.</p></div>
          <div className="project-grid"><ProjectCard project={PROJECTS[0]} featured /><ProjectCard project={PROJECTS[1]} /><ProjectCard project={PROJECTS[2]} /></div>
        </section>

        <section className="about section-wrap" id="about">
          <div className="about-intro"><p className="eyebrow">03 / A little about me</p><h2>Good work lives<br />between <em>structure</em><br />and feeling.</h2></div>
          <div className="about-content"><p className="large-copy">I care about the details people notice and the ones they don&apos;t. My work sits at the intersection of visual design, frontend craft, and a clear understanding of what a business needs to communicate.</p><p>I&apos;ve worked across logistics, fintech, and digital studio environments — building responsive websites, translating designs, and helping teams ship with confidence.</p><div className="skill-list">{skills.map((skill) => <span key={skill}><Check size={14} />{skill}</span>)}</div></div>
        </section>

        <section className="experience section-wrap"><div className="section-heading compact"><div><p className="eyebrow">04 / Experience</p><h2>Where I&apos;ve been<br /><em>putting it into practice.</em></h2></div></div><div className="timeline">{experience.map((item) => <div className="timeline-item" key={item.company}><span className="timeline-period">{item.period}</span><div><h3>{item.role}</h3><p className="company">{item.company}</p><p>{item.detail}</p></div></div>)}</div></section>

        <section className="contact section-wrap" id="contact"><div><p className="eyebrow">05 / Start a conversation</p><h2>Have a good problem<br /><em>to solve?</em></h2></div><div className="contact-side"><p>Tell me a little about what you&apos;re building, where you&apos;re stuck, or what you&apos;d like to make better.</p><a className="contact-email" href="mailto:smartmoses@gmail.com">smartmoses@gmail.com <ArrowUpRight size={19} /></a><div className="socials"><a href="https://github.com/godswillokoi0001" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn ↗</a><span><MapPin size={16} /> Calabar, Nigeria</span></div></div></section>
      </main>
      <footer className="footer section-wrap"><span>© {new Date().getFullYear()} Smart Moses</span><span>Designed & built with intention.</span><a href="#top">Back to top ↑</a></footer>
    </div>
  )
}
