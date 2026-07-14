import { Link } from "react-router-dom"
import Logo from "../components/ui/Logo"
import { programme } from "../data/programme"
import { useCompteSimule } from "../hooks/useCompteSimule"
import "./AppHome.css"

export default function AppHome() {
  const { connecte } = useCompteSimule()

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="app-header__logo">
          <Logo size={28} />
          IngePrep
        </Link>
        <nav className="app-header__nav">
          <Link
            to={connecte ? "/tableau-de-bord" : "/connexion"}
            className="app-header__home-link"
          >
            {connecte ? "Mon tableau de bord" : "Se connecter"}
          </Link>
          <Link to="/" className="app-header__home-link">
            Accueil
          </Link>
        </nav>
      </header>

      <main className="app-home app-home--programme">
        <h1 className="app-home__title">Le programme de l'examen</h1>
        <p className="app-home__subtitle">
          Les quatre matières officielles de l'examen spécial d'admission, chapitre par chapitre.
        </p>

        <div className="app-home__matieres">
          {programme.map((matiere) => (
            <section className="app-home__matiere" key={matiere.id}>
              <div className="app-home__matiere-head">
                <h2>{matiere.label}</h2>
                <p>{matiere.description}</p>
              </div>
              <ul className="app-home__chapitres">
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
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}
