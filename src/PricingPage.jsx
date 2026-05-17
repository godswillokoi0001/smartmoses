import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const PACKAGES = [
  {
    id: 1,
    label: "01",
    title: "Starter Presence",
    price: "₦120,000",
    period: "/ Month",
    bestFor: "Small businesses, personal brands, students, startups, and creators starting their digital presence.",
    description:
      "A foundational creative package designed to help brands look more organized, consistent, and professional online.",
    includes: [
      "3 social media designs weekly",
      "1 short-form video content weekly",
      "1 basic responsive landing page",
      "Basic content support",
      "WhatsApp integration",
      "Mobile optimization",
      "Basic SEO setup",
      "Monthly performance review",
      "1 revision cycle",
    ],
    outcome:
      "Helps brands establish a cleaner and more professional digital presence consistently.",
    tag: null,
    accent: "#E8692A",
  },
  {
    id: 2,
    label: "02",
    title: "Growth Brand System",
    price: "₦250,000",
    period: "/ Month",
    bestFor:
      "Growing brands and businesses ready to improve perception, communication, and digital consistency.",
    description:
      "A stronger digital support package focused on improving visual communication, online credibility, and audience engagement.",
    includes: [
      "5 premium social media designs weekly",
      "2 short-form video contents weekly",
      "Multi-section business website",
      "Premium responsive UI",
      "Content direction support",
      "Brand consistency system",
      "SEO optimization",
      "Motion interactions",
      "Monthly strategy call",
      "2 revision cycles",
    ],
    outcome:
      "Creates a stronger and more premium digital identity that improves trust and engagement.",
    tag: null,
    accent: "#D45A1A",
  },
  {
    id: 3,
    label: "03",
    title: "Premium Digital Presence",
    price: "₦450,000",
    period: "/ Month",
    bestFor:
      "Established businesses, agencies, coaches, and premium brands looking for high-level digital execution.",
    description:
      "A premium all-in-one creative system combining branding, visual storytelling, design, and digital experience strategy.",
    includes: [
      "Daily social media content support",
      "3 short-form video edits weekly",
      "Premium custom website",
      "Landing page campaigns",
      "Advanced UI/UX direction",
      "Brand visual system",
      "Motion graphics support",
      "Priority revisions",
      "Conversion-focused design strategy",
      "Monthly analytics & improvement review",
      "3 revision cycles",
    ],
    outcome:
      "Builds a highly polished and professional digital presence that positions the brand more competitively online.",
    tag: null,
    accent: "#BF4F10",
  },
  {
    id: 4,
    label: "04",
    title: "Signature Brand Experience",
    price: "₦800,000",
    period: "/ Month",
    bestFor:
      "High-level brands, premium businesses, founders, public figures, and serious digital campaigns.",
    description:
      "A high-level creative partnership focused on building a powerful, premium, and memorable digital brand experience across platforms.",
    includes: [
      "Full weekly visual content system",
      "Advanced video editing support",
      "Premium custom website experience",
      "Campaign landing pages",
      "Creative direction support",
      "Brand storytelling strategy",
      "Premium motion visuals",
      "High-priority execution",
      "Consultation & growth direction",
      "Ongoing optimization support",
      "Dedicated creative workflow",
    ],
    outcome:
      "Transforms the overall perception, communication quality, and digital authority of the brand.",
    tag: "Most Strategic",
    accent: "#A03D00",
  },
];

const INDIVIDUAL_SERVICES = [
  {
    category: "Web Design & Development",
    icon: "🌐",
    items: [
      { name: "Landing Page", price: "₦120,000" },
      { name: "Business Website", price: "₦250,000" },
      { name: "Portfolio Website", price: "₦180,000" },
      { name: "Premium Custom Website", price: "₦450,000+" },
      { name: "Dashboard UI Design", price: "₦200,000" },
    ],
  },
  {
    category: "Visual Design",
    icon: "✦",
    items: [
      { name: "Social Media Design Package", price: "₦50,000" },
      { name: "Brand Visual System", price: "₦120,000" },
      { name: "Presentation Design", price: "₦80,000" },
      { name: "Marketing Creatives", price: "₦70,000" },
    ],
  },
  {
    category: "Video Editing",
    icon: "▶",
    items: [
      { name: "Short-form Video Editing", price: "₦40,000" },
      { name: "Promotional Video", price: "₦100,000" },
      { name: "Tutorial / Explainer Editing", price: "₦80,000" },
      { name: "Cinematic Brand Video", price: "₦180,000" },
    ],
  },
];

