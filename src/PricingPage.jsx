import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Mail, MessageCircle, Plus } from 'lucide-react';
import './PricingPage.css';

/* ═══════════════════════════════════════════════════════════════
   PRICING PAGE

   Rebuilt from the previous orange "Creative Studio" version, which
   used its own palette and a 'Syne' font that was never loaded, and
   left the FAQ accordion stranded in a right-hand column next to an
   empty grid cell. Content is unchanged; the presentation now uses
   the portfolio's mint/teal system, and every button goes somewhere.
   ═══════════════════════════════════════════════════════════════ */

const EMAIL = 'smartmoses@gmail.com';
const WHATSAPP_URL =
  'https://wa.me/2348137038180?text=' +
  encodeURIComponent("Hi Smart Moses, I'd like to discuss a project.");

/* ─── DATA ──────────────────────────────────────────────────────── */

const PACKAGES = [
  {
    id: 1,
    label: '01',
    title: 'Starter Presence',
    price: '₦120,000',
    period: '/ month',
    bestFor:
      'Small businesses, personal brands, students, startups, and creators starting their digital presence.',
    description:
      'A foundational creative package designed to help brands look more organized, consistent, and professional online.',
    includes: [
      '3 social media designs weekly',
      '1 short-form video content weekly',
      '1 basic responsive landing page',
      'Basic content support',
      'WhatsApp integration',
      'Mobile optimization',
      'Basic SEO setup',
      'Monthly performance review',
      '1 revision cycle',
    ],
    outcome:
      'Helps brands establish a cleaner and more professional digital presence consistently.',
    tag: null,
  },
  {
    id: 2,
    label: '02',
    title: 'Growth Brand System',
    price: '₦250,000',
    period: '/ month',
    bestFor:
      'Growing brands and businesses ready to improve perception, communication, and digital consistency.',
    description:
      'A stronger digital support package focused on improving visual communication, online credibility, and audience engagement.',
    includes: [
      '5 premium social media designs weekly',
      '2 short-form video contents weekly',
      'Multi-section business website',
      'Premium responsive UI',
      'Content direction support',
      'Brand consistency system',
      'SEO optimization',
      'Motion interactions',
      'Monthly strategy call',
      '2 revision cycles',
    ],
    outcome:
      'Creates a stronger and more premium digital identity that improves trust and engagement.',
    tag: null,
  },
  {
    id: 3,
    label: '03',
    title: 'Premium Digital Presence',
    price: '₦450,000',
    period: '/ month',
    bestFor:
      'Established businesses, agencies, coaches, and premium brands looking for high-level digital execution.',
    description:
      'A premium all-in-one creative system combining branding, visual storytelling, design, and digital experience strategy.',
    includes: [
      'Daily social media content support',
      '3 short-form video edits weekly',
      'Premium custom website',
      'Landing page campaigns',
      'Advanced UI/UX direction',
      'Brand visual system',
      'Motion graphics support',
      'Priority revisions',
      'Conversion-focused design strategy',
      'Monthly analytics & improvement review',
      '3 revision cycles',
    ],
    outcome:
      'Builds a highly polished and professional digital presence that positions the brand more competitively online.',
    tag: null,
  },
  {
    id: 4,
    label: '04',
    title: 'Signature Brand Experience',
    price: '₦800,000',
    period: '/ month',
    bestFor:
      'High-level brands, premium businesses, founders, public figures, and serious digital campaigns.',
    description:
      'A high-level creative partnership focused on building a powerful, premium, and memorable digital brand experience across platforms.',
    includes: [
      'Full weekly visual content system',
      'Advanced video editing support',
      'Premium custom website experience',
      'Campaign landing pages',
      'Creative direction support',
      'Brand storytelling strategy',
      'Premium motion visuals',
      'High-priority execution',
      'Consultation & growth direction',
      'Ongoing optimization support',
      'Dedicated creative workflow',
    ],
    outcome:
      'Transforms the overall perception, communication quality, and digital authority of the brand.',
    tag: 'Most Strategic',
  },
];

const INDIVIDUAL_SERVICES = [
  {
    category: 'Web Design & Development',
    icon: '🌐',
    items: [
      { name: 'Landing Page', price: '₦120,000' },
      { name: 'Business Website', price: '₦250,000' },
      { name: 'Portfolio Website', price: '₦180,000' },
      { name: 'Premium Custom Website', price: '₦450,000+' },
      { name: 'Dashboard UI Design', price: '₦200,000' },
    ],
  },
  {
    category: 'Visual Design',
    icon: '✦',
    items: [
      { name: 'Social Media Design Package', price: '₦50,000' },
      { name: 'Brand Visual System', price: '₦120,000' },
      { name: 'Presentation Design', price: '₦80,000' },
      { name: 'Marketing Creatives', price: '₦70,000' },
    ],
  },
  {
    category: 'Video Editing',
    icon: '▶',
    items: [
      { name: 'Short-form Video Editing', price: '₦40,000' },
      { name: 'Promotional Video', price: '₦100,000' },
      { name: 'Tutorial / Explainer Editing', price: '₦80,000' },
      { name: 'Cinematic Brand Video', price: '₦180,000' },
    ],
  },
];

