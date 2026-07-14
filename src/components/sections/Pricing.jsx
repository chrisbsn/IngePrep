import { useState } from "react"
import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import Button from "../ui/Button"
import Reveal from "../ui/Reveal"
import { startCheckout } from "../../utils/checkout"
import "./Pricing.css"

const INCLUDED = [
  "Accès à la plateforme jusqu'à ton examen",
  "Corrections IA illimitées sur les exercices types ESA",
  "Diagnostics détaillés par mécanisme d'erreur",
  "Suivi de ta progression sur tes points faibles",
]

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function Pricing() {
  const [status, setStatus] = useState("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleClick() {
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
          title="Le prix d'une heure de cours particulier, pour toute ta préparation"
          description="Un cours particulier chez un ingénieur diplômé coûte entre 50 et 80 €. Une année complète chez Student Academy dépasse 700 €. Cap Ingé, c'est un accès unique à 30 € jusqu'à ton examen."
        />

        <div className="pricing__card-wrap">
          <div className="pricing__halo" aria-hidden="true" />
          <Reveal className="pricing__card">
            <span className="pricing__card-title">Accès unique</span>
            <div className="pricing__price">
              <span className="pricing__price-value">30 €</span>
            </div>
            <ul className="pricing__included">
              {INCLUDED.map((item) => (
                <li key={item}>
                  <span className="pricing__check" aria-hidden="true">
                    <IconCheck />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Button
              type="button"
              size="md"
              className="pricing__cta btn--pill"
              onClick={handleClick}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Redirection vers Stripe..." : "Payer avec Stripe"}
            </Button>
            {status === "error" && <p className="pricing__error">{errorMessage}</p>}
            <p className="pricing__note">
              Paiement sécurisé par Stripe · Cartes bancaires et Bancontact acceptés
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