const ADDONS = [
  { name: "Extra Website Pages", desc: "Add additional pages beyond what's in your package." },
  { name: "Faster Delivery", desc: "Priority turnaround on any deliverable." },
  { name: "Motion Graphics", desc: "Animated intros, loops, and brand motion assets." },
  { name: "Content Upload", desc: "We upload and schedule your content across platforms." },
  { name: "SEO Expansion", desc: "In-depth keyword strategy and on-page optimisation." },
  { name: "Social Media Assets", desc: "Custom templates, highlights, and profile graphics." },
  { name: "Website Maintenance", desc: "Monthly updates, backups, and performance checks." },
  { name: "Branding Assets", desc: "Logos, colour systems, and brand style guides." },
];

const FAQS = [
  {
    q: "Are these packages fixed or can they be customised?",
    a: "The packages are structured for clarity and direction, but every brand is different. Reach out and we'll discuss what works best for your specific goals and budget.",
  },
  {
    q: "Do you work with international brands?",
    a: "Yes. While pricing is listed in Naira for the Nigerian market, we work with brands across Africa and beyond. Currency and payment terms can be discussed on enquiry.",
  },
  {
    q: "How does the monthly package work?",
    a: "Once onboarded, you receive consistent creative output every month — designs, content, web updates, and strategy — aligned to your package. No surprises, no hidden costs.",
  },
  {
    q: "Can I upgrade or downgrade my package?",
    a: "Absolutely. As your brand grows, your package can scale with you. Downgrades or pauses can be requested with notice.",
  },
  {
    q: "What's the onboarding process?",
    a: "We start with a brief discovery call to understand your brand, goals, and expectations. From there, we set up your creative workflow and begin delivery within the agreed timeline.",
  },
  {
    q: "Do you offer one-time projects?",
    a: "Yes. The Individual Service Pricing section covers one-off projects. Add-ons can be stacked on any project or package.",
  },
];

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function PackageCard({ pkg, index }) {
  const isSignature = pkg.id === 4;

  return (
    <div
      style={{
        position: "relative",
        background: isSignature
          ? "linear-gradient(145deg, #0f1623 0%, #1a1f2e 50%, #0f1623 100%)"
          : "linear-gradient(145deg, #0d1117 0%, #161b26 100%)",
        border: isSignature
          ? `1px solid ${pkg.accent}60`
          : "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20,
        padding: "2.5rem 2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        transition: "transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
        cursor: "default",
        overflow: "hidden",
        animationDelay: `${index * 80}ms`,
      }}
      className="pkg-card"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.borderColor = `${pkg.accent}90`;
        e.currentTarget.style.boxShadow = `0 24px 60px ${pkg.accent}18, 0 0 0 1px ${pkg.accent}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = isSignature
          ? `${pkg.accent}60`
          : "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${pkg.accent}12 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span
          style={{
            fontFamily: "'Syne', system-ui, sans-serif",
            fontSize: 13,
            letterSpacing: "0.25em",
            color: pkg.accent,
            fontWeight: 500,
            textTransform: "uppercase",
          }}
        >
          {pkg.label}
        </span>
        {pkg.tag && (
          <span
            style={{
              background: `linear-gradient(135deg, ${pkg.accent}, #ff9356)`,
              color: "#fff",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "5px 12px",
              borderRadius: 100,
            }}
          >
            {pkg.tag}
          </span>
        )}
      </div>

      {/* Title */}
      <div>
        <h3
          style={{
            fontFamily: "'Syne', system-ui, sans-serif",
            fontSize: "clamp(1.5rem, 2.5vw, 1.9rem)",
            fontWeight: 700,
            color: "#F4F0E8",
            margin: "0 0 0.75rem",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          {pkg.title}
        </h3>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span
            style={{
            fontFamily: "'Syne', system-ui, sans-serif",
              fontSize: "clamp(2rem, 4vw, 2.6rem)",
              fontWeight: 700,
              background: `linear-gradient(135deg, ${pkg.accent}, #ff9356)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1,
            }}
          >
            {pkg.price}
          </span>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>
            {pkg.period}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: `linear-gradient(90deg, ${pkg.accent}40, transparent)`,
        }}
      />

      {/* Best for */}
      <div>
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            color: pkg.accent,
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: 6,
          }}
        >
          Best For
        </p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>
          {pkg.bestFor}
        </p>
      </div>

      {/* Description */}
      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0 }}>
        {pkg.description}
      </p>

      {/* Includes */}
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Includes
        </p>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {pkg.includes.map((item, i) => (
            <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 4,
                  background: `${pkg.accent}20`,
                  border: `1px solid ${pkg.accent}50`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                  <path d="M1 3L3 5L7 1" stroke={pkg.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Outcome */}
      <div
        style={{
          background: `${pkg.accent}10`,
          border: `1px solid ${pkg.accent}25`,
          borderRadius: 10,
          padding: "12px 14px",
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.15em",
            color: pkg.accent,
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: 4,
          }}
        >
          Expected Outcome
        </p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>
          {pkg.outcome}
        </p>
      </div>

      {/* CTA */}
      <button
        style={{
          width: "100%",
          padding: "14px 0",
          background: isSignature
            ? `linear-gradient(135deg, ${pkg.accent}, #ff9356)`
            : "transparent",
          border: isSignature ? "none" : `1px solid ${pkg.accent}50`,
          borderRadius: 10,
          color: isSignature ? "#fff" : pkg.accent,
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.08em",
          cursor: "pointer",
          transition: "all 0.25s ease",
          fontFamily: "inherit",
        }}
        onMouseEnter={(e) => {
          if (!isSignature) {
            e.currentTarget.style.background = `${pkg.accent}15`;
            e.currentTarget.style.borderColor = pkg.accent;
          } else {
            e.currentTarget.style.opacity = "0.9";
          }
        }}
        onMouseLeave={(e) => {
          if (!isSignature) {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = `${pkg.accent}50`;
          } else {
            e.currentTarget.style.opacity = "1";
          }
        }}
      >
        Get Started
      </button>
    </div>
  );
}

function ServiceCategory({ category }) {
  return (
    <div
      style={{
        background: "linear-gradient(145deg, #0d1117, #161b26)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        padding: "2rem",
        transition: "border-color 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(232,105,42,0.3)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
        <span style={{ fontSize: 18 }}>{category.icon}</span>
        <h3
          style={{
            fontFamily: "'Syne', system-ui, sans-serif",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#F4F0E8",
            margin: 0,
          }}
        >
          {category.category}
        </h3>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {category.items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom:
                i < category.items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
            }}
          >
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{item.name}</span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#E8692A",
            fontFamily: "'Syne', system-ui, sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddonCard({ addon }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        padding: "1.25rem 1.5rem",
        transition: "all 0.25s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(232,105,42,0.3)";
        e.currentTarget.style.background = "rgba(232,105,42,0.04)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.background = "rgba(255,255,255,0.025)";
      }}
    >
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
        <span style={{ color: "#E8692A", fontSize: 16, lineHeight: 1.4, flexShrink: 0 }}>+</span>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#F4F0E8", margin: "0 0 4px" }}>
            {addon.name}
          </p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.5 }}>
            {addon.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "1.25rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          gap: 16,
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: 15, color: "#F4F0E8", fontWeight: 500, lineHeight: 1.4 }}>
          {faq.q}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: 24,
            height: 24,
            borderRadius: "50%",
            border: "1px solid rgba(232,105,42,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#E8692A",
            fontSize: 16,
            transition: "transform 0.25s ease",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? 200 : 0,
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s ease, opacity 0.25s ease",
        }}
      >
        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.75,
            margin: "0 0 1.25rem",
            paddingRight: 40,
          }}
        >
          {faq.a}
        </p>
      </div>
    </div>
  );
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────

