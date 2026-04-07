'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

// Register ScrollTrigger plugin only on client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGsapScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Fade up animations for all sections
    gsap.utils.toArray('.gsap-fade-up').forEach((element) => {
      gsap.fromTo(element as Element,
        {
          y: 60,
          opacity: 0,
          rotationX: 15,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element as Element,
            start: 'top 85%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Stagger children animations - FIXED VERSION
    gsap.utils.toArray('.gsap-stagger').forEach((container) => {
      const staggerContainer = container as Element;
      const children = staggerContainer.children;
      
      gsap.fromTo(children,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(0.6)',
          scrollTrigger: {
            trigger: staggerContainer,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Scale on scroll for cards
    gsap.utils.toArray('.gsap-scale').forEach((element) => {
      gsap.fromTo(element as Element,
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: element as Element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Parallax effect on hero
    gsap.to('.parallax-bg', {
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Horizontal line grow
    gsap.utils.toArray('.line-grow').forEach((line) => {
      gsap.fromTo(line as Element,
        { width: '0%' },
        {
          width: '100%',
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: line as Element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, { scope: containerRef });

  return containerRef;
};