"use client"

import { useEffect, useRef } from "react"
import { StaticImageData } from "next/image"
import Image from "next/image"
import CR from "../public/cretivox.png"
import ERR from "../public/error.png"
import LEG from "../public/legawa.png"
import API from "@/public/api.jpeg"


interface Project {
  id: string
  name: string
  cat: string
  image: StaticImageData
}

export const ProjectList = () => {
  const projects: Project[] = [
    { id: "01", name: "Cretivox Design", cat: "Web Design", image: CR },
    { id: "02", name: "Endurance Test", cat: "Development", image: ERR },
    { id: "03", name: "Legawa Branding", cat: "Identity", image: LEG },
    { id: "04", name: "API Communication", cat: "System", image: API },
  ]

  const previewRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (typeof window === "undefined" || !window.gsap) return

    previewRefs.current.forEach((preview, index) => {
      if (!preview) return

      const parentRow = preview.closest(".group") as HTMLDivElement
      if (!parentRow) return

      const handleMouseEnter = () => {
        window.gsap.to(preview, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        })
        window.gsap.to(preview, {
          rotation: 6,
          x: 20,
          duration: 0.6,
          ease: "power2.out",
        })
      }

      const handleMouseLeave = () => {
        window.gsap.to(preview, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        })
        window.gsap.to(preview, {
          rotation: 3,
          x: 0,
          duration: 0.3,
          ease: "power2.in",
        })
      }

      parentRow.addEventListener("mouseenter", handleMouseEnter)
      parentRow.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        parentRow.removeEventListener("mouseenter", handleMouseEnter)
        parentRow.removeEventListener("mouseleave", handleMouseLeave)
      }
    })
  }, [])

  return (
    <section className="py-24 bg-[#111] text-(--color-background)">
      <div className="px-6 md:px-20 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-3 h-3 bg-(--color-primary) rounded-full" />
          <h3 className="font-mono text-(--color-primary) uppercase tracking-widest">Selected Works</h3>
        </div>

        <div className="flex flex-col">
          {projects.map((p, index) => (
            <div
              key={p.id}
              className="group relative border-t border-gray-800 py-12 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors duration-300 px-4"
            >
              <div className="flex items-baseline gap-8 md:gap-20">
                <span className="font-mono text-gray-500 text-sm md:text-base">/{p.id}</span>
                <h4 className="text-3xl md:text-6xl font-black uppercase tracking-tight group-hover:text-(--color-primary) transition-colors group-hover:translate-x-4 duration-300">
                  {p.name}
                </h4>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs md:text-sm text-gray-500 block">{p.cat}</span>
                <div
                  ref={(el) => {
                    previewRefs.current[index] = el
                  }}
                  style={{ opacity: 0 }}
                  className="group-hover:block transition-opacity absolute right-20 top-1/2 -translate-y-1/2 w-64 h-40 bg-gray-800 rounded-lg overflow-hidden pointer-events-none hidden lg:block z-10 border border-(--color-primary) rotate-3"
                >
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <Image
                      src={p.image}
                      className="w-full h-full object-cover opacity-80"
                      alt={p.name}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-gray-800" />
        </div>
      </div>
    </section>
  )
}
