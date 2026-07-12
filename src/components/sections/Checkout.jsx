import { useState } from "react"
import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import Button from "../ui/Button"
import Reveal from "../ui/Reveal"
import { startCheckout } from "../../utils/checkout"
import "./Checkout.css"

export default function Checkout() {
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
    <section className="checkout" id="paiement">
      <Container>
        <SectionTitle
          align="center"
          eyebrow="Paiement"
          title="Le module de paiement, déjà prêt"
          description="Le circuit de paiement Stripe est branché et fonctionnel. Le prix et l'accès définitifs seront activés au lancement — en attendant, tu peux tester le parcours d'achat en conditions réelles, en mode test."
        />

        <Reveal className="checkout__card">
          <span className="checkout__badge">Mode test — aucun montant réel débité</span>
          <div className="checkout__price">
            <span className="checkout__price-value">30 €</span>
            <span className="checkout__price-note">Accès unique jusqu'à ton examen</span>
          </div>
          <Button
            type="button"
            size="md"
            className="checkout__cta"
            onClick={handleClick}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Redirection vers Stripe..." : "Payer avec Stripe"}
          </Button>
          {status === "error" && <p className="checkout__error">{errorMessage}</p>}
          <p className="checkout__note">
            Paiement sécurisé par Stripe. Cartes bancaires et Bancontact acceptés.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
