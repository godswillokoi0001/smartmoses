import { motion } from 'framer-motion'

const sectionMotion = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.85, ease: 'easeOut' },
}

const trustPoints = [
  'Brand clarity for premium audiences',
  'Cinematic digital storytelling',
  'High-conversion product systems',
  'Deliberate interface composition',
  'Responsive, premium web experiences',
]

const services = [
  {
    title: 'Web Design & Development',
    description:
      'Build polished digital destinations that feel premium, scale effortlessly, and communicate your brand with clarity.',
    highlight: 'Experience-first websites built with design, structure, and technical finesse.',
  },
  {
    title: 'Brand & Visual Design',
    description:
      'Create visual systems, identity work, and expressive digital assets that elevate perception and build trust.',
    highlight: 'Brand direction with a cinematic, modern, and highly intentional voice.',
  },
  {
    title: 'Video Editing & Content Visuals',
    description:
      'Shape short-form storytelling, motion content, and social visuals that amplify message and speed connection.',
    highlight: 'Clean, strategic edits and visual systems for consistent brand impact.',
  },
]

const projects = [
  {
    title: 'Evoke Studio Launch',
    label: 'Brand, Web System & Launch',
    role: 'Lead Product Designer',
    overview:
      'A premium launch platform for a creative studio that needed digital presence, storytelling, and conversion clarity.',
    challenge:
      'Position the studio as a thoughtful, high-end brand without relying on generic visuals or complex navigation.',
    solution:
      'Crafted an immersive narrative structure with dramatic pacing, strong visual hierarchy, and strategic contact cues.',
    outcome:
      'Audience engagement increased by 42% while qualified inquiries doubled in the first month.',
    impact:
      'Strong brand perception, easier selling conversations, faster client qualification.',
    tools: ['React', 'Tailwind CSS', 'Figma', 'Brand Strategy'],
  },
  {
    title: 'Motion Brand Reveal',
    label: 'Content System & Motion Direction',
    role: 'Creative Director',
    overview:
      'A visual content system for a coaching brand that needed cinematic digital experiences and memorable launch messaging.',
    challenge:
      'Translate brand emotion into short-form motion without losing the premium visual direction.',
    solution:
      'Built layered motion concepts, clear editorial structure, and story-driven social frameworks.',
    outcome:
      'The launch saw stronger social traction and a more coherent brand identity across video channels.',
    impact:
      'Higher content recall, better audience trust, and stronger creative cohesion.',
    tools: ['Premiere', 'After Effects', 'Brand Strategy'],
  },
  {
    title: 'Responsive Product Narrative',
    label: 'Website Design & Strategy',
    role: 'Experience Architect',
    overview:
      'A responsive digital experience for a product founder needing market clarity, trust, and premium positioning.',
    challenge:
      'Build a memorable website that made the product feel premium, intuitive, and easy to scope.',
    solution:
      'Executed a minimalist interface with bold hierarchy, clear storytelling, and elegant interactions.',
    outcome:
      'Delivered a launch-ready experience that elevated brand perception and accelerated new conversations.',
    impact:
      'Sharper product positioning, improved trust, faster buyer understanding.',
    tools: ['React', 'Tailwind CSS', 'Content Strategy'],
  },
]

const whyPoints = [
  {
    title: 'Strategic Thinking',
    description:
      'Every visual decision starts with a business outcome: trust, clarity, and movement toward action.',
  },
  {
    title: 'Premium Visual Direction',
    description:
      'Minimal details, cinematic contrast, and considered spacing that elevate the way your brand is perceived.',
  },
  {
    title: 'User-Focused Execution',
    description:
      'Interfaces that feel intuitive, composed, and purpose-built for modern audiences.',
  },
  {
    title: 'Multi-Disciplinary Approach',
    description:
      'Design, technology, branding, and motion working together for a cohesive creative system.',
  },
]

const testimonials = [
  {
    quote:
      'Smart Moses brought clarity to our launch and helped us communicate our value with premium confidence.',
    name: 'Aisha Bello',
    role: 'Founder, Luma Collective',
  },
  {
    quote:
      'The site felt cinematic yet grounded. It helped our brand feel more strategic and emotionally resonant.',
    name: 'Daniel Nwachukwu',
    role: 'CEO, Novo Studio',
  },
  {
    quote:
      'His design system made content feel purposeful and polished across every digital touchpoint.',
    name: 'Kemi Ade',
    role: 'Creative Director, Atlas Labs',
  },
]

