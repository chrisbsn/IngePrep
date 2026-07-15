import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Container from "../ui/Container"
import Logo from "../ui/Logo"
import { useCompteSimule } from "../../hooks/useCompteSimule"
import "./Header.css"

const NAV_LINKS = [
  { label: "Le correcteur IA", href: "#correcteur-ia" },
  { label: "Annales", href: "#annales" },
  { label: "L'examen ESA", href: "#examen-admission" },
  { label: "Tarif", href: "#tarif" },
  { label: "FAQ", href: "#faq" },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { connecte } = useCompteSimule()
  const { pathname } = useLocation()
  const surLanding = pathname === "/"

  function closeMenu() {
    setMenuOpen(false)
  }

  // "Obtenir mon accès" mène au tarif + paiement (carte #tarif). Sur la landing,
  // ancre directe (défilement fluide) ; ailleurs, navigation vers /#tarif. Une
  // fois connecté, la même place mène au tableau de bord.
  function CtaAcces({ className }) {
    if (connecte) {
      return (
        <Link to="/tableau-de-bord" className={className} onClick={closeMenu}>
          Mon tableau de bord
        </Link>
      )
    }
    if (surLanding) {
      return (
        <a href="#tarif" className={className} onClick={closeMenu}>
          Obtenir mon accès
        </a>
      )
    }
    return (
      <Link to="/#tarif" className={className} onClick={closeMenu}>
        Obtenir mon accès
      </Link>
    )
  }

  return (
    <header className="header">
      <Container className="header__inner">
        <a href="#top" className="header__logo" onClick={closeMenu}>
          <Logo size={30} />
          IngePrep
        </a>
        <nav className="header__nav" aria-label="Navigation principale">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header__actions">
          {!connecte && (
            <Link to="/connexion" className="header__login-link">
              Se connecter
            </Link>
          )}
          <CtaAcces className="btn btn--primary btn--sm header__cta" />
        </div>
        <button
          type="button"
          className={`header__toggle ${menuOpen ? "header__toggle--open" : ""}`}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </Container>

      <div
        className={`header__mobile-panel ${menuOpen ? "header__mobile-panel--open" : ""}`}
        id="mobile-nav"
      >
        <nav aria-label="Navigation mobile">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        {!connecte && (
          <Link to="/connexion" className="header__mobile-login" onClick={closeMenu}>
            Se connecter
          </Link>
        )}
        <CtaAcces className="btn btn--primary btn--md header__mobile-cta" />
      </div>
    </header>
  )
}
