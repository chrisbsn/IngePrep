import { useEffect, useState } from "react"
import "./CheckoutBanner.css"

export default function CheckoutBanner() {
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const value = params.get("checkout")
    if (value === "success" || value === "cancelled") {
      setStatus(value)
      window.history.replaceState(null, "", window.location.pathname)
    }
  }, [])

  if (!status) return null

  const isSuccess = status === "success"

  return (
    <div className={`checkout-banner ${isSuccess ? "checkout-banner--success" : "checkout-banner--cancelled"}`}>
      <span>
        {isSuccess
          ? "Paiement test réussi — le circuit Stripe fonctionne. (Mode test, aucun montant réel débité.)"
          : "Paiement annulé."}
      </span>
      <button type="button" onClick={() => setStatus(null)} aria-label="Fermer">
        ×
      </button>
    </div>
  )
}
