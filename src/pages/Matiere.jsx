import { Link, useParams } from "react-router-dom"
import { programme } from "../data/programme"
import "./AppHome.css"

export default function Matiere() {
  const { id } = useParams()
  const matiere = programme.find((m) => m.id === id)

  if (!matiere) {
    return (
      <main className="app-home app-home--programme">
        <p>Matière introuvable.</p>
        <Link to="/tableau-de-bord">← Tableau de bord</Link>
      </main>
    )
  }

  return (
    <main className="app-home app-home--programme">
      <h1 className="app-home__title">{matiere.label}</h1>
      <p className="app-home__subtitle">{matiere.description}</p>

      <ul className="app-home__chapitres app-home__chapitres--pleine-largeur">
        {matiere.chapitres.map((chapitre) => (
          <li key={chapitre.slug}>
            <Link
              to={`/app/chapitre/${chapitre.slug}`}
              className={`app-home__chapitre ${
                chapitre.statut === "a-venir" ? "app-home__chapitre--a-venir" : ""
              }`}
            >
              <span className="app-home__chapitre-titre">{chapitre.titre}</span>
              {chapitre.statut === "pilote" ? (
                <span className="app-home__chapitre-badge app-home__chapitre-badge--pilote">
                  Disponible — brouillon
                </span>
              ) : (
                <span className="app-home__chapitre-badge">À venir</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
