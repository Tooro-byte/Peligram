"use client";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import { useEffect, useRef, useState } from "react";

// ─── Radar Background ────────────────────────────────────────────────────────

function hexToVec3(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;
uniform float uTime;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uScale;
uniform float uRingCount;
uniform float uSpokeCount;
uniform float uRingThickness;
uniform float uSpokeThickness;
uniform float uSweepSpeed;
uniform float uSweepWidth;
uniform float uSweepLobes;
uniform vec3 uColor;
uniform vec3 uBgColor;
uniform float uFalloff;
uniform float uBrightness;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;
#define TAU 6.28318530718
void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  st = st * 2.0 - 1.0;
  st.x *= uResolution.x / uResolution.y;
  if (uEnableMouse) {
    vec2 mShift = (uMouse * 2.0 - 1.0);
    mShift.x *= uResolution.x / uResolution.y;
    st -= mShift * uMouseInfluence;
  }
  st *= uScale;
  float dist = length(st);
  float theta = atan(st.y, st.x);
  float t = uTime * uSpeed;
  float ringPhase = dist * uRingCount - t;
  float ringDist = abs(fract(ringPhase) - 0.5);
  float ringGlow = 1.0 - smoothstep(0.0, uRingThickness, ringDist);
  float spokeAngle = abs(fract(theta * uSpokeCount / TAU + 0.5) - 0.5) * TAU / uSpokeCount;
  float arcDist = spokeAngle * dist;
  float spokeGlow = (1.0 - smoothstep(0.0, uSpokeThickness, arcDist)) * smoothstep(0.0, 0.1, dist);
  float sweepPhase = t * uSweepSpeed;
  float sweepBeam = pow(max(0.5 * sin(uSweepLobes * theta + sweepPhase) + 0.5, 0.0), uSweepWidth);
  float fade = smoothstep(1.05, 0.85, dist) * pow(max(1.0 - dist, 0.0), uFalloff);
  float intensity = max((ringGlow + spokeGlow + sweepBeam) * fade * uBrightness, 0.0);
  vec3 col = uColor * intensity + uBgColor;
  float alpha = clamp(length(col), 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`;

function RadarBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    let program: Program;
    let currentMouse = [0.5, 0.5];
    let targetMouse = [0.5, 0.5];

    function handleMouseMove(e: MouseEvent) {
      const rect = gl.canvas.getBoundingClientRect();
      targetMouse = [
        (e.clientX - rect.left) / rect.width,
        1.0 - (e.clientY - rect.top) / rect.height,
      ];
    }
    function handleMouseLeave() {
      targetMouse = [0.5, 0.5];
    }
    function resize() {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      if (program) {
        program.uniforms.uResolution.value = [
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height,
        ];
      }
    }

    window.addEventListener("resize", resize);
    resize();

    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height] },
        uSpeed: { value: 0.6 },
        uScale: { value: 0.55 },
        uRingCount: { value: 8 },
        uSpokeCount: { value: 8 },
        uRingThickness: { value: 0.04 },
        uSpokeThickness: { value: 0.008 },
        uSweepSpeed: { value: 0.8 },
        uSweepWidth: { value: 2.5 },
        uSweepLobes: { value: 1 },
        uColor: { value: hexToVec3("#FF0080") },
        uBgColor: { value: hexToVec3("#020104") },
        uFalloff: { value: 2.2 },
        uBrightness: { value: 1.1 },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uMouseInfluence: { value: 0.08 },
        uEnableMouse: { value: true },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(gl.canvas);

    gl.canvas.addEventListener("mousemove", handleMouseMove);
    gl.canvas.addEventListener("mouseleave", handleMouseLeave);

    let animId: number;
    function update(time: number) {
      animId = requestAnimationFrame(update);
      program.uniforms.uTime.value = time * 0.001;
      currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
      currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
      program.uniforms.uMouse.value[0] = currentMouse[0];
      program.uniforms.uMouse.value[1] = currentMouse[1];
      renderer.render({ scene: mesh });
    }
    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      gl.canvas.removeEventListener("mousemove", handleMouseMove);
      gl.canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        opacity: 0.55,
      }}
    />
  );
}

// ─── Utility ─────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Photo Placeholder ────────────────────────────────────────────────────────

function PhotoSlot({
  src,
  alt,
  label,
  aspect = "3/4",
}: {
  src: string;
  alt: string;
  label?: string;
  aspect?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          position: "relative",
          aspectRatio: aspect,
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid rgba(255,0,128,0.25)",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      {label && (
        <p style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center" }}>
          {label}
        </p>
      )}
    </div>
  );
}

// ─── Section wrapper with fade-in ────────────────────────────────────────────

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Stat chip ────────────────────────────────────────────────────────────────

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontSize: 32, fontWeight: 700, fontFamily: "'Georgia', serif", background: "linear-gradient(90deg,#FF0080,#FFD700,#0077FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        {value}
      </span>
      <span style={{ fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.38)" }}>
        {label}
      </span>
    </div>
  );
}

// ─── Pillar card ─────────────────────────────────────────────────────────────

function Pillar({ num, title, body, accent }: { num: string; title: string; body: string; accent: string }) {
  return (
    <div
      style={{
        padding: "1.5rem",
        borderRadius: 6,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(6px)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: accent, borderRadius: "6px 0 0 6px" }} />
      <span style={{ fontSize: 10, fontFamily: "monospace", color: accent, letterSpacing: "0.15em" }}>{num}</span>
      <h4 style={{ fontSize: 15, fontWeight: 600, color: "#fff", fontFamily: "'Georgia', serif", lineHeight: 1.3 }}>{title}</h4>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{body}</p>
    </div>
  );
}

// ─── Founder card ────────────────────────────────────────────────────────────

function Founder({ src, name, roles, bio }: { src: string; name: string; roles: string[]; bio: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: "1.75rem",
        borderRadius: 6,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", flexShrink: 0, overflow: "hidden", border: "2px solid rgba(255,0,128,0.35)", background: "rgba(255,0,128,0.06)", position: "relative" }}>
          <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }} />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: 17, fontWeight: 700, color: "#fff", fontFamily: "'Georgia', serif", margin: "0 0 6px" }}>{name}</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {roles.map((r) => (
              <span key={r} style={{ fontSize: 9, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.12em", padding: "3px 8px", borderRadius: 2, border: "1px solid rgba(255,215,0,0.25)", color: "rgba(255,215,0,0.7)", background: "rgba(255,215,0,0.05)" }}>
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.48)", lineHeight: 1.75, margin: 0 }}>{bio}</p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AboutUs() {
  return (
    <main
      id="about-us"
      style={{
        background: "#020104",
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
        position: "relative",
        overflowX: "hidden",
      }}
    >

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <RadarBackground />
        {/* Vignette */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 30%, #020104 85%)", zIndex: 1, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 960, margin: "0 auto", padding: "6rem 2rem 4rem", width: "100%" }}>
          <Reveal>
            <p style={{ fontSize: 10, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(255,0,128,0.7)", marginBottom: 20 }}>
              Founded August 2025 · Mpondwe-Lhubiriha, Uganda
            </p>
            <h1 style={{ fontSize: "clamp(38px, 7vw, 80px)", fontWeight: 800, fontFamily: "'Georgia', serif", lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 28, maxWidth: 760 }}>
              Where the{" "}
              <span style={{ background: "linear-gradient(90deg, #FF0080 0%, #FFD700 50%, #0077FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                unreachable
              </span>{" "}
              become unstoppable.
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.52)", lineHeight: 1.8, maxWidth: 580, marginBottom: 48 }}>
              Peligram Intelligence was born from a conviction: that brilliance has no postcode. We build the infrastructure — human, technical, and social — to prove it.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 48 }}>
              <Stat value="150" label="Participants per cohort" />
              <Stat value="6mo" label="MERN stack pipeline" />
              <Stat value="4" label="Core pillars" />
              <Stat value="∞" label="Potential unlocked" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── COMMUNITY PHOTOS ── */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "5rem 2rem" }}>
        <Reveal>
          <p style={{ fontSize: 10, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,0,128,0.6)", marginBottom: 14 }}>
            The people behind the mission
          </p>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 700, fontFamily: "'Georgia', serif", marginBottom: 36, letterSpacing: "-0.5px", maxWidth: 500, lineHeight: 1.2 }}>
            Real lives.<br />Real transformation.
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <PhotoSlot src="/ghetto.webp" alt="Youth participants in the Logic Lab" label="Techonology can turn the ghetto into a hub of innovation" />
            <PhotoSlot src="/young-mothers.jpeg" alt="Single mothers in tech training" label="Microsoft Office Training Program For Young Mothers" aspect="4/5" />
            <PhotoSlot src="/laptop.webp" alt="Code-Fest event in Mpondwe" label="Community code-fest" />
          </div>
        </Reveal>
      </section>

      {/* ── STORY ── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.2, pointerEvents: "none" }}>
          <RadarBackground />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 960, margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <Reveal>
              <p style={{ fontSize: 10, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(0,119,255,0.7)", marginBottom: 14 }}>
                Our origin
              </p>
              <h2 style={{ fontSize: "clamp(22px, 3.5vw, 38px)", fontWeight: 700, fontFamily: "'Georgia', serif", marginBottom: 22, lineHeight: 1.25, letterSpacing: "-0.4px" }}>
                Antisocial behaviour is not a character flaw — it is a vacancy waiting to be filled.
              </h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.85, marginBottom: 18 }}>
                In the border town of Mpondwe-Lhubiriha, youth with extraordinary potential were slipping through every net. School-dropout pipelines led nowhere. Vocational centres were built for someone else. Addiction filled the silence where opportunity should have been.
              </p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.85 }}>
                Two people — a software engineer and a science teacher — looked at that silence and heard a different sound: the click of a keyboard, the rhythm of logic, the irreversible momentum of someone who has just understood their own capability.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <PhotoSlot src="/addiction_4.jpg" alt="Mpondwe community" label="Together We can break the chains of addiction" aspect="1/1" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOUR PILLARS ── */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "5rem 2rem" }}>
        <Reveal>
          <p style={{ fontSize: 10, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,215,0,0.6)", marginBottom: 14 }}>
            The Logic Lab framework
          </p>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 38px)", fontWeight: 700, fontFamily: "'Georgia', serif", marginBottom: 36, letterSpacing: "-0.4px" }}>
            Four pillars. One transformation.
          </h2>
        </Reveal>
        <Reveal delay={60}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            <Pillar
              num="01 / Awareness"
              accent="#FF0080"
              title="The Awareness Patch"
              body="Monthly Code-Fests brought into the heart of local trading centres — live demonstrations that show a community what constructive dopamine looks like when curiosity replaces craving."
            />
            <Pillar
              num="02 / Pipeline"
              accent="#FFD700"
              title="Code-to-Earn"
              body="An intensive six-month MERN Stack curriculum engineered for rapid workforce entry. Graduates emerge freelance-ready, remote-work-ready, and globally competitive from day one."
            />
            <Pillar
              num="03 / Resilience"
              accent="#0077FF"
              title="The Resilience Module"
              body="Cloud-based micro-tasking and foundational cybersecurity training built for single mothers and persons with disabilities — income pathways that fit around life, not the other way around."
            />
            <Pillar
              num="04 / Community"
              accent="#FF0080"
              title="Peer-Mentor Loop"
              body="A living social firewall: local tech leaders and international volunteers providing mentorship, accountability, and the kind of belonging that makes relapse into old habits structurally difficult."
            />
          </div>
        </Reveal>
      </section>

      {/* ── IMPACT PHOTO STRIP ── */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 2rem 5rem" }}>
        <Reveal>
          <PhotoSlot src="/session.jpg" alt="Logic Lab training session" label="Future Logic Hub" aspect="21/9" />
        </Reveal>
      </section>

      {/* ── FOUNDERS ── */}
      <section style={{ position: "relative", overflow: "hidden " }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.18, pointerEvents: "none" }}>
          <RadarBackground />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 960, margin: "0 auto", padding: "5rem 2rem 6rem" }}>
          <Reveal>
            <p style={{ fontSize: 10, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,0,128,0.6)", marginBottom: 14 }}>
              The architects
            </p>
            <h2 style={{ fontSize: "clamp(22px, 3.5vw, 38px)", fontWeight: 700, fontFamily: "'Georgia', serif", marginBottom: 14, letterSpacing: "-0.4px" }}>
              Built by people who refused to look away.
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 520, marginBottom: 40 }}>
              Peligram Intelligence was co-founded in August 2025 when two professionals from different disciplines converged on the same diagnosis — and refused to wait for someone else to prescribe the cure.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
              <Founder
                src="/Passport.jpg"
                name="Richard Baluku"
                roles={["Fullstack Engineer", "Choirmaster", "Social Activist"]}
                bio="I bring the architecture of systems thinking to community work. As a fullstack software engineer who understands that the hardest bugs to fix are social ones, i have carefully designed the Logic Lab's technical curriculum with the same rigour i apply to producing code — and the same belief that every broken thing can be debugged."
              />
              <Founder
                src="/livani.jpg"
                name="Thembo Livani"
                roles={["Biology & Chemistry Teacher", "Junior Web Developer"]}
                bio="Classroom  has taught me one truth above all: understanding how something works is the beginning of freedom. As a science educator and emerging developer, I translate complex systems — biological, chemical, technological — into language that unlocks potential in people who were never told they were capable of understanding them."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "4rem 2rem 6rem", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontSize: "clamp(24px, 4.5vw, 52px)", fontWeight: 800, fontFamily: "'Georgia', serif", lineHeight: 1.1, letterSpacing: "-1px", marginBottom: 24 }}>
            The next cohort is{" "}
            <span style={{ background: "linear-gradient(90deg, #FF0080, #FFD700, #0077FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              waiting.
            </span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: 480, margin: "0 auto 36px" }}>
            Every six months, 150 people begin a journey toward digital sovereignty. The only thing standing between them and it is access.
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-block",
              padding: "14px 36px",
              borderRadius: 3,
              background: "linear-gradient(90deg, #FF0080, #0077FF)",
              color: "#fff",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "monospace",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Partner with us
          </a>
        </Reveal>
      </section>

      {/* global keyframes */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}