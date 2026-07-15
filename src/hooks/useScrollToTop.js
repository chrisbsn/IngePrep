import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// Par défaut, le navigateur mémorise et RESTAURE la position de défilement de
// chaque entrée d'historique. En navigation SPA, cette restauration s'exécute
// après le rendu et écrase tout reset manuel : on revient sur une page au
// niveau où on l'avait laissée (ex. « Notre différence » sur la landing) au
// lieu du haut. On désactive donc la restauration automatique une fois pour
// toutes, et on gère nous-mêmes le retour en haut à chaque changement de route.
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual"
}

export function useScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    // Selon le moteur (et notamment dans le webview intégré), l'élément
    // réellement scrollé est tantôt window, tantôt <html>, tantôt <body> :
    // on remet à zéro toutes les cibles possibles.
    window.scrollTo(0, 0)
    if (document.scrollingElement) document.scrollingElement.scrollTop = 0
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname, hash])
}
