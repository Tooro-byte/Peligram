'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Stat {
  stat: string;
  label: string;
  change: string;
}

const stats: Stat[] = [
  { stat: "27%", label: "Teenage Pregnancy Rate", change: "-12% since 2024" },
  { stat: "8.7%", label: "PWD Population", change: "80% out of school" },
  { stat: "150", label: "Active Trainees", change: "Cohort 2026" },
  { stat: "88%", label: "Employment Rate", change: "Post-program placement" }
];

const Philosophy: React.FC = () => {
  return (
    <section 
      id="philosophy" 
      className="relative py-24 px-6 md:px-12 overflow-hidden bg-[#0a0a14]"
    >
      {/* 16-Color Environmental Background Blend */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a1f] via-[#1a1433] via-[#0f172a] via-[#1e2a4a] via-[#0c2a3d] via-[#1a3a5a] to-[#112233]" />
      
      {/* Subtle animated grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-full">
              <span className="text-emerald-400 font-mono text-xs tracking-[3px] uppercase">LOGIC PHILOSOPHY</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-none tracking-tighter">
              Underutilized <br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Processors
              </span>
            </h2>

            <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
              We do not view school dropouts or recovering addicts as liabilities. 
              We see them as dormant processors waiting to be activated.
            </p>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-xl"
            >
              <p className="text-blue-200 text-[15px] leading-relaxed italic">
                "Once a human mind learns the logic of code, it can debug its own environment — 
                replacing drug dependency with economic agency."
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side - Glass Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, staggerChildren: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {stats.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.04, 
                    y: -8,
                    transition: { duration: 0.4 }
                  }}
                  className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 
                             hover:border-cyan-400/50 rounded-3xl p-8 overflow-hidden 
                             transition-all duration-500 hover:shadow-2xl"
                >
                  {/* Hover Glass Effect - 3 Super Colors */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-3 group-hover:text-cyan-300 transition-colors">
                      {item.stat}
                    </div>
                    
                    <div className="text-sm font-medium text-gray-300 mb-1 tracking-wide">
                      {item.label}
                    </div>
                    
                    <div className="text-xs text-emerald-400 font-mono tracking-wider">
                      {item.change}
                    </div>
                  </div>

                  {/* Subtle bottom glow line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 group-hover:opacity-70 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a14] to-transparent pointer-events-none" />
    </section>
  );
};

export default Philosophy;