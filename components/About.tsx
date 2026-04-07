'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Stars, Cloud, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import Image from 'next/image';

type Challenge = {
  title: string;
  desc: string;
};

const challenges: Challenge[] = [
  { title: "Border Transit Dynamics", desc: "Mpondwe-Lhubiriha's unique position creates both challenges and opportunities for youth engagement." },
  { title: "The Dopamine Hijack", desc: "Replacing substance abuse rewards with constructive logic and coding" },
  { title: "Systemic Exclusion", desc: "80% of children with disabilities remain out of school in Kasese District." }
];

// Twinkling Magic Dust
function MagicDust() {
  const dustCount = 800;
  const dustRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (dustRef.current) {
      const time = state.clock.elapsedTime;
      const positions = dustRef.current.geometry.attributes.position.array;
      for (let i = 0; i < dustCount; i++) {
        // Gentle floating animation
        positions[i * 3 + 1] += 0.002;
        if (positions[i * 3 + 1] > 20) {
          positions[i * 3 + 1] = -15;
          positions[i * 3] = (Math.random() - 0.5) * 40;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 20;
        }
      }
      dustRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Twinkling effect
      const material = dustRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.5 + Math.sin(time * 3) * 0.2;
    }
  });

  const positions = React.useMemo(() => {
    const pos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 45;
      pos[i * 3 + 1] = Math.random() * 35 - 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 45 - 20;
    }
    return pos;
  }, []);

  const geometry = React.useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, []);

  return (
    <points ref={dustRef} geometry={geometry}>
      <pointsMaterial color="#ffd700" size={0.05} transparent opacity={0.6} />
    </points>
  );
}

// Floating Dream Clouds
function DreamClouds() {
  const cloudGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cloudGroup.current) {
      const time = state.clock.elapsedTime;
      cloudGroup.current.children.forEach((cloud, i) => {
        cloud.position.x += Math.sin(time * 0.2 + i) * 0.002;
        cloud.position.z += Math.cos(time * 0.15 + i) * 0.002;
      });
    }
  });

  return (
    <group ref={cloudGroup}>
      <Cloud position={[-12, 12, -25]} opacity={0.3} speed={0.2} />
      <Cloud position={[8, 15, -30]} opacity={0.25} speed={0.15} />
      <Cloud position={[0, 18, -35]} opacity={0.2} speed={0.3} />
      <Cloud position={[-5, 8, -20]} opacity={0.35} speed={0.1} />
      <Cloud position={[15, 10, -28]} opacity={0.28} speed={0.25} />
    </group>
  );
}

