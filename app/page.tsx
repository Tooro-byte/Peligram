'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGsapScroll } from '../hooks/useGsapScroll'; // ← ADD THIS
import Navbar from "../components/NavBar"; // Fixed: NavBar → Navbar
import Hero from "../components/Hero";
import About from "../components/About";
import SkillPipeline from "../components/SkillPipline"; // Fixed: SkillPipline → SkillPipeline
import Philosophy from "../components/Philosophy";
import Contact from "../components/Contact";
import Footer from "../components/Footer"; // Fixed: @/components → relative path
import EntryPage from "../components/EntryPage";

export default function Home() {
  const [showEntry, setShowEntry] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useGsapScroll(); // ← ADD THIS

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showEntry && <EntryPage onUnlock={() => setShowEntry(false)} />}
      </AnimatePresence>

      {/* ADD containerRef to the main wrapper */}
      <div 
        ref={containerRef}
        className={`${!showEntry ? 'block' : 'hidden'}`}
      >
        <main className="min-h-screen bg-[#050505] relative scroll-smooth selection:bg-blue-500/30">
          {/* 21ST CENTURY BACKGROUND GRID */}
          <div
            className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* NAVIGATION: Persistent at the top */}
          <Navbar isScrolled={isScrolled} />

          {/* CORE CONTENT STRATEGY */}
          <div className="relative z-10">
            {/* 1. INITIALIZATION: The Brand Identity */}
            <Hero />

            {/* 2. THE PROBLEM: Identifying "Unreachable Nodes" */}
            <About />

            {/* 3. THE SKILLS: Full-Stack MERN Pipeline */}
            <SkillPipeline />

            {/* 4. THE PHILOSOPHY: Logic Behind Transformation */}
            <Philosophy />

            {/* 5. CALL TO ACTION: Registration Protocol */}
            <Contact />
          </div>
          
          {/* SYSTEM FOOTER */}
          <Footer />
        </main>
      </div>
    </>
  );
}