import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import { steps } from "../../data/steps"
import "./HowItWorks.css"

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="comment-ca-marche">
      <Container>
        <SectionTitle
          align="center"
          eyebrow="Comment ça marche"
          title="Quatre étapes, du raisonnement au progrès"
        />
        <div className="how-it-works__grid">
          {steps.map((step) => (
            <div className="how-it-works__step" key={step.number}>
              <span className="how-it-works__number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
