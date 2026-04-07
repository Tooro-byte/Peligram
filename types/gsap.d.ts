// types/gsap.d.ts
import 'gsap';

declare module 'gsap' {
  interface GSAPTimeline {
    scrollTrigger?: ScrollTrigger;
  }
  
  interface GSAPAnimation {
    scrollTrigger?: ScrollTrigger;
  }
}

export {};