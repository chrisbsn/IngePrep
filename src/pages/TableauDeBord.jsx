import { useMemo } from "react"
import { Link, Navigate } from "react-router-dom"
import Logo from "../components/ui/Logo"
import { programme } from "../data/programme"
import { SCENARIOS, detecterMecanismeRecurrent } from "../data/chapitre-derivees"
import { useCompteSimule } from "../hooks/useCompteSimule"
import { useProgression } from "../hooks/useProgression"
import "./TableauDeBord.css"

const COULEUR_SCENARIO = {
  correcte: "correct",
  erreur_methode: "methode",
  erreur_calcul: "calcul",
  resultat_propre_faux: "propre-faux",
}

export default function TableauDeBord() {
  const { compte, connecte, deconnecter } = useCompteSimule()
  const { soumissions, reinitialiser } = useProgression()

  const stats = useMemo(() => {
    // Chapitres commencés : au moins une soumission enregistrée.
    const slugsCommences = new Set(soumissions.map((s) => s.chapitreSlug))
    const tousChapitres = programme.flatMap((matiere) =>
      matiere.chapitres.map((chapitre) => ({
        slug: chapitre.slug,
        titre: chapitre.titre,
        matiere: matiere.label,
        statut: chapitre.statut,
        commence: slugsCommences.has(chapitre.slug),
        soumissions: soumissions.filter((s) => s.chapitreSlug === chapitre.slug).length,
      }))
    )

    // Exercices distincts tentés (un exercice retenté ne compte qu'une fois).
    const exercicesTentes = new Set(
      soumissions.map((s) => `${s.chapitreSlug}::${s.exerciceId}`)
    ).size

    // Répartition des résultats par scénario.
    const parScenario = SCENARIOS.map((scenario) => ({
      ...scenario,
      nombre: soumissions.filter((s) => s.scenario === scenario.id).length,
    }))

    // Réutilise la logique du bandeau déjà construite pour le sélecteur de scénarios.
    const mecanisme = detecterMecanismeRecurrent(soumissions.map((s) => s.scenario))

    return {
      chapitres: tousChapitres,
      commences: tousChapitres.filter((c) => c.commence),
      nonCommences: tousChapitres.filter((c) => !c.commence),
      exercicesTentes,
      totalSoumissions: soumissions.length,
      parScenario,
      mecanisme,
    }
  }, [soumissions])

  if (!connecte) return <Navigate to="/connexion" replace />

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="app-header__logo">
          <Logo size={28} />
          IngePrep
        </Link>
        <nav className="tdb-nav">
          <Link to="/app" className="app-header__home-link">Programme</Link>
          <span className="tdb-nav__compte">{compte.prenom}</span>
          <button type="button" className="tdb-nav__deconnexion" onClick={deconnecter}>
            Se déconnecter
          </button>
        </nav>
      </header>

      <main className="tdb">
        <div className="tdb-banniere" role="note">
          <strong>⚠ Compte simulé — données locales provisoires.</strong> Ce tableau de bord lit
          la progression stockée dans ton navigateur, pas sur un serveur. Aucune
          authentification réelle n'est en place : tout sera remplacé par Supabase (compte +
          persistance) avant le lancement commercial.
        </div>

        <h1 className="tdb-titre">Bonjour {compte.prenom}</h1>
        <p className="tdb-sous-titre">Voici où tu en es dans ta préparation à l'ESA.</p>

        {stats.totalSoumissions === 0 ? (
          <div className="tdb-vide">
            <h2>Tu n'as encore soumis aucun exercice</h2>
            <p>
              Commence par le chapitre pilote pour voir ton tableau de bord se remplir. Chaque
              exercice soumis alimente ton diagnostic.
            </p>
            <Link to="/app/chapitre/derivees" className="btn btn--primary btn--md">
              Commencer par les dérivées
            </Link>
          </div>
        ) : (
          <>
            {/* --- Chiffres clés --- */}
            <div className="tdb-chiffres">
              <div className="tdb-chiffre">
                <span className="tdb-chiffre__valeur">{stats.exercicesTentes}</span>
                <span className="tdb-chiffre__label">exercices tentés</span>
              </div>
              <div className="tdb-chiffre">
                <span className="tdb-chiffre__valeur">{stats.totalSoumissions}</span>
                <span className="tdb-chiffre__label">soumissions au total</span>
              </div>
              <div className="tdb-chiffre">
                <span className="tdb-chiffre__valeur">
                  {stats.commences.length}
                  <span className="tdb-chiffre__sur">/{stats.chapitres.length}</span>
                </span>
                <span className="tdb-chiffre__label">chapitres commencés</span>
              </div>
            </div>

            {/* --- Mécanisme récurrent (logique réutilisée du bandeau) --- */}
            {stats.mecanisme ? (
              <section className="tdb-mecanisme" role="alert">
                <span className="tdb-mecanisme__badge">
                  Simulation — mécanisme d'erreur récurrent détecté
                </span>
                <p>{stats.mecanisme.message}</p>
              </section>
            ) : (
              <section className="tdb-mecanisme tdb-mecanisme--vide">
                <span className="tdb-mecanisme__badge">Mécanismes récurrents</span>
                <p>
                  Pas encore assez de soumissions pour dégager un schéma d'erreur fiable.
                  Continue : le diagnostic se précise à partir de trois exercices.
                </p>
              </section>
            )}

            {/* --- Répartition des résultats --- */}
            <section className="tdb-section">
              <h2>Tes résultats</h2>
              <div className="tdb-resultats">
                {stats.parScenario.map((scenario) => {
                  const pourcentage = stats.totalSoumissions
                    ? Math.round((scenario.nombre / stats.totalSoumissions) * 100)
                    : 0
                  return (
                    <div className="tdb-resultat" key={scenario.id}>
                      <div className="tdb-resultat__tete">
                        <span
                          className={`tdb-pastille tdb-pastille--${COULEUR_SCENARIO[scenario.id]}`}
                          aria-hidden="true"
                        />
                        <span className="tdb-resultat__label">{scenario.label}</span>
                        <span className="tdb-resultat__nombre">{scenario.nombre}</span>
                      </div>
                      <div className="tdb-barre">
                        <div
                          className={`tdb-barre__remplissage tdb-barre__remplissage--${
                            COULEUR_SCENARIO[scenario.id]
                          }`}
                          style={{ width: `${pourcentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* --- Chapitres --- */}
            <section className="tdb-section">
              <h2>Tes chapitres</h2>

              <h3 className="tdb-sous-section">Commencés ({stats.commences.length})</h3>
              <ul className="tdb-chapitres">
                {stats.commences.map((chapitre) => (
                  <li key={chapitre.slug}>
                    <Link
                      to={`/app/chapitre/${chapitre.slug}`}
                      className="tdb-chapitre tdb-chapitre--commence"
                    >
                      <span className="tdb-chapitre__matiere">{chapitre.matiere}</span>
                      <span className="tdb-chapitre__titre">{chapitre.titre}</span>
                      <span className="tdb-chapitre__compte">
                        {chapitre.soumissions} soumission
                        {chapitre.soumissions > 1 ? "s" : ""}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="tdb-sous-section">
                Pas encore commencés ({stats.nonCommences.length})
              </h3>
              <ul className="tdb-chapitres">
                {stats.nonCommences.map((chapitre) => (
                  <li key={chapitre.slug}>
                    <Link
                      to={`/app/chapitre/${chapitre.slug}`}
                      className="tdb-chapitre tdb-chapitre--non-commence"
                    >
                      <span className="tdb-chapitre__matiere">{chapitre.matiere}</span>
                      <span className="tdb-chapitre__titre">{chapitre.titre}</span>
                      <span className="tdb-chapitre__compte">
                        {chapitre.statut === "pilote" ? "Disponible" : "À venir"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <button type="button" className="tdb-reset" onClick={reinitialiser}>
              Réinitialiser ma progression simulée
            </button>
          </>
        )}
      </main>
    </div>
  )
}
