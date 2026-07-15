import { useNavigate } from "react-router-dom"
import { useCompteSimule } from "../hooks/useCompteSimule"
import { useProgression } from "../hooks/useProgression"
import { useEssaisGratuits, MAX_ESSAIS_GRATUITS } from "../hooks/useEssaisGratuits"
import "./Compte.css"

export default function Compte() {
  const navigate = useNavigate()
  const { compte, deconnecter } = useCompteSimule()
  const progression = useProgression()
  const essais = useEssaisGratuits()

  function handleDeconnexion() {
    deconnecter()
    navigate("/")
  }

  return (
    <main className="compte">
      <h1 className="compte__titre">Mon compte</h1>

      <div className="compte__banniere" role="note">
        <strong>⚠ Compte simulé.</strong> Ces informations vivent uniquement dans ton navigateur.
        Une vraie authentification (Supabase) les remplacera avant le lancement.
      </div>

      <section className="compte__carte">
        <h2>Identité</h2>
        <dl className="compte__infos">
          <div>
            <dt>Prénom</dt>
            <dd>{compte?.prenom || "—"}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{compte?.email || "—"}</dd>
          </div>
        </dl>
      </section>

      <section className="compte__carte">
        <h2>Corrections gratuites</h2>
        <p className="compte__ligne">
          {essais.restants} / {MAX_ESSAIS_GRATUITS} restantes
        </p>
        <div className="compte__actions">
          <button type="button" className="compte__bouton" onClick={essais.reinitialiser}>
            Réinitialiser le compteur (simulation)
          </button>
          <button type="button" className="compte__bouton" onClick={progression.reinitialiser}>
            Réinitialiser ma progression
          </button>
        </div>
      </section>

      <button type="button" className="compte__deconnexion" onClick={handleDeconnexion}>
        Se déconnecter
      </button>
    </main>
  )
}
