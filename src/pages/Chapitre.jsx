import { useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Button from "../components/ui/Button"
import ClavierMath from "../components/app/ClavierMath"
import Paywall from "../components/app/Paywall"
import { getChapitre } from "../data/programme"
import {
  theorieDerivees,
  exercicesDerivees,
  SCENARIOS,
  detecterMecanismeRecurrent,
} from "../data/chapitre-derivees"
import { useEssaisGratuits } from "../hooks/useEssaisGratuits"
import { useProgression } from "../hooks/useProgression"
import "./Chapitre.css"

const IS_DEV = import.meta.env.DEV

// Gabarit commun à TOUS les chapitres, y compris ceux encore "à venir".
const ONGLETS = [
  { id: "theorie", label: "Théorie et méthode" },
  { id: "exercices", label: "Exercices" },
  { id: "video", label: "Vidéo", aVenir: true },
]

function EtatAVenir({ quoi }) {
  return (
    <div className="chapitre-onglet-a-venir">
      <span className="chapitre-badge-a-venir">À venir</span>
      <p>{quoi}</p>
    </div>
  )
}

export default function Chapitre() {
  const { slug } = useParams()
  const resultat = getChapitre(slug)

  const essais = useEssaisGratuits()
  const progression = useProgression()
  const [ongletActif, setOngletActif] = useState("theorie")
  const [scenarioChoisi, setScenarioChoisi] = useState(SCENARIOS[0].id)
  // { [exerciceId]: { demarche, reponse, diagnostic, scenario } }
  const [soumissions, setSoumissions] = useState({})
  const [historiqueScenarios, setHistoriqueScenarios] = useState([])
  // Le paywall n'apparaît qu'au moment où l'élève tente une correction à zéro,
  // pas de façon préventive : la navigation et le contenu restent accessibles.
  const [paywallVisible, setPaywallVisible] = useState(false)

  if (!resultat) {
    return (
      <main className="chapitre-main">
        <p>Chapitre introuvable.</p>
        <Link to="/tableau-de-bord">Retour au tableau de bord</Link>
      </main>
    )
  }

  const { matiere, chapitre } = resultat
  const estPilote = chapitre.statut === "pilote"
  const mecanisme = detecterMecanismeRecurrent(historiqueScenarios)

  function soumettre(exercice, demarche, reponseFinale) {
    // Quota épuisé : on affiche le paywall en pleine séance, ici, au lieu de
    // délivrer une correction. La navigation et le contenu restent accessibles.
    if (essais.epuise) {
      setPaywallVisible(true)
      return
    }
    // Le correcteur compare la démarche libre aux étapes de référence (exercice.etapes).
    // Ici, la comparaison est simulée par le scénario choisi dans l'outil de test.
    const diagnostic = exercice.diagnostics[scenarioChoisi]
    setSoumissions((prev) => ({
      ...prev,
      [exercice.id]: {
        demarche,
        reponse: reponseFinale,
        diagnostic,
        scenario: scenarioChoisi,
      },
    }))
    setHistoriqueScenarios((prev) => [...prev, scenarioChoisi])
    essais.consommer()

    // Alimente le tableau de bord (progression simulée, stockage local).
    progression.enregistrer({
      chapitreSlug: chapitre.slug,
      chapitreTitre: chapitre.titre,
      matiereLabel: matiere.label,
      exerciceId: exercice.id,
      exerciceTitre: exercice.titre,
      scenario: scenarioChoisi,
    })
  }

  return (
      <main className="chapitre-main">
        <nav className="chapitre-fil" aria-label="Fil d'Ariane">
          <Link to={`/app/matiere/${matiere.id}`}>{matiere.label}</Link>
          <span aria-hidden="true">›</span>
          <strong>{chapitre.titre}</strong>
        </nav>

        <h1 className="chapitre-titre">{chapitre.titre}</h1>

        {estPilote && (
          <div className="chapitre-banniere-provisoire" role="note">
            <strong>⚠ Contenu provisoire.</strong> Ce chapitre est un brouillon généré pour
            tester la mise en page. Théorie, exercices et diagnostics doivent encore être
            validés par un enseignant — ne pas considérer comme du contenu de révision fiable.
          </div>
        )}

        {/* --- Onglets (gabarit commun à tous les chapitres) --- */}
        <div className="chapitre-onglets" role="tablist" aria-label="Sections du chapitre">
          {ONGLETS.map((onglet) => (
            <button
              key={onglet.id}
              type="button"
              role="tab"
              id={`onglet-${onglet.id}`}
              aria-selected={ongletActif === onglet.id}
              aria-controls={`panneau-${onglet.id}`}
              className={`chapitre-onglet ${
                ongletActif === onglet.id ? "chapitre-onglet--actif" : ""
              }`}
              onClick={() => setOngletActif(onglet.id)}
            >
              {onglet.label}
              {onglet.aVenir && <span className="chapitre-onglet-badge">À venir</span>}
            </button>
          ))}
        </div>

        {/* --- Onglet : Théorie et méthode --- */}
        {ongletActif === "theorie" && (
          <section
            role="tabpanel"
            id="panneau-theorie"
            aria-labelledby="onglet-theorie"
            className="chapitre-panneau"
          >
            {estPilote ? (
              <div className="chapitre-theorie">
                <h2>Théorie et méthode</h2>
                <p className="chapitre-theorie-intro">{theorieDerivees.intro}</p>
                <div className="chapitre-theorie-blocs">
                  {theorieDerivees.blocs.map((bloc) => (
                    <article className="chapitre-theorie-bloc" key={bloc.titre}>
                      <h3>{bloc.titre}</h3>
                      <p>{bloc.contenu}</p>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <EtatAVenir quoi="La théorie et les méthodes de référence de ce chapitre sont en préparation." />
                <p className="chapitre-a-venir-texte">
                  Voici ce que ce chapitre couvrira, conformément au programme officiel de
                  l'examen :
                </p>
                <ul className="chapitre-sous-chapitres">
                  {chapitre.sousChapitres.map((sousChapitre) => (
                    <li key={sousChapitre}>{sousChapitre}</li>
                  ))}
                </ul>
              </>
            )}
          </section>
        )}

        {/* --- Onglet : Exercices --- */}
        {ongletActif === "exercices" && (
          <section
            role="tabpanel"
            id="panneau-exercices"
            aria-labelledby="onglet-exercices"
            className="chapitre-panneau"
          >
            {!estPilote ? (
              <EtatAVenir quoi="Les exercices de ce chapitre, tirés de la banque d'annales, sont en préparation." />
            ) : (
              <>
                {/* Paywall déclenché en pleine séance à la soumission (quota atteint) */}
                {paywallVisible && (
                  <div className="chapitre-paywall-inline">
                    <Paywall />
                  </div>
                )}

                {/* Outil de test interne (dev uniquement) */}
                {IS_DEV && (
                  <div className="chapitre-devtool" role="group" aria-label="Outil de test interne">
                    <p className="chapitre-devtool-titre">
                      🛠 Outil de test interne — visible uniquement en développement, jamais
                      exposé aux utilisateurs finaux.
                    </p>
                    <p className="chapitre-devtool-texte">
                      Choisis le scénario que la prochaine soumission simulera (le diagnostic
                      affiché est un exemple écrit à la main, pas une sortie d'IA) :
                    </p>
                    <div className="chapitre-devtool-scenarios">
                      {SCENARIOS.map((s) => (
                        <label
                          key={s.id}
                          className={`chapitre-devtool-scenario ${
                            scenarioChoisi === s.id ? "chapitre-devtool-scenario--actif" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="scenario"
                            value={s.id}
                            checked={scenarioChoisi === s.id}
                            onChange={() => setScenarioChoisi(s.id)}
                          />
                          {s.label}
                        </label>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="chapitre-devtool-reset"
                      onClick={essais.reinitialiser}
                    >
                      Réinitialiser le compteur d'essais gratuits
                    </button>
                  </div>
                )}

                {/* Bandeau mécanisme récurrent (simulation) */}
                {mecanisme && (
                  <div className="chapitre-mecanisme" role="alert">
                    <span className="chapitre-mecanisme-badge">
                      Simulation — détection du mécanisme récurrent
                    </span>
                    <p>{mecanisme.message}</p>
                  </div>
                )}

                {/* Les exercices restent toujours accessibles : seul l'envoi d'une
                    correction est gaté par le quota (via soumettre). */}
                <div className="chapitre-exercices">
                  <h2>Exercices</h2>
                  <p className="chapitre-exercices-intro">
                    Rédige ta démarche complète, librement, comme sur ta copie le jour de
                    l'examen. Le correcteur la comparera ensuite à la méthode de référence.
                  </p>
                  {exercicesDerivees.map((exercice, index) => (
                    <ExerciceCard
                      key={exercice.id}
                      exercice={exercice}
                      numero={index + 1}
                      soumission={soumissions[exercice.id]}
                      onSoumettre={soumettre}
                    />
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {/* --- Onglet : Vidéo (toujours à venir pour l'instant) --- */}
        {ongletActif === "video" && (
          <section
            role="tabpanel"
            id="panneau-video"
            aria-labelledby="onglet-video"
            className="chapitre-panneau"
          >
            <EtatAVenir quoi="Les vidéos explicatives de ce chapitre sont en préparation. Aucun lecteur n'est encore branché." />
          </section>
        )}
      </main>
  )
}

// --- Saisie libre : une seule zone de rédaction par exercice ---
//
// La démarche n'est PAS découpée en champs : l'élève rédige librement, comme sur sa
// copie. Le découpage en étapes de la méthode de référence (exercice.etapes) sert
// uniquement au correcteur, APRÈS soumission — il n'est jamais montré comme structure
// de saisie, pour ne pas souffler à l'élève les étapes attendues.

function ExerciceCard({ exercice, numero, soumission, onSoumettre, desactive = false }) {
  const [demarche, setDemarche] = useState("")
  const [reponseFinale, setReponseFinale] = useState("")

  // Un seul clavier, partagé entre la zone de rédaction et la conclusion :
  // il insère dans le dernier champ qui a eu le focus.
  const champActifRef = useRef(null)
  const [champActif, setChampActif] = useState("demarche")

  const soumis = Boolean(soumission)
  // La démarche OU la conclusion suffit : un élève peut vouloir juste vérifier
  // son résultat, sans demander de diagnostic sur son raisonnement.
  const pretASoumettre = demarche.trim().length > 0 || reponseFinale.trim().length > 0

  const labelChampActif =
    champActif === "demarche"
      ? "Ta démarche"
      : exercice.reponseLabel || "Réponse finale"

  function handleFocus(event, champ) {
    champActifRef.current = event.target
    setChampActif(champ)
  }

  function handleInsertion(nouvelleValeur) {
    if (champActif === "demarche") setDemarche(nouvelleValeur)
    else setReponseFinale(nouvelleValeur)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!pretASoumettre || soumis || desactive) return
    onSoumettre(exercice, demarche, reponseFinale)
  }

  const verdictClasse = soumission
    ? soumission.scenario === "correcte"
      ? "chapitre-diagnostic--correct"
      : "chapitre-diagnostic--erreur"
    : ""

  return (
    <article className="chapitre-exercice">
      <div className="chapitre-exercice-head">
        <span className="chapitre-exercice-numero">Exercice {numero}</span>
        <span className="chapitre-exercice-origine">{exercice.origine}</span>
        <span
          className="chapitre-exercice-etoiles"
          aria-label={`Difficulté ${exercice.difficulte} sur 5`}
        >
          {"★".repeat(exercice.difficulte)}
          {"☆".repeat(5 - exercice.difficulte)}
        </span>
      </div>
      <h3 className="chapitre-exercice-titre">{exercice.titre}</h3>
      <p className="chapitre-exercice-enonce">{exercice.enonce}</p>

      {!soumis ? (
        <form className="chapitre-soumission" onSubmit={handleSubmit}>
          <div className="chapitre-zone">
            <label className="chapitre-zone-label" htmlFor={`${exercice.id}-demarche`}>
              Ta démarche
              <span className="chapitre-zone-note">nécessaire pour un diagnostic du raisonnement</span>
            </label>
            <textarea
              id={`${exercice.id}-demarche`}
              className="chapitre-zone-libre"
              rows={9}
              value={demarche}
              onChange={(event) => setDemarche(event.target.value)}
              onFocus={(event) => handleFocus(event, "demarche")}
              disabled={desactive}
              placeholder="Rédige ton raisonnement complet, comme sur ta copie."
            />
          </div>

          <div className="chapitre-zone chapitre-zone--finale">
            <label className="chapitre-zone-label" htmlFor={`${exercice.id}-reponse`}>
              {exercice.reponseLabel || "Réponse finale"}
              <span className="chapitre-zone-note">
                suffit seule si tu veux juste vérifier ton résultat
              </span>
            </label>
            <textarea
              id={`${exercice.id}-reponse`}
              rows={2}
              value={reponseFinale}
              onChange={(event) => setReponseFinale(event.target.value)}
              onFocus={(event) => handleFocus(event, "reponse")}
              disabled={desactive}
              placeholder="Ta conclusion"
            />
          </div>

          <div className="chapitre-clavier">
            <p className="chapitre-clavier-cible">
              Le clavier écrit dans : <strong>{labelChampActif}</strong>
            </p>
            <ClavierMath
              champRef={champActifRef}
              onInsertion={handleInsertion}
              desactive={desactive}
            />
          </div>

          <Button type="submit" size="md" disabled={!pretASoumettre || desactive}>
            Soumettre pour diagnostic
          </Button>
        </form>
      ) : (
        <div className={`chapitre-diagnostic ${verdictClasse}`}>
          <p className="chapitre-diagnostic-verdict">{soumission.diagnostic.verdict}</p>
          {soumission.diagnostic.mecanisme && (
            <span className="chapitre-diagnostic-mecanisme">
              Mécanisme : {soumission.diagnostic.mecanisme}
            </span>
          )}
          <p className="chapitre-diagnostic-texte">{soumission.diagnostic.texte}</p>
          <p className="chapitre-diagnostic-note">
            Diagnostic d'exemple rédigé à la main (simulation) — la version finale sera générée
            par le correcteur IA, qui comparera ta démarche à la méthode de référence.
          </p>
        </div>
      )}
    </article>
  )
}
