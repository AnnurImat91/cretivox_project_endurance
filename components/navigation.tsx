"use client"

import LegLogo from "@/public/Logo Legawa.png"
import CreLogo from "@/public/Logo Cretivox - Black.png";
import { Instagram, Github, Linkedin } from "lucide-react"

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40">
      <img src={CreLogo.src} alt="legawa" className="tracking-tighter w-1/8"/>
      <img src={LegLogo.src} alt="legawa" className="tracking-tighter w-1/12"/>
      <div className="flex gap-4">
        <a href="https://www.instagram.com/anndrctrnt" target="blank_" aria-label="GitHub" className="hover:text-(--color-chart-4) transition-colors cursor-pointer">
          <Instagram size={20} />
        </a>
        <a href="https://github.com/AnnurImat91" target="blank_" aria-label="GitHub" className="hover:text-(--color-muted) transition-colors cursor-pointer">
          <Github size={20} />
        </a>
        <a href="https://www.linkedin.com/in/imat-imansyah/" target="blank_" aria-label="LinkedIn" className="hover:text-(--color-chart-1) transition-colors cursor-pointer">
          <Linkedin size={20} />
        </a>
      </div>
    </nav>
  )
}
