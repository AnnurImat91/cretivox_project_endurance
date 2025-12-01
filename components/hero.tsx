"use client"

import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"

interface HeroProps {
  gsapLoaded: boolean
}

export const Hero = ({ gsapLoaded }: HeroProps) => {
  const containerRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gsapLoaded || !containerRef.current || !textRef.current) return

    const ctx = window.gsap?.context(() => {
      window.gsap?.to(textRef.current, {
        y: 200,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, containerRef)

    return () => ctx?.revert()
  }, [gsapLoaded])

  return (
    <section
      ref={containerRef}
      className="h-screen flex flex-col justify-center px-6 md:px-20 bg-(--color-background) text-(--color-foreground) overflow-hidden relative border-b border-black"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#ccc_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

      <div ref={textRef} className="z-10 relative mt-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-[2px] bg-(--color-primary)" />
          <p className="font-mono text-sm md:text-base text-(--color-primary) tracking-widest uppercase font-bold">
            // Frontend Developer & Creative Coder
          </p>
        </div>

        <h1 className="text-[8vw] leading-[0.85] font-black tracking-tighter uppercase mix-blend-darken ">
          Imat
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--color-foreground) to-(--color-primary)">
            Imansyah
          </span>
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-end mt-12 border-t border-black pt-6">
          <p className="font-mono text-sm max-w-xs leading-relaxed">
            Building creative and interactive web experiences. Not just coding, but with heart.
          </p>
          <div className="animate-bounce mt-8 md:mt-0">
            <ArrowRight className="rotate-90 text-(--color-primary)" size={32} />
          </div>
        </div>
      </div>
    </section>
  )
}
