"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useGsapScroll } from "../hooks/useGsapScroll";
import AboutUs from "../components/AboutUs";
import Navbar from "../components/NavBar";
import Hero from "../components/Hero";
import Products from "../components/Products";
import About from "../components/About";
import SkillPipeline from "../components/SkillPipline";
import Philosophy from "../components/Philosophy";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import EntryPage from "../components/EntryPage";

export default function Home() {
  const [showEntry, setShowEntry] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useGsapScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showEntry && <EntryPage onUnlock={() => setShowEntry(false)} />}
      </AnimatePresence>

      {/* NAVBAR - RENDERED CONDITIONALLY BUT ALWAYS AT TOP LEVEL */}
      {!showEntry && <Navbar isScrolled={isScrolled} />}

      {/* MAIN CONTENT */}
      <div ref={containerRef} className={`${!showEntry ? "block" : "hidden"}`}>
        {/* SPACER DIV - CRITICAL FOR FIXED NAVBAR */}
        {!showEntry && <div style={{ height: "80px" }} />}
        
        <main className="min-h-screen bg-[#050505] relative scroll-smooth selection:bg-blue-500/30">
          {/* GRID BACKGROUND */}
          <div
            className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* CONTENT SECTION */}
          <div className="relative z-10">
            <Hero />
            <About />
             <SkillPipeline />  
            <AboutUs />
            <Philosophy />
             <Products />
            <Contact />
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
}