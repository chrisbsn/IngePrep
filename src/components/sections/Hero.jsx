import { Link } from "react-router-dom"
import { useTypewriter } from "../../hooks/useTypewriter"
import Container from "../ui/Container"
import Button from "../ui/Button"
import { useCompteSimule } from "../../hooks/useCompteSimule"
import "./Hero.css"

const DIAGNOSTIC_TEXT =
  "Condition x ≥ 0 omise — une racine carrée ne peut pas égaler un nombre négatif. C'est ce qui laisse passer la solution parasite jusqu'à la conclusion."

export default function Hero() {
  const diagnostic = useTypewriter(DIAGNOSTIC_TEXT, { speed: 14, startDelay: 900 })
  const { connecte } = useCompteSimule()

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
            Tu t'es trompé ? On ne te dit pas juste où — on te dit{" "}
            <span className="hero__title-accent">pourquoi</span> ton raisonnement a coincé.
          </h1>
          <p className="hero__subtitle hero__enter" style={{ "--enter-delay": "180ms" }}>
            IngePrep analyse ta démarche étape par étape sur les exercices de l'examen d'admission
            ingénieur civil (UCLouvain, ULB, ULiège, UMons) et nomme le mécanisme précis qui te fait
            perdre des points — pour que tu t'entraînes sur ce qui compte vraiment.
          </p>
          <div className="hero__actions hero__enter" style={{ "--enter-delay": "260ms" }}>
            <Link
              to={connecte ? "/tableau-de-bord" : "/connexion"}
              className="btn btn--primary btn--md"
            >
              {connecte ? "Mon tableau de bord" : "Obtenir mon accès"}
            </Link>
            <Button href="#correcteur-ia" variant="secondary" size="md">Voir comment ça marche</Button>
          </div>
          <p className="hero__note hero__enter" style={{ "--enter-delay": "320ms" }}>
            Accès unique. Satisfait ou remboursé pendant 14 jours.
          </p>
        </div>

        <div className="hero__visual hero__enter" style={{ "--enter-delay": "220ms" }} aria-hidden="true">
          <div className="hero__card">
            <div className="hero__card-row hero__card-row--wrong">
              <span className="hero__card-label">Étape 1</span>
              <span>√(x + 2) = x — condition d'existence : x ≥ −2</span>
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
              <span className="hero__card-label">Étapes 2–3</span>
              <span>Élévation au carré et factorisation correctes</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
