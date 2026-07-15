import { useCallback, useEffect, useState } from "react"

// Compteur d'essais gratuits SIMULÉ, stocké côté client (localStorage).
// À remplacer par une vraie logique serveur (compte utilisateur + vérification
// du paiement) : un compteur local se contourne en vidant le stockage du navigateur.
const STORAGE_KEY = "ingeprep_essais_gratuits_simules"
const EVENEMENT = "ingeprep:essais"
export const MAX_ESSAIS_GRATUITS = 3

function lireCompteur() {
  try {
    return Number(window.localStorage.getItem(STORAGE_KEY)) || 0
  } catch {
    return 0
  }
}

export function useEssaisGratuits() {
  const [utilises, setUtilises] = useState(lireCompteur)

  // Synchronise toutes les instances (coquille + page chapitre) en direct.
  useEffect(() => {
    const relire = () => setUtilises(lireCompteur())
    window.addEventListener(EVENEMENT, relire)
    window.addEventListener("storage", relire)
    return () => {
      window.removeEventListener(EVENEMENT, relire)
      window.removeEventListener("storage", relire)
    }
  }, [])

  const consommer = useCallback(() => {
    const suivant = lireCompteur() + 1
    try {
      window.localStorage.setItem(STORAGE_KEY, String(suivant))
    } catch {
      // stockage indisponible : le compteur reste en mémoire pour la session
    }
    setUtilises(suivant)
    window.dispatchEvent(new Event(EVENEMENT))
  }, [])

  const reinitialiser = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // rien à nettoyer si le stockage est indisponible
    }
    setUtilises(0)
    window.dispatchEvent(new Event(EVENEMENT))
  }, [])

  return {
    utilises,
    restants: Math.max(0, MAX_ESSAIS_GRATUITS - utilises),
    epuise: utilises >= MAX_ESSAIS_GRATUITS,
    consommer,
    reinitialiser,
  }
}
