import { useEffect, useState } from "react"
import { prefersReducedMotion } from "../utils/motion"

export function useTypewriter(text, { speed = 18, start = true, startDelay = 0 } = {}) {
  const [output, setOutput] = useState(() => (prefersReducedMotion() ? text : ""))

  useEffect(() => {
    if (prefersReducedMotion()) {
      setOutput(text)
      return
    }

    if (!start) return

    let index = 0
    let intervalId

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1
        setOutput(text.slice(0, index))
        if (index >= text.length) clearInterval(intervalId)
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [text, start, speed, startDelay])

  return output
}
