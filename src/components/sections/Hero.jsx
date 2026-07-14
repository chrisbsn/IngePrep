import { useTypewriter } from "../../hooks/useTypewriter"
import Container from "../ui/Container"
import Button from "../ui/Button"
import "./Hero.css"

const DIAGNOSTIC_TEXT =
  "Configuration non conforme aux conditions du théorème — les droites ne sont pas concourantes comme supposé à l'étape 2."

export default function Hero() {
  const diagnostic = useTypewriter(DIAGNOSTIC_TEXT, { speed: 14, startDelay: 900 })

  return (
    <section className="hero" id="top">
      <div className="hero__blob hero__blob--coral" aria-hidden="true" />
      <div className="hero__blob hero__blob--mint" aria-hidden="true" />
      <Container className="hero__inner">
        <div className="hero__content">
          <span className="hero__badge hero__enter" style={{ "--enter-delay": "0ms" }}>
            Prépa ESA — UCLouvain · ULB · ULiège · UMons
          </span>
          <h1 className="hero__title hero__enter" style={{ "--enter-delay": "90ms" }}>
            Tu rates tes exercices sans savoir pourquoi ? Notre IA identifie le raisonnement qui{" "}
            <span className="hero__title-accent">coince</span> — pas juste la réponse fausse.
          </h1>
          <p className="hero__subtitle hero__enter" style={{ "--enter-delay": "180ms" }}>
            IngePrep analyse ta démarche étape par étape sur les exercices de l'examen d'admission
            ingénieur civil (UCLouvain, ULB, ULiège, UMons) et nomme le mécanisme précis qui te fait
            perdre des points — pour que tu t'entraînes sur ce qui compte vraiment.
          </p>
          <div className="hero__actions hero__enter" style={{ "--enter-delay": "260ms" }}>
            <Button href="#tarif" size="md">Obtenir mon accès</Button>
            <Button href="#correcteur-ia" variant="secondary" size="md">Voir comment ça marche</Button>
          </div>
          <p className="hero__note hero__enter" style={{ "--enter-delay": "320ms" }}>
            Accès unique. Satisfait ou remboursé pendant 14 jours.
          </p>
        </div>

        <div className="hero__visual hero__enter" style={{ "--enter-delay": "220ms" }} aria-hidden="true">
          <div className="hero__card">
            <div className="hero__card-row hero__card-row--wrong">
              <span className="hero__card-label">Étape 3</span>
              <span>Application du théorème de Thalès</span>
            </div>
            <div className="hero__card-diagnostic">
              <span className="hero__card-diagnostic-icon">◆</span>
              <div>
                <p className="hero__card-diagnostic-title">Mécanisme identifié</p>
                <p className="hero__card-diagnostic-text">
                  {diagnostic}
                  <span className="hero__cursor" />
                </p>
              </div>
            </div>
            <div className="hero__card-row hero__card-row--ok">
              <span className="hero__card-label">Étape 1–2</span>
              <span>Mise en équation correcte</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
