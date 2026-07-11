import { useState } from "react"
import "./Accordion.css"

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div className={`accordion-item ${isOpen ? "accordion-item--open" : ""}`} key={item.question}>
            <button
              className="accordion-item__trigger"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <span className="accordion-item__icon" aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
            <div className="accordion-item__panel">
              <div className="accordion-item__panel-inner">
                <p className="accordion-item__content">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
