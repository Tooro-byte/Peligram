"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Cpu,
  Gamepad2,
  Shield,
  Layout,
  Server,
  Smartphone,
  Network,
  MonitorDot,
  Cloud,
  Zap,
  Lock,
  CloudCog,
  Sparkles,
  Rocket,
  Star,
} from "lucide-react";
import Link from "next/link";

type LucideIcon = React.ComponentType<{ className?: string; size?: number }>;

const useMagneticTilt = (ref: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = ((y - rect.height / 2) / rect.height) * -18;
      const rotateY = ((rect.width / 2 - x) / rect.width) * 18;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        element.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(25px)`;
      });
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(rafId);
      element.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);
};

interface ProductCardProps {
  icon: LucideIcon;
  name: string;
  desc: string;
  delay: number;
  gradient: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  icon: Icon,
  name,
  desc,
  delay,
  gradient,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  useMagneticTilt(cardRef);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="group relative h-full"
    >
      <div className={`absolute -inset-px bg-gradient-to-br ${gradient} rounded-3xl opacity-0 group-hover:opacity-40 blur-xl transition-all duration-700`} />

      <div className="relative h-full bg-zinc-950/80 border border-white/10 backdrop-blur-2xl rounded-3xl p-9 overflow-hidden flex flex-col transition-all duration-500 group-hover:border-white/20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />

        <div className="mb-8 relative">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-2xl shadow-black/60 group-hover:scale-110 transition-transform duration-500`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -top-2 -right-2 text-yellow-400 opacity-30"
          >
            <Star size={18} />
          </motion.div>
        </div>

        <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300">
          {name}
        </h3>

        <p className="text-zinc-400 leading-relaxed text-[15px] flex-1">
          {desc}
        </p>

        <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[3px] text-white/40 font-mono">
            <div className="w-1.5 h-px bg-white/40" /> EXPLORE
          </div>
          <motion.div
            whileHover={{ rotate: 45 }}
            className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-white/70" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1800;
          const increment = target / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start * 10) / 10);
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-6xl md:text-7xl font-bold tracking-tighter text-white tabular-nums">
      {count}
      {suffix}
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    { value: 150, suffix: "+", label: "Six Month's Target Youth Earn Certificates" },
    { value: 27, suffix: "", label: "Enterprise Projects Delivered to Happy Customers" },
    { value: 70.8, suffix: "%", label: "Uptime & Reliability" },
    { value: 12, suffix: "", label: "Global Verticals" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-28">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 + 0.2 }}
          className="group relative bg-zinc-950/60 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:border-white/20 transition-all"
        >
          <AnimatedCounter target={stat.value} suffix={stat.suffix} />
          <p className="mt-4 text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors uppercase tracking-widest font-light">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

const CategoryHeader = ({
  category,
  icon: Icon,
  gradient,
  description,
  index,
}: {
  category: string;
  icon: LucideIcon;
  gradient: string;
  description: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
  >
    <div className="flex items-center gap-6">
      <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-2xl`}>
        <Icon className="w-9 h-9 text-white" />
      </div>
      <div>
        <div className="uppercase text-xs tracking-[4px] text-white/50 font-mono mb-1">
          CATEGORY {String(index + 1).padStart(2, "0")}
        </div>
        <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
          {category}
        </h3>
      </div>
    </div>
    <div className="max-w-md text-zinc-400 text-lg leading-snug">
      {description}
    </div>
  </motion.div>
);

// Main Products Component (Clean Version)
const Products: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.4], ["0%", "-20%"]);

  const [particlePositions, setParticlePositions] = useState<Array<{ left: string; top: string }>>([]);

  useEffect(() => {
    const positions = Array.from({ length: 8 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setParticlePositions(positions);
  }, []);

  const productCategories = [
    {
      category: "Software Engineering Suite",
      icon: Cpu,
      gradient: "from-[#3b82f6] via-[#06b6d4] to-[#22d3ee]",
      description: "Enterprise-grade platforms engineered for scale, performance, and unmatched developer experience.",
      items: [
        { name: "Web Development", desc: "Blazing-fast Next.js & React architectures with advanced SSR, edge computing, and performance optimization.", icon: Layout },
        { name: "Backend Systems", desc: "Scalable Java & Spring Boot microservices with event-driven architecture and real-time capabilities.", icon: Server },
        { name: "Mobile Solutions", desc: "Native Android & cross-platform Flutter/Kotlin applications delivering exceptional user experiences.", icon: Smartphone },
        { name: "API & Integration", desc: "Enterprise GraphQL & RESTful APIs with robust security, rate limiting, and observability.", icon: Network },
      ],
    },
    {
      category: "Immersive & Creative Solutions",
      icon: Gamepad2,
      gradient: "from-[#a855f7] via-[#ec4899] to-[#f43f5e]",
      description: "Next-generation interactive experiences that captivate audiences and drive engagement.",
      items: [
        { name: "Game Development", desc: "High-fidelity 2D/3D games and interactive simulations using Unity, Unreal Engine & WebGL.", icon: Gamepad2 },
        { name: "Desktop Applications", desc: "Sophisticated native applications for Windows, macOS, and Linux with modern UI/UX.", icon: MonitorDot },
        { name: "Cloud Platforms", desc: "Secure, auto-scaling infrastructure on AWS, Azure & GCP with advanced DevOps practices.", icon: Cloud },
        { name: "Automation & CI/CD", desc: "Intelligent pipelines using GitHub Actions, ArgoCD, Terraform and advanced orchestration.", icon: Zap },
      ],
    },
    {
      category: "Security & Resilience",
      icon: Shield,
      gradient: "from-[#10b981] via-[#14b8a6] to-[#22d3ee]",
      description: "Zero-trust security frameworks and future-proof architectures that protect what matters most.",
      items: [
        { name: "Cybersecurity Suite", desc: "Advanced threat intelligence, real-time monitoring, and automated incident response.", icon: Lock },
        { name: "Cloud Security", desc: "Zero-trust architecture, compliance automation, and continuous security posture management.", icon: CloudCog },
        { name: "Penetration Testing", desc: "Professional ethical hacking, red team exercises, and comprehensive vulnerability assessments.", icon: Shield },
        { name: "Data Protection", desc: "Enterprise-grade encryption, secure key management, and privacy-first architecture.", icon: Lock },
      ],
    },
  ];

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden bg-[#050507]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(at_20%_30%,rgba(59,130,246,0.15)_0%,transparent_50%),radial-gradient(at_80%_70%,rgba(236,72,153,0.15)_0%,transparent_50%),radial-gradient(at_40%_80%,rgba(16,185,129,0.12)_0%,transparent_60%),radial-gradient(at_60%_20%,rgba(168,85,247,0.12)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px] opacity-40" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ opacity: 0.15 }}
            animate={{ y: ["-20%", "120%"], opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: 25 + (i % 5) * 6, repeat: Infinity, delay: i * -4.2 }}
            style={{ left: pos.left, top: pos.top }}
            suppressHydrationWarning
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-8">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="uppercase text-xs tracking-[4px] font-mono text-white/70">
              Premium Product Ecosystem
            </span>
          </div>

          <h1 className="text-6xl md:text-[92px] leading-none font-black tracking-tighter text-white mb-6">
            Engineering the{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Extraordinary
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-zinc-400">
            World-class digital products and platforms crafted with obsession for quality, performance, and delight.
          </p>
        </motion.div>

        <StatsSection />

        <div className="space-y-32">
          {productCategories.map((cat, catIndex) => (
            <div key={catIndex}>
              <CategoryHeader
                category={cat.category}
                icon={cat.icon}
                gradient={cat.gradient}
                description={cat.description}
                index={catIndex}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cat.items.map((product, idx) => (
                  <ProductCard
                    key={idx}
                    icon={product.icon}
                    name={product.name}
                    desc={product.desc}
                    delay={idx * 0.08 + catIndex * 0.1}
                    gradient={cat.gradient}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section - Now links to /build */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-32 relative"
        >
          <div className="relative overflow-hidden rounded-[2.75rem] p-16 md:p-20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(139,92,246,0.15),transparent)]" />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <Rocket className="w-16 h-16 mx-auto mb-8 text-pink-400" />
              <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-white">
                Ready to build something legendary?
              </h3>
              <p className="text-zinc-400 text-lg mb-10">
                Let's turn your vision into a premium digital product that stands above the competition.
              </p>

              <Link href="/build">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.985 }}
                  className="group relative px-12 py-5 rounded-2xl bg-white text-black font-semibold text-lg overflow-hidden flex items-center gap-3 mx-auto"
                >
                  <span>Start a Project</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </Link>

              <p className="mt-8 text-xs uppercase tracking-widest text-white/40 font-mono">
                Trusted by visionary leaders worldwide
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-24 text-center">
          <p className="text-[10px] font-mono tracking-[3px] text-white/30">
            PELIGRAM INTELLIGENCE • CRAFTING DIGITAL EXCELLENCE
          </p>
        </div>
      </div>
    </section>
  );
};

export default Products;