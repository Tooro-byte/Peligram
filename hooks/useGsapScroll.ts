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
    // 1. Fade up animations - Added check
    const fadeElements = gsap.utils.toArray('.gsap-fade-up');
    if (fadeElements.length > 0) {
      fadeElements.forEach((element) => {
        gsap.fromTo(element as Element,
          { y: 60, opacity: 0, rotationX: 15 },
          {
            y: 0, opacity: 1, rotationX: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element as Element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }

    // 2. Stagger children - Added child existence check
    const staggerContainers = gsap.utils.toArray('.gsap-stagger');
    staggerContainers.forEach((container) => {
      const children = (container as Element).children;
      if (children.length > 0) {
        gsap.fromTo(children,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(0.6)',
            scrollTrigger: {
              trigger: container as Element,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    // 3. Scale on scroll - Added check
    const scaleElements = gsap.utils.toArray('.gsap-scale');
    if (scaleElements.length > 0) {
      scaleElements.forEach((element) => {
        gsap.fromTo(element as Element,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1, opacity: 1,
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
    }

    // 4. Parallax effect - Added target existence check
    const parallaxTarget = document.querySelector('.parallax-bg');
    const homeTrigger = document.querySelector('#home');
    if (parallaxTarget && homeTrigger) {
      gsap.to(parallaxTarget, {
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: homeTrigger,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // 5. Horizontal line grow - Added check
    const lines = gsap.utils.toArray('.line-grow');
    if (lines.length > 0) {
      lines.forEach((line) => {
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
    }
  }, { scope: containerRef });

  return containerRef;
};