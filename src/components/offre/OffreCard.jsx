import { useState } from "react"
import Button from "../ui/Button"
import { startCheckout } from "../../utils/checkout"
import "../sections/Pricing.css"

const INCLUDED = [
  "Accès unique à la plateforme jusqu'à ton examen",
  "Corrections IA illimitées sur les exercices types ESA",
  "Diagnostics détaillés par mécanisme d'erreur",
  "Suivi de ta progression sur tes points faibles",
  "Garantie satisfait ou remboursé pendant 14 jours",
]

// Contenu de la carte tarif, partagé tel quel entre la section Tarif de la
// landing et la modale de paywall (dans l'application). Contient la logique de
// paiement (Stripe) : le prix, l'ancrage par comparaison, les bénéfices et la
// garantie ne sont définis qu'ici.
export default function OffreCard() {
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
    <>
      <span className="pricing__badge">Mode test : aucun montant réel débité</span>
      <div className="pricing__price">
        <span className="pricing__price-anchor" aria-hidden="true">129 €</span>
        <span className="pricing__price-value">79 €</span>
        <span className="pricing__price-note">
          Prix de lancement pour les 100 premiers utilisateurs, 129 € ensuite
        </span>
      </div>

      <div className="pricing__comparaison">
        <p className="pricing__comparaison-titre">
          Le prix d'une heure de cours particulier, pour toute ta préparation
        </p>
        <p className="pricing__comparaison-texte">
          Un cours particulier chez un ingénieur diplômé coûte entre 50 € et 80 € de l'heure.
          Une année complète chez Student Academy dépasse 700 €. IngePrep, c'est un accès illimité
          jusqu'à ton examen pour 79 €.
        </p>
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
        {status === "loading" ? "Redirection vers Stripe..." : "Obtenir mon accès pour 79 €"}
      </Button>
      {status === "error" && <p className="pricing__error">{errorMessage}</p>}
      <p className="pricing__note">
        Paiement sécurisé par Stripe. Carte bancaire et Bancontact acceptés.
      </p>
    </>
  )
}
