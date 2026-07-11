import { useReveal } from "../../hooks/useReveal"

// eslint-disable-next-line no-unused-vars -- Tag is used as a JSX element below
export default function Reveal({ children, as: Tag = "div", delay = 0, className = "" }) {
  const [ref, isVisible] = useReveal()

  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? "reveal--visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
