import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import Button from "../ui/Button"
import Reveal from "../ui/Reveal"
import { steps } from "../../data/steps"
import "./HowItWorks.css"

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="comment-ca-marche">
      <Container>
        <SectionTitle
          align="center"
          eyebrow="Comment ça marche"
          title="Trois étapes, du raisonnement au progrès"
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
        <div className="how-it-works__cta">
          <Button href="#tarif" size="md">Voir le tarif de lancement</Button>
        </div>
      </Container>
    </section>
  )
}
