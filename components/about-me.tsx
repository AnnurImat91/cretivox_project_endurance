"use client"

import { useEffect, useRef } from "react"
import { Globe } from "lucide-react"
import { Marquee } from "./marquee"

interface AboutMeProps {
  gsapLoaded: boolean
}

export const AboutMe = ({ gsapLoaded }: AboutMeProps) => {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!gsapLoaded || !containerRef.current) return

    const ctx = window.gsap?.context(() => {
      const words = document.querySelectorAll(".about-word")
      window.gsap?.from(words, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 100%",
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        stagger: 0.05,
      })
    }, containerRef)

    return () => ctx?.revert()
  }, [gsapLoaded])

  const bio =
    "I am a frontend developer who believes that a website should have soul. For me, technology is not just about smooth functionality, but also about a lively experience. That's why I always combine solid engineering logic with a bold artistic touch."

  return (
    <section ref={containerRef} className="pt-24 bg-[#111] text-(--color-background) relative overflow-hidden">
      <div className="absolute -right-20 top-20 opacity-10 rotate-12">
        <Globe size={400} />
      </div>

      <div className="px-6 md:px-20 max-w-6xl mx-auto">
        <h2 className="text-(--color-primary) font-mono mb-10 text-xl">// WHO AM I?</h2>
        <div className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
          {bio.split(" ").map((word, i) => (
            <span key={i} className="about-word inline-block mr-3">
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-30">
        <Marquee
          text="FRONTEND • ANIMATION • REACT • GSAP • NEXT.JS • CREATIVE "
          direction="left"
          speed={20}
        />
        <Marquee
          text="INTERACTIVE • DESIGN • UI/UX • PERFORMANCE • CODING "
          direction="right"
          speed={20}
        />
      </div>
    </section>
  )
}
