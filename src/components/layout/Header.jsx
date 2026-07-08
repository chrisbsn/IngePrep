import Container from "../ui/Container"
import Button from "../ui/Button"
import "./Header.css"

const NAV_LINKS = [
  { label: "Le problème", href: "#probleme" },
  { label: "Le correcteur IA", href: "#correcteur-ia" },
  { label: "Comment ça marche", href: "#comment-ca-marche" },
  { label: "Pour qui", href: "#pour-qui" },
  { label: "FAQ", href: "#faq" },
]

export default function Header() {
  return (
    <header className="header">
      <Container className="header__inner">
        <a href="#top" className="header__logo">
          <span className="header__logo-mark">IP</span>
          IngeniumPrep
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
        <Button href="#waitlist" size="sm" className="header__cta">
          Rejoindre la liste d'attente
        </Button>
      </Container>
    </header>
  )
}
