"use client"

import { useEffect, useRef } from "react"
import { Zap, Triangle, Hexagon, MoveUpRight, Aperture, Layers, type LucideIcon } from "lucide-react"
import P1 from "@/public/projects/p1.jpeg"
import P2 from "@/public/projects/p2.jpeg"
import P3 from "@/public/projects/p3.jpeg"
import P4 from "@/public/projects/p4.jpeg"
import P5 from "@/public/projects/p5.jpeg"
import P6 from "@/public/projects/p6.jpeg"
import P7 from "@/public/projects/p7.jpeg"

interface ChaosGridProps {
  gsapLoaded: boolean
}

interface MediaCardProps {
  type: "image" | "text"
  color: string
  icon?: LucideIcon
  text: string
}

const MediaCard = ({ type, color, icon: Icon, text }: MediaCardProps) => (
  <div
    className={`w-full aspect-[4/5] ${color} rounded-xl overflow-hidden relative group mb-6 flex items-center justify-center border border-black/10`}
  >
    {type === "image" ? (
      <img
        src={`https://images.unsplash.com/photo-${text}?auto=format&fit=crop&w=500&q=80`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
        alt="Portfolio media"
      />
    ) : (
      <div className="flex flex-col items-center p-6 text-center">
        {Icon && <Icon size={48} className="mb-4 text-[#1a1a1a]" />}
        <span className="font-black text-2xl uppercase italic text-[#1a1a1a]">{text}</span>
      </div>
    )}
    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-300" />
  </div>
)

export const ChaosGrid = ({ gsapLoaded }: ChaosGridProps) => {
  const containerRef = useRef<HTMLElement>(null)
  const col1Ref = useRef<HTMLDivElement>(null)
  const col2Ref = useRef<HTMLDivElement>(null)
  const col3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gsapLoaded || !containerRef.current) return

    const ctx = window.gsap?.context(() => {
      window.gsap?.to(col1Ref.current, {
        y: -100,
        scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      })
      window.gsap?.to(col2Ref.current, {
        y: 100,
        scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
      })
      window.gsap?.to(col3Ref.current, {
        y: -150,
        scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
      })
    }, containerRef)

    return () => ctx?.revert()
  }, [gsapLoaded])

  return (
    <section ref={containerRef} className="py-24 bg-(--color-background) overflow-hidden">
      <div className="px-6 md:px-20 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-6xl md:text-8xl font-black text-(--color-foreground) tracking-tighter">
            THE
            <br />
            PROJECTS
          </h2>
        </div>
        <div className="hidden md:block text-right">
          <p className="font-mono text-sm text-(--color-primary)">CHAOS IS CREATIVITY</p>
          <p className="font-mono text-sm text-gray-500">SCROLL TO EXPLORE</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 md:gap-8 px-4 md:px-8 max-w-7xl mx-auto h-[60vh] overflow-hidden relative">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-(--color-background) via-transparent to-(--color-background) pointer-events-none" />

        <div ref={col1Ref} className="-translate-y-20">
          <img src={P1.src} alt="" className="my-8 rounded-2xl"/>
          <img src={P5.src} alt="" className="my-8 rounded-2xl"/>
          <img src={P3.src} alt="" className="my-8 rounded-2xl"/>
        </div>

        <div ref={col2Ref} className="translate-y-20">
          <img src={P3.src} alt="" className="my-8 rounded-2xl"/>
          <img src={P6.src} alt="" className="my-8 rounded-2xl"/>
          <img src={P2.src} alt="" className="my-8 rounded-2xl"/>
        </div>

        <div ref={col3Ref} className="-translate-y-20">
          <img src={P7.src} alt="" className="my-8 rounded-2xl"/>
          <img src={P4.src} alt="" className="my-8 rounded-2xl"/>
          <img src={P2.src} alt="" className="my-8 rounded-2xl"/>
        </div>
      </div>
    </section>
  )
}
