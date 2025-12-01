"use client"

import { useEffect, useRef } from "react"
import { Play } from "lucide-react"

interface PhilosophyProps {
  gsapLoaded: boolean
}

export const Philosophy = ({ gsapLoaded }: PhilosophyProps) => {
  const triggerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gsapLoaded || !triggerRef.current || !sectionRef.current) return

    const ctx = window.gsap?.context(() => {
      const sections = window.gsap?.utils.toArray(".panel") || []

      if (sections.length > 0) {
        window.gsap?.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: "+=3000",
          },
        })
      }
    }, triggerRef)

    return () => ctx?.revert()
  }, [gsapLoaded])

  const technologies = ["React", "Next.js", "GSAP", "Tailwind", "Typescript", "RadixUI", "Vercel"]

  return (
    <section ref={triggerRef} className="overflow-hidden bg-(--color-background) text-(--color-foreground)">
      <div ref={sectionRef} className="flex w-[300vw] h-screen">
        {/* Panel 1 */}
        <div className="panel w-screen h-screen flex flex-col justify-center p-10 md:p-20 border-r border-black/10">
          <h2 className="text-7xl md:text-9xl font-black mb-6 text-(--color-foreground) tracking-tighter">
            CODE
            <br />
            <span className="text-(--color-primary)">&</span> FEELING
          </h2>
          <p className="text-xl md:text-3xl max-w-2xl font-medium leading-relaxed">
            It brings two worlds together. <br />
            Clean code meets raw emotion.
          </p>
        </div>

        {/* Panel 2 */}
        <div className="panel w-screen h-screen flex items-center justify-center p-10 md:p-20 bg-[#1a1a1a] text-(--color-background)">
          <div className="max-w-4xl">
            <div className="font-mono text-(--color-primary) mb-4 text-xl">THE STACK</div>
            <div className="flex flex-wrap gap-4">
              {technologies.map((tech) => (
                <div
                  key={tech}
                  className="px-8 py-4 border border-white/20 rounded-full text-2xl md:text-4xl font-bold hover:bg-(--color-primary) hover:border-(--color-primary) hover:text-black transition-all cursor-default"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 3 */}
        <div className="panel w-screen h-screen flex flex-col justify-center items-center p-10 md:p-20 bg-(--color-primary) text-black text-center">
          <Play className="w-24 h-24 mb-8 animate-pulse" fill="black" />
          <h2 className="text-[10vw] font-black leading-none">
            READY TO
            <br />
            DEPLOY
          </h2>
        </div>
      </div>
    </section>
  )
}
