import { useState } from "react"
import Container from "../ui/Container"
import Button from "../ui/Button"
import Logo from "../ui/Logo"
import "./Header.css"

const NAV_LINKS = [
  { label: "Le problème", href: "#probleme" },
  { label: "Le correcteur IA", href: "#difference" },
  { label: "Comment ça marche", href: "#comment" },
  { label: "L'ESA", href: "#esa" },
  { label: "Prix", href: "#tarif" },
  { label: "FAQ", href: "#faq" },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <Container className="header__inner">
        <a href="#top" className="header__logo" onClick={closeMenu}>
          <Logo size={30} />
          Cap Ingé
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
        <Button href="#liste-attente" size="sm" className="header__cta">
          Rejoindre la liste d'attente
        </Button>
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
        <Button href="#liste-attente" size="md" className="header__mobile-cta" onClick={closeMenu}>
          Rejoindre la liste d'attente
        </Button>
      </div>
    </header>
  )
}
