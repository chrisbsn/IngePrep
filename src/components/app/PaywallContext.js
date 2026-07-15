import { createContext, useContext } from "react"

// Permet d'ouvrir la modale de paywall depuis n'importe quelle vue de la
// coquille (page chapitre, lien "Passer à l'accès complet" de la sidebar…),
// sans navigation ni URL dédiée. La modale elle-même est rendue par AppShell.
export const PaywallContext = createContext({ ouvrir: () => {}, fermer: () => {} })

export function usePaywall() {
  return useContext(PaywallContext)
}
