'use client';
import React, { useState } from 'react';
import { Menu, X, Sparkles, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink {
  name: string;
  href: string;
}

interface NavbarProps {
  isScrolled: boolean;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about-us" },
  { name: "Products", href: "#products" },
  { name: "OUR WORK", href: "#about" },
  { name: "Pipeline", href: "#pipeline" },
  { name: "Philosophy", href: "#philosophy" },
  { name: "Make a Move", href: "#contact" }
];

const colors = {
  pink: '#ff2d75',
  pinkLight: '#ff6b9d',
  pinkGlow: 'rgba(255, 45, 117, 0.25)',
  teal: '#00e5d8',
  tealLight: '#5efff2',
  tealGlow: 'rgba(0, 229, 216, 0.25)',
  purple: '#a855f7',
  purpleLight: '#c084fc',
  purpleGlow: 'rgba(168, 85, 247, 0.2)',
  coral: '#ff6b6b',
  glassBg: 'rgba(20, 10, 30, 0.65)',
  glassBorder: 'rgba(255, 255, 255, 0.12)',
  glassHighlight: 'rgba(255, 255, 255, 0.05)',
};

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 w-full z-50 px-6 md:px-12 py-4 transition-all duration-500 backdrop-blur-xl`}
      style={{
        background: isScrolled 
          ? `linear-gradient(135deg, ${colors.glassBg}, rgba(30, 15, 45, 0.8))`
          : `linear-gradient(135deg, ${colors.glassBg}, rgba(25, 12, 40, 0.7))`,
        borderBottom: `1px solid ${colors.glassBorder}`,
        boxShadow: isScrolled 
          ? `0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 ${colors.glassHighlight}`
          : `0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 ${colors.glassHighlight}`,
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-b-2xl">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full mix-blend-screen filter blur-3xl animate-pulse" 
          style={{ background: colors.pink, opacity: 0.15 }} />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000" 
          style={{ background: colors.teal, opacity: 0.15 }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-700" 
          style={{ background: colors.purple, opacity: 0.1 }} />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
        {/* Logo Section */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => handleNavClick('#home')}>
          <div className="relative">
            <img 
              src="/logo.jpg" 
              alt="Peligram Intelligence Logo" 
              className="w-12 h-12 object-contain rounded-xl transition-all duration-300 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling;
                if (fallback) fallback.classList.remove('hidden');
              }}
            />
            <div className="hidden w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-sm"
              style={{
                background: `linear-gradient(135deg, ${colors.pink}, ${colors.teal}, ${colors.purple})`,
                boxShadow: `0 0 20px ${colors.pinkGlow}`,
              }}
            >
              <Sparkles size={18} />
            </div>
          </div>
          
          <span className="font-bold tracking-tight text-xl bg-gradient-to-r from-pink-400 via-teal-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
            Peligram
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="text-[11px] font-mono font-medium transition-all duration-300 uppercase tracking-wider hover:scale-105 relative group"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              {link.name}
              <span 
                className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                style={{ background: `linear-gradient(90deg, ${colors.pink}, ${colors.teal}, ${colors.purple})` }}
              />
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contact')}
            className="px-5 py-2 text-white text-[10px] font-black uppercase tracking-wider rounded-md transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden group"
            style={{
              background: `linear-gradient(135deg, ${colors.pink}, ${colors.teal}, ${colors.purple})`,
              backgroundSize: '200% 200%',
              boxShadow: `0 4px 15px ${colors.pinkGlow}`,
            }}
          >
            <span className="relative z-10">Join Protocol</span>
            <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </button>
        </div>

        {/* System Status */}
        <div className="hidden lg:flex items-center gap-3 border-l pl-5 backdrop-blur-sm" style={{ borderLeftColor: colors.glassBorder }}>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <div 
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: colors.teal, boxShadow: `0 0 8px ${colors.teal}` }}
            />
            <span className="text-[8px] font-mono uppercase tracking-wider" style={{ color: colors.teal }}>
              Gateway Active
            </span>
          </div>
          <Zap size={12} className="text-pink-400" />
          <span className="text-[8px] font-mono text-white/50">v3.0</span>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white/70 hover:text-white transition-all duration-300 backdrop-blur-sm p-2 rounded-lg bg-white/5"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pt-4 border-t overflow-hidden backdrop-blur-xl rounded-2xl"
            style={{ 
              borderTopColor: colors.glassBorder,
              background: `linear-gradient(135deg, ${colors.glassBg}, rgba(30, 15, 45, 0.9))`,
            }}
          >
            <div className="flex flex-col gap-3 pb-4 px-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-mono text-white/70 hover:text-white transition-all uppercase tracking-wider py-2 text-left hover:pl-2 hover:bg-white/5 rounded-lg px-3"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('#contact')}
                className="px-4 py-3 text-white text-center text-xs font-black uppercase tracking-wider rounded-lg transition-all duration-300 mt-2"
                style={{
                  background: `linear-gradient(135deg, ${colors.pink}, ${colors.teal}, ${colors.purple})`,
                  backgroundSize: '200% 200%',
                }}
              >
                Join Protocol
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;