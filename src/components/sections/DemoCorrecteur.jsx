import { useState } from "react"
import { useTypewriter } from "../../hooks/useTypewriter"
import "./DemoCorrecteur.css"

const ENONCE = "Résous dans ℝ : √(x + 2) = x"

const STEPS = [
  {
    id: 1,
    label: "Étape 1",
    content: "Condition d'existence : x + 2 ≥ 0, donc x ≥ −2",
    status: "faulty",
    verdictTitle: "Mécanisme identifié — condition implicite oubliée",
    verdict:
      "Une racine carrée est toujours positive ou nulle : il fallait aussi imposer x ≥ 0. Cette condition manquante laissera passer une solution parasite jusqu'à la conclusion.",
  },
  {
    id: 2,
    label: "Étape 2",
    content: "On élève au carré : x + 2 = x²",
    status: "ok",
    verdictTitle: "Étape validée",
    verdict:
      "L'élévation au carré est correcte. Attention : elle n'est pas réversible — c'est précisément pour ça que les conditions de l'étape 1 devaient être complètes.",
  },
  {
    id: 3,
    label: "Étape 3",
    content: "x² − x − 2 = 0 ⇒ (x − 2)(x + 1) = 0 ⇒ x = 2 ou x = −1",
    status: "ok",
    verdictTitle: "Étape validée",
    verdict: "Mise sous forme canonique, factorisation et racines : tout est correct.",
  },
  {
    id: 4,
    label: "Étape 4",
    content: "Conclusion : S = {−1 ; 2}",
    status: "consequence",
    verdictTitle: "Réponse fausse — mais l'erreur n'est pas ici",
    verdict:
      "x = −1 donne √(x + 2) = 1 ≠ −1 : c'est une solution parasite. L'erreur se propage depuis l'étape 1 — sans la condition x ≥ 0, rien ne l'éliminait. La bonne réponse : S = {2}.",
  },
]

const STATUS_ICON = { ok: "✓", faulty: "◆", consequence: "!" }

export default function DemoCorrecteur() {
  const [selectedId, setSelectedId] = useState(null)
  const [exploredIds, setExploredIds] = useState([])

  const selected = STEPS.find((step) => step.id === selectedId)
  const verdictText = useTypewriter(selected ? selected.verdict : "", {
    speed: 8,
    start: Boolean(selected),
    startDelay: 150,
  })
  const isTyping = selected && verdictText.length < selected.verdict.length

  const handleSelect = (step) => {
    setSelectedId(step.id)
    setExploredIds((ids) => (ids.includes(step.id) ? ids : [...ids, step.id]))
  }

  return (
    <div className="demo-correcteur">
      <div className="demo-correcteur__intro">
        <p className="demo-correcteur__intro-title">Essaie par toi-même</p>
        <p className="demo-correcteur__intro-text">
          Voici la copie d'un étudiant sur une question type ESA. Sa réponse finale est fausse.
          Clique sur chaque étape pour voir le diagnostic de l'IA — et repérer où le raisonnement casse vraiment.
        </p>
      </div>

      <div className="demo-correcteur__panel">
        <div className="demo-correcteur__copy">
          <p className="demo-correcteur__enonce">
            <span className="demo-correcteur__enonce-label">Énoncé</span>
            {ENONCE}
          </p>
          <ul className="demo-correcteur__steps">
            {STEPS.map((step) => {
              const explored = exploredIds.includes(step.id)
              const isSelected = step.id === selectedId
              return (
                <li key={step.id}>
                  <button
                    type="button"
                    className={[
                      "demo-correcteur__step",
                      explored ? `demo-correcteur__step--${step.status}` : "",
                      isSelected ? "demo-correcteur__step--selected" : "",
                    ].join(" ")}
                    onClick={() => handleSelect(step)}
                  >
                    <span className="demo-correcteur__step-icon" aria-hidden="true">
                      {explored ? STATUS_ICON[step.status] : "?"}
                    </span>
                    <span className="demo-correcteur__step-body">
                      <span className="demo-correcteur__step-label">{step.label}</span>
                      <span className="demo-correcteur__step-content">{step.content}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="demo-correcteur__diagnostic" aria-live="polite">
          {selected ? (
            <div
              className={`demo-correcteur__verdict demo-correcteur__verdict--${selected.status}`}
              key={selected.id}
            >
              <p className="demo-correcteur__verdict-title">{selected.verdictTitle}</p>
              <p className="demo-correcteur__verdict-text">
                {verdictText}
                {isTyping && <span className="demo-correcteur__cursor" />}
              </p>
            </div>
          ) : (
            <p className="demo-correcteur__placeholder">
              Le diagnostic de l'IA s'affichera ici. Commence par cliquer sur une étape de la copie.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
