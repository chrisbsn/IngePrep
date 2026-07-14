import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Logo from "../components/ui/Logo"
import Button from "../components/ui/Button"
import { useCompteSimule } from "../hooks/useCompteSimule"
import "./Connexion.css"

export default function Connexion() {
  const navigate = useNavigate()
  const { connecter } = useCompteSimule()
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    // Simulation : rien n'est vérifié, les champs sont facultatifs.
    connecter(prenom.trim() || "Élève", email.trim() || "demo@ingeprep.be")
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
            <strong>⚠ Connexion simulée.</strong> Aucun mot de passe n'est demandé, stocké ni
            vérifié : ce compte n'existe que dans ton navigateur, le temps de maquetter le
            tableau de bord. Une vraie authentification (Supabase) le remplacera avant le
            lancement.
          </div>

          <h1 className="connexion__titre">Accède à ton espace</h1>
          <p className="connexion__sous-titre">
            Renseigne un prénom et un email pour ouvrir le tableau de bord de démonstration.
          </p>

          <form className="connexion__form" onSubmit={handleSubmit}>
            <label htmlFor="prenom">Prénom</label>
            <input
              id="prenom"
              type="text"
              value={prenom}
              onChange={(event) => setPrenom(event.target.value)}
              placeholder="Chris"
              autoComplete="off"
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="chris@exemple.be"
              autoComplete="off"
            />

            <p className="connexion__note-mdp">
              Pas de champ mot de passe : il n'y a rien à sécuriser tant que
              l'authentification n'est pas réelle. Les deux champs sont facultatifs — tu peux
              entrer directement.
            </p>

            <Button type="submit" size="md" className="connexion__cta">
              Ouvrir mon tableau de bord
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
