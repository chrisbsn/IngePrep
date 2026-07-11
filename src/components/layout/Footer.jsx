import Container from "../ui/Container"
import Logo from "../ui/Logo"
import "./Footer.css"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <Container className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">
            <Logo size={30} />
            Cap Ingé
          </span>
          <span className="footer__eyebrow">Cap sur Poly</span>
          <p className="footer__tagline">
            La préparation à l'ESA qui diagnostique ton raisonnement, pas seulement tes résultats.
          </p>
        </div>

        <div className="footer__col">
          <h3>Écoles couvertes</h3>
          <ul>
            <li>UCLouvain — École Polytechnique</li>
            <li>ULB — École polytechnique</li>
            <li>ULiège — Faculté des Sciences appliquées</li>
            <li>UMons — Faculté Polytechnique</li>
          </ul>
        </div>

        <div className="footer__col">
          <h3>Contact</h3>
          <ul>
            <li><a href="mailto:contact@capinge.be">contact@capinge.be</a></li>
          </ul>
        </div>
      </Container>

      <Container>
        <div className="footer__bottom">
          <p>© {year} Cap Ingé. Projet en préparation — lancement prévu septembre 2026.</p>
          <p className="footer__disclaimer">
            Cap Ingé est un projet indépendant, non affilié à l'UCLouvain, l'ULB, l'ULiège, l'UMons ni au CESAM.
          </p>
        </div>
      </Container>
    </footer>
  )
}
