"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface EntryPageProps {
  onUnlock: () => void;
}

const PALETTE = [
  '#ff006e','#ff4d00','#ff9500','#ffe100',
  '#7fff00','#00ffb3','#00e5ff','#0080ff',
  '#7b00ff','#d400ff','#ff00c8','#ff0057',
];

const WORD_COLORS = [
  '#ff6eb4','#ffb347','#7fff99','#87cefa',
  '#dda0ff','#ff8c69','#40e0d0','#ffef61',
  '#b0e0e6','#ffaacc','#ff6655','#aaffdd',
];

const STATEMENTS = [
  "Peligram Intelligence......",
  "Join the movement to eradicate drug abuse.",
  "Stand against early marriages.",
  "Fight unemployment in our community.",
  "Access cutting-edge technology at the Logic Lab.",
  "Rewrite your future through code.",
  "Become a digital export from Bukonzo West.",
];

const GRID = 42;

function hexToRgb(hex: string) {
  return {
    r: parseInt(hex.slice(1,3),16),
    g: parseInt(hex.slice(3,5),16),
    b: parseInt(hex.slice(5,7),16),
  };
}

const EntryPage: React.FC<EntryPageProps> = ({ onUnlock }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const frameRef = useRef<number>(0);
  const tRef = useRef(0);
  const pulsesRef = useRef<any[]>([]);
  const nodesRef = useRef<any[]>([]);
  const edgesRef = useRef<any[]>([]);

  const [mounted, setMounted] = useState(false);
  const [stmtIdx, setStmtIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const [btnColor, setBtnColor] = useState(PALETTE[0]);

  const phaseRef = useRef<'typing'|'deleting'>('typing');
  const charRef = useRef(0);
  const stmtRef = useRef(0);
  const twTimerRef = useRef<ReturnType<typeof setTimeout>|null>(null);

  // Build circuit grid
  const buildGrid = useCallback((W: number, H: number) => {
    const cols = Math.ceil(W / GRID) + 2;
    const rows = Math.ceil(H / GRID) + 2;
    const nodes: any[] = [];
    const edges: any[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * GRID - GRID / 2 + (r % 2) * GRID * 0.5;
        const y = r * GRID - GRID / 2;
        nodes.push({ x, y, r, c, bright: 0, base: Math.random() });
      }
    }
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const right = nodes.find(m => m.r === n.r && m.c === n.c + 1);
      const down  = nodes.find(m => m.r === n.r + 1 && m.c === n.c);
      const diag  = nodes.find(m => m.r === n.r + 1 && m.c === n.c + (n.r % 2 ? 1 : 0) - 1);
      if (right) edges.push({ a: n, b: right, flow: 0 });
      if (down)  edges.push({ a: n, b: down,  flow: 0 });
      if (diag && Math.random() > 0.55) edges.push({ a: n, b: diag, flow: 0 });
    }
    nodesRef.current = nodes;
    edgesRef.current = edges;
  }, []);

  const spawnPulse = useCallback((fromCursor: boolean) => {
    const edges = edgesRef.current;
    if (pulsesRef.current.length > 40 || !edges.length) return;
    const ci = Math.floor(Math.random() * PALETTE.length);
    let startEdge = Math.floor(Math.random() * edges.length);
    if (fromCursor) {
      let best = Infinity;
      edges.forEach((e, i) => {
        const mx = (e.a.x + e.b.x) / 2, my = (e.a.y + e.b.y) / 2;
        const d = (mx - mouseRef.current.x) ** 2 + (my - mouseRef.current.y) ** 2;
        if (d < best) { best = d; startEdge = i; }
      });
    }
    pulsesRef.current.push({ 
      edge: startEdge, 
      pos: 0, 
      colorIdx: ci, 
      speed: 0.018 + Math.random() * 0.018, 
      life: 1,
      visitedEdges: new Set<number>() // Track visited edges to prevent loops
    });
  }, []);

  // Canvas draw loop
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d')!;
    let W = container.offsetWidth, H = container.offsetHeight;
    canvas.width = W; canvas.height = H;
    buildGrid(W, H);

    const onResize = () => {
      W = container.offsetWidth; H = container.offsetHeight;
      canvas.width = W; canvas.height = H;
      buildGrid(W, H);
    };
    window.addEventListener('resize', onResize);

    for (let i = 0; i < 14; i++) setTimeout(() => spawnPulse(false), i * 100);

    function frame() {
      frameRef.current = requestAnimationFrame(frame);
      const t = ++tRef.current;
      ctx.clearRect(0, 0, W, H);

      // Background gradient
      const bg = ctx.createRadialGradient(W*.5,H*.5,0,W*.5,H*.5,Math.max(W,H)*.8);
      bg.addColorStop(0, '#0a001a'); bg.addColorStop(.4, '#000b14');
      bg.addColorStop(.75, '#020012'); bg.addColorStop(1, '#000000');
      ctx.fillStyle = bg; ctx.fillRect(0,0,W,H);

      // Node brightness
      const nodes = nodesRef.current;
      const edges = edgesRef.current;
      nodes.forEach(n => {
        const d = Math.hypot(n.x - mouseRef.current.x, n.y - mouseRef.current.y);
        const prox = Math.max(0, 1 - d / 180);
        n.bright = Math.max(n.bright * 0.88, prox * 0.9 + Math.sin(t * 0.03 + n.base * 6) * 0.05);
      });

      // Update pulses - FIXED: proper edge transition without infinite loop
      pulsesRef.current = pulsesRef.current.filter(p => {
        p.pos += p.speed;
        if (p.pos > 1) {
          const e = edges[p.edge];
          if (!e) return false;
          
          // Find connected edges (excluding the current one and already visited)
          const connectedEdges = edges.filter((e2, i) => {
            if (i === p.edge) return false;
            if (p.visitedEdges.has(i)) return false;
            return (e2.a === e.b || e2.b === e.b);
          });
          
          if (connectedEdges.length) {
            // Choose a random next edge
            const nextEdge = connectedEdges[Math.floor(Math.random() * connectedEdges.length)];
            const nextEdgeIndex = edges.indexOf(nextEdge);
            p.edge = nextEdgeIndex;
            p.pos = 0;
            p.life -= 0.08;
            p.visitedEdges.add(nextEdgeIndex);
          } else {
            // Dead end - pulse dies
            return false;
          }
        }
        return p.life > 0;
      });

      // Draw edges
      edges.forEach(e => {
        const b = (e.a.bright + e.b.bright) * 0.5;
        ctx.strokeStyle = `rgba(255,255,255,${0.04 + b * 0.22})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(e.a.x, e.a.y); ctx.lineTo(e.b.x, e.b.y); ctx.stroke();
      });

      // Draw pulses
      pulsesRef.current.forEach(p => {
        const e = edges[p.edge];
        if (!e) return;
        const px = e.a.x + (e.b.x - e.a.x) * p.pos;
        const py = e.a.y + (e.b.y - e.a.y) * p.pos;
        const col = PALETTE[p.colorIdx];
        const { r, g, b } = hexToRgb(col);
        const tail = 0.18;
        ctx.strokeStyle = `rgba(${r},${g},${b},${p.life * 0.7})`;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(e.a.x+(e.b.x-e.a.x)*Math.max(0,p.pos-tail), e.a.y+(e.b.y-e.a.y)*Math.max(0,p.pos-tail));
        ctx.lineTo(px, py); ctx.stroke();
        const grd = ctx.createRadialGradient(px,py,0,px,py,12);
        grd.addColorStop(0, `rgba(${r},${g},${b},${p.life * 0.9})`);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(px,py,10,0,Math.PI*2); ctx.fill();
      });

      // Draw nodes
      nodes.forEach(n => {
        if (n.bright < 0.04) return;
        const ci = Math.floor((n.base * PALETTE.length + t * 0.008) % PALETTE.length);
        const { r, g, b } = hexToRgb(PALETTE[Math.abs(ci) % PALETTE.length]);
        const grd = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,6);
        grd.addColorStop(0, `rgba(${r},${g},${b},${n.bright})`);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(n.x,n.y,6,0,Math.PI*2); ctx.fill();
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, n.bright * 2)})`;
        ctx.beginPath(); ctx.arc(n.x,n.y,1.8,0,Math.PI*2); ctx.fill();
      });

      // Mouse glow
      const ci = Math.abs(Math.floor(t * 0.025 % PALETTE.length));
      const { r, g, b } = hexToRgb(PALETTE[ci]);
      const mg = ctx.createRadialGradient(mouseRef.current.x,mouseRef.current.y,0,mouseRef.current.x,mouseRef.current.y,160);
      mg.addColorStop(0, `rgba(${r},${g},${b},.12)`);
      mg.addColorStop(.5, `rgba(${r},${g},${b},.04)`);
      mg.addColorStop(1, 'transparent');
      ctx.fillStyle = mg; ctx.fillRect(0,0,W,H);

      if (t % 4 === 0) spawnPulse(true);
      if (t % 60 === 0) spawnPulse(false);
    }

    frameRef.current = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [mounted, buildGrid, spawnPulse]);

  // Typewriter
  useEffect(() => {
    if (!mounted) return;
    function tick() {
      if (twTimerRef.current) clearTimeout(twTimerRef.current);
      const stmt = STATEMENTS[stmtRef.current];
      if (phaseRef.current === 'typing') {
        if (charRef.current < stmt.length) {
          charRef.current++;
          setCharCount(charRef.current);
          twTimerRef.current = setTimeout(tick, 62);
        } else {
          twTimerRef.current = setTimeout(() => { phaseRef.current = 'deleting'; tick(); }, 2600);
        }
      } else {
        if (charRef.current > 0) {
          charRef.current--;
          setCharCount(charRef.current);
          twTimerRef.current = setTimeout(tick, 34);
        } else {
          stmtRef.current = (stmtRef.current + 1) % STATEMENTS.length;
          setStmtIdx(stmtRef.current);
          phaseRef.current = 'typing';
          twTimerRef.current = setTimeout(tick, 220);
        }
      }
    }
    tick();
    return () => { if (twTimerRef.current) clearTimeout(twTimerRef.current); };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => setShowCursor(p => !p), 500);
    return () => clearInterval(interval);
  }, [mounted]);

  // Cycling button color
  useEffect(() => {
    if (!mounted) return;
    let i = 0;
    const interval = setInterval(() => { i = (i + 1) % PALETTE.length; setBtnColor(PALETTE[i]); }, 500);
    return () => clearInterval(interval);
  }, [mounted]);

  useEffect(() => { setMounted(true); }, []);

  function renderColoredWords() {
    const stmt = STATEMENTS[stmtIdx];
    const visible = stmt.slice(0, charCount);
    const parts = [...visible.matchAll(/\S+|\s+/g)];
    let wi = 0;
    return parts.map((m, i) => {
      if (/\S/.test(m[0])) {
        const color = WORD_COLORS[wi % WORD_COLORS.length]; wi++;
        return <span key={i} style={{ color, textShadow: `0 0 14px ${color}88` }}>{m[0]}</span>;
      }
      return <span key={i} style={{ color: 'rgba(255,255,255,.6)' }}>{m[0]}</span>;
    });
  }

  if (!mounted) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  );

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-hidden cursor-none"
      style={{ background: '#000' }}
      onMouseMove={e => {
        const rect = containerRef.current!.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Custom cursor */}
      <div className="absolute pointer-events-none z-30" style={{ left: cursorPos.x, top: cursorPos.y }}>
        <div style={{ position:'absolute', width:8, height:8, borderRadius:'50%', border:'1.5px solid #fff', transform:'translate(-50%,-50%)' }} />
        <div style={{ position:'absolute', width:28, height:28, borderRadius:'50%', border:'1px solid rgba(255,255,255,.4)', transform:'translate(-50%,-50%)', transition:'width .12s,height .12s' }} />
        <div style={{ position:'absolute', width:56, height:56, borderRadius:'50%', border:`1px solid ${btnColor}44`, transform:'translate(-50%,-50%)', transition:'all .18s' }} />
      </div>

      {/* Badge */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20" style={{ fontFamily:'Courier New,monospace', fontSize:9, letterSpacing:'.3em', color:'rgba(255,255,255,.28)', textTransform:'uppercase' }}>
        Mpondwe — Bukonzo West
      </div>

      {/* Center content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', alignItems:'center', gap:'.22em', fontSize:'clamp(16px,3.2vw,32px)', fontWeight:300, letterSpacing:'.06em', lineHeight:1.5, fontFamily:'Courier New,monospace', textAlign:'center', padding:'0 1.5rem', minHeight:'2em' }}>
          {renderColoredWords()}
          <span style={{ display:'inline-block', width:2, height:'1.1em', background:'#fff', marginLeft:3, verticalAlign:'middle', opacity: showCursor ? 1 : 0, transition:'opacity .1s', boxShadow:'0 0 8px rgba(255,255,255,.5)' }} />
        </div>

        {/* Progress dots */}
        <div style={{ display:'flex', gap:6, marginTop:'1.2rem' }}>
          {STATEMENTS.map((_, i) => (
            <div key={i} style={{ height:2, borderRadius:1, background: i===stmtIdx ? '#fff' : i<stmtIdx ? 'rgba(255,255,255,.38)' : 'rgba(255,255,255,.15)', width: i===stmtIdx ? 32 : 18, transition:'all .4s' }} />
          ))}
        </div>

        {/* Enter button */}
        <button
          onClick={onUnlock}
          style={{ marginTop:'2rem', padding:'.8rem 2.4rem', background:'rgba(255,255,255,.06)', border:`1px solid ${btnColor}66`, color:'#fff', fontFamily:'Courier New,monospace', fontSize:11, fontWeight:700, letterSpacing:'.28em', textTransform:'uppercase', borderRadius:50, cursor:'none', position:'relative', overflow:'hidden', transition:'transform .35s,box-shadow .35s', boxShadow:`0 0 24px ${btnColor}33` }}
          onMouseEnter={e => { (e.target as HTMLElement).style.transform='scale(1.06)'; (e.target as HTMLElement).style.boxShadow=`0 0 40px ${btnColor}66`; }}
          onMouseLeave={e => { (e.target as HTMLElement).style.transform='scale(1)'; (e.target as HTMLElement).style.boxShadow=`0 0 24px ${btnColor}33`; }}
        >
          unlock
        </button>
      </div>

      {/* Tagline */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20" style={{ fontFamily:'Courier New,monospace', fontSize:9, letterSpacing:'.2em', color:'rgba(255,255,255,.18)', textTransform:'uppercase', whiteSpace:'nowrap' }}>
        Logic Lab · Digital Futures · Bukonzo West
      </div>
    </motion.div>
  );
};

export default EntryPage;