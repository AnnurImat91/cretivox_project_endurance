"use client"

import { useState, useEffect } from "react"

export const useGSAP = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve()
          return
        }
        const script = document.createElement("script")
        script.src = src
        script.async = true
        script.onload = () => resolve()
        script.onerror = () => reject(new Error(`Failed to load ${src}`))
        document.body.appendChild(script)
      })
    }

    Promise.all([
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"),
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"),
    ])
      .then(() => {
        try {
          if (window.gsap) {
            window.gsap.registerPlugin(window.ScrollTrigger)
            setLoaded(true)
          }
        } catch (e) {
          console.error("GSAP Load Error", e)
        }
      })
      .catch((e) => {
        console.error("Script loading error:", e)
      })
  }, [])

  return loaded
}
