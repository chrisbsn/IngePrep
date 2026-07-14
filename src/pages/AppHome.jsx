import { Link, useNavigate } from "react-router-dom"
import Logo from "../components/ui/Logo"
import "./AppHome.css"

const MATIERES = [
  {
    id: "algebre",
    label: "Algèbre",
    description: "Équations, inéquations, systèmes, valeurs absolues.",
    active: true,
  },
  {
    id: "analyse",
    label: "Analyse",
    description: "Fonctions, dérivées, limites, primitives.",
    active: false,
  },
  {
    id: "geometrie",
    label: "Géométrie",
    description: "Figures planes, solides, vecteurs.",
    active: false,
  },
  {
    id: "trigonometrie",
    label: "Trigonométrie",
    description: "Cercle trigonométrique, équations, identités.",
    active: false,
  },
]

export default function AppHome() {
  const navigate = useNavigate()

  function handleSelect(matiere) {
    if (matiere.id === "algebre") {
      navigate("/app/exercice/1")
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="app-header__logo">
          <Logo size={28} />
          IngePrep
        </Link>
        <Link to="/" className="app-header__home-link">
          Accueil
        </Link>
      </header>

      <main className="app-home">
        <h1 className="app-home__title">Choisis ta matière</h1>
        <p className="app-home__subtitle">
          Commence par l'algèbre — les autres matières arrivent bientôt.
        </p>

        <div className="app-home__grid">
          {MATIERES.map((matiere) => (
            <button
              key={matiere.id}
              type="button"
              className={`app-home__card ${matiere.active ? "" : "app-home__card--disabled"}`}
              onClick={() => handleSelect(matiere)}
              disabled={!matiere.active}
            >
              {!matiere.active && <span className="app-home__badge">Bientôt</span>}
              <h2>{matiere.label}</h2>
              <p>{matiere.description}</p>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
