import { useCallback, useEffect, useState } from "react"

// ⚠ SIMULATION LOCALE PROVISOIRE — la progression est stockée dans le navigateur.
// Elle disparaît si l'élève vide son stockage ou change d'appareil.
// À remplacer par une vraie persistance serveur (Supabase) avant le lancement.
const STORAGE_KEY = "ingeprep_progression_simulee"
const EVENEMENT = "ingeprep:progression"

// Une soumission :
// { chapitreSlug, chapitreTitre, matiereLabel, exerciceId, exerciceTitre, scenario, date }

function lire() {
  try {
    const brut = window.localStorage.getItem(STORAGE_KEY)
    const valeur = brut ? JSON.parse(brut) : []
    return Array.isArray(valeur) ? valeur : []
  } catch {
    return []
  }
}

export function useProgression() {
  const [soumissions, setSoumissions] = useState(lire)

  useEffect(() => {
    const relire = () => setSoumissions(lire())
    window.addEventListener(EVENEMENT, relire)
    window.addEventListener("storage", relire)
    return () => {
      window.removeEventListener(EVENEMENT, relire)
      window.removeEventListener("storage", relire)
    }
  }, [])

  const enregistrer = useCallback((soumission) => {
    const suivant = [...lire(), { ...soumission, date: new Date().toISOString() }]
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(suivant))
    } catch {
      // stockage indisponible : la progression reste en mémoire pour la session
    }
    setSoumissions(suivant)
    window.dispatchEvent(new Event(EVENEMENT))
  }, [])

  const reinitialiser = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // rien à nettoyer si le stockage est indisponible
    }
    setSoumissions([])
    window.dispatchEvent(new Event(EVENEMENT))
  }, [])

  return { soumissions, enregistrer, reinitialiser }
}
