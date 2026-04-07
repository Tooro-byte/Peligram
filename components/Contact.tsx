"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-20 px-6 md:px-12 bg-[#050505] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden group hover:border-blue-600/30 transition-all"
        >
          {/* Background blobs */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-emerald-600/5 blur-[80px] rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping" />
                <span className="text-blue-500 font-mono text-[9px] tracking-[0.3em] uppercase">
                  Status: Admissions Open
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Compile Your <br />
                <span className="text-blue-600">Future.</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                The next MERN Stack Protocol cohort is initializing in
                Mpondwe-Lhubiriha. Join 150 participants transmuting border
                dynamics into digital excellence.
              </p>
              <div className="space-y-2 pt-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="w-1 h-4 bg-blue-600" />
                  <span>
                    📍 Mpondwe-Lhubiriha Town Council, Kasese District
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="w-1 h-4 bg-blue-600" />
                  <span>📧 peliritter7@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="w-1 h-4 bg-blue-600" />
                  <span>📞 +256 (0) 777950995 / +256 (0) 769189155</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <motion.a
                href="mailto:peliritter7@gmail.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-blue-600 text-white font-black uppercase tracking-[0.15em] text-xs rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 text-center flex items-center justify-center gap-2"
              >
                Apply For Protocol <ArrowRight size={14} />
              </motion.a>

              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-mono text-gray-500 uppercase tracking-wider">
                  <span>Cohort Slots</span>
                  <span className="text-blue-500">150 Capacity</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5 }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
                <div className="text-[8px] font-mono text-gray-600 uppercase tracking-wider text-center">
                  // Next Cohort: June 2026 // Gateway v3.0
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