const processSteps = [
  'Discovery & Direction',
  'Strategy & Structure',
  'Design & Development',
  'Refinement & Delivery',
]

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050507] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.12),_transparent_18%),radial-gradient(circle_at_20%_10%,_rgba(168,85,247,0.08),_transparent_14%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-8 sm:px-8 lg:px-10">
        <header className="sticky top-0 z-30 mx-auto mb-16 w-full rounded-[2rem] border border-white/10 bg-slate-950/75 px-6 py-5 shadow-2xl shadow-slate-950/20 backdrop-blur-2xl sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.34em] text-cyan-300/70">Smart Moses</p>
                <p className="mt-2 max-w-xxl text-sm leading-6 text-slate-300">
                  Creative Technologist & Digital Brand Builder for founders, creators, and premium brands.
                </p>
              </div>
              <nav className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-300 sm:justify-end">
                <a href="#about" className="transition hover:text-white">About</a>
                <a href="#services" className="transition hover:text-white">Services</a>
                <a href="#work" className="transition hover:text-white">Work</a>
                <a href="#contact" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-cyan-300/40 hover:text-white">
                  Contact
                </a>
              </nav>
            </div>
          </header>
        <main>
          <motion.section
            className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-slate-950/95 p-6 shadow-[0_45px_140px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.12),transparent_28%)]" />
            <div className="relative grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div className="space-y-10">
                <div className="max-w-3xl space-y-5">
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/75">Creative partner for premium digital brands</p>
                  <h1 className="text-4xl font-black leading-[0.92] tracking-[-0.05em] text-white sm:text-5xl lg:text-4xl">
                    Smart Moses crafts cinematic digital brands that feel strategic, confident, and unmistakably refined.
                  </h1>
                  <p className="max-w-3xl text-lg leading-8 text-slate-300/90 sm:text-xl">
                    I help ambitious founders, studios, and startups move beyond developer-first websites with premium storytelling, polished UX, and deliberate brand direction.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 text-sm font-semibold text-slate-950 shadow-[0_26px_80px_rgba(56,189,248,0.28)] transition duration-300 hover:shadow-[0_30px_90px_rgba(56,189,248,0.32)]"
                  >
                    Start a premium project
                  </a>
                  <a
                    href="#work"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition duration-300 hover:border-cyan-300/40 hover:text-white"
                  >
                    Explore case studies
                  </a>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {trustPoints.map(item => (
                    <div key={item} className="rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-200 shadow-[0_22px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 28 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.95, ease: 'easeOut' }}
                className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-slate-900/85 p-6 shadow-[0_45px_120px_rgba(15,23,42,0.35)] sm:p-8"
              >
                <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_45%)]" />
                <div className="absolute -right-10 top-8 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="absolute -left-10 bottom-10 h-44 w-44 rounded-full bg-violet-500/10 blur-3xl" />
                <div className="relative rounded-[2rem] border border-white/10 bg-slate-950/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                  <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),transparent_70%)]" />
                  <div className="relative flex flex-col gap-5">
                    <div className="space-y-4">
                      <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Portrait & identity</p>
                      <div className="relative h-72 overflow-hidden rounded-[2rem] border border-white/10 shadow-[inset_0_-10px_40px_rgba(15,23,42,0.5)]">
                        <img
                          src="/images/me.jpeg"
                          alt="Smart Moses portrait"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(56,189,248,0.18),transparent_40%),radial-gradient(circle_at_80%_10%,_rgba(168,85,247,0.14),transparent_35%)]" />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
                        <p className="font-semibold text-white">Brand system</p>
                        <p className="mt-2 text-sm leading-6 text-slate-400">A calm, confident identity system built around gradient depth, refined type, and intentional contrast.</p>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
                        <p className="font-semibold text-white">Visual mood</p>
                        <p className="mt-2 text-sm leading-6 text-slate-400">A premium tonal palette with cinematic glow, layered shadows, and rich dark surfaces.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            id="about"
            className="mt-20 rounded-[3rem] border border-white/10 bg-slate-950/85 p-6 shadow-[0_45px_120px_rgba(15,23,42,0.22)] backdrop-blur-xl sm:p-8"
            {...sectionMotion}
          >
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="space-y-7">
                <p className="text-xs uppercase tracking-[0.34em] text-cyan-300/80">About the practice</p>
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                  I turn ambitious brands into digital experiences with clarity, craft, and lasting impact.
                </h2>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  This work is not about developer badges or generic layouts. It is about building calm, memorable systems that help brands feel more premium, more persuasive, and more present.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.26)]">
                    <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Focus</p>
                    <p className="mt-3 text-slate-300 leading-7">Digital products and brand systems for founders, studios, and premium service businesses.</p>
                  </div>
                  <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.26)]">
                    <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Approach</p>
                    <p className="mt-3 text-slate-300 leading-7">Clear storytelling, strong visual rhythm, and deliberate interaction design to improve trust and conversion.</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-slate-900/80 shadow-[0_45px_120px_rgba(15,23,42,0.28)]">
                <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_60%)]" />
                <div className="relative space-y-6 p-6 sm:p-8">
                  <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
                    <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Why it works</p>
                    <p className="mt-4 text-slate-300 leading-7">I blend brand-first strategy with polished digital craftsmanship so every screen feels intentional and aligned.</p>
                  </div>
                  <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
                    <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">What that creates</p>
                    <ul className="mt-4 space-y-3 text-slate-300">
                      <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" />Calm layouts with premium breathing room.</li>
                      <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" />Clear storytelling that removes friction.</li>
                      <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" />Cinematic design language built for trust and conversion.</li>
                    </ul>
                  </div>
                  <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
                    <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Recent pulse</p>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl bg-slate-900/85 p-4 text-sm text-slate-200">
                        <p className="font-semibold text-white">+42%</p>
                        <p className="mt-2 text-slate-400">Qualified lead growth</p>
                      </div>
                      <div className="rounded-3xl bg-slate-900/85 p-4 text-sm text-slate-200">
                        <p className="font-semibold text-white">2x</p>
                        <p className="mt-2 text-slate-400">Faster brand clarity</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section id="services" className="mt-20" {...sectionMotion}>
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="space-y-8">
                <div className="max-w-3xl">
                  <p className="text-xs uppercase tracking-[0.34em] text-cyan-300/80">What Gets Built</p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">Design systems, digital products, and motion-led stories for brands that want to feel premium.</h2>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                    I focus on experiences that look polished, feel effortless, and create a confident digital presence with every scroll.
                  </p>
                </div>
                <div className="rounded-[3rem] border border-white/10 bg-slate-900/85 shadow-[0_40px_110px_rgba(15,23,42,0.18)] p-6">
                  <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Studio services</p>
                  <p className="mt-6 text-lg leading-8 text-slate-300">
                    Strategy, brand systems, and refined digital execution that helps premium founders turn attention into trust.
                  </p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.75rem] bg-slate-950/80 p-4">
                      <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Brand Identity</p>
                      <p className="mt-3 text-slate-300 leading-7">Positioning, visual direction, and a tone that feels modern and consistent.</p>
                    </div>
                    <div className="rounded-[1.75rem] bg-slate-950/80 p-4">
                      <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Digital Product</p>
                      <p className="mt-3 text-slate-300 leading-7">Experience design, interface systems, and responsive builds that scale elegantly.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                {services.map(service => (
                  <motion.article
                    key={service.title}
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 190, damping: 22 }}
                    className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/75 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.2)] transition duration-300 hover:-translate-y-1 hover:bg-slate-900/85"
                  >
                    <div className="absolute -right-10 top-10 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-slate-900 text-cyan-300 shadow-[0_20px_40px_rgba(56,189,248,0.12)]">
                      <span className="text-2xl font-semibold">•</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-4 text-slate-300">{service.description}</p>
                    <div className="mt-6 rounded-[2rem] bg-slate-900/85 p-4 text-sm text-cyan-200/90">
                      <p className="font-semibold">{service.highlight}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section 
            id="work" 
            className="mt-20 rounded-[3rem] border border-white/10 bg-slate-950/85 p-6 shadow-[0_45px_120px_rgba(15,23,42,0.24)] sm:p-8"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <div className="space-y-10">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.34em] text-cyan-300/80">Selected Case Studies</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">Projects designed to feel premium, purposeful, and memorable.</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                  Each project is shown as a strategic story, not a generic portfolio card. The focus is on clarity, emotional resonance, and why the outcome mattered.
                </p>
              </div>

              <div className="space-y-12">
                {projects.map((project, index) => (
                  <motion.article
                    key={project.title}
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 24 }}
                    className={`group grid gap-10 rounded-[2.5rem] border border-white/10 bg-slate-900/80 p-6 shadow-[0_30px_110px_rgba(15,23,42,0.18)] lg:grid-cols-[1fr_1fr] ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                  >
                    <div className="space-y-6 lg:pt-6">
                      <span className="inline-flex rounded-full border border-white/10 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-cyan-200/80">
                        {project.label}
                      </span>
                      <h3 className="text-3xl font-semibold text-white sm:text-4xl">{project.title}</h3>
                      <p className="max-w-2xl text-slate-300">{project.overview}</p>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5">
                          <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Challenge</p>
                          <p className="mt-3 text-slate-300">{project.challenge}</p>
                        </div>
                        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5">
                          <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Solution</p>
                          <p className="mt-3 text-slate-300">{project.solution}</p>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5">
                          <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Role</p>
                          <p className="mt-3 text-slate-300">{project.role}</p>
                        </div>
                        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5">
                          <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Outcome</p>
                          <p className="mt-3 text-slate-300">{project.outcome}</p>
                        </div>
                        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5">
                          <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Impact</p>
                          <p className="mt-3 text-slate-300">{project.impact}</p>
                        </div>
                      </div>

                      <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Tools used</p>
                      <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                        {project.tools.map(tool => (
                          <span key={tool} className="rounded-full border border-white/10 bg-white/5 px-3 py-2">{tool}</span>
                        ))}
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/90 shadow-[0_25px_80px_rgba(15,23,42,0.3)]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.12),transparent_30%)]" />
                      <div className="relative grid gap-6 p-6">
                        <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-5">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Desktop preview</p>
                            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Live concept</span>
                          </div>
                          <div className="mt-5 h-56 rounded-[1.75rem] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-[inset_0_0_70px_rgba(0,0,0,0.4)]" />
                        </div>
                        <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-4">
                          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Mobile view</p>
                          <div className="mt-5 h-44 rounded-[1.75rem] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-[inset_0_0_50px_rgba(0,0,0,0.35)]" />
                        </div>
                        <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-4">
                          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Studio note</p>
                          <p className="mt-4 text-slate-300 leading-7">A product-focused presentation that makes every project feel like a thoughtful experience rather than a generic case study.</p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section className="mt-12 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_40px_100px_rgba(15,23,42,0.22)] sm:p-8" {...sectionMotion}>
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.34em] text-cyan-300/80">Why Work With Me</p>
                <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">A premium trust-building approach grounded in strategy and clarity.</h2>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  I help brands move beyond generic digital experiences with design systems, visual storytelling, and sound execution that feel refined and reliable.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {whyPoints.map(point => (
                  <div key={point.title} className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.2)]">
                    <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">{point.title}</p>
                    <p className="mt-4 text-slate-300 leading-7">{point.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section className="mt-20" {...sectionMotion}>
            <div className="space-y-8">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.34em] text-cyan-300/80">Testimonials</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">Trusted by founders who want digital work with confidence.</h2>
              </div>
              <div className="grid gap-6 lg:grid-cols-[1.35fr_0.8fr]">
                <div className="rounded-[3rem] border border-white/10 bg-slate-950/75 p-8 shadow-[0_35px_100px_rgba(15,23,42,0.2)]">
                  <p className="text-xl leading-9 text-slate-200">“Smart Moses brought clarity to our launch and helped us communicate our value with premium confidence. The site felt cinematic yet grounded and helped our audience feel the brand immediately.”</p>
                  <div className="mt-10 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-400/10 text-cyan-300">
                      <span className="text-2xl font-semibold">A</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Aisha Bello</p>
                      <p className="text-sm text-slate-400">Founder, Luma Collective</p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-6">
                  {testimonials.slice(1).map(item => (
                    <div key={item.name} className="rounded-[2.5rem] border border-white/10 bg-slate-950/75 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.18)]">
                      <p className="text-lg leading-8 text-slate-200">“{item.quote}”</p>
                      <div className="mt-8 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                          <span className="text-xl font-semibold">{item.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-white">{item.name}</p>
                          <p className="text-sm text-slate-400">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section className="mt-20 rounded-[3rem] border border-white/10 bg-slate-950/85 p-6 shadow-[0_45px_120px_rgba(15,23,42,0.22)] sm:p-8" {...sectionMotion}>
            <div className="space-y-10">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.34em] text-cyan-300/80">Process</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">A carefully designed journey from direction to launch.</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                  Every project follows a clear flow that keeps the brand voice consistent, the experience intuitive, and the delivery polished.
                </p>
              </div>

              <div className="relative grid gap-8 md:grid-cols-2">
                <div className="absolute left-1/2 top-12 hidden h-[calc(100%-4rem)] w-px bg-white/10 md:block" />
                {processSteps.map((step, index) => (
                  <div key={step} className={`relative rounded-[2.5rem] border border-white/10 bg-slate-900/75 p-6 shadow-[0_25px_50px_rgba(15,23,42,0.18)] ${index % 2 === 0 ? 'md:ml-auto md:w-[90%]' : 'md:mr-auto md:w-[90%]'}`}>
                    <div className="absolute left-1/2 top-0 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20 bg-slate-950/90 text-center text-sm font-semibold leading-14 text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Step {index + 1}</p>
                    <h3 className="mt-4 text-2xl font-semibold text-white">{step}</h3>
                    <p className="mt-4 text-slate-300 leading-7">A premium process that balances strategic direction, elegant design, and high-quality delivery.</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section id="contact" className="mt-20 rounded-[3rem] border border-white/10 bg-slate-950/95 p-6 shadow-[0_45px_120px_rgba(15,23,42,0.28)] sm:p-8" {...sectionMotion}>
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.34em] text-cyan-300/80">Final CTA</p>
                <h2 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                  Let’s build a premium digital presence that feels cinematic and strategic.
                </h2>
                <p className="max-w-3xl text-lg leading-8 text-slate-300">
                  If you want a website that communicates brand authority, feels intentional, and converts with confidence, this is the place to start.
                </p>
              </div>
              <div className="rounded-[3rem] border border-white/10 bg-slate-900/80 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.25)]">
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Available for carefully selected projects</p>
                <p className="mt-4 text-slate-300 leading-7">I work with founders and teams who want a digital experience that feels elevated, intentional, and built to support their brand story.</p>
                <a
                  href="mailto:hello@smartmoses.com"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-7 py-4 text-sm font-semibold text-slate-950 transition duration-300 hover:shadow-[0_24px_80px_rgba(56,189,248,0.24)]"
                >
                  Send a project brief
                </a>
                <p className="mt-6 text-sm text-slate-400">Please include your brand focus, timeline, and audience so I can respond with the right next step.</p>
              </div>
            </div>
          </motion.section>
        </main>

        <footer className="mt-20 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 text-slate-300 shadow-[0_30px_70px_rgba(15,23,42,0.2)] sm:p-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.34em] text-cyan-300/80">Smart Moses</p>
              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-300">
                Creative Technologist & Digital Brand Builder
                Building modern digital experiences through design, development, branding, and visual storytelling.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Navigation</p>
                <nav className="mt-4 flex flex-col gap-3 text-slate-300">
                  <a href="#about" className="transition hover:text-white">About</a>
                  <a href="#services" className="transition hover:text-white">Services</a>
                  <a href="#work" className="transition hover:text-white">Work</a>
                </nav>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Connect</p>
                <div className="mt-4 space-y-3 text-slate-300">
                  <a href="mailto:hello@smartmoses.com" className="transition hover:text-white">hello@smartmoses.com</a>
                  <a href="#contact" className="transition hover:text-white">Start a conversation</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
