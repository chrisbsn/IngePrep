import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import Button from "../components/ui/Button"
import { exercices, getExerciceById } from "../data/exercices"
import "./Exercice.css"

const TYPE_ERREUR_LABELS = {
  erreur_conceptuelle: "Erreur conceptuelle",
  erreur_methodologique: "Erreur méthodologique",
  erreur_de_calcul: "Erreur de calcul",
  erreur_denonce: "Erreur d'énoncé",
}

export default function Exercice() {
  const { id } = useParams()
  const navigate = useNavigate()
  const exercice = getExerciceById(id)

  const [reponse, setReponse] = useState("")
  const [status, setStatus] = useState("idle") // idle | loading | success | error
  const [feedback, setFeedback] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    setReponse("")
    setStatus("idle")
    setFeedback(null)
    setErrorMessage("")
  }, [id])

  if (!exercice) {
    return (
      <div className="exercice-shell">
        <main className="exercice-main">
          <p>Exercice introuvable.</p>
          <Link to="/app">Retour aux matières</Link>
        </main>
      </div>
    )
  }

  const isLast = exercice.id === exercices[exercices.length - 1].id

  async function handleSubmit(event) {
    event.preventDefault()
    if (!reponse.trim() || status === "loading") return

    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/.netlify/functions/submit-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exercice: {
            enonce: exercice.enonce,
            solution_attendue: exercice.solution_attendue,
          },
          reponse_eleve: reponse,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue.")
      }

      setFeedback(data.feedback)
      setStatus("success")
    } catch (error) {
      setErrorMessage(error.message)
      setStatus("error")
    }
  }

  function handleRetry() {
    setReponse("")
    setFeedback(null)
    setStatus("idle")
    setErrorMessage("")
  }

  function handleNext() {
    navigate(`/app/exercice/${exercice.id + 1}`)
  }

  return (
    <div className="exercice-shell">
      <header className="exercice-header">
        <Link to="/app" className="exercice-header__back">
          ← Matières
        </Link>
        <span className="exercice-header__matiere">{exercice.matiere}</span>
      </header>

      <main className="exercice-main">
        <div className="exercice-meta">
          <span className="exercice-badge">{exercice.matiere}</span>
          <div className="exercice-stars" aria-label={`Difficulté ${exercice.difficulte} sur 5`}>
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={
                  index < exercice.difficulte ? "exercice-star exercice-star--filled" : "exercice-star"
                }
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <h1 className="exercice-enonce">{exercice.enonce}</h1>

        <form className="exercice-form" onSubmit={handleSubmit}>
          <textarea
            className="exercice-textarea"
            value={reponse}
            onChange={(event) => setReponse(event.target.value)}
            placeholder="Écris ta réponse ici... (ex: x^2 pour x², sqrt(2) pour √2)"
            rows={5}
            disabled={status === "loading" || status === "success"}
          />

          {status !== "success" && (
            <Button
              type="submit"
              size="md"
              className="exercice-submit"
              disabled={status === "loading" || !reponse.trim()}
            >
              {status === "loading" ? "Analyse en cours..." : "Soumettre ma réponse"}
            </Button>
          )}
        </form>

        {status === "error" && <p className="exercice-error">{errorMessage}</p>}

        {status === "success" && feedback && (
          <div
            className={`exercice-feedback ${
              feedback.correcte ? "exercice-feedback--correct" : "exercice-feedback--incorrect"
            }`}
          >
            <p className="exercice-feedback__verdict">
              {feedback.correcte ? "✅ Bonne réponse !" : "❌ Pas tout à fait"}
            </p>

            {feedback.type_erreur && (
              <span
                className={`exercice-feedback__type exercice-feedback__type--${feedback.type_erreur}`}
              >
                {TYPE_ERREUR_LABELS[feedback.type_erreur] || feedback.type_erreur}
              </span>
            )}

            {feedback.ce_qui_est_juste && (
              <div className="exercice-feedback__box exercice-feedback__box--positive">
                {feedback.ce_qui_est_juste}
              </div>
            )}

            {feedback.explication && (
              <div className="exercice-feedback__box exercice-feedback__box--neutral">
                {feedback.explication}
              </div>
            )}

            <div className="exercice-feedback__actions">
              <Button type="button" variant="secondary" size="md" onClick={handleRetry}>
                Réessayer
              </Button>
              {isLast ? (
                <Button type="button" size="md" onClick={() => navigate("/app")}>
                  Retour à la matière
                </Button>
              ) : (
                <Button type="button" size="md" onClick={handleNext}>
                  Exercice suivant
                </Button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
