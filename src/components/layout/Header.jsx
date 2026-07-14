import { useState } from "react"
import { Link } from "react-router-dom"
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

  // Une fois « connecté » (simulation), le CTA mène au tableau de bord plutôt
  // qu'à un nouveau formulaire de connexion.
  const cta = connecte
    ? { to: "/tableau-de-bord", label: "Mon tableau de bord" }
    : { to: "/connexion", label: "Obtenir mon accès" }

  function closeMenu() {
    setMenuOpen(false)
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
        <Link to={cta.to} className="btn btn--primary btn--sm header__cta">
          {cta.label}
        </Link>
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
        <Link
          to={cta.to}
          className="btn btn--primary btn--md header__mobile-cta"
          onClick={closeMenu}
        >
          {cta.label}
        </Link>
      </div>
    </header>
  )
}
