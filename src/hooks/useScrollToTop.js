import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// Décalage pour ne pas passer sous le header sticky (~77px), aligné sur
// useSmoothAnchorScroll.
const HEADER_OFFSET = 80

function defilerVers(y) {
  // `behavior: "instant"` est indispensable : le CSS `scroll-behavior: smooth`
  // (sur <html>) transforme sinon ce saut en animation, qui échoue à
  // repositionner correctement dans certains moteurs (dont le webview intégré).
  // On force aussi les cibles <html>/<body> par sécurité selon l'élément
  // réellement scrollé.
  window.scrollTo({ top: y, left: 0, behavior: "instant" })
  if (document.scrollingElement) document.scrollingElement.scrollTop = y
  document.documentElement.scrollTop = y
  document.body.scrollTop = y
}

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
  // On ne dépend que du pathname : un simple changement d'ancre sur la même page
  // (ex. clic sur "Tarif" dans le menu) est déjà géré par useSmoothAnchorScroll,
  // il ne faut pas le doubler ici. On n'agit donc qu'aux vrais changements de page.
  const { pathname } = useLocation()

  useEffect(() => {
    const hash = window.location.hash

    // Navigation vers une ancre d'une autre page (ex. /#tarif depuis /annales) :
    // on défile jusqu'à la cible une fois la nouvelle page rendue. scrollIntoView
    // respecte le scroll-margin-top des sections, donc pas de recouvrement par le
    // header sticky.
    if (hash.length > 1) {
      // Léger délai : la nouvelle page doit être entièrement mise en page, sinon
      // sa hauteur n'est pas encore atteinte et le défilement vers une ancre
      // lointaine est clampé (ramené en haut).
      const timer = setTimeout(() => {
        const cible = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (!cible) return
        const scrollActuel = window.scrollY || document.documentElement.scrollTop || 0
        const y = cible.getBoundingClientRect().top + scrollActuel - HEADER_OFFSET
        defilerVers(Math.max(0, y))
      }, 120)
      return () => clearTimeout(timer)
    }

    // Sinon, retour en haut.
    defilerVers(0)
  }, [pathname])
}
