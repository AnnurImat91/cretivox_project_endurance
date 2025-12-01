// Color palette and design constants
export const COLORS = {
  accent: "#C2410C",
  primary: "#1a1a1a",
  background: "#F5F5F0",
  dark: "#0a0a0a",
  black: "#000",
  white: "#fff",
  gray: {
    50: "#F5F5F0",
    100: "#F5F5F5",
    400: "#666",
    500: "#555",
    700: "#444",
    800: "#222",
  },
} as const

// GSAP animation configuration
export const GSAP_CONFIG = {
  scrollTrigger: {
    parallax: {
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
    horizontalScroll: {
      scrub: 1,
      snap: true,
    },
  },
  cursor: {
    duration: 0.1,
    ease: "power2.out",
  },
} as const

// Animation durations
export const DURATIONS = {
  preloaderInterval: 100,
  apiTerminalDelay: 2000,
  transitionDefault: 300,
} as const

export const ENDPOINTS = {
  scriptCdnGSAP: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js",
  scriptCdnScrollTrigger: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js",
} as const
