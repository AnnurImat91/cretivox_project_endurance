"use client"

import { Star } from "lucide-react"

interface MarqueeProps {
  text: string
  direction?: "left" | "right"
  speed?: number
}

export const Marquee = ({ text, direction = "left", speed = 20 }: MarqueeProps) => {
  return (
    <div className="w-full overflow-hidden bg-(--color-primary) py-4 border-y border-black">
      <div
        className="whitespace-nowrap flex gap-8 text-black font-black text-2xl md:text-4xl uppercase tracking-tighter"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="flex items-center gap-4">
            {text} <Star fill="black" size={20} />
          </span>
        ))}
      </div>
    </div>
  )
}