const ADDONS = [
  { name: 'Extra Website Pages', desc: "Add additional pages beyond what's in your package." },
  { name: 'Faster Delivery', desc: 'Priority turnaround on any deliverable.' },
  { name: 'Motion Graphics', desc: 'Animated intros, loops, and brand motion assets.' },
  { name: 'Content Upload', desc: 'We upload and schedule your content across platforms.' },
  { name: 'SEO Expansion', desc: 'In-depth keyword strategy and on-page optimisation.' },
  { name: 'Social Media Assets', desc: 'Custom templates, highlights, and profile graphics.' },
  { name: 'Website Maintenance', desc: 'Monthly updates, backups, and performance checks.' },
  { name: 'Branding Assets', desc: 'Logos, colour systems, and brand style guides.' },
];

const FAQS = [
  {
    q: 'Are these packages fixed or can they be customised?',
    a: "The packages are structured for clarity and direction, but every brand is different. Reach out and we'll discuss what works best for your specific goals and budget.",
  },
  {
    q: 'Do you work with international brands?',
    a: 'Yes. While pricing is listed in Naira for the Nigerian market, we work with brands across Africa and beyond. Currency and payment terms can be discussed on enquiry.',
  },
  {
    q: 'How does the monthly package work?',
    a: 'Once onboarded, you receive consistent creative output every month — designs, content, web updates, and strategy — aligned to your package. No surprises, no hidden costs.',
  },
  {
    q: 'Can I upgrade or downgrade my package?',
    a: 'Absolutely. As your brand grows, your package can scale with you. Downgrades or pauses can be requested with notice.',
  },
  {
    q: "What's the onboarding process?",
    a: 'We start with a brief discovery call to understand your brand, goals, and expectations. From there, we set up your creative workflow and begin delivery within the agreed timeline.',
  },
  {
    q: 'Do you offer one-time projects?',
    a: 'Yes. The Individual Service Pricing section covers one-off projects. Add-ons can be stacked on any project or package.',
  },
];

const STATS = [
  { value: '4', label: 'Monthly Packages' },
  { value: '13+', label: 'Individual Services' },
  { value: '8', label: 'Add-On Options' },
];

/* ─── SUB-COMPONENTS ────────────────────────────────────────────── */

function SectionLabel({ number, label }) {
  return (
    <div className="pr-label">
      <span className="pr-label-num">{number}</span>
      <span className="pr-label-rule" aria-hidden="true" />
      <span className="pr-label-text">{label}</span>
    </div>
  );
}

