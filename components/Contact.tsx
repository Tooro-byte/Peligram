"use client";
import React from "react";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="min-h-screen relative overflow-hidden bg-[#0a0a14] flex items-center"
    >
      {/* Background Gradient Blend */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF0080]/10 via-[#6B00B6]/10 to-[#00F5D4]/10" />

      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full mb-8">
            <div className="w-2 h-2 bg-[#00F5D4] rounded-full animate-pulse" />
            <span className="text-[#00F5D4] font-mono text-xs tracking-[3px] uppercase">
              Loosening the Chains of addiction
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tighter text-white mb-6">
            Your Future Is Not
            <br />
            <span className="bg-gradient-to-r from-[#FF0080] via-[#6B00B6] to-[#00F5D4] bg-clip-text text-transparent">
              Over Yet
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            If you are a school dropout, struggling with drugs, a young mother,
            or a person with disability — this is your turning point.
          </p>

          {/* Emotional Message */}
          <div className="max-w-2xl mx-auto mb-16">
            <p className="text-gray-400 text-lg leading-relaxed">
              We don't see you as a problem.
              <br />
              We see you as a{" "}
              <span className="text-[#FF0080] font-semibold">
                dormant processor
              </span>{" "}
              waiting to be activated.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mt-6">
              The Logic Lab in Mpondwe-Lhubiriha is not just a training center.
              <br />
              It's your gateway out of addiction, poverty, and limitation — into
              digital skills, remote income, and a new identity.
            </p>
          </div>

          {/* Strong Call to Action */}
          <div className="flex flex-col items-center gap-6">
            <Link href="/apply">
              <button
                className="group relative px-16 py-6 bg-gradient-to-r from-[#FF0080] to-[#00F5D4] hover:from-[#FF0080] hover:to-[#FF0080] 
                                 text-white font-black text-lg tracking-widest rounded-2xl transition-all duration-300 
                                 flex items-center gap-4 shadow-2xl shadow-pink-500/50 hover:scale-105 active:scale-95"
              >
                APPLY FOR THE PROTOCOL
                <ArrowRight
                  className="group-hover:translate-x-2 transition-transform"
                  size={28}
                />
              </button>
            </Link>

            <p className="text-sm text-gray-500 font-mono tracking-widest">
              NEXT COHORT STARTS JUNE 2026 • 150 SLOTS ONLY
            </p>
          </div>

          {/* Trust Elements */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-[#00F5D4] text-4xl font-bold mb-2">150</div>
              <div className="text-gray-400 text-sm">
                Participants Per Cohort
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-[#FF0080] text-4xl font-bold mb-2">MERN</div>
              <div className="text-gray-400 text-sm">Full Stack Training</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-[#6B00B6] text-4xl font-bold mb-2">∞</div>
              <div className="text-gray-400 text-sm">
                New Life Opportunities
              </div>
            </div>
          </div>

          {/* Final Motivational Line */}
          <div className="mt-16 text-center">
            <p className="text-[#00F5D4] font-medium text-lg">
              From the border town of Mpondwe to the global digital economy —
              <br />
              Your comeback story starts here.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Accent Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF0080] via-[#6B00B6] to-[#00F5D4]" />
    </section>
  );
};

export default Contact;
