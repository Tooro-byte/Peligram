"use client";
import React from "react";
import { Heart, Zap, Mail, MapPin, Phone } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: "About us", href: "#about" },
      { name: "Our mission", href: "#philosophy" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
    ],
    Programs: [
      { name: "MERN Stack", href: "#pipeline" },
      { name: "Digital literacy", href: "#pipeline" },
      { name: "Cyber security", href: "#pipeline" },
      { name: "Cloud services", href: "#pipeline" },
    ],
    Resources: [
      { name: "Documentation", href: "#" },
      { name: "Success stories", href: "#" },
      { name: "FAQs", href: "#" },
      { name: "Support", href: "#contact" },
    ],
  };

  return (
    <footer style={styles.footer}>

      {/* Full-footer sky SVG — sits behind everything */}
      <svg
        aria-hidden="true"
        style={styles.skyBg}
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#030712" />
            <stop offset="20%"  stopColor="#0a1a3a" />
            <stop offset="45%"  stopColor="#0f3068" />
            <stop offset="65%"  stopColor="#1e5299" />
            <stop offset="80%"  stopColor="#5b8fcf" />
            <stop offset="90%"  stopColor="#c4955a" />
            <stop offset="96%"  stopColor="#e8c97a" />
            <stop offset="100%" stopColor="#fce8b0" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="50%" cy="100%" r="60%">
            <stop offset="0%"   stopColor="#ffe566" stopOpacity="0.65" />
            <stop offset="35%"  stopColor="#ffaa00" stopOpacity="0.30" />
            <stop offset="75%"  stopColor="#ff6600" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ff3300" stopOpacity="0"    />
          </radialGradient>
          <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#fffde0" />
            <stop offset="35%"  stopColor="#ffe566" />
            <stop offset="70%"  stopColor="#ffaa00" />
            <stop offset="100%" stopColor="#ff6600" />
          </radialGradient>
        </defs>

        <rect width="1200" height="400" fill="url(#skyGrad)" />
        <rect width="1200" height="400" fill="url(#sunGlow)" />

        {/* Stars */}
        {([
          [95,14,1.1,0.75],[170,8,0.8,0.60],[255,20,1.3,0.85],
          [360,6,0.8,0.65],[440,24,0.65,0.50],[530,11,1.1,0.78],
          [625,5,0.7,0.60],[715,18,1.2,0.88],[800,9,0.85,0.68],
          [880,25,0.65,0.50],[960,13,1.0,0.75],[1040,7,0.75,0.58],
          [1110,21,0.7,0.55],[1170,11,0.9,0.65],
          [130,36,0.6,0.38],[500,33,0.65,0.38],[820,32,0.6,0.35],
        ] as [number,number,number,number][]).map(([cx,cy,r,op],i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="white" opacity={op} />
        ))}

        {/* Clouds */}
        <ellipse cx="170"  cy="210" rx="80"  ry="16" fill="white" opacity="0.10" />
        <ellipse cx="135"  cy="204" rx="44"  ry="11" fill="white" opacity="0.07" />
        <ellipse cx="980"  cy="200" rx="90"  ry="17" fill="white" opacity="0.10" />
        <ellipse cx="1020" cy="194" rx="48"  ry="11" fill="white" opacity="0.07" />
        <ellipse cx="580"  cy="188" rx="64"  ry="12" fill="white" opacity="0.07" />

        {/* Sun rising from very bottom centre */}
        <circle cx="600" cy="430" r="90" fill="url(#sunCore)" />
      </svg>

      {/* Dark gradient overlay — heavier at top and bottom for readability */}
      <div style={styles.overlay} />

      {/* All footer content sits on top */}
      <div style={styles.body}>

        {/* Main grid */}
        <div style={styles.grid}>

          {/* Brand column */}
          <div style={styles.brandCol}>
            <h2 style={styles.brandName}>Peligram Intelligence</h2>
            <p style={styles.brandDesc}>
              Engineering sustainable socio-economic transformation by
              integrating unreachable nodes into the global digital economy.
            </p>
            <a
              href="mailto:peliritter7@gmail.com"
              style={styles.socialBtn}
              aria-label="Email Peligram"
            >
              <Mail size={13} />
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div style={styles.colHead}>{category}</div>
              <ul style={styles.linkList}>
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      style={styles.link}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.42)")}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div style={styles.contactBar}>
          <div style={styles.contactItems}>
            <div style={styles.contactItem}>
              <MapPin size={11} color="#FF0080" style={{ flexShrink: 0 }} />
              <span>Mpondwe-Lhubiriha, Kasese District, Uganda</span>
            </div>
            <div style={styles.contactItem}>
              <Phone size={11} color="#0077FF" style={{ flexShrink: 0 }} />
              <span>+256 (0) 777 950 995</span>
            </div>
            <div style={styles.contactItem}>
              <Mail size={11} color="#FFD700" style={{ flexShrink: 0 }} />
              <span>peliritter7@gmail.com</span>
            </div>
          </div>
          <div style={styles.statusPill}>
            <span style={styles.statusDot} />
            <span>Gateway active</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={styles.bottomBar}>
          <span>© {currentYear} Peligram Intelligence · Gateway v3.0 // Bukonzo West</span>
          <div style={styles.bottomRight}>
            <Heart size={8} fill="#FF0080" color="#FF0080" />
            <span>Architecting human agency</span>
            <Zap size={8} color="#FFD700" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  footer: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },

  skyBg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    display: "block",
    zIndex: 0,
  },

  overlay: {
    position: "absolute",
    inset: 0,
    zIndex: 1,
    background:
      "linear-gradient(to bottom, rgba(2,1,4,0.68) 0%, rgba(2,1,4,0.42) 35%, rgba(2,1,4,0.55) 70%, rgba(2,1,4,0.90) 100%)",
  },

  body: {
    position: "relative",
    zIndex: 2,
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2.5rem 2rem 1.5rem",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1.8fr 1fr 1fr 1fr",
    gap: "2rem",
    paddingBottom: "2rem",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },

  brandCol: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },

  brandName: {
    fontSize: "20px",
    fontWeight: 700,
    letterSpacing: "-0.4px",
    marginBottom: "12px",
    lineHeight: 1.2,
    background: "linear-gradient(90deg, #FF0080 0%, #FFD700 50%, #0077FF 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    display: "inline-block",
  },

  brandDesc: {
    fontSize: "12.5px",
    color: "rgba(255,255,255,0.40)",
    lineHeight: 1.65,
    maxWidth: "230px",
    marginBottom: "16px",
  },

  socialBtn: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255,255,255,0.45)",
    textDecoration: "none",
  },

  colHead: {
    fontSize: "9px",
    fontFamily: "monospace",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: "rgba(255,255,255,0.26)",
    marginBottom: "13px",
  },

  linkList: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: 0,
    margin: 0,
  },

  link: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.42)",
    textDecoration: "none",
    transition: "color 0.15s",
    display: "block",
  },

  contactBar: {
    display: "flex",
    flexWrap: "wrap" as const,
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "1.25rem 0",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },

  contactItems: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "20px",
  },

  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: "rgba(255,255,255,0.38)",
  },

  statusPill: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "9px",
    fontFamily: "monospace",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    color: "#10b981",
  },

  statusDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#10b981",
    display: "inline-block",
    flexShrink: 0,
  },

  bottomBar: {
    display: "flex",
    flexWrap: "wrap" as const,
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    paddingTop: "1.25rem",
    fontSize: "9px",
    fontFamily: "monospace",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    color: "rgba(255,255,255,0.18)",
  },

  bottomRight: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
};

export default Footer;