import { useState } from "react"
import { Link } from "react-router-dom"
import Logo from "../components/ui/Logo"
import Button from "../components/ui/Button"
import { useCompteSimule } from "../hooks/useCompteSimule"
import { startCheckout } from "../utils/checkout"
import "./Connexion.css"
import "./Inscription.css"

export default function Inscription() {
  const { connecter } = useCompteSimule()
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")
  const [motDePasse, setMotDePasse] = useState("")
  const [status, setStatus] = useState("idle") // idle | loading | error
  const [errorMessage, setErrorMessage] = useState("")

  const pret = email.trim().length > 0 && motDePasse.trim().length > 0

  async function handleSubmit(event) {
    event.preventDefault()
    if (!pret || status === "loading") return

    setStatus("loading")
    setErrorMessage("")

    // Simulation : le compte est créé côté client avant même la confirmation du
    // paiement. En production, la création réelle du compte (Supabase) devrait
    // être déclenchée après confirmation du paiement, pas avant.
    connecter(prenom.trim() || "Élève", email.trim())

    try {
      await startCheckout() // redirection réelle vers Stripe (mode test)
    } catch (error) {
      setStatus("error")
      setErrorMessage(error.message)
    }
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
            <strong>⚠ Compte simulé, paiement réel.</strong> La création de compte n'est pas
            encore sécurisée (aucune authentification Supabase à ce stade) : ton mot de passe
            n'est ni vérifié ni stocké. Le paiement, lui, passe par un vrai circuit Stripe
            (mode test tant que la clé test est active).
          </div>

          <h1 className="connexion__titre">Crée ton compte et obtiens ton accès</h1>
          <p className="connexion__sous-titre">
            Un seul paiement, accès jusqu'à ton examen.
          </p>

          <div className="inscription__recap">
            <span className="inscription__recap-prix">79 €</span>
            <span className="inscription__recap-note">
              Accès unique · satisfait ou remboursé 14 jours
            </span>
          </div>

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
              Simulation : ce mot de passe ne sera pas vérifié à la prochaine connexion.
            </p>

            <Button type="submit" size="md" className="connexion__cta" disabled={!pret || status === "loading"}>
              {status === "loading" ? "Redirection vers Stripe..." : "Créer mon compte et payer — 79 €"}
            </Button>
            {status === "error" && <p className="inscription__erreur">{errorMessage}</p>}
          </form>

          <p className="connexion__bascule">
            Déjà un compte ? <Link to="/connexion">Se connecter</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
