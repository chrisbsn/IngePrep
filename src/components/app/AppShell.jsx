import { NavLink, Link, Navigate, Outlet } from "react-router-dom"
import Logo from "../ui/Logo"
import { useCompteSimule } from "../../hooks/useCompteSimule"
import { useEssaisGratuits, MAX_ESSAIS_GRATUITS } from "../../hooks/useEssaisGratuits"
import "./AppShell.css"

// Libellés courts pour la barre latérale (les libellés complets restent dans le programme).
const MATIERES = [
  { id: "analyse", label: "Analyse", icone: "∫" },
  { id: "algebre", label: "Algèbre", icone: "√x" },
  { id: "trigonometrie", label: "Trigonométrie", icone: "△" },
  { id: "geometrie", label: "Géométrie", icone: "▱" },
]

function lienClasse({ isActive }) {
  return `app-shell__lien ${isActive ? "app-shell__lien--actif" : ""}`
}

export default function AppShell() {
  const { connecte, compte } = useCompteSimule()
  const essais = useEssaisGratuits()

  // Coquille réservée aux vues connectées.
  if (!connecte) return <Navigate to="/connexion" replace />

  const pourcentage = Math.round((essais.restants / MAX_ESSAIS_GRATUITS) * 100)

  return (
    <div className="app-shell-layout">
      {/* Le fond sombre (aside) s'étire sur toute la hauteur de la page, même très
          longue ; le bloc de navigation (inner) reste collé en haut de l'écran. */}
      <aside className="app-shell__sidebar">
        <div className="app-shell__sidebar-inner">
          <Link to="/tableau-de-bord" className="app-shell__logo">
            <Logo size={26} />
            IngePrep
          </Link>

          <nav className="app-shell__nav" aria-label="Navigation de l'application">
            <NavLink to="/tableau-de-bord" className={lienClasse}>
              <span className="app-shell__lien-icone" aria-hidden="true">▦</span>
              Tableau de bord
            </NavLink>

            <span className="app-shell__nav-titre">Matières</span>
            {MATIERES.map((matiere) => (
              <NavLink key={matiere.id} to={`/app/matiere/${matiere.id}`} className={lienClasse}>
                <span className="app-shell__lien-icone" aria-hidden="true">{matiere.icone}</span>
                {matiere.label}
              </NavLink>
            ))}

            <span className="app-shell__nav-titre">Ressources</span>
            <NavLink to="/app/annales" className={lienClasse}>
              <span className="app-shell__lien-icone" aria-hidden="true">▤</span>
              Annales complètes
            </NavLink>
          </nav>

          <div className="app-shell__bas">
            {/* Compteur d'essais gratuits persistant */}
            <div className="app-shell__compteur">
              {essais.epuise ? (
                <p className="app-shell__compteur-titre app-shell__compteur-titre--epuise">
                  Quota gratuit atteint
                </p>
              ) : (
                <p className="app-shell__compteur-titre">
                  Il te reste <strong>{essais.restants}</strong> correction
                  {essais.restants > 1 ? "s" : ""} gratuite{essais.restants > 1 ? "s" : ""}
                </p>
              )}
              <div className="app-shell__jauge" aria-hidden="true">
                <div className="app-shell__jauge-remplissage" style={{ width: `${pourcentage}%` }} />
              </div>
            </div>

            <NavLink to="/compte" className={lienClasse}>
              <span className="app-shell__lien-icone" aria-hidden="true">☺</span>
              {compte?.prenom || "Compte"}
            </NavLink>
          </div>
        </div>
      </aside>

      <div className="app-shell__contenu">
        <Outlet />
      </div>
    </div>
  )
}
