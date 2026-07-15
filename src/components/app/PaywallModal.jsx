import { useEffect } from "react"
import OffreCard from "../offre/OffreCard"
import { MAX_ESSAIS_GRATUITS } from "../../hooks/useEssaisGratuits"
import "./PaywallModal.css"

// Modale de paywall : elle se superpose à l'écran courant, sans navigation ni
// changement d'URL. Elle réutilise telle quelle la carte tarif (OffreCard) —
// prix, comparaison externe, bénéfices, garantie — précédée d'un en-tête.
// Un bouton de fermeture discret permet de la fermer sans payer ; la démarche
// déjà rédigée dans l'exercice reste intacte (la modale ne touche pas au champ).
export default function PaywallModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    function onKey(event) {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="paywall-modal" role="dialog" aria-modal="true" aria-labelledby="paywall-modal-titre">
      <div className="paywall-modal__backdrop" onClick={onClose} />
      <div className="paywall-modal__contenu" role="document">
        <button
          type="button"
          className="paywall-modal__fermer"
          onClick={onClose}
          aria-label="Fermer sans payer"
        >
          ✕
        </button>

        <p className="paywall-modal__entete" id="paywall-modal-titre">
          Tu as utilisé tes {MAX_ESSAIS_GRATUITS} corrections gratuites
        </p>
        <p className="paywall-modal__sous-titre">
          Passe à l'accès complet pour des corrections illimitées jusqu'à ton examen.
        </p>

        <div className="pricing__card paywall-modal__carte">
          <OffreCard />
        </div>
      </div>
    </div>
  )
}
