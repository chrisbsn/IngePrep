import { Link } from "react-router-dom"
import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import Reveal from "../ui/Reveal"
import { useReveal } from "../../hooks/useReveal"
import { useTypewriter } from "../../hooks/useTypewriter"
import DemoCorrecteur from "./DemoCorrecteur"
import "./Differentiator.css"

const NEUTRAL_TEXT = "\"Réponse incorrecte.\""
const HIGHLIGHT_TEXT =
  "\"À l'étape 1, tu poses x ≥ −2 mais tu oublies x ≥ 0 : une racine carrée ne peut pas égaler un nombre négatif. Tes calculs sont justes ensuite — c'est cette condition manquante qui laisse passer la solution parasite x = −1.\""

const MECHANISMS = [
  "Mauvaise interprétation de l'énoncé",
  "Hypothèse implicite non justifiée",
  "Théorème ou formule mal mobilisé",
  "Erreur de calcul isolée dans un raisonnement juste",
  "Confusion entre deux notions proches",
]

export default function Differentiator() {
  const [bubbleRef, bubbleVisible] = useReveal(0.4)
  const highlightText = useTypewriter(HIGHLIGHT_TEXT, {
    speed: 12,
    start: bubbleVisible,
    startDelay: 500,
  })
  const isTyping = bubbleVisible && highlightText.length < HIGHLIGHT_TEXT.length

  return (
    <section className="differentiator" id="correcteur-ia">
      <div className="differentiator__blob" aria-hidden="true" />
      <Container className="differentiator__inner">
        <SectionTitle
          eyebrow="Notre différence"
          title="Un correcteur qui diagnostique le raisonnement, pas seulement le résultat"
          description="Notre IA compare ta démarche, étape par étape, à des méthodes de référence rédigées par des enseignants. Elle repère précisément où ta logique dévie et t'explique le mécanisme — pas juste le verdict."
        />

        <div
          className={`differentiator__comparison reveal ${bubbleVisible ? "reveal--visible" : ""}`}
          ref={bubbleRef}
        >
          <div className="differentiator__bubble differentiator__bubble--neutral">
            <span className="differentiator__bubble-label">Correction classique</span>
            <p>{NEUTRAL_TEXT}</p>
          </div>
          <div className="differentiator__bubble differentiator__bubble--highlight">
            <span className="differentiator__bubble-label">Correcteur IngePrep</span>
            <p>
              {highlightText}
              {isTyping && <span className="differentiator__cursor" />}
            </p>
          </div>
        </div>

        <DemoCorrecteur />

        <Reveal className="differentiator__mechanisms" delay={150}>
          <p className="differentiator__mechanisms-title">Exemples de mécanismes d'erreur identifiés :</p>
          <ul className="differentiator__mechanisms-list">
            {MECHANISMS.map((mechanism) => (
              <li key={mechanism}>{mechanism}</li>
            ))}
          </ul>
        </Reveal>

        <div className="differentiator__cta">
          <Link to="/app/chapitre/derivees" className="btn btn--primary btn--md">
            Essayer un exercice gratuit
          </Link>
        </div>
      </Container>
    </section>
  )
}
