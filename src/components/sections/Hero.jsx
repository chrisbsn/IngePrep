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
            Lancement septembre 2026 — UCLouvain · ULB · ULiège · UMons
          </span>
          <h1 className="hero__title hero__enter" style={{ "--enter-delay": "90ms" }}>
            Prépare l'ESA avec un feedback qui comprend <span className="hero__title-accent">pourquoi</span> tu te trompes.
          </h1>
          <p className="hero__subtitle hero__enter" style={{ "--enter-delay": "180ms" }}>
            Cap Ingé ne se contente pas de vérifier ta réponse finale. Notre correcteur IA analyse ton
            raisonnement étape par étape et identifie le mécanisme précis qui te fait perdre des points —
            pour que tu t'entraînes sur ce qui compte vraiment.
          </p>
          <div className="hero__actions hero__enter" style={{ "--enter-delay": "260ms" }}>
            <Button href="#waitlist" size="md">Rejoindre la liste d'attente</Button>
            <Button href="#correcteur-ia" variant="secondary" size="md">Voir comment ça marche</Button>
          </div>
          <p className="hero__note hero__enter" style={{ "--enter-delay": "320ms" }}>
            Gratuit de s'inscrire. Aucun paiement à ce stade.
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
