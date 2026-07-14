import { useCallback, useEffect, useState } from "react"

// ⚠ SIMULATION LOCALE PROVISOIRE — ce n'est PAS une authentification.
// Aucun mot de passe n'est demandé, stocké ni vérifié : on garde simplement un
// prénom et un email dans le navigateur pour pouvoir maquetter le tableau de bord.
// À remplacer par une vraie authentification Supabase avant le lancement commercial.
const STORAGE_KEY = "ingeprep_compte_simule"

// Événement interne : permet aux composants montés de réagir à une connexion/déconnexion.
const EVENEMENT = "ingeprep:compte-simule"

function lire() {
  try {
    const brut = window.localStorage.getItem(STORAGE_KEY)
    return brut ? JSON.parse(brut) : null
  } catch {
    return null
  }
}

export function useCompteSimule() {
  const [compte, setCompte] = useState(lire)

  useEffect(() => {
    const relire = () => setCompte(lire())
    window.addEventListener(EVENEMENT, relire)
    window.addEventListener("storage", relire)
    return () => {
      window.removeEventListener(EVENEMENT, relire)
      window.removeEventListener("storage", relire)
    }
  }, [])

  const connecter = useCallback((prenom, email) => {
    const nouveau = { prenom: prenom.trim(), email: email.trim() }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nouveau))
    } catch {
      // stockage indisponible : le compte reste en mémoire pour la session
    }
    setCompte(nouveau)
    window.dispatchEvent(new Event(EVENEMENT))
  }, [])

  const deconnecter = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // rien à nettoyer si le stockage est indisponible
    }
    setCompte(null)
    window.dispatchEvent(new Event(EVENEMENT))
  }, [])

  return { compte, connecte: Boolean(compte), connecter, deconnecter }
}
