'use client';
import React from 'react';

// Type defined directly in file
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
    <section id="philosophy" className="py-20 px-6 md:px-12 bg-[#080808] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="gsap-fade-up space-y-5">
            <span className="text-emerald-500 font-mono text-[9px] tracking-[0.4em] uppercase">The Logic Philosophy</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
              Underutilized <br />
              <span className="text-blue-600">Processors</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              We do not view school dropouts or recovering addicts as liabilities. We see them as dormant processors waiting to be activated.
            </p>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-5">
              <p className="text-blue-400 text-sm italic font-mono">
                "Once a human mind learns the logic of code, it can debug its own environment — replacing drug dependency with economic agency."
              </p>
            </div>
          </div>

          <div className="gsap-stagger grid grid-cols-2 gap-4">
            {stats.map((item, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-lg text-center border border-white/5">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">{item.stat}</div>
                <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mt-1">{item.label}</div>
                <div className="text-[8px] text-gray-600 mt-1">{item.change}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;