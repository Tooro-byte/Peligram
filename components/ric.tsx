'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Code2, Brain, Zap, Shield, Laptop, Network, Cpu, Terminal, Sparkles, X, ChevronRight } from 'lucide-react';

interface Program {
  title: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
  desc: string;
  fullDescription: string[];
}

const programs: Program[] = [
  {
    title: "MERN Stack Pipeline",
    icon: Code2,
    color: "text-blue-500",
    desc: "Full-stack JavaScript development",
    fullDescription: [
      "Full-stack development with MongoDB, Express.js, React, and Node.js.",
      "Build scalable web applications with seamless DB-to-UI integration.",
      "Deploy with CI/CD pipelines to production."
    ]
  },
  {
    title: "The Logic Rehab",
    icon: Brain,
    color: "text-emerald-500",
    desc: "Cognitive restructuring through code",
    fullDescription: [
      "Rewrite thinking patterns through algorithmic problem-solving.",
      "Break complex problems into manageable logical steps.",
      "Master recursion, dynamic programming, and system design."
    ]
  },
  {
    title: "Resilience Module",
    icon: Zap,
    color: "text-purple-500",
    desc: "Mental fortitude training",
    fullDescription: [
      "Build mental toughness through debugging marathons.",
      "Learn to embrace errors as opportunities for growth.",
      "Master the art of bouncing back from technical failures."
    ]
  },
  {
    title: "Legacy Literacy",
    icon: Laptop,
    color: "text-orange-500",
    desc: "Microsoft Office certification",
    fullDescription: [
      "Master Excel pivot tables, macros, and data visualization.",
      "Create professional PowerPoint presentations.",
      "Advanced Word formatting and Outlook productivity hacks."
    ]
  },
  {
    title: "Cyber Security",
    icon: Shield,
    color: "text-red-500",
    desc: "Digital protection fundamentals",
    fullDescription: [
      "Learn encryption, hashing, and secure data transmission.",
      "Understand OWASP top 10 vulnerabilities.",
      "Practice ethical hacking and penetration testing basics."
    ]
  },
  {
    title: "Cloud Services",
    icon: Network,
    color: "text-blue-400",
    desc: "AWS/Azure/Google Cloud",
    fullDescription: [
      "Deploy scalable infrastructure on AWS, Azure, and GCP.",
      "Master serverless computing and container orchestration.",
      "Implement auto-scaling and optimize cloud costs."
    ]
  },
  {
    title: "Creative Tech",
    icon: Cpu,
    color: "text-yellow-500",
    desc: "Digital music production",
    fullDescription: [
      "Produce music using DAWs like Ableton and FL Studio.",
      "Create beats, melodies, and harmonies with MIDI.",
      "Mix and master tracks using compression and EQ."
    ]
  },
  {
    title: "Digital Export",
    icon: Terminal,
    color: "text-cyan-500",
    desc: "Global freelancing pipeline",
    fullDescription: [
      "Build a global freelance brand on Upwork and Fiverr.",
      "Master client acquisition and retention strategies.",
      "Handle contracts, invoices, and international payments."
    ]
  }
];

