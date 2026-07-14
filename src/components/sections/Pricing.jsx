import { useState } from "react"
import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import Button from "../ui/Button"
import Reveal from "../ui/Reveal"
import { startCheckout } from "../../utils/checkout"
import "./Pricing.css"

const INCLUDED = [
  "Accès unique à la plateforme jusqu'à ton examen",
  "Corrections IA illimitées sur les exercices types ESA",
  "Diagnostics détaillés par mécanisme d'erreur",
  "Suivi de ta progression sur tes points faibles",
  "Garantie satisfait ou remboursé pendant 14 jours",
]

export default function Pricing() {
  const [status, setStatus] = useState("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleCheckout() {
    setStatus("loading")
    setErrorMessage("")
    try {
      await startCheckout()
    } catch (error) {
      setStatus("error")
      setErrorMessage(error.message)
    }
  }

  return (
    <section className="pricing" id="tarif">
      <Container>
        <SectionTitle
          align="center"
          eyebrow="Tarif"
          title="Un accès unique, pensé pour un budget d'étudiant"
          description="Un seul paiement, pas d'abonnement. Et si la méthode ne te convient pas, tu es remboursé — sans justification."
        />

        <Reveal className="pricing__card">
          <span className="pricing__badge">Mode test — aucun montant réel débité</span>
          <div className="pricing__price">
            <span className="pricing__price-anchor" aria-hidden="true">129 €</span>
            <span className="pricing__price-value">79 €</span>
            <span className="pricing__price-note">Tarif de lancement — accès jusqu'à ton examen</span>
          </div>
          <ul className="pricing__included">
            {INCLUDED.map((item) => (
              <li key={item}>
                <span className="pricing__check" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <Button
            type="button"
            size="md"
            className="pricing__cta"
            onClick={handleCheckout}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Redirection vers Stripe..." : "Obtenir mon accès — 79 €"}
          </Button>
          {status === "error" && <p className="pricing__error">{errorMessage}</p>}
          <p className="pricing__note">
            Paiement sécurisé par Stripe. Carte bancaire et Bancontact acceptés.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
