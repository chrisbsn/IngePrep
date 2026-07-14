import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import Reveal from "../ui/Reveal"
import { steps } from "../../data/steps"
import "./HowItWorks.css"

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="comment">
      <Container>
        <SectionTitle
          align="center"
          eyebrow="Comment ça marche"
          title="Quatre étapes, du raisonnement au progrès"
        />
        <div className="how-it-works__grid">
          {steps.map((step, index) => (
            <Reveal as="div" className="how-it-works__step" delay={index * 100} key={step.number}>
              <span className="how-it-works__number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
