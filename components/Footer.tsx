'use client';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 md:px-12 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto text-center">
        <div className="text-[9px] font-mono text-blue-600 tracking-[0.5em] uppercase mb-3">
          Peligram Intelligence // Bukonzo West Gateway
        </div>
        <div className="h-[1px] w-12 bg-white/10 mx-auto mb-5" />
        <p className="text-[8px] font-mono text-gray-600 uppercase tracking-wider leading-relaxed">
          Architecting Sustainable Socio-Economic Transformation <br />
          © 2026 Engineering Human Agency. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;