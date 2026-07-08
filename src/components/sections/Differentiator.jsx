import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import "./Differentiator.css"

const COMPARISON = [
  {
    label: "Correction classique",
    result: "\"Réponse incorrecte.\"",
    tone: "neutral",
  },
  {
    label: "Correcteur IngeniumPrep",
    result:
      "\"Ton hypothèse à l'étape 2 suppose que les droites sont concourantes — ce n'est pas donné par l'énoncé. C'est ce qui invalide le théorème appliqué à l'étape 3.\"",
    tone: "highlight",
  },
]

export default function Differentiator() {
  return (
    <section className="differentiator" id="correcteur-ia">
      <Container className="differentiator__inner">
        <SectionTitle
          eyebrow="Notre différence"
          title="Un correcteur qui diagnostique le raisonnement, pas seulement le résultat"
          description="Notre IA compare ta démarche, étape par étape, à des méthodes de référence rédigées par des enseignants. Elle repère précisément où ta logique dévie et t'explique le mécanisme — pas juste le verdict."
        />

        <div className="differentiator__comparison">
          {COMPARISON.map((item) => (
            <div
              key={item.label}
              className={`differentiator__bubble differentiator__bubble--${item.tone}`}
            >
              <span className="differentiator__bubble-label">{item.label}</span>
              <p>{item.result}</p>
            </div>
          ))}
        </div>

        <div className="differentiator__mechanisms">
          <p className="differentiator__mechanisms-title">Exemples de mécanismes d'erreur identifiés :</p>
          <ul className="differentiator__mechanisms-list">
            <li>Mauvaise interprétation de l'énoncé</li>
            <li>Hypothèse implicite non justifiée</li>
            <li>Théorème ou formule mal mobilisé</li>
            <li>Erreur de calcul isolée dans un raisonnement juste</li>
            <li>Confusion entre deux notions proches</li>
          </ul>
        </div>
      </Container>
    </section>
  )
}
