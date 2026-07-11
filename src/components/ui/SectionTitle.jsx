import { useReveal } from "../../hooks/useReveal"
import "./SectionTitle.css"

export default function SectionTitle({ eyebrow, title, description, align = "left" }) {
  const [ref, isVisible] = useReveal()

  return (
    <div
      ref={ref}
      className={`section-title section-title--${align} reveal ${isVisible ? "reveal--visible" : ""}`}
    >
      {eyebrow && <span className="section-title__eyebrow">{eyebrow}</span>}
      <h2 className="section-title__title">{title}</h2>
      {description && <p className="section-title__description">{description}</p>}
    </div>
  )
}