const SkillPipeline: React.FC = () => {
  const [isExploded, setIsExploded] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [cardPositions, setCardPositions] = useState<Map<number, { x: number; y: number }>>(new Map());
  const sectionRef = useRef<HTMLElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getCardPosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    const radius = 260;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y, angle };
  };

  useEffect(() => {
    const positions = new Map();
    cardRefs.current.forEach((ref, idx) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const containerRect = sectionRef.current?.getBoundingClientRect();
        if (containerRect) {
          positions.set(idx, {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2
          });
        }
      }
    });
    setCardPositions(positions);
  }, [isExploded]);

  const handleExplode = () => {
    setIsExploded(!isExploded);
    setExpandedCard(null);

    if (!isExploded) {
      const newSparkles = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 500,
        y: (Math.random() - 0.5) * 500,
        delay: Math.random() * 0.5
      }));
      setSparkles(newSparkles);

      setTimeout(() => setSparkles([]), 2000);
    }
  };

  const handleCardClick = (index: number) => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  const scrollToPipeline = () => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    (window as any).scrollToPipeline = scrollToPipeline;
    return () => {
      delete (window as any).scrollToPipeline;
    };
  }, []);

  return (
    <section
      id="pipeline"
      ref={sectionRef}
      className="min-h-screen bg-[#0a0a0f] py-20 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aurora-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.8),rgba(10,10,15,0.95))]" />
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" style={{ zIndex: 1 }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59,130,246,0.1)" strokeWidth="0.5"/>
          </pattern>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59,130,246,0)" />
            <stop offset="50%" stopColor="rgba(59,130,246,0.6)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="text-center mb-12 opacity-0 animate-[fadeInUp_0.6s_ease_forwards]">
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Skill <span className="aurora-text">Pipeline</span>
          </h2>
          <p className="text-gray-400 font-mono text-[10px] tracking-[0.3em] uppercase mt-3 flex items-center justify-center gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full pulse-glow" />
            COMPILING HUMAN AGENCY
            <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full pulse-glow" />
          </p>
          <div className="h-px aurora-line mt-4 w-full max-w-md mx-auto" />
        </div>

        <div className="relative flex items-center justify-center min-h-[580px] md:min-h-[620px]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 15 }}>
            {isExploded && programs.map((_, idx) => {
              const pos = getCardPosition(idx, programs.length);
              return (
                <g key={idx} className="connection-line">
                  <line
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${pos.x}px)`}
                    y2={`calc(50% + ${pos.y}px)`}
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    className="circuit-line"
                    style={{
                      animationDelay: `${idx * 0.05}s`,
                      strokeDasharray: '5,5',
                      strokeDashoffset: '0'
                    }}
                  />
                  <circle
                    cx={`calc(50% + ${pos.x}px)`}
                    cy={`calc(50% + ${pos.y}px)`}
                    r="3"
                    fill="rgba(59,130,246,0.6)"
                    className="node-pulse"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  />
                </g>
              );
            })}
          </svg>

          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="fire-sparkle"
              style={{
                left: `50%`,
                top: `50%`,
                marginLeft: `${sparkle.x}px`,
                marginTop: `${sparkle.y}px`,
                animationDelay: `${sparkle.delay}s`
              }}
            />
          ))}

          <div
            ref={centerRef}
            onClick={handleExplode}
            className={`
              relative z-30 cursor-pointer transition-all duration-700 ease-out
              ${isExploded ? 'scale-90' : 'scale-100 hover:scale-105'}
            `}
          >
            <div className="absolute inset-0 aurora-orb rounded-full blur-2xl opacity-70" />
            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full aurora-orb-solid flex items-center justify-center shadow-2xl shadow-blue-500/40 transition-all duration-300 orb-ring">
              {!isExploded ? (
                <Sparkles className="w-10 h-10 md:w-14 md:h-14 text-white orb-icon" strokeWidth={1.5} />
              ) : (
                <X className="w-10 h-10 md:w-14 md:h-14 text-white orb-icon" strokeWidth={1.5} />
              )}
            </div>
            <p className="text-center text-[10px] text-gray-500 mt-3 font-mono tracking-wider">
              {!isExploded ? '⚡ CLICK TO EXPLODE ⚡' : '✧ CLICK TO COLLAPSE ✧'}
            </p>
          </div>

          {programs.map((program, idx) => {
            const pos = getCardPosition(idx, programs.length);
            const isExpanded = expandedCard === idx;
            const shouldShrink = expandedCard !== null && !isExpanded;

            return (
              <div
                key={idx}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className={`
                  absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.2,0.64,1)]
                  ${isExploded
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                  }
                  ${shouldShrink ? 'scale-75 opacity-40' : 'scale-100 opacity-100'}
                `}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: isExploded
                    ? `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) ${shouldShrink ? 'scale(0.75)' : 'scale(1)'}`
                    : 'translate(-50%, -50%)',
                  transitionDelay: isExploded ? `${idx * 40}ms` : '0ms',
                  zIndex: isExpanded ? 100 : 20 + idx,
                }}
              >
                <div
                  onClick={() => handleCardClick(idx)}
                  className="group relative transition-all duration-300 cursor-pointer"
                >
                  <div className="absolute inset-0 aurora-card-glow rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-48 md:w-56 p-4 card-glass border border-white/10 rounded-xl hover:border-blue-400/60 hover:-translate-y-1 transition-all duration-300 shadow-xl overflow-hidden">
                    <div className="absolute inset-0 circuit-pattern opacity-10" />
                    <program.icon className={`${program.color} mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10 drop-shadow-glow`} size={22} />
                    <h3 className="text-sm font-bold text-white mb-1 tracking-tight relative z-10">{program.title}</h3>
                    <p className="text-gray-300 text-[9px] leading-relaxed relative z-10">{program.desc}</p>
                    <div className="h-px w-6 bg-gradient-to-r from-blue-400/50 to-transparent group-hover:w-full transition-all duration-500 mt-2 relative z-10" />
                    <div className="mt-2 text-[8px] text-blue-400/70 font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                      <ChevronRight size={10} /> click to expand
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <>
                    <div
                      className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
                      onClick={() => setExpandedCard(null)}
                    />
                    <div
                      className="fixed z-[201] animate-scaleIn"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div className="w-80 md:w-96 panel-glass border border-blue-400/40 rounded-2xl shadow-2xl shadow-blue-500/30 p-5 backdrop-blur-md overflow-hidden max-h-[60vh] flex flex-col">
                        <div className="absolute inset-0 circuit-pattern opacity-5" />
                        <div className="flex items-center justify-between mb-3 relative z-10">
                          <div className="flex items-center gap-2">
                            <program.icon className={`${program.color} w-5 h-5 drop-shadow-glow`} />
                            <h4 className="text-sm font-bold text-white">{program.title}</h4>
                          </div>
                          <button
                            onClick={() => setExpandedCard(null)}
                            className="text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full p-1 flex-shrink-0"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <div className="space-y-2 overflow-y-auto custom-scrollbar relative z-10 flex-1">
                          {program.fullDescription.map((sentence, i) => (
                            <p key={i} className="text-gray-200 text-xs leading-relaxed flex gap-2">
                              <span className="text-blue-400 flex-shrink-0">✦</span>
                              <span>{sentence}</span>
                            </p>
                          ))}
                        </div>
                        <div className="mt-3 pt-2 border-t border-white/10 relative z-10">
                          <span className="text-[8px] text-blue-400 font-mono">✦ skill pipeline module ✦</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {isExploded && (
          <div className="text-center mt-8 text-gray-400 text-[10px] font-mono animate-fadeIn">
            ✧ click any card to view full description ✧ click orb to collapse ✧
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes aurora {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes orbPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        @keyframes sparkle {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0) translateY(-100px);
          }
        }

        @keyframes nodePulse {
          0%, 100% { opacity: 0.6; r: 3; }
          50% { opacity: 1; r: 4; }
        }

        @keyframes circuitFlow {
          0% { stroke-dashoffset: 10; }
          100% { stroke-dashoffset: 0; }
        }

        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 5px rgba(59,130,246,0.5); }
          50% { box-shadow: 0 0 20px rgba(59,130,246,1); }
        }

        .aurora-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg,
            rgba(59, 130, 246, 0.1) 0%,
            rgba(139, 92, 246, 0.1) 25%,
            rgba(236, 72, 153, 0.1) 50%,
            rgba(59, 130, 246, 0.1) 75%,
            rgba(16, 185, 129, 0.1) 100%
          );
          background-size: 400% 400%;
          animation: aurora 20s ease infinite;
        }

        .aurora-text {
          background: linear-gradient(90deg,
            #3b82f6 0%,
            #8b5cf6 25%,
            #ec4899 50%,
            #3b82f6 75%,
            #10b981 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: aurora 8s linear infinite;
        }

        .aurora-line {
          background: linear-gradient(90deg,
            transparent 0%,
            #3b82f6 25%,
            #8b5cf6 50%,
            #ec4899 75%,
            transparent 100%
          );
          background-size: 200% auto;
          animation: aurora 6s linear infinite;
        }

        .aurora-orb {
          background: radial-gradient(circle at 30% 30%,
            rgba(59, 130, 246, 0.8),
            rgba(139, 92, 246, 0.6),
            rgba(236, 72, 153, 0.4)
          );
          animation: orbPulse 3s ease-in-out infinite;
        }

        .aurora-orb-solid {
          background: linear-gradient(135deg,
            #3b82f6 0%,
            #8b5cf6 50%,
            #ec4899 100%
          );
          background-size: 200% 200%;
          animation: aurora 4s ease infinite;
        }

        .orb-ring {
          position: relative;
        }

        .orb-ring::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          padding: 2px;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
          background-size: 300% 300%;
          animation: aurora 3s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .orb-icon {
          filter: drop-shadow(0 0 10px rgba(255,255,255,0.5));
        }

        .pulse-glow {
          animation: glowPulse 2s ease-in-out infinite;
        }

        .fire-sparkle {
          position: fixed;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, #fbbf24 0%, #ef4444 50%, transparent 100%);
          border-radius: 50%;
          pointer-events: none;
          animation: sparkle 1.5s ease-out forwards;
          box-shadow: 0 0 10px #fbbf24, 0 0 20px #ef4444;
          z-index: 25;
        }

        .circuit-line {
          animation: circuitFlow 2s linear infinite;
        }

        .node-pulse {
          animation: nodePulse 2s ease-in-out infinite;
        }

        .card-glass {
          background: linear-gradient(135deg,
            rgba(17, 24, 39, 0.8) 0%,
            rgba(31, 41, 55, 0.6) 100%
          );
          backdrop-filter: blur(10px);
        }

        .panel-glass {
          background: linear-gradient(135deg,
            rgba(17, 24, 39, 0.95) 0%,
            rgba(15, 23, 42, 0.95) 100%
          );
          backdrop-filter: blur(20px);
        }

        .aurora-card-glow {
          background: radial-gradient(circle,
            rgba(59, 130, 246, 0.2),
            rgba(139, 92, 246, 0.1),
            transparent
          );
        }

        .circuit-pattern {
          background-image:
            linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px),
            linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px currentColor);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #60a5fa, #a78bfa);
        }
      `}</style>
    </section>
  );
};

export default SkillPipeline;