function PackageCard({ pkg }) {
  const isFeatured = Boolean(pkg.tag);

  return (
    <article className={`pr-card${isFeatured ? ' is-featured' : ''}`}>
      <div className="pr-card-head">
        <span className="pr-card-num">{pkg.label}</span>
        {isFeatured && <span className="pr-tag">{pkg.tag}</span>}
      </div>

      <div>
        <h3 className="pr-card-title">{pkg.title}</h3>
        <div className="pr-price">
          <span className="pr-price-value">{pkg.price}</span>
          <span className="pr-price-period">{pkg.period}</span>
        </div>
      </div>

      <div>
        <p className="pr-block-label">Best For</p>
        <p className="pr-copy">{pkg.bestFor}</p>
      </div>

      <p className="pr-copy">{pkg.description}</p>

      <div>
        <p className="pr-block-label">Includes</p>
        <ul className="pr-includes">
          {pkg.includes.map((item) => (
            <li key={item}>
              <Check className="pr-check" size={13} strokeWidth={3} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pr-card-spacer" />

      <div className="pr-outcome">
        <p className="pr-block-label">Expected Outcome</p>
        <p className="pr-copy">{pkg.outcome}</p>
      </div>

      <a
        className={`pr-btn pr-btn-block${isFeatured ? ' pr-btn-primary' : ' pr-btn-ghost'}`}
        href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Enquiry: ${pkg.title} package`)}`}
      >
        <span>Enquire About This</span>
        <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
      </a>
    </article>
  );
}

function ServiceCategory({ category }) {
  return (
    <article className="pr-card">
      <div className="pr-cat-head">
        <span className="pr-cat-icon" aria-hidden="true">
          {category.icon}
        </span>
        <h3 className="pr-cat-title">{category.category}</h3>
      </div>
      <div>
        {category.items.map((item) => (
          <div className="pr-item" key={item.name}>
            <span className="pr-item-name">{item.name}</span>
            <span className="pr-item-price">{item.price}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function AddonCard({ addon }) {
  return (
    <div className="pr-addon">
      <Plus className="pr-addon-mark" size={15} strokeWidth={2.4} aria-hidden="true" />
      <div>
        <p className="pr-addon-name">{addon.name}</p>
        <p className="pr-addon-desc">{addon.desc}</p>
      </div>
    </div>
  );
}

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${faq.q.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;

  return (
    <div className="pr-faq-item">
      <button
        type="button"
        className="pr-faq-q"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{faq.q}</span>
        <span className={`pr-faq-toggle${open ? ' is-open' : ''}`} aria-hidden="true">
          <Plus size={13} strokeWidth={2.4} />
        </span>
      </button>
      <div className={`pr-faq-a${open ? ' is-open' : ''}`} id={panelId}>
        <div>
          <p>{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────────────── */

export default function PricingPage({ onNavigate, ThemeToggle }) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Smart Moses — Pricing & Creative Packages';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const go = (url) => (e) => {
    if (!onNavigate) return;
    e.preventDefault();
    onNavigate(url);
  };

  return (
    <div className="pr-root">
      <div className="pr-container">
        <div className="pr-topbar">
          <a className="pr-back" href="/" onClick={go('/')}>
            <ArrowLeft size={15} aria-hidden="true" />
            <span>Back to portfolio</span>
          </a>
          {ThemeToggle && <ThemeToggle />}
        </div>
      </div>

      {/* ── HERO ── */}
      <header className="pr-hero">
        <div className="pr-container">
          <p className="pr-eyebrow">Pricing</p>
          <h1>
            Pricing &amp; <em>creative packages</em>
          </h1>
          <p className="pr-hero-lede">
            Strategic digital support for brands, businesses, and creators who want to build a
            stronger, more premium online presence.
          </p>
          <p className="pr-hero-note">
            Every package is structured to help brands communicate better visually, look more
            professional online, and maintain consistent digital presence through design, content,
            development, and visual storytelling.
          </p>

          <dl className="pr-stats">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dd className="pr-stat-value">{stat.value}</dd>
                <dt className="pr-stat-label">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* ── 01 MONTHLY PACKAGES ── */}
      <section className="pr-section">
        <div className="pr-container">
          <SectionLabel number="01" label="Monthly Packages" />
          <h2 className="pr-h2">Monthly Creative Packages</h2>
          <p className="pr-lede">
            Ongoing digital brand support structured to deliver consistent value, growth, and
            creative excellence every month.
          </p>

          <div className="pr-pkg-grid" style={{ marginTop: 40 }}>
            {PACKAGES.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 INDIVIDUAL SERVICES ── */}
      <section className="pr-section">
        <div className="pr-container">
          <SectionLabel number="02" label="Individual Services" />
          <h2 className="pr-h2">Individual Service Pricing</h2>
          <p className="pr-lede">
            Need a single deliverable? Pick exactly what your brand requires — no package
            commitment needed.
          </p>

          <div className="pr-service-grid" style={{ marginTop: 40 }}>
            {INDIVIDUAL_SERVICES.map((category) => (
              <ServiceCategory key={category.category} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 ADD-ONS ── */}
      <section className="pr-section">
        <div className="pr-container">
          <SectionLabel number="03" label="Add-On Services" />
          <h2 className="pr-h2">Add-On Services</h2>
          <p className="pr-lede">
            Bolt these onto any package or project to extend your creative output.
          </p>

          <div className="pr-addon-grid" style={{ marginTop: 36 }}>
            {ADDONS.map((addon) => (
              <AddonCard key={addon.name} addon={addon} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 FAQ ── */}
      <section className="pr-section">
        <div className="pr-container">
          <SectionLabel number="04" label="FAQ" />

          {/* Two real columns: the heading anchors the left rail instead of
              leaving it empty while the accordion floated to the right. */}
          <div className="pr-faq-grid">
            <div className="pr-faq-aside">
              <h2 className="pr-h2">Frequently Asked Questions</h2>
              <p>
                Still unsure which package fits your brand? Tell me what you&rsquo;re working on and
                I&rsquo;ll put together a scope that makes sense.
              </p>
              <a href={`mailto:${EMAIL}?subject=${encodeURIComponent('Pricing question')}`}>
                <Mail size={14} strokeWidth={2.2} aria-hidden="true" />
                <span>Ask a question</span>
              </a>
            </div>

            <div className="pr-faq-list">
              {FAQS.map((faq) => (
                <FaqItem key={faq.q} faq={faq} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 CLOSING CTA ── */}
      <section className="pr-section">
        <div className="pr-container">
          <SectionLabel number="05" label="Let's Talk" />

          <div className="pr-cta">
            <h2>Every brand is different. Let&rsquo;s find what works.</h2>
            <p>
              Every brand has different goals, needs, and scale. While these packages provide
              structured direction, flexible adjustments and custom solutions can still be
              discussed based on your project needs.
            </p>

            <div className="pr-cta-actions">
              <a className="pr-btn pr-btn-primary" href={`mailto:${EMAIL}`}>
                <Mail size={14} strokeWidth={2.2} aria-hidden="true" />
                <span className="lbl-wide">Start a Conversation</span>
                <span className="lbl-narrow">Let's Talk</span>
              </a>
              <a
                className="pr-btn pr-btn-ghost"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={14} strokeWidth={2.2} aria-hidden="true" />
                <span>Send a DM</span>
              </a>
            </div>

            <p className="pr-cta-note">
              All prices are listed in Nigerian Naira (₦) and are subject to change.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