function SectionLabel({ number, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1rem" }}>
      <span
        style={{
                fontFamily: "'Syne', system-ui, sans-serif",
          fontSize: 12,
          letterSpacing: "0.3em",
          color: "#E8692A",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        {number}
      </span>
      <div style={{ flex: 1, height: 1, background: "rgba(232,105,42,0.25)" }} />
      <span
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.3)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@400;700&display=swap');

        * { box-sizing: border-box; }

        .pricing-root {
          font-family: 'DM Sans', system-ui, sans-serif;
          background: #080C12;
          color: #F4F0E8;
          min-height: 100vh;
        }

        .pricing-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .pkg-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .addon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .pkg-grid, .service-grid { grid-template-columns: 1fr; }
          .addon-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="pricing-root">
        {/* ── HERO ── */}
        <section
          style={{
            position: "relative",
            padding: "7rem 1.5rem 5rem",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          {/* Background orbs */}
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 700,
              height: 400,
              background:
                "radial-gradient(ellipse at center, rgba(232,105,42,0.08) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "20%",
              width: 300,
              height: 300,
              background:
                "radial-gradient(ellipse, rgba(212,90,26,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div className="pricing-container" style={{ position: "relative", zIndex: 1 }}>
            {/* Eyebrow */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid rgba(232,105,42,0.3)",
                borderRadius: 100,
                padding: "6px 18px",
                marginBottom: "2rem",
                background: "rgba(232,105,42,0.06)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#E8692A",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  color: "#E8692A",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Creative Studio
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Syne', system-ui, sans-serif",
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                fontWeight: 700,
                color: "#F4F0E8",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                margin: "0 0 1.5rem",
              }}
            >
              Pricing &{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #E8692A, #ff9356)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Creative Packages
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                color: "rgba(244,240,232,0.6)",
                maxWidth: 640,
                margin: "0 auto 1.5rem",
                lineHeight: 1.7,
              }}
            >
              Strategic digital support for brands, businesses, and creators who want to build a stronger, more premium online presence.
            </p>

            <p
              style={{
                fontSize: 14,
                color: "rgba(244,240,232,0.38)",
                maxWidth: 560,
                margin: "0 auto",
                lineHeight: 1.75,
              }}
            >
              Every package is structured to help brands communicate better visually, look more professional online, and maintain consistent digital presence through design, content, development, and visual storytelling.
            </p>

            {/* Stats row */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "3rem",
                marginTop: "3.5rem",
                flexWrap: "wrap",
              }}
            >
              {[
                { value: "4", label: "Monthly Packages" },
                { value: "13+", label: "Individual Services" },
                { value: "8", label: "Add-On Options" },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: "center" }}>
                  <p
                    style={{
                  fontFamily: "'Syne', system-ui, sans-serif",
                      fontSize: "2.2rem",
                      fontWeight: 700,
                      color: "#E8692A",
                      margin: "0 0 4px",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0, letterSpacing: "0.1em" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MONTHLY PACKAGES ── */}
        <section style={{ padding: "4rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="pricing-container">
            <SectionLabel number="01" label="Monthly Packages" />
            <div style={{ marginBottom: "3rem" }}>
              <h2
                style={{
                  fontFamily: "'Syne', system-ui, sans-serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 700,
                  color: "#F4F0E8",
                  margin: "0 0 0.75rem",
                  letterSpacing: "-0.015em",
                }}
              >
                Monthly Creative Packages
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", margin: 0, maxWidth: 520, lineHeight: 1.65 }}>
                Ongoing digital brand support structured to deliver consistent value, growth, and creative excellence every month.
              </p>
            </div>
            <div className="pkg-grid">
              {PACKAGES.map((pkg, i) => (
                <PackageCard key={pkg.id} pkg={pkg} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── INDIVIDUAL SERVICES ── */}
        <section style={{ padding: "4rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="pricing-container">
            <SectionLabel number="02" label="Individual Services" />
            <div style={{ marginBottom: "3rem" }}>
              <h2
                style={{
                fontFamily: "'Syne', system-ui, sans-serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 700,
                  color: "#F4F0E8",
                  margin: "0 0 0.75rem",
                  letterSpacing: "-0.015em",
                }}
              >
                Individual Service Pricing
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", margin: 0, maxWidth: 520, lineHeight: 1.65 }}>
                Need a single deliverable? Pick exactly what your brand requires — no package commitment needed.
              </p>
            </div>
            <div className="service-grid">
              {INDIVIDUAL_SERVICES.map((cat) => (
                <ServiceCategory key={cat.category} category={cat} />
              ))}
            </div>
          </div>
        </section>

        {/* ── ADD-ONS ── */}
        <section style={{ padding: "4rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="pricing-container">
            <SectionLabel number="03" label="Add-On Services" />
            <div style={{ marginBottom: "2.5rem" }}>
              <h2
                style={{
                  fontFamily: "'Syne', system-ui, sans-serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 700,
                  color: "#F4F0E8",
                  margin: "0 0 0.75rem",
                  letterSpacing: "-0.015em",
                }}
              >
                Add-On Services
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", margin: 0, maxWidth: 520, lineHeight: 1.65 }}>
                Bolt these onto any package or project to extend your creative output.
              </p>
            </div>
            <div className="addon-grid">
              {ADDONS.map((addon) => (
                <AddonCard key={addon.name} addon={addon} />
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding: "4rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="pricing-container">
            <SectionLabel number="04" label="FAQ" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr min(520px, 55%)",
                gap: "4rem",
                alignItems: "start",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'Syne', system-ui, sans-serif",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    fontWeight: 700,
                    color: "#F4F0E8",
                    margin: "0 0 0.75rem",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.1,
                  }}
                >
                  Frequently Asked Questions
                </h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: 0, maxWidth: 340 }}>
                  Everything you need to know before getting started.
                </p>
              </div>
              <div>
                {FAQS.map((faq) => (
                  <FaqItem key={faq.q} faq={faq} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section
          style={{
            padding: "5rem 1.5rem 6rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(232,105,42,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div className="pricing-container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <SectionLabel number="05" label="Let's Talk" />
            <h2
              style={{
                fontFamily: "'Syne', system-ui, sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.8rem)",
                fontWeight: 700,
                color: "#F4F0E8",
                margin: "0.5rem auto 1.5rem",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                maxWidth: 700,
              }}
            >
              Every Brand Is Different.{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #E8692A, #ff9356)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Let's Find What Works.
              </span>
            </h2>

            <p
              style={{
                fontSize: 15,
                color: "rgba(244,240,232,0.55)",
                maxWidth: 580,
                margin: "0 auto 2rem",
                lineHeight: 1.8,
              }}
            >
              Every brand has different goals, needs, and scale. While these packages provide structured direction, flexible adjustments and custom solutions can still be discussed based on your project needs.
            </p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                style={{
                  padding: "14px 32px",
                  background: "linear-gradient(135deg, #E8692A, #ff9356)",
                  border: "none",
                  borderRadius: 10,
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "opacity 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.88";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Start a Conversation
              </button>
              <button
                style={{
                  padding: "14px 32px",
                  background: "transparent",
                  border: "1px solid rgba(232,105,42,0.4)",
                  borderRadius: 10,
                  color: "#E8692A",
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(232,105,42,0.1)";
                  e.currentTarget.style.borderColor = "#E8692A";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(232,105,42,0.4)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Send a DM
              </button>
            </div>

            {/* Footer note */}
            <p
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.2)",
                marginTop: "3rem",
                letterSpacing: "0.08em",
              }}
            >
              All prices are listed in Nigerian Naira (₦) and are subject to change.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
