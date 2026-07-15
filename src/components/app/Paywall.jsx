import { Link } from "react-router-dom"
import { MAX_ESSAIS_GRATUITS } from "../../hooks/useEssaisGratuits"
import "./Paywall.css"

// Écran de paywall simulé, affiché en pleine séance au moment où l'élève
// tente une correction alors que son quota gratuit est épuisé.
export default function Paywall() {
  return (
    <section className="paywall" role="alert">
      <span className="paywall__badge">Quota gratuit atteint</span>
      <h2>Tu as utilisé tes {MAX_ESSAIS_GRATUITS} corrections gratuites</h2>
      <p>
        Pour continuer à recevoir des diagnostics détaillés sur chaque exercice, débloque
        l'accès complet — corrections illimitées jusqu'à ton examen.
      </p>
      <Link to="/inscription" className="btn btn--primary btn--md">
        Débloquer l'accès complet — 79 €
      </Link>
      <p className="paywall__note">
        Écran simulé : ce compteur est stocké localement dans ton navigateur, à titre
        provisoire. La vraie logique (compte + paiement vérifié côté serveur) le remplacera.
        La navigation, la théorie et les annales récentes restent accessibles librement.
      </p>
    </section>
  )
}
