import { Link } from "react-router-dom"
import Container from "../ui/Container"
import Button from "../ui/Button"
import HeroMockup from "./HeroMockup"
import "./Hero.css"

const MINI_BADGES = [
  { label: "Corrigé par IA", dot: "coral" },
  { label: "Accès jusqu'à ton examen", dot: "mint" },
  { label: "30 €", dot: "coral" },
]

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__pattern" aria-hidden="true" />
      <div className="hero__halo" aria-hidden="true" />
      <Container className="hero__inner">
        <div className="hero__content">
          <span className="hero__badge hero__enter" style={{ "--enter-delay": "0ms" }}>
            Préparation ESA — UCLouvain · ULB · ULiège · UMons
          </span>
          <h1 className="hero__title hero__enter" style={{ "--enter-delay": "90ms" }}>
            Prépare l'ESA. L'IA te dit <span className="hero__title-accent">pourquoi</span> tu te trompes, pas juste que tu te trompes.
          </h1>
          <p className="hero__subtitle hero__enter" style={{ "--enter-delay": "180ms" }}>
            Un correcteur qui analyse ton raisonnement étape par étape et identifie le mécanisme exact
            qui te fait perdre des points.
          </p>
          <div className="hero__actions hero__enter" style={{ "--enter-delay": "260ms" }}>
            <Link to="/app" className="btn btn--primary btn--pill btn--md">
              Tester le correcteur maintenant
            </Link>
            <Button href="#liste-attente" variant="secondary" size="md">
              Être prévenu du lancement
            </Button>
          </div>
          <p className="hero__note hero__enter" style={{ "--enter-delay": "320ms" }}>
            Aucun compte requis. Test gratuit immédiat.
          </p>
          <ul className="hero__mini-badges hero__enter" style={{ "--enter-delay": "380ms" }}>
            {MINI_BADGES.map((badge) => (
              <li key={badge.label} className="hero__mini-badge">
                <span className={`hero__mini-badge-dot hero__mini-badge-dot--${badge.dot}`} aria-hidden="true" />
                {badge.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__visual">
          <HeroMockup />
        </div>
      </Container>
    </section>
  )
}
