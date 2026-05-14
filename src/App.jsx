import { motion } from 'framer-motion'

const sectionMotion = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: 'easeOut' },
}

const trustPoints = [
  'Modern Digital Experiences',
  'Strategic Brand Thinking',
  'Conversion-Focused Design',
  'Responsive Web Development',
  'Visual Storytelling & Content',
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
    label: 'Brand & Experience, Web System',
    overview:
      'A premium launch platform for a creative studio that needed digital presence, storytelling, and conversion clarity.',
    challenge:
      'Create a high-end digital identity that felt cinematic while keeping navigation effortless for first-time visitors.',
    solution:
      'Designed an immersive narrative layout with rich pacing, visual contrast, and strategic touchpoints to guide inquiry.',
    outcome:
      'Launch response grew audience engagement by 42% and doubled qualified inbound project leads in the first month.',
    tools: ['React', 'Tailwind CSS', 'Figma', 'Video Storytelling'],
  },
  {
    title: 'Motion Brand Reveal',
    label: 'Content System, Video Editing',
    overview:
      'A visual content system for a premium coaching brand to communicate offerings with cinematic clarity.',
    challenge:
      'Translate brand depth into short-form visuals without losing sophistication or control.',
    solution:
      'Created layered motion compositions, branded transitions, and a concise editorial structure for reuse.',
    outcome:
      'The brand achieved stronger social traction and a clearer conversion path across launches.',
    tools: ['Premiere', 'After Effects', 'Brand Strategy'],
  },
  {
    title: 'Responsive Product Narrative',
    label: 'Website Design, Strategic Build',
    overview:
      'A responsive digital experience for a product founder needing market clarity, trust, and premium positioning.',
    challenge:
      'Design a clean, memorable website that positioned the product as a premium choice in a crowded category.',
    solution:
      'Built a minimalist interface with strong hierarchy, intuitive storytelling, and soft interactive details.',
    outcome:
      'Delivered a launch-ready experience that helped the founder enter the market with a more confident message.',
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
        <header className="sticky top-0 z-20 mx-auto mb-16 w-full rounded-3xl border border-white/10 bg-slate-950/70 px-6 py-4 backdrop-blur-xl sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.34em] text-cyan-300/70">Smart Moses</p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                Creative Technologist & Digital Brand Builder for founders, creators, and premium brands.
              </p>
            </div>
            <nav className="flex flex-wrap gap-3 text-sm text-slate-300">
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
            className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-12 lg:p-16"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-8">
                <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/5 px-4 py-2 text-xs uppercase tracking-[0.32em] text-cyan-200/90">
                  Creative Technologist & Digital Brand Builder
                </p>
                <div className="space-y-6">
                  <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl">
                    Smart Moses builds modern digital experiences that merge creativity, strategy, and technology for brands, businesses, and creators.
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                    In a digital world filled with noise, generic websites, and forgettable brands, clarity has become a competitive advantage.
                    The goal is not just to make things look good. The goal is to create digital experiences that communicate clearly, build trust instantly, and move people to take action.
                    From websites and landing pages to branding visuals and content systems, every project is approached with strategy, precision, and intentional execution.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Start a Project
                  </a>
                  <a
                    href="#work"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:text-white"
                  >
                    View Selected Work
                  </a>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {trustPoints.map(item => (
                    <div key={item} className="rounded-3xl border border-white/10 bg-slate-900/50 px-5 py-4 text-sm text-slate-300 shadow-[0_10px_30px_rgba(15,23,42,0.25)]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-slate-900/80 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.4)] sm:p-8">
                <div className="absolute -right-10 top-8 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="absolute -left-10 bottom-8 h-36 w-36 rounded-full bg-violet-500/10 blur-3xl" />
                <div className="relative rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),transparent_60%)]" />
                  <div className="relative flex h-full flex-col gap-6">
                    <div className="space-y-3">
                      <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Premium portrait direction</p>
                      <div className="h-72 rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-[inset_0_-10px_40px_rgba(15,23,42,0.5)]">
                        <div className="h-full w-full rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,_rgba(56,189,248,0.18),transparent_38%),radial-gradient(circle_at_80%_10%,_rgba(168,85,247,0.14),transparent_30%)]" />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
                        <p className="font-semibold text-white">Brand system</p>
                        <p className="mt-2 text-sm leading-6 text-slate-400">A calm, confident identity system built around gradient depth and refined type.</p>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
                        <p className="font-semibold text-white">Visual mood</p>
                        <p className="mt-2 text-sm leading-6 text-slate-400">Subtle glow, layered UI elements, and cinematic tonal balances.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            id="about"
            className="mt-20 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_100px_rgba(15,23,42,0.22)] backdrop-blur-xl sm:p-12"
            {...sectionMotion}
          >
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="space-y-7">
                <p className="text-xs uppercase tracking-[0.34em] text-cyan-300/80">Building Digital Experiences That Actually Connect</p>
                <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                  Building Digital Experiences That Actually Connect
                </h2>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  In a landscape full of quiet websites, the strongest brands are the ones that feel intentional, strategic, and emotionally intelligent. I craft experiences that speak directly to founders, creators, and premium teams who want digital products that feel elevated and effective.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.25)]">
                  <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Workspace</p>
                  <p className="mt-4 text-base leading-7 text-slate-300">A refined digital workshop that pairs design systems, strategic concepts, and production-ready assets.</p>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.25)]">
                  <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Creative systems</p>
                  <p className="mt-4 text-base leading-7 text-slate-300">Visual storytelling delivered through brand mockups, interface compositions, and motion-ready content.</p>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.25)]">
                  <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Design rhythm</p>
                  <p className="mt-4 text-base leading-7 text-slate-300">Simple grid layouts, soft gradients, and elevated spacing that feel calm, deliberate, and premium.</p>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.25)]">
                  <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Execution</p>
                  <p className="mt-4 text-base leading-7 text-slate-300">From concept to delivery, every digital touchpoint is built to perform and feel unmistakably premium.</p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section id="services" className="mt-20" {...sectionMotion}>
            <div className="space-y-8">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.34em] text-cyan-300/80">What Gets Built</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">What Gets Built</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                  Premium service offerings designed to help ambitious founders and brands create digital experiences that feel polished, intentional, and conversion-ready.
                </p>
              </div>

              <div className="grid gap-6 xl:grid-cols-3">
                {services.map(service => (
                  <motion.article
                    key={service.title}
                    className="group rounded-[2rem] border border-white/10 bg-slate-950/75 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.22)] transition hover:-translate-y-1 hover:border-cyan-300/30"
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                  >
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                      <span className="text-xl font-semibold">•</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-4 text-slate-300">{service.description}</p>
                    <p className="mt-6 text-sm font-medium uppercase tracking-[0.22em] text-cyan-300/80">{service.highlight}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section id="work" className="mt-20 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_100px_rgba(15,23,42,0.22)] sm:p-12" {...sectionMotion}>
            <div className="space-y-8">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.34em] text-cyan-300/80">Selected Work</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Selected Work</h2>
              </div>

              <div className="space-y-12">
                {projects.map((project, index) => (
                  <div
                    key={project.title}
                    className={`grid gap-10 rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.18)] lg:grid-cols-[1fr_0.9fr] ${index % 2 === 1 ? 'lg:grid-flow-col-dense lg:grid-cols-[0.9fr_1fr]' : ''}`}
                  >
                    <div className="space-y-5">
                      <span className="inline-flex rounded-full border border-white/10 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-cyan-200/80">
                        {project.label}
                      </span>
                      <h3 className="text-3xl font-semibold text-white">{project.title}</h3>
                      <p className="text-slate-300">{project.overview}</p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-3xl bg-slate-950/60 p-5">
                          <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Challenge</p>
                          <p className="mt-3 text-slate-300">{project.challenge}</p>
                        </div>
                        <div className="rounded-3xl bg-slate-950/60 p-5">
                          <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Solution</p>
                          <p className="mt-3 text-slate-300">{project.solution}</p>
                        </div>
                      </div>
                      <div className="rounded-3xl bg-slate-950/60 p-5">
                        <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Outcome</p>
                        <p className="mt-3 text-slate-300">{project.outcome}</p>
                      </div>
                      <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Tools used</p>
                      <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                        {project.tools.map(tool => (
                          <span key={tool} className="rounded-full border border-white/10 bg-white/5 px-3 py-2">{tool}</span>
                        ))}
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.3)]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.12),transparent_30%)]" />
                      <div className="relative grid gap-6">
                        <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/90 p-6">
                          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Desktop preview</p>
                          <div className="mt-5 h-52 rounded-[1.5rem] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />
                        </div>
                        <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/90 p-5">
                          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Mobile view</p>
                          <div className="mt-5 h-40 rounded-[1.5rem] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section className="mt-20 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_100px_rgba(15,23,42,0.22)] sm:p-12" {...sectionMotion}>
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
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">What clients say about working together.</h2>
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                {testimonials.map(item => (
                  <div key={item.name} className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8 shadow-[0_25px_70px_rgba(15,23,42,0.18)]">
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
          </motion.section>

          <motion.section className="mt-20 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_100px_rgba(15,23,42,0.22)] sm:p-12" {...sectionMotion}>
            <div className="space-y-10">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.34em] text-cyan-300/80">Process</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Process</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                  A simple, intentional flow from direction to delivery that keeps every project aligned with the brand and the business goal.
                </p>
              </div>

              <div className="relative grid gap-8 md:grid-cols-2">
                <div className="absolute left-1/2 top-12 hidden h-[calc(100%-4rem)] w-px bg-white/10 md:block" />
                {processSteps.map((step, index) => (
                  <div key={step} className={`relative rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 shadow-[0_20px_40px_rgba(15,23,42,0.2)] ${index % 2 === 0 ? 'md:ml-auto md:w-[90%]' : 'md:mr-auto md:w-[90%]'}`}>
                    <div className="absolute left-1/2 top-0 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20 bg-slate-950/90 text-center text-sm font-semibold leading-12 text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Step {index + 1}</p>
                    <h3 className="mt-4 text-2xl font-semibold text-white">{step}</h3>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section id="contact" className="mt-20 rounded-[2rem] border border-white/10 bg-slate-950/95 p-12 text-center shadow-[0_45px_120px_rgba(15,23,42,0.28)]" {...sectionMotion}>
            <p className="text-xs uppercase tracking-[0.34em] text-cyan-300/80">Final CTA</p>
            <h2 className="mt-6 text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
              Let’s Build Something Worth Remembering
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              If you want a digital presence that feels cinematic, modern, and deeply strategic, let’s create a premium experience that elevates your brand and invites meaningful connection.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                Start a Conversation
              </a>
              <a href="mailto:hello@smartmoses.com" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:text-white">
                Send a DM
              </a>
            </div>
          </motion.section>
        </main>

        <footer className="mt-20 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 text-slate-300 shadow-[0_30px_70px_rgba(15,23,42,0.2)] sm:p-12">
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
