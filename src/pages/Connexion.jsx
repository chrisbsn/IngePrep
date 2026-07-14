import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Logo from "../components/ui/Logo"
import Button from "../components/ui/Button"
import { useCompteSimule } from "../hooks/useCompteSimule"
import "./Connexion.css"

// Déduit un prénom d'affichage à partir de l'email, faute de vrai compte
// à interroger (simulation locale, aucune vérification réelle).
function prenomDepuisEmail(email) {
  const local = email.split("@")[0]
  if (!local) return "Élève"
  return local.charAt(0).toUpperCase() + local.slice(1)
}

export default function Connexion() {
  const navigate = useNavigate()
  const { connecter } = useCompteSimule()
  const [email, setEmail] = useState("")
  const [motDePasse, setMotDePasse] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    // Simulation : le mot de passe n'est ni stocké ni vérifié pour l'instant.
    const emailFinal = email.trim() || "demo@ingeprep.be"
    connecter(prenomDepuisEmail(emailFinal), emailFinal)
    navigate("/tableau-de-bord")
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="app-header__logo">
          <Logo size={28} />
          IngePrep
        </Link>
        <Link to="/" className="app-header__home-link">Accueil</Link>
      </header>

      <main className="connexion">
        <div className="connexion__carte">
          <div className="connexion__banniere" role="note">
            <strong>⚠ Connexion simulée.</strong> Ton mot de passe n'est ni vérifié ni stocké de
            façon sécurisée à ce stade : ce compte n'existe que dans ton navigateur. Une vraie
            authentification (Supabase) remplacera ce formulaire avant le lancement.
          </div>

          <h1 className="connexion__titre">Connecte-toi à ton compte</h1>
          <p className="connexion__sous-titre">
            Retrouve ton tableau de bord et ta progression.
          </p>

          <form className="connexion__form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="chris@exemple.be"
              autoComplete="off"
            />

            <label htmlFor="mot-de-passe">Mot de passe</label>
            <input
              id="mot-de-passe"
              type="password"
              value={motDePasse}
              onChange={(event) => setMotDePasse(event.target.value)}
              placeholder="••••••••"
              autoComplete="off"
            />

            <p className="connexion__note-mdp">
              Simulation : le mot de passe saisi n'est pas vérifié, tu peux entrer n'importe quoi.
            </p>

            <Button type="submit" size="md" className="connexion__cta">
              Se connecter
            </Button>
          </form>

          <p className="connexion__bascule">
            Pas encore de compte ? <Link to="/inscription">Obtenir mon accès</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
