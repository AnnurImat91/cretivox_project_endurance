"use client"

import { useEffect, useState } from "react"
import LegLogo from "@/public/Logo Legawa.png"

interface PreloaderProps {
  onComplete: () => void
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 800)
          return 100
        }
        return prev + Math.floor(Math.random() * 15) + 1
      })
    }, 150)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] z-[100] flex flex-col justify-between p-6 md:p-10 font-mono text-[#C2410C]">
      <div className="flex justify-between items-start">
        <div className="text-xs md:text-sm animate-pulse-custom">SYSTEM_BOOT_SEQUENCE_INIT</div>
      </div>

      <div className="flex justify-center items-center ">
        <img src={LegLogo.src} alt="Legawa" className="opacity-60 select-none tracking-tighter"/>
      </div>

      <div>
        <div className="w-full h-[2px] bg-gray-800 mb-4 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-[#C2410C] transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs md:text-sm uppercase tracking-widest font-bold">
          <span>Loading Assets...</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
      </div>
    </div>
  )
}
