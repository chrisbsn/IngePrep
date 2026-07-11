import { useEffect } from "react"
import { prefersReducedMotion } from "../utils/motion"

const DURATION = 750
const HEADER_OFFSET = 80

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function useSmoothAnchorScroll() {
  useEffect(() => {
    function handleClick(event) {
      const link = event.target.closest('a[href^="#"]')
      if (!link) return

      const hash = link.getAttribute("href")
      if (!hash || hash.length < 2) return

      const target = document.querySelector(hash)
      if (!target) return

      event.preventDefault()
      history.pushState(null, "", hash)

      const startY = window.scrollY
      const targetY = Math.max(0, target.getBoundingClientRect().top + startY - HEADER_OFFSET)

      if (prefersReducedMotion()) {
        window.scrollTo(0, targetY)
        return
      }

      const distance = targetY - startY
      const startTime = performance.now()

      function step(now) {
        const progress = Math.min((now - startTime) / DURATION, 1)
        window.scrollTo(0, startY + distance * easeInOutCubic(progress))
        if (progress < 1) requestAnimationFrame(step)
      }

      requestAnimationFrame(step)
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])
}
