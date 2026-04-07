"use client";
import React from 'react'; // Added explicit React import
import { motion } from 'framer-motion';

const Register = () => {
  return (
    <section 
      id="register" 
      className="py-20 px-6 bg-[#050505] relative overflow-hidden"
    >
      {/* Top Divider Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-600/50 to-transparent opacity-30" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-10 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group hover:border-blue-600/30 transition-colors"
      >
        {/* Animated Background Glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full group-hover:bg-blue-600/20 transition-all duration-700" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-600/5 blur-[100px] rounded-full" />

        <div className="text-left space-y-6 max-w-xl z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
            <span className="text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase">Status: Admissions Open</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-[0.9]">
            COMPILE YOUR <br />
            <span className="text-blue-600">FUTURE.</span>
          </h2>
          
          <p className="text-gray-400 font-medium text-sm md:text-base leading-relaxed border-l-2 border-white/5 pl-6">
            The next MERN Stack Protocol cohort is initializing in Mpondwe Lhubiriha. Join 150 participants transmuting border dynamics into digital excellence.
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full md:w-auto z-10">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-xs rounded-sm hover:bg-blue-700 transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)]"
          >
            Apply For Protocol
          </motion.button>
          
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              <span>Slots Available</span>
              <span className="text-blue-500">150 / 150</span>
            </div>
            {/* Visual Progress Bar */}
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-full bg-blue-600" 
              />
            </div>
            <div className="text-[9px] font-mono text-gray-600 uppercase tracking-widest text-center md:text-left">
              // Next Cohort: June 2026 // Gateway v3.0
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Register;