// Aurora Borealis Effect
function AuroraBorealis() {
  const auroraRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (auroraRef.current) {
      const time = state.clock.elapsedTime;
      const material = auroraRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = time;
      }
    }
  });

  // Custom shader for aurora effect
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_PointSize = 1.0;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float time;
    varying vec2 vUv;
    void main() {
      vec3 color1 = vec3(0.0, 0.8, 1.0);
      vec3 color2 = vec3(0.5, 0.0, 1.0);
      vec3 color3 = vec3(0.0, 1.0, 0.5);
      float t = time * 0.5;
      float pattern = sin(vUv.x * 20.0 + t) * cos(vUv.y * 15.0 - t);
      vec3 color = mix(color1, color2, pattern);
      color = mix(color, color3, sin(vUv.y * 10.0 + t));
      gl_FragColor = vec4(color, 0.15);
    }
  `;

  return (
    <mesh ref={auroraRef} position={[0, 20, -40]} rotation={[0.3, 0, 0]}>
      <planeGeometry args={[60, 30]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ time: { value: 0 } }}
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Shooting Stars
function ShootingStars() {
  const starsCount = 30;
  const starsRef = useRef<THREE.Group>(null);
  const starStates = useRef(
    Array.from({ length: starsCount }, () => ({
      active: false,
      progress: 0,
      x: 0,
      y: 0,
      speed: 0
    }))
  );

  useFrame(() => {
    // Randomly activate shooting stars
    if (Math.random() < 0.02) {
      const inactiveStar = starStates.current.find(s => !s.active);
      if (inactiveStar) {
        inactiveStar.active = true;
        inactiveStar.progress = 0;
        inactiveStar.x = (Math.random() - 0.5) * 50;
        inactiveStar.y = 20 + Math.random() * 15;
        inactiveStar.speed = 0.02 + Math.random() * 0.03;
      }
    }

    // Update active shooting stars
    starStates.current.forEach((star) => {
      if (star.active) {
        star.progress += star.speed;
        if (star.progress >= 1) {
          star.active = false;
        }
      }
    });
  });

  return (
    <group ref={starsRef}>
      {starStates.current.map((star, i) => (
        star.active && (
          <mesh key={i} position={[star.x, star.y - star.progress * 30, -20]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffdd88" emissiveIntensity={1} />
            <mesh position={[0, -0.3, 0]}>
              <coneGeometry args={[0.04, 0.8, 6]} />
              <meshStandardMaterial color="#ffaa44" emissive="#ff6600" emissiveIntensity={0.8} />
            </mesh>
          </mesh>
        )
      ))}
    </group>
  );
}

// Colorful Ambient Lights (replacing orbs)
function ColorfulAmbience() {
  const lightGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (lightGroup.current) {
      const time = state.clock.elapsedTime;
      lightGroup.current.children.forEach((light, i) => {
        if (light instanceof THREE.Light) {
          // Gentle intensity pulsing
          const intensity = 0.8 + Math.sin(time * 1.5 + i) * 0.3;
          light.intensity = intensity;
        }
      });
    }
  });

  const colors = [
    '#ff6b9d', '#ffb347', '#6b5bff', '#00d4ff', '#ff6b35', 
    '#c44aff', '#00ff88', '#ffd700', '#ff44cc', '#44ffaa', 
    '#ff8844', '#aa44ff'
  ];

  const positions = [
    [-15, 5, -15], [18, -3, -18], [-12, -8, -12], [14, 10, -20],
    [-8, 12, -14], [20, -5, -16], [-18, -2, -19], [10, 15, -22],
    [-5, 8, -13], [22, 0, -17], [-20, 6, -21], [16, -10, -15]
  ];

  return (
    <group ref={lightGroup}>
      {Array.from({ length: 12 }).map((_, i) => (
        <pointLight 
          key={i}
          position={positions[i] as [number, number, number]}
          color={colors[i]}
          intensity={0.8}
          distance={25}
          decay={1.5}
        />
      ))}
    </group>
  );
}

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glowX = useTransform(mouseX, [0, dimensions.width], [-400, 400]);
  const glowY = useTransform(mouseY, [0, dimensions.height], [-400, 400]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  useEffect(() => {
    setMounted(true);
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (!mounted) return <div className="h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900" />;

  return (
    <section 
      id="about" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 px-6 md:px-12 overflow-hidden min-h-screen"
    >
      {/* Utopian Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
          {/* Dreamy gradient background */}
          <color attach="background" args={['#0a0a2e']} />
          
          {/* Ambient magical lighting */}
          <ambientLight intensity={0.4} color="#2a1a4e" />
          
          {/* Fog */}
          <fogExp2 attach="fog" args={['#0a0a2e', 0.008]} />
          
          {/* Colorful Ambient Lights (replaces floating orbs) */}
          <ColorfulAmbience />
          
          {/* Aurora Borealis */}
          <AuroraBorealis />
          
          {/* Dream Clouds */}
          <DreamClouds />
          
          {/* Magic Dust Particles */}
          <MagicDust />
          
          {/* Shooting Stars */}
          <ShootingStars />
          
          {/* Twinkling Stars Background */}
          <Stars 
            radius={300} 
            depth={100} 
            count={3000} 
            factor={5} 
            saturation={0.8} 
            fade 
            speed={0.5} 
          />
          
          {/* Sparkles effect */}
          <Sparkles count={100} scale={30} size={0.3} speed={0.4} color="#ff88ff" />
          <Sparkles count={80} scale={25} size={0.2} speed={0.6} color="#88ff88" />
          <Sparkles count={120} scale={35} size={0.25} speed={0.3} color="#8888ff" />

          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Multi-color cursor glow */}
      <motion.div
        className="absolute pointer-events-none w-[1200px] h-[1200px] bg-gradient-radial from-indigo-500/20 via-purple-500/15 via-cyan-500/10 via-emerald-500/5 to-transparent rounded-full opacity-60 blur-[120px] z-10"
        style={{ x: glowX, y: glowY, left: "50%", top: "42%" }}
      />

      {/* Rainbow overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 via-purple-600/5 to-cyan-600/5 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Photo Frame with magical border */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[520px]">
              {/* Animated rainbow border glow */}
              <div className="absolute -inset-12 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 opacity-40 blur-3xl rounded-[3.5rem] animate-pulse" />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 1.2 }}
                className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black/60 backdrop-blur-sm"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/drug.webp"
                    alt="Mpondwe Community Vision"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-blue-900/30" />
                </div>

                {/* Floating Animals */}
                <motion.div
                  animate={{ 
                    y: [0, -28, 0], 
                    rotateX: [0, 18, 0], 
                    rotateY: [0, 25, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 6.5, repeat: Infinity }}
                  className="absolute -top-12 -right-10 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-2xl rounded-3xl border border-cyan-400/40 flex items-center justify-center text-6xl shadow-2xl"
                >
                  🦒
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [0, 34, 0], 
                    rotateX: [0, -16, 0], 
                    rotateY: [0, -30, 0],
                    scale: [1, 1.08, 1]
                  }}
                  transition={{ duration: 7.8, repeat: Infinity, delay: 1.6 }}
                  className="absolute -bottom-10 -left-14 w-28 h-28 bg-gradient-to-tr from-orange-500/20 to-pink-500/20 backdrop-blur-2xl rounded-3xl border border-orange-400/40 flex items-center justify-center text-6xl shadow-2xl"
                >
                  🐆
                </motion.div>

                {/* Glowing runes around frame */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                      style={{
                        top: i === 0 ? '-8px' : i === 4 ? 'auto' : '50%',
                        bottom: i === 4 ? '-8px' : 'auto',
                        left: i === 2 ? '-8px' : i === 6 ? 'auto' : '50%',
                        right: i === 6 ? '-8px' : 'auto',
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl border border-cyan-400/50 px-8 py-3 rounded-full text-xs font-mono tracking-[3px] text-cyan-300 shadow-lg">
                Drug Addict
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-none tracking-tighter mt-4">
                Addressing The<br />
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 via-pink-300 to-amber-300 bg-clip-text text-transparent">
                  "Unreachable Nodes"
                </span>
              </h2>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed max-w-lg backdrop-blur-sm bg-white/5 p-4 rounded-2xl">
              A substantial connectivity gap persists that excludes drug addicts, school dropouts, 
              single mothers, and persons with disabilities from the digital renaissance unfolding 
              across our region.
            </p>

            <div className="space-y-6 pt-8">
              {challenges.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ x: 12, scale: 1.02 }}
                  className="group p-7 bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 rounded-3xl transition-all duration-500 shadow-lg"
                >
                  <div className="flex gap-5">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0 shadow-lg">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-purple-300 group-hover:bg-clip-text transition-all">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 mt-3 text-[15px] leading-relaxed group-hover:text-gray-300 transition-colors">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
};

export default About;