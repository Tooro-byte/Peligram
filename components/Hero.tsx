'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center px-6 md:px-12 py-20 overflow-hidden">
      {/* 3-COLOR BLENDED BACKGROUND */}
      <div className="absolute inset-0 z-0">
        {/* Base dark layer */}
        <div className="absolute inset-0 bg-[#050505]" />
        
        {/* 3-Color Gradient Blend - Blue, Purple, Emerald */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/15 to-emerald-600/20" />
        
        {/* Animated gradient orbs for depth */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] animate-pulse delay-2000" />
        </div>
        
        {/* Tech grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-15" />
        
        {/* Diagonal color blend lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-600/10 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-emerald-600/10 to-transparent" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-purple-600/10 to-transparent" />
        </div>
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }} />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-10 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500" />
              <span className="text-[10px] font-mono text-blue-400 tracking-[0.2em] uppercase">Bukonzo West // Kasese District</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.15] tracking-tight">
              Engineering <br />
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent">
                Human Agency
              </span>
            </h1>
            
            <p className="text-gray-300 text-sm md:text-base max-w-md leading-relaxed">
              Transforming marginalized youth, school dropouts, recovering addicts, and PWDs into world-class software developers. Bridging Bukonzo West to the global digital economy.
            </p>

            {/* Stats with Real Kasese Data */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center group">
                <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">422,582</div>
                <div className="text-[8px] text-gray-500 uppercase tracking-wider leading-tight">Youth (15-64) in Kasese</div>
                <div className="text-[6px] text-gray-600 mt-0.5">out of 853,831 total</div>
              </div>
              <div className="w-px h-12 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-emerald-500/30 self-center" />
              <div className="text-center group">
                <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">27%</div>
                <div className="text-[8px] text-gray-500 uppercase tracking-wider leading-tight">Teenage Pregnancy Rate</div>
                <div className="text-[6px] text-gray-600 mt-0.5">vs 23% national avg</div>
              </div>
              <div className="w-px h-12 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-emerald-500/30 self-center" />
              <div className="text-center group">
                <div className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">80%</div>
                <div className="text-[8px] text-gray-500 uppercase tracking-wider leading-tight">PWD Children Out of School</div>
                <div className="text-[6px] text-gray-600 mt-0.5">only 14 sat for UCE 2025</div>
              </div>
            </div>

            {/* Second row of stats */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg border border-white/5 hover:border-blue-500/30 transition-all">
                <div className="text-lg font-bold text-orange-400">17%</div>
                <div className="text-[7px] text-gray-400 uppercase tracking-wider leading-tight">Girls drop out due to lack of sanitary pads</div>
              </div>
              <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg border border-white/5 hover:border-purple-500/30 transition-all">
                <div className="text-lg font-bold text-rose-400">8.73%</div>
                <div className="text-[7px] text-gray-400 uppercase tracking-wider leading-tight">Population lives with disability</div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Typewriter Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/15 rounded-2xl p-6 font-mono shadow-2xl"
          >
            {/* Terminal Header with gradient accent */}
            <div className="flex gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-[8px] text-gray-500 ml-2 font-mono">Peligram Terminal v1.0 // Kasese Gateway</span>
              <div className="flex-1" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            </div>
            
            {/* Typewriter Content */}
            <div className="text-blue-400 text-base md:text-lg leading-loose min-h-[120px]">
              <Typewriter
                options={{
                  strings: [
                    '>_ console.log("Hello, Kasese!"); // JavaScript',
                    '>_ print("Empowering 422,582 youth") # Python', 
                    '>_ System.out.println("Breaking the cycle of addiction"); // Java',
                    '>_ echo "17% of girls need sanitary pads"; // PHP',
                    '>_ // 80% of PWD children out of school',
                    '>_ // We are the change. We are Peligram.',
                  ],
                  autoStart: true,
                  loop: true,
                  cursor: '▋',
                  delay: 50,
                  deleteSpeed: 25,
                }}
              />
            </div>
            
            {/* Footer Message with Real Impact Data */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-[9px] text-gray-500 font-mono leading-relaxed">
                <span className="text-emerald-500">✦</span> Drug abuse: Significant & growing problem among Kasese youth <br />
                <span className="text-blue-500">✦</span> 40% of Ugandan girls married before 18 (national crisis) <br />
                <span className="text-purple-500">✦</span> Building futures, one line of code at a time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator with 3-color gradient */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[8px] text-gray-500 tracking-widest uppercase">Explore the Data</span>
        <div className="w-px h-12 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500" />
      </motion.div>
    </section>
  );
};

export default Hero;