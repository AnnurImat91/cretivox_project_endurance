"use client"

import { useState, useEffect, useRef } from "react"
import { useGSAP } from "@/hooks/use-gsap"
import { Preloader } from "@/components/preloader"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { AboutMe } from "@/components/about-me"
import { ChaosGrid } from "@/components/chaos-grid"
import { Philosophy } from "@/components/philosophy"
import { ProjectList } from "@/components/project-list"
import { ApiTerminal } from "@/components/api-terminal"

export default function Home() {
  const gsapLoaded = useGSAP()
  const [booted, setBooted] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!booted || !cursorRef.current) return

    if (window.matchMedia("(pointer: coarse)").matches) return

    const handleMouseMove = (e: MouseEvent) => {
      if (window.gsap && cursorRef.current) {
        window.gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [booted])

  if (!booted) {
    return <Preloader onComplete={() => setBooted(true)} />
  }

  return (
    <div className="font-sans selection:bg-(--color-primary) selection:text-white bg-(--color-background)">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="hidden md:block fixed top-0 left-0 w-4 h-4 bg-(--color-primary) rounded-full pointer-events-none mix-blend-difference z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <Navigation />

      <main>
        <Hero gsapLoaded={gsapLoaded} />
        <AboutMe gsapLoaded={gsapLoaded} />
        <ChaosGrid gsapLoaded={gsapLoaded} />
        <Philosophy gsapLoaded={gsapLoaded} />
        <ProjectList />
        <ApiTerminal />
      </main>

      <footer className="bg-black text-(--color-background) py-12 px-6 text-center border-t border-gray-800">
        <p className="font-mono text-sm text-gray-500 mb-2">END OF TRANSMISSION</p>
        <h2
          className="text-[15vw] leading-none font-black text-[#fff] select-none"
          style={{ textShadow: "-1px -1px 0 #333, 1px -1px 0 #333, -1px 1px 0 #333, 1px 1px 0 #333" }}
        >
          CRETIVOX
        </h2>
      </footer>
    </div>
  )
}